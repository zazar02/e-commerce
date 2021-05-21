import axios from "axios";

const api=axios.create({
    baseURL : 'http://localhost:8080/api'
})

export default api;

api.interceptors.request.use((req) => {
    const token = localStorage.getItem('token')
    req.headers["Authorization"] = "Bearer "+ token
    return req  
})