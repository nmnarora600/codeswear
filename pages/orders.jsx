import React, {useEffect} from 'react'
import Order from "@/models/Order";
import mongoose from "mongoose";
import { useRouter } from 'next/router'
import Link from 'next/link';
import Head from 'next/head';
const Orders = ({isLogged, orders,email}) => {
    const router=useRouter();
    let itemlist=[];
    let obj1={};
    let str1=''
    let arr=[];
    let style={
      "display":"-webkit-box",
      "WebkitLineClamp": "7",
      "WebkitBoxOrient": "vertical",
      "overflow": "hidden",
      
    }
   
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            router.push('/');
        }
        else{
        
          const fetchOrders=async()=>{
            let u=await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getlogged`,{
              method: "POST",
              headers: {
                "Content-Type": "application/json",
               
              },
              body:JSON.stringify({token:localStorage.getItem('token')})
            });
            let resp=await u.json();
            if(resp.email!==email){
              orders={};
             
            }
            else{
             
            }
          }
          fetchOrders();
        }
    },[router.query])

    

  return (
    isLogged &&<div className='min-h-screen'>
      <Head>
     <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
     <title>My Orders - Codeswear.com</title>
      </Head>
            <h1 className='text-2xl font-semiboldbold text-center p-8'>My Orders</h1>
        <div className="container mx-auto ">
        <div className="flex flex-col">
  <div className="overflow-x-auto mx-0 min-w-fit lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-visible">
        <table className=" md:min-w-full  text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-4 md:text-sm text-xs w-1/5 text-center py-4">#Order Id</th>
              <th scope="col" className="px-4 md:text-sm text-xs  text-center py-4">Items</th>
              <th scope="col" className="px-4  md:text-sm text-xs text-center py-4">Price</th>
              <th scope="col" className="px-4  md:text-sm text-xs text-center py-4">Purchased on</th>
              <th scope="col" className="px-4  md:text-sm text-xs text-center py-4">Details</th>
            </tr>
          </thead>
          {orders.map((key)=>{
            
            Object.keys(key.products).map((item)=>{
               obj1[key.products[item].name]=key.products[item].name
            })
            itemlist.push(obj1);
            obj1={};
          })
          }
         {
          itemlist.map((item)=>{
            Object.keys(item).map((key)=>{
              str1+=key;
              str1+=', '
            })
            arr.push(str1.slice(0, -2));
            str1=''
          })
         }
          <tbody>
            {
              orders.map((item, index)=>{
            return <tr key={item._id}
              className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
              <td className="whitespace-nowrap  md:text-sm text-xs text-center md:p-4 p-1 font-medium">{item.orderid}</td>
              <td className="whitespace-normal md:text-sm text-xs text-justify md:max-w-[15vw] p-1 md:p-4">
              <div className=" max-w-[30vw]" style={style}>{arr[index]}</div></td>
              <td className="whitespace-nowrap md:text-sm text-xs text-center md:p-4 p-1">₹{item.amount}</td>
              <td className="whitespace-nowrap md:text-sm text-xs text-center p-1 md:p-4">{new Date(item.createdAt).toLocaleDateString('en-IN')}</td>
              <td className="whitespace-nowrap md:text-sm text-xs text-center p-1 md:p-4">
                <Link href={`/order?id=${item._id}`}>
                <button
                  
                  className="flex m-auto  text-white bg-pink-500 border-0 py-1 px-1 md:px-2 md:text-md text-xs md:font-semibold focus:outline-none hover:bg-pink-600 rounded"
                >
                  Know More 
                </button></Link></td>
            </tr>

              })
            }
        
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
        </div>
    </div>
  )

}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  // let o="nmnarora600@gmail.com"

  let o=decodeURIComponent(context.query.email)
 

  let orders = await Order.find({email:o});
 

  return {
    props: {
      // orders: JSON.parse(JSON.stringify(orders)),
      orders: JSON.parse(JSON.stringify(orders)),
      email:o
    },
  };
}


export default Orders