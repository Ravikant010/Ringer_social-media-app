import mongoose from "mongoose";
const csrfSchema = new mongoose.Schema({
    _id: {
      type: String,  // use a string type for the custom _id value
      required: true
    },
    token: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: '30m'  // automatically delete expired tokens after 30 minutes
    }
  });
  
  export const  csrftoken_schema = mongoose.model('CsrfToken', csrfSchema);
  