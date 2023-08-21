const Blogs = require('./Blogs')
const Users = require('./Users')


const syncModels = async () => {
    await Users.sync()
    await Blogs.sync()
}

syncModels()

module.exports = {  Blogs, Users }