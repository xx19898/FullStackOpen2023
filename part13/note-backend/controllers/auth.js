const router = require('express').Router()
const bcrypt = require('bcrypt')
const { Users, Tokens } = require('../models')
const { createToken } = require('../util/tokens')
const { requireAuthenticationToken } = require('../util/middleware')

router.post('/login', async (req,res) => {
    const {username,password} = req.body
    const userInfoDB = await Users.findOne({where:{username:username}})
    if(userInfoDB === null) res.sendStatus(403)
    const { username:usernameDB,password:passwordHash, id:userId } = userInfoDB
    bcrypt.compare(password, passwordHash,  async function(err, result) {
        if(result){
            const newToken = await Tokens.create({userId:userId,active:true})
            const token = createToken(userId,newToken.id)
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
            console.log({errors:e})
            next('Invalid registration data. Remember, that username has to be valid email address.')
        }
    })
})

router.post('/logout',requireAuthenticationToken,async (req,res,next) => {
    await Tokens.update({active:false},{where:{id:req.tokenId}})
    res.sendStatus(200)
})

module.exports = router

