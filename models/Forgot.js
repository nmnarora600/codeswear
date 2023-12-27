const mongoose = require('mongoose')

const ForgotSchema = new mongoose.Schema({
   
    email: {type: String, required: true},
   
    token: {type: String, required: true, default:''},
    used: {type: String,  default:'false'},
    expiry: {type: Date,  default:()=>new Date(Date.now() + 120*60*1000)},
   
    
},{timestamps:true})


mongoose.models={};
export default mongoose.model("Forgot", ForgotSchema);