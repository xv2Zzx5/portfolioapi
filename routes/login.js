import { Router } from "express";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const router = Router()
const password = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10)
const admin = {
    username:process.env.ADMIN_USERNAME,
    password
    }
const secret = process.env.JWT_SECRET
router.post("/",(request,response) => {
    
    
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
export default router