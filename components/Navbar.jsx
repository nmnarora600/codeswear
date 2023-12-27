import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
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

const router=useRouter();
  const [dropdown, setDropdown] = useState(false)
  const [usermail, setUsermail]=useState('');
  const [username, setUsername]=useState('');
  const [admin, setAdmin]=useState(false);

let userdata={};

  useEffect(()=>{
    setShift(false)
const datafetcher=async()=>{
if(localStorage.getItem('token')){


  let data={token:localStorage.getItem('token')};

let u=await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getlogged`,{
  method:"POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
});
let resp=await u.json();
if(resp.error){

logout();
}
else if(resp.notfound){
 logout();
}
else{
  setUsermail(resp.email);
  setUsername(resp.name);
  if(resp.type=='admin'){
    setAdmin(true);
  }
}
}

}
datafetcher();


  },[localStorage])

const handleLogout=()=>{
  


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
  setTimeout(() => {
    logout();
  },1000);
}
  const toggleDropdown=()=>{
    setDropdown(!dropdown)
    
  }
  const toggleCart = () => {
    // if (ref.current.classList.contains("translate-x-full")) {
    //   ref.current.classList.remove("translate-x-full");
    //   ref.current.classList.add("translate-x-0");
    // } else {
    //   ref.current.classList.remove("translate-x-0");
    //   ref.current.classList.add("translate-x-full");
    // }
    setShift(!shift)
  };
  const ref = useRef();
  // let currpath=router.pathname;
  return (
    <>
    {dropdown && <div className="absolute ">
     <div className="fixed right-14 z-40 bg-white  shadow-lg border  top-9 rounded-md px-5 py-4 w-36"   onMouseOver={() => setDropdown(true)}
      onMouseLeave={() => setDropdown(false)} >
            <ul>
              <li className="py-1  text-sm font-semibold ">Hello, {(localStorage.getItem('token'))?username.split(' ')[0]:"User"}</li>
              <hr className="border border-pink-500"/>
            {admin && <Link href={'/admin'}><li className="py-1  text-sm hover:text-pink-500 ">View Dashboard</li></Link>}
              <Link href={'/myaccount'}><li className="py-1  text-sm hover:text-pink-500 ">My Account</li></Link>
              <Link href={`/orders?email=${ encodeURIComponent(usermail)}` } passHref><li className="py-1  text-sm hover:text-pink-500 ">My Orders</li></Link>
              <Link href={'#'} onClick={handleLogout}><li className="py-1 text-sm hover:text-pink-500 ">Logout</li></Link>
            </ul>
            </div>
            </div>}
    <div className={`flex flex-col md:flex-row md:justify-start justify-center sticky top-0 z-10 bg-white items-center mb-1 shadow-md ${!shift && 'overflow-hidden'}`}>
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
           
        {user.value && <MdAccountCircle  className="text-xl md:text-2xl mx-2"/>}
        </div>

        {!user.value && <Link href={'/login'} key={localStorage.getItem('token')} ><button  className="flex text-white bg-pink-600 py-1 px-2 text-sm mx-2 hover:bg-pink-600 rounded "> Login </button></Link>}
        <AiOutlineShoppingCart onClick={toggleCart} className="text-xl md:text-2xl " />
      </div>
      <div
        ref={ref}
        className={`w-60 md:w-72 h-[100vh] sidecart overflow-y-scroll bg-pink-100 absolute top-0  py-10 px-8 transition-all ${( shift!==true ) ? "-right-96": "right-0" } `}
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
         <Link href={'/checkout'} onClick={toggleCart}><button disabled={Object.keys(cart).length===0} className="flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 disabled:bg-pink-300 rounded text-sm">
            <BsFillBagCheckFill className="m-1" /> Checkout
          </button>
          </Link>
          <button onClick={clearCart} disabled={Object.keys(cart).length===0}  className="flex mr-2 disabled:bg-pink-300 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Navbar;
