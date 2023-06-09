import express from "express"
import * as dotenv from "dotenv"
import connectDB from "../../model/usermodel"
import { Route } from "./../routes/routes"
import cors from "cors"
const app = express()
dotenv.config({path: "/root/Downloads/ringer/.env"})
console.log(process.env.PORT)
app.use(cors({origin:["http://localhost:8081", "http://192.168.1.5:8081", "http://192.168.43.221:8081"], credentials: true}))
app.use(express.json())
app.use(Route)
connectDB();
app.listen(process.env.PORT || 8080, ()=>console.log('listening on port', process.env.PORT))