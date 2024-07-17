import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import PageContent from "../../components/Template/PageContent";
import { FiEdit, FiPlusCircle } from "react-icons/fi";
import { AlbumCard } from "../../components/AlbumCard";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";

interface ArtistDashboardProps {
  data: {
    artist: {
      id: number;
      slug: string;
      name: string;
      cover: string;
      albums: any[];
      clerkId: string;
    };
    statistics: {
      _sum: {
        downloadsCount: number;
        favoriteCount: number;
      };
      _count: {
        _all: number;
      };
    };
  };
}
export function ArtistDashoard(props: ArtistDashboardProps) {
  const { data } = props;
  const { artist, statistics } = data;

  React.useEffect(() => {
    const key = String(`${artist.clerkId}:true`);

    if (localStorage.getItem("isArtist") !== key) {
      localStorage.setItem("isArtist", key);
      window.location.reload();
    }
  }, []);

  return (
    <Container maxW="container.xl" py={8}>
      <Box>
        <Text fontSize="lg" color="gray.200">
          Seja bem-vindo
        </Text>
        <Flex alignItems="flex-end" mt={1} justifyContent="space-between">
          <Heading size="lg">{artist.name}</Heading>

          <Button
            as={Link}
            href={`/painel-artista/editar-perfil`}
            leftIcon={<FiEdit />}
          >
            Editar perfil
          </Button>
        </Flex>
      </Box>
      <HStack mt={4} spacing={4}>
        <Box
          bg="gray.700"
          borderWidth={1}
          borderColor="whiteAlpha.200"
          p={4}
          borderRadius="lg"
          flex={1}
        >
          <Heading size="lg">
            {String(statistics._count._all).padStart(3, "0")}
          </Heading>
          <Text mt={2}>Álbuns publicados</Text>
        </Box>
        <Box
          bg="gray.700"
          borderWidth={1}
          borderColor="whiteAlpha.200"
          p={4}
          borderRadius="lg"
          flex={1}
        >
          <Heading size="lg">
            {String(statistics._sum.downloadsCount || 0).padStart(3, "0")}
          </Heading>
          <Text mt={2}>Downloads</Text>
        </Box>
        <Box
          bg="gray.700"
          borderWidth={1}
          borderColor="whiteAlpha.200"
          p={4}
          borderRadius="lg"
          flex={1}
        >
          <Heading size="lg">
            {String(statistics._sum.favoriteCount || 0).padStart(3, "0")}
          </Heading>
          <Text mt={2}>Vezes favoritado</Text>
        </Box>
      </HStack>

      <Box>
        <Heading mt={8} size="md"></Heading>

        <Flex alignItems="center" mt={1} justifyContent="space-between">
          <Heading size="md">Seu álbuns</Heading>

          <Button
            leftIcon={<FiPlusCircle />}
            as={Link}
            href="/painel-artista/novo-album"
          >
            Novo álbum
          </Button>
        </Flex>

        <SimpleGrid columns={[1, 2, 3, 4, 6]} spacing={4} mt={4}>
          {artist.albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </SimpleGrid>
      </Box>
    </Container>
  );
}
