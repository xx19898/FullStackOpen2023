

const router = require('express').Router()

const { Blogs } = require('../models/')

router.get('/',async (req,res) => {
    const blogs = await Blogs.findAll()
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

router.post('/', async (req,res) => {
    const body = req.body
    try{
        const newBlog = await Blogs.create({
            author:body.author,
            url:body.url,
            title:body.title,
            likes:body.likes
        })
        res.send(newBlog)
    }catch(e){
        throw new Error('Error while creating new blog')
    }
})

router.delete('/:id', async (req,res) => {
    const id = req.params.id
    const deletedBlog = await Blogs.destroy({where:{
        id: id
    }})
    if(deletedBlog[0] === 0) throw new Error('Blog not found')
    res.sendStatus(200).send(deletedBlog)
})

module.exports = router