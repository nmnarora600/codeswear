import Connectdb from "@/middleware/mongoose";
import Forgot from "@/models/Forgot";
import User from "@/models/User";
const nodemailer = require("nodemailer-email-sender");
const bcrypt = require("bcrypt");
const { UniqueString } = require("unique-string-generator");

const handlebars = require('handlebars');
const fs = require('fs');
const path=require('path')

const handleForgot = async (req, res) => {
  const updatePassword = async (email, password) => {
    let target = await User.findOne({ email });

    if (!target) {
      throw "Internal Server Error.";
    }

    try {
      let saltRounds = parseInt(process.env.saltRounds);
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

  // LinkGenerate
  if (req.body.sendMail) {
    let target = await User.findOne({ email: req.body.email });
    if (target) {
      try {
        let token = UniqueString();
        let link = "";
        let mail = "";

        let check = await Forgot.findOne({ email: req.body.email });
        if (check == null || check.used == "true" || check.expiry<Date.now()) {
          if(!check){
          
          }

          if(check && check.expiry<Date.now()){
       
          }
          await Forgot.findOneAndUpdate(
            { email: req.body.email },
            { $set: { token: token, used: false, expiry:new Date(Date.now() + 120*60*1000) } },
            { new: true, upsert: true } // Create a new document if none is found
          );
          link = `${process.env.NEXT_PUBLIC_HOST}/forgot?token=${token}`;
          mail = `<a href=${link}> Click to reset your password </a>`;
        } else {
          link = `${process.env.NEXT_PUBLIC_HOST}/forgot?token=${check.token}`;
          mail = `<a href=${link}> Click to here reset your password </a>`;
        }

        try {
          let encode = `<b>Dear ${target.name},</b>
            <br><br>

            We have received a request to reset your password. Please ${mail}.
       
            <br><br>
            We recommend that you reset password as soon as possible after getting this mail.
            <br><br>
            This mail contains sensitive data, Kindly do not share this mail to anyone.
<br><br>
If you did not request a password reset, please disregard this email and ensure the security of your account.
<br><br>
Thank you for using our services.
<br><br><br>
Best regards,
<br><br>
Codeswear.com
`;

const data = { action_url: link, name: target.name, support_url:'https://www.google.com'};
    const templatePath = path.resolve(process.cwd(),'pages','handlebars', 'forgot.hbs');
    // Read the template file
    const template = fs.readFileSync(templatePath, 'utf-8');
    
    // Compile and render the template
    const compiledTemplate = handlebars.compile(template);
    const html = compiledTemplate(data);
    let finalmail;
    if(html){
      finalmail=html;
    }
    else{
      finalmail=encode;
    }

          nodemailer({
            mailService: "gmail", //gmail,sendgrid etc..
            senderUser: "k1vikky", // for email-id abc@gmail.com, username will be abc
            senderEmail: "k1vikky@gmail.com", // sender's email-id
            senderPassword: process.env.NODE_PASS, // sender's email password
            receiverEmail: target.email, // receiver's email address
            subject: "Codeswear Password Reset ✔", // email subject
            html: finalmail, // email body
          });
         
          return res
            .status(200)
            .json({
              success: true,
              comment:
                "One time Link to reset the password has been sent to your email.",link
            });
        } catch (error) {
          return res
            .status(500)
            .json({ success: false, comment: "Some Error Occured" });
        }
      } catch (error) {
        return res
          .status(200)
          .json({ success: false, comment: "Some Error has Occured" });
      }
    } else {
      res.status(200).json({ success: false, comment: "User Does not Exists" });
    }
  } else {
    //  Reset Password
    try {
      let f = await Forgot.findOne({ token: req.body.token });
      if(!f){
        return res
          .status(200)
          .json({
            success: false,
            comment: "Invalid link try again with a valid one",
          });
      }
      if (f&& f.used == "true" || f.expiry<Date.now()) {
       return res
          .status(200)
          .json({
            success: false,
            comment: "Link is expired try generating another one",
          });
      }
      
      let mail = f.email;
      await Forgot.findOneAndUpdate(
        { token: req.body.token },
        {
          used: "true",
        }
      );
      let u = await updatePassword(mail, req.body.password);

      res.status(200).json(u);
    } catch (error) {

      res
        .status(200)
        .json({ success: false, comment: "Some Error has Occured" });
    }
  }
};

export default Connectdb(handleForgot);
