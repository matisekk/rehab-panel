import { Box, Grid, GridItem, Heading, Stack, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/reduxHooks";
import { usePlan } from "../hooks/usePlan";
import { useSessionActions } from "../hooks/useSessionActions";
import TodayPlanCard from "../components/dashboard/TodayPlanCard";
import TodayProgressCard from "../components/dashboard/TodayProgressCard";
import ProfileSummaryCard from "../components/dashboard/ProfileSummaryCard";
import ChangePasswordCard from "../components/dashboard/ChangePasswordCard";
import Modal from "../components/ui/Modal";
import { useState } from "react";
import { COLORS } from "../constants/colors";
import TodayGoalCard from "../components/dashboard/TodayGoalCard";
import WeeklyProgressCard from "../components/dashboard/WeaklyProgressCard";
import TipOfTheDayCard from "../components/dashboard/TipOfTheDayCard";
import type { DashboardResponse } from "../types/dashboardTypes";
import DashboardHeaderSkeleton from "../components/dashboard/skeletons/DashboardHeaderSkeleton";
import DashboardCardSkeleton from "../components/dashboard/skeletons/DashboardCardSkeleton";
import TodayProgressCardSkeleton from "../components/dashboard/skeletons/TodayProgressCardSkeleton";
import TodayPlanCardSkeleton from "../components/dashboard/skeletons/TodayPlanCardSkeleton";

type DashboardProps = {
    dashboardData: DashboardResponse | null;
    isLoading: boolean;
    onDashboardRefresh: () => Promise<void>;
};

const Dashboard = ({ dashboardData, isLoading, onDashboardRefresh }: DashboardProps) => {
    const { user } = useAppSelector((state) => state.auth);
    const { data: planResponse, error: planError } = usePlan();
    const { start, loading: startLoading, error: startError } = useSessionActions();
    const [openModal, setOpenModal] = useState<"profile" | "password" | null>(null);
    const navigate = useNavigate();

    async function handleStart(exerciseId: string) {
        try {
            const sessionId = await start(exerciseId);
            navigate(`/sessions/${sessionId}`);
        } catch {
            // handled in startError
        }
    }

    const isDashboardLoading = isLoading || (!planResponse && !planError);

    const combinedPlanError = planError || startError;

    const dashboard = dashboardData?.dashboard ?? null;
    const patient = dashboardData?.patient ?? null;
    const plan = planResponse?.plan ?? null;

    const totalExercises = plan?.items.length ?? 0;
    const completedExercises = plan?.items.filter((exercise) => exercise.status === "done").length ?? 0;

    const planTitle = plan?.title ?? "No rehabilitation plan assigned";
    const patientName = patient?.name ?? user?.firstName ?? "Patient";

    if (isDashboardLoading) {
        return (
            <Stack gap="8">
                <DashboardHeaderSkeleton />

                <Grid
                    templateColumns={{ base: "1fr", xl: "280px 1fr" }}
                    gap="6"
                    alignItems="start"
                >
                    <GridItem>
                        <Stack gap="6">
                            <DashboardCardSkeleton lines={3} />
                            <DashboardCardSkeleton lines={4} />
                            <DashboardCardSkeleton lines={2} />
                        </Stack>
                    </GridItem>

                    <GridItem>
                        <Stack gap="6">
                            <TodayProgressCardSkeleton />
                            <TodayPlanCardSkeleton />
                        </Stack>
                    </GridItem>
                </Grid>
            </Stack>
        );
    }
    return (
        <Stack gap="8">
            <Stack
                direction={{ base: "column", md: "row" }}
                justify="space-between"
                align="center"
            >
                <Box>
                    <Heading size="2xl">
                        {user ? `Hi, ${user.firstName}!` : "Rehab Panel"}
                    </Heading>
                    <Text color="fg.muted">
                        Here you'll find your basic information and today's workout plan
                    </Text>
                </Box>

                <Stack direction="row">
                    <Button
                        bg={COLORS.PRIMARY}
                        color="white"
                        _hover={{ bg: COLORS.PRIMARY_HOVER }}
                        _active={{ bg: COLORS.PRIMARY_ACTIVE }}
                        onClick={() => setOpenModal("profile")}
                    >
                        Change personal data
                    </Button>

                    <Button
                        bg={COLORS.PRIMARY}
                        color="white"
                        _hover={{ bg: COLORS.PRIMARY_HOVER }}
                        _active={{ bg: COLORS.PRIMARY_ACTIVE }}
                        onClick={() => setOpenModal("password")}
                    >
                        Change password
                    </Button>
                </Stack>
            </Stack>

            <Grid
                templateColumns={{ base: "1fr", xl: "280px 1fr" }}
                gap="6"
                alignItems="start"
            >
                <GridItem>
                    <Stack gap="6">
                        <TodayGoalCard
                            title={dashboard?.goalTitle}
                            totalExercises={totalExercises}
                            estimatedMinutes={dashboard?.estimatedMinutes ?? 0}
                        />
                        <WeeklyProgressCard items={dashboard?.weeklyProgress ?? []} />
                        <TipOfTheDayCard
                            tip={dashboard?.tipOfTheDay}
                        />
                    </Stack>
                </GridItem>

                <GridItem>
                    <Stack gap="6">
                        <TodayProgressCard
                            completedExercises={completedExercises}
                            totalExercises={totalExercises}
                            planTitle={planTitle}
                            patientName={patientName}
                            timeSpentMinutes={dashboard?.timeSpentMinutes ?? 0}
                            currentStreakDays={dashboard?.currentStreakDays ?? 0}
                            completedSessions={dashboard?.completedSessions ?? 0}
                        />

                        <TodayPlanCard
                            data={planResponse}
                            error={combinedPlanError}
                            onStart={handleStart}
                            isStarting={startLoading}
                        />
                    </Stack>
                </GridItem>
            </Grid>

            <Modal isOpen={openModal !== null} onClose={() => setOpenModal(null)}>
                {openModal === "profile" && <ProfileSummaryCard onProfileUpdated={onDashboardRefresh} onClose={() => setOpenModal(null)} />}
                {openModal === "password" && <ChangePasswordCard onClose={() => setOpenModal(null)} />}
            </Modal>
        </Stack>
    );
};

export default Dashboard;