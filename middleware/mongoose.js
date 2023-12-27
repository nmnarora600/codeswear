
import mongoose from "mongoose";

const Connectdb=(handler)=>async(req,res)=>{
    try {
        if (mongoose.connections[0].readyState) {
          
          return handler(req, res);
        }
      
        await mongoose.connect(process.env.MONGO_URI);
       
        return handler(req, res);
      } catch (error) {
       
        res.status(500).json({ message: "Internal server error" });
      }
}
const jwt = require("jsonwebtoken");

const config = process.env;

export const verifyToken = (handler) => async(req,res)=>{
  
 
  let token=req.body.token
  
  if (!token) {
   
    return res.status(200).json({notfound:"A token is required for authentication"});
  }
  try {
       
        const decoded = jwt.verify(token, config.NEXT_PUBLIC_JWT_SECRET);
        if(decoded){
          req.user = decoded;
          
        }       
        else{
          throw new Error;
        }
      } catch (err) {
       
        return res.status(401).json({error:"Session timed out, Kindly login again."});
      }
    return handler(req,res);


// 
};


export default Connectdb;