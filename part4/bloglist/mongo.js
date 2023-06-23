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
  
  const Blog = mongoose.model('Blog', blogSchema)

  function getBlogs(){
    return Blog.find({}).then(blogs => {
      return blogs
    })
  }

  async function createBlog(newBlog){
    const blog = new Blog(newBlog)

    return blog
        .save()
        .then(result => {
        return result
        })
    }

  module.exports = {getBlogs,createBlog}
