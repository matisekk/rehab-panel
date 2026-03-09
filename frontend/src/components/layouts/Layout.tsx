import { Box, Button, Flex, HStack, Heading, Text, Container } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../constants/colors";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import { logout } from "../../store/authSlice";
import { clearPlan } from "../../store/planSlice";
import { logoutUser } from "../../api/authApi";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { user, token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    if (token) {
      void logoutUser(token);
    }
    dispatch(logout());
    dispatch(clearPlan())
    navigate("/login");
  }

  return (
    <Box minH="100vh" bg="bg.canvas" color="fg">
      <Box
        borderBottomWidth="1px"
        bg={`linear-gradient(90deg, ${COLORS.PRIMARY} 0%, ${COLORS.PRIMARY_HOVER} 60%, ${COLORS.PRIMARY_ACTIVE} 100%)`}
        color="white"
      >
        <Flex px={{ base: "4", md: "6" }} py="3" align="center" gap="4" justifyContent='space-between'>
          <Heading size="md" letterSpacing="tight">
            Rehab Panel
          </Heading>
          {user && (
            <HStack gap="3">
              <Text opacity={0.9}>
                Logged in as{" "}
                <Text as="span" fontWeight="semibold">
                  {user.firstName} {user.lastName}
                </Text>
              </Text>
              <Button
                size="sm"
                variant="outline"
                borderColor="rgba(255,255,255,0.55)"
                color="white"
                _hover={{ bg: "rgba(255,255,255,0.12)" }}
                onClick={handleLogout}
              >
                Log out
              </Button>
            </HStack>
          )}
        </Flex>
      </Box>

      <Box as="main" py={{ base: "6", md: "8" }}>
        <Container px={{ base: "4", md: "6" }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
}

export default Layout