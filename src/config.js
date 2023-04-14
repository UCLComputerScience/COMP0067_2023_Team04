import axios from "axios";

export default axios.create({
    baseURL: "http://20.254.93.210/",
    headers: {
        "Content-type": "applications/json"
    }
})
const API_BASE_URL = '';

export {API_BASE_URL};