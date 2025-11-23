import express from "express";
import sqlite3  from "sqlite3";
import postsRouter from "./routes/posts.js"
import cors from "cors"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config()
const PORT = process.env.PORT||5000;
const app = express();
const password = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10)
const admin = {
    username:process.env.ADMIN_USERNAME,
    password
    }
const secret = process.env.JWT_SECRET


//Middlewares 
app.use(cors({
        origin: process.env.FRONT_END_ORIGIN, 
        methods:["GET","POST","DELETE","PUT"]
}

))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use("/posts",  postsRouter)

app.post("/admin/login",(request,response) => {
    
    if(!request.body){
        return response.status(400).send("data is not provided")
    }
    const {username,password} = request.body
    if(!username || username.trim().length === 0){
        return response.status(400).send("username is not provided")
    }
    if(!password || password.trim().length === 0){
        return response.status(400).send("password is not provided")
    }
    const isPasswordCorrect = bcrypt.compareSync(password,admin.password)
    if(username !== admin.username || !isPasswordCorrect){
        return response.status(401).send("wrong crediantials")

    
    }
    const token = jwt.sign({username},secret,{expiresIn:"2h"})
    return response.status(200).send({token})
})

//db.run("DROP TABLE posts")
app.get("/test",(request,response) => {
    return response.send("server is working")

})

app.listen(PORT, () => console.log("🚀 Server running on: " + PORT));