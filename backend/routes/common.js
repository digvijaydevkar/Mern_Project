const express = require('express')
const pool = require('../db/pool')
const result = require('../utils/result')
const config = require('../utils/config')
const cryptojs = require('crypto-js')
const jwt = require('jsonwebtoken')

const router = express.Router()

//login
router.post('/auth/login', (req,res) => {
    const {email, password} = req.body
    // const hashPass = cryptojs.SHA224(password).toString()
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
                email : user.email,
                role : user.role
            }
            const token = jwt.sign(payload, config.SECRET)
            const userData = {
                token
            }

            res.send(result.createResult(null, userData))
        }
    })
})

// router.post('/auth/sign-up', (req, res) => {
//     const{email, password} = req.body
//     const sql = 'INSERT INTO users(email, password, role) VALUES(?,?,?)'

//     pool.query(sql, [email, password,'student'], (error, data) => {
//         res.send(result.createResult(error, data))
//     })
// })

router.get('/courses/all-active-courses', (req, res) => {
    const sql = 'SELECT * FROM courses WHERE CURDATE() < start_date;'
    pool.query(sql, (error,data) => {
        res.send(result.createResult(error, data))
    })
})

module.exports = router