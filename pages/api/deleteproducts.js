
import Product from '@/models/Product'
import Connectdb from '@/middleware/mongoose'

const UpdateProduct= async(req, res)=>{
    if(req.method=='POST'){
        try {
           

                let p =await Product.findOneAndDelete({slug:req.body.slug})
                
            
               res.status(200).json({success:"updated"})
            
        } catch (error) {
        
            res.status(500).json({error:"INTERNAL SERVER ERROR"})
        }
        
    }
    else{
        res.status(400).json({error:"method not allowed"})
    }
    
}
export default Connectdb(UpdateProduct);
