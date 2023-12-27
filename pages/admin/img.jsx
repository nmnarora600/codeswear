import React, { useState } from 'react'

const Image = () => {
  const[files,setFiles]=useState(null);
  const[createObjectUrl, setCreateObjectUrl]=useState(null);

  const uploadtoClient=(e)=>{
   
if(e.target.files && e.target.files[0]){
 
  const i=e.target.files[0];
  
  setFiles(i);
  setCreateObjectUrl(URL.createObjectURL(i));
}
  }

  const uploadtoServer=async()=>{
    let formData = new FormData();
    formData.append('files', files);
    
    const resp=await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/imgupload`,{
      method:"POST",
      body:formData
    })
    let res=await resp.json();

  }
  return (
    <div>
<img src={createObjectUrl} alt="" srcset="" />
<h4>Select Image</h4>


<input type='file' name='files' onChange={uploadtoClient}/>


<button
type='submit'
onClick={uploadtoServer}>Submit</button>
    </div>
  )
}

export default Image