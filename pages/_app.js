import { AppProps } from "next/app";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoadingBar from 'react-top-loading-bar'


export default function MyApp({ Component, pageProps }) {
  const router= useRouter();
  const [cart, setcart] = useState({});
  const [subTotal, setsubTotal] = useState(0);
  const [user, setUser] = useState({value:null})
  const [key, setKey] = useState(0)
  const [shift, setShift] = useState(false)
  const [progress, setProgress] = useState(0)
  const[isLogged ,setIsLogged]=useState(true)
  useEffect(() => {
    
    try {
    
      if (localStorage.getItem("cart")) {
        setcart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
     
    
    } catch (error) {
      // console.log(error);
      localStorage.clear();
      localStorage.clear();
    }
   
    if(localStorage.getItem('token')){
       setUser({value:localStorage.getItem('token')})
       setKey(Math.random())
       console.log(user)
       setIsLogged(true)
    }
    else{
      setIsLogged(false)
    }
   
  }, [router.query]);
const logout=()=>{
  localStorage.removeItem('token')
  setUser({value:null})
  setIsLogged(false);
}
  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let keys= Object.keys(myCart)
    let subt=0;
    for(let i=0;i<keys.length;i++){
      subt+=myCart[keys[i]].price * myCart[keys[i]].quantity;
    }
    setsubTotal(subt);
  };
useEffect(() => {
 router.events.on('routeChangeComplete',()=>{
  setProgress(100)
 })
 router.events.on('routeChangeStart',()=>{
  setProgress(40)
 })

}, [])

  const buyNow=(itemCode, quantity, price, name, size, variant)=>{
   
    // saveCart({});
    // addToCart(slug, 1,product.price, `${product.title} (${product.size}/${color.charAt(0).toUpperCase() + color.slice(1)})`, product.size, color.charAt(0).toUpperCase() + color.slice(1))
    let newCart = {itemCode:{ quantity: 1, price, name, size, variant }};
  
    setcart(newCart);
// console.log(newCart)
    saveCart(newCart);
    setShift(true);
    router.push('/checkout');
  }

  const addToCart = (itemCode, quantity, price, name, size, variant) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].quantity = cart[itemCode].quantity + quantity;
    } else {
      newCart[itemCode] = { quantity: 1, price, name, size, variant };
    }
    setcart(newCart);
// console.log(newCart)
    saveCart(newCart);
    setShift(true);
  };
  const removeFromCart = (itemCode, quantity, price, name, size, variant) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].quantity = cart[itemCode].quantity - quantity;
    }
    if (newCart[itemCode].quantity <= 0) {
      delete newCart[itemCode];
    }
    setcart(newCart);

    saveCart(newCart);
  };

  const clearCart = () => {
    setcart({});
    saveCart({});
    // console.log("cart cleared")
  };
  
// console.log('user is ', user)
  return (
 <>

    <LoadingBar
        color='#ec4899'
        progress={progress}
        waitingTime={300}
        onLoaderFinished={() => setProgress(0)}
      />
      {key && <Navbar key={key} logout={logout} user={user} cart={cart} addToCart={addToCart} shift={shift} setShift={setShift}removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />}
    {/* <ToastContainer theme='dark' autoClose={500} hideProgressBar={true}/> */}
      <Component isLogged={isLogged} cart={cart} buyNow={buyNow} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
      <Footer />
    </>
  );
}
