import { useEffect, useState } from "react";
import { useAppSelector } from "../services/store";

const useRoomStatus = () => {
  const { roomId } = useAppSelector((state) => state.room);
  const { creator, player } = useAppSelector((state) => state.players);

  const [isWaiting, setIsWaiting] = useState<boolean>(true);
  const [isPlayersJoined, setIsPlayersJoined] = useState<boolean>(false);

  useEffect(() => {
    setIsWaiting(!!roomId);
  }, [roomId]);

  useEffect(() => {
    setIsPlayersJoined(!!creator && !!player);
  }, [creator, player]);

  return {
    isWaiting,
    isPlayersJoined,
  };
};

export default useRoomStatus;
