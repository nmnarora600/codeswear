
import User from '@/models/User'
const bcrypt= require('bcrypt');
import Connectdb from "@/middleware/mongoose";
const Signup= async(req, res)=>{
    if(req.method=='POST'){
        try {
            let check= await User.findOne({"email":req.body.email})
            if(check){
                res.status(409).json({error:"User Already Exists"})
            }
            else{
                let {name, email, password,type}=req.body;
                var encryptedpass='';
                
                let saltRounds=parseInt(process.env.saltRounds);
                // let hash=process.env.hash
                encryptedpass= await bcrypt.hash(password,saltRounds )
                let u= new User({"name":name,"email": email,"password":encryptedpass , type:"normal"});
                    await u.save();

                    let logresp={};
                        let x = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({email, password}),
                      });
                       logresp=await x.json();
                      if(logresp.token){

                          return res.status(200).json({ success: "true" , token:logresp.token});
                      }
                      else{
                        return res.status(200).json({ success: "true" , error:'Account Created kindly login yourself.'});
                      }
            
            }
          
        } catch (error) {
          
            res.status(500).json({error:"INTERNAL SERVER ERROR"})
        }
        
    }
    else{
        res.status(400).json({error:"method not allowed"})
    }
  
}
export default Connectdb(Signup);