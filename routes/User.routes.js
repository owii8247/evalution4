const express = require("express")
const userRouter = express.Router()
const {UserModel} = require("../models/UserModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

//SIGNUP

userRouter.post("/signup", async(req,res)=>{
    const {email, password} = req.body
    const isUser = await UserModel.findOne({email})
    if(isUser){
        res.send({"message": "User already exist, Please Login"})
    }
    else{
        bcrypt.hash(password, 4, async function(err,hash){
            if(err){
                res.send({"message": "Something Went Wrong !"})
            }
            const new_user = new UserModel({
                email,
                password: hash
            })
            try{
                await new_user.save()
                res.send({"message": "Sign Up Successfull"})
            }
            catch(err){
                res.send({"message": "Something Went Wrong"})
            }
        })
    }
})

//LOGIN 

userRouter.post("/login", async(req,res)=>{
    const {email, password} = req.body
    const user = await UserModel.findOne({email})
    const hashed_password = user.password
    const user_id = user._id
    bcrypt.compare(password, hashed_password , function(err, result) {
        if(err){
            res.send({"message": "Something Went Wrong"})
        }
        if(result){
            const token = jwt.sign({user_id}, process.env.SECRET_KEY)
            res.send({"message" : "Login Successfull" , token})
        }
        else{
            res.send({"message" : "Login Failed"})
        }
    })
})

module.exports ={userRouter}