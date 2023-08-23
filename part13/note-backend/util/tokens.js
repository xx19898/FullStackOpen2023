const jwt = require('jsonwebtoken')

function createToken(userId,tokenId){
    const jwtSecret = process.env.JWT_SECRET
    return jwt.sign({ userId: userId, tokenId: tokenId }, jwtSecret);
}


module.exports = { createToken }