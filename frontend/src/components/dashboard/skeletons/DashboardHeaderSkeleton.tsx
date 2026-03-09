import { Box, Button, HStack, Skeleton, Stack } from "@chakra-ui/react";

const DashboardHeaderSkeleton = () => {
    return (
        <Stack
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align="center"
            gap="4"
        >
            <Box w="full">
                <Skeleton height="36px" width="220px" borderRadius="md" />
                <Skeleton mt="3" height="18px" width="420px" maxW="100%" borderRadius="md" />
            </Box>

            <HStack w={{ base: "full", md: "auto" }} gap="3">
                <Button disabled w={{ base: "full", md: "180px" }}>
                    <Skeleton height="20px" width="120px" />
                </Button>
                <Button disabled w={{ base: "full", md: "160px" }}>
                    <Skeleton height="20px" width="110px" />
                </Button>
            </HStack>
        </Stack>
    );
};

export default DashboardHeaderSkeleton;