const express = require("express")
const result = require("../utils/result")
const pool = require("../db/pool")
const crypto = require("crypto-js")

const router = express.Router();
//add a student to a course



//update password
router.put("/change-password", (req, res) => {
    const { email, newpassword, confirmpassword } = req.body;



    if (newpassword != confirmpassword) {
        return res.send(result.createResult("passwords do not match"));
    }

    // const hashedpassword=crypto.SHA256(newpassword).toString();
    const sql = `UPDATE users SET password=? WHERE email=?`;
    pool.query(sql, [confirmpassword, email], (error, data) => {
        if (error) {
            return res.send(result.createResult(error));
        }

        else if (data.affectedRows == 0) {
            return res.send("Invalid credintial");
        }

        res.send(result.createResult(null, data));
    })

})


// /get all registered courses of a student

// student.js
router.get("/my-courses", (req, res) => {
    // 🔥 Get the email that was verified and attached by auth.js
    const email = req.headers.email;

    // Log this to your terminal to see if it's actually there
    console.log("Fetching courses for email:", email);

    const sql = `
      SELECT c.course_name
      FROM courses c
      INNER JOIN students s ON s.course_id = c.course_id
      WHERE s.email = ?
    `;

    pool.query(sql, [email], (error, data) => {
        if (error) {
            return res.send(result.createResult(error));
        }
        // If data is empty, the email from the TOKEN doesn't exist in the 'students' table
        if (!data || data.length === 0) {
            return res.send(result.createResult("NO courses are available"));
        }
        res.send(result.createResult(null, data));
    });
});
///my-coursewith-videos

router.get('/my-course-with-videos/:course_id', (req, res) => {
    const email = req.headers.email
    const course_id = req.params.course_id
    const sql = `SELECT 
    c.course_id, 
    c.course_name, 
    v.video_id, 
    v.title, 
    v.youtube_url
    FROM students s
    INNER JOIN courses c ON s.course_id = c.course_id
    LEFT JOIN videos v ON c.course_id = v.course_id
    WHERE s.email = '125@gmail.com';`
    pool.query(sql, [email, course_id], (error, data) => {
        res.send(result.createResult(error, data))
    })
})


 module.exports = router;

// SELECT c.*, v.video_id, v.title, v.youtube_url, v.added_at,c.video_expire_days
//                  FROM students s
//                  INNER JOIN courses c ON s.course_id = c.course_id
//                  INNER JOIN videos v ON v.course_id = c.course_id
//                  WHERE s.email = '125@gmail.com' AND DATEDIFF(CURDATE(), v.added_at) <= c.video_expire_days AND c.course_id = 3