import { useMemo } from "react";
import { useAppSelector } from "../services/store";

const useActivePlayer = () => {
  const { creator, player } = useAppSelector((state) => state.players);

  const { activePlayer, nonActivePlayer } = useMemo(() => {
    if (!creator || !player) {
      return { activePlayer: null, nonActivePlayer: null };
    }

    return creator.isActive
      ? { activePlayer: creator, nonActivePlayer: player }
      : { activePlayer: player, nonActivePlayer: creator };
  }, [creator, player]);

  return {
    activePlayer,
    nonActivePlayer,
  };
};

export default useActivePlayer;
