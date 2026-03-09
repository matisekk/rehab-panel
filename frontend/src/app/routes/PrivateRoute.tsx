import { Center, Spinner } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/reduxHooks";

type PrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, token, isInitializing } = useAppSelector((state) => state.auth);
  const isAuthenticated = !!user && !!token;

  if (isInitializing) {
    return (
      <Center minH="100vh">
        <Spinner />
      </Center>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute