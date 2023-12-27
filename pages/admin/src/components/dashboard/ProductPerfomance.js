import React, { useEffect } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";



const AllOrders = ({o}) => {
  useEffect(()=>{

  },[])
  return (
    <BaseCard title="Recent Orders">
      <Table
      className="mt-3 mb-2"
        aria-label="simple table"
        sx={{
          
          whiteSpace: "normal",
        }}
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
            {/* <TableCell align="center">
              <Typography color="textSecondary" variant="h6">
               Destination
              </Typography>
            </TableCell> */}
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
          {o.slice(-4).reverse().map((product) => (
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
              
              {/* <TableCell align="center">
                <Typography color="textSecondary" variant="h5">
                {product.city}, {product.state}, {product.pincode}
                  
                </Typography>
              </TableCell> */}
              {/* <TableCell>
                <Typography color="textSecondary" variant="h5" >
                  {product.size}/{product.color}
                  
                </Typography>
              </TableCell> */}
             
              <TableCell align="center">
                {/* <Typography variant="h6">{product.deliveryStatus}</Typography> */}
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
    </BaseCard>
  );
};

export default AllOrders;


