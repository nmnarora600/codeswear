import React from "react";
import { Link } from "@mui/material";
import Image from "next/image";
import LogoDark from "../../../../../public/logo.png";

const LogoIcon = () => {
  return (
    <Link href="/">
      <Image src={LogoDark} alt={LogoDark} />
    </Link>
  );
};

export default LogoIcon;
