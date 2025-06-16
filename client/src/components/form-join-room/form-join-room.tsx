import { SubmitHandler, useForm } from "react-hook-form";
import { StartFormInputName } from "../../constants/input-name";
import { useAppDispatch } from "../../services/store";
import { TStartForm } from "../../types/components-types";
import Button from "../button/button";
import FormItem from "../form-item/form-item";
import FormSection from "../form-section/form-section";
import Form from "../form/form";

function FormJoinRoom() {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState } = useForm<TStartForm>();

  const onSubmit: SubmitHandler<TStartForm> = async (data) => {};

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
          variant="default"
        />
        {formState.errors.player && <span className="form-error">Заполните обязательные поля</span>}
      </FormSection>
      <FormSection title="Введите номер комнаты" variant="ds_row">
        <FormItem<TStartForm>
          label="Номер комнаты"
          name={StartFormInputName.RoomId}
          type="text"
          register={register}
          required
          variant="default"
          placeholder="12345678"
          maxLength={8}
        />
        <Button type="submit" variant="btnForAdd">
          Подключиться
        </Button>
        {formState.errors.roomId && <span className="form-error">Заполните обязательные поля</span>}
      </FormSection>
      <Button type="button" className="button_m-t" variant="started">
        Начать игру
      </Button>
    </Form>
  );
}

export default FormJoinRoom;
