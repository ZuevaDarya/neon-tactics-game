import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../services/store";
import { changeActiveStatus } from "../services/thunks";
import { TPlayer } from "../types/services-types";

const useActivePlayer = () => {
  const dispatch = useAppDispatch();
  const { creator, player } = useAppSelector((state) => state.players);
  const [activePlayer, setActivePlayer] = useState<TPlayer | null>(null);
  const [nonActivePlayer, setNonActivePlayer] = useState<TPlayer | null>(null);

  useEffect(() => {
    if (creator && player) {
      if (creator.isAcive) {
        setActivePlayer(creator);
        setNonActivePlayer(player);
      } else {
        setActivePlayer(player);
        setNonActivePlayer(creator);
      }
    }
  }, [creator, player]);

  const changeActivePlayer = async () => {
    if (activePlayer && nonActivePlayer) {
      await dispatch(changeActiveStatus({ id: activePlayer.playerId, isActive: false })).unwrap();
      await dispatch(changeActiveStatus({ id: nonActivePlayer.playerId, isActive: true })).unwrap();
    }
  };

  return {
    activePlayer,
    setActivePlayer,
    nonActivePlayer,
    setNonActivePlayer,
    changeActivePlayer,
  };
};

export default useActivePlayer;
