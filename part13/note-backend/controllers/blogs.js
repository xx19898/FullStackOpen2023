
const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { Blogs, Users } = require('../models/')
const { requireAuthenticationToken } = require('../util/middleware')
const { Op } = require('sequelize')

router.get('/',async (req,res) => {
    const string = req.query.search
    console.log({string})
    if(string){
        const blogs = await Blogs.findAll({
            where:{
                [Op.or]:[{
                    title:{[Op.iRegexp]:string}},{author:{
                            [Op.iRegexp]:string,
                        }},]
            },
            order:[
                ['likes','DESC']
            ]
        })

        res.send({blogs})
    }
    const blogs = await Blogs.findAll({
        include: Users,
        order:[
            ['likes','DESC']
        ]
    })
    res.send(blogs)
})

router.put('/:id', async (req,res) => {
    const id = req.params.id
    console.log({body:req.body})
    const newLikes = req.body.likes
    const updatedBlogs = await Blogs.update({likes:newLikes},{
        where:{
            id:id,
        }})
    if(updatedBlogs[0] === 0) throw new Error('Blog not found')
    res.send({updatedBlogs})
})

router.post('/', requireAuthenticationToken, async (req,res,next) => {
    const body = req.body
    const token = req.token
    console.log('GOT HERE')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const User = await Users.findByPk(decoded.userId)
    const newBlog = await Blogs.create({
        author:body.author,
        url:body.url,
        title:body.title,
        likes:parseInt(body.likes),
        userId: decoded.userId,
        year: body.year,
    })
    await User.addBlogs(newBlog)
    res.status(200).send('Blog created successfully')

})

router.delete('/:id',requireAuthenticationToken, async (req,res) => {
    const token = req.token
    const blogId = req.params.id
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userBehindTheRequest = await Users.findByPk(decoded.userId)
        const blogToDelete = await Blogs.findByPk(blogId,{include:Users})
        const blogsOwnerName = blogToDelete.user.name
        if(blogsOwnerName != userBehindTheRequest.name) throw new Error('access denied')
        const deletedBlog = await Blogs.destroy({where:{
            id: blogId
        }})
        if(deletedBlog === 0) throw new Error('Blog not found')
        res.sendStatus(200).send(deletedBlog)
    }catch(e){
        throw new Error('Error when trying to delete the blog')
    }
})


module.exports = router