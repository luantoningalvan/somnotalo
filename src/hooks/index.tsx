import React from "react";
import { PlayerProvider } from "./Player";
import { ConfirmationProvider } from "./Confirmation";

const AppContext = ({ children }) => (
  <ConfirmationProvider>
    <PlayerProvider>{children}</PlayerProvider>
  </ConfirmationProvider>
);

export default AppContext;
