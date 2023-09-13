const { verifyToken } = require("./authHandlers")
const { getBlogs, addBlog, deleteBlog } = require("./mongo")


async function getUserBlogs(request, response){
    const blogs = await getBlogs()
    response.json(blogs)
 }

 async function createNewBlogHandler(request, response){
   const username = request.username
   try{
      const blog = request.body.blog
      const savedBlog = await addBlog(username,blog)
      response.status(201).json(savedBlog)
   }catch(e){
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
         if(e.message === 'You do not own this blog, cant delete'){
            response.status(400).json(e.message)
         }else{
            response.status(500).json({ message: 'Error when trying to delete the blog'})
         }
      }
  }


  module.exports = {getUserBlogs,createNewBlogHandler,deleteBlogHandler}