require('dotenv').config()
const {Blog} = require('./db')
const express = require('express')
const port = 3000
const app = express()

app.use(express.json())



app.get('/blogs',async (req,res) => {
    const blogs = await Blog.findAll()
    res.send(blogs)
})

app.post('/blogs', async (req,res) => {
    console.log({req})
    const body = req.body
    console.log({body})
    const newBlog = await Blog.create({
        author:body.author,
        url:body.url,
        title:body.title,
        likes:body.likes
    })
    res.send(newBlog)
})

app.delete('/blogs/:id', async (req,res) => {
    const id = req.params.id
    const deletedBlog = await Blog.destroy({where:{
        id: id
    }})
    res.sendStatus(200).send(deletedBlog)
})

app.listen(port, () => console.log(`listening on port: ${port}`))
