import jwt from "jsonwebtoken"
export function verifyToken(request,response,next){
    const auth = request.headers.authorization
    const secret = process.env.JWT_SECRET
    if (!auth){
        return response.status(400).send("no authorization")
        
    }
    const token = auth.split(" ")[1]
    if(!token){
        return response.status(400).send("token is not found")

    }
    jwt.verify(token, secret, (err, username) => {
        if(err){
            console.log(err,token)
            return response.status(400).send("token expired")

        }
        request.username = username
        return next()
    })
}