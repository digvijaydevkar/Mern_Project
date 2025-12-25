const express = require("express")
const app = express()

const courseRouter = require('./routes/courses')
const videosRouter = require('./routes/videos')
const userRouter = require('./routes/users')
const authUser = require('./utils/auth')
const studentRouter = require('./routes/student')


app.use(express.json())
// app.use(authUser)
app.use('/courses', courseRouter)
app.use('/videos', videosRouter)
app.use('/auth',userRouter)
app.use('/student',studentRouter)

app.listen(4000, 'localhost', (req, res) => {
    console.log("Server started at 4000")
})
