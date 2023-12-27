import { Grid } from "@mui/material";
import BlogCard from "./src/components/dashboard/BlogCard";
import SalesOverview from "./src/components/dashboard/SalesOverview";
import DailyActivity from "./src/components/dashboard/DailyActivity";
import ProductPerfomance from "./src/components/dashboard/ProductPerfomance";
import FullLayout from "./src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./src/theme/theme";
import "./styles/style.css";
import mongoose from "mongoose";
import Order from "@/models/Order";
import { useEffect,useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
export default function Index({o, monthlySale, logout}) {

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
        <title>Dashboard - Codeswear Admin</title>
      </Head>
        <FullLayout logout={logout} >
          
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <SalesOverview ms={monthlySale.list}/>
      </Grid>
      {/* ------------------------- row 1 ------------------------- */}
      <Grid item xs={12} lg={4}>
        <DailyActivity />
      </Grid>
      <Grid item xs={12} lg={8}>
        <ProductPerfomance o={o}/>
      </Grid>
     
    </Grid>
    </FullLayout>
      </ThemeProvider>
  );
}
export async function getServerSideProps(context){
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let u = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/permonthsale`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });
  let ms = await u.json();
  let orders=await Order.find({})
  return{
    props:{o:JSON.parse(JSON.stringify(orders)), monthlySale:ms}
  }
}