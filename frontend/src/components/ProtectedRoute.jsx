import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const loggedInUser =
    localStorage.getItem(
      "loggedInUser"
    );

  return loggedInUser ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}

export default ProtectedRoute;