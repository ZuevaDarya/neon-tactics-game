import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { StartFormInputName } from "../../constants/input-name";
import useRoomStatus from "../../hooks/use-room-status";
import mx from "../../mixins.module.css";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { createPlayerWithJoinInRoom, getAllPlayersInRoom } from "../../services/thunks";
import { TStartForm } from "../../types/components-types";
import cn from "../../utils/functions/cn";
import translateError from "../../utils/functions/translate-error";
import Button from "../button/button";
import FormItem from "../form-item/form-item";
import FormSection from "../form-section/form-section";
import Form from "../form/form";
import st from "../form/form.module.css";
import WaitingBlock from "../waiting-block/waiting-block";

function FormJoinRoom() {
  const dispatch = useAppDispatch();
  const { id, isRequest, error } = useAppSelector((state) => state.room);
  const { creator, player } = useAppSelector((state) => state.players);
  const { register, handleSubmit, formState, setValue } = useForm<TStartForm>();
  const { isPlayersJoined } = useRoomStatus();

  useEffect(() => {
    setValue(StartFormInputName.RoomId, id || "");
  }, [id, setValue]);

  useEffect(() => {
    setValue(StartFormInputName.Player, player?.name || "");
  }, [player, setValue]);

  useEffect(() => {
    if (id) {
      dispatch(getAllPlayersInRoom({ id }));
    }
  }, [id, dispatch]);

  const onSubmit: SubmitHandler<TStartForm> = async (data) => {
    await dispatch(createPlayerWithJoinInRoom({ name: data.player, roomId: data.roomId })).unwrap();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2 className={cn(st["form__title"], mx["responsiveFont"])}>Подключение к сессии</h2>
      <FormSection title="Введите имя игрока и номер комнаты">
        <FormItem<TStartForm>
          label="Имя игрока"
          name={StartFormInputName.Player}
          placeholder="игрок1"
          type="text"
          register={register}
          required
          variant={isPlayersJoined ? "pinkDisabled" : "pink"}
          disabled={isPlayersJoined}
        />
        <FormItem<TStartForm>
          label="Номер комнаты"
          name={StartFormInputName.RoomId}
          type="text"
          register={register}
          required
          placeholder="12345678"
          maxLength={8}
          variant={isPlayersJoined ? "pinkDisabled" : "pink"}
          disabled={isPlayersJoined}
        />
        {formState.errors.player && (
          <span className={st["form__error"]}>Заполните обязательные поля</span>
        )}

        <Button
          type="submit"
          variant={isPlayersJoined ? "default" : "pink"}
          disabled={isPlayersJoined}
          className={st["form__button"]}
        >
          Подключиться
        </Button>
        {formState.errors.roomId && (
          <span className={st["form__error"]}>Заполните обязательные поля</span>
        )}
      </FormSection>

      {isRequest && <WaitingBlock text="Подключение к комнате" />}
      {error && (
        <span className={cn(st["form__message"], st["form__message--mb-10"], mx["responsiveFont"])}>
          {translateError(error)}
        </span>
      )}
      {id && creator && (
        <p className={cn(st["form__message"], st["form__message--mb-10"], mx["responsiveFont"])}>
          Подключились к игроку:{" "}
          <span className={st["form__message--acent-pink"]}>{creator.name}</span>
        </p>
      )}
    </Form>
  );
}

export default FormJoinRoom;
