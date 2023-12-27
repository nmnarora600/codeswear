import { useRouter } from "next/router";



import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Spinner from "@/components/Spinner";
import Head from "next/head";
const MyAccount = ({ isLogged }) => {
  let token = {};
  const router = useRouter();
  const [name, setName] = useState(""); // fill form values
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false); // show loading spinner
  const [notServicable, setNotServicable] = useState(false); //pin code servicablity
  const [phonelength, setPhonelength] = useState(false); //live invalidity
  const [lowphonelength, setLowPhonelength] = useState(false); // invalidity for blur
const [password, setPassword]=useState('');
const [npassword, setNpassword]=useState('');
const [cpassword, setCpassword]=useState('');
  const [pinlength, setpinLength] = useState(false); // invalidity for blur
  const [invalidPincode, setInvalidPincode] = useState(false);
  const [disable, setDisable] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, [router.query]);

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
    } else {
    
      setNotServicable(true);
    }

    setTimeout(() => {
      setLoading(false);
    }, 700);
  };

  useEffect(() => {
    token = localStorage.getItem("token");
    async function getData() {
      if (localStorage.getItem("token")!=null) {
        let token = localStorage.getItem("token");
    
        let u = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getlogged`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        let resp = await u.json();
        if (resp.error) {
      
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
        } else {
          setName(resp.name);
          setEmail(resp.email);
          setAddress(resp.address);
          setPincode(resp.pincode);
          setPhone(resp.phone);
        }
      } else {
        // router.push('/')
      }
    }
    getData();
  }, []);

  const handlechange = (e) => {
    e.preventDefault();
    if (e.target.name == "name") {
      setName(e.target.value);
    }
    if (e.target.name == "phone") {
      setPhone(e.target.value);
      if (e.target.value.length < 10 && e.target.value.length > 0) {
        setLowPhonelength(true);
        setPhonelength(false);
      }
      if (e.target.value.length === 10 || e.target.value.length === 0) {
        // Handle invalid pincode (optional)
      
        setPhonelength(false);
        setLowPhonelength(false);
      } else if (e.target.value.length > 10) {
        setPhonelength(true);
        setLowPhonelength(false);
      }
    }
    if (e.target.name == "address") {
      setAddress(e.target.value);
    }
   
    if (e.target.name == "pincode") {
      setInvalidPincode(false);
      setNotServicable(false);
      setpinLength(false);
      setPincode(e.target.value);
      let trimmedPincode = String(e.target.value);
      if (trimmedPincode.length === 6 ) {
        // Handle invalid pincode (optional)
    
        updateCity(trimmedPincode);
      } else if (trimmedPincode.length !== 6 &&  trimmedPincode.length !== 0) {
      
        setpinLength(true);
      }
    }
    if (e.target.name == "password") {
      setPassword(e.target.value);
    }
    if (e.target.name == "npassword") {
      setNpassword(e.target.value);
    }
    if (e.target.name == "cpassword") {
      setCpassword(e.target.value);
    }
   
  };
 
  const handleDisable=()=>{
    if(phone.length===10 && pincode.length===6 && (notServicable==false)){
     setDisable(false);
   
    }else if(phone.length==0 && pincode.length==0){
      setDisable(false);
    }
    else if(phone.length==10 && pincode.length==0){
      setDisable(false);
    }
    else if(phone.length==0 && pincode.length==6 && (notServicable==false)){
      setDisable(false);
    }
    else{
      setDisable(true);
  
    }
      
  }
  
  useEffect(()=>{
    handleDisable();
  },[phone,pincode, notServicable, invalidPincode, phonelength, lowphonelength])
 useEffect(()=>{
  if(pincode.length==0){
    setInvalidPincode(false);
    setNotServicable(false);
  }
 },[pincode])

  let tphone = "";
  const handleSubmit = async (e) => {
    e.preventDefault();
  

    let data = {
      email,
      name,
      pincode,
      phone,
password,cpassword,npassword,
      address,
    };
  
    let u = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data, token:localStorage.getItem('token') }),
    });
    let resp=await u.json();
  
   if(resp.fulfilled=='both'){
    toast.success("Successfully Updated.", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
   }
   else if(resp.fulfilled=='pass'){
    toast.warn("Only password updated", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
   }
   else if(resp.fulfilled=='onlypass'){
    toast.success("Password Successfully updated", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
   }
   else if(resp.fulfilled=='nopass'){
    toast.error(resp.error, {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
   }
   else if(resp.fulfilled=='details'){
    toast.warn("Only Details are Updated", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
   }
   else if(resp.fulfilled=='none'){
    toast.error("Some Error Occured, Nothing Updated", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
   }
   else if(resp.fulfilled=='onlydetail'){
    toast.success("Details are Successfully Updated", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
   }
   else if(resp.fulfilled=='nodetail'){
    toast.error(resp.error, {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
   }
   else if(resp.fulfilled=='not'){
    toast.error(resp.error, {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
   }
   else{
    toast.error(resp.error, {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
   }

   setPassword('');
   setNpassword('');
   setCpassword('');
  };


  return (
    isLogged && (
      <div className="overflow-x-hidden min-h-screen">
        <div className="container mx-auto my-9 px-3 md:px-16">
          <div className="text-3xl text-center my-8 font-bold">
            Update your Account
          </div>
<Head>
  <title>My Account - Codeswear.com</title>
</Head>
          <h2 className=" font-semibold text-xl">1. Delivery Details</h2>
          <div className="mx-auto flex my-2 ">
            <div className="px-2 w-1/2">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-600"
                >
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
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email <span className="text-xs">(Can not be Changed)</span>
                </label>
                <input
                  type="email"
                  id="email"
                  onChange={handlechange}
                  value={email}
                  name="Email"
                  className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out focus:outline-none"
                 readOnly
                />
              </div>
            </div>
          </div>
          <div className="px-2 w-full">
            <div className="mb-4">
              <label
                htmlFor="address"
                className="leading-7 text-sm text-gray-600"
              >
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
                <label
                  htmlFor="phone"
                  className="leading-7 text-sm text-gray-600"
                >
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
                  onBlur={() => {
                    if (lowphonelength) {
                   
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
                  onBlur={() => {
                    if (pinlength) {
                      setInvalidPincode(true);
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
          <h2 className=" font-semibold text-xl">2. Change Password</h2>
         
          <div className="mx-auto flex my-2 ">
            
            <div className="px-2 w-1/2">
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="leading-7 text-sm text-gray-600"
                >
                Current Password
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={handlechange}
                  value={password}
                  name="password"
                  className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:outline-none focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="px-2 w-1/2">
              <div className="mb-4">
                <label
                  htmlFor="npassword"
                  className="leading-7 text-sm text-gray-600"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="npassword"
                  onChange={handlechange}
                  value={npassword}
                  name="npassword"
                  className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:outline-none focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="px-2 w-1/2">
              <div className="mb-4">
                <label
                  htmlFor="cpassword"
                  className="leading-7 text-sm text-gray-600"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="cpassword"
                  onChange={handlechange}
                  value={cpassword}
                  name="cpassword"
                  className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:outline-none focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            
          </div>

        
        <div className="mx-4 my-2 flex justify-center ">
          <button
           disabled={disable}
            className="flex mr-2 text-white disabled:bg-pink-300 bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded "
            onClick={handleSubmit}
          >
            Update
          </button>
        </div>

        </div>
      </div>
    )
  );
};

export default MyAccount;
