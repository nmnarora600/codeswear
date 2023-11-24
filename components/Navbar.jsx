import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = ({user, cart,logout, addToCart, removeFromCart, clearCart, subTotal, shift, setShift}) => {
  // console.log(cart, addToCart, removeFromCart, clearCart, subTotal)

  const [dropdown, setDropdown] = useState(false)
const handleLogout=()=>{logout();
  setDropdown(false);
  
  toast.success('Successfully Logged out !', {
    position: "top-left",
    autoClose: 700,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
}
  const toggleDropdown=()=>{
    setDropdown(!dropdown)
    
  }
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
    setShift(false)
  };
  const ref = useRef();
  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center sticky top-0 z-10 bg-white items-center mb-1 shadow-md">
      <ToastContainer
position="top-left"
autoClose={501}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
        <div className="logo mr-auto md:mx-5">
      <Link href={"/"} >
          <Image src={"/logo.png"} className=" mr-auto" alt="" width={200} height={40} />
      </Link>
        </div>
      <div className="nav">
        <ul className="flex items-center space-x-4 font-bold text-md">
          <Link href={"/tshirts"}>
            <li className="hover:text-pink-700">Tshirts</li>
          </Link>
          <Link href={"/hoodies"}>
            <li className="hover:text-pink-700">Hoodies</li>
          </Link>
          <Link href={"/zipper"}>
            <li className="hover:text-pink-700">Zippers</li>
          </Link>
          <Link href={"/mugs"}>
            <li className="hover:text-pink-700">Mugs</li>
          </Link>
        </ul>
      </div>
<div className="absolute right-10 mx-5 top-4 cursor-pointer ">

</div>

      <div
        className="cart absolute right-0 mx-5 top-4 cursor-pointer flex items-center"
        
      >
        <div onMouseOver={() => setDropdown(true)}
      onMouseLeave={() => setDropdown(false)} >
          {dropdown && <div className="absolute right-8 bg-white shadow-lg border  top-6 rounded-md px-5 py-4 w-32"   onMouseOver={() => setDropdown(true)}
      onMouseLeave={() => setDropdown(false)} >
            <ul>
              <Link href={'/myaccount'}><li className="py-1  text-sm hover:text-pink-500 ">My Account</li></Link>
              <Link href={'/orders'}><li className="py-1  text-sm hover:text-pink-500 ">Orders</li></Link>
              <Link href={''} onClick={handleLogout}><li className="py-1 text-sm hover:text-pink-500 ">Logout</li></Link>
            </ul>
            </div>} 
        {user.value && <MdAccountCircle  className="text-xl md:text-2xl mx-2"/>}
        </div>

        {!user.value && <Link href={'/login'}><button className="flex text-white bg-pink-600 py-1 px-2 text-sm mx-2 hover:bg-pink-600 rounded "> Login </button></Link>}
        <AiOutlineShoppingCart onClick={toggleCart} className="text-xl md:text-2xl " />
      </div>
      <div
        ref={ref}
        className={`w-72 h-[100vh] sidecart overflow-y-scroll bg-pink-100 absolute top-0 right-0 py-10 px-8 transition-transform ${(Object.keys(cart).length ===0 || shift!==true ) ? "translate-x-full": "translate-x-0" } transform`}
      >
        <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-5 right-2 cursor-pointer text-2xl text-pink-500"
        >
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length==0 && <div className="my-4 text-base font-normal"> Nothing in cart</div>}
          {Object.keys(cart).map((k)=>{
            return  <li key={k}>
            <div className="item flex my-5">
              <div className="w-2/3 font-semibold">
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
 
        <div className="total font-semibold">Subtotal: &nbsp;&nbsp;&nbsp;&nbsp;{Math.round((subTotal*0.72)*100)/100}</div>
          <div className="total font-semibold mb-2">GST (18%): &nbsp; {Math.round((subTotal*0.18)*100)/100}</div>

          <hr
   style={{
   background: "#000",
   height: "2px",

   }}
/>
          <div className="total font-bold text-2xl mb-3">Total: ₹{Math.round((subTotal)*100)/100}</div>

        <div className="flex">
         <Link href={'/checkout'}><button className="flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">
            <BsFillBagCheckFill className="m-1" /> Checkout
          </button>
          </Link>
          <button onClick={clearCart} className="flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
