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
    if (event.key === 'Enter') {
      // Enter key was pressed, perform your action here
  
      onSubmit(e);
    }
  };

  const onSubmit=async(e)=>{
    if(show){
    e.preventDefault();
  
    if(   form.availableQty==''||
    form.availableQty==0 ||
    form.title==''||
    form.color==''||
    form.size==''||
    form.price==''||
    form.category==''||
    form.desc==''||
    form.slug==''){
      toast.error("Fill all Fields", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return
    }
    if (form && form.desc) {
      let formattedText = form.desc
        .replace(/\n/g, "<br/>")
        .replace(/  /g, "&nbsp;&nbsp;");
      form.desc = formattedText;
    }
    let u = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateproducts`, {
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
    form.price='';
    form.category='';
    form.desc='';
    form.slug='';
  
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

      form.availableQty=(resp.resp.availableQty);
      
      if(resp.resp.availableQty==0){
        form.availableQty=0;
      }
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
if(e.target.name!='availableQty'){

  setForm({
    ...form,
    [e.target.name]:e.target.value
  })

}
else{
  setForm({
    ...form,
    [e.target.name]:Number(e.target.value)
  })
}
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
   admin && <div className='min-h-screen'><ThemeProvider theme={theme} >
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
          <title>Update Product - Codeswear Admin</title>
        </Head>
        <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Update Product">
          <Stack spacing={3}>
            <TextField
              name="slug"
              label="Slug"
              variant="outlined"
             value={form.slug ? form.slug:''}
              onChange={onChange}
              onKeyDown={handleKeyDown}
            />
          
{  show &&<>
            {/* <TextField  value={form.category ? form.category:''} onChange={onChange} name="category" label="Category" variant="outlined" />
<TextField  value={form.size ? form.size:''} onChange={onChange} name="size" label="Size" variant="outlined" />
<TextField  value={form.color ? form.color:''} onChange={onChange} name="color" label="Color" variant="outlined" /> */}

<div className='flex justify-between'>
<select value={form.size ? form.size:''} onChange={onChange} name="size" label="Size" className={`border w-[20vw] border-gray-300 hover:border-black py-4 rounded focus:text-black ${((form.size)&&(form.size!=''))?'text-black':'text-gray-500'}`} >
  <option selected value=''>Size</option>
  <option>S</option>
  <option>M</option>
  <option>L</option>
  <option>XL</option>
  <option>XXL</option>
</select> 
{/* <TextField  value={form.category ? form.category:''} onChange={onChange} name="category" label="Category" variant="outlined" /> */}
<select value={form.category ? form.category:''} onChange={onChange} name="category" label="Category" className={`border w-[20vw]  border-gray-300 hover:border-black py-4 focus:text-black rounded ${((form.category)&&(form.category!=''))?'text-black':'text-gray-500'}`}>
  <option selected value=''>Category</option>
  <option value="tshirt">Tshirt</option>
  <option value="zipper">Zipper</option>
  <option value="hood">Hood</option>
  <option value="mug">Mug</option>
</select> 
<TextField  value={form.color ? form.color:''} onChange={onChange} name="color" className='w-[30vw]' label="Color" variant="outlined" />
</div>
            <TextField  value={form.title ? form.title:''} onChange={onChange} name="title" label="Title" variant="outlined" />
            <TextField  value={form.price ? form.price:''} onChange={onChange} name="price" label="Price" variant="outlined" />
            <TextField  value={form.availableQty ? form.availableQty:''} onChange={onChange} name="availableQty" label="Available Quantity" variant="outlined" />
            
         
            <TextField
              name="desc"
              label="Description" value={form.desc ? form.desc:''}  onChange={onChange}
              multiline
              rows={4}
           
            />
           
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
        </BaseCard>
      </Grid>

   
    </Grid>
    </FullLayout>
    </ThemeProvider></div>
  )
}

export default Add

