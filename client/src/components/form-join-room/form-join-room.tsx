import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { StartFormInputName } from "../../constants/input-name";
import useRoomStatus from "../../hooks/use-room-status";
import useStartForm from "../../hooks/use-start-form";
import mx from "../../mixins.module.css";
import { joinRoomFormSchema, TJoinRoomForm } from "../../schemas/form-join-room.zop";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { createPlayerWithJoinInRoom, getAllPlayersInRoom } from "../../services/thunks";
import cn from "../../utils/functions/cn";
import translateError from "../../utils/functions/translate-error";
import Button from "../button/button";
import FormFieldWithAction from "../form-field-with-action/form-field-with-action";
import FormItem from "../form-item/form-item";
import FormSection from "../form-section/form-section";
import Form from "../form/form";
import st from "../form/form.module.css";
import WaitingBlock from "../waiting-block/waiting-block";

function FormJoinRoom() {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isSubmitting },
    onError,
    isSubmitError,
    setIsSubmitError,
    isPlayerValueEmpty,
    resetField,
  } = useStartForm<TJoinRoomForm>({
    zodSchema: joinRoomFormSchema,
    defaultValues: {
      [StartFormInputName.Player]: "",
      [StartFormInputName.RoomId]: "",
    },
  });
  const { id, isRequest, error } = useAppSelector((state) => state.room);
  const { creator } = useAppSelector((state) => state.players);
  const { isPlayersJoined } = useRoomStatus();

  useEffect(() => {
    if (id) {
      dispatch(getAllPlayersInRoom({ id }));
    }
  }, [id, dispatch]);

  const onSubmit: SubmitHandler<TJoinRoomForm> = async (data) => {
    setIsSubmitError(false);
    await dispatch(createPlayerWithJoinInRoom({ name: data.player, roomId: data.roomId })).unwrap();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <h2 className={cn(st["form__title"], mx["responsiveFont"])}>Подключение к сессии</h2>
      <FormSection title="Введите имя игрока и номер комнаты">
        <FormFieldWithAction>
          <FormItem<TJoinRoomForm>
            label="Имя игрока"
            name={StartFormInputName.Player}
            placeholder="игрок1"
            type="text"
            register={register}
            required
            variant={isPlayersJoined ? "pinkDisabled" : "pink"}
            disabled={isPlayersJoined}
            errorMessage={errors.player?.message ?? null}
          />
          <Button
            type="button"
            variant="clearPink"
            onClick={() => resetField(StartFormInputName.Player)}
          />
        </FormFieldWithAction>
        <FormFieldWithAction>
          <FormItem<TJoinRoomForm>
            label="Номер комнаты"
            name={StartFormInputName.RoomId}
            type="text"
            register={register}
            required
            placeholder="12345678"
            maxLength={8}
            variant={isPlayersJoined ? "pinkDisabled" : "pink"}
            disabled={isPlayersJoined}
            errorMessage={errors.roomId?.message ?? null}
            isUpperCase={true}
          />
          <Button
            type="button"
            variant="clearPink"
            onClick={() => resetField(StartFormInputName.RoomId)}
          />
        </FormFieldWithAction>
        <Button
          type="submit"
          variant={isPlayersJoined ? "default" : "pink"}
          disabled={isPlayersJoined || !isValid || isSubmitting}
          className={st["form__button"]}
        >
          Подключиться
        </Button>
      </FormSection>

      {isSubmitError && isPlayerValueEmpty && (
        <span className={st["form__error"]}>Заполните поля корректно</span>
      )}
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
