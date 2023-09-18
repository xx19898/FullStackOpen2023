const { verifyToken } = require("./authHandlers")
const { getBlogs, addBlog, deleteBlog, findAndUpdateBlog, getBlogById } = require("./mongo")


async function getUserBlogs(request, response){
    const blogs = await getBlogs()
    response.json(blogs)
 }

 async function createNewBlogHandler(request, response){
   const jwtToken = request.token
   try{
      const payload = verifyToken(jwtToken)
      const username = payload.username
      let blog = request.body.blog
      if(blog.likes === undefined){
         blog = {...blog,likes:0}
      }
      const savedBlog = await addBlog(username,blog)
      response.status(201).json(savedBlog)
   }catch(e){
      response.status(500).json(e.message)
   }
  }

   async function updateBlog(request,response){
   const jwtToken = request.token
   try{
      const payload = verifyToken(jwtToken)
      const username = payload.username
      let updatedBlog = request.body.blog
      const blogId = request.params.blogId
      updatedBlog = await findAndUpdateBlog(updatedBlog,blogId)
      response.status(200).json(updatedBlog)
   }catch(e){
      response.status(500).json(e.message)
   }
  }

  async function deleteBlogHandler(request,response){
      const user = request.username
      const id = request.params.blogId
      const blog = await getBlogById(id)

      if(blog[0].user.username != user) response.status(400).json({message:'Could not delete, not authorized'})
      else{
         try{
            const deletedBlog = await deleteBlog(user,id)
            response.status(200).json(deletedBlog)
         }catch(e){
            response.status(500).json(e.message)
         }
      }
  }


  module.exports = {getUserBlogs,createNewBlogHandler,updateBlog,deleteBlogHandler}