import React,{useEffect, useState} from 'react'
import FullLayout from "./src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./src/theme/theme";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Grid,
  Stack,
  TextField,

  Button,
  FormGroup,

} from "@mui/material";
import BaseCard from "./src/components/baseCard/BaseCard";
import { useRouter } from 'next/router';
import Head from 'next/head';
const Add = () => {


  const [hovered, setHovered] = useState(false);
  const [form, setForm]=useState({});
const [show, setShow]=useState(false);
const [dstatus, setDstatus]=useState('');
const [hoveredreset, setHoveredreset] = useState(false);

const router=useRouter();


const statusOptions=["Order Received","Processing","In Transit","Shipped", "Delivered" ];
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
     
      onSubmit(e);
    }
  };

  const onSubmit=async(e)=>{
    if(show){
    e.preventDefault();
    if(form.deliveryStatus==''){
      toast.error("Status cannot be blank", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return
    }
    let u = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatedeliverystatus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify( form ),
    });
    let resp = await u.json();
    if(resp.success){
      toast.success("Successfully Updated", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else{
      toast.error("Some Error Occured", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    
    }
    setShow(false)
    form.deliveryStatus='';
    form.orderid='';
  
  }
  else{
   
    e.preventDefault();
    let u = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/findorderstatus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({orderid: form.orderid}),
    });
    let resp = await u.json();
    if(resp.resp){
      setShow(true);
      form.deliveryStatus=resp.resp.deliveryStatus;
      setDstatus(resp.resp.deliveryStatus);
      toast.success("Successfully Fetched", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else{
      toast.error("Some Error Occured", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  }
  const onChange=(e)=>{

    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  

  }


  const [admin, setAdmin] = useState(false)
  useEffect(() => {
   
    if(!localStorage.getItem('token')){
      router.push('/')
    }
   

     const datafetcher = async () => {
       if (localStorage.getItem("token")) {
         let data = { token: localStorage.getItem("token") };
         
         let u = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getlogged`, {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify(data),
         });
         let resp = await u.json();
         if (resp.error) {
          
         } else if (resp.notfound) {
           
       
         } else {
           let a=resp.type;
           if(a=='admin'){
            setAdmin(true);
           }
          else{
            router.push('/')
          }
          
         }
       }
     };
     datafetcher();
   }, []);

 
  return (
   admin && <ThemeProvider theme={theme}>
         <style jsx global>{
       ` .nav{
          display:none;
        }
        footer{
          display:none;
        }`}
      </style>
        <FullLayout>
        <Head>
          <title>Update Status - Codeswear Admin</title>
        </Head>
        <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Update Product Status">
          <Stack spacing={3}>
            <TextField
              name="orderid"
              label="order id"
              variant="outlined"
             value={form.orderid ? form.orderid:''}
              onChange={onChange}
              onKeyDown={handleKeyDown}
              disabled={show}
            />
          
{  show &&<>

<TextField  value={dstatus ? dstatus:''}  name="deliveryStatus" label="Current Status" variant="outlined" onKeyDown={handleKeyDown} disabled/>
{(dstatus!='Delivered')&&<select value={form.deliveryStatus ? form.deliveryStatus:''} onChange={onChange} name="deliveryStatus" label="Update Status" className={`border w-[20vw]  border-gray-300 hover:border-black py-4 focus:text-black rounded ${((form.deliveryStatus)&&(form.deliveryStatus!=''))?'text-black':'text-gray-500'}`}>
  <option selected value=''>Status</option>
{
statusOptions.map((status, index)=>(
  <option  value={status} disabled={statusOptions.indexOf(dstatus)>=index}>{status}</option>
))
}
</select>} 
{(dstatus=="Delivered")&& <h2 className='text-xl'>Order Delivered Successfully!</h2>}
            
         
           
           
           </>  } 
          </Stack>
          <br />
         
         {!show && <Button variant={hovered ? "contained" : "outlined"} onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)} mt={2} style={{marginRight:'1vw'}} onClick={onSubmit}>
            Fetch
          </Button>}
          {show && <Button variant={hovered ? "contained" : "outlined"} onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)} mt={2} style={{marginRight:'1vw'}} onClick={onSubmit}>
            Update
          </Button>}
          <Button variant={hoveredreset ? "contained" : "outlined"} onMouseEnter={() => setHoveredreset(true)}
        onMouseLeave={() => setHoveredreset(false)} mt={2} style={{marginLeft:'1vw'}} onClick={()=>{
         form.deliveryStatus='';
          form.orderid='';
          setShow(false);
        }}>
            Reset
          </Button>
        </BaseCard>
      </Grid>

   
    </Grid>
    </FullLayout>
    </ThemeProvider>
  )
}

export default Add

