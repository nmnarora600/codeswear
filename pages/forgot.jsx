import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
const Forgot = ({ isLogged, token }) => {
  const router = useRouter();
  // useEffect(() => {
  //   if (localStorage.getItem('token')) {

  //     router.push("/");
  //   }
  // }, [isLogged]);
  useEffect(() => {
    router.query.token = token;
    
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");



  const sendResetEmail = async (e) => {
    e.preventDefault();
    let u = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, sendMail: true }),
    });
    let resp = await u.json();
  
    if (resp.success) {
      toast.success(resp.comment, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(resp.comment, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    if (password == cpassword) {
      let u = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, sendMail: false, token, password }),
      });
      let resp = await u.json();
   
      if (resp.success) {
        toast.success(resp.comment, {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          
          router.push('/login')
        }, 1000);
      } else {
        toast.error(resp.comment, {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      toast.error("Passwords do not match", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <>
      {!isLogged && (
        <div className="min-h-screen">
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <Head>
                <title>Reset Password - Codeswear.com</title>
              </Head>
              <img
                className="mx-auto h-20 w-auto "
                src={"/cropLogo.png"}
                alt="Your Company"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Reset Password
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or{" "}
                <Link
                  href={"/login"}
                  className="font-medium text-pink-500 hover:text-pink-600"
                >
                  Login
                </Link>
              </p>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              {token && (
                <form
                  className="space-y-6"
                  onSubmit={resetPassword}
                  method="POST"
                >
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Enter new Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => {
                          e.preventDefault();
                          setPassword(e.target.value);
                        }}
                        type="password"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none px-2 focus:ring-pink-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex ">
                      <label
                        htmlFor="cpassword"
                        className={`block text-sm font-medium leading-6 text-gray-900 pr-16 ${
                          password == cpassword ? "md:pr-9" : "md:pr-7"
                        }`}
                      >
                        Confirm new Password
                      </label>
                      {password && password == cpassword && (
                        <p className="text-green-600 text-xs flex items-center pl-16 md:pl-28">
                          Passwords Match
                        </p>
                      )}
                      {password != cpassword && (
                        <p className="text-red-600 text-xs flex items-center pl-16 md:pl-20">
                          Passwords do not Match
                        </p>
                      )}
                    </div>
                    <div className="mt-2">
                      <input
                        id="cpassword"
                        name="cpassword"
                        value={cpassword}
                        onChange={(e) => {
                          e.preventDefault();
                          setCpassword(e.target.value);
                        }}
                        type="password"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none px-2 focus:ring-pink-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={password == "" || password != cpassword}
                      className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 disabled:bg-pink-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              )}
              {!token && (
                <form
                  className="space-y-6"
                  onSubmit={sendResetEmail}
                  method="POST"
                >
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
                        onChange={(e) => {
                          e.preventDefault();
                          setEmail(e.target.value);
                        }}
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none px-2 focus:ring-pink-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                    >
                      Reset my Password
                    </button>
                  </div>
                </form>
              )}

              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?
                <Link
                  href={{
                    pathname: "/signup",
                  }}
                  className="font-semibold leading-6 text-pink-600 hover:text-pink-500"
                >
                  {" "}
                  Create an Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  const token = context.query.token; // Hardcoded for example
  if (!token) {
    return {
      props: { token: null },
    };
  }
  return {
    props: { token },
  };
}

export default Forgot;
