import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";
import ColorModeProvider from "./ColorModeProvider";
import { store } from "../../store/store";
import { useAppDispatch } from "../../store/reduxHooks";
import { fetchMe } from "../../store/authSlice";

interface ProvidersProps {
  children: ReactNode;
}

const AuthInitializer = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  return children;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider defaultTheme="white">
        <ReduxProvider store={store}>
          <AuthInitializer>{children}</AuthInitializer>
        </ReduxProvider>
      </ColorModeProvider>
    </ChakraProvider>
  );
};

export default Providers;
