import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormBtn from "../../components/form-btn/form-btn";
import FormItem from "../../components/form-item/form-item";
import FormSection from "../../components/form-section/form-section";
import { AppRoute } from "../../constants/app-route";
import { InputName } from "../../constants/input-name";
import { SessionStorageKey } from "../../constants/storage-keys";
import CARDS from "../../mocks/cards";
import { TStartForm } from "../../types/components-types";
import preparePlayers from "../../utils/functions/prepare-players";
import shuffleField from "../../utils/functions/shuffle-field";
import "./start-page.scss";

function StartPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<TStartForm>();

  const onSubmit: SubmitHandler<TStartForm> = (data) => {
    const [player1, player2] = preparePlayers(data);

    sessionStorage.setItem(SessionStorageKey.Player1, JSON.stringify(player1));
    sessionStorage.setItem(SessionStorageKey.Player2, JSON.stringify(player2));
    sessionStorage.setItem(SessionStorageKey.Cards, JSON.stringify(shuffleField(CARDS)));

    navigate(AppRoute.GamePage);
  };

  return (
    <div className="container">
      <h1 className="game-title">Okiya Game</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <FormSection title="Введите игроков">
          <div className="items-block items-block_ds-row">
            <FormItem
              label="Игрок 1"
              name={InputName.Player1}
              placeholder="игрок 1"
              type="text"
              register={register}
              required
            />
            <FormItem
              label="Игрок 2"
              name={InputName.Player2}
              placeholder="игрок 2"
              type="text"
              register={register}
              required
            />
            {(formState.errors.player1 || formState.errors.player2) && (
              <span className="form-error">Заполните обязательные поля</span>
            )}
          </div>
        </FormSection>

        <FormBtn type="submit" classType="started">
          Начать игру
        </FormBtn>
      </form>
    </div>
  );
}

export default StartPage;
