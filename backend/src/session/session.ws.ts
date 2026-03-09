import type { WebSocketServer } from "ws";
import { getExerciseById, sessions } from "../data";

export function setupSessionWs(wss: WebSocketServer) {
    wss.on("connection", (ws, req) => {
        const url = req.url || "";
        const match = url.match(/^\/ws\/sessions\/(.+)$/);

        if (!match) {
            ws.send(JSON.stringify({ type: "error", message: "Bad WS path" }));
            ws.close();
            return;
        }

        const sessionId = match[1];
        const session = sessions.get(sessionId);

        if (!session) {
            ws.send(JSON.stringify({ type: "error", message: "Session not found" }));
            ws.close();
            return;
        }

        const exercise = getExerciseById(session.exerciseId);
        if (!exercise) {
            ws.send(JSON.stringify({ type: "error", message: "Exercise not found" }));
            ws.close();
            return;
        }

        if (session.status !== "running") {
            ws.send(JSON.stringify({ type: "error", message: "Session is not running" }));
            ws.close();
            return;
        }

        const totalMs = exercise.durationSec * 1000;
        const tickMs = 250;
        const started = Date.now();

        const interval = setInterval(() => {
            try {
                const elapsed = Date.now() - started;
                session.progress = Math.min(1, elapsed / totalMs);

                const force = Math.max(0, Math.min(1, 0.5 + 0.4 * Math.sin(elapsed / 700) + (Math.random() - 0.5) * 0.15));
                const range = Math.max(0, Math.min(1, 0.6 + 0.3 * Math.sin(elapsed / 900) + (Math.random() - 0.5) * 0.1));

                ws.send(
                    JSON.stringify({
                        type: "metric",
                        ts: Date.now(),
                        progress: session.progress,
                        force,
                        range,
                    }),
                );

                if (session.progress >= 1) {
                    session.progress = 1;
                    clearInterval(interval);

                    ws.send(
                        JSON.stringify({
                            type: "done",
                            sessionId: session.id,
                            startedAt: session.startedAt,
                            endedAt: null,
                        }),
                    );

                    setTimeout(() => ws.close(1000, "done"), 50);
                }
            } catch {
                clearInterval(interval);
                try {
                    ws.close(1011, "server error");
                } catch {
                    // ignore
                }
            }
        }, tickMs);

        ws.on("close", () => {
            clearInterval(interval);
        });

        ws.send(JSON.stringify({
            type: "hello",
            sessionId,
            exerciseId: session.exerciseId,
        }));
    });
}