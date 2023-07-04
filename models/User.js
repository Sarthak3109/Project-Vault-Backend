import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  name : {type : String, required : true},
  email : {type : String, required: true, unique: true},
  password : {type : String, required:true, minLength : 6},
  posts: [{ type: mongoose.Types.ObjectId, ref: "Post", required: true }],

});

export default mongoose.model('User', UserSchema);