import { useCallback, useEffect, useRef, useState } from "react";

type TUseSoundEffectProps = {
  pathToAudio: string;
  volume?: number;
  loop?: boolean;
};

const useSoundEffect = ({ pathToAudio, volume = 1, loop = false }: TUseSoundEffectProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(pathToAudio);
    audioRef.current = audio;
    audio.volume = volume;
    audio.loop = loop;

    const handleCanPlay = () => {
      setIsLoaded(true);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    const handleError = () => {
      console.error(`Ошибка загрузки звука: ${pathToAudio}`);
      setIsLoaded(false);
    };

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    audio.load();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.removeEventListener("canplay", handleCanPlay);
        audioRef.current.removeEventListener("play", handlePlay);
        audioRef.current.removeEventListener("pause", handlePause);
        audioRef.current.removeEventListener("ended", handleEnded);
        audioRef.current.removeEventListener("error", handleError);
        audioRef.current = null;
      }
    };
  }, [pathToAudio]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = loop;
    }
  }, [loop]);

  const play = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio) {
      console.warn("Аудио элемент не инициализирован");
      return false;
    }

    try {
      audio.currentTime = 0;
      await audio.play();

      return true;
    } catch (error) {
      console.error("Ошибка воспроизведения звукового эффекта:", error);
      return false;
    }
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) {
      console.warn("Sound not created");
      return;
    }

    audio.pause();
    audio.currentTime = 0;
  }, []);

  return {
    play,
    stop,
    isPlaying,
    isLoaded,
  };
};

export default useSoundEffect;
