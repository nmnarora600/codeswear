import Image from "next/image";
import Link from "next/link";
import React from "react";


const Footer = () => {
  return (
    <div>
      <footer className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <Link
              href={"/"}
              className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
            >
              <Image src="/logo.png" alt="" width={200} height={40} />
            </Link>
            <p className="mt-2 text-sm text-gray-500 px-3 ml-1">
              Wear the &lt;Code/&gt;{" "}
            </p>
            <p className="text-sm text-gray-500 px-3 ml-1">
              Premium Tshirts, Hoodies, Zippers, and Mugs.
            </p>
          </div>
          <div className="flex-grow flex flex-wrap md:pl-16 -mb-10 md:mt-0 mt-10 md:text-left text-center ">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                CATEGORIES
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <Link
                    href={"/tshirts"}
                    className="text-gray-600 hover:text-pink-800"
                  >
                    Tshirts
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/hoodies"}
                    className="text-gray-600 hover:text-pink-800"
                  >
                    Hoodies
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/zipper"}
                    className="text-gray-600 hover:text-pink-800"
                  >
                    Zippers
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/mugs"}
                    className="text-gray-600 hover:text-pink-800"
                  >
                    Mugs
                  </Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900  tracking-widest text-sm mb-3">
                ABOUT
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <Link
                    href={"#"}
                    className="text-gray-600 hover:text-pink-800"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href={"#"}
                    className="text-gray-600 hover:text-pink-800"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href={"#"}
                    className="text-gray-600 hover:text-pink-800"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href={"#"}
                    className="text-gray-600 hover:text-pink-800"
                  >
                    Wholesale
                  </Link>
                </li>
              </nav>
            </div>
          
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                POLICY
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <Link
                    href={"#"}
                    className="text-gray-600 hover:text-pink-800"
                  >
                    Return Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href={"#"}
                    className="text-gray-600 hover:text-pink-800"
                  >
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link
                    href={"#"}
                    className="text-gray-600 hover:text-pink-800"
                  >
                    Security
                  </Link>
                </li>
                <li>
                  <Link
                    href={"#"}
                    className="text-gray-600 hover:text-pink-800"
                  >
                    Privacy
                  </Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                SOCIAL
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <Link
                    href={"#"}
                    className="text-gray-600 hover:text-pink-800"
                  >
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link
                    href={"#"}
                    className="text-gray-600 hover:text-pink-800"
                  >
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    href={"#"}
                    className="text-gray-600 hover:text-pink-800"
                  >
                    Twitter (X)
                  </Link>
                </li>
                <li>
                  <Link
                    href={"#"}
                    className="text-gray-600 hover:text-pink-800"
                  >
                    YouTube
                  </Link>
                </li>
              </nav>
            </div>
          </div>

          
        
          </div>
   
       

        <div className="text-sm text-gray-700  font-bold mt-0 text-center underline-offset-2 py-4 underline  hover:text-pink-800 cursor-none">
          &copy; Codeswear 2023 - All Rights Reserved
        </div>
      </footer>
    </div>
  );
};

export default Footer;
