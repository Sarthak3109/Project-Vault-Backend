import Post from "../models/Post.js";
import User from "../models/User.js";
import mongoose from "mongoose";
export const getAllPosts = async (req, res)=>{
    try {
       
        let posts 
        
        if(req.query.type)
            posts = await Post.find({type : req.query.type})
        else
            posts = await Post.find({})
        res.status(201).json({ posts });
      } catch (err) {
        console.log(err);
        res.status(500).json({message : "UNEXPECTED ERROR OCCURED"});
      }
}

export const addPost = async (req, res)=>{
    const {title, description, date, imageURL, user, type, link} = req.body
    if(!title && title.trim() !== "" && !description && description.trim() !== ""  && !date && date.trim() != "")
        return res.status(422).json({message : "INVALID DATA"})
    let post = new Post({...req.body, date : new Date(req.body.date)})
    // post = await post.save()
    // if(!post)
    //     return res.status(500).json({message : "Unexpected Error occurred"})
    // return res.status(201).json({post})
    let existingUser;
    try {
      existingUser = await User.findById(user);
    } catch (err) {
      return console.log(err);
    }

    if (!existingUser) {
        return res.status(400).json({ message: "Unable TO FInd User By This ID" });
      }


    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await post.save({ session });
        existingUser.posts.push(post);
        await existingUser.save({ session });
        await session.commitTransaction();
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "INTERNAL SERVER ERROR, PLEASE TRY AGAIN" });
      }

      return res.status(200).json({ post , message : "POST SUCCESSFULLY ADDED"});
}

export const getPostById = async (req, res)=>{
    const {id} = req.params
    try{
        const post = await Post.findById(id)
        return res.status(200).json({post})
    }
    catch(err){
        res.status(500).json({message : 'post not found'})
    }
}

export const updatePost = async(req, res)=>{
    const {id} = req.params
    const {title, description, date, imageURL,  type, link} = req.body
  

    let post;
    try{
        let post = Post.findByIdAndUpdate(id, {
            data:new Date(`${date} `) ,
            title, description, imageURL,link, type
        })
        post = await post.exec()
        console.log(post)
        if(!post)
        return res.status(500).json({message: "POST NOT FOUND"})
        else
        return res.status(200).json({message : "POST SUCCESSFULLY UPDATED"})
    }
    catch(err){
        console.log(err)
        return console.log(err)
    }
}

export const deletePost = async (req, res)=>{
    const id = req.params.id;

    let post;
    try {
      post = await Post.findByIdAndRemove(id).populate("user");
      await post.user.posts.pull(post);
      await post.user.save();
    } catch (err) {
      console.log(err);
    }
    if (!post) {
      return res.status(500).json({ message: "Unable To Delete" });
    }
    return res.status(200).json({ message: "Successfully Deleted" });
}