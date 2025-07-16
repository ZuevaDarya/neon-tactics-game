import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AppRoute } from "../../constants/app-route";
import { StartFormInputName } from "../../constants/input-name";
import { RoomStatus } from "../../constants/room-status";
import useRoomStatus from "../../hooks/use-room-status";
import { startGame } from "../../services/slices/socket-slice";
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
import Button from "../button/button";
import FormItem from "../form-item/form-item";
import FormSection from "../form-section/form-section";
import Form from "../form/form";

function FormCreateRoom() {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState, setValue } = useForm<TStartForm>();
  const { id, status, playerId, creatorId } = useAppSelector((state) => state.room);
  const { creator, player } = useAppSelector((state) => state.players);
  const { isWaiting: isBtnDisabled, isPlayersJoined } = useRoomStatus();

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
      dispatch(startGame({ roomId: id, url: AppRoute.GamePage }));
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

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormSection title="Введите имя игрока" variant="ds_row">
        <FormItem<TStartForm>
          label="Игрок"
          name={StartFormInputName.Player}
          placeholder="игрок 1"
          type="text"
          register={register}
          required
          variant={isBtnDisabled ? "disabled" : "default"}
          disabled={isBtnDisabled}
        />
        {formState.errors.player && <span className="form-error">Заполните обязательные поля</span>}
        <Button
          type="submit"
          variant={isBtnDisabled ? "disabled" : "btnForAdd"}
          disabled={isBtnDisabled}
        >
          Создать
        </Button>
      </FormSection>
      <FormSection variant="ds_row">
        <FormItem<TStartForm>
          label="Номер комнаты"
          name={StartFormInputName.RoomId}
          type="text"
          register={register}
          variant="disabled"
          disabled
        />
      </FormSection>
      {status === RoomStatus.Waiting && !playerId && (
        <div className="waiting-block">
          <p className="waiting-message">
            <span className="text">Ожидание подключения второго игрока</span>
            <span className="loader"></span>
          </p>
          <Button type="button" variant="default" onClick={handleStopBtnClick}>
            Остановить поиск
          </Button>
        </div>
      )}
      {id && player && (
        <p>
          Игрок <span>{player.name}</span> присоединился к комнате
        </p>
      )}
      {isPlayersJoined && (
        <Button type="button" variant="started" onClick={handleStartBtnClick}>
          Начать игру
        </Button>
      )}
    </Form>
  );
}

export default FormCreateRoom;
