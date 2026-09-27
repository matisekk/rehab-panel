import { Card, Heading, Stack, Text, HStack, Box } from "@chakra-ui/react";
import type { ProgressItem } from "../../types/dashboardTypes";
import { FaCheck } from "react-icons/fa";
import { FiX } from "react-icons/fi";

type WeeklyProgressCardProps = {
    title?: string;
    items?: ProgressItem[];
};

const WeeklyProgressCard = ({
    title = "Weekly Progress",
    items = [],
}: WeeklyProgressCardProps) => {
    const hasItems = items.length > 0;

    return (
        <Card.Root variant="outline" borderRadius="2xl" data-testid="weeklyProgresCard">
            <Card.Body>
                <Stack gap="4">
                    <Heading size="md">{title}</Heading>

                    {hasItems ? (
                        <Stack gap="2">
                            {items.map((item) => {
                                const isCompleted = item.status === "completed";

                                return (
                                    <HStack
                                        key={`${item.date}-${item.status}`}
                                        px="3"
                                        py="2"
                                        borderRadius="lg"
                                        bg="bg.muted"
                                        w="full"
                                        align="center"
                                    >
                                        <Box flex="1" minW={0}>
                                            <Text>{item.date}</Text>
                                        </Box>

                                        <Box w="24px" display="flex" justifyContent="center" flexShrink={0}>
                                            {isCompleted ? <FaCheck color="green" /> : <FiX color="red" />}
                                        </Box>

                                        <Box w="80px" flexShrink={0}>
                                            <Text color={isCompleted ? "green.700" : "red.700"}>
                                                {isCompleted ? "Completed" : "Missed"}
                                            </Text>
                                        </Box>
                                    </HStack>
                                );
                            })}
                            <Box pt="2">
                                <Text fontSize="sm" color="fg.muted">
                                    Your recent rehab activity overview
                                </Text>
                            </Box>
                        </Stack>

                    ) : (
                        <Box>
                            <Text fontWeight="600">No activity yet</Text>
                            <Text mt="1" fontSize="sm" color="fg.muted">
                                Your recent rehabilitation activity will appear here
                            </Text>
                        </Box>
                    )}

                </Stack>
            </Card.Body>
        </Card.Root>
    );
};

export default WeeklyProgressCard;