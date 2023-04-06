import mongoose, { Schema, connect, Document,ObjectId } from "mongoose";

interface user_activity {
    username: String,
    followers: [{type: ObjectId, ref: "User"}]
    following: [{type: ObjectId, ref: "User"}]
  }
  
  
  export const follows = new Schema<user_activity>({
    username: String,
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  })
  
  export const follows_model = mongoose.model('user_activity', follows);
  
  