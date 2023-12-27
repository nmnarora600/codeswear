import React,{useEffect,useState} from 'react'
import FullLayout from "./src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./src/theme/theme";
import { Grid } from "@mui/material";
import ProductPerfomance from "./src/components/dashboard/Allproducts";
import mongoose from 'mongoose';
import Product from '@/models/Product';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Allproducts = ({p}) => {
 const router=useRouter();
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
          router.push('/')
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
   }, [admin]);
  return (
   admin && <ThemeProvider theme={theme}>
    <Head>
      <title>All Products - Codeswear Admin</title>
    </Head>
     <style jsx global>{
       ` .nav{
          display:none;
        }
        footer{
          display:none;
        }`}
      </style>
    <FullLayout>
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <ProductPerfomance products={p} />
      
      </Grid>
    </Grid>
</FullLayout>
</ThemeProvider>

  )
}

export default Allproducts;

export async function getServerSideProps(context){
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products=await Product.find({})
  return{
    props:{p:JSON.parse(JSON.stringify(products))}
  }
}