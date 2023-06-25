const { verifyToken } = require("./authHandlers")
const { getBlogs, addBlog, deleteBlog } = require("./mongo")


async function getUserBlogs(request, response){
    const blogs = await getBlogs()
    response.json(blogs)
 }

 async function createNewBlogHandler(request, response){
   console.log('GOT HERE')
   const jwtToken = request.token
   try{
      const payload = verifyToken(jwtToken)
      const username = payload.username
      const blog = request.body.blog
      const savedBlog = await addBlog(username,blog)
      response.status(201).json(savedBlog)
   }catch(e){
      console.log('GOT HERE')
      console.log({errormessage:e.message})
      response.status(500).json(e.message)
   }
  }

  async function deleteBlogHandler(request,response){
      const user = request.username
      const id = request.body.blogId
      try{
         const deletedBlog = await deleteBlog(user,id)
         response.status(200).json(deletedBlog)
      }catch(e){
         response.status(500).json(e.message)
      }
  }


  module.exports = {getUserBlogs,createNewBlogHandler}