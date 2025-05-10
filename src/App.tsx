import { Route, Routes } from "react-router-dom";
import "./app.scss";
import { AppRoute } from "./constants/app-route";
import GamePage from "./pages/game-page/game-page";
import StartPage from "./pages/start-page/start-page";

function App() {
  return (
    <Routes>
      <Route path={AppRoute.StartPage} element={<StartPage />} />
      <Route path={AppRoute.GamePage} element={<GamePage />} />
    </Routes>
  );
}

export default App;
