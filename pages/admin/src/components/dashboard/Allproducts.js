import React, { useEffect } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  useMediaQuery,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";



const ProductPerfomance = ({products}) => {
  useEffect(()=>{

  },[])

  const isLaptopScreen = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  if(isLaptopScreen){
  return (
    <BaseCard title="All Products">
      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "normal",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell className="w-[15vw]">
              <Typography color="textSecondary" variant="h6">
                Title
              </Typography>
            </TableCell>
            <TableCell className="w-[15vw]">
              <Typography color="textSecondary" variant="h6">
               Slug
              </Typography>
            </TableCell>
            <TableCell className="md:w-[8vw] w-[11vw]">
              <Typography color="textSecondary" variant="h6">
               Image
              </Typography>
            </TableCell>
            <TableCell  align="center">
              <Typography color="textSecondary" variant="h6">
                Size/Color
              </Typography>
            </TableCell>
            <TableCell  align="center">
              <Typography color="textSecondary" variant="h6">
                In Stock
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="textSecondary" variant="h6">
                Price
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products && products.map((product) => (
            <TableRow key={product._id}>
              <TableCell   >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
               
                >
                  <Box >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
            
                    >
                      {product.title}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px",
                      }}
                    >
                      {product.category[0].toUpperCase() +
        product.category.slice(1)}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell  >
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {product.slug}
                </Typography>
              </TableCell>
              
              <TableCell>
                <Typography color="textSecondary" variant="h5">
              
                  <img   src={`${product.img.includes('uploads')?product.img:`https://${product.img}`}`} style={{height:'70px'}} alt="" />
                  
                </Typography>
              </TableCell>
              <TableCell  align="center">
                <Typography color="textSecondary" variant="h5" >
                  {product.size}/{product.color[0].toUpperCase() +
        product.color.slice(1)}
                  
                </Typography>
              </TableCell>
              <TableCell  align="center">
                <Chip
                  sx={{
                    pl: "5px",
                    pr: "5px",
                    backgroundColor: (product.availableQty>10)?'green':(product.availableQty<=1)?'red':'orange',
                    color: "#fff",
                  }}
                  size="small"
                  label={product.availableQty}
                ></Chip>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">₹{product.price}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h4 className="text-center pt-10">More products coming soon.</h4>
    </BaseCard>
  );
                }
                else{
                  return (
                    <div style={{overflowX:'auto'}}>
                      <Table
                        aria-label="simple table"
                        sx={{
                          mt: 3,
                          whiteSpace: "normal",
                        }}
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <Typography color="textSecondary" variant="h6">
                                Title
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography color="textSecondary" variant="h6">
                               Slug
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography color="textSecondary" variant="h6">
                               Image
                              </Typography>
                            </TableCell>
                            <TableCell  align="center">
                              <Typography color="textSecondary" variant="h6">
                                Size/Color
                              </Typography>
                            </TableCell>
                            <TableCell  align="center">
                              <Typography color="textSecondary" variant="h6">
                                In Stock
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography color="textSecondary" variant="h6">
                                Price
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {products && products.map((product) => (
                            <TableRow key={product._id}>
                              <TableCell   >
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                               
                                >
                                  <Box >
                                    <Typography
                                      variant="h6"
                                      sx={{
                                        fontWeight: "600",
                                      }}
                            
                                    >
                                      {product.title}
                                    </Typography>
                                    <Typography
                                      color="textSecondary"
                                      sx={{
                                        fontSize: "13px",
                                      }}
                                    >
                                      {product.category[0].toUpperCase() +
                        product.category.slice(1)}
                                    </Typography>
                                  </Box>
                                </Box>
                              </TableCell>
                              <TableCell  >
                                <Typography
                                  sx={{
                                    fontSize: "15px",
                                    fontWeight: "500",
                                  }}
                                >
                                  {product.slug}
                                </Typography>
                              </TableCell>
                              
                              <TableCell>
                                <Typography color="textSecondary" variant="h5">
                              
                                  <img   src={`${product.img.includes('uploads')?product.img:`https://${product.img}`}`} style={{height:'70px'}} alt="" />
                                  
                                </Typography>
                              </TableCell>
                              <TableCell  align="center">
                                <Typography color="textSecondary" variant="h5" >
                                  {product.size}/{product.color[0].toUpperCase() +
                        product.color.slice(1)}
                                  
                                </Typography>
                              </TableCell>
                              <TableCell  align="center">
                                <Chip
                                  sx={{
                                    pl: "5px",
                                    pr: "5px",
                                    backgroundColor: (product.availableQty>10)?'green':(product.availableQty<=1)?'red':'orange',
                                    color: "#fff",
                                  }}
                                  size="small"
                                  label={product.availableQty}
                                ></Chip>
                              </TableCell>
                              <TableCell align="right">
                                <Typography variant="h6">₹{product.price}</Typography>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <h4 className="text-center pt-10">More products coming soon.</h4>
                    </div>
                  );
                }
};

export default ProductPerfomance;
