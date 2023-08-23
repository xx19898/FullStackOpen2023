const Blogs = require('./Blogs')
const Users = require('./Users')
const Tokens = require('./Tokens')
const ReadingLists = require('./ReadingLists')


const syncModels = async () => {
    await Users.sync()
    await Blogs.sync()
}

//syncModels()

module.exports = {  Blogs, Users, ReadingLists, Tokens }