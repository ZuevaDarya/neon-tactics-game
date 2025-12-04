import { useCallback, useEffect, useRef, useState } from "react";

type TUseTurnTimerProps = {
  serverDeadline?: number;
  onExpired?: () => void;
};

const useTurnTimer = ({ serverDeadline, onExpired }: TUseTurnTimerProps) => {
  const [remainingMs, setRemainingMs] = useState<number>(0);
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  const formatTime = useCallback((ms: number) => {
    if (ms <= 0) return "00:00";

    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, []);

  useEffect(() => {
    if (!serverDeadline) {
      setRemainingMs(0);
      setIsExpired(false);
      return;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const updateTimer = () => {
      const now = Date.now();
      const remaining = serverDeadline - now;

      if (remaining > 0) {
        setRemainingMs(remaining);
        setIsExpired(false);
      } else {
        setRemainingMs(0);
        setIsExpired(true);

        if (onExpired) {
          onExpired();
        }

        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    };

    updateTimer();

    if (serverDeadline > Date.now()) {
      intervalRef.current = window.setInterval(updateTimer, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [serverDeadline]);

  return {
    remainingMs,
    remainingFormatted: formatTime(remainingMs),
    isExpired,
    isActive: !!serverDeadline && remainingMs > 0,
  };
};

export default useTurnTimer;
