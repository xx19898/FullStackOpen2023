require('dotenv').config()
const PORT = require('./util/config').PORT
const express = require('express')
require('express-async-errors')
const {connectDb} = require('./util/db.js')
const app = express()

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const authRouter = require('./controllers/auth')


app.use(express.json())

app.use('/api/blogs',blogsRouter)
app.use('/api/users',usersRouter)
app.use('/api/auth',authRouter)

app.use((err, req, res, next) => {
    if (err.message === 'access denied') {
        res.status(403).json({ error: err.message })
    }else if(err.message === 'Blog not found'){
        res.status(404).json({error: err.message})
    }else if(err.message === 'Error while creating new blog'){
        res.status(400).json({error:err.message})
    }else if(err.message === 'xd'){
        res.json({error:err.message}).sendStatus(400)
    }else if(err.message === 'users.name cannot be null' || err.message === 'users.username cannot be null'){
        res.json({error:err.message}.sendStatus(400))
    }else if(err.message === 'Invalid registration data. Remember, that username has to be valid email address.'){
        res.json({error:err.message}).sendStatus(400)
    }

    next(err);
  });

const start = async () => {
    await connectDb()
    app.listen(PORT, () => console.log(`listening on port: ${PORT}`))
}

start()