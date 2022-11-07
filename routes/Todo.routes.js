const express = require("express")
const { authentication } = require("../middlewares/authentication")
const todoRouter = express.Router()
const {TodoModel} = require("../models/TodoModel")
const jwt = require("jsonwebtoken")
require("dotenv").config()


//GET TODOS 

todoRouter.get("/todos", authentication, async(req,res)=>{
    const {user_id} = req.body
    const all_todos = await TodoModel.find({user_id : user_id})
    res.send({"Todos" : all_todos})
})

//POST TODOS

todoRouter.post("/create", authentication, async(req,res)=>{
    const {taskname, status, tag , user_id} = req.body

    const new_todos = new TodoModel({
        taskname,
        status,
        tag,
        user_id
    })
    await new_todos.save()
    res.send({"message" : "Todo Created"})
})


module.exports ={todoRouter}