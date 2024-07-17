import React from "react";
import {
  Icon,
  Button,
  IconButton,
  useBreakpointValue,
  Box,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
} from "@chakra-ui/react";
import { RiAccountCircleLine, RiMenuLine } from "react-icons/ri";
import { useSidebarDrawer } from "./context";
import { Logo } from "./logo";
import { Player } from "../Player";
import { useRouter } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import { FiLogOut, FiSettings, FiHeart } from "react-icons/fi";

const Header: React.FC = () => {
  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });
  const { onOpen } = useSidebarDrawer();
  const { isSignedIn, signOut } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  return (
    <Box
      display="flex"
      h={16}
      px={4}
      left={[0, 0, 0, "220px"]}
      top={0}
      zIndex={10}
      boxSize="border-box"
      w={["full", "full", "full", "calc(100% - 220px)"]}
      bg="#191926"
      borderColor="whiteAlpha.200"
      borderBottomWidth={1}
      gap={8}
      pos="fixed"
      alignItems="center"
      justifyContent="space-between"
    >
      {isMobile && (
        <>
          <IconButton
            aria-label="Open navigation"
            icon={<Icon as={RiMenuLine} />}
            fontSize="24"
            variant="link"
            color="white"
            onClick={onOpen}
          />
          <Logo />
        </>
      )}

      <Player isMobile={isMobile} />

      {isSignedIn ? (
        <Menu>
          <MenuButton
            as={Avatar}
            size="sm"
            cursor="pointer"
            src={user.profileImageUrl}
          />
          <MenuList>
            <MenuItem
              icon={<FiHeart size={18} />}
              onClick={() => router.push("/favoritos")}
            >
              Favoritos
            </MenuItem>
            <MenuItem
              icon={<FiSettings size={18} />}
              onClick={() => router.push("/perfil")}
            >
              Minha conta
            </MenuItem>
            <Divider />
            <MenuItem icon={<FiLogOut size={18} />} onClick={() => signOut()}>
              Sair
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Button
          aria-label="Conta"
          variant="outline"
          colorScheme="blue"
          leftIcon={<RiAccountCircleLine size={22} />}
          onClick={() => router.push("/entrar")}
        >
          Entrar
        </Button>
      )}
    </Box>
  );
};

export default React.memo(Header);
