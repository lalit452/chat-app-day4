import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : "https://chat-app-day4.vercel.app/api",
    withCredentials: true, 
})   