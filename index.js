const express  = require("express")
const { connection } = require("./config/db")
const { todoRouter } = require("./routes/Todo.routes")
const { userRouter } = require("./routes/User.routes")
const {TodoModel} = require("./models/TodoModel")
const cors = require("cors")

const jwt = require("jsonwebtoken")
const { authentication } = require("./middlewares/authentication")
const app = express()
app.use(express.json())
app.use(cors())


const PORT = process.env.PORT || 8500

app.get("/", (req,res)=>{
    res.send("Welcome to Todo Application")
})

//app.use(authentication)
app.use("/" , userRouter)
// app.use("/todos", todoRouter)

//GET TODOS 

app.get("/todos", authentication, async(req,res)=>{
    const {user_id} = req.body
    const all_todos = await TodoModel.find({user_id : user_id})
    res.send({"Todos" : all_todos})
})

//POST TODOS

app.post("/create", authentication, async(req,res)=>{
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

app.listen(PORT, async(req,res)=>{
    try{
        await connection
        console.log("DB Connected Successfully")
    }
    catch(err){
        console.log(err)
        console.log("DB Connection Failed")
    }
    console.log(`Listening on PORT ${PORT}`)
})