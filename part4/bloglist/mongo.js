const mongoose = require('mongoose')
const process = require('process')
require('dotenv').config()

const password = process.env.dbPassword
const url = `mongodb+srv://phonebookUser:${password}@cluster0.czyxxd4.mongodb.net/BloglistDB?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url).then((x) => console.log('CONNECTED TO DB')).catch((e) => console.log('ERROR WHILE TRYING TO CONNECT TO THE DB'))

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

    function createNewUser(newUser){
      const user = new User(newUser)
      return user.save()
    }

    function getUsers(){
      return User.find({})
    }

  module.exports = {getBlogs,createBlog,createNewUser,getUsers}
