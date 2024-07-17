import React, { useCallback } from "react";
import {
  Avatar,
  Button,
  Heading,
  HStack,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import MusicList from "../../../src/components/MusicList";
import IMusic from "../../types/IMusic";
import Link from "next/link";
import api from "../../services/api";
import { FiDownload, FiPlayCircle } from "react-icons/fi";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { AlbumHeader, AlbumMusics } from "./styles";
import { usePlayer } from "../../hooks/Player";
import { useAuth } from "@clerk/nextjs";

interface Album {
  id: number;
  cover: string;
  slug: string;
  name: string;
  songs: IMusic[];
  isFavorite: boolean;
  author: {
    id: number;
    slug: string;
    name: string;
    avatar: string;
  };
}

interface SingleAlbumProps {
  album: Album;
}

const SingleAlbum = (props: SingleAlbumProps) => {
  const [isFavorite, setIsFavorite] = React.useState(props.album.isFavorite);
  const { addToTrack } = usePlayer();
  const { album } = props;
  const { isSignedIn } = useAuth();

  const handleDownload = useCallback(async (slug: string) => {
    window.location.href = `https://s3.us-east-1.wasabisys.com/somnotalo/albums/${slug}.zip?request-content-type="application/force-download"`;
  }, []);

  const handlePlayAlbum = useCallback(() => {
    addToTrack(album.songs);
  }, [album]);

  const handleFavoriteAlbum = useCallback(
    async (id: number, alreadyFavorited: boolean) => {
      try {
        setIsFavorite(!alreadyFavorited);
        const response = await api.post(`/favorites/${id}`);

        setIsFavorite(response.data.favorited);
      } catch (error) {
        alert("Erro ao favoritar o álbum");
      }
    },
    []
  );

  return (
    <div id="single-album">
      <AlbumHeader cover={album?.cover}>
        <div className="album-cover">
          <img src={album?.cover} alt="" />
        </div>
        <div className="album-info">
          <Heading>{album?.name}</Heading>
          <HStack spacing={2} mt={2}>
            <Avatar
              size="xs"
              src={album?.author.avatar || "/default-artist-avatar.png"}
            />
            <Link href={`/artistas/${album?.author.slug}`}>
              {album?.author.name}
            </Link>
          </HStack>
          <HStack mt={8} spacing={3}>
            <Button
              variant="solid"
              leftIcon={<FiPlayCircle size={20} />}
              onClick={handlePlayAlbum}
            >
              Reproduzir
            </Button>
            <Tooltip label="Baixar CD">
              <IconButton
                aria-label="Baixar"
                variant="outline"
                onClick={() => handleDownload(album?.slug)}
              >
                <FiDownload size={20} />
              </IconButton>
            </Tooltip>

            {isSignedIn && (
              <Tooltip label="Favoritar CD">
                <IconButton
                  colorScheme="red"
                  aria-label="Favoritar CD"
                  variant={isFavorite ? "solid" : "outline"}
                  onClick={() => handleFavoriteAlbum(album?.id, isFavorite)}
                >
                  {isFavorite ? (
                    <MdFavorite size={20} />
                  ) : (
                    <MdFavoriteBorder size={20} />
                  )}
                </IconButton>
              </Tooltip>
            )}
          </HStack>
        </div>
      </AlbumHeader>

      {album !== null && (
        <AlbumMusics>
          <MusicList musics={album.songs} hideViews />
        </AlbumMusics>
      )}
    </div>
  );
};

export default SingleAlbum;
