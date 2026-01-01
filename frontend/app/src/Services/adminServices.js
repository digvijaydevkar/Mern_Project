import axios from "axios";
import config from "./Config";

export async function getAllCourses(token) {
    const url = config.BASE_URL + '/courses/all-courses'
    const headers = { token }
    const response = await axios.get(url, { headers })
    return response.data
}

export async function getCourseInfo2(Course_id) {
    const url = `${config.BASE_URL}/courses/getInfo/${Course_id}`
    const response = await axios.get(url)
    return response.data
}

export async function UpdateCourseById(token, id, course_name, description, start_date, end_date, fees, video_expire_days) {
    const url = `${config.BASE_URL}/courses/${id}`
    const body = { course_name, description, start_date, end_date, fees, video_expire_days }
    const headers = { token }

    const response = await axios.put(url, body, { headers })
    return response.data
}

export async function deleteCourseById(token, id) {
    const url = `${config.BASE_URL}/courses/${id}`
    const headers = { token }

    const response = await axios.delete(url, { headers })
    return response.data
}

export async function getAllVideos(token) {
    const url = config.BASE_URL + '/videos/all-videos'
    const headers = { token }
    const response = await axios.get(url, { headers })
    return response.data
}

export async function getVideoInfo(token, video_id) {
    const url = `${config.BASE_URL}/videos/getInfo/${video_id}`
    const headers = { token }
    const response = await axios.get(url, { headers })
    return response.data
}

export async function updateVideoById(token, id, title, description, youtube_url) {
    const url = `${config.BASE_URL}/videos/${id}`
    const body = { id, title, description, youtube_url }
    const headers = { token }

    const response = await axios.put(url, body, { headers })
    return response.data
}

export async function deleteVideoById(token, id) {
    const url = `${config.BASE_URL}/videos/${id}`
    const headers = { token }

    const response = await axios.delete(url, { headers })
    return response.data
}

export async function addCourse(token, course_name, description, fees, start_date, end_date, video_expire_days) {
    const url = config.BASE_URL + '/courses/add'
    const headers = { token }
    const body = { course_name, description, fees, start_date, end_date, video_expire_days }
    const response = await axios.post(url, body, { headers })
    return response.data
}

export async function addVideo(token, course_id, title, youtube_url, description) {
    const url = config.BASE_URL + '/videos/add'
    const headers = { token }
    const body = { course_id, title, youtube_url, description }
    const response = await axios.post(url, body, { headers })
    return response.data
}

export async function getAllStudent(token) {
    const url = config.BASE_URL + '/admin/enrolled-students'
    const headers = { token }
    const response = await axios.get(url, { headers })
    return response.data
}