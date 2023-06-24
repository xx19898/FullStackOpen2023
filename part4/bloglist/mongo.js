const mongoose = require('mongoose')
const process = require('process')

async function connectDB(){
  mongoose.set('strictQuery',false)
  const theUrl = process.env.db_url
  console.log({theUrl})
  await mongoose.connect(theUrl).then((x) => console.log('CONNECTED TO DB')).catch((e) => console.log('ERROR WHILE TRYING TO CONNECT TO THE DB'))
}

async function disconnectDB(){
  await mongoose.connection.close()
  console.log('DISCONNECTED FROM DATABASE')
}
  const blogSchema = mongoose.Schema({
      title: String,
      author: String,
      url: String,
      likes: Number
    })

  const userSchema = mongoose.Schema({
    username: String,
    name: String,
    password: String
  }) 
  
  const Blog = mongoose.model('Blog', blogSchema)
  const User = mongoose.model('User',userSchema)

  function getBlogs(){
    return Blog.find({})
  }
  
  function createBlog(newBlog){
    const blog = new Blog(newBlog)

    return blog
        .save()
  }

  function deleteBlogs(){
    return Blog.deleteMany({})
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

  function getUsers(){
    return User.find({})
  }

  module.exports = {deleteBlogs,deleteUsers,getBlogs,createBlog,disconnectDB,connectDB,createNewUser,getUsers,getUserByName,deleteUserByName}
