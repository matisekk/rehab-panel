import {
    Box,
    Card,
    Grid,
    GridItem,
    HStack,
    Skeleton,
    Stack,
} from "@chakra-ui/react";

const ExerciseCardSkeleton = () => {
    return (
        <Card.Root variant="outline" borderRadius="2xl">
            <Card.Body>
                <Stack gap="4">
                    <HStack justify="space-between" align="start">
                        <Box w="full">
                            <Skeleton height="22px" width="180px" borderRadius="md" />
                            <HStack mt="3" gap="2">
                                <Skeleton height="22px" width="70px" borderRadius="full" />
                                <Skeleton height="22px" width="55px" borderRadius="full" />
                            </HStack>
                        </Box>
                        <Skeleton height="24px" width="90px" borderRadius="full" />
                    </HStack>

                    <Grid templateColumns={{ base: "1fr", md: "160px 1fr" }} gap="4">
                        <Skeleton minH="150px" borderRadius="xl" />
                        <Stack justify="space-between" gap="4">
                            <Stack gap="3">
                                <HStack gap="2">
                                    <Skeleton height="22px" width="90px" borderRadius="full" />
                                    <Skeleton height="22px" width="80px" borderRadius="full" />
                                </HStack>
                                <Skeleton height="16px" width="100%" borderRadius="md" />
                                <Skeleton height="16px" width="90%" borderRadius="md" />
                                <Skeleton height="16px" width="72%" borderRadius="md" />
                            </Stack>

                            <HStack justify="space-between">
                                <Skeleton height="18px" width="50px" borderRadius="md" />
                                <Skeleton height="32px" width="120px" borderRadius="md" />
                            </HStack>
                        </Stack>
                    </Grid>
                </Stack>
            </Card.Body>
        </Card.Root>
    );
};

const TodayPlanCardSkeleton = () => {
    return (
        <Stack gap="4">
            <Box>
                <Skeleton height="24px" width="170px" borderRadius="md" />
                <Skeleton mt="3" height="30px" width="280px" borderRadius="md" />
                <Skeleton mt="2" height="18px" width="220px" borderRadius="md" />
            </Box>

            <Grid templateColumns={{ base: "1fr", xl: "repeat(2, 1fr)" }} gap="5">
                <GridItem>
                    <ExerciseCardSkeleton />
                </GridItem>
                <GridItem>
                    <ExerciseCardSkeleton />
                </GridItem>
            </Grid>
        </Stack>
    );
};

export default TodayPlanCardSkeleton;