import mongoose from "mongoose";

const taskSchema=mongoose.Schema({
    title:String,
    description:String,
    user:{type:mongoose.Schema.Types.ObjectId, ref:"User"}
})
export default mongoose.model("Task",taskSchema);