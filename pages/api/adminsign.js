
import User from '@/models/User'
const bcrypt= require('bcrypt');
import Connectdb from "@/middleware/mongoose";
const Signup= async(req, res)=>{
    if(req.method=='POST'){
        try {
            let check= await User.findOne({"email":req.body.email})
            if(check){
                res.status(409).json({error:"Admin Already Exists"})
            }
            else{
                try {
                    let {name, email, password,type}=req.body;
                var encryptedpass='';
                
                let saltRounds=parseInt(process.env.saltRounds);
                // let hash=process.env.hash
                encryptedpass= await bcrypt.hash(password,saltRounds )
                let u= new User({"name":name,"email": email,"password":encryptedpass , type});
                    await u.save();

                   
                        return res.status(200).json({ success: "true" , status:'New Admin Added.'});
                } catch (error) {
                    return res.status(200).json({ success: "false" , status:'Some Error Occured'});
                }
                
    
            
            }
          
        } catch (error) {
          
            res.status(500).json({ success: "false" ,status:"INTERNAL SERVER ERROR"})
        }
        
    }
    else{
        res.status(400).json({ success: "false" ,status:"method not allowed"})
    }
  
}
export default Connectdb(Signup);