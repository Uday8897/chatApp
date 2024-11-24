const mongoose=require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGO_DB_URL);
const db=mongoose.connection;
db.on('connected',()=>{
    console.log('Database Connected')
})
module.exports=db;