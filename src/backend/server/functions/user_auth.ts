import { Request, Response, NextFunction } from "express"
import { user_model } from "../../model/usermodel"
import Jwt  from "jsonwebtoken";
import bcrypt from "bcrypt"
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
}
    else{
        const user  = await user_model.findOne({email }); 
        console.log(user)
        if(user){
            const usersalted_hashed_password = await bcrypt.hash(password, user.salt)
            console.log(usersalted_hashed_password, user.password)
            if((usersalted_hashed_password === user.password))
            {
        const token = generateToken(email, password);
        console.log(token)
        res.cookie('token', token, { httpOnly: true, secure: true , maxAge: 3600000});
        res.status(200).json({
          response: "User created successfully",
          token: token,
          _id : user._id
        });
            }
        }
        else{
            res.send({ message: 'password is wrong' });
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
console.log(req.params)
const existing_user = await user_model.findOne({_id: req.params.id}, "fullname username email phone DOB country")
if(existing_user)
res.send(existing_user)
else
res.send({message: "user is not found"})
}