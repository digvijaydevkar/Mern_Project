//common api page
const express = require('express')
const pool = require('../db/pool')
const result = require('../utils/result')
const config = require('../utils/config')
const cryptojs = require('crypto-js')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post("/student/register-to-course",(req,res)=>{
    const {name,email, course_id,mobile_no}=req.body;

    // step 1 check if user exists
        const usersql="SELECT * FROM users WHERE email=?";
    pool.query(usersql,[email],(error,data)=>{
        if(error){
            return res.send(result.createResult(error));
        }
        else if(data.length==0){
            const password = "sunbeam";
            // crypto 
            // const hashedpassword=crypto.SHA256(password).toString();
            const role="student";
             const uusersql=`INSERT INTO users(email,password,role) VALUES(?,?,?)`;
             pool.query(uusersql,[email,password,role],(error,data)=>{

                if(error){
                    return res.send(result.createResult(error));
                }

                const sql=`INSERT INTO students(name,email, course_id,mobile_no) VALUES(?,?,?,?)`;
                 pool.query(sql,[name,email, course_id,mobile_no],(error,data)=>{
                     if(error){
                        return res.send(result.createResult(error));
                    }
                  res.send(result.createResult(null,data));
                }) 
             })    
        }
         else{
             const sql=`INSERT INTO students(name,email, course_id,mobile_no) VALUES(?,?,?,?)`;
             pool.query(sql,[name,email, course_id,mobile_no],(error,data)=>{
             if(error){
                 return res.send(result.createResult(error));
             }
            res.send(result.createResult(null,data));
            })
    
        }
        
})

})


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
    const sql = 'SELECT * FROM courses ;'
    console.log("🔥 ALL ACTIVE COURSES API HIT")
    pool.query(sql, (error,data) => {
        res.send(result.createResult(error, data))
    })
})

module.exports = router