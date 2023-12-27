
import Order from '@/models/Order'
import Connectdb from '@/middleware/mongoose'

const UpdateProduct= async(req, res)=>{
    if(req.method=='POST'){
        try {
           

       
                let p =await Order.findOneAndUpdate({orderid:req.body.orderid}, {deliveryStatus:req.body.deliveryStatus})
             
            
               res.status(200).json({success:'true'})
            
        } catch (error) {
            
            res.status(500).json({error:"INTERNAL SERVER ERROR"})
        }
        
    }
    else{
        res.status(400).json({error:"method not allowed"})
    }
    
}
export default Connectdb(UpdateProduct);
