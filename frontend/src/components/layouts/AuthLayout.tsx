import { Box } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { COLORS } from "../../constants/colors";

type Props = {
    children: ReactNode;
};

export function AuthLayout({ children }: Props) {
    return (
        <Box
            minH="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            px="4"
            bg={`linear-gradient(135deg, ${COLORS.PRIMARY_LIGHT} 0%, white 55%, white 100%)`}
        >
            <Box
                maxW="420px"
                w="100%"
                bg="bg.surface"
                borderWidth="1px"
                borderRadius="xl"
                p={{ base: "5", md: "6" }}
                boxShadow="lg"
            >
                {children}
            </Box>
        </Box>
    );
}