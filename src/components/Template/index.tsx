import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";
import { useBreakpointValue } from "@chakra-ui/react";
import { GlobalStyle } from "./styles";
import { useUser } from "@clerk/nextjs";
import api from "../../services/api";

interface TemplateProps {
  children: React.ReactNode;
}

function Template({ children }: TemplateProps) {
  const { user } = useUser();

  const [isArtist, setIsArtist] = React.useState(false);

  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  });

  React.useEffect(() => {
    async function checkIfIsArtist() {
      if (user && user.id) {
        if (localStorage.getItem("isArtist")) {
          const [id, isArtist] = localStorage.getItem("isArtist").split(":");

          if (id === user.id) {
            setIsArtist(isArtist === "true");
            return;
          }
        }

        const result = await api.get(`/artists/check/${user.id}`);
        localStorage.setItem(
          "isArtist",
          String(`${user.id}:${result.data.exists}`)
        );
        setIsArtist(result.data.exists);
      } else {
        setIsArtist(false);
      }
    }

    checkIfIsArtist();
  }, [user]);

  return (
    <>
      <GlobalStyle />
      <Sidebar isDrawerSidebar={isDrawerSidebar} isArtist={isArtist} />
      <Header />

      <Main isDrawerSidebar={isDrawerSidebar}>{children}</Main>
    </>
  );
}

export default Template;
