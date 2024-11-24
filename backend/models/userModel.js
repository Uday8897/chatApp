const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
passWord:{
    type:String,
    required:true
},
    MobileNo:{
        type:Number,
        required:true,
        unique:true
    }
    

})

userSchema.pre('save', async function(next) { 
    try {
        if (this.isModified('passWord')) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(this.passWord, salt);
            this.passWord = hashedPassword;
        }
        next();
    } catch (err) {
        next(err);
    }
});
const userModel=mongoose.model('ChatUser',userSchema);
module.exports=userModel;