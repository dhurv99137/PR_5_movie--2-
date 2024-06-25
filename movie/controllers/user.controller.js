const User = require("../Models/user.schema")


const createUser = async (req, res) => {
    let data = await User.create(req.body)
    res.status(201).send(data)
}

const deleteUser = async (req, res) => {
    let { id } = req.params
    let data = await User.findByIdAndDelete(id)
    res.send({ message: 'User deleted successfully' });
}

const loginUser = async (req, res) => {
    let {username,password}=req.body

    let user=await User.findOne({username})
    if (user && user.password === password) {
        res.json({ message: 'Logged in successfully' });
    } else {
        res.status(401).json({ error: 'Invalid username or password' });
    }
}

const getUser=async(req,res)=>{
    let data=await User.find()
    res.send(data)
}


module.exports = { createUser, deleteUser,loginUser,getUser }