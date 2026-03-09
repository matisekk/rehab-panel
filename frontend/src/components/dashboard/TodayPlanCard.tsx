import {
  Alert,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  LuActivity,
  LuPlay,
  LuRefreshCcw,
  LuDumbbell,
} from "react-icons/lu";
import { COLORS } from "../../constants/colors";
import type { PlanResponse } from "../../types/planTypes";
import { formatDateTime } from "../../utils/formatDateTime";
import {
  getButtonLabel,
  getStatusColor,
  getStatusLabel,
} from "../../utils/taskStatus";
import { useAppSelector } from "../../store/reduxHooks";

type TodayPlanCardProps = {
  data: PlanResponse | null;
  error: string | null;
  onStart: (exerciseId: string) => void;
  isStarting?: boolean;
};

const TodayPlanCard = ({
  data,
  error,
  onStart,
  isStarting,
}: TodayPlanCardProps) => {
  const { user } = useAppSelector((state) => state.auth);
  if (error) {
    return (
      <Alert.Root status="error" borderRadius="2xl">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Error</Alert.Title>
          <Alert.Description>{error}</Alert.Description>
        </Alert.Content>
      </Alert.Root>
    );
  }

  if (!data?.plan) {
    return (
      <Card.Root variant="outline" borderRadius="2xl">
        <Card.Body>
          <Stack gap="3">
            <Heading size="md">Today's Exercises</Heading>
            <Text color="fg.muted">
              No rehabilitation plan has been assigned to you yet.
            </Text>
          </Stack>
        </Card.Body>
      </Card.Root>
    );
  }

  return (
    <Stack gap="4">
      <Box>
        <Heading size="md">Today's Exercises</Heading>
        <Heading mt="3" size="xl" letterSpacing="tight">
          {data.plan.title}
        </Heading>
        <Text mt="1" color="fg.muted">
          Patient:
          <Text as="span" ml="2" fontWeight="semibold" color="fg">
            {`${user?.firstName} ${user?.lastName}`}
          </Text>
        </Text>
      </Box>

      <Grid templateColumns={{ base: "1fr", xl: "repeat(2, 1fr)" }} gap="5">
        {data.plan.items.map((exercise) => {
          const isDone = exercise.status === "done";
          const isInProgress = exercise.status === "in_progress";
          const buttonIcon = isInProgress ? LuRefreshCcw : LuPlay;

          return (
            <GridItem key={exercise.id}>
              <Card.Root
                variant="outline"
                borderRadius="2xl"
                overflow="hidden"
                h="100%"
                bg="bg.surface"
                _hover={{ boxShadow: "md", transform: "translateY(-1px)" }}
                transition="all 0.2s ease"
              >
                <Card.Body>
                  <Stack gap="4" h="100%">
                    <Flex justify="space-between" align="start" gap="4">
                      <Box>
                        <Heading size="md" lineHeight="short">
                          {exercise.name}
                        </Heading>

                        <Text mt="2" fontSize="sm" color="fg.muted">
                          Device:
                          <Text as="span" ml="2" color="fg" fontWeight="medium">
                            {exercise.deviceName}
                          </Text>
                        </Text>
                      </Box>

                      <Badge
                        colorPalette={getStatusColor(exercise.status)}
                        borderRadius="full"
                        px="3"
                        py="1"
                        whiteSpace="nowrap"
                      >
                        {getStatusLabel(exercise.status)}
                      </Badge>
                    </Flex>

                    <Grid
                      templateColumns={{ base: "1fr", md: "160px 1fr" }}
                      gap="4"
                      alignItems="stretch"
                    >
                      <Box
                        borderRadius="xl"
                        bg="gray.50"
                        borderWidth="1px"
                        minH="150px"
                        overflow="hidden"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {exercise.imageUrl ? (
                          <Image
                            src={exercise.imageUrl}
                            alt={exercise.name}
                            objectFit="cover"
                            w="100%"
                            h="100%"
                          />
                        ) : (
                          <Stack align="center" gap="2">
                            <Icon as={LuActivity} boxSize="10" color="gray.400" />
                            <Text
                              fontSize="sm"
                              color="fg.muted"
                              textAlign="center"
                              px="3"
                            >
                              Exercise preview
                            </Text>
                          </Stack>
                        )}
                      </Box>

                      <Stack justify="space-between" gap="4" minH="150px">
                        <Stack gap="3">
                          {exercise.parameters?.length > 0 && (
                            <HStack gap="2" flexWrap="wrap">
                              {exercise.parameters.map((param) => (
                                <Badge key={param} variant="outline">
                                  {param}
                                </Badge>
                              ))}
                            </HStack>
                          )}

                          <Text color="fg.muted" lineHeight="tall">
                            {exercise.instructions}
                          </Text>
                        </Stack>

                        {isDone && (
                          <Box borderTopWidth="1px" borderColor="border.muted" pt="3">
                            <Stack gap="1">
                              {exercise.startedAt && (
                                <Text fontSize="sm" color="fg.muted">
                                  Started:
                                  <Text as="span" ml="2" color="fg">
                                    {formatDateTime(exercise.startedAt)}
                                  </Text>
                                </Text>
                              )}

                              {exercise.endedAt && (
                                <Text fontSize="sm" color="fg.muted">
                                  Finished:
                                  <Text as="span" ml="2" color="fg">
                                    {formatDateTime(exercise.endedAt)}
                                  </Text>
                                </Text>
                              )}
                            </Stack>
                          </Box>
                        )}

                        <Stack gap="3" pt="1">
                          <HStack gap="4" flexWrap="wrap" color="fg.muted">
                            <HStack gap="2">
                              <Icon as={LuDumbbell} />
                              <Text>{exercise.deviceName}</Text>
                            </HStack>
                          </HStack>

                          <Flex justify="flex-end">
                            <Button
                              onClick={() => onStart(exercise.id)}
                              loading={!!isStarting}
                              size="sm"
                              disabled={isDone}
                              bg={COLORS.PRIMARY}
                              color="white"
                              _hover={{ bg: COLORS.PRIMARY_HOVER }}
                              _active={{ bg: COLORS.PRIMARY_ACTIVE }}
                              minW="120px"
                            >
                              <Icon as={buttonIcon} mr="2" />
                              {getButtonLabel(exercise.status)}
                            </Button>
                          </Flex>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Stack>
                </Card.Body>
              </Card.Root>
            </GridItem>
          );
        })}
      </Grid>
    </Stack>
  );
};

export default TodayPlanCard;