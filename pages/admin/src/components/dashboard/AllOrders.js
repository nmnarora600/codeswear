import React, { useEffect } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  useMediaQuery,
  TableRow,
  Chip,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";



const AllOrders = ({products}) => {
  useEffect(()=>{

  },[])
  const isLaptopScreen = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  if(isLaptopScreen){
    return (
    
      <BaseCard title="All Orders">
      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "normal",
        }}
       className="overflow-x-visible text-center"
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Customer
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography color="textSecondary" variant="h6">
               Order Id
              </Typography>
            </TableCell>
            <TableCell >
              <Typography color="textSecondary" variant="h6">
               Order Date
              </Typography>
            </TableCell>
            <TableCell align="center" className="w-[18vw] md:px-0">
              <Typography color="textSecondary" variant="h6">
               Destination
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography color="textSecondary" variant="h6">
                Status
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography color="textSecondary" variant="h6">
                Payment
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.slice().reverse().map((product) => (
            <TableRow key={product._id}>
              <TableCell           >
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
                      {product.name}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px",
                      }}
                    >
                      {product.phone}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell align="center" >
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {product.orderid}
                </Typography>
              </TableCell>
              <TableCell  >
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {new Date(product.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: '2-digit' })}
                </Typography>
              </TableCell>
              
              <TableCell align="center">
                <Typography color="textSecondary" variant="h5">
                {product.city}, {product.state}, {product.pincode}
                  
                </Typography>
              </TableCell>
              {/* <TableCell>
                <Typography color="textSecondary" variant="h5" >
                  {product.size}/{product.color}
                  
                </Typography>
              </TableCell> */}

<TableCell align="center">
              <Chip
                  sx={{
                    pl: "4px",
                    pr: "4px",
                    backgroundColor: product.deliveryStatus === 'Delivered' ? 'green' : product.deliveryStatus === 'Shipped' ?'#4ee499':product.deliveryStatus === 'In Transit'?'teal':product.deliveryStatus === 'Processing'?'orange':'gray',
                    color: "#fff",
                  }}
                  size="small"
                  label={product.deliveryStatus}
                ></Chip>
                {/* <Typography variant="h6">{product.deliveryStatus}</Typography> */}
              </TableCell>
              <TableCell align="center">
                <Chip
                  sx={{
                    pl: "4px",
                    pr: "4px",
                    backgroundColor: product.status === 'Paid' ? 'green' : (product.status==='Pending'?'orange':"red"),
                    color: "#fff",
                  }}
                  size="small"
                  label={product.status==='Paid'?'Success':(product.status==='Pending'?'Pending':"Failed")}
                ></Chip>
              </TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h4 className="text-center pt-10">More orders coming soon.</h4>
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
       className="overflow-x-visible text-center"
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Customer
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography color="textSecondary" variant="h6">
               Order Id
              </Typography>
            </TableCell>
            <TableCell >
              <Typography color="textSecondary" variant="h6">
               Order Date
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography color="textSecondary" variant="h6">
               Destination
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Status
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="textSecondary" variant="h6">
                Payment
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.slice().reverse().map((product) => (
            <TableRow key={product._id}>
              <TableCell           >
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
                      {product.name}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px",
                      }}
                    >
                      {product.phone}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell align="center" >
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {product.orderid}
                </Typography>
              </TableCell>
              <TableCell  >
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {new Date(product.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: '2-digit' })}
                </Typography>
              </TableCell>
              
              <TableCell align="center">
                <Typography color="textSecondary" variant="h5">
                {product.city}, {product.state}, {product.pincode}
                  
                </Typography>
              </TableCell>
              {/* <TableCell>
                <Typography color="textSecondary" variant="h5" >
                  {product.size}/{product.color}
                  
                </Typography>
              </TableCell> */}

<TableCell align="center">
<Chip
                  sx={{
                    pl: "4px",
                    pr: "4px",
                    backgroundColor: product.deliveryStatus === 'Delivered' ? 'green' : product.deliveryStatus === 'Shipped' ?'#4ee499':product.deliveryStatus === 'In Transit'?'teal':product.deliveryStatus === 'Processing'?'orange':'gray',
                    color: "#fff",
                  }}
                  size="small"
                  label={product.deliveryStatus}
                ></Chip>
              </TableCell>

              <TableCell>
                <Chip
                  sx={{
                    pl: "4px",
                    pr: "4px",
                    backgroundColor: product.status === 'Paid' ? 'green' : (product.status==='Pending'?'orange':"red"),
                    color: "#fff",
                  }}
                  size="small"
                  label={product.status==='Paid'?'Success':(product.status==='Pending'?'Pending':"Failed")}
                ></Chip>
              </TableCell>


           
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h4 className="text-center pt-10">More orders coming soon.</h4>
     </div>
 
  );
  }
  
};

export default AllOrders;
