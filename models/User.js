const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    address: {type: String,  default:''},
    phone: {type: String,  default:''},
    pincode: {type: String,  default:''},
    type: {type: String, required: true, default:'normal'},
    cart: {type:Object, required:true, default:{}},
    
},{timestamps:true})


mongoose.models={};
export default mongoose.model("User", UserSchema);