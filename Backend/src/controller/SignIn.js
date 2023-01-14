const express= require("express");
const User = require("../model/user.model")
 const router= express.Router();
const {body,validationResult}=require("express-validator")
const jwt = require('jsonwebtoken');
require("dotenv").config()
 const authenticate= require("../middleware/authenticate");
 

const newToken=(user)=>{
    return jwt.sign({user},process.env.SECRET_KEY||'GRAZEWAL')
}

router.get("/",authenticate,async(req,res)=>{
    try {
        const user= await User.find().lean().exec()
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post("/", async(req,res)=>{
     try {
       let user= await User.findOne({email:req.body.email}).exec()
       
       const match=user.checkPassword(req.body.password)

       if(!match){
           return  res.status(400).send("Email or password incorrect")
       }

       const token=newToken(user)

       return res.status(200).send({user,token})
     } catch (error) {
        return res.status(500).send({error:error.message})
     }
     
 })
module.exports= router