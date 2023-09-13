const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { getBlogs, createBlog, createNewUser, connectDB } = require('./mongo')
const { getUserBlogs, createNewBlogHandler, deleteBlogHandler} = require('./blogHandlers')
const { createNewUserHandler, loginUserHandler } = require('./authHandlers')
const { tokenExtractor, tokenValidator, userExtractor } = require('./middleware')

app.use(cors())
app.use(express.json())
app.use('/api/blogs',tokenValidator,userExtractor)

app.get('/api/blogs', getUserBlogs)
app.post('/api/blogs', createNewBlogHandler)
app.delete('/api/blogs',deleteBlogHandler)

app.post('/api/users',createNewUserHandler)
app.post('/api/users/login',loginUserHandler)
const PORT = 80

if(process.env.NODE_ENV !== 'test'){
  app.listen(PORT, async () => {
    connectDB()
  })
}

module.exports = { app }