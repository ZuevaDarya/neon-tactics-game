import { useMemo } from "react";
import { useAppSelector } from "../services/store";

const useRoomStatus = () => {
  const { id, status } = useAppSelector((state) => state.room);
  const { creator, player } = useAppSelector((state) => state.players);

  return useMemo(() => {
    const isRoomExist = !!id;
    const isPlayersJoined = !!creator && !!player;
    const isGameNotExist = status === null || (!creator && !player);

    return {
      isWaiting: isRoomExist && !isPlayersJoined,
      isPlayersJoined,
      isRoomExist,
      isReadyToStart: isRoomExist && isPlayersJoined,
      isGameNotExist,
    };
  }, [id, creator, player, status]);
};

export default useRoomStatus;
