const { verifyToken } = require("./authHandlers")
const { getBlogs, addBlog, deleteBlog, findAndUpdateBlog, getBlogById, getUsersWithBlogs, getUserInfoById, addComment } = require("./mongo")


async function getUserBlogs(request, response){
    const blogs = await getBlogs()
    response.json(blogs)
 }

async function getUserInfoHandler(request,response){
   const id = request.params.userId
   const userInfo = await getUserInfoById(id)
   response.json(userInfo)
}

async function getBlogHandler(request,response){
   const id = request.params.blogId
   const blogInfo = await getBlogById(id)
   response.json(blogInfo)
}

async function getUsersBasicInfo(request,response){
   const usersWithBlogs = await getUsersWithBlogs()
   const usersWithNumberOfBlogs = usersWithBlogs.map((userWithBlogs) => {
      const count = userWithBlogs.blogs.length
      return {
         username:userWithBlogs.username,
         blogCount: count,
         _id:userWithBlogs._id,
      }
   })
   response.json(usersWithNumberOfBlogs)
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
      console.log({errormessage:e.message})
      response.status(500).json(e.message)
   }
  }

   async function updateBlog(request,response){
   const jwtToken = request.token
   try{
      const payload = verifyToken(jwtToken)
      const username = payload.username
      let updatedBlog = request.body.blog
      console.log({updatedBlog})
      const blogId = request.params.blogId
      updatedBlog = await findAndUpdateBlog(updatedBlog,blogId)
      response.status(200).json(updatedBlog)
   }catch(e){
      response.status(500).json(e.message)
   }
  }

  async function deleteBlogHandler(request,response){
      const user = request.username
      console.log({user})
      const id = request.params.blogId
      const blog = await getBlogById(id)

      if(blog.user.username != user) response.status(400).json({message:'Could not delete, not authorized'})
      else{
         try{
            const deletedBlog = await deleteBlog(user,id)
            response.status(200).json(deletedBlog)
         }catch(e){
            response.status(500).json(e.message)
         }
      }
  }

  async function addCommentHandler(req,res){
   const username = req.username
   const blogId = req.params.blogId
   const comment = req.body.comment

   const updatedBlog = await addComment({username:username,blogId:blogId,comment:comment})

   res.json(updatedBlog)
  }


  module.exports = {addCommentHandler,getBlogHandler,getUserBlogs,createNewBlogHandler,updateBlog,deleteBlogHandler,getUsersBasicInfo,getUserInfoHandler}