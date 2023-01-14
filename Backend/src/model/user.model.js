const mongoose= require("mongoose");
const bcrypt=require("bcrypt")
const userSchema=new mongoose.Schema({
    email:{type:String,required:true, unique:true},
    password:{type:String, required:true},
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    dob:{type:String, required:true},
    mobile:{type:String, required:true}

},{
    timestamps:true
})


userSchema.pre("save" ,function(next){ 
    const hash= bcrypt.hashSync(this.password, 8);
    const hashMobile= bcrypt.hashSync(this.mobile, 8);
    const hashDOB= bcrypt.hashSync(this.dob, 10);
    this.password=hash
    this.mobile=hashMobile
    this.dob=hashDOB
    return next()
})
 
 
 
userSchema.methods.checkPassword=function(password){
    return bcrypt.compareSync(password, this.password)
}
const User= mongoose.model("user", userSchema)
module.exports= User