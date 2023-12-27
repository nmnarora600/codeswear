import { Router, useRouter } from "next/router";
import React, {useEffect, useState} from "react";
import { GoCheckCircle } from "react-icons/go";
import Order from "@/models/Order";
import mongoose from "mongoose";
import Head from "next/head";
const Payprocess = ({order}) => {
  const router=useRouter();
  const [paid, setPaid] = useState(false);
  useEffect(()=>{
    if (typeof window !== 'undefined') {
    
    const updateqty=async()=>{
      let u = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({order:order}),
      });
      let resp=await u.json();
   
    }
    updateqty();
  }
  },[])
  useEffect(()=>{
   
    
    setTimeout(() => {
      setPaid(true);
      
    }, 3000);
    if(paid){
      setTimeout(() => {
        
        router.push(`/order?id=${router.query.id}`)
      }, 3000)
    }
  },[paid])
 

  
  return (
    <div className="my-44 min-h-screen">
      <Head>
        <title>Secure Payment gateway - Codeswear.com</title>
      </Head>
      {paid == false && (
        <div>
          <div className="items-center flex justify-center p-3 my-5">
            <img
              src={"/loading.gif"}
              className="scale-150 p-4"
              alt="wait until load"
            />
          </div>
          <div className="text-center py-3 font-semibold text-lg">
            {" "}
            Please wait, while we Process your payment.
          </div>
          <div className="text-center py-2 text-lg">
            {" "}
            Kindly do not press back or refresh button.
          </div>
        </div>
      )}

      {/* After Pay */}
      {paid == true && (
        <div  >
          {" "}
          <div className="flex justify-center font-semibold text-lg p-4 my-10">
            <GoCheckCircle className="scale-[500%] fill-green-500" />
          </div>
          <div className="flex justify-center items-center my-4 font-semibold text-lg">
            Payment Successful
          </div>
          <div className="flex justify-center items-center my-4 text-lg">
            Redirecting . . .
          </div>{" "}
          
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let order = await Order.findById(context.query.id);
  if(!order){
  
  }

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
      
    },
  };
}
export default Payprocess;
