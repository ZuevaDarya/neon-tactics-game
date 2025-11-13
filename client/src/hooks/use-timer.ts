import { useEffect, useRef, useState } from "react";

type TUseTimerProps = {
  durationS: number;
};

const useTimer = ({ durationS }: TUseTimerProps) => {
  const [active, setActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0); // 0 до 1
  const startTimeRef = useRef<number>(0);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    if (active) {
      startTimeRef.current = Date.now() - progress * durationS * 1000;

      const animate = () => {
        const currentTime = Date.now();
        const elapsedMs = currentTime - startTimeRef.current;
        const elapsedS = elapsedMs / 1000;

        const newProgress = Math.min(elapsedS / durationS, 1);
        setProgress(newProgress);

        if (newProgress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setActive(false);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [active, durationS]);

  const start = () => {
    if (progress >= 1) {
      setProgress(0);
    }
    setIsPaused(false);
    setActive(true);
  };

  const reset = () => {
    setProgress(0);
    setActive(false);
    setIsPaused(false);
  };

  const pause = () => {
    setActive(false);
    setIsPaused(true);
  };

  const resume = () => {
    setIsPaused(false);
    setActive(true);
  };

  const remainingTime = Math.ceil(durationS * (1 - progress));
  const elapsedTime = Math.floor(durationS * progress);

  return {
    start,
    pause,
    reset,
    resume,
    progress,
    remainingTime,
    elapsedTime,
    isRunning: active,
    isCompleted: progress >= 1,
    isPaused,
  };
};

export default useTimer;
