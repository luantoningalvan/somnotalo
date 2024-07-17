import { useCallback, useEffect, useRef, useState } from "react";
import {
  FiCheckCircle,
  FiPause,
  FiPlay,
  FiSquare,
  FiTrash,
} from "react-icons/fi";
import { filesize } from "filesize";
import {
  Box,
  CircularProgress,
  Flex,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import api from "../../../services/api";
import { useFormState } from "react-final-form";
import { formatAudioDuration } from "../../../utils/formatAudioDuration";

export interface Song {
  file: File;
  id?: string;
  url?: string;
  name: string;
  size: number;
  duration?: number;
  uploaded: boolean;
}

export interface SingleFileUploadWithProgressProps {
  song: Song;
  albumId: string;
  index: number;
  onDelete: (id: string) => void;
  onUpload: (file: File, url: any) => void;
}

function uploadFile(
  file: File,
  duration,
  albumId,
  onProgress: (percentage: number) => void
) {
  return new Promise<string>(async (res, rej) => {
    const getUploadUrl = await api.post(`/create-album/upload-music`, {
      albumId: albumId,
      fileName: file.name,
      fileType: file.type,
      duration: duration,
    });

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", getUploadUrl.data.uploadUrl, true);
    xhr.onload = () => {
      res(file.name);
    };
    xhr.onerror = (evt) => rej(evt);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100;
        onProgress(Math.round(percentage));
      }
    };
    xhr.send(file);
  });
}

export function SingleFileUploadWithProgress(
  props: SingleFileUploadWithProgressProps
) {
  const { song, albumId, onDelete, onUpload } = props;

  const { values } = useFormState();

  const [progress, setProgress] = useState<number | "indeterminate">(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const playerRef = useRef<any>(null);

  const onPlay = useCallback(() => {
    document.querySelectorAll("audio").forEach((player) => {
      if (player !== playerRef.current) {
        player.pause();
      }
    });

    playerRef.current.currentTime = 0;
    setIsPlaying(true);
  }, [playerRef]);

  const onPause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleRemove = useCallback(() => {
    const confirmExclusion = window.confirm("Deseja realmente confirmar");
    if (confirmExclusion) {
      onDelete(song.id as string);
    }
  }, [song]);

  useEffect(() => {
    async function upload() {
      await uploadFile(
        song.file,
        Math.round(Number(song.duration)),
        values.id,
        setProgress
      );
      setProgress("indeterminate");
      const createMusic = await api.post("/create-album/create-music", {
        albumId,
        musicName: song.file.name,
        fileSize: song.file.size,
        musicDuration: Math.round(Number(song.duration)),
        position: props.index + 1,
      });

      onUpload(song.file, createMusic.data);
    }

    if (!song.id) {
      upload();
    }
  }, []);

  useEffect(() => {
    if (playerRef.current !== null) {
      playerRef.current?.addEventListener("ended", onPause);
      playerRef.current?.addEventListener("play", onPlay);
      playerRef.current?.addEventListener("pause", onPause);
    }
    return () => {
      if (!playerRef.current) return;
      playerRef.current?.removeEventListener("ended", onPause);
      playerRef.current?.removeEventListener("play", onPlay);
      playerRef.current?.removeEventListener("pause", onPause);
    };
  }, [playerRef.current]);

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      borderWidth={1}
      borderColor="whiteAlpha.200"
      bg="gray.700"
      borderRadius="md"
      px={4}
      py={2}
      w="full"
    >
      <Flex alignItems="center" gap={6}>
        {!song.uploaded ? (
          <CircularProgress
            size={22}
            isIndeterminate={progress === "indeterminate"}
            value={progress !== "indeterminate" ? progress : undefined}
            trackColor="gray.600"
            color="blue.500"
          />
        ) : (
          <FiCheckCircle size={22} color="#3bb33b" />
        )}
        <Box>
          <Text>{song.name}</Text>
          <Text fontSize="sm" color="gray.500">
            {song?.uploaded
              ? `${formatAudioDuration(song.duration)}min`
              : filesize(song.size)}
          </Text>
        </Box>
      </Flex>

      <div className="actions">
        {song.uploaded && (
          <>
            <audio ref={playerRef} preload="none">
              <source src={song.url} type="audio/mpeg" />
            </audio>

            <HStack spacing={2}>
              <IconButton
                aria-label="Remover"
                onClick={handleRemove}
                variant="ghost"
                colorScheme="red"
                icon={<FiTrash />}
              />

              {isPlaying ? (
                <IconButton
                  onClick={() => playerRef.current.pause()}
                  aria-label="Pausar"
                  icon={<FiSquare />}
                />
              ) : (
                <IconButton
                  onClick={() => playerRef.current.play()}
                  aria-label="Reproduzir"
                  icon={<FiPlay />}
                />
              )}
            </HStack>
          </>
        )}
      </div>
    </Flex>
  );
}
