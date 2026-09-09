import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import router from "./routes";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";

const app: Application = express();

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

// Global Error Handler
app.use(globalErrorHandler);

export default app;



