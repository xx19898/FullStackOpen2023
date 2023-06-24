const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { getBlogs, createBlog, createNewUser, connectDB } = require('./mongo')
const { getUserBlogs, createNewBlog } = require('./blogHandlers')
const { createNewUserHandler, loginUserHandler } = require('./authHandlers')



app.use(cors())
app.use(express.json())

app.get('/api/blogs', getUserBlogs)
app.post('/api/blogs', createNewBlog)

app.post('/api/users',createNewUserHandler)
app.post('/api/users/login',loginUserHandler)
const PORT = 80

app.listen(PORT, async () => {
  connectDB()
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app } 