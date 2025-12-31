//studentData api page

const express = require('express')
const pool = require('../db/pool')
const result = require('../utils/result')
const { checkAuthorization } = require('../utils/auth')

const router = express.Router()

router.get('/enrolled-students', checkAuthorization, (req, res) => {
    const { course_id } = req.query
    const sql = 'SELECT * FROM students WHERE course_id = ?'
    pool.query(sql, [course_id], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

module.exports = router