import React, { useState , useEffect} from "react";
import Link from "next/link";
import Router, { useRouter } from 'next/router';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";


const Signup = ({isLogged, hostname}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const router=useRouter();
  useEffect(() => {
    if(localStorage.getItem('token')){
      router.push('/')
    }
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = { name, email, password };
  

    try {
      // Wrap the entire async operation in toast.promise
      await toast.promise(
        new Promise(async (resolve, reject) => {
          try {
              let u = await fetch(`${hostname}/api/signup`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });

            let res = await u.json();

       
            
            if (res.token) {
              
              resolve("Account created successfully!");
            
              localStorage.setItem('token', res.token);
              setTimeout(() => {
              
                Router.push(`/`)
              }, 1000);
            } else {
           

              reject( res.error);
              if(res.success){
                router.push('/login')
              }
            
            }
          } catch (error) {
            reject(res.error);
          }
        }),
        {
          pending: {
            render: "Sending data...", // Display loading message while promise is pending
            // Use a loading icon (you can change this to any desired icon)
            theme: "colored",
          },
          success: {
            render: "Data Sent Successfully", // Display the resolved response
            // Use a success icon
            theme: "colored",
          },
          error: {
            render: ({data})=>data, // Display the error message
            // Use an error icon
            theme: "colored",
            
          },
         
        }
      );
    } catch (error) {
      
    }

   

  };
  return (
    <>
    {(!isLogged)&&
    <div className="min-h-screen">
    
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto "
            src={"/cropLogo.png"}
            alt="Your Company"
          />
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create an Account
          </h2>
        </div>
<Head>
  <title>Sign up - Codeswear.com</title>
</Head>
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit}
            className="space-y-3"
            action="#"
            method="POST"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 focus:outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  value={email}
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-pink-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-pink-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
              >
                Create Account
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?
            <Link
              href={"/login"}
              className="font-semibold leading-6 text-pink-600 hover:text-pink-500"
            >
              {" "}
              Login Here!
            </Link>
          </p>
        </div>
      </div>
    </div>}
    </>
  );
};

export async function getServerSideProps(context){

  return{
    props:{hostname:process.env.HOST}
  }
} 

export default Signup;
