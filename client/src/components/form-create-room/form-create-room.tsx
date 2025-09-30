import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AppRoute } from "../../constants/app-route";
import { StartFormInputName } from "../../constants/input-name";
import { RoomStatus } from "../../constants/room-status";
import useCopy from "../../hooks/use-copy";
import useRoomStatus from "../../hooks/use-room-status";
import mx from "../../mixins.module.css";
import { redirectPlayers } from "../../services/slices/socket-slice";
import { useAppDispatch, useAppSelector } from "../../services/store";
import {
  assignRandomPieceType,
  createGame,
  createPlayerWithCreateRoom,
  deletePlayer,
  deleteRoom,
  selectActivePlayer,
  updateRoomStatus,
} from "../../services/thunks";
import { TStartForm } from "../../types/components-types";
import cn from "../../utils/functions/cn";
import translateError from "../../utils/functions/translate-error";
import Button from "../button/button";
import CopyItem from "../copy-item/copy-item";
import FormItem from "../form-item/form-item";
import FormSection from "../form-section/form-section";
import Form from "../form/form";
import st from "../form/form.module.css";
import WaitingBlock from "../waiting-block/waiting-block";

function FormCreateRoom() {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState, setValue, watch } = useForm<TStartForm>();
  const { id, status, playerId, creatorId, error } = useAppSelector((state) => state.room);
  const { creator, player } = useAppSelector((state) => state.players);
  const { isWaiting, isPlayersJoined } = useRoomStatus();
  const { isCopied, copyToClipboard } = useCopy();
  const roomIdValue = watch(StartFormInputName.RoomId);

  useEffect(() => {
    setValue(StartFormInputName.RoomId, id || "");
  }, [id, setValue]);

  useEffect(() => {
    setValue(StartFormInputName.Player, creator?.name || "");
  }, [creator, setValue]);

  const onSubmit: SubmitHandler<TStartForm> = async (data) => {
    await dispatch(createPlayerWithCreateRoom({ name: data.player })).unwrap();
  };

  const handleStartBtnClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    if (id) {
      dispatch(redirectPlayers({ roomId: id, url: AppRoute.GamePage }));
      await dispatch(createGame({ id })).unwrap();
      await dispatch(updateRoomStatus({ id, status: "playing" })).unwrap();

      await dispatch(assignRandomPieceType({ id })).unwrap();
      await dispatch(selectActivePlayer({ id })).unwrap();
    }
  };

  const handleStopBtnClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();

    if (id && creatorId) {
      await dispatch(deleteRoom({ id })).unwrap();
      await dispatch(deletePlayer({ id: creatorId })).unwrap();
    }
  };

  const handleCopyBtnClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();

    if (roomIdValue) {
      await copyToClipboard(roomIdValue);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2 className={cn(st["form__title"], mx["responsiveFont"])}>Инициализация сессии</h2>
      <FormSection title="Введите имя игрока">
        <FormItem<TStartForm>
          label="Имя игрока"
          name={StartFormInputName.Player}
          placeholder="игрок1"
          type="text"
          register={register}
          required
          variant={isWaiting ? "cyanDisabled" : "cyan"}
          disabled={isWaiting}
        />

        <CopyItem>
          <FormItem<TStartForm>
            label="Номер комнаты"
            name={StartFormInputName.RoomId}
            type="text"
            register={register}
            variant="cyanDisabled"
            disabled
          />
          <Button
            variant={isCopied ? "checkCyan" : "copyCyan"}
            type="button"
            onClick={handleCopyBtnClick}
          />
        </CopyItem>
        {formState.errors.player && (
          <span className={st["form__error"]}>Заполните обязательные поля</span>
        )}
        {status !== RoomStatus.Waiting && (
          <Button
            type="submit"
            variant={isWaiting ? "default" : "cyan"}
            disabled={isWaiting}
            className={st["form__button"]}
          >
            Создать
          </Button>
        )}
      </FormSection>

      {status === RoomStatus.Waiting && !playerId && (
        <WaitingBlock text="Ожидание подключения второго игрока">
          <Button type="button" variant="closedCyan" onClick={handleStopBtnClick}></Button>
        </WaitingBlock>
      )}
      {error && (
        <span className={cn(st["form__message"], st["form__message--mb-10"], mx["responsiveFont"])}>
          {translateError(error)}
        </span>
      )}

      {id && player && (
        <p className={cn(st["form__message"], st["form__message--mb-10"], mx["responsiveFont"])}>
          Игрок <span className={st["form__message--acent-cyan"]}>{player.name}</span> присоединился
          к комнате
        </p>
      )}
      {isPlayersJoined && (
        <Button type="button" variant="cyan" onClick={handleStartBtnClick}>
          Начать игру
        </Button>
      )}
    </Form>
  );
}

export default FormCreateRoom;
