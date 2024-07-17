import Link from "next/link";
import React from "react";
import { Logo as StyledLogo } from "./styles";

const Logo = () => {
  return (
    <Link href="/">
      <StyledLogo>
        <img src="/logo.svg" alt="Logo Som no Talo" />
      </StyledLogo>
    </Link>
  );
};

export { Logo };
