const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    orderid: {type: String, required: true},
    name: {type: String, required: true},
    phone: {type: String, required: true},
    state: {type: String, required: true},
    city: {type: String, required: true},
    pincode: {type: String, required: true},
    email: {type: String, required: true},
    paymentInfo: {type: String, default:'Given by gateway'},
    products: {type:Object, required:true},
    address:{type: String, required:true},
    transactionId:{type: String, default:'Given by gateway'},
    amount:{type:String, required:true},
    mailed:{type:String, required:true, default:'no'},
    status:{type:String, default:'Pending', required:true},
    deliveryStatus:{type:String, default:'Order Received', required:true},
    
},{timestamps:true})


mongoose.models={};
export default mongoose.model("Order", OrderSchema);