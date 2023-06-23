const { getBlogs } = require("./mongo")


async function getUserBlogs(request, response){
    const blogs = await getBlogs()
    response.json(blogs)
 }

 async function createNewBlog(request, response){
  
    const savedBlog = await createBlog(request.body)
  
    response.status(201).json(savedBlog)
  }


  module.exports = {getUserBlogs,createNewBlog}