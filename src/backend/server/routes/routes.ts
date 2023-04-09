import express  from "express";
import { signup, login,send_user_details } from "../functions/user_auth";
import { Request, Response,NextFunction, Router } from 'express';
import { follows_model, Follows, } from '../../model/follows.model';
// import { Session } from 'express-session';
import csurf from "csurf";
import { csrftoken_schema } from "../model/csrf";
import jwt  from "jsonwebtoken";
import { Document } from "mongoose";
import { following,get_number_of_follower} from "../../server/functions/user_follows"
import  { addComment, getComments, deleteComment }  from "../functions/commenting"
import { user_model } from "../../model/usermodel";
export const Route = express.Router()
Route.post("/login",   login)
Route.post('/signup', signup)
  async function verifyCSRFToken(req: any, res: any, next: any) {
    console.log(req.query, "req.params")
    if(!req.headers['x-csrf-token'] && req.query.id){
      console.log(req.query, "req.params")
      interface stored_csrf_interface extends Document{
        _id:string,
        token:string,
        createdAt:string,

      }
      const stored_csrf:stored_csrf_interface | null = await csrftoken_schema.findOne({_id: req.query.id}, "_id token createdAt")
      if(stored_csrf)      
      res.setHeader('X-CSRF-Token',stored_csrf.token as string)
return next()
    }
    const { id } = req.query;
    console.log(id);
    const csrfToken = req.headers['x-csrf-token'];
    const tokenDoc = await csrftoken_schema.findOne({ _id: id });
    if (!tokenDoc) {
      return res.status(403).json({ error: 'Invalid CSRF token' });
    }
  
    if (tokenDoc.token !== csrfToken) {
      return res.status(403).json({ error: 'Invalid CSRF token' });
    }
  
    next();
  }
  
Route.use(verifyCSRFToken)
  
Route.get('/fetchuser', send_user_details)
Route.post("/follow",following)
Route.post("/bulk", async (req, res) => {
  interface userinterface {
    fullname: string;
    username: string;
    email: string;
    phone: number;
    password: string;
    DOB: string;
    country: string;
    salt: string;
  }

  try {
    const docs: userinterface[] = req.body;
    console.log(docs);
    const results = [];
    for (let i = 0; i < docs.length; i++) {
      const doc = new user_model(docs[i]);
      const result = await doc.save();
      results.push(result);
    }
    console.log(`${results.length} documents saved successfully`);
    res.send(results);
  } catch (error) {
    console.error(error);
    res.send(new Error());
  }
});


Route.delete("/dl", async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;
    const result = await user_model.deleteMany({ "password":"password123" });
    console.log(`${result.deletedCount} documents deleted successfully`);
    res.status(200).json({ message: `${result.deletedCount} documents deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

Route.get('/follow/counts',get_number_of_follower)