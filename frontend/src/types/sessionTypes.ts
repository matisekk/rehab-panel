type MetricMsg = {
    type: "metric";
    ts: number;
    progress: number;
    force: number;
    range: number;
};

type DoneMsg = {
    type: "done";
    sessionId: string;
    startedAt: number;
    endedAt: number | null;
};

type HelloMsg = {
    type: "hello";
    sessionId: string;
    exerciseId: string;
};

type ErrMsg = {
    type: "error";
    message: string;
};

export type WsMsg = MetricMsg | DoneMsg | HelloMsg | ErrMsg;

export type SessionStatus = "connecting" | "connected" | "done" | "error";