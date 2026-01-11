import express from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import connectDB from './config/db.js'
import User from './models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import auth from './middleWare/auth.js'
import Task from './models/Task.js'


dotenv.config()

const app = express();

connectDB();
app.use(cors())
app.use(express.json());

//testing 
app.get('/', (req, res) => {
    res.send("API is running")
})

//Authentication api
app.post('/reg', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json({ message: "User Registered" });
    } catch (err) {
        res.status(500).send("error Occur")
    }
})
// task CRUD operation api
// Read Data
app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({email:req.body.email});
        if (!user) return res.status(400).json({ error: "Not Exits User" });

        const match = await bcrypt.compare(req.body.password, user.password);
        if(!match) return res.status(400).json({error:"Invalid Password"});

        const token =jwt.sign({id:user._id},process.env.JWTSECRET);
        res.json({
            message:"Logged Success",
            token:token,
            user:user
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:`Internal Error`})
    }
})
app.get("/fetchTask",auth, async (req,res)=>{
    try{
    const task= await Task.find({user:req.userId});
    res.json(task);
    }catch(error){
        console.log(error)
        res.json({error:"Not created"})
    }
})

// create Data
app.post("/addTask",auth, async(req,res)=>{
    try{
    const task=await Task.create({...req.body,user:req.userId});
    res.json(task);
    }catch(error){
        console.log(error);
    }
})
//Update Data
app.put("/update/:id",auth,async(req,res)=>{
    const {description}=req.body;
    const task =await Task.findOneAndUpdate(
        {_id:req.params.id,user:req.userId},
        {description},
        {new:true}
    );
    if(!task) return res.status(404).json({message:"Task Not Found"});
    res.json(task);
})
// delete task
app.delete("/delete/:id",auth,async(req,res)=>{
    const task= await Task.findOneAndDelete({_id:req.params.id,user:req.userId});
    res.json({message:"Task Deleted"})
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is running")
})