import {
    Box,
    Card,
    Grid,
    GridItem,
    HStack,
    Skeleton,
    Stack,
} from "@chakra-ui/react";

const TodayProgressCardSkeleton = () => {
    return (
        <Card.Root variant="outline" borderRadius="2xl">
            <Card.Body>
                <Stack gap="5">
                    <HStack justify="space-between" align="flex-start">
                        <Box w="full">
                            <Skeleton height="28px" width="180px" borderRadius="md" />
                            <Skeleton mt="2" height="18px" width="260px" borderRadius="md" />
                        </Box>
                        <Skeleton height="40px" width="64px" borderRadius="md" />
                    </HStack>

                    <Skeleton height="12px" width="100%" borderRadius="full" />

                    <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap="4">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <GridItem key={index}>
                                <Box borderWidth="1px" borderRadius="xl" p="4">
                                    <Skeleton height="16px" width="90px" borderRadius="md" />
                                    <Skeleton mt="3" height="28px" width="70px" borderRadius="md" />
                                    {index === 3 && (
                                        <HStack mt="4" align="end" h="40px" gap="1">
                                            {Array.from({ length: 7 }).map((_, barIndex) => (
                                                <Skeleton
                                                    key={barIndex}
                                                    flex="1"
                                                    height={`${20 + (barIndex % 4) * 15}px`}
                                                    borderRadius="sm"
                                                />
                                            ))}
                                        </HStack>
                                    )}
                                </Box>
                            </GridItem>
                        ))}
                    </Grid>
                </Stack>
            </Card.Body>
        </Card.Root>
    );
};

export default TodayProgressCardSkeleton;