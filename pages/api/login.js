import User from "@/models/User";
import Connectdb from "@/middleware/mongoose";
var jwt=require('jsonwebtoken');
const bcrypt = require("bcrypt");



const Login = async (req, res) => {
  
  if (req.method == "POST") {
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        const match = await bcrypt.compare(req.body.password, user.password);

        if (match && user.email === req.body.email) {
         let token= jwt.sign({  name: user.name, email: user.email }, 'shhhhhhhh', { expiresIn: '1d' })
          res.status(200).json({success: "true",token });
        } else {
          res
            .status(401)
            .json({ success: "false", error: "Invalid Credentials" });
        }
      } else {
        res
          .status(401)
          .json({ success: "false", error: "Invalid Credentials" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ success: "false", error: "INTERNAL SERVER ERROR" });
    }
  } else {
    res.status(400).json({ success: "false", error: "method not allowed" });
  }
};







export default Connectdb(Login);
