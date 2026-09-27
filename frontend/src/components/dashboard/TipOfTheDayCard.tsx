import { Card, Heading, Stack, Text } from "@chakra-ui/react";

type TipOfTheDayCardProps = {
    tip?: string;
};

const TipOfTheDayCard = ({ tip = "Your therapist will assign a rehabilitation plan soon" }: TipOfTheDayCardProps) => {
    return (
        <Card.Root variant="outline" borderRadius="2xl" data-testid="tipOfTheDayCard">
            <Card.Body>
                <Stack gap="4">
                    <Heading size="md">Tip of the Day</Heading>

                    <Text fontSize="md" lineHeight="tall" color="fg.muted">
                        {tip}
                    </Text>

                </Stack>
            </Card.Body>
        </Card.Root>
    );
};

export default TipOfTheDayCard;