const express=require("express");
const dbConnect = require("./config/db");
const userRoute = require("./Routes/user.route");
const movieRoute = require("./Routes/movie.route");


const app=express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/",(req,res)=>{
    res.send("Welcome to the movie API")
})

app.use("/user",userRoute)
app.use("/movie",movieRoute)

app.listen(8090,()=>{
    console.log("server is runing up to 8090");
    dbConnect()
})