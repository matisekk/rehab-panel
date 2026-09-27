import { Card, Heading, Stack, Text, Box } from "@chakra-ui/react";

type TodayGoalCardProps = {
    title?: string;
    totalExercises?: number;
    estimatedMinutes?: number;
};

const TodayGoalCard = ({
    title = "No goal assigned yet",
    totalExercises = 0,
    estimatedMinutes = 0,
}: TodayGoalCardProps) => {
    const hasPlan = totalExercises > 0;

    return (
        <Card.Root variant="outline" borderRadius="2xl" data-testid="todayGoalCard">
            <Card.Body>
                <Stack gap="4">
                    <Heading size="md">Today's Goal</Heading>

                    <Box>
                        <Text fontSize="xl" fontWeight="700">
                            {title}
                        </Text>
                        {hasPlan &&
                            <Text color="fg.muted">
                                Estimated time: {estimatedMinutes} minutes
                            </Text>
                        }
                    </Box>

                    {hasPlan ? (
                        <Box
                            bg="green.50"
                            borderRadius="xl"
                            px="4"
                            py="3"
                            borderWidth="1px"
                            borderColor="green.100"
                        >
                            <Text fontWeight="700">Stay consistent</Text>
                            <Text color="fg.muted">
                                You have {totalExercises} exercises planned for today
                            </Text>
                        </Box>
                    ) : (
                        <Box
                            bg="gray.50"
                            borderRadius="xl"
                            px="4"
                            py="3"
                            borderWidth="1px"
                            borderColor="gray.200"
                        >
                            <Text fontWeight="700">No plan assigned</Text>
                            <Text color="fg.muted">
                                Your therapist has not assigned any exercises yet
                            </Text>
                        </Box>
                    )}
                </Stack>
            </Card.Body>
        </Card.Root>
    );
};

export default TodayGoalCard;