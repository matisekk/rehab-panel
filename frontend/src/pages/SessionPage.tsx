import {
  Alert,
  Badge,
  Box,
  Button,
  Card,
  Heading,
  HStack,
  Link,
  Progress,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { COLORS } from "../constants/colors";

type Props = {
  sessionId: string;
  status: "connecting" | "connected" | "done" | "error";
  progress: number;
  force: number | null;
  range: number | null;
  error: string | null;
  onFinish: () => void;
  isFinishing: boolean;
};

function StatusBadge({ status }: { status: Props["status"] }) {
  if (status === "connected") return <Badge colorPalette="green">Running</Badge>;
  if (status === "connecting") return <Badge colorPalette="yellow">Connecting</Badge>;
  if (status === "done") return <Badge colorPalette="blue">Completed</Badge>;
  return <Badge colorPalette="red">Error</Badge>;
}

export default function SessionPage({
  sessionId,
  status,
  progress,
  force,
  range,
  error,
  onFinish,
  isFinishing,
}: Props) {
  const progressValue = Math.min(100, Math.round(progress * 100));

  return (
    <Box maxW="900px" mx="auto" p={{ base: "4", md: "6" }}>
      <Stack gap="5">
        <HStack justify="space-between" align="start" gap="4">
          <Box>
            <Heading size="lg">Exercise Session</Heading>
            <Text color="fg.muted" mt="1">
              ID: <Text as="span" fontFamily="mono">{sessionId}</Text>
            </Text>
          </Box>

          <Stack align="end" gap="2">
            <StatusBadge status={status} />
            <Link href="/app/dashboard" color="fg.muted">
              Back to dashboard
            </Link>
          </Stack>
        </HStack>

        {error && (
          <Alert.Root status="error" borderRadius="md">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Error</Alert.Title>
              <Alert.Description>{error}</Alert.Description>
            </Alert.Content>
          </Alert.Root>
        )}

        <Card.Root variant="outline">
          <Card.Body>
            <Stack gap="4">
              <Box>
                <HStack justify="space-between" mb="2">
                  <Text fontWeight="semibold">Progress</Text>
                  <Text color="fg.muted">{progressValue}%</Text>
                </HStack>

                <Progress.Root value={progressValue} colorPalette="teal" role="progressbar">
                  <Progress.Track>
                    <Progress.Range />
                  </Progress.Track>
                </Progress.Root>
              </Box>

              <HStack gap="3" flexWrap="wrap">
                <Card.Root flex={1} variant="subtle" minW="220px">
                  <Card.Body>
                    <Text fontWeight="semibold">Force</Text>
                    <Text fontSize="xl">{force === null ? "-" : force.toFixed(2)}</Text>
                  </Card.Body>
                </Card.Root>

                <Card.Root flex={1} variant="subtle" minW="220px">
                  <Card.Body>
                    <Text fontWeight="semibold">Range</Text>
                    <Text fontSize="xl">{range === null ? "-" : range.toFixed(2)}</Text>
                  </Card.Body>
                </Card.Root>
              </HStack>

              <HStack justify="flex-end" gap="3">
                {isFinishing && (
                  <HStack gap="2">
                    <Spinner size="sm" />
                    <Text color="fg.muted">Saving exercise data...</Text>
                  </HStack>
                )}

                <Button
                  onClick={onFinish}
                  disabled={status === "done" || status === "connecting" || isFinishing}
                  bg={COLORS.PRIMARY}
                  color="white"
                  _hover={{ bg: COLORS.PRIMARY_HOVER }}
                  _active={{ bg: COLORS.PRIMARY_ACTIVE }}
                >
                  Finish
                </Button>
              </HStack>
            </Stack>
          </Card.Body>
        </Card.Root>
      </Stack>
    </Box>
  );
}