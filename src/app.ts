import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import router from "./routes";

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

export default app;



