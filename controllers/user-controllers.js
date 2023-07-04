import User from "../models/User.js";
import bcrypt from "bcrypt";
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(201).json({ users });
  } catch (err) {
    console.log(err);
    res.status(500).json({message : "UNEXPECTED ERROR OCCURED"});
}
};

export const getUserById = async(req, res)=>{
  try{
    const {id} = req.params;
    console.log(id)
    const user = await User.findById(id)
    res.status(200).json(user)
  }
  catch{
    res.status(404).json({message : "USER NOT AVAILABLE"})
  }
}
export const signup = async (req, res) => {
  const { name, email, password } = req.body;
 
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() !== "" &&
    password.length < 6
  ) {

    return res.status(404).json({ message: "INVALID DATA" });
  }
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  let user = new User({ ...req.body, password: hashedPassword });
  try {
    const newuser = await user.save();
    res.status(200).json({user, message : "Account Successfully Created"});
  } catch (err) {
    console.log(err);
    res.status(400).json({message : "Email already exists", err});
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() !== "" &&
    password.length < 6
  ) {
    return res.status(422).json({ message: "Invalid Data" });
  }

  // const x = await bcrypt.compare(password, )
  try{
  let existingUser = await User.findOne({ email });
  if (!existingUser)
    return res.status(404).json({ message: "User Not found" });
  const verifyPassword = await bcrypt.compare(password, existingUser.password);
  if (!verifyPassword)
    return res.status(404).json({ message: "Incorrect Password" });

  return res
    .status(200)
    .json({ id: existingUser._id, message: "Login Successfull" });
  }
  catch(err){
    return res.status(404).json({message : "InValid Credentials"})
  }
};
