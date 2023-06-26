const mongoose = require('mongoose')
const process = require('process')

async function connectDB(){
  mongoose.set('strictQuery',false)
  const theUrl = process.env.db_url
  console.log({DB_URL:theUrl})
  await mongoose.connect(theUrl).then(() => console.log('Connected to the Database!')).catch((e) => console.log('ERROR WHILE TRYING TO CONNECT TO THE DB'))
}

function disconnectDB(){
  return mongoose.disconnect().then(() => console.log('Disconnected from Database'))
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

  function getBlogById(id){
    return Blog.find({'_id':id}).populate('user',{username:1,name:1,_id:1})
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
    console.log({lookingForUser:name})
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
    const user = await getUserByName(username)
    let newBlog = new Blog({...blog,user:user.id})
    newBlog = await newBlog.save()
    let newBlogFromDB = await getBlogById(newBlog._id)
    user.blogs = user.blogs.concat(newBlog._id)
    const savedUser = await user.save()
    return newBlog
  }

  function getUsers(){
    return User.find({}).populate('blogs')
  }

  module.exports = {
    deleteBlogs,deleteUsers,getBlogs,createBlog,
    disconnectDB,connectDB,createNewUser,getUsers,
    getUserByName,deleteUserByName,addBlog,deleteBlog
  }
