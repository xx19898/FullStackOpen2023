const { verifyToken } = require("./authHandlers")
const { getBlogs, addBlog, deleteBlog, findAndUpdateBlog } = require("./mongo")


async function getUserBlogs(request, response){
    const blogs = await getBlogs()
    response.json(blogs)
 }

 async function createNewBlogHandler(request, response){
   const jwtToken = request.token
   console.log('GOT TO CREATE NEW BLOG HANDLER*****')
   try{
      const payload = verifyToken(jwtToken)
      console.log({payload})
      const username = payload.username
      const blog = request.body.blog
      const savedBlog = await addBlog(username,blog)
      console.log('GOT TO FINISH')
      response.status(201).json(savedBlog)
   }catch(e){
      console.log({errormessage:e.message})
      response.status(500).json(e.message)
   }
  }

   async function updateBlog(request,response){
   const jwtToken = request.token
   try{

      const payload = verifyToken(jwtToken)
      console.log({payload})
      const username = payload.username
      let updatedBlog = request.body.blog
      const blogId = request.params.blogId
      updatedBlog = await findAndUpdateBlog(updatedBlog,blogId)
      console.log({updatedBlog})
      response.status(200).json(updatedBlog)
   }catch(e){
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


  module.exports = {getUserBlogs,createNewBlogHandler,updateBlog}