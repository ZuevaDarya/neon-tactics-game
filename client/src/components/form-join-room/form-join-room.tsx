import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { StartFormInputName } from "../../constants/input-name";
import useRoomStatus from "../../hooks/use-room-status";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { createPlayerWithJoinInRoom, getAllPlayersInRoom } from "../../services/thunks";
import { TStartForm } from "../../types/components-types";
import translateError from "../../utils/functions/translateError";
import Button from "../button/button";
import FormItem from "../form-item/form-item";
import FormSection from "../form-section/form-section";
import Form from "../form/form";

function FormJoinRoom() {
  const dispatch = useAppDispatch();
  const { roomId, isRequest, error } = useAppSelector((state) => state.room);
  const { creator, player } = useAppSelector((state) => state.players);
  const { register, handleSubmit, formState, setValue } = useForm<TStartForm>();
  const { isPlayersJoined } = useRoomStatus();

  useEffect(() => {
    setValue(StartFormInputName.RoomId, roomId || "");
  }, [roomId, setValue]);

  useEffect(() => {
    setValue(StartFormInputName.Player, player?.name || "");
  }, [player, setValue]);

  useEffect(() => {
    if (roomId) {
      dispatch(getAllPlayersInRoom({ id: roomId }));
    }
  }, [roomId, dispatch]);

  const onSubmit: SubmitHandler<TStartForm> = async (data) => {
    await dispatch(createPlayerWithJoinInRoom({ name: data.player, roomId: data.roomId })).unwrap();
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
          variant={isPlayersJoined ? "disabled" : "default"}
          disabled={isPlayersJoined}
        />
      </FormSection>
      <FormSection title="Введите номер комнаты" variant="ds_row">
        <FormItem<TStartForm>
          label="Номер комнаты"
          name={StartFormInputName.RoomId}
          type="text"
          register={register}
          required
          placeholder="12345678"
          maxLength={8}
          variant={isPlayersJoined ? "disabled" : "default"}
          disabled={isPlayersJoined}
        />
        {error && <span className="form-error">{translateError(error)}</span>}
        {formState.errors.player && <span className="form-error">Заполните обязательные поля</span>}
        <Button
          type="submit"
          variant={isPlayersJoined ? "disabled" : "btnForAdd"}
          disabled={isPlayersJoined}
        >
          Подключиться
        </Button>
        {formState.errors.roomId && <span className="form-error">Заполните обязательные поля</span>}
      </FormSection>
      {isRequest && (
        <div className="waiting-message">
          <span className="text">Подключение к комнате</span>
          <span className="loader"></span>
        </div>
      )}
      {roomId && creator && (
        <p>
          Подключились к игроку: <span>{creator.name}</span>
        </p>
      )}
    </Form>
  );
}

export default FormJoinRoom;
