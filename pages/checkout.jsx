import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import Spinner from "@/components/Spinner";
import Head from "next/head";

const Checkout = ({ clearCart,cart, subTotal, addToCart, removeFromCart }) => {
  const router = useRouter();
  const [name, setName] = useState("");           // fill form values
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);                // show loading spinner
  const [notServicable, setNotServicable] = useState(false);    //pin code servicablity
  const [phonelength, setPhonelength] = useState(false);      //live invalidity
  const [lowphonelength, setLowPhonelength] = useState(false);   // invalidity for blur
  const [disable, setDisable]=useState(true);                   //submit button disable
  const [pinlength, setpinLength]=useState(false);              // invalidity for blur
  const [invalidPincode, setInvalidPincode]=useState(false);      //live invalidity

let tphone='';
let token={};
  useEffect(() => {
    token=localStorage.getItem('token')
    async function getData() {
      if (localStorage.getItem("token")) {
        let token = localStorage.getItem("token");
        let u = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getlogged`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        let resp = await u.json();
        if(resp.error){
       
          toast.error(resp.error, {
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
          setName(resp.name);
        setEmail(resp.email);
        setAddress(resp.address);
        setPincode(resp.pincode);
        setPhone(resp.phone);
        }
        
      }
      else{
        // router.push('/')
      }
    }
    getData();
   
  }, []);

const handleDisable=()=>{
  if(name!=="" && email!==""  && address.length>10 &&phone.length===10 && pincode.length===6 && (notServicable==false)){

   setDisable(false);
 
  }else{
    setDisable(true);

  }
    
}

useEffect(()=>{
  handleDisable();
  updateCity(pincode);
},[phone,pincode, notServicable, invalidPincode, phonelength, lowphonelength])


  const updateCity = async (trimmedPincode) => {
    setLoading(true);

    let u = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let resp = await u.json();
    if (resp[trimmedPincode]) {
      setNotServicable(false);
      setState(resp[trimmedPincode][1]);
      setCity(resp[trimmedPincode][0]);
    } else {
  
      setNotServicable(true);
      setState("");
      setCity("");
    }

    setTimeout(() => {
      setLoading(false);
    }, 700);
  };

  const handlechange = (e) => {
    e.preventDefault();
    if (e.target.name == "name") {
      setName(e.target.value);
    }
    if (e.target.name == "email") {
      setEmail(e.target.value);
    }
    if (e.target.name == "phone") {
      setPhone(e.target.value);
      if(e.target.value.length <10){
        setLowPhonelength(true);
        setPhonelength(false)
      }
      if (e.target.value.length === 10) {
        
       
        setPhonelength(false);
        setLowPhonelength(false);
      }
      else if(e.target.value.length >10){
        setPhonelength(true);
        setLowPhonelength(false);
      }
    }
    if (e.target.name == "address") {
      setAddress(e.target.value);
    }
    if (e.target.name == "pincode") {
      setInvalidPincode(false)
      setNotServicable(false)
      setpinLength(false);
      setPincode(e.target.value);
      let trimmedPincode = String(e.target.value);
      if (trimmedPincode.length === 6) {
        // Handle invalid pincode (optional)
  
        updateCity(trimmedPincode);
      }
      else if (trimmedPincode.length !== 6) {
       
        setpinLength(true);
        setCity('');
        setState('');
      }
      
    }
handleDisable();

  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    handleDisable();
    let oid = Math.floor(Math.random() * Date.now());
    let data = {
      email,
      name,
      pincode,
      phone,
      state,
      city,
      products: localStorage.getItem("cart"),
      orderid: oid,
      address,
      amount: subTotal,
    };
    let u = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/ordertodb`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let resp = await u.json();
    if(resp.error){
    
      toast.error(resp.error, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // clearCart();
    }
    else{
      if (u.ok) {
        
        router.push(`/payprocess?id=${resp.id}`);
      } else {
        toast.error("Internal server Error", {
          position: "top-left",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
    
  };

  return (
 token && <div className="container m-auto px-3 md:px-16 min-h-screen">
  <Head>
    <title>Checkout - Codeswear.com</title>
  </Head>
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
              onChange={handlechange}
              value={name}
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:outline-none focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
              onChange={handlechange}
              value={email}
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out focus:outline-none"
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
            onChange={handlechange}
            value={address}
            id="address"
            name="address"
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 focus:outline-none ease-in-out"
          />
        </div>
      </div>

      <div className="mx-auto flex my-2 mb-6">
        <div className="px-2 w-1/2">
          <div>
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              Phone
            </label>
            {phonelength && (
              <span className="leading-7 pl-16 text-sm text-pink-600">
                Enter Valid Phone number
              </span>
            )}
            <input
              type="text"
              id="phone"
              placeholder="Your 10 digit phone number"
              onChange={handlechange}
              value={phone}
              name="phone"
              onBlur={()=>{
                if(lowphonelength){
                 
                  setPhonelength(true);
                }
              }}
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 focus:outline-none transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div>
            <label
              htmlFor="pincode"
              className="leading-7 text-sm text-gray-600"
            >
              Pin Code
            </label>
            {notServicable && (
              <span className="leading-7 pl-16 text-sm text-pink-600">
                pincode not serviceable
              </span>
            )}
            {invalidPincode && (
              <span className="leading-7 pl-16 text-sm text-pink-600">
                Invalid Pincode
              </span>
            )}

            <input
              type="text"
              id="pincode"
              onBlur={()=>{if(pinlength){
                setInvalidPincode(true)
                setCity('')
                setState('')
              }
              }}
              onChange={handlechange}
              value={pincode}
              name="pincode"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 focus:outline-none ease-in-out"
            />
            <div className="flex relative scale-75 md:left-[36vw] h-7 md:bottom-[2.25vw] left-[28vw] bottom-[5.5vh]">
              {loading && <Spinner />}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto flex my-2 ">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">
              City
            </label>
            <input
              type="text"
              value={city}
              id="city"
              name="city"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors focus:outline-none duration-200 ease-in-out"
              readOnly
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">
              State
            </label>
            <input
              type="text"
              value={state}
              id="state"
              name="state"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 focus:outline-none px-3 leading-8 transition-colors duration-200 ease-in-out"
              readOnly
            />
          </div>
        </div>
      </div>

      <h2 className=" font-semibold text-xl">2. Review Cart Items</h2>
      <div className=" sidecart bg-pink-100  m-2 p-6 ">
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length == 0 && (
            <div className="my-4 text-base font-normal"> Nothing in cart</div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex my-5 w-auto">
                  <div className="font-semibold w-[20vw]">{cart[k].name}</div>
                  <div className="w-1/3 flex items-center justify-center font-semibold text-xl ">
                    <AiFillMinusCircle
                      onClick={() => {
                        removeFromCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                      className=" text-pink-500 cursor-pointer"
                    />{" "}
                    <span className="mx-2 text-sm">{cart[k].quantity}</span>{" "}
                    <AiFillPlusCircle
                      className="text-pink-500 cursor-pointer "
                      onClick={() => {
                        addToCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <div>
          <div className="total font-semibold">
            Subtotal: &nbsp;&nbsp;&nbsp;&nbsp;
            {Math.round(subTotal * 0.72 * 100) / 100}
          </div>
          <div className="total font-semibold mb-2">
            GST (18%): &nbsp; {Math.round(subTotal * 0.18 * 100) / 100}
          </div>

          <div className="total font-bold text-2xl">
            Total: ₹{Math.round(subTotal * 100) / 100}
          </div>
        </div>
      </div>
      <div className="mx-4 my-2 flex justify-center ">
        
          <button disabled={disable }
            className="flex mr-2 disabled:bg-pink-300  text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded "
            onClick={handleSubmit}
          >
            <BsFillBagCheckFill className="m-1" /> Pay ₹{" "}
            {Math.round(subTotal * 100) / 100}
          </button>
        
      </div>
    </div>
  );
};

export default Checkout;
