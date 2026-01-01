import axios from "axios";
import config from "./Config";

export async function loginUser(email, password) {
    const url = config.BASE_URL + '/auth/login'
    const body = { email, password }

    const response = await axios.post(url, body)
    console.log("Response from loginUser:", response.data.role);
    return response.data
}

export async function getAllActiveCourses() {
    const url = config.BASE_URL + '/courses/all-active-courses'
    const response = await axios.get(url)
    return response.data
}


