import axios from "axios"

export const API  = axios.create({
baseURL: process.env.baseURL as string || "http://localhost:8080",
headers: {
    "content-type": "application/json",
    "accept": "application/josn",
    "Access-Control-Allow-Origin": "*",
    
},

timeout: 5000,
withCredentials: true
})