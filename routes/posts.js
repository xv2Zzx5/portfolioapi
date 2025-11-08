import { Router } from "express";
import db from "../db.js"
import { verifyToken } from "../middlewares/index.js";
const router = Router()
router.get("/:id", (request,response) => {
    const {id } = request.params
    db.get(`
        SELECT * FROM posts WHERE id = ? 
        `,[id], (err, post) => {
            if(err){
                return response.status(500).send("unknown server error")
            }
            if(post){
               return response.status(200).send(post) 
            }    
            else{
                return response.status(404).send("post is not found")
            }
        })
    
})
router.get("/", (request,response) => {
    db.all(`
        SELECT * FROM posts 
        `, (err, posts) => {
            if(err){
                return response.status(500).send("unknown server error")
            }
            return response.status(200).send(posts)
        })
})
router.post("/", verifyToken, (request, response) => {
    if(!request.body){
        return response.status(400).send("data is not provided")
    }
    const {title,content} = request.body
    if (!title || title.trim().length === 0){
        return response.status(400).send("title is required")
    }
    if (!content || content.trim().length === 0){
        return response.status(400).send("content is required")
    }
    db.run(`
        INSERT INTO posts (title,content) VALUES (?,?)
        `,[title,content], (err) => {
            if(err){
                return response.status(500).send("unknown server error")
            }
            else{
                 return response.status(201).send("post is working")
            }
        })
   

})
router.delete("/:id",verifyToken, (request,response) => {
    const {id} = request.params
    db.run(`DELETE FROM posts WHERE id = ?`, [id], function (err){
        if(err){
            return response.status(500).send("unknown server error")
        }
        if(this.changes === 0){
            return response.status(404).send("post not found")
        }
        else{
            return response.status(200).send("post was successfully deleted")
        }
    })
})
router.put("/:id",verifyToken, (request,response) => {
    const {id} = request.params
    const {title,content} = request.body
    const fields = []
    const params = []
    if(title && title.trim().length > 0){
        fields.push("title = ?")
        params.push(title)
    }
    if(content && content.trim().length > 0){
        fields.push("content = ?")
        params.push(content) 
    }
    if(fields.length === 0){
        return response.status(400).send("no data to update")
    }
    params.push(id)
    db.run(`UPDATE posts SET ${fields.join(", ")} WHERE id = ?`,params, function(err){
        if(err){
            return response.status(500).send("unknown server error")
        }
        if(this.changes === 0){
            return response.status(404).send("post not found")
        }
        else{
            return response.status(200).send("post was successfully updated ")
        }
    })
})
export default router