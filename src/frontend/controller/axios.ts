import axios from "axios"

export const API  = axios.create({
baseURL: "https://ringer.onrender.com",
headers: {
    "content-type": "application/json",
    "accept": "application/josn",
    "Access-Control-Allow-Origin": "*",
    
},
timeout: 5000,
withCredentials: true
})