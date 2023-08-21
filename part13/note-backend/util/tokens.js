const jwt = require('jsonwebtoken')

function createToken(userId){
    const jwtSecret = process.env.JWT_SECRET
    return jwt.sign({ userId: userId }, jwtSecret);
}


module.exports = { createToken }