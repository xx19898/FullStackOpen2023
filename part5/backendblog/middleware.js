const { verifyToken } = require("./authHandlers")


function tokenExtractor(request,response,next){
    const authorization = request.get('Authorization')
    if(authorization && authorization.startsWith('Bearer ')){
        request.token = authorization.replace('Bearer ','')
    }
    next()
}

function tokenValidator(request,response,next){
    const authorization = request.get('Authorization')
    if(authorization === undefined) response.status(401).send('No authorization header attached')
    if(!authorization.startsWith('Bearer')) response.status(401).send('Authorization header malformed')
    request.token = authorization.replace('Bearer ','')
    const claims = verifyToken(request.token)
    next()
}

function userExtractor(request,response,next){
    const claims = verifyToken(request.token)
    request.username = claims.username
    next()
}




module.exports = {tokenExtractor,userExtractor,tokenValidator}

