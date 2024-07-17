import React from "react";
import { Box, Button, Center, Flex, Text, VStack } from "@chakra-ui/react";
import { FiMusic } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import { useForm, useFormState } from "react-final-form";
import { Song, SingleFileUploadWithProgress } from "../SingleSong";

import api from "../../../services/api";

async function getAudioDuration(file) {
  const audio = new Audio();
  audio.src = URL.createObjectURL(file);

  return new Promise((resolve) => {
    audio.addEventListener("loadedmetadata", () => {
      const duration = audio.duration;
      resolve(duration);
    });
  });
}

export function StepThree() {
  const { values, submitting } = useFormState();
  const { submit } = useForm();

  const [songs, setSongs] = React.useState<Song[]>(
    values.songs?.map((song: any) => ({
      id: song.id,
      url: song.audioUrl,
      name: song.name,
      size: song.size,
      duration: song.duration,
      uploaded: true,
    })) || []
  );

  const onDrop = React.useCallback(async (accFiles: File[]) => {
    let songsToUpload = [];

    for await (const file of accFiles) {
      const duration = await getAudioDuration(file);
      songsToUpload.push({
        file,
        uploaded: false,
        name: file.name,
        size: file.size,
        duration: Math.round(Number(duration)),
      });
    }

    // sort by name
    songsToUpload = songsToUpload.sort((a, b) => a.name.localeCompare(b.name));

    setSongs((curr) => [...curr, ...songsToUpload]);
  }, []);

  function onUpload(file: File, created: any) {
    setSongs((curr) =>
      curr.map((music) =>
        music.file === file
          ? {
              ...music,
              id: created.id,
              url: created.audioUrl,
              uploaded: true,
            }
          : music
      )
    );
  }

  async function onDelete(id: string) {
    setSongs((curr) => curr.filter((fw) => fw.id !== id));
    await api.delete(`/create-album/create-music/${id}`);
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,
    onDropAccepted: onDrop,
  });

  return (
    <Box w="container.lg">
      <Center
        bg={isDragActive ? "#0c324a" : "gray.700"}
        borderRadius="md"
        borderWidth={3}
        borderColor="whiteAlpha.200"
        borderStyle="dashed"
        flexDir="column"
        p={4}
        h="160px"
        cursor="pointer"
        pos="relative"
        {...getRootProps()}
      >
        {isDragActive ? (
          <Text color="whiteAlpha.900" fontSize="lg">
            Solte os arquivos aqui
          </Text>
        ) : (
          <>
            <FiMusic size={32} />

            <Text fontSize="md" color="whiteAlpha.500" mt={4}>
              Clique ou arraste os arquivos aqui
            </Text>
          </>
        )}
        <input {...getInputProps()} />
      </Center>

      <Text mt={8}>Músicas enviadas ({songs.length})</Text>

      <VStack mt={8} spacing={4} w="full">
        {songs.map((song, index) => (
          <SingleFileUploadWithProgress
            key={song.name}
            index={index}
            onDelete={onDelete}
            onUpload={onUpload}
            albumId={values.id}
            song={song}
          />
        ))}
      </VStack>

      <Flex justifyContent="flex-end" gap={4}>
        <Button
          onClick={submit}
          mt={6}
          isDisabled={!values.name || submitting}
          isLoading={submitting}
        >
          Publicar
        </Button>
      </Flex>
    </Box>
  );
}
