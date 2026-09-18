import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();

// Routes for /api/v1/auth
router.post("/register-patient", AuthController.registerPatient);

export const AuthRoutes = router;
