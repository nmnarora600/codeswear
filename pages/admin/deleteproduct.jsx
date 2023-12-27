import React,{ useState, useEffect} from 'react'
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

const router=useRouter();
  const [hovered, setHovered] = useState(false);
  const [hoveredreset, setHoveredreset] = useState(false);
  const [form, setForm]=useState({});
const [show, setShow]=useState(false);





  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
    
      onSubmit(e);
    }
  };

  const onSubmit=async(e)=>{
    if(show){
    e.preventDefault();
    let u = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/deleteproducts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify( form ),
    });
    let resp = await u.json();
  
    if(resp.success){
      toast.success("Successfully Deleted", {
        position: "bottom-center",
        autoClose: 2000,
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
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setShow(false)
    form.availableQty='';
    form.title='';
    form.color='';
    form.size='';
    form.slug='';
    form.price='';
    form.category='';
    form.desc='';
  
  }
  else{
    e.preventDefault();
    let u = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/findproduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({slug: form.slug}),
    });
   let resp=await u.json();
  
    if(resp.resp){
      setShow(true);
      toast.success("Successfully Fetched", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      form.availableQty=resp.resp.availableQty;
      form.title=resp.resp.title;
      form.color=resp.resp.color;
      form.size=resp.resp.size;
      form.price=resp.resp.price;
      form.category=resp.resp.category;
      form.desc=resp.resp.desc;
    }
    else{
      toast.error("Some Error Occured", {
        position: "bottom-center",
        autoClose: 2000,
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
   admin && <div className='min-h-screen'> <ThemeProvider theme={theme} >
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
          <title>Remove Product - Codeswear Admin</title>
        </Head>
        <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Remove a Product">
          <Stack spacing={3}>
            <TextField
              name="slug"
              label="Slug"
              variant="outlined"
             value={form.slug ? form.slug:''}
              onChange={onChange}
              onKeyDown={handleKeyDown}
              disabled={show}
            />
          
{  show &&<>
{/* <TextField  value={form.size ? form.size:''} onChange={onChange} name="size" label="Size" variant="outlined" />
<TextField  value={form.color ? form.color:''} onChange={onChange} name="color" label="Color" variant="outlined" />
            <TextField  value={form.category ? form.category:''} onChange={onChange} name="category" label="Category" variant="outlined" /> */}

<div className='flex justify-between'>
<select value={form.size ? form.size:''} onChange={onChange} name="size" label="Size" className='border w-[20vw] border-gray-300  py-4 rounded text-black' disabled >
  <option selected value=''>Size</option>
  <option>S</option>
  <option>M</option>
  <option>L</option>
</select> 
{/* <TextField  value={form.category ? form.category:''} onChange={onChange} name="category" label="Category" variant="outlined" /> */}

<select value={form.category ? form.category:''} onChange={onChange} name="category" label="Category" className='border w-[20vw]  border-gray-300  py-4 rounded text-black' disabled >
  <option selected value=''>Category</option>
  <option value="tshirt">Tshirt</option>
  <option value="zipper">Zipper</option>
  <option value="hood">Hood</option>
  <option value="mug">Mug</option>
</select> 

<div>

<TextField  value={form.color ? form.color:''} onChange={onChange} name="color" className='w-[30vw] ' label="Color"  variant="outlined" disabled/>
</div>
</div>
            <TextField  value={form.title ? form.title:''} onChange={onChange} name="title" label="Title" variant="outlined" disabled/>
            <TextField  value={form.price ? form.price:''} onChange={onChange} name="price" label="Price" variant="outlined" disabled/>
            <TextField  value={form.availableQty ? form.availableQty:''} onChange={onChange} name="availableQty" label="Available Quantity" variant="outlined" disabled />
            
         
            <TextField
              name="desc"
              label="Description" value={form.desc ? form.desc:''}  onChange={onChange}
              multiline
              rows={4}
           disabled
            />
           
           </>  } 
          </Stack>
          <br />
          <div>
          {!show &&<Button variant={hovered ? "contained" : "outlined"} onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)} mt={2} style={{marginRight:'1vw'}} onClick={onSubmit}>
            Fetch
          </Button>}
          {show &&<Button variant={hovered ? "contained" : "outlined"} onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)} mt={2} style={{marginRight:'1vw'}} onClick={onSubmit}>
            Delete
          </Button>}
          <Button variant={hoveredreset ? "contained" : "outlined"} onMouseEnter={() => setHoveredreset(true)}
        onMouseLeave={() => setHoveredreset(false)} mt={2} style={{marginLeft:'1vw'}} onClick={()=>{
          form.availableQty='';
          form.title='';
          form.color='';
          form.size='';
          form.price='';
          form.category='';
          form.desc='';
          form.slug='';
          setShow(false);
        }}>
            Reset
          </Button>
          </div>
        </BaseCard>
      </Grid>

   
    </Grid>
    </FullLayout>
    </ThemeProvider></div>
  )
}

export default Add

