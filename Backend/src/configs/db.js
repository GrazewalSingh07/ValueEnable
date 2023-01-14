const mongoose= require("mongoose");
require("dotenv").config()
const DB=process.env.DATABASE
module.exports=()=>{
    return mongoose.connect(DB)
}