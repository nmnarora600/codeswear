import mongoose from "mongoose";
import Order from "@/models/Order";
export default async function calculateMonthlySums(req,res) {


    
        if (!mongoose.connections[0].readyState) {
          await mongoose.connect(process.env.MONGO_URI);
        }
        // let orders=await Order.find({})
       
      
    const pipeline = [
      {
        $group: {
          _id: { $month: '$createdAt' },
          total: { $sum: { $toDouble: '$amount' } },
        },
      },
      {
        $sort: {
          '_id': 1, // Sort by month (1 to 12)
        },
      },
    ];
  
    const monthlySums = await Order.aggregate(pipeline);
  
    // If you want to get an array of 12 values (0 if no data for a month):
    const monthlySumsArray = Array.from({ length: 12 }, (_, index) => {
      const matchedMonth = monthlySums.find(item => item._id === (index + 1));
      return matchedMonth ? matchedMonth.total : 0;
    });
  
    
    res.status(200).json({list:monthlySumsArray})
  }
  
