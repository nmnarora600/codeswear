import Link from "next/link";
import React from "react";
import Product from "@/models/Product";

import mongoose from "mongoose";
import Image from "next/image";

const Tshirts = ({products, SALE}) => {

  return (
    <div>
      
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap m-4 md:pl-4 justify-center">
            {
              Object.keys(products).map((item)=>{

                return(<div key={products[item]._id} className=" md:w-1/5 p-4  shadow-lg m-auto md:mx-7 md:my-3">
                <Link passHref={true} href={`/product/${products[item].slug}`}>
                  <Image
                  alt={`ecommerce`}
                  width={'500'}
                  height={'200'}
                   priority={true}
                    className="h-[30vh] md:h-[36vh] m-auto md:mx-0  relative rounded  block object-contain hover:scale-[103%] ease-in-out transition-transform duration-500  overflow-hidden "
                    src={`https://${products[item].img}`}
                  />
                </Link>
                <Link passHref={true} href={`/product/${products[item].slug}`}>
                  <div className="mt-4 text-center md:text-left ">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      T-shirts
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                     {products[item].name}
                    </h2>
                    <p className="mt-1">{products[item].title.slice(0, 30).endsWith(" ")?products[item].title.slice(0, 30).slice(0,-1)+ "...":products[item].title.slice(0, 30) + '...'}</p>
                    { parseInt(SALE)===1 && <h4 className="bg-pink-400 mt-1 text-white w-1/4 text-center h-4 text-xs">SALE LIVE</h4>}
                    <p className="mt-0 font-semibold text-lg">{parseInt(SALE)===1 && <strike className="text-gray-400 text-sm"> ₹{Math.round(products[item].price*1.3)}</strike>}  ₹ {products[item].price}
                    </p>
                    <div className="mt-2">
                     
                      {products[item].size.map((item, index)=>{
                        return(
                          <span key={index} className="border border-gray-300 px-1 mx-1">{item}</span>)
                       
                      })}
                    </div>

                    <div className="mt-2">
                     
                      
                      {products[item].color.map((item, index)=>{
                        // console.log(item)
                        return(
                        <button key={index} className={`border-2 border-gray-300 ml-1 ${'bg-'+item+'-500'} rounded-full w-6 h-6 focus:outline-none`}></button>)
                       
                      })}
                      
                    </div>
                  </div>
                </Link>
              </div>)
              })
            }
         
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context){
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  
  let products=await Product.find({category:"tshirt"})
// console.log(products)
let tshirts={};
for(let item of products){
    if(item.title in tshirts){
        if(!(tshirts[item.title].color.includes(item.color)) && item.availableQty > 0){
            tshirts[item.title].color.push(item.color);
        }
        if(!(tshirts[item.title].size.includes(item.size)) && item.availableQty > 0){
            tshirts[item.title].size.push(item.size);
        }
    }
    else{
        tshirts[item.title]=JSON.parse(JSON.stringify(item))
        if(item.availableQty > 0){
            tshirts[item.title].color=[item.color];
            tshirts[item.title].size=[item.size];
        }
    }
}
let SALE=process.env.SALE

  return {
    props:{products:JSON.parse(JSON.stringify(tshirts)), SALE:SALE},
  }
}

export default Tshirts;
