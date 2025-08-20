import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
// import "./app.css";
import { DEV_URL } from "./constants/api-constants";
import { AppRoute } from "./constants/app-route";
import GamePage from "./pages/game-page/game-page";
import StartPage from "./pages/start-page/start-page";
import { connect, disconnected } from "./services/slices/socket-slice";
import { useAppDispatch } from "./services/store";

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(connect({ url: DEV_URL }));

    return () => {
      dispatch(disconnected());
    };
  }, [dispatch]);

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
