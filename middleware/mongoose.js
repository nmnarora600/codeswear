
import mongoose from "mongoose";

const Connectdb=handler=>async(req,res)=>{
    try {
        if (mongoose.connections[0].readyState) {
          return handler(req, res);
        }
        console.log("mongo uri")
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        return handler(req, res);
      } catch (error) {
        console.error("MongoDB connection error:", error);
        res.status(500).json({ message: "Internal server error" });
      }
}

export default Connectdb;