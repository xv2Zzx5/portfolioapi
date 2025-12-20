import express from "express";
import cors from "cors"
import dotenv from "dotenv"


import userRouter from "./routes/user.js";
import loginRouter from "./routes/login.js"
import postsRouter from "./routes/posts.js"


dotenv.config()

const PORT = process.env.PORT||5000;
const app = express();



//Middlewares 
app.use(cors({
        origin: process.env.FRONT_END_ORIGIN, 
        methods:["GET","POST","DELETE","PUT"]
}

))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use("/posts",  postsRouter)
app.use("/user", userRouter)
app.use('/admin/login', loginRouter)
app.listen(PORT, () => console.log("🚀 Server running on: " + PORT));