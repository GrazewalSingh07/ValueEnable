const express=require("express");
const router= express.Router();
const User= require("../model/user.model")
 
 
 
router.post("/",async(req,res)=>{
    try {
       console.log(req.body)
    
            const curr=await User.create(req.body)
           
            return res.status(200).send({curr})
        
        
       
    } catch (error) {
        if(error.code===11000){
           return res.status(201).send("Register successful please login")
        }
        return res.status(400).send(error)
        
    }
})

router.get("/" ,async(req,res)=>{
    try {
        const user= await User.find().lean().exec()
      return  res.status(200).send(user)
    } catch (error) {
        res.status(500).send({error:error.message})
    }
})

 

module.exports= router