import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SessionPage from "../../pages/SessionPage";
import { useSessionActions } from "../../hooks/useSessionActions";
import type { SessionStatus, WsMsg } from "../../types/sessionTypes";

export default function SessionRoute() {
  const { sessionId } = useParams();
  const { finish } = useSessionActions();

  const [status, setStatus] = useState<SessionStatus>("connecting");
  const [progress, setProgress] = useState(0);
  const [force, setForce] = useState<number | null>(null);
  const [range, setRange] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFinishing, setIsFinishing] = useState(false);

  const socketRef = useRef<WebSocket | null>(null);
  const hasFinishedRef = useRef(false);
  const isUnmountedRef = useRef(false);

  const closeSocket = useCallback(() => {
    const socket = socketRef.current;
    if (!socket) return;

    if (socket.readyState === WebSocket.OPEN) {
      try {
        socket.close(1000, "client closed");
      } catch {
        // ignore
      }
    }

    socketRef.current = null;
  }, []);

  const finishSession = useCallback(async () => {
    if (!sessionId || hasFinishedRef.current) return;

    hasFinishedRef.current = true;
    setIsFinishing(true);

    closeSocket();

    try {
      await finish(sessionId);

      if (isUnmountedRef.current) return;

      setProgress(1);
      setStatus("done");
      setError(null);
    } catch (e) {
      if (isUnmountedRef.current) return;

      const err = e as { message?: string };
      setStatus("error");
      setError(err.message || "Failed to finish session");
      hasFinishedRef.current = false;
    } finally {
      if (!isUnmountedRef.current) {
        setIsFinishing(false);
      }
    }
  }, [sessionId, finish, closeSocket]);

  useEffect(() => {
    if (!sessionId) return;

    isUnmountedRef.current = false;
    hasFinishedRef.current = false;

    setStatus("connecting");
    setProgress(0);
    setForce(null);
    setRange(null);
    setError(null);
    setIsFinishing(false);

    const socket = new WebSocket(`ws://localhost:8080/ws/sessions/${sessionId}`);
    socketRef.current = socket;

    socket.onopen = () => {
      if (isUnmountedRef.current || hasFinishedRef.current) return;
      setStatus("connected");
    };

    socket.onmessage = (event) => {
      if (isUnmountedRef.current || hasFinishedRef.current) return;

      const message = JSON.parse(event.data) as WsMsg;

      switch (message.type) {
        case "metric": {
          setProgress(message.progress);
          setForce(message.force);
          setRange(message.range);

          if (message.progress >= 1) {
            void finishSession();
          }
          break;
        }

        case "done": {
          setProgress(1);
          break;
        }

        case "error": {
          setStatus("error");
          setError(message.message);
          closeSocket();
          break;
        }

        case "hello": {
          setStatus("connected");
          break;
        }
      }
    };

    socket.onerror = () => {
      if (isUnmountedRef.current || hasFinishedRef.current) return;
      setStatus("error");
      setError("WebSocket connection error");
      return () => {
        isUnmountedRef.current = true;
        closeSocket();
      };
    };

    socket.onclose = (event) => {
      if (isUnmountedRef.current || hasFinishedRef.current) return;

      if (event.code !== 1000 && event.code !== 1006) {
        return;
      }
      setStatus("error");
      setError(`WebSocket closed unexpectedly (code=${event.code})`);
    };

    return () => {
      isUnmountedRef.current = true;
      closeSocket();
    };
  }, [sessionId, finishSession, closeSocket]);

  const handleFinishClick = useCallback(() => {
    void finishSession();
  }, [finishSession]);

  if (!sessionId) {
    return (
      <SessionPage
        sessionId="missing"
        status="error"
        progress={0}
        force={null}
        range={null}
        error="Missing sessionId in URL"
        onFinish={() => { }}
        isFinishing={false}
      />
    );
  }

  return (
    <SessionPage
      sessionId={sessionId}
      status={status}
      progress={progress}
      force={force}
      range={range}
      error={error}
      onFinish={handleFinishClick}
      isFinishing={isFinishing}
    />
  );
}