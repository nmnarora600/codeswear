
import User from '@/models/User'
import Connectdb from '@/middleware/mongoose'

const UpdateProduct= async(req, res)=>{
    if(req.method=='POST'){
        try {
            
        
                let p =await User.findOne({email:req.body.email})
                if(p==null){

                    res.status(200).json({error:"User not found",  r:req.body.email})
                }
                else{
                    await User.findOneAndUpdate({email:req.body.email},{cart:JSON.parse(req.body.cart)})
                    res.status(200).json({success:true, cart:p.cart})
                }
            
            
        } catch (error) {
            res.status(500).json({error:"INTERNAL SERVER ERROR"})
        }
        
    }
    else{
        res.status(400).json({error:"method not allowed"})
    }
    
}
export default UpdateProduct;
