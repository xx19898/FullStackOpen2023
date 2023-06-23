var bcrypt = require('bcryptjs');
const { createNewUser } = require('./mongo');

async function createNewUserHandler(request,response){
    const user = request.body
    const encryptedPassword = encryptPassword(user.password)
    const savedUser = await createNewUser({...user,password:encryptedPassword})
    response.status(201).json(savedUser)
}

async function loginUserHandler(request,response){
    const userdata = request.body
    
}




function encryptPassword(password){
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(password,salt)
    return hash
}

function passwordMatch(plainPassword,hash){
    return bcrypt.compareSync(plainPassword,hash)
}