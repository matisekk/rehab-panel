import express from "express";
import cors from "cors";
import http from "http";
import { WebSocketServer } from "ws";

import authRoutes from "./auth/auth.routes";
import meRoutes from "./me/me.routes";
import planRoutes from "./plan/plan.routes";
import sessionRoutes from "./session/session.routes";
import { setupSessionWs } from "./session/session.ws";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/me", meRoutes);
app.use("/api/me", planRoutes);
app.use("/api", sessionRoutes);

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

setupSessionWs(wss);

const PORT = 8080;

server.listen(PORT, () => {
    console.log(`Backend listening on http://localhost:${PORT}`);
});