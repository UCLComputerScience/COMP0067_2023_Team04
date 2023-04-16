import axios from "axios";

export default axios.create({
    baseURL: "https://20.254.93.210:8080/",
    headers: {
        "Content-type": "application/json"
    }
});