import mongoose, { Schema, connect, Document,ObjectId, Model } from "mongoose";

interface userFollowings {
    username: String,
    followers: [{type: ObjectId}]
    following: [{type: ObjectId}]
  }
  
  
  export const follows = new Schema<userFollowings>({
    username: {type: String,},
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  })
  interface IUser extends Document {
    user: Schema.Types.ObjectId;
    following: Schema.Types.ObjectId[];
    followers: Schema.Types.ObjectId[];
  }
  
const FollowsSchema = new mongoose.Schema<IUser>({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

export const Follows:Model<IUser> = mongoose.model('Follows', FollowsSchema);

  export const follows_model = mongoose.model('following', follows);
  
  