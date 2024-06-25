const { Router } = require("express")
const { createUser, deleteUser, loginUser, getUser } = require("../controllers/user.controller")
const isValid=require("../middlewares/user_middlewares")

let userRoute = Router()

userRoute.post("/signup",isValid, createUser)
userRoute.delete("/delete/:id", deleteUser)
userRoute.post("/login", loginUser)

userRoute.get("/", getUser)

module.exports = userRoute