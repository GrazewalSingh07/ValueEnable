const express= require("express")
const app=express();
app.use(express.json()) 
 
 
var bodyParser = require('body-parser');
const cors= require("cors")
// app.use(bodyParser.json()); 
// app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors())


const SignUpController=require("./controller/SignUp")
const SignInController=require("./controller/SignIn")


app.use("/Sign-Up", SignUpController)
app.use("/Sign-In", SignInController)
 
module.exports=app