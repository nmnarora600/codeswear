import React from 'react'
import Connectdb from '@/middleware/mongoose';
import pincode from '../../pincodes.json'
import Order from '@/models/Order';
import Product from '@/models/Product';
const Ordertodb = async(req,res) => {
    if(req.method=='POST'){
       
        if(!Object.keys(pincode).includes(req.body.pincode)){
           return res.status(200).json({error:"Sorry, The Pincode you have entered is not Servicable."})
        }
        
        //Check tempering with cart
        function isEmail(email) {
            // Regular expression for a simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
          }
        let sumtotal=0;
        let prod=JSON.parse(req.body.products)
        if(req.body.amount<=0){
            return res.status(200).json({error:"Cart Empty! Please build your cart and try again."})
        }
        for(let item in prod){
                    let product= await Product.findOne({slug:item});
                 
            sumtotal += ((parseInt(prod[item].price) * parseInt(prod[item].quantity)));
            
            
            //out of stock check

            if(product.availableQty<prod[item].quantity){
                return res.status(200).json({success:"false",error:"Some Items in your cart went Out of Stock, Please try again."})
                
            }
            if(product.price != prod[item].price){
                return res.status(200).json({error:"Price of some products have been changed, try again."})
            }
        }

        if(!isEmail(req.body.email)){
            return res.status(200).json({error:"Please enter a valid email"});
        }
            if(req.body.phone.length!==10 || !Number.isInteger(Number(req.body.phone))){
               
                return res.status(200).json({error:"Please enter your 10 digit phone number"});
            }
            if(req.body.pincode.length!==6 || !Number.isInteger(Number(req.body.pincode))){
                return res.status(200).json({error:"Please enter your 6 digit pincode"});
            }
            
        
        if(sumtotal != req.body.amount){
            
            return res.status(200).json({error:"Price of some products have been changed, Please try again."})
        }
        

        //Valid Details?

        try {
            
            let { email,name,phone,state,city,pincode, address,orderid, products,amount}=req.body;
        
            let u= new Order({ email,name,phone,state,city,pincode, orderid,address, amount, products:JSON.parse(products)});
            await u.save();
          
                res.status(200).json({ success: "true", id:u.id });
            // res.status(500).json({e:"d"})
        
        
      
    } catch (error) {
  
        // const indexes = await Order.collection.getIndexes();
        // // codeswear.orders.dropIndex('email_1')
      
        res.status(500).json({error:"INTERNAL SERVER ERROR"})
    }
}
}

export default Connectdb(Ordertodb);