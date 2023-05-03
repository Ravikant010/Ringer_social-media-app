import express, { NextFunction, Response } from "express"
import * as dotenv from "dotenv"
import connectDB from "../model/usermodel"
import { Route } from "./routes/routes"
import cors from "cors"
import * as crypto from 'crypto';
import session, {SessionOptions} from 'express-session';
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
    credentials: true,
    exposedHeaders: 'x-csrf-token',

  }

app.use(cors(corsOptions));

interface CustomSessionOptions extends SessionOptions {
    maxAge: Date;
}

declare module 'express-session' {
    interface SessionData {
        userId: string;
        csrfSecret?: string;
        csrfToken:string
    }
}

const sessionOptions: CustomSessionOptions = {
    secret: '123456', // Set a secret key to sign the session ID cookie
    resave: false, // Don't save the session to the store on every request
    saveUninitialized: true, // Don't save uninitialized sessions to the store
    cookie: { secure: true, maxAge: 3600000*24  },
    maxAge: new Date(Date.now() + 3600000*24), // Set the session expiration time to one hour
};
app.use(express.json())
app.use(session(sessionOptions));
const allowedOrigins = ["http://localhost:8081","http://192.168.1.5:8081","https://ringer-social-media-app.vercel.app","http://ringer-social-media-app.vercel.app", "https://ringer.vercel.app", "http://ringer.vercel.app", "https://ringer-mptoxv1fv-peterparkerahere-gmailcom.vercel.app"];

interface CustomRequest extends Request {
    session: any;
}



app.use(Route);

connectDB();
app.listen(process.env.PORT || 8080, ()=>console.log('listening on port', process.env.PORT))

