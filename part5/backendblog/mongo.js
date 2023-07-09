const bcrypt = require('bcryptjs/dist/bcrypt')
const mongoose = require('mongoose')
const process = require('process')


async function connectDB(){
  mongoose.set('strictQuery',false)
  const theUrl = process.env.db_url
  console.log({DB_URL:theUrl})
  await mongoose.connect(theUrl).then(() => console.log('Connected to the Database!')).catch((e) => console.log('ERROR WHILE TRYING TO CONNECT TO THE DB'))
}

async function disconnectDB(){
  await mongoose.disconnect()
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
      return await Blog.findByIdAndRemove(blogId)
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
    const encryptedPassword = encryptPassword(newUser.password)
    const user = new User({...newUser,password:encryptedPassword})
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
  async function findAndUpdateBlog(newBlog,id){
    console.log({newBlog})
    const newDoc = await Blog.findOneAndUpdate({_id:id},newBlog,{
      new:true
    })
    return newDoc
  }

  function getUsers(){
    return User.find({}).populate('blogs')
  }

  async function resetDB(){
    await Blog.deleteMany({})
    await User.deleteMany({})
  }

  async function createTestUser(){
    const encryptedPassword = encryptPassword('testPassword')
    const encryptedPassword2 = encryptPassword('testPassword2')
    const testUser = new User({username:'testUser',password:encryptedPassword})
    const secondTestUser = new User({username:'testUser2',password:encryptedPassword2})
    secondTestUser.save()
    return testUser.save()
  }

  function encryptPassword(password){
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(password,salt)
    return hash
  }

  module.exports = {
    deleteBlogs,deleteUsers,getBlogs,createBlog,
    getBlogById,
    disconnectDB,connectDB,createNewUser,getUsers,
    getUserByName,deleteUserByName,addBlog,deleteBlog,
    findAndUpdateBlog,resetDB,createTestUser
  }
