require('dotenv').config()
const PORT = require('./util/config').PORT
const express = require('express')
const {connectDb} = require('./util/db.js')
const app = express()
require('express-async-errors')
const blogsRouter = require('./controllers/blogs')

app.use(express.json())
app.use('/blogs',blogsRouter)

const start = async () => {
    await connectDb()
    app.listen(PORT, () => console.log(`listening on port: ${PORT}`))
}

app.use((err, req, res, next) => {
    if (err.message === 'access denied') {
      res.status(403);
      res.json({ error: err.message });
    }else if(err.message === 'Blog not found'){
        res.status(404)
        res.json({error: err.message})
    }else if(err.message === 'Error while creating new blog'){
        res.status(400)
        res.json({error:err.message})
    }

    next(err);
  });

start()