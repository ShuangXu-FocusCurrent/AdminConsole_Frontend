import axios from 'axios';
import { configProviderProps } from 'element-plus';




//creating an Axios instance
const service = axios.create({
  baseURL: 'http://localhost:5046/api/Registration/', // Update this to match your backend
  timeout: 5000,
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
})

//Request Interception
service.interceptors.request.use((config) => {
  config.headers = config.headers || {}
  if(localStorage.getItem("token")){
      config.headers.token = localStorage.getItem("token") || ""
  }
  return config
})

//Response Interception
service.interceptors.response.use(({ data }) => {
  const code : number = data.data.code
  if(code != 200){
      return Promise.reject(data)
  }
  return data
},(err) => {
  console.log(err)
})

export default service
