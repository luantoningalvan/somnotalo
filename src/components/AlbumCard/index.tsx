import React, { forwardRef } from "react";
import { BsPlayFill } from "react-icons/bs";
import {
  Heading,
  Tag,
  Text,
  Link,
  Box,
  Image,
  chakra,
  CircularProgress,
} from "@chakra-ui/react";
import NextLink from "next/link";

interface AlbumCardProps {
  hideAuthor?: boolean;
  album: {
    id: string;
    slug: string;
    cover: string;
    name: string;
    status: "DRAFT" | "PROCESSING" | "PUBLISHED";
    author: {
      id: number;
      slug: string;
      name: string;
    };
  };
}

export const AlbumCard = forwardRef<any, AlbumCardProps>((props, ref) => {
  const { album, hideAuthor = false } = props;

  function getLink() {
    if (album.status === "PUBLISHED") {
      return `/albums/${album.slug}`;
    }

    if (album.status === "PROCESSING") {
      return "";
    }

    return `/painel-artista/novo-album?id=${album.id}`;
  }

  const draft = album.status === "DRAFT";
  const published = album.status === "PUBLISHED";
  const processing = album.status === "PROCESSING";

  return (
    <Box ref={ref}>
      <Box w="full" pt="100%" pos="relative" role="group">
        {draft && (
          <Tag
            colorScheme="red"
            position="absolute"
            top={2}
            left={2}
            zIndex={4}
          >
            Rascunho
          </Tag>
        )}

        <Link href={getLink()}>
          <Image
            borderRadius="md"
            w="full"
            h="full"
            objectFit="cover"
            inset={0}
            pos="absolute"
            shadow="lg"
            src={album.cover || "/default-album-avatar.png"}
            alt="Capa Album"
          />

          <Box
            pos="absolute"
            zIndex={3}
            w="full"
            h="full"
            top={0}
            bg={processing ? "rgba(0, 47, 114, 0.75)" : "blackAlpha.400"}
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDir="column"
            gap={2}
            visibility={processing ? "visible" : "hidden"}
            opacity={processing ? 1 : 0}
            backdropFilter="blur(1px)"
            transition="visibility 0.2s linear, opacity 0.2s linear, backdrop-filter 0.2s linear"
            _groupHover={{
              visibility: "visible",
              opacity: 1,
            }}
          >
            {processing ? (
              <>
                <CircularProgress
                  isIndeterminate
                  color="white"
                  trackColor="blackAlpha.400"
                />
                <Text>Processando</Text>
              </>
            ) : (
              <chakra.button
                h={12}
                w={12}
                borderRadius="full"
                bg="blackAlpha.500"
                color="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                transition="transform 0.2s"
                _hover={{
                  transform: "scale(1.4)",
                }}
              >
                <BsPlayFill size={32} />
              </chakra.button>
            )}
          </Box>
        </Link>
      </Box>

      <Heading
        mt={3}
        fontSize={["0.75rem", "0.95rem"]}
        lineHeight={1.5}
        color="gray.200"
        noOfLines={2}
      >
        <Link as={NextLink} href={getLink()}>
          {album.name}
        </Link>
      </Heading>
      {!hideAuthor && (
        <Text fontSize="0.7rem" mt={1} color="gray.500">
          <Link as={NextLink} href={`/artistas/${album.author?.slug}`}>
            {album.author?.name}
          </Link>
        </Text>
      )}
    </Box>
  );
});

export default forwardRef;
