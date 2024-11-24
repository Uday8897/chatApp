const express=require('express')
const {Server} =require('socket.io')
const {jwtMiddleWare,generateToken} =require('./middleWare/jwt')
const bcrypt=require('bcryptjs')
const userModel=require('./models/userModel')
const db=require('./configurations/db')
const cors=require('cors')
const app=express()
app.use(express.json())
app.use(cors())
const http=require('http')
const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin:'http://localhost:5173'
    }
})
io.on('connection',(socket)=>{
    console.log(socket.id);
    socket.on("message_send",({message})=>{
        socket.emit("message_received",message)
    })

})
app.post('/register',async(req,res)=>{
    try{
    const user=req.body;
    console.log(req.body)
    console.log(user);
    const newUser=userModel(user);
    const savedUser=newUser.save();
    const payload={
        id:user.id,
        userName:user.userName
    }
    const token=generateToken(payload)
    // const payload=
    return res.status(200).json({message:"Successful Registration", savedUser:newUser,token:token})
    }
    catch(err){
    return res.status(400).json({error:err})
    }
    
})
app.post("/login",async (req,res)=>{
    try{
const {userName,passWord}=req.body;
const user=await userModel.findOne({userName:userName})
if(!user){
    return res.status(400).json({success:false,message:"User not found Please register"})
}
const isMatch=bcrypt.compare(user.passWord,passWord)
if(!isMatch){
    return res.status(400).json({message:"Password Not matching"})

}
const payload={
    id:user.id,
    userName:user.userName
}
console.log(payload)
const token=generateToken(payload)
return res.status(200).json({success:true,message:"Log in successful",token:token
})
    }catch(err){
        console.log(err)
        return res.status(400).json({success:false,message:"User not found"})
    }

})
server.listen(5000,()=>{
    console.log("Server is listening");
})