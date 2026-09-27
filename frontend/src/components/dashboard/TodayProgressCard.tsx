import {
    Card,
    Flex,
    Grid,
    GridItem,
    Heading,
    Progress,
    Stack,
    Text,
    Box,
} from "@chakra-ui/react";

type TodayProgressCardProps = {
    completedExercises: number;
    totalExercises: number;
    planTitle: string;
    patientName: string;
    timeSpentMinutes?: number;
    currentStreakDays?: number;
    completedSessions?: number;
};

const TodayProgressCard = ({
    completedExercises,
    totalExercises,
    planTitle,
    patientName,
    timeSpentMinutes = 3,
    currentStreakDays = 4,
    completedSessions = 9,
}: TodayProgressCardProps) => {
    const percentage =
        totalExercises > 0
            ? Math.round((completedExercises / totalExercises) * 100)
            : 0;

    const weeklyBars = [60, 72, 94, 36, 28, 18, 10];

    return (
        <Card.Root variant="outline" borderRadius="2xl" data-testid="todayProgressCard">
            <Card.Body>
                <Stack gap="5">
                    <Flex justify="space-between" align="flex-start" gap="4">
                        <Box>
                            <Heading size="lg">Today's Progress</Heading>
                            <Text mt="1" color="fg.muted">
                                {planTitle} ({patientName})
                            </Text>
                        </Box>

                        <Text fontSize="3xl" fontWeight="700" color="fg.default">
                            {percentage}%
                        </Text>
                    </Flex>

                    <Progress.Root value={percentage} size="md" borderRadius="full">
                        <Progress.Track borderRadius="full">
                            <Progress.Range borderRadius="full" />
                        </Progress.Track>
                    </Progress.Root>

                    <Grid
                        templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
                        gap="4"
                    >
                        <GridItem>
                            <Box
                                borderWidth="1px"
                                borderRadius="xl"
                                p="4"
                                bg="bg.surface"
                                h="100%"
                            >
                                <Text fontSize="sm" color="fg.muted">
                                    Exercises completed
                                </Text>
                                <Text mt="2" fontSize="2xl" fontWeight="700">
                                    {completedExercises} / {totalExercises}
                                </Text>
                            </Box>
                        </GridItem>

                        <GridItem>
                            <Box
                                borderWidth="1px"
                                borderRadius="xl"
                                p="4"
                                bg="bg.surface"
                                h="100%"
                            >
                                <Text fontSize="sm" color="fg.muted">
                                    Time spent
                                </Text>
                                <Text mt="2" fontSize="2xl" fontWeight="700">
                                    {timeSpentMinutes} min
                                </Text>
                            </Box>
                        </GridItem>

                        <GridItem>
                            <Box
                                borderWidth="1px"
                                borderRadius="xl"
                                p="4"
                                bg="bg.surface"
                                h="100%"
                            >
                                <Text fontSize="sm" color="fg.muted">
                                    Current streak
                                </Text>
                                <Text mt="2" fontSize="2xl" fontWeight="700">
                                    {currentStreakDays} days
                                </Text>
                            </Box>
                        </GridItem>

                        <GridItem>
                            <Box
                                borderWidth="1px"
                                borderRadius="xl"
                                p="4"
                                bg="bg.surface"
                                h="100%"
                            >
                                <Text fontSize="sm" color="fg.muted">
                                    Sessions completed
                                </Text>
                                <Text mt="2" fontSize="2xl" fontWeight="700">
                                    {completedSessions}
                                </Text>

                                <Flex mt="3" align="end" gap="1" h="44px">
                                    {weeklyBars.map((value, index) => (
                                        <Box
                                            key={index}
                                            flex="1"
                                            borderRadius="sm"
                                            bg="blue.300"
                                            opacity={index < 3 ? 1 : 0.35}
                                            h={`${value}%`}
                                        />
                                    ))}
                                </Flex>
                            </Box>
                        </GridItem>
                    </Grid>
                </Stack>
            </Card.Body>
        </Card.Root>
    );
};

export default TodayProgressCard;