
import Head from 'next/head';
import Link from 'next/link'
import Router, { useRouter } from 'next/router';
import React, {useState, useEffect} from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({isLogged, hostname}) => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const router=useRouter();

  useEffect(() => {
  
    if(localStorage.getItem('token')){
      router.push('/')
    }
    
  }, [])

  const handleOnSubmit=async(e)=>{

  e.preventDefault();

  
  let c=localStorage.getItem('cart');
  let data = {  email, password ,cart:c};
  try {
    // Wrap the entire async operation in toast.promise
    await toast.promise(
      new Promise(async (resolve, reject) => {
        try {
            let u = await fetch(`${hostname}/api/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          let res = await u.json();
         

     
          
          if (u.ok) {
            
            resolve("Logged in successfully!");
            localStorage.setItem('token', res.token);
            
            if(localStorage.getItem('cart')){
              let newcart=JSON.stringify(res.cart);
              localStorage.setItem("cart",newcart);
            }
            setTimeout(() => {
              
              Router.push(`/`)
            }, 1000);
          } else {
          
            reject(res.error);
          }
        } catch (error) {
          reject(res.error);
        }
      }),
      {
        pending: {
          render: "Sending data...", // Display loading message while promise is pending
          // Use a loading icon (you can change this to any desired icon)
          theme: "light",
        },
        success: {
          render: "Successfully Logged in", // Display the resolved response
          // Use a success icon
          theme: "light",
        },
        error: {
          render: ({data})=>data, // Display the error message
          // Use an error icon
          theme: "light",
        },
      }
    );
  } catch (error) {
    
  }

}



  const setOnchange=(e)=>{
    if(e.target.name=='email'){
      setemail(e.target.value);
    }
    else{
      setpassword(e.target.value);
    }
  }


  return (
    <>
    {(!isLogged)&&
   <div className='min-h-screen'>
     <Head>
      <title>Login - Codeswear.com</title>
     </Head>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img className="mx-auto h-20 w-auto " src={'/cropLogo.png'} alt="Your Company"/>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
    </div>
  
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={handleOnSubmit} className="space-y-6" action="#" method="POST">
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div className="mt-2">
            <input id="email" name="email" onChange={setOnchange} type="email" value={email} autoComplete="email" required className="block w-full rounded-md border py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 focus:outline-none sm:text-sm sm:leading-6"/>
          </div>
        </div>
  
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div className="text-sm">
              <Link href={{
                    pathname: "/forgot"
                  }} className="font-semibold text-pink-600 hover:text-pink-500">Forgot password?</Link>
            </div>
          </div>
          <div className="mt-2">
            <input id="password" name="password" onChange={setOnchange} value={password} type="password" autoComplete="current-password" required className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-pink-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
  
        <div>
          <button type="submit" className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">Sign in</button>
        </div>
      </form>
  
      <p className="mt-10 text-center text-sm text-gray-500">
        Not a member?
        <Link href={'/signup'} className="font-semibold leading-6 text-pink-600 hover:text-pink-500"> Signup Now!</Link>
      </p>
    </div>
  </div></div>}
  </>
  )
}

export async function getServerSideProps(context){

  return{
    props:{hostname:process.env.HOST}
  }
} 



export default Login