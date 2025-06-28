import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout:10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

//Request Interceptor
axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken = localStorage.getItem('token');
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
);

//Response Interceptor
axiosInstance.interceptors.response.use(
    (response)=>{
        return response
    },
    (error)=>{
        //globally return common errors
        if(error.response){
            if(error.response.status === 401){
                //redirect to login page
                localStorage.removeItem('token');
                window.location.href = '/login';
            } else if(error.response.status === 500){
                console.error("Internal Server Error, Please try again.");
            }
        } else if(error.code === 'ECONNABORTED'){
            console.error("Request timed out, Please try again.");
        }
        return Promise.reject(error)
    }
);

export default axiosInstance;