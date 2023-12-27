
import Head from 'next/head'
import Image from 'next/image'


export default function Home() {

  return (
   <main className="min-h-screen ">
    <Head>
        <title>Codeswear.com - Wear the code</title>
        <meta name="description" content='CodesWear: Wear the code'/>
        <link rel='icon' href='@/app/favicon.ico'/>
        {/* <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/> */}
    </Head>
   
    <div className='object-cover md:min-h-screen overflow-hidden'>
      
      <img src="/home.webp" alt="" className=' pt-8 scale-125 lg:scale-150 ' />
    </div>

    <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
      <h1 className="sm:text-3xl text-2xl md:text-4xl font-medium title-font mb-2 text-gray-900">Wear The Code with Codeswear</h1>
      <p className="lg:w-2/3 mt-3 w-full leading-relaxed text-gray-500">Wear whatever you want? What do you want? You want code? so why not wear the code??? Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quisquam ducimus non modi sed dolorum voluptatem, reiciendis sint assumenda itaque fuga reprehenderit error harum, amet eveniet quo. Excepturi enim beatae, quisquam facilis iure dolorum laboriosam unde sint, nobis, nihil laudantium ut maxime inventore aliquid dolor ipsam distinctio culpa. Fugiat molestiae dolorum modi vitae non aliquam. </p>
    </div>
    <div className="flex flex-wrap -m-4">
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-200 p-6 rounded-lg flex flex-col justify-center items-center hover:scale-105 transition-all transform ease-in-out duration-500 cursor-pointer">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
          <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-3xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M14 6a2 2 0 1 0 -4 0c0 1.667 .67 3 2 4h-.008l7.971 4.428a2 2 0 0 1 1.029 1.749v.823a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-.823a2 2 0 0 1 1.029 -1.749l7.971 -4.428"></path></svg>
            
          </div>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Elevate Your Wardrobe</h2>
          <p className="leading-relaxed text-base text-center">From timeless classics to modern elegance, each piece is thoughtfully curated to elevate your wardrobe and style.</p>
        </div>
      </div>
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-200 p-6 rounded-lg flex flex-col justify-center items-center hover:scale-105 transition-all transform ease-in-out duration-500 cursor-pointer">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" className="text-3xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H112C85.5 0 64 21.5 64 48v48H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h272c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H40c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H64v128c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z"></path></svg>
          </div>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Zero Shipping Charges</h2>
          <p className="leading-relaxed text-base text-center"> No need to worry—shipping's on us, Enjoy the freedom of free shipping on every order.</p>
        </div>
      </div>
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-200 p-6 rounded-lg flex flex-col justify-center items-center hover:scale-105 transition-all transform ease-in-out duration-500 cursor-pointer">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
          <img src='/discount.png'/>
          </div>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Exclusive Deals and Discounts</h2>
          <p className="leading-relaxed text-base text-center">Unlock exclusive deals and discounts, because you deserve to shop your favorite styles without breaking the bank.</p>
        </div>
      </div>
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-200 p-6 rounded-lg flex flex-col justify-center items-center hover:scale-105 transition-all transform ease-in-out duration-500 cursor-pointer">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
            <img src='/support.png'/>
          </div>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">24/7 Customer Support</h2>
          <p className="leading-relaxed text-base text-center">Our customer support team is here for you 24/7. Contact us anytime for assistance or inquiries.</p>
        </div>
      </div>
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-200 p-6 rounded-lg flex flex-col justify-center items-center hover:scale-105 transition-all transform ease-in-out duration-500 cursor-pointer">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
            <img src='/custom.png'/>
          </div>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Create Your Signature Style</h2>
          <p className="leading-relaxed text-base text-center">Design your own fashion statement! Customize your products for a style that's uniquely yours.</p>
        </div>
      </div>
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-200 p-6 rounded-lg flex flex-col justify-center items-center hover:scale-105 transition-all transform ease-in-out duration-500 cursor-pointer">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
            <img src='/return.png'/>
          </div>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Hassle-Free Returns</h2>
          <p className="leading-relaxed text-base text-center">Not satisfied? No worries! Enjoy our hassle-free returns process for a stress-free shopping experience.</p>
        </div>
      </div>
    </div>
 
  </div>
</section>

   </main>
  )
}


