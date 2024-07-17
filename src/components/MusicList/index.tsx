import React, { useCallback } from "react";
import { FiDownload } from "react-icons/fi";
import { usePlayer } from "../../hooks/Player";
import { formatAudioDuration } from "../../utils/formatAudioDuration";
import IMusic from "../../types/IMusic";
import { Box, IconButton, List, ListItem, Text } from "@chakra-ui/react";

interface MusicListProps {
  musics: IMusic[];
  hideViews?: boolean;
  compact?: boolean;
}

const MusicList: React.FC<MusicListProps> = (props) => {
  const { musics, compact } = props;
  const { addToTrack } = usePlayer();

  const handleDownload = useCallback(
    async (
      slug: string,
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.stopPropagation();
      const url = `${slug}?response-content-disposition=attachment`;
      window.open(url, "_blank");
    },
    []
  );

  return (
    <List>
      {musics?.map((music) => (
        <ListItem
          key={`music-list-item-${music.id}`}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          fontSize="1rem"
          cursor="pointer"
          data-group
          onClick={() => addToTrack(music)}
          p={compact ? 1 : 2}
          _notLast={{
            borderBottomWidth: 1,
            borderBottomColor: "whiteAlpha.200",
          }}
          _hover={{
            bg: "whiteAlpha.50",
          }}
        >
          <Box flex={1} mr={2}>
            <Text noOfLines={1} fontSize="sm">
              {music.name.replace(".mp3", "")}
            </Text>
          </Box>

          <IconButton
            aria-label="Baixar faixa"
            variant="ghost"
            colorScheme="gray"
            visibility={["visible", "hidden"]}
            _groupHover={{ visibility: "visible" }}
            size="sm"
            icon={<FiDownload size={22} />}
            className="download-music"
            onClick={(e) => handleDownload(music.audioUrl, e)}
            mr={4}
          />
          <Text color="gray.500">{formatAudioDuration(music.duration)}</Text>
        </ListItem>
      ))}
    </List>
  );
};

export default MusicList;
