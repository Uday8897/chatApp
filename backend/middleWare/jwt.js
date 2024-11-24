const jwt=require('jsonwebtoken')
const jwtMiddleWare= (req,res,next)=>{

    const auth=req.headers.authorization
    if(!auth){
        return res.status(404).json({message:"Not Authorized"})
    }
    const token= auth.split(' ')[1]
    try{
        const response=jwt.verify(token,process.env.SECRET_KEY)
        req.user=response
        console.log(response)
        next()
    
     }catch(err){
    // console.log(err)
    return res.status(401).send("Token Expired or Invalid Token")
    // next(err);
     }
}

const generateToken=(payload)=>{
const token=jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:"1h"})
return token
}

module.exports={jwtMiddleWare,generateToken}