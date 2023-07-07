const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { getBlogs, createBlog, createNewUser, connectDB } = require('./mongo')
const { getUserBlogs, createNewBlogHandler, updateBlog } = require('./blogHandlers')
const { createNewUserHandler, loginUserHandler } = require('./authHandlers')
const { tokenExtractor, tokenValidator, userExtractor } = require('./middleware')

app.use(cors({
  origin: '*'
}))
app.use(express.json())
app.use('/api/blogs',tokenValidator,userExtractor)

app.get('/api/blogs', getUserBlogs)
app.post('/api/blogs', createNewBlogHandler)

app.put('/api/blogs/:blogId', updateBlog)

app.post('/api/users',createNewUserHandler)
app.post('/api/users/login',loginUserHandler)
const PORT = 80

console.log(`ENVIRONMENT IS ${process.env.NODE_ENV}`)

if(process.env.NODE_ENV !== 'test'){
  app.listen(PORT, async () => {
    connectDB()
    console.log(`Server running on port ${PORT}`)
  })
}

module.exports = { app } 