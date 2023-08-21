const router = require('express').Router()
const bcrypt = require('bcrypt')
const { Users } = require('../models')
const { createToken } = require('../util/tokens')

router.post('/login', async (req,res) => {
    const {username,password} = req.body
    console.log({username,password})
    const userInfoDB = await Users.findOne({where:{username:username}})
    console.log({userInfoDB})
    if(userInfoDB === null) res.sendStatus(403)
    const { username:usernameDB,password:passwordHash, id } = userInfoDB
    bcrypt.compare(password, passwordHash,  async function(err, result) {
        if(result){
            const token = createToken(id)
            res.status(200).send({token})
        }else{
            res.sendStatus(403)
        }
    });
})

router.post('/register', (req,res,next) => {
    const { username, password, name } = req.body
    bcrypt.hash(password, 10, async function(err, hash) {
        try{
        await Users.create({username:username,name:name,password:hash})
        res.send('New user created successfully').sendStatus(200)
        }
        catch(e){
            console.log({errors:e.errors})
            next('Invalid registration data. Remember, that username has to be valid email address.')
        }
    })
})

module.exports = router

