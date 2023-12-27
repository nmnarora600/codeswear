
import React, { useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Order from '@/models/Order';
import mongoose from 'mongoose';
import Product from '@/models/Product';
import { useRouter } from 'next/router';
import Head from 'next/head';

const MyOrder = ({order, clearCart}) => {
  useEffect(()=>{

    const mailuser= async()=>{
    
    
      let utu=await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/mailsent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id:order._id, updatemail:true }),
      });
    
      let resp=await utu.json()
      if(resp.success){
        toast.success(resp.status, {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        clearCart();
      }
      else{
        toast.error(resp.status, {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
  
    }

  
    let ismail=async()=>{
     
      let u = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/mailsent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id:order._id, updatemail:false }),
      });
      let resp = await u.json();
      
      if(resp.success==false){
      
        mailuser();
      }
      else{

      
      }
    }
    ismail();
    
  
  
 
  
  },[])
 const router=useRouter();

let odate=new Date(order.createdAt);
let dateOptions={weekday:'short', year:'numeric', month:'short', day:'numeric'};
const resendinvoice=async()=>{

  let u = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/sendbill`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ order }),
  });
  let resp = await u.json();
  if(resp.success){
    toast.success(resp.status, {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  else{
    toast.error(resp.status, {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

}
const repeatorder=()=>{
  
  let newcart=JSON.stringify(order.products);
  localStorage.removeItem('cart');
localStorage.setItem("cart",newcart);
  router.push(`${process.env.NEXT_PUBLIC_HOST}/checkout`)
}
  return (
    order && <div><section className="text-gray-600 body-font overflow-hidden min-h-screen">
    <div className="container px-5 py-24 mx-auto">
      <div className="md:w-4/5  mx-auto flex flex-wrap">
        <div className="lg:w-3/5  lg:pr-5 lg:pb-6 mb-6 lg:mb-0">
          <h2 className="text-sm title-font text-gray-500 tracking-widest mb-3">CODESWEAR.COM</h2>
          <p className="leading-relaxed ">Yayy!   Your order has been sucessfully placed. </p>
          <p className="leading-relaxed md:mb-4 mb-6">Your payment status is <span className='text-pink-500'>{order.status}</span></p>
        


          <h1 className="text-gray-900 text-2xl md:text-4xl title-font font-medium mb-2 md:mb-4">Order Id: #{order.orderid}</h1>
          <h1 className="text-gray-700 text-sm text-right pr-3 md:pr-0 font-semibold mb-3">Ordered on: &nbsp; {odate && odate.toLocaleDateString('en-IN', dateOptions)}</h1>
<Head>
  <title>Order Summary - Codeswear.com</title>
</Head>
  <div className="flex flex-col ">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block md:min-w-full py-2 pr-4">
      <div className="overflow-hidden">
        <table className="md:min-w-full text-left text-sm font-light md:scale-100 scale-95">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" className="md:px-6 md:py-4 px-2 py-2 text-left">#</th>
              <th scope="col" className="md:px-6 md:py-4 px-2 py-2 text-left">Description</th>
              <th scope="col" className="md:px-6 md:py-4 px-2 py-2 text-center">Quantity</th>
              <th scope="col" className="md:px-6 md:py-4 px-2 py-2 text-end">Sub Total</th>
            </tr>
          </thead>
          <tbody>
          {  Object.keys(order.products).map((key, int)=>{
  return (
            <tr key={key}
              className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
              <td className="whitespace-nowrap md:px-6 md:py-4 px-2 py-2 text-left font-medium">{int+1}</td>
              <td className="whitespace-normal md:px-6 md:py-4 px-2 py-2 text-left">{order.products[key].name}</td>
              <td className="whitespace-nowrap md:px-6 md:py-4 px-2 py-2 text-center">{order.products[key].quantity}</td>
              <td className="whitespace-nowrap md:px-6 md:py-4 px-2 py-2 text-end">₹{order.products[key].price} x { order.products[key].quantity } = ₹{order.products[key].price * order.products[key].quantity }</td>
            </tr>)})}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
  
          
         
          <div className="flex flex-col">
            <span className="title-font text-center md:text-left font-medium text-2xl mt-3 text-gray-900">Total: ₹{order.amount}</span>
            <div className='my-6 mx-auto md:mx-0 flex'>
            <button className="flex mx-2 text-white bg-pink-500 border-0 py-2 px-6 text-xs min-w-max items-center focus:outline-none hover:bg-pink-600 rounded">Track Order</button>
            <button onClick={repeatorder} className="flex mx-2 text-white bg-pink-500 text-xs min-w-max items-center border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded">Reorder</button>
            <button onClick={resendinvoice} className="flex mx-2 text-white bg-pink-500 text-xs min-w-max items-center border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded">Resend Invoice</button>
            
            </div>
    
          
          </div>
        </div>
        <img alt="ecommerce" className="md:w-2/5 w-full h-auto  md:h-[60vh] md:pl-20  object-cover object-center rounded" src="/postorder.jpg"/>
      </div>
    </div>
  </section></div>
  )
}


export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let order = await Order.findById(context.query.id);
  if(!order){
   
  }
  if(order.mailed!='yes'){
  let u = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/sendbill`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ order }),
  });
 
  }
  else{
  
  }
  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
      
    },
  };
}

export default MyOrder