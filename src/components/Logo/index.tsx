import React from "react";
import logoSvg from "@/static/NFT.svg";
import { useNavigate } from "@modern-js/runtime/router";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <img
      src={logoSvg}
      className="w-7 h-7 cursor-pointer"
      onClick={() => navigate("/")}
    />
  );
};

export default Logo;
