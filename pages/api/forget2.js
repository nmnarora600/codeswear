import Connectdb from "@/middleware/mongoose";
import Forgot from "@/models/Forgot";
import User from "@/models/User";
const nodemailer = require("nodemailer-email-sender");
const bcrypt = require("bcrypt");
const { UniqueString } = require("unique-string-generator");

const handleForgot = async (req, res) => {
  const updatePassword = async (email, password) => {
    let target = await User.findOne({ email });

    
    try {
      let saltRounds = 10;
      let encryptedpass = await bcrypt.hash(password, saltRounds);
      await User.findOneAndUpdate(
        { email },
        {
          password: encryptedpass,
        }
      );

      return {
        success: true,
        comment: "Password has been successfully reset, you can Login now.",
      };
    } catch (error) {
      return { success: false, comment: "Some Error Occured, try again." };
    }
  };

let x=await updatePassword(req.body.email,req.body.password);
res.status(200).json(x);
  
};

export default Connectdb(handleForgot);
