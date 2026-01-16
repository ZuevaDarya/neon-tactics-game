import { useCallback, useEffect, useRef, useState } from "react";
import { StorageKey } from "../constants/storage-keys";

type TUseBackgroundMusicProps = {
  arrOfAudioPaths: string[];
  autoPlay?: boolean;
  volume?: number;
  loop?: boolean;
};

const useBackgroundMusic = ({
  arrOfAudioPaths,
  autoPlay = false,
  volume = 1,
  loop = false,
}: TUseBackgroundMusicProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(() => {
    const saved = sessionStorage.getItem(StorageKey.IsSoundOn);
    return saved !== null ? saved === "true" : autoPlay;
  });

  const [isAudioBlocked, setIsAudioBlocked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAudioReady, setIsAudioReady] = useState<boolean>(false);

  const [currentTrackIdx, setCurrentTrackIdx] = useState(() =>
    Math.floor(Math.random() * arrOfAudioPaths.length)
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (arrOfAudioPaths.length === 0) return;

    const audio = new Audio();
    audioRef.current = audio;
    audio.volume = volume;
    audio.loop = loop;

    const handleCanPlay = () => {
      console.log("Аудио элемент готов");
      setIsAudioReady(true);
    };

    const handlePlay = () => {
      console.log("Музыка начала играть");
      setIsPlaying(true);
      setIsAudioBlocked(false);
      sessionStorage.setItem(StorageKey.IsSoundOn, "true");
    };

    const handlePause = () => {
      console.log("Музыка остановлена");
      setIsPlaying(false);
    };

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("canplay", handleCanPlay);
        audioRef.current.removeEventListener("play", handlePlay);
        audioRef.current.removeEventListener("pause", handlePause);
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
      setIsAudioReady(false);
    };
  }, []);

  // Загрузка и воспроизведение текущего трека
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || arrOfAudioPaths.length === 0 || !arrOfAudioPaths[currentTrackIdx]) {
      return;
    }

    setIsLoading(true);

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handleEnded = () => {
      console.log("Трек закончился");
      setIsPlaying(false);

      if (loop) {
        audio.currentTime = 0;

        if (sessionStorage.getItem(StorageKey.IsSoundOn) === "true") {
          audio.play().catch(() => {
            setIsAudioBlocked(true);
          });
        }
      } else {
        setCurrentTrackIdx((prev) => (prev + 1) % arrOfAudioPaths.length);
      }
    };

    const handleError = () => {
      setIsLoading(false);
      console.error(`Ошибка загрузки: ${arrOfAudioPaths[currentTrackIdx]}`);
      setCurrentTrackIdx((prev) => (prev + 1) % arrOfAudioPaths.length);
    };

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    audio.src = arrOfAudioPaths[currentTrackIdx];
    audio.load();

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [currentTrackIdx, arrOfAudioPaths, loop]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isAudioReady || arrOfAudioPaths.length === 0) return;

    // Только для ручного переключения (не для автовоспроизведения)
    if (isPlaying && audio.paused) {
      console.log("Ручное воспроизведение...");
      audio.play().catch((error) => {
        console.log("Воспроизведение заблокировано:", error);
        setIsAudioBlocked(true);
      });
    }
  }, [isPlaying, isAudioReady, arrOfAudioPaths.length]);

  // Разблокировка аудио при взаимодействии пользователя
  useEffect(() => {
    const handleUserInteraction = () => {
      if (isAudioBlocked && audioRef.current) {
        const shouldPlay = sessionStorage.getItem(StorageKey.IsSoundOn) === "true";

        if (shouldPlay) {
          console.log("Попытка разблокировки после взаимодействия...");
          audioRef.current
            .play()
            .then(() => {
              setIsPlaying(true);
              setIsAudioBlocked(false);
            })
            .catch((error) => {
              console.log("Аудио все еще заблокировано:", error);
            });
        }
      }
    };

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);
    document.addEventListener("touchstart", handleUserInteraction);
    document.addEventListener("touchend", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
      document.removeEventListener("touchend", handleUserInteraction);
    };
  }, [isAudioBlocked]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume));
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = loop;
    }
  }, [loop]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || arrOfAudioPaths.length === 0) return;

    if (isPlaying) {
      console.log("off");
      audio.pause();
      setIsPlaying(false);
      sessionStorage.setItem(StorageKey.IsSoundOn, "false");
      console.log("Звук выключен");
    } else {
      sessionStorage.setItem(StorageKey.IsSoundOn, "true");
      setIsPlaying(true);

      audio
        .play()
        .then(() => {})
        .catch((error) => {
          console.error("Ошибка воспроизведения:", error);
          setIsAudioBlocked(true);
          setIsPlaying(false);
        });
    }
  }, [isPlaying, arrOfAudioPaths.length]);

  return {
    audioRef,
    isPlaying,
    isAudioBlocked,
    isLoading,
    togglePlay,
    currentTrackFile: arrOfAudioPaths[currentTrackIdx] || "",
    trackCount: arrOfAudioPaths.length,
    currentTrackNumber: currentTrackIdx + 1,
  };
};

export default useBackgroundMusic;
