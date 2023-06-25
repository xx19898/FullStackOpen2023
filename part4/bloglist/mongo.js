const mongoose = require('mongoose')
const process = require('process')

async function connectDB(){
  mongoose.set('strictQuery',false)
  const theUrl = process.env.db_url
  await mongoose.connect(theUrl).catch((e) => console.log('ERROR WHILE TRYING TO CONNECT TO THE DB'))
}

async function disconnectDB(){
  await mongoose.connection.close()
  //console.log('DISCONNECTED FROM DATABASE')
}
  const blogSchema = mongoose.Schema({
      title: String,
      author: String,
      url: String,
      likes: Number,
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    })

  const userSchema = mongoose.Schema({
    username: String,
    name: String,
    password: String,
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
      }
    ]
  }) 
  
  const Blog = mongoose.model('Blog', blogSchema)
  const User = mongoose.model('User',userSchema)

  function getBlogs(){
    return Blog.find({}).populate('user',{username:1,name:1,_id:1})
  }
  
  function createBlog(newBlog){
    const blog = new Blog(newBlog)

    return blog
        .save()
  }

  function deleteBlogs(){
    return Blog.deleteMany({})
  }

  async function deleteBlog(username,blogId){
    let blog = await Blog.findOne({_id:blogId}).populate('user',{username:1})
    if( blog.user.username != username) throw new Error('You do not own this blog, cant delete')
    else{
      return await Blog.deleteOne({_id:blogId})
    }
  }

  function getUserByName(name){
    return User.findOne({username:name})
  }

  function deleteUsers(){
    return User.deleteMany({})
  }

  function deleteUserByName(name){
    return User.deleteOne({name:name})
  }

  function createNewUser(newUser){
    const user = new User(newUser)
    return user.save()
  }

  async function addBlog(username,blog){
    const user = await User.findOne({username:username})
    console.log({user})
    console.log({blog})
    let newBlog = new Blog({...blog,user:user._id})
    newBlog = await newBlog.save()
    user.blogs = user.blogs.concat(blog._id)
    const savedBlog = await user.save()
    return savedBlog
  }

  function getUsers(){
    return User.find({}).populate('blogs')
  }

  module.exports = {
    deleteBlogs,deleteUsers,getBlogs,createBlog,
    disconnectDB,connectDB,createNewUser,getUsers,
    getUserByName,deleteUserByName,addBlog,deleteBlog
  }
