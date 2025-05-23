import { SubmitHandler, useForm } from "react-hook-form";
import FormItem from "../../components/form-item/form-item";
import FormSection from "../../components/form-section/form-section";

import Button from "../../components/button/button";
import Form from "../../components/form/form";
import { StartFormInputName } from "../../constants/input-name";
import { TStartForm } from "../../types/components-types";
import "./start-page.scss";

function StartPage() {
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<TStartForm>();

  const onSubmit: SubmitHandler<TStartForm> = (data) => {
    // const [player, RoomId] = preparePlayers(data);
    console.log(data);
    // sessionStorage.setItem(SessionStorageKey.Player1, JSON.stringify(player1));
    // sessionStorage.setItem(SessionStorageKey.Player2, JSON.stringify(player2));
    // sessionStorage.setItem(SessionStorageKey.Cards, JSON.stringify(shuffleField(CARDS)));
    // dispatch(addPlayers(preparePlayers(data)));
    // navigate(AppRoute.GamePage, { replace: true });
  };

  return (
    <div className="container">
      <h1 className="game-title">Okiya Game</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormSection title="Введите игрокa" variant="ds_row">
          <FormItem<TStartForm>
            label="Игрок"
            name={StartFormInputName.Player}
            placeholder="игрок 1"
            type="text"
            register={register}
            required
            variant="default"
          />
          <FormItem<TStartForm>
            label="Номер комнаты"
            name={StartFormInputName.RoomId}
            type="text"
            register={register}
            required
            disabled
            variant="disabled"
          />
          {formState.errors.player && (
            <span className="form-error">Заполните обязательные поля</span>
          )}
        </FormSection>
        <Button type="submit">Начать игру</Button>
      </Form>
    </div>
  );
}

export default StartPage;
