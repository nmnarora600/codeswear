
import Product from '@/models/Product'
import Connectdb from '@/middleware/mongoose'

const UpdateProduct= async(req, res)=>{
    if(req.method=='POST'){
        try {
           let form=req.body;
           if(   form.availableQty==''||
    form.title==''||
    form.color==''||
    form.size==''||
    form.price==''||
    form.category==''||
    form.desc==''||
    form.img==''||
    form.slug==''){
        throw "All fields are required"
    }
    let a=form.color.toLowerCase();
    form.color=a;

     
                let p =await Product.findOneAndUpdate({slug:req.body.slug}, req.body)
           
            
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
