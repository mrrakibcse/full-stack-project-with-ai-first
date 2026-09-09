import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import router from "./routes";
import { notFound } from "./middlewares/notFound";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";

const app: Application = express();

// Enable CORS with credentials for Better Auth
app.use(
  cors({
    origin: ["http://localhost:4000", "http://localhost:5173"],
    credentials: true,
  })
);

// Better Auth Route Handler (must be mounted before json/urlencoded parsers or handled via toNodeHandler)
app.all("/api/auth/*splat", toNodeHandler(auth));

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

// Application Routes (v1)
app.use("/api/v1", router);

// Health Check Route
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Doctor Management API is running",
  });
});

// Not Found Handler (catches all unmatched routes)
app.use(notFound);

// Global Error Handler
app.use(globalErrorHandler);

export default app;



