import { useEffect, useMemo } from "react";
import { socketApi } from "../api/socket-api";

const useSocket = (autoConnect: boolean = true) => {
  const socket = useMemo(() => socketApi, []);

  useEffect(() => {
    if (!autoConnect) return;

    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [socket, autoConnect]);

  return {
    socket,
  };
};

export default useSocket;
