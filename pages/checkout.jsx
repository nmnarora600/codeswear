import Link from "next/link";
import React from "react";

import {
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";

const Checkout = ({cart, subTotal, addToCart, removeFromCart}) => {
  return (
    <div className="container m-auto px-3 md:px-16">
      <h1 className="font-bold text-3xl my-8 text-center ">Checkout</h1>
      <h2 className=" font-semibold text-xl">1. Delivery Details</h2>
        <div className="mx-auto flex my-2 ">
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>
        <div className="px-2 w-full">
          <div className="mb-4">
            <label htmlFor="address" className="leading-7 text-sm text-gray-600">
              Address
            </label>
            <textarea
              cols={30}
              rows={2}
              type="text"
              id="address"
              name="address"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="mx-auto flex my-2 ">
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="city" className="leading-7 text-sm text-gray-600">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>
        <div className="mx-auto flex my-2 ">
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="state" className="leading-7 text-sm text-gray-600">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label
                htmlFor="pincode"
                className="leading-7 text-sm text-gray-600"
              >
                Pin Code
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>
      
        <h2 className=" font-semibold text-xl">2. Review Cart Items</h2>
        <div
        className=" sidecart bg-pink-100  m-2 p-6 "
      >
        
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length==0 && <div className="my-4 text-base font-normal"> Nothing in cart</div>}
          {Object.keys(cart).map((k)=>{
            return  <li key={k}>
            <div className="item flex my-5 w-auto">
              <div className="font-semibold w-[20vw]">
               {cart[k].name}
              </div>
              <div className="w-1/3 flex items-center justify-center font-semibold text-xl ">
                <AiFillMinusCircle onClick={()=>{removeFromCart(k, 1, cart[k].price, cart[k].name,cart[k].size, cart[k].variant )}} className=" text-pink-500 cursor-pointer" />{" "}
                <span className="mx-2 text-sm">{cart[k].quantity}</span>{" "}
                <AiFillPlusCircle className="text-pink-500 cursor-pointer " onClick={()=>{addToCart(k, 1, cart[k].price, cart[k].name,cart[k].size, cart[k].variant )}}/>
              </div>
            </div>
          </li>
          })}
         
          
        </ol>
        <div >
        <div className="total font-semibold">Subtotal: &nbsp;&nbsp;&nbsp;&nbsp;{Math.round((subTotal*0.72)*100)/100}</div>
          <div className="total font-semibold mb-2">GST (18%): &nbsp; {Math.round((subTotal*0.18)*100)/100}</div>
     
          <div className="total font-bold text-2xl">Total: ₹{Math.round((subTotal)*100)/100}</div>
        </div>
          
      </div>
      <div className="mx-4 my-2 flex justify-center ">

        <Link href={'/order'}><button className="flex mr-2  text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded ">
            <BsFillBagCheckFill className="m-1" /> Pay ₹ {Math.round((subTotal)*100)/100}
          </button>
          </Link>
      </div>
    </div>
  );
};

export default Checkout;
