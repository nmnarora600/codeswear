import { verifyToken } from '@/middleware/mongoose'
import User from '@/models/User'
import React from 'react'

const Getlogged = async(req,res) => {
  let u={};
  if(req.body.token){
   u=await User.findOne({email:req.user.email});
  }
    
  return (
    res.status(200).json({name:req.user.name, email:req.user.email, address:u.address, phone:u.phone, pincode:u.pincode, type:u.type})
  )
}

export default verifyToken(Getlogged)