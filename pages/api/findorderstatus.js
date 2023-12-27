
import Order from '@/models/Order'
import Connectdb from '@/middleware/mongoose'

const UpdateProduct= async(req, res)=>{
    if(req.method=='POST'){
        try {
            
        
                let p =await Order.findOne({orderid:req.body.orderid})
                if(p==null){

                    res.status(200).json({error:"Order not found"})
                }
                else{
                    return res.status(200).json({resp:p})
                }
            
            
        } catch (error) {
            res.status(500).json({error:"INTERNAL SERVER ERROR"})
        }
        
    }
    else{
        res.status(400).json({error:"method not allowed"})
    }
    
}
export default Connectdb(UpdateProduct);
