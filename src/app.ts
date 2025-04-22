import cors from "cors";
import express from "express";
import { errorMiddleware, invalidPathMiddleware } from "./middlewares";
import { healthRouter, usersRouter } from "./routes";

const app = express();

// JSON Body Parser Middleware
app.use(express.json());

// CORS Middleware
app.use(cors());

// Router
app.use("/v1", healthRouter);
app.use("/v1", usersRouter);

// undefined path
app.use(invalidPathMiddleware);
app.use(errorMiddleware);

export default app;
