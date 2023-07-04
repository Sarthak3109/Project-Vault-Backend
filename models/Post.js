import mongoose from 'mongoose';
// import User from './User';
const { Schema } = mongoose;

const postSchema = new Schema({
  title : {type : String, required : true},
  description : {type : String, required: true},
  imageURL : {type : String, required:true},
  date : {type : String, required : true},
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  link : {type : String},
  type : {type : String, required : true}

});

export default mongoose.model('Post', postSchema);