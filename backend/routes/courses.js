const express = require('express')
const pool = require('../db/pool')
const result = require('../utils/result')

const router = express.Router()

router.get('/all-active-courses', (req, res) => {
    const sql = 'SELECT * FROM courses WHERE CURDATE() < start_date;'
    pool.query(sql, (error,data) => {
        res.send(result.createResult(error, data))
    })
})

router.get('/all-courses', (req, res) => {
    const sql = 'SELECT * FROM COURSEs'
    pool.query(sql, (error,data) => {
        res.send(result.createResult(error, data))
    })
})

router.post('/add', (req, res) => {
    const {course_name, description,fees, start_date, end_date,video_expire_days} = req.body
    const sql = 'INSERT INTO courses(course_name, description,fees, start_date, end_date,video_expire_days) VALUES(?,?,?,?,?,?)'
    pool.query(sql, [course_name, description,fees, start_date, end_date,video_expire_days] ,(error,data) => {
        res.send(result.createResult(error, data))
    })
})

router.put('/update/:courseId', (req, res) => {
    const courseId = req.params.courseId    
    const {course_name, description,fees, start_date, end_date,video_expire_days} = req.body
    const sql = 'UPDATE courses SET course_name=?, description=?,fees=?, start_date=?, end_date=?,video_expire_days=? WHERE Course_id = ?'

    pool.query(sql, [course_name, description,fees, start_date, end_date,video_expire_days,courseId] ,(error,data) => {
        res.send(result.createResult(error, data))
    })
})

router.delete('/delete/:courseId', (req, res) => {
    const courseId = req.params.courseId
    const sql = 'DELETE FROM courses WHERE Course_id = ?'

    pool.query(sql, [courseId] ,(error,data) => {
        res.send(result.createResult(error, data))
    })
})

module.exports = router