import Connectdb from "@/middleware/mongoose";
import Order from "@/models/Order";



const handleForgot = async (req, res) => {
    
    let target = await Order.findById(req.body.id );
  
    if(req.body.updatemail==false){
 
    if(target.mailed=='no'){
        return res.status(200).json({success:false})
    }
    else{
        
        return res.status(200).json({success:true})
    }
}
else{
    
  await Order.findByIdAndUpdate(req.body.id,{
        mailed:'yes'
    })
    return  res.status(200).json({success:true, status:'Your Order has been placed and you will receive your invoice on your mail.'})

}
}
export default Connectdb(handleForgot);