import { useMemo } from "react";
import { StorageKey } from "../constants/storage-keys";
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

  const isCurrentDevicePlayer = useMemo(
    () => activePlayer?.id === sessionStorage.getItem(StorageKey.PlayerId),
    [activePlayer]
  );

  const currentPlayerId = useMemo(() => sessionStorage.getItem(StorageKey.PlayerId), []);

  return {
    activePlayer,
    nonActivePlayer,
    winner,
    isCurrentDevicePlayer,
    currentPlayerId,
  };
};

export default useActivePlayer;
