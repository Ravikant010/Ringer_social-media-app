import { Request, Response, NextFunction } from "express"
import { user_model } from "../../model/usermodel"
import Jwt  from "jsonwebtoken";
import * as crypto from 'crypto';
import bcrypt from "bcrypt"
import {csrftoken_schema} from "../model/csrf"
function generateToken(payload:string, secret:string) {
    const token = Jwt.sign({email: payload}, secret, {algorithm: "HS256", expiresIn: '1d' });
    return token;
  }
const finduser = async (req: Request, res: Response, Next: NextFunction)=>{
    const {username,email} = req.body
    try {
        const user = await user_model.findOne({$or: [{ username }, { email }]});
    
        if (user) {
          res.send({ exists: true });
        }
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
      }
    }
    export const login = async (req: Request, res: Response, next: NextFunction)=>{
      const {email, password} = req.body
      console.log(email, password)
      if (!email || !password){
          return res.status(400).json({
              error: "Please provide username and password"
          })
      } else {
          const user  = await user_model.findOne({email }); 
          console.log(user)
          if(user){
              const usersalted_hashed_password = await bcrypt.hash(password, user.salt)
              console.log(usersalted_hashed_password, user.password)
              if((usersalted_hashed_password === user.password))
              {
                const csrfToken = crypto.randomBytes(32).toString('hex')
                 await csrftoken_schema.findOneAndUpdate(
                  { _id: user.id, },
                  { token: csrfToken },
                  { upsert: true }
              )
                
                // req.session.userId = user._id as string
                // req.session.csrfToken = csrfToken as string
                  res.setHeader('X-CSRF-Token',csrfToken );
                  // res.setHeader('X-CSRF-Token', req.csrfToken())
                  console.log(req.session)
                  // req.session.userId = user._id
                  const token = generateToken(email, user._id.toString());
                  console.log(token)
                  // req.headers['x-csrf-token'] = csrfToken
                  
                  res.cookie('token', token, { httpOnly: true, secure: true , maxAge: 3600000, sameSite: true});
                 
                  res.status(200).json({
                      response: "User created successfully",
                      token: token,
                      _id : user._id
                  });
              } else {
                  res.send({ message: 'password is wrong' });
              }
          } else {
              res.send({ message: 'user not found' });
          }
      }
  }
  
export const logout = (req: Request, res: Response, Next: NextFunction)=>{

}
export const signup = async (req: Request, res: Response, next: NextFunction)=>{
    console.log(req.body)
    const {username, email, password} = req.body
    try {
        const existing_user = await user_model.findOne({$or: [{ username }, { email }]});
        console.log(existing_user)
        if (existing_user) {
          res.send({ exists: true });
          return; 
        }
    
        const newUser = new user_model(req.body);
        await newUser.save();
        const token = generateToken(email, password);
        res.cookie('token', token, { httpOnly: true, secure: true , maxAge: 3600000});
        res.status(200).json({
          response: "User created successfully",
          token: token
        });
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
      }
}



export const send_user_details = async (req: Request, res: Response, Next: NextFunction) => {

const existing_user = await user_model.findOne({_id: req.query.id}, "fullname username email phone DOB country")
if(existing_user){  
  
res.send(existing_user)
}
else
res.send({message: "user is not found"})
}