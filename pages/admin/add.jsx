import React, { useState, useEffect } from "react";
import FullLayout from "./src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./src/theme/theme";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Grid, Stack, TextField, Button } from "@mui/material";

import BaseCard from "./src/components/baseCard/BaseCard";
import { useRouter } from "next/router";
import Head from "next/head";
const Add = () => {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [hoveredreset, setHoveredreset] = useState(false);
  const [form, setForm] = useState({});
  const [files, setFiles] = useState(null);



 


  const uploadtoClient = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // const i = e.target.files[0];
      
      setFiles(e.target.files[0]);
      
    }
  
  };

  const uploadtoServer = async () => {

    let formData = new FormData();
    formData.append("files", files);
    formData.append("username", "Chris");

    const resp = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/imgupload`, {
      method: "POST",
      body: formData,
    });
    let res = await resp.json();
   
     
    if (res.error) {
      toast.error("Some Error Occured", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
else{
 
  form.img=res.path;
  
}
    return res;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let img2 = await uploadtoServer();

    if (img2.error) {
      console.log("image upload error");
      return;
    }



 
    console.log(form);
  
    if (
      form.availableQty == "" ||
      form.title == "" ||
      form.color == "" ||
      form.size == "" ||
      form.price == "" ||
      form.category == "" ||
      form.img == "" ||
      form.desc == "" ||
      form.slug == ""
    ) {
      toast.error("All Fields are required", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (form && form.desc) {
      let formattedText = form.desc
        .replace(/\n/g, "<br/>")
        .replace(/  /g, "&nbsp;&nbsp;");
      form.desc = formattedText;
    }

    let u = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addproducts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    let resp = await u.json();

    if (resp.success) {
      toast.success("Successfully Added", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setForm({})
      document.getElementsByName('files')[0].value='';
    } else {
      toast.error(resp.error, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      form.slug='';
    }

   
   
  };
  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    
  };

  const [admin, setAdmin] = useState(false);



  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }

    const datafetcher = async () => {
      if (localStorage.getItem("token")) {
        let data = { token: localStorage.getItem("token") };

        let u = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getlogged`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        let resp = await u.json();
        if (resp.error) {
        } else if (resp.notfound) {
        } else {
          let a = resp.type;
          if (a == "admin") {
            setAdmin(true);
          } else {
            router.push("/");
          }
        }
      }
    };
    datafetcher();
  }, []);

  return (
    admin && (
      <ThemeProvider theme={theme}>
        <style jsx global>
          {`
            .nav {
              display: none;
            }
            footer {
              display: none;
            }
          `}
        </style>
        <FullLayout>
          <Head>
            <title>Add new Product - Codeswear Admin</title>
          </Head>
          <Grid container spacing={0}>
            <Grid item xs={12} lg={12}>
              <BaseCard title="Add a Product">
                <Stack spacing={3}>
                  <TextField
                    name="title"
                    label="Title"
                    variant="outlined"
                    value={form.title ? form.title : ""}
                    onChange={onChange}
                  />

                  {/* <TextField  value={form.size ? form.size:''} onChange={onChange} name="size" label="Size" variant="outlined" /> */}
                  <div className="flex justify-between">
                    <select
                      value={form.size ? form.size : ""}
                      onChange={onChange}
                      name="size"
                      label="Size"
                      className={`border w-[20vw] border-gray-300 hover:border-black py-4 rounded focus:text-black ${
                        form.size && form.size != ""
                          ? "text-black"
                          : "text-gray-500"
                      }`}
                    >
                      <option value="">Size</option>
                      <option>S</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                      <option>XXL</option>
                    </select>
                    {/* <TextField  value={form.category ? form.category:''} onChange={onChange} name="category" label="Category" variant="outlined" /> */}
                    <select
                      value={form.category ? form.category : ""}
                      onChange={onChange}
                      name="category"
                      label="Category"
                      className={`border w-[20vw]  border-gray-300 hover:border-black py-4 rounded focus:text-black ${
                        form.category && form.category != ""
                          ? "text-black"
                          : "text-gray-500"
                      }`}
                    >
                      <option value="">Category</option>
                      <option value="tshirt">Tshirt</option>
                      <option value="zipper">Zipper</option>
                      <option value="hood">Hood</option>
                      <option value="mug">Mug</option>
                    </select>
                    <TextField
                      value={form.color ? form.color : ""}
                      onChange={onChange}
                      name="color"
                      className="w-[30vw]"
                      label="Color"
                      variant="outlined"
                    />
                  </div>
                  <TextField
                    value={form.slug ? form.slug : ""}
                    onChange={onChange}
                    name="slug"
                    label="slug"
                    variant="outlined"
                  />

                  <TextField
                    value={form.price ? form.price : ""}
                    onChange={onChange}
                    name="price"
                    label="Price"
                    variant="outlined"
                  />
                  <TextField
                    value={form.availableQty ? form.availableQty : ""}
                    onChange={onChange}
                    name="availableQty"
                    label="Available Quantity"
                    variant="outlined"
                  />

                  <TextField
                    name="desc"
                    label="Description"
                    value={form.desc ? form.desc : ""}
                    onChange={onChange}
                    multiline
                    rows={4}
                  />

                  <input type="file" name="files" onChange={uploadtoClient} />
                </Stack>
                <br />
                <Button
                  variant={hovered ? "contained" : "outlined"}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  mt={2}
                  onClick={onSubmit}
                >
                  Submit
                </Button>
                <Button
                  variant={hoveredreset ? "contained" : "outlined"}
                  onMouseEnter={() => setHoveredreset(true)}
                  onMouseLeave={() => setHoveredreset(false)}
                  mt={2}
                  style={{ marginLeft: "1vw" }}
                  onClick={() => {
                    form.availableQty = "";
                    form.title = "";
                    form.color = "";
                    form.size = "";
                    form.price = "";
                    form.category = "";
                    form.desc = "";
                    form.slug = "";
                    document.getElementsByName('files')[0].value='';
                  }}
                >
                  Reset
                </Button>
              </BaseCard>
            </Grid>
          </Grid>
        </FullLayout>
      </ThemeProvider>
    )
  );
};

export default Add;
