const jwt = require('jsonwebtoken')
const config = require('./config')
const result = require('./result')

function authUser(req, res, next){
    const path = req.url
    if(path == '/auth/login')
        next()

    else{
        const token = req.headers.token
        if(!token)
            res.send(result.createResult('Token is missing'))

        else{
            try{
                const paylod = jwt.verify(token, config.SECRET)
                req.headers.uid = paylod.uid
                req.headers.email = paylod.email
                next()
            }
            catch(e){
                res.send(result.createResult('Token is invalid'))
            }
            
        }
    }
}

module.exports = authUser