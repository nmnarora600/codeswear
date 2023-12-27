import { escape } from 'querystring';
const puppeteer = require('puppeteer');
const handlebars = require('handlebars');
const fs = require('fs');
const path=require('path')
// const nodemailer = require("nodemailer-email-sender");

const nodemailer = require('nodemailer');

export default async function handler (req,res){
    handlebars.registerHelper('multiply', function (a, b) {
        return a * b;
      });
    handlebars.registerHelper('gst', function (c) {
        return c*0.18;
      });
    handlebars.registerHelper('nogst', function (c) {
        return c*0.82;
      });
      let totalAmount = 0;

      handlebars.registerHelper('addToTotal', function (value) {
        totalAmount += value;
        return '';
      });
      handlebars.registerHelper('round', function (value, decimals) {
        if (typeof value !== 'number') {
          return value;
        }
        decimals = decimals || 0;
        const multiplier = Math.pow(10, decimals);
        return Math.round(value * multiplier) / multiplier;
      });
    
      handlebars.registerHelper('getTotal', function () {
        return totalAmount;
      });
      handlebars.registerHelper('inc', function (x) {
        return x+1;
      });
      handlebars.registerHelper('eq', function (a, b, options) {
        return a === b ? true : false;
      });
      handlebars.registerHelper('splitString', function (inputString, delimiter, partIndex) {
        const parts = inputString.split(delimiter);
        return parts[partIndex];
      });

      
      let writeaddr= path.resolve(process.cwd(), 'assets', 'invoice.pdf');
      let readaddr = path.resolve(process.cwd(), 'assets', 'output.html');
const mailHtml=path.resolve(process.cwd(), 'pages','handlebars', 'order.hbs')
const mailOutput=path.resolve(process.cwd(), 'assets', 'order.html');
      if(fs.existsSync(writeaddr)){
      
        let a=fs.unlinkSync(writeaddr);
      }
      if(fs.existsSync(readaddr)){
     
        let b=fs.unlinkSync(readaddr);
      }
      if(fs.existsSync(mailOutput)){
      
        let b=fs.unlinkSync(mailOutput);
      }
try {
    let {status,name,address,state,pincode,phone,email,orderid,createdAt, products, amount}=req.body.order;
 
    const data = { status,name,address,state,pincode,phone,email,orderid,orderdate:new Date(createdAt).toLocaleString('en-IN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }), products, amount};
    const templatePath = path.resolve(process.cwd(),'pages','handlebars', 'bill.hbs');
    // Read the template file
    const template = fs.readFileSync(templatePath, 'utf-8');
    
    // Compile and render the template
    const compiledTemplate = handlebars.compile(template);
    const html = compiledTemplate(data);
   
    // // Save or send the generated HTML
    const outputPath = path.resolve(process.cwd(), 'assets', 'output.html');
    fs.writeFileSync(outputPath, html);
    // let imgpath=[path.resolve(process.cwd(),'assets','images', 'image-1.png'),path.resolve(process.cwd(),'assets','images', 'image-2.png'),path.resolve(process.cwd(),'assets','images', 'image-3.png'),path.resolve(process.cwd(),'assets','images', 'image-4.png'),path.resolve(process.cwd(),'assets','images', 'image-5.png')]
   const mailData={
    name:req.body.order.name,
    orderid:req.body.order.orderid,
    action_url:`${process.env.NEXT_PUBLIC_HOST}/order?id=${req.body.order._id}`,
    date:new Date(req.body.order.createdAt).toLocaleString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    // images:imgpath,
    // i:path.resolve(process.cwd(),'assets','images', 'image-4.png')
   }
   

  const mailTemplate = fs.readFileSync(mailHtml, 'utf-8');
  const compiledMailemplate = handlebars.compile(mailTemplate);
  const mail = compiledMailemplate(mailData);
  fs.writeFileSync(mailOutput, mail);

try {
    ///// PDF GENERATOR---------------------------------------------->

      const optionsPDF = {
        path: writeaddr,
        printBackground: true,
        width: '27cm',
        scale: 1,
        preferCSSPageSize: false,
        margin:{
          top:'1cm',
          left:'0.75cm',
          right:'0.75cm',
          bottom:'1cm',
        },format: 'A4',
    }
    let pageURL=readaddr;
    ;(async () => {
      const browser = await puppeteer.launch({
          headless: true,
          devtools: false,
          defaultViewport: {
              width             : 136,
              height            : 842,
              deviceScaleFactor : 1
          }
      })
      const [page] = await browser.pages()
      // await page.emulateMediaType('screen')
  
      await page.goto( pageURL, { waitUntil: 'networkidle0', timeout: 0 })
  
  
     
      await page.pdf(optionsPDF)
  
      let transporter = nodemailer.createTransport({
        service: "Gmail",
        port: 587,
        secure: false,
         // true for 465, false for other ports
        auth: {
          user: 'k1vikky@gmail.com', // generated ethereal user
          pass: process.env.NODE_PASS, // generated ethereal password
        },
      });
      const mailOptions = {
        from:"k1vikky@gmail.com",
        to: req.body.order.email,
        subject: 'Codeswear - Order Placed',
        html: mail,
        attachments: [
          {
            filename: 'invoice.pdf',
            path: writeaddr, // Replace with the actual path
            contentType: 'application/pdf',
          },
        ],
      };

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
    
      res.status(500).json({ success: false, error: 'Email sending failed' });
    } else {
  
      res.status(200).json({ success: true, message: 'Email sent successfully' });
    }
  })



      await browser.close()
  
  })()


   
    res.status(200).json({success:true,status:"Your Order has been placed and Invoice has been sent to your email." })
    
} catch (error) {
    if(fs.existsSync(outputPath)){
        
        fs.unlink(outputPath)
        res.status(200).json({success:true,status:"Your Order has been placed and you will receive Invoice soon." })
      }
      else{
    
          res.status(200).json({success:false,status:"Sorry due to some Technical Issues your order couldnot be placed" })
      }
}
if (fs.existsSync(writeaddr) && fs.existsSync(outputPath)) {
    fs.unlink(writeaddr)
    fs.unlink(outputPath)
    res.status(200).json({success:true,status:"Your Order has been placed and Invoice has been sent to your email." })}
    else  if(fs.existsSync(outputPath)){
       
        fs.unlink(outputPath)
        res.status(200).json({success:true,status:"Your Order has been placed and you will receive Invoice soon." })
      }
} catch (error) {
   
    res.status(200).json({success:false,html:"Internal Server Error" })
}



    
}
