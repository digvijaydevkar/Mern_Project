const jwt = require('jsonwebtoken')
const config = require('./config')
const result = require('./result')

function authUser(req, res, next) {
    const path = req.url
    if (path == '/auth/login' || path == '/courses/all-active-courses' || path == "/student/register-to-course")
        next()

    else {
        const token = req.headers.token
        if (!token) {
            console.log(token)

            res.send(result.createResult('Token is missing'))
        }
        else {
            // auth.js
            try {
                const payload = jwt.verify(token, config.SECRET);
                req.headers.email = payload.email;
                req.headers.role = payload.role;
                console.log("Authenticated user: ", payload.email, " with role: ", payload.role);
                next();
            } catch (e) {
                res.send(result.createResult('Token is invalid'));
            }

        }
    }
}


function checkAuthorization(req, res, next) {
    const role = req.headers.role
    console.log("current user role: ", role);

    if (role == "admin")
        return next()

    return res.send(result.createResult("Unauthorized Access"))
}

module.exports = { authUser, checkAuthorization }
