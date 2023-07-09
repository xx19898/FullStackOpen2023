var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { createNewUser, getUserByName } = require('./mongo');

async function createNewUserHandler(request,response){
    const err = await validateUserDataForRegistering(request.body)
    console.log({err})
    if(err.error != undefined) response.status(400).json(err.error)
    else{
        const user = request.body
        const encryptedPassword = encryptPassword(user.password)
        try{
        const savedUser = await createNewUser({...user,password:encryptedPassword})
        response.status(201).json(savedUser)
        }catch(error){
        response.status(500).json(error.message)
        }
    }    
}

    async function loginUserHandler(request,response){
        const userdata = request.body
        const err = validateFormOfUserData(request.body)
        if(err.error != undefined) response.status(400).json(err.error)
        else{
            user = await getUserByName(userdata.username)
            if(!passwordMatch(userdata.password,user.password)) return response.status(401).json({
                error: 'invalid username or password'
            })

            const userForToken = {
                username: user.username,
                id: user._id
                }

            const token = jwt.sign(userForToken, process.env.JWT_SECRET)
        

            response.status(200).send({token:token, username: user.username, name: user.name})
    }}

function encryptPassword(password){
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(password,salt)
    return hash
}

async function validateUserDataForRegistering(userdata){
    validateFormOfUserData(userdata)
    const existingUser = await getUserByName(userdata.username)
    if(existingUser != undefined) return {error:'Username is already taken'}
    return {}
}

function validateFormOfUserData(userdata){
    if(userdata.username === undefined || userdata.password === undefined) return {error:'Password or username missing'}
    if(userdata.password.length < 3) return {error:'Password is too short! It should contain at least 3 characters'}
    if(userdata.username.length < 3) return {error:'Username is too short! It should contain at least 3 characters'}
    return {}
}

function verifyToken(token){
    return jwt.verify(token,process.env.JWT_SECRET)
}


function passwordMatch(plainPassword,hash){
    return bcrypt.compareSync(plainPassword,hash)
}

module.exports = {createNewUserHandler,encryptPassword,loginUserHandler,verifyToken}