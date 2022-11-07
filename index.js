//backend structure git repo creation

const express  = require("express")
const { connection } = require("./config/db")
const { todoRouter } = require("./routes/Todo.routes")
const { userRouter } = require("./routes/User.routes")
const jwt = require("jsonwebtoken")
const { authentication } = require("./middlewares/authentication")
const app = express()
app.use(express.json())


const PORT = process.env.PORT || 8500

app.get("/", (req,res)=>{
    res.send("Welcome to Todo Application")
})

app.use(authentication)
app.use("/" , userRouter)
app.use("/todos", todoRouter)

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