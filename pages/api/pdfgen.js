var fs = require('fs');
const puppeteer = require('puppeteer');
// var pdf = require('html-pdf');
const path=require('path')
// var options = { format: 'A4', "border": {
//     top: "1cm",            // default is 0, units: mm, cm, in, px
//     right: "1cm",
//     bottom: "1cm",
//     left: "1cm"
//   },};
const readaddr = path.resolve(process.cwd(), 'assets', 'output.html');
var html = fs.readFileSync(readaddr, 'utf8');

export default function handler(req,res){
const writeaddr= path.resolve(process.cwd(), 'assets',  'invoice.pdf');
 
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
      }
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

    await browser.close()

})()



res.status(200).json({success:true,pdf:writeaddr});
}

