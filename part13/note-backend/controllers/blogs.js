

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
    res.send({updatedBlogs})
})

router.post('/', async (req,res) => {
    console.log({req})
    const body = req.body
    console.log({body})
    const newBlog = await Blogs.create({
        author:body.author,
        url:body.url,
        title:body.title,
        likes:body.likes
    })
    res.send(newBlog)
})

router.delete('/:id', async (req,res) => {
    const id = req.params.id
    const deletedBlog = await Blogs.destroy({where:{
        id: id
    }})
    res.sendStatus(200).send(deletedBlog)
})

module.exports = router