


function requireAuthenticationToken(req,res,next){
    if(!req.headers['token']) res.send('token missing').sendStatus(403)
    req.token = req.headers['token']
    next()
}

module.exports = {  requireAuthenticationToken }