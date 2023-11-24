
import Product from '@/models/Product'
import Connectdb from '@/middleware/mongoose'

const UpdateProduct= async(req, res)=>{
    if(req.method=='POST'){
        try {
            for(let i=0;i<req.body.length;i++){

        
                let p =await Product.findByIdAndUpdate(req.body[i]._id, req.body[i])
                console.log(p)
            }
               res.status(200).json({success:"updated"})
            
        } catch (error) {
            res.status(500).json({error:"INTERNAL SERVER ERROR"})
        }
        
    }
    else{
        res.status(400).json({error:"method not allowed"})
    }
    
}
export default UpdateProduct;
