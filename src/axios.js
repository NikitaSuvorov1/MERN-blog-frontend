import axios from "axios";

const instance = axios.create({
    // baseURL: ///process.env.REACT_APP_API_URL
    // baseURL: "http://localhost:4444"
    // baseURL: process.env.REACT_APP_API_URL
    baseURL: "https://mern-blog-service-api.onrender.com/"
})

instance.interceptors.request.use((config) => {
    config.headers.auth = window.localStorage.getItem('token')
    return config;
})

export default instance;