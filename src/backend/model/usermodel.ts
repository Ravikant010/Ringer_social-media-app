import mongoose, { Schema, connect, Document,ObjectId } from "mongoose";
import * as dotenv from "dotenv"
import bcrypt from "bcrypt";
dotenv.config({path: "/root/Documents/projects/ringer/.env"})
interface userinterface extends Document{
    fullname: string;
    username: string;
    email: string;
    phone: number;
    password: string;
    DOB: string;
    country : string;
    salt:string
}

export const user = new Schema<userinterface>({
fullname: { type: String, required: true },
username: { type: String, required: true},
email: { type: String, required: true},
phone: { type: Number, required: true},
password: { type: String, required: true},
DOB: { type: String, required: true},
country : { type: String, required: true},
salt: { type: String},
})



user.pre<userinterface>("save", async function() {
  console.log("called")
  const user = this;
  // if(!user.isModified("password")){
     this.salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(user.password, this.salt);
    user.password = hash;
    
  }
)
const connectDB = async () => {
  console.log(process.env.MONGO_URI as string)
  try {
    await mongoose.connect(process.env.MONGO_URI as string, { 
   
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};
export const user_model = mongoose.model('user', user);
export default connectDB;