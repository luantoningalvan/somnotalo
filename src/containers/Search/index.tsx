import React from "react";
import PageContent from "../../components/Template/PageContent";
import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { AlbumCard } from "../../components/AlbumCard";
import ArtistCard from "../../components/ArtistCard";
import { FiSearch } from "react-icons/fi";

interface SearchProps {
  data: {
    albums: any[];
    artists: any[];
    search: string;
  };
}

export default function Search({ data }: SearchProps) {
  return (
    <PageContent>
      {/* <HStack spacing={2}>
        <Button rounded="full" size="sm" colorScheme="blue">
          Tudo
        </Button>
        <Button rounded="full" size="sm" color="gray.900" colorScheme="gray">
          Álbuns
        </Button>
        <Button rounded="full" size="sm" color="gray.900" colorScheme="gray">
          Artistas
        </Button>
      </HStack> */}

      {data.albums.length > 0 && (
        <Box mb={8}>
          <Heading as="h3" size="md">
            Álbuns
          </Heading>
          <SimpleGrid columns={[1, 2, 3, 4, 6]} spacing={4} mt={4}>
            {data.albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </SimpleGrid>
        </Box>
      )}

      {data.artists.length > 0 && (
        <Box mb={8}>
          <Heading as="h3" size="md">
            Artistas
          </Heading>
          <SimpleGrid columns={[2, 3, 4, 6]} spacing={4} mt={4}>
            {data.artists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </SimpleGrid>
        </Box>
      )}

      {data.albums.length === 0 && data.artists.length === 0 && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          mt={8}
        >
          <FiSearch size={64} />
          <Heading as="h3" size="md" mt={8}>
            Nenhum resultado para "{data.search}"
          </Heading>
          <Text mt={1} color="gray.500">
            Tente novamente com outros termos
          </Text>
        </Box>
      )}
    </PageContent>
  );
}
