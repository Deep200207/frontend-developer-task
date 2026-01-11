import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_CONN);
        console.log("Mongo Connected")
    }catch(error){
        console.log("Mongo Failed to connect",error.message);
        process.exit(1);
    }
}
export default connectDB;