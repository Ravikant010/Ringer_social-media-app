import express from "express"
import * as dotenv from "dotenv"
import connectDB from "../model/usermodel"
import { Route } from "./routes/routes"
import cors from "cors"
const app = express()
dotenv.config({path: "/root/Downloads/ringer/.env"})
console.log(process.env.PORT)
const corsOptions = {
    origin: function (origin:any, callback:any) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  }
  
  app.use(cors(corsOptions));
  
const allowedOrigins = ["http://localhost:8081","https://ringer-social-media-app.vercel.app","http://ringer-social-media-app.vercel.app", "https://ringer.vercel.app", "http://ringer.vercel.app"];


app.use(express.json())
app.use(Route)
connectDB();
app.listen(process.env.PORT || 8080, ()=>console.log('listening on port', process.env.PORT))