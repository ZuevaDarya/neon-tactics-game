import { useMemo } from "react";
import { useAppSelector } from "../services/store";

const useActivePlayer = () => {
  const { creator, player } = useAppSelector((state) => state.players);
  const { winnerId } = useAppSelector((state) => state.game);

  const winner = useMemo(() => {
    if (!winnerId || !creator || !player) return null;

    return winnerId === creator.id ? creator : player;
  }, [winnerId, creator, player]);

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
    winner,
  };
};

export default useActivePlayer;
