import React from "react";

import {
  BiAlbum as AlbumIcon,
  BiCompass as ExploreIcon,
  BiTachometer as DJDashIcon,
} from "react-icons/bi";
import Link from "next/link";

import {
  SidebarContainer,
  SearchContainer,
  SidebarContainerMenuItem,
} from "./styles";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/router";
import { useCallback } from "react";
import {
  Box,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  Flex,
} from "@chakra-ui/react";
import { useSidebarDrawer } from "./context";
import { Logo } from "./logo";
import { useUser } from "@clerk/nextjs";

interface SidebarNavProps {
  closeBtn?: React.ReactNode;
  isArtist?: boolean;
}

const SidebarNav = ({ closeBtn, isArtist }: SidebarNavProps) => {
  const { user } = useUser();

  const items = React.useMemo(() => {
    return [
      {
        label: "Explorar",
        icon: ExploreIcon,
        url: "/explorar",
      },
      {
        label: "Novidades",
        icon: AlbumIcon,
        url: "/novidades",
      },
      ...(isArtist
        ? [
            {
              label: "Meu painel",
              icon: DJDashIcon,
              url: "/painel-artista",
            },
          ]
        : []),
    ];
  }, [isArtist]);

  const { asPath, push } = useRouter();

  const handleSearch = useCallback((e) => {
    if (e.target.value !== "") {
      push(`/buscar?s=${e.target.value}`);
    }
  }, []);

  return (
    <SidebarContainer>
      <Flex alignItems="center" justifyContent="space-between">
        <Logo />
        {closeBtn && closeBtn}
      </Flex>

      <SearchContainer>
        <FiSearch size={20} />
        <input
          type="search"
          placeholder="Buscar"
          onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
        />
      </SearchContainer>

      <ul className="menu-tab">
        {items.map((item) => (
          <SidebarContainerMenuItem
            key={item.label}
            current={asPath.includes(item.url)}
          >
            <Link href={item.url}>
              <item.icon className="menu-tab-icon" size={22} />
              {item.label}
            </Link>
          </SidebarContainerMenuItem>
        ))}
      </ul>

      <div className="links">
        <Link href="/politica-de-privacidade">
          Política de Privacidade e de Cookies
        </Link>
        <Link href="/protecao-propriedade-intelectual">
          Proteção de Propriedade Intelectual
        </Link>
        <a href="https://forms.gle/ytqyAcddVAN1Y7d99" target="_blank">
          Denúncia de Conteúdo
        </a>
      </div>
    </SidebarContainer>
  );
};

interface SidebarProps {
  isDrawerSidebar: boolean;
  isArtist?: boolean;
}

export function Sidebar({ isDrawerSidebar, isArtist }: SidebarProps) {
  const { isOpen, onClose } = useSidebarDrawer();

  if (isDrawerSidebar) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <SidebarNav isArtist={isArtist} closeBtn={<DrawerCloseButton />} />
        </DrawerOverlay>
      </Drawer>
    );
  }
  return (
    <Box as="aside">
      <SidebarNav isArtist={isArtist} />
    </Box>
  );
}

export default Sidebar;
