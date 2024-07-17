import React from "react";
import { Box, Image, Heading } from "@chakra-ui/react";
import Link from "next/link";

interface ArtistCardProps {
  artist: {
    id: number;
    slug: string;
    name: string;
    avatar: string;
    contact_info: string | null;
    cover: string;
  };
}

const ArtistCard: React.FC<ArtistCardProps> = (props) => {
  const { artist } = props;

  return (
    <Box as={Link} href={`/artistas/${artist.slug}`} h="full">
      <Box
        borderWidth={1}
        h="full"
        bg="gray.700"
        rounded="md"
        p={[3, 6]}
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        transition="background-color 0.2s"
        _hover={{
          borderColor: "whiteAlpha.400",
        }}
      >
        <Box w="full" pt="100%" pos="relative">
          <Image
            rounded="full"
            w="full"
            h="full"
            fit="cover"
            pos="absolute"
            inset="0"
            src={artist.avatar || "/default-artist-avatar.png"}
            alt={artist.name}
          />
        </Box>
        <Heading textAlign="center" size={["xs", "sm"]} mt={4}>
          {artist.name}
        </Heading>
      </Box>
    </Box>
  );
};

export default ArtistCard;
