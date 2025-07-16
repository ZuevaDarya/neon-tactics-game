import { useMemo } from "react";
import { useAppSelector } from "../services/store";

const useRoomStatus = () => {
  const { id } = useAppSelector((state) => state.room);
  const { creator, player } = useAppSelector((state) => state.players);

  return useMemo(() => {
    const isRoomExist = !!id;
    const isPlayersJoined = !!creator && !!player;

    return {
      isWaiting: isRoomExist && !isPlayersJoined,
      isPlayersJoined,
      isRoomExist,
      isReadyToStart: isRoomExist && isPlayersJoined,
    };
  }, [id, creator, player]);
};

export default useRoomStatus;
