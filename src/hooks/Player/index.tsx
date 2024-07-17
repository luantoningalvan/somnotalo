import React, { createContext, useState, useContext, useCallback } from "react";
import IMusic from "../../types/IMusic";

interface PlayerContextData {
  currentMusic: IMusic;
  previousMusic: IMusic;
  queue: IMusic[];
  addToTrack: any;
  //currentIndex: any;
  //setCurrentIndex: any;
  handleNext: any;
  handlePrevious: any;
  //handleSelectTrack: any;
  handleClearQueue: () => void;
}

const PlayerContext = createContext<PlayerContextData>({} as PlayerContextData);

export const PlayerProvider = ({ children }) => {
  const [queue, setQueue] = useState<IMusic[]>([]);
  const [previousQueue, setPreviousQueue] = useState([]);

  const currentMusic = React.useMemo(() => queue[0], [queue[0], queue]);
  const previousMusic = React.useMemo(
    () => previousQueue[0],
    [previousQueue[0], previousQueue]
  );

  const addToTrack = useCallback((music: any | any[]) => {
    if (!Array.isArray(music)) {
      setQueue((current) => {
        // se uma musica individual for adicionada e for igual a que está tocando, restarta musica mas não adiciona novamente
        // isso impede que se clicar varias vezes crie uma listagem gigante com a mesma musica
        if (music.id === current?.[0]?.id) {
          return [...current];
        }

        if (current.length > 0) {
          const firstMusic = current.shift();

          setPreviousQueue((previous) => [firstMusic, ...previous]);
        }
        return [music, ...current.filter((msc) => msc.id !== music.id)];
      });
    } else {
      setQueue((current) => [
        ...music,
        ...current.filter((msc) => music.includes(msc.id)),
      ]);
      setPreviousQueue([]);
    }
  }, []);

  const handleNext = useCallback(() => {
    setQueue((state) => {
      if (state.length > 0) {
        const firstMusic = state.shift();

        setPreviousQueue((previous) => [firstMusic, ...previous]);

        return state;
      }
      return state;
    });
  }, [setPreviousQueue, setQueue]);

  const handlePrevious = useCallback(() => {
    // if (currentIndex.index !== 0) {
    //   setCurrentIndex({
    //     id: queue[currentIndex.index - 1].id,
    //     index: currentIndex.index - 1,
    //   });
    // }

    if (previousQueue.length > 0) {
      setPreviousQueue((previous) => {
        const firstMusic = previous.shift();

        setQueue((current) => [firstMusic, ...current]);

        return previous;
      });
    }
  }, [queue, currentMusic]);

  // const handleSelectTrack = useCallback(
  //   (index) => {
  //     setCurrentIndex({
  //       id: queue[index].id,
  //       index: index,
  //     });
  //   },
  //   [queue]
  // );

  const handleClearQueue = useCallback(() => {
    setQueue([]);
    setPreviousQueue([]);
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        currentMusic,
        previousMusic,
        queue,
        addToTrack,
        handleNext,
        handlePrevious,
        //handleSelectTrack,
        handleClearQueue,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export function usePlayer() {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error("usePlayer most be used within an PlayerProvider");
  }

  return context;
}
