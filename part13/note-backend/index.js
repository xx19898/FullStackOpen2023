require('dotenv').config()
const PORT = require('./util/config').PORT
const express = require('express')
const {connectDb} = require('./util/db.js')
const app = express()
const blogsRouter = require('./controllers/blogs')

app.use('/blogs',blogsRouter)

app.use(express.json())

const start = async () => {
    await connectDb()
    app.listen(PORT, () => console.log(`listening on port: ${PORT}`))
}

start()