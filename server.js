import express from "express"
import mongoose, { connect } from "mongoose"
import dotenv from "dotenv"
import userRouter from './routing/user-routes.js'
import postRouter from './routing/post-routes.js'
import bodyParser from "body-parser"
import cors from "cors"
dotenv.config()
const app = express()

//middlewares
app.use(cors())
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use('/user', userRouter)
app.use('/post', postRouter)

/// MONGOOSE IS CONNNECTION
main().catch(err => console.log(err));
async function main() {
  try
 { const connection_string = process.env.MONGODB_CONNECTION_STRING
  await mongoose.connect(connection_string);
  console.log("connected")}
  catch(err){
    console.log("connection to db failed")
  }
}

app.get('/', (req, res)=>{
  res.json({message : "hey there lil buddy"})
})
// END OF MONGOOSE
const PORT = process.env.PORT || 8080
app.listen(PORT, ()=>{
    console.log("sevrer running")
})