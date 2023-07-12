
const express = require('express')
const app = express()
const cors = require('cors')
const {connectDB, resetDB, createTestUser, getUserInfoById} = require('./mongo')
const { getUserBlogs, createNewBlogHandler, updateBlog, deleteBlogHandler, getUsersBasicInfo, getUserInfoHandler, getBlogHandler, addCommentHandler } = require('./blogHandlers')
const { createNewUserHandler, loginUserHandler } = require('./authHandlers')
const { tokenValidator, userExtractor } = require('./middleware')

app.use(cors({
  origin: '*'
}))
app.use(express.json())
app.use('/api/blogs',tokenValidator,userExtractor)

app.get('/api/blogs', getUserBlogs)
app.get('/api/blogs/:blogId',getBlogHandler)

app.get('/api/blogs/user/:userId',getUserInfoHandler)

app.put('/api/blogs/:blogId', updateBlog)
app.delete('/api/blogs/:blogId',deleteBlogHandler)
app.post('/api/blogs/comment/:blogId',addCommentHandler)

app.post('/api/blogs', createNewBlogHandler)
app.post('/api/users',createNewUserHandler)
app.post('/api/users/login',loginUserHandler)
app.get('/api/users/userInfo',getUsersBasicInfo)
//TESTING ENDPOINTS
app.post('/api/tests/reset',async (req,res) => {
  await resetDB()
  await createTestUser()
  return res.status(200).send({})
})

const PORT = 80

console.log(`ENVIRONMENT IS ${process.env.NODE_ENV}`)

if(process.env.NODE_ENV !== 'test'){
  app.listen(PORT, async () => {
    connectDB()
    console.log(`Server running on port ${PORT}`)
  })
}

module.exports = { app } 