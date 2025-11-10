import { useEffect, useMemo, useRef, useState } from "react";
import { StorageKey } from "../constants/storage-keys";
import { useAppSelector } from "../services/store";
import useActivePlayer from "./use-active-player";

type TUseGameEndAnimationParam = {
  durationMs: number;
};

const useGameEndAnimation = ({ durationMs }: TUseGameEndAnimationParam) => {
  const [isAnimationStart, setIsAnimationStart] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { endType } = useAppSelector((state) => state.game);
  const { winner } = useActivePlayer();

  const hasAnimationPlayed = sessionStorage.getItem(StorageKey.HasAnimationPlayed) === "true";

  const isGameEnd = useMemo(() => Boolean(endType || winner), [endType, winner]);

  useEffect(() => {
    if (isGameEnd && !hasAnimationPlayed) {
      setIsAnimationStart(true);
      sessionStorage.setItem(StorageKey.IsWinnerModalOpen, String(false));

      timerRef.current = setTimeout(() => {
        setIsAnimationStart(false);
        sessionStorage.setItem(StorageKey.IsWinnerModalOpen, String(true));
        sessionStorage.setItem(StorageKey.HasAnimationPlayed, String(true));
      }, durationMs);
    }

    return () => clearTimer();
  }, [isGameEnd, durationMs, hasAnimationPlayed, isAnimationStart]);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return {
    isAnimationStart,
    isGameEnd,
    isWinnerModalOpen: sessionStorage.getItem(StorageKey.IsWinnerModalOpen) === "true",
  };
};

export default useGameEndAnimation;
