



// const multer = require("multer");
// import nc from 'next-connect'

// const storage = multer.memoryStorage();
// const uploadMiddleware = multer({ storage: storage });
  

import path from 'path'

import fs from 'fs'
import {IncomingForm} from "formidable";




const Handler =(req,res)=>{
    var finalPath='';
    try {
        const form = new IncomingForm();
        form.uploadDir = path.resolve(process.cwd(),'public','uploads');
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
          if (err) {
             
              return res.status(500).json({ error: 'Internal Server Error' });
            }
            else{
              try {
             
      
                let originalPath=files.files[0].filepath;
                let filePath =originalPath + ".JPG";
                fs.renameSync(originalPath, filePath);
            
                const publicIndex = filePath.indexOf('public');
  
                // Get the substring starting from the index of 'public' + 'public'.length
                const portionAfterPublic = filePath.substring(publicIndex + 'public'.length);
                
                
                if(portionAfterPublic.includes('\\')){
                  filePath= portionAfterPublic.replace(/\\/g, '/');
                }
                else{
                  filePath=portionAfterPublic
                }
            return res.status(200).json({ path:filePath });
              } catch (error) {
                return res.status(500).json({ error: 'Internal Server Error' });
              }
             
            }
        
        });
    } catch (error) {
        
        res.status(200).json({error:"Some Error Occured"})
    }
  
    



}


export const config = {
    api: {
      bodyParser: false,
    },
  };
  
export default Handler;