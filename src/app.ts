import express, {
  type Application,
  type Request,
  type Response,
} from "express";

const app: Application = express();

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get("/", (req: Request, res: Response) => {
  res.send("Doctor Management system Running!!!");
});

export default app;
