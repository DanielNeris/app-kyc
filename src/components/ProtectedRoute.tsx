import { useAuth } from "@/hooks/use-auth";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !user.role) {
    return <Navigate to="/kyc" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
