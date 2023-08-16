require('dotenv').config()
const {Blog} = require('./db')
const express = require('express')
const port = 3000
const app = express()





app.get('/blogs',async (req,res) => {
    const blogs = await Blog.findAll()
    res.send(blogs)
})

app.post('/blogs', async ({body},res) => {
    const newBlog = await Blog.create({
        author:body.author,
        url:body.url,
        title:body.title,
        likes:body.likes
    })

    res.send(newBlog)
})

app.listen(port, () => console.log(`listening on port: ${port}`))
