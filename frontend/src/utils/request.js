import axios from "axios";

const baseURL = "https://0067team4db.mysql.database.azure.com";
// create an axios instance
const request = axios.create({
  baseURL,
  timeout: 5000
})
// response interceptor 
request.interceptors.response.use(
  response => {
    // console.log("response = ", response)
    const res = response.data
    return res
  },
  error => {
    console.log('err = ', error) 
    return Promise.reject(error)
  }
) 
  
export default request;
