import { Card, Skeleton, Stack } from "@chakra-ui/react";

type DashboardCardSkeletonProps = {
    lines?: number;
    height?: string;
};

const DashboardCardSkeleton = ({
    lines = 3,
    height = "auto",
}: DashboardCardSkeletonProps) => {
    return (
        <Card.Root variant="outline" borderRadius="2xl">
            <Card.Body>
                <Stack gap="4" minH={height}>
                    <Skeleton height="24px" width="140px" borderRadius="md" />
                    {Array.from({ length: lines }).map((_, index) => (
                        <Skeleton
                            key={index}
                            height="18px"
                            width={index === lines - 1 ? "70%" : "100%"}
                            borderRadius="md"
                        />
                    ))}
                </Stack>
            </Card.Body>
        </Card.Root>
    );
};

export default DashboardCardSkeleton;