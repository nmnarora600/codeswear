import React,{useState} from "react";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";

import userimg from "../../../assets/images/users/vegeta.jpg";
import {
  Box,

  Link,

  Button,
  
} from "@mui/material";
import { useRouter } from "next/router";
const ProfileDD = ({user,logout}) => {

 const[show, setShow]=useState(false);
  const [hovered, setHovered] = useState(false);

  const router=useRouter();
  return (
    <>
      <Button
        aria-label="menu"
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={()=>{setShow(!show)}}
      > 
        <Box display="flex" onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)} >
          <Image
            src={userimg}
            alt={userimg}
            width="30"
            height="30"
            className="rounded-full"
          />
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "flex"
              },
              
            }}
          >
         
            <FeatherIcon icon="chevron-down" width="20" height="20" />
          </Box>
        </Box>
      </Button>
      <div
        onMouseOver={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className={`px-5 text-left h-56 absolute z-40 right-12 top-11  w-40 bg-gray-50 border border-gray-200 shadow-xl rounded-lg ${show?'visible':'invisible'}`}
        
      >
        <ul>
        <li className="mt-3 mb-1 text-gray-500  text-sm font-semibold">Hi, <span >{user}</span></li>
              <hr className="border border-[#3498db]" />
        <Link href="/" style={{textDecoration:'none'}}>
           
                <li  className="text-black mt-2 mb-0 hover:text-[#3498db] py-1  text-sm font-semibold">Home</li>
              
          </Link>
        <Link href="/myaccount" style={{textDecoration:'none'}}>
           
                <li  className="text-black mt-2 mb-0 hover:text-[#3498db] py-1  text-sm font-semibold">Manage Account</li>
              
          </Link>
        <Link href="/admin/addnewadmin" style={{textDecoration:'none'}}>
           
                <li  className="text-black mt-2 hover:text-[#3498db] py-1  text-sm font-semibold">Add new Admin</li>
              
          </Link>
          
  
          <Box className='px-2 pt-5 pb-2' >
            {/* <Link to="/"> */}
              <Button onClick={logout} fullWidth variant={hovered ? "contained" : "outlined"} onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)} color="primary">
                Logout
              </Button>
            {/* </Link> */}
          </Box>
        </ul>
      </div>
    </>
  );
};

export default ProfileDD;
