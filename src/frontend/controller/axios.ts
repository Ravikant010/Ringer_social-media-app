import axios from "axios"

export const API  = axios.create({
baseURL: "http://192.168.1.5:8080",
headers: {
    "content-type": "application/json",
    "accept": "application/josn",
    "Access-Control-Allow-Origin": "*",
    
},

timeout: 5000,
withCredentials: true
})