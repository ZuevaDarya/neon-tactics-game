import { Navigate } from "react-router-dom";
import { AppRoute } from "../../constants/app-route";
import { SessionStorageKey } from "../../constants/storage-keys";
import { TProtectedRoute } from "../../types/components-types";

function ProtectedRoute({ children }: TProtectedRoute) {
  const player1 = sessionStorage.getItem(SessionStorageKey.Player1);
  const player2 = sessionStorage.getItem(SessionStorageKey.Player2);

  if (!player1 || !player2) {
    return <Navigate to={AppRoute.StartPage} replace />;
  }

  return children;
}

export default ProtectedRoute;
