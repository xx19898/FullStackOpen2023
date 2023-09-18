
const express = require('express')
const app = express()
const cors = require('cors')
const {connectDB, resetDB, createTestUser} = require('./mongo')
const { getUserBlogs, createNewBlogHandler, updateBlog, deleteBlogHandler } = require('./blogHandlers')
const { createNewUserHandler, loginUserHandler } = require('./authHandlers')
const { tokenValidator, userExtractor } = require('./middleware')

app.use(cors({
  origin: '*'
}))
app.use(express.json())
app.use('/api/blogs',tokenValidator,userExtractor)

app.get('/api/blogs', getUserBlogs)
app.post('/api/blogs', createNewBlogHandler)

app.put('/api/blogs/:blogId', updateBlog)
app.delete('/api/blogs/:blogId',deleteBlogHandler)

app.post('/api/users',createNewUserHandler)
app.post('/api/users/login',loginUserHandler)

//TESTING ENDPOINTS
app.post('/api/tests/reset',async (req,res) => {
  await resetDB()
  await createTestUser()
  return res.status(200).send({})
})

const PORT = 80

if(process.env.NODE_ENV !== 'test'){
  app.listen(PORT, async () => {
    connectDB()
  })
}

module.exports = { app }