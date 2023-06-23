const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { getBlogs, createBlog } = require('./mongo')
const { getUserBlogs, createNewBlog } = require('./blogHandlers')



app.use(cors())
app.use(express.json())

app.get('/api/blogs', getUserBlogs)
app.post('/api/blogs', createNewBlog)

app.post('/api/users',createNewUser)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})