const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { getBlogs, createBlog } = require('./mongo')



app.use(cors())
app.use(express.json())

app.get('/api/blogs', async (request, response) => {
   const blogs = await getBlogs()
   response.json(blogs)
})

app.post('/api/blogs', async (request, response) => {
  

  const savedBlog = await createBlog(request.body)

  response.status(201).json(savedBlog)
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})