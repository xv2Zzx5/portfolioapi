import { Router } from "express";
import db from "../db.js"
import { verifyToken } from "../middlewares/index.js";
const router = Router()
const TABLE = "user" 
router.get("/:version",async(request,response) => {
    const {version} = request.params
    const {data,error,status} = await db.from(TABLE).select("*").eq("id",version).single()
    if (error){
        return response.status(404).send({message:`user with id ${version} is not found `})
    }
    return response.status(200).send(data)
}) 
router.put("/:version",verifyToken,async (request,response) => {
    const {version} = request.params
    const body = request.body
    const {data,error,status} = await db.from(TABLE).update(body).eq("id",version).select()
    if (data && data.length  === 0){
        return response.status(404).send({message:`user with id ${version} is not found `})
    }
    else if(error){
        return response.status(status).send({message:error.message})
    }
    return response.status(200).send(data)
})
export default router