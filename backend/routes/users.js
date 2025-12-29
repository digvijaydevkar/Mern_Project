const express = require('express')
const pool = require('../db/pool')
const result = require('../utils/result')
const config = require('../utils/config')
const cryptojs = require('crypto-js')
const jwt = require('jsonwebtoken')

const router = express.Router()

//login
router.post('/login', (req,res) => {
    const {email, password} = req.body
    const hashPass = cryptojs.SHA224(password).toString()
    const sql = 'SELECT * FROM users WHERE email = ? and password = ?'

    pool.query(sql, [email, password], (error, data) => {
        if(error){
            res.send(result.createResult(error))
        }
        else if(data.length == 0){
            res.send(result.createResult('Invalid email or password'))
        }
        else{

            const user = data[0]
            const payload = {
                role : user.role
            }
            const token = jwt.sign(payload, config.SECRET)
            const userData = {
                email : user.emial,
                token
            }

            res.send(result.createResult(null, userData))
        }
    })
})


module.exports = router