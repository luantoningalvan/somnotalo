import React, { useCallback, useState, useRef, useEffect } from "react";
import { QueueItem, QueueDivider } from "./style";
import {
  BiPlay,
  BiPause,
  BiSkipNext,
  BiSkipPrevious,
  BiVolumeFull,
  BiVolumeMute,
  BiListUl,
  BiTrashAlt,
} from "react-icons/bi";
import { usePlayer } from "../../hooks/Player";
import { memo } from "react";
import { BsMusicPlayer } from "react-icons/bs";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Image,
  Center,
  Text,
  Heading,
  Tooltip,
} from "@chakra-ui/react";

const PlayerComponent = ({ isMobile }: { isMobile: boolean }) => {
  const playerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);

  const [isEmpty, setIsEmpty] = useState(false);

  const [showQueue, setShowQueue] = useState<any | null>(null);
  const {
    currentMusic,
    previousMusic,
    queue,
    handleNext,
    handlePrevious,
    addToTrack,
    handleClearQueue,
  } = usePlayer();

  const handleToggleQueue = useCallback((event) => {
    setShowQueue((state) => !state);
  }, []);

  const handlePlay = useCallback(() => {
    playerRef.current.play();
  }, [playerRef]);

  const handlePause = useCallback(() => {
    playerRef.current.pause();
  }, [playerRef]);

  const muteVideo = useCallback(() => {
    if (playerRef.current.muted) {
      playerRef.current.muted = false;
      setIsMuted(false);
    } else {
      playerRef.current.muted = true;
      setIsMuted(true);
    }
  }, [playerRef]);

  const handleChangeMusicTime = useCallback((time: number) => {
    playerRef.current.currentTime = time;
  }, []);

  const handleVolumeChange = useCallback((volume: number) => {
    playerRef.current.volume = volume / 100;
    setVolume(volume);
  }, []);

  useEffect(() => {
    playerRef.current?.load();
    playerRef.current?.play();
  }, [queue, currentMusic]);

  useEffect(() => {
    if (queue.length > 0 && playerRef !== null) {
      playerRef.current.addEventListener("durationchange", () => {
        setDuration(playerRef.current.duration);
      });
      playerRef.current.addEventListener("timeupdate", () => {
        setProgress(playerRef.current.currentTime);
      });
      playerRef.current.addEventListener("ended", () => {
        handleNext();
      });
      playerRef.current.addEventListener("play", () => {
        setIsPlaying(true);
      });
      playerRef.current.addEventListener("pause", () => {
        setIsPlaying(false);
      });
    }
  }, [playerRef, queue]);

  useEffect(() => {
    if (typeof window !== "undefined" && "mediaSession" in window.navigator) {
      navigator.mediaSession.setActionHandler("play", handlePlay);
      navigator.mediaSession.setActionHandler("pause", handlePause);
      navigator.mediaSession.setActionHandler("seekbackward", handlePrevious);
      navigator.mediaSession.setActionHandler("seekforward", handleNext);
    }
  }, [global?.window]);

  useEffect(() => {
    if (!!queue.length) {
      const musicData = currentMusic;

      if (musicData) {
        navigator.mediaSession.metadata = new MediaMetadata({
          //@ts-ignore
          title: musicData.title,
          artist: musicData.artist.name,
          artwork: [
            {
              src: musicData.cover,
              sizes: "512x512",
              type: "image/jpeg",
            },
            {
              src: musicData.cover,
              sizes: "256x256",
              type: "image/jpeg",
            },
            {
              src: musicData.cover,
              sizes: "128x128",
              type: "image/jpeg",
            },
            { src: musicData.cover, sizes: "64x64", type: "image/jpeg" },
          ],
        });
      }
    }
  }, [queue, currentMusic]);

  useEffect(() => {
    if (queue.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [queue, currentMusic]);

  return (
    <Flex
      flex={1}
      h={16}
      alignItems="stretch"
      pos={["fixed", "relative"]}
      inset={["auto 0 0 0", "auto"]}
      bg="#191926"
      px={[2, 0]}
      borderColor="whiteAlpha.200"
      borderTopWidth={[1, 0]}
    >
      <audio ref={playerRef}>
        <source src={currentMusic?.audioUrl} type="audio/mpeg" />
      </audio>

      <Flex width={["full", "auto"]} flex={1} alignItems="center" gap={[2, 8]}>
        <HStack justify="center" spacing={2} flex={["auto", 1]}>
          {!isMobile && (
            <IconButton
              aria-label="Música anterior"
              isDisabled={isEmpty}
              onClick={handlePrevious}
              icon={<BiSkipPrevious size={28} />}
              borderRadius="full"
              variant="ghost"
              colorScheme="gray"
            />
          )}

          {isPlaying ? (
            <IconButton
              aria-label="Pausar"
              isDisabled={isEmpty}
              onClick={handlePause}
              icon={<BiPause size={28} />}
              borderRadius="full"
              bg="white"
              _hover={{ bg: "white", transform: "scale(1.1)" }}
            />
          ) : (
            <IconButton
              aria-label="Reproduzir"
              isDisabled={isEmpty}
              onClick={handlePlay}
              icon={<BiPlay size={28} />}
              borderRadius="full"
              bg="white"
              _hover={{ bg: "white", transform: "scale(1.1)" }}
            />
          )}

          <IconButton
            aria-label="Próxima música"
            isDisabled={isEmpty}
            onClick={handleNext}
            icon={<BiSkipNext size={28} />}
            borderRadius="full"
            variant="ghost"
            colorScheme="gray"
          />
        </HStack>

        <Flex
          borderWidth={1}
          borderColor="whiteAlpha.200"
          w="full"
          maxW="600px"
          borderRadius="sm"
          minW={0}
        >
          <Box
            h="52px"
            w="52px"
            bg="whiteAlpha.100"
            flexShrink={0}
            flexGrow={0}
            borderTopLeftRadius="sm"
            borderBottomLeftRadius="sm"
            whiteSpace="nowrap"
          >
            {!isEmpty ? (
              <Image src={currentMusic?.cover} alt="Capa Album" />
            ) : (
              <Center h="full" w="full">
                <BsMusicPlayer size={22} />
              </Center>
            )}
          </Box>

          {!isEmpty ? (
            <Flex flexDirection="column" flex={1} minW={0}>
              <Box px={2} py={3} flex={1} minW={0}>
                <Text
                  fontSize="xs"
                  lineHeight={1}
                  overflow="hidden"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                  display="block"
                  textAlign={["left", "center"]}
                >
                  {currentMusic?.name.replace(".mp3", "")}
                </Text>
                <Text
                  fontSize="xs"
                  lineHeight={1}
                  color="gray.500"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                  display="block"
                  textAlign={["left", "center"]}
                  mt={1}
                >
                  {currentMusic?.artist.name}
                </Text>
              </Box>

              <Slider
                p={0}
                aria-label="time-indicator"
                value={progress}
                min={0}
                focusThumbOnChange={false}
                max={duration}
                colorScheme="gray"
                size="md"
                onChange={(value) => {
                  handleChangeMusicTime(value as number);
                }}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
              </Slider>
            </Flex>
          ) : (
            <Center flex={1}>
              <Image
                h={7}
                src="/logo-without-text.png"
                alt="Logo Som no Talo"
              />
            </Center>
          )}
        </Flex>

        {!isMobile && (
          <Flex flex={1} justify="center" gap={2}>
            <IconButton
              variant="ghost"
              borderRadius="full"
              aria-label="Mutar"
              colorScheme="gray"
              size="sm"
              onClick={muteVideo}
              icon={
                !isMuted ? (
                  <BiVolumeFull size={20} />
                ) : (
                  <BiVolumeMute size={20} />
                )
              }
            />
            <Slider
              width="100px"
              colorScheme="gray"
              style={{ padding: 0 }}
              aria-label="time-indicator"
              value={isMuted ? 0 : volume}
              min={0}
              focusThumbOnChange={false}
              max={100}
              onChange={handleVolumeChange}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              {!isMobile && <SliderThumb />}
            </Slider>
          </Flex>
        )}

        <IconButton
          aria-label="Exibir lista de reprodução"
          onClick={handleToggleQueue}
          icon={<BiListUl size={20} />}
          borderRadius="full"
          variant="ghost"
          colorScheme="gray"
        />
      </Flex>

      {showQueue && (
        <Flex
          width="full"
          maxW={["full", "340px"]}
          height={["calc(90vh - 128px)", "calc(100vh - 64px)"]}
          backdropFilter="blur(60px)"
          top={["unset", "64px"]}
          bottom={["64px", "unset"]}
          right={0}
          pos="fixed"
          overflow="auto"
          bg="rgba(22, 22, 39, 0.8)"
          flexDir="column"
          borderLeftWidth={[0, 1]}
          borderLeftColor="whiteAlpha.200"
          borderTopLeftRadius={["lg", 0]}
          borderTopRightRadius={["lg", 0]}
          zIndex={2}
        >
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Heading size="sm" px={4} pt={4} pb={2}>
              Lista
            </Heading>
            {!isEmpty && (
              <Tooltip label="Limpar lista">
                <IconButton
                  aria-label="Limpar lista"
                  onClick={handleClearQueue}
                  icon={<BiTrashAlt size={18} />}
                  borderRadius="full"
                  variant="ghost"
                  colorScheme="gray"
                />
              </Tooltip>
            )}
          </Flex>
          <ul>
            {!!previousMusic && (
              <>
                <QueueDivider>
                  <legend>Música anterior</legend>
                </QueueDivider>
                <QueueItem
                  current={false}
                  onClick={() => addToTrack(previousMusic)}
                  key={previousMusic.id}
                  style={{ opacity: "60%" }}
                >
                  <img
                    src={previousMusic.cover}
                    alt="Capa Album"
                    className="music-cover"
                  />
                  <div>
                    <span className="music-name">{previousMusic.name}</span>
                    <span className="music-artist">
                      {previousMusic.artist.name}
                    </span>
                  </div>
                </QueueItem>
              </>
            )}
            {!!currentMusic && (
              <QueueDivider>
                <legend>Tocando agora</legend>
              </QueueDivider>
            )}
            {queue.map((music, index) => (
              <QueueItem
                current={index == 0}
                onClick={() => addToTrack(music)}
                key={music.id}
              >
                <img
                  src={music.cover}
                  alt="Capa Album"
                  className="music-cover"
                />
                <div>
                  <span className="music-name">{music.name}</span>
                  <span className="music-artist">{music.artist.name}</span>
                </div>
              </QueueItem>
            ))}
          </ul>
        </Flex>
      )}
    </Flex>
  );
};

export const Player = memo(PlayerComponent);
