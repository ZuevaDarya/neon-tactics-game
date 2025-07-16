import { Navigate } from "react-router-dom";
import { AppRoute } from "../../constants/app-route";
import { useAppSelector } from "../../services/store";
import { TProtectedRoute } from "../../types/components-types";

function ProtectedRoute({ children }: TProtectedRoute) {
  const { creator, player } = useAppSelector((state) => state.players);

  if (!creator || !player) {
    return <Navigate to={AppRoute.StartPage} replace />;
  }

  return children;
}

export default ProtectedRoute;
