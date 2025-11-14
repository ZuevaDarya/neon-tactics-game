import { SubmitHandler } from "react-hook-form";
import { AppRoute } from "../../constants/app-route";
import { StartFormInputName } from "../../constants/input-name";
import { RoomStatus } from "../../constants/room-status";
import useCopy from "../../hooks/use-copy";
import useRoomStatus from "../../hooks/use-room-status";
import useStartForm from "../../hooks/use-start-form";
import mx from "../../mixins.module.css";
import { createRoomFormSchema, TCreateRoomForm } from "../../schemas/form-create-room.zod";
import { resetPlayersState } from "../../services/slices/players-slice";
import { redirectPlayers } from "../../services/slices/socket-slice";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { createPlayerWithCreateRoom, deleteRoom, startGame } from "../../services/thunks";
import cn from "../../utils/functions/cn";
import translateError from "../../utils/functions/translate-error";
import Button from "../button/button";
import FormFieldWithAction from "../form-field-with-action/form-field-with-action";
import FormItem from "../form-item/form-item";
import FormSection from "../form-section/form-section";
import Form from "../form/form";
import st from "../form/form.module.css";
import WaitingBlock from "../waiting-block/waiting-block";

function FormCreateRoom() {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isSubmitting },
    isSubmitError,
    setIsSubmitError,
    isFieldValueEmpty,
    isRoomIdValueEmpty,
    roomIdValue,
    onError,
    resetField,
  } = useStartForm<TCreateRoomForm>({
    zodSchema: createRoomFormSchema,
    defaultValues: {
      [StartFormInputName.Player]: "",
      [StartFormInputName.RoomId]: "",
    },
  });
  const { id, status, playerId, creatorId, error } = useAppSelector((state) => state.room);
  const { player } = useAppSelector((state) => state.players);
  const { isWaiting, isPlayersJoined, isGameNotExist } = useRoomStatus();
  const { isCopied, copyToClipboard } = useCopy();

  const onSubmit: SubmitHandler<TCreateRoomForm> = async (data) => {
    setIsSubmitError(false);
    await dispatch(createPlayerWithCreateRoom({ name: data.player })).unwrap();
  };

  const handleStartBtnClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    if (id) {
      await dispatch(startGame({ id })).unwrap();
      dispatch(redirectPlayers({ roomId: id, url: AppRoute.GamePage }));
    }
  };

  const handleStopBtnClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();

    if (id && creatorId) {
      await dispatch(deleteRoom({ id })).unwrap();
      dispatch(resetPlayersState());
    }
  };

  const handleCopyBtnClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isRoomIdValueEmpty) {
      await copyToClipboard(roomIdValue);
    }
  };

  const handleClearBtnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (status !== null) return;

    e.preventDefault();
    e.stopPropagation();

    resetField(StartFormInputName.Player);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <h2 className={cn(st["form__title"], mx["responsiveFont"])}>Инициализация сессии</h2>
      <FormSection title="Введите имя игрока">
        <FormFieldWithAction>
          <FormItem<TCreateRoomForm>
            label="Имя игрока"
            name={StartFormInputName.Player}
            placeholder="игрок1"
            type="text"
            register={register}
            required
            variant={isWaiting || isPlayersJoined ? "cyanDisabled" : "cyan"}
            disabled={isWaiting || isPlayersJoined}
            errorMessage={errors.player?.message ?? null}
          />
          <Button
            type="button"
            variant="clearCyan"
            onClick={handleClearBtnClick}
            disabled={status !== null}
          />
        </FormFieldWithAction>
        <FormFieldWithAction>
          <FormItem<TCreateRoomForm>
            label="Номер комнаты"
            name={StartFormInputName.RoomId}
            type="text"
            register={register}
            variant="cyanDisabled"
            disabled
            isUpperCase={true}
          />
          <Button
            variant={isCopied ? "checkCyan" : "copyCyan"}
            type="button"
            onClick={handleCopyBtnClick}
          />
        </FormFieldWithAction>

        {isGameNotExist && (
          <Button
            type="submit"
            variant={isGameNotExist ? "cyan" : "default"}
            disabled={isWaiting || !isValid || isSubmitting}
            className={st["form__button"]}
          >
            Создать
          </Button>
        )}
      </FormSection>

      {isSubmitError && isFieldValueEmpty && (
        <span className={st["form__error"]}>Заполните поля корректно</span>
      )}
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
