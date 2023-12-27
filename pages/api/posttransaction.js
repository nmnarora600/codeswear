import React from "react";
import Connectdb from "@/middleware/mongoose";
import Order from "@/models/Order";
import Product from "@/models/Product";
const PostTrx = async (req, res) => {
  if (req.method == "POST") {
    try {
      //Updating Quantity
      let { order } = req.body;
let products=order.products;

await Order.findByIdAndUpdate(order._id,{
    status:"Paid"
})


      for (let item in products) {
        await Product.findOneAndUpdate(
          { slug: item },
          {
            $inc: {
              availableQty: -products[item].quantity,
            },
          }
        );
      }

      res.status(200).json({ success: "iiss" });
    } catch (error) {
   
     
      
      res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
  }
};

export default Connectdb(PostTrx);
