import {
  Container,
  HStack,
  Heading,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiChevronLeft } from "react-icons/fi";
import { EditArtistName } from "./sections/UpdateName";
import { UpdateArtistAvatar } from "./sections/UpdateAvatar";
import { UpdateArtistBanner } from "./sections/UpdateBanner";
import { UpdateArtistContacts } from "./sections/UpdateContacts";

interface EditArtistProfileProps {
  artist: {
    id: number;
    name: string;
    avatar: string;
    cover: string;
    contacts: {
      type: string;
      value: string;
    }[];
  };
}

export function EditArtistProfile({ artist }: EditArtistProfileProps) {
  const { back } = useRouter();

  return (
    <Container maxW="container.md" py={8}>
      <HStack>
        <IconButton
          aria-label="Voltar"
          variant="ghost"
          color="whiteAlpha.900"
          icon={<FiChevronLeft />}
          onClick={back}
        />
        <Heading size="md">Editar perfil</Heading>
      </HStack>

      <Stack spacing={4} mt={4}>
        <EditArtistName name={artist.name} />

        <UpdateArtistAvatar avatar={artist.avatar} />

        <UpdateArtistBanner banner={artist.cover} />

        <UpdateArtistContacts contacts={artist.contacts} />
      </Stack>
    </Container>
  );
}
