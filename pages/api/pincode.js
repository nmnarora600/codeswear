import pincode from '../../pincodes.json'
export default function handler(req,res){

    
    res.status(200).json(pincode)
}