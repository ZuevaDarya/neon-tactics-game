import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./app.scss";
import { AppRoute } from "./constants/app-route";
import GamePage from "./pages/game-page/game-page";
import StartPage from "./pages/start-page/start-page";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = () => navigate(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate]);

  return (
    <Routes>
      <Route path={AppRoute.StartPage} element={<StartPage />} />
      <Route path={AppRoute.GamePage} element={<GamePage />} />
    </Routes>
  );
}

export default App;
