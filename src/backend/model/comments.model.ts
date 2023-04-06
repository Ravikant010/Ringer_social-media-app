import mongoose, { Schema, connect, Document,ObjectId } from "mongoose";

const commentSchema = new mongoose.Schema({
    commenter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now },
    text: String,
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
  });
  

  export const Comment = mongoose.model('Comments', commentSchema);