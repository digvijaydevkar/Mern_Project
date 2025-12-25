const express=require("express");
const result=require("../utils/result")
const pool=require("../db/pool")
const crypto=require("crypto-js")

const router=express.Router();
//add a student to a course
router.post("/register-to-course",(req,res)=>{
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



//update password
router.put("/change-password",(req,res)=>{
    const{email,newpassword,confirmpassword}=req.body;
   
    
    
     if(newpassword != confirmpassword){
        return res.send(result.createResult("passwords do not match"));
    }

    // const hashedpassword=crypto.SHA256(newpassword).toString();
    const sql=`UPDATE users SET password=? WHERE email=?`;
    pool.query(sql,[confirmpassword,email],(error,data)=>{
        if(error){
            return res.send(result.createResult(error));
        }
        
        else if(data.affectedRows==0){
            return res.send("Invalid credintial");
        }

        res.send(result.createResult(null,data));
    })

})


// /get all registered courses of a student

router.get("/my-courses",(req,res)=>{
    const { email } = req.query;

    const sql = `
      SELECT c.course_name
      FROM courses c
      INNER JOIN students s ON s.course_id = c.course_id
      WHERE s.email = ?
    `;

    pool.query(sql,[email],(error,data)=>{
        if(error){
            return res.send(result.createResult(error));
        }
        else if(data.length==0){
             return res.send(result.createResult("NO courses are available"));
        }
        res.send(result.createResult(null,data));
    })
})

///my-coursewith-videos
router.get("/my-coursewith-videos", (req, res) => {
    const { email } = req.query;

    const sql = `
        SELECT 
            c.course_id,
            c.course_name,
            v.video_id,
            v.title,
            v.youtube_url
        FROM students s
        INNER JOIN courses c ON s.course_id = c.course_id
        INNER JOIN videos v ON c.course_id = v.course_id
        WHERE s.email = ?
    `;

    pool.query(sql, [email], (error, data) => {
        if (error) {
            return res.send(result.createResult(error));
        }
        res.send(result.createResult(null, data));
    });
});



module.exports=router;