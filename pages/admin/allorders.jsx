import React,{useEffect,useState} from 'react'
import FullLayout from "./src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./src/theme/theme";
import { Grid } from "@mui/material";
import AllOrders from './src/components/dashboard/AllOrders';
import mongoose from 'mongoose';
import Order from '@/models/Order';
import { useRouter } from 'next/router';
import Head from 'next/head';
const Allorders = ({o}) => {
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
      <Head>
        <title>All Orders - Codeswear Admin</title>
      </Head>
        <FullLayout>
        <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
       
        <AllOrders products={o}/>
      </Grid>
    </Grid>
    </FullLayout>
    </ThemeProvider>
  )
}

export default Allorders

export async function getServerSideProps(context){
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let orders=await Order.find({})
  return{
    props:{o:JSON.parse(JSON.stringify(orders))}
  }
}