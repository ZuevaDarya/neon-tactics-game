import FormBtn from "../../components/form-btn/form-btn";
import FormItem from "../../components/form-item/form-item";
import FormSection from "../../components/form-section/form-section";
import "./start-page.scss";

function StartPage() {
  return (
    <div className="container">
      <h1 className="game-title">Okiya Game</h1>
      <form className="form">
        <FormSection title="Введите игроков">
          <div className="items-block items-block_ds-row">
            <FormItem
              label="Игрок 1"
              name="player1"
              placeholder="игрок 1"
              type="text"
            />
            <FormItem
              label="Игрок 2"
              name="player2"
              placeholder="игрок 2"
              type="text"
            />
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
