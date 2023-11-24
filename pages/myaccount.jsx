import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const MyAccount = ({isLogged}) => {
    const router=useRouter();
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            router.push('/');
        }
    },[router.query])
  return (
    isLogged && <div>MyAccount</div>
  )
}

export default MyAccount