
const GetLocation=async(req,res)=>{
let u=await fetch(`https://api.postalpincode.in/pincode/${req.body.trimmedPincode}`,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    
  })
  let resp=await u.json();

let x=resp[0].PostOffice[0].State;
let c=resp[0].PostOffice[0].District;

res.status(200).json({state:x, district:c})
// res.status(200).json({resp})
}

export default (GetLocation);