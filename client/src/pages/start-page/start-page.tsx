import { SubmitHandler, useForm } from "react-hook-form";
import FormItem from "../../components/form-item/form-item";
import FormSection from "../../components/form-section/form-section";

import { useEffect, useState } from "react";
import Button from "../../components/button/button";
import Form from "../../components/form/form";
import { StartFormInputName } from "../../constants/input-name";
import { SessionStorageKey } from "../../constants/storage-keys";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { addPlayerWithRoom, getPlayer, getRoom } from "../../services/thunks";
import { TStartForm } from "../../types/components-types";
import "./start-page.scss";

function StartPage() {
  const dispatch = useAppDispatch();
  const { roomId, creatorId } = useAppSelector((state) => state.room);
  const { creator } = useAppSelector((state) => state.players);
  const { register, handleSubmit, formState } = useForm<TStartForm>();
  const [isAddRoomBtnClick, setIsAddRoomBtnClick] = useState<boolean>(false);

  useEffect(() => {
    if (roomId && creatorId) {
      sessionStorage.setItem(SessionStorageKey.PlayerId, creatorId);
      sessionStorage.setItem(SessionStorageKey.RoomId, roomId);
    }
  }, [roomId, creatorId]);

  useEffect(() => {
    const playerId = sessionStorage.getItem(SessionStorageKey.PlayerId);
    const roomId = sessionStorage.getItem(SessionStorageKey.RoomId);

    if (playerId && roomId) {
      dispatch(getPlayer({ id: playerId })).unwrap();
      dispatch(getRoom({ id: roomId })).unwrap();
    }
  }, [dispatch]);

  const onSubmit: SubmitHandler<TStartForm> = async (data) => {
    await dispatch(addPlayerWithRoom({ name: data.player })).unwrap();
    setIsAddRoomBtnClick(true);
  };

  return (
    <div className="container">
      <h1 className="game-title">Okiya Game</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormSection title="Введите игрокa" variant="ds_row">
          {!roomId && !isAddRoomBtnClick && (
            <FormItem<TStartForm>
              label="Игрок"
              name={StartFormInputName.Player}
              placeholder="игрок 1"
              type="text"
              register={register}
              required
              variant="default"
            />
          )}
          {(roomId || isAddRoomBtnClick) && creator && (
            <FormItem<TStartForm>
              label="Игрок"
              name={StartFormInputName.Player}
              placeholder="игрок 1"
              type="text"
              register={register}
              required
              variant="disabled"
              disabled
              value={creator.name}
            />
          )}
          {!roomId && (
            <Button type="submit" variant="btnForAdd">
              Создать комнату
            </Button>
          )}
          {(isAddRoomBtnClick || roomId) && (
            <FormItem<TStartForm>
              label="Номер комнаты"
              name={StartFormInputName.RoomId}
              type="text"
              register={register}
              required
              disabled
              variant="disabled"
              value={roomId || ""}
            />
          )}
          {formState.errors.player && (
            <span className="form-error">Заполните обязательные поля</span>
          )}
        </FormSection>
        <Button type="button" variant="started">
          Начать игру
        </Button>
      </Form>
    </div>
  );
}

export default StartPage;
