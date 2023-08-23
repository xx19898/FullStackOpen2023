const jwt = require('jsonwebtoken')
const { Tokens } = require('../models')


async function requireAuthenticationToken(req,res,next){
    if(!req.headers['token']) throw new Error('token missing')
    const decoded = jwt.verify(req.headers['token'], process.env.JWT_SECRET)
    const token = await Tokens.findByPk(decoded.tokenId)
    const tokenStatus = token.active
    if(!tokenStatus) throw new Error('access denied')
    req.token = req.headers['token']
    req.userId = decoded.userId
    req.tokenId = token.id
    next()
}

module.exports = { requireAuthenticationToken }