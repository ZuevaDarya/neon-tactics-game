import { useEffect, useMemo, useRef, useState } from "react";
import { TProgressBarMode } from "../types/components-types";

type TUseProgressProps = {
  durationS: number;
  mode?: TProgressBarMode;
  remainingMs?: number;
  syncUpdateInterval?: number;
};

const useProgress = ({
  durationS,
  mode = "local",
  remainingMs,
  syncUpdateInterval = 100,
}: TUseProgressProps) => {
  const [progress, setProgress] = useState<number>(0); // 0 до 1
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const startTimeRef = useRef<number>(0);
  const animationRef = useRef<number>(0);
  const intervalRef = useRef<number>(0);
  const lastRemainingMsRef = useRef<number | undefined>(remainingMs);

  useEffect(() => {
    lastRemainingMsRef.current = remainingMs;
  }, [remainingMs]);

  useEffect(() => {
    if (mode !== "sync" || !durationS || durationS <= 0) {
      return;
    }

    const totalDurationMs = durationS * 1000;

    const updateProgress = () => {
      const currentRemainingMs = lastRemainingMsRef.current;

      if (currentRemainingMs === undefined) {
        setProgress(0);
        setIsActive(false);
        return;
      }

      if (currentRemainingMs <= 0) {
        setProgress(1);
        setIsActive(false);
        return;
      }

      const elapsedMs = totalDurationMs - currentRemainingMs;
      const newProgress = Math.min(Math.max(elapsedMs / totalDurationMs, 0), 1);

      setProgress(newProgress);
      setIsActive(newProgress < 1 && newProgress > 0);
    };

    updateProgress();

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(updateProgress, syncUpdateInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = 0;
      }
    };
  }, [mode, durationS, remainingMs, syncUpdateInterval]);

  useEffect(() => {
    if (mode !== "local" || !isActive || !durationS || durationS <= 0) {
      return;
    }

    startTimeRef.current = Date.now() - progress * durationS * 1000;

    const animateLocal = () => {
      const currentTime = Date.now();
      const elapsedMs = currentTime - startTimeRef.current;
      const elapsedS = elapsedMs / 1000;

      const newProgress = Math.min(elapsedS / durationS, 1);
      setProgress(newProgress);

      if (newProgress < 1) {
        animationRef.current = requestAnimationFrame(animateLocal);
      } else {
        setIsActive(false);
      }
    };

    animationRef.current = requestAnimationFrame(animateLocal);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mode, isActive, durationS, progress]);

  const start = () => {
    if (mode !== "local") {
      console.warn("Метод start() доступен только в режиме local");
      return;
    }

    if (progress >= 1) {
      setProgress(0);
    }
    setIsPaused(false);
    setIsActive(true);
  };

  const reset = () => {
    setProgress(0);
    setIsActive(false);
    setIsPaused(false);
  };

  const pause = () => {
    if (mode !== "local") {
      console.warn("Метод pause() доступен только в режиме local");
      return;
    }

    setIsActive(false);
    setIsPaused(true);
  };

  const resume = () => {
    if (mode !== "local") {
      console.warn("Метод resume() доступен только в режиме local");
      return;
    }

    setIsPaused(false);
    setIsActive(true);
  };

  const remainingTime = Math.ceil(durationS * (1 - progress));
  const elapsedTime = Math.floor(durationS * progress);
  const progressPercent = useMemo(() => progress * 100, [progress]);
  const isCompleted = progress >= 1;

  return {
    start,
    pause,
    reset,
    resume,
    progress,
    progressPercent,
    remainingTime,
    elapsedTime,
    isRunning: isActive,
    isCompleted,
    isPaused: mode === "local" ? isPaused : false,
  };
};

export default useProgress;
