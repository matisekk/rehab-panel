import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/reduxHooks";
import { fetchPlan } from "../store/planSlice";

export function usePlan() {
    const token = useAppSelector((state) => state.auth.token);
    const dispatch = useAppDispatch();
    const { data, loading, error } = useAppSelector((state) => state.plan);

    const reload = useCallback(() => {
        if (!token) return;
        dispatch(fetchPlan({ token }));
    }, [dispatch, token]);

    useEffect(() => {
        reload();
    }, [reload]);

    return { data, loading, error, reload };
}