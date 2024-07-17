import React from "react";
import { MainContainer } from "./styles";

const Main: React.FC<{ isDrawerSidebar: boolean }> = ({
  children,
  isDrawerSidebar,
}) => (
  <MainContainer isDrawerSidebar={isDrawerSidebar}>{children}</MainContainer>
);

export default Main;
