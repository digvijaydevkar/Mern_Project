import axios from "axios";
import config from "./Config";

export async function getCourseInfo(course_id) {
    const token = localStorage.getItem("token") // ✅ get token

    const url = `${config.BASE_URL}/courses/${course_id}`

    const response = await axios.get(url, {
        headers: {
            token: token   // ✅ EXACT header name backend expects
        }
    })

    return response.data
}

export async function resetPassword(email, newpassword, confirmpassword) {
    const url = `${config.BASE_URL}/student/change-password`;
    const body = { 
        email, 
        newpassword, 
        confirmpassword 
    };

    try {
        const response = await axios.put(url, body);
        console.log(registerToCourse.data)
        return response.data;
    } catch (error) {
        console.error("Error during password reset:", error);
        return { status: 'error', data: 'Server communication failed' };
    }
}


// Add this to your existing services file
export async function getMyCourseWithVideos(courseId,token) {
     const url = `${config.BASE_URL}/student/my-course-with-videos/${courseId}`;
    const response = await axios.get(url, {
        headers: {
            token: token // This matches req.headers.token in your auth.js
        }
    });
    console.log("Response from getMyCourseWithVideos:", response.data);
    return response.data;
}


export async function getMyCourses(token) {
    const url = config.BASE_URL + '/student/my-courses'

    const response = await axios.get(url, {
        headers: {
            token: token   // ✅ EXACT header name backend expects
        }
    })
    console.log("Token used in getMyCourses:", token);  
    console.log("Response from getMyCourses:", response.data);
    return response.data
}


export async function getCourseWithVideos(Course_id, token) {
    const url = `${config.BASE_URL}/student/my-course-with-videos/${Course_id}`
    const headers = { token }

    const response = await axios.get(url, { headers })
    return response.data
}

export async function registerToCourse(name, email, course_id, mobile_no) {
    const url = config.BASE_URL + '/student/register-to-course'
    const body = { name, email, course_id, mobile_no }
    const response = await axios.post(url, body)
    return response.data
}

export async function getVideo(video_id, token) {
    const url = `${config.BASE_URL}/student/my-course/video/${video_id}`
    const headers = { token }

    const response = await axios.get(url, { headers })
    return response.data
}