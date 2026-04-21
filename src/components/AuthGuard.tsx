import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: Props) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};