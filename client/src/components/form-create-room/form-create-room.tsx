import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { StartFormInputName } from "../../constants/input-name";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { createPlayerWithCreateRoom } from "../../services/thunks";
import { TStartForm } from "../../types/components-types";
import Button from "../button/button";
import FormItem from "../form-item/form-item";
import FormSection from "../form-section/form-section";
import Form from "../form/form";

function FormCreateRoom() {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState, setValue } = useForm<TStartForm>();
  const roomId = useAppSelector((state) => state.room.roomId);
  const creator = useAppSelector((state) => state.players.creator);

  useEffect(() => {
    if (roomId) {
      setValue(StartFormInputName.RoomId, roomId);
    }
  }, [roomId, setValue]);

  useEffect(() => {
    if (creator) {
      setValue(StartFormInputName.Player, creator.name);
    }
  }, [creator, setValue]);

  const onSubmit: SubmitHandler<TStartForm> = async (data) => {
    await dispatch(createPlayerWithCreateRoom({ name: data.player })).unwrap();
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
          variant={roomId ? "disabled" : "default"}
          disabled={roomId ? true : false}
        />
        {formState.errors.player && <span className="form-error">Заполните обязательные поля</span>}
        <Button type="submit" variant="btnForAdd">
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
      <Button type="button" className="button_m-t" variant="started">
        Начать игру
      </Button>
    </Form>
  );
}

export default FormCreateRoom;
