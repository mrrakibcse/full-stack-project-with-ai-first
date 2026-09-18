import { Router } from "express";
import { PatientController } from "./patient.controller";
import { requireAuth } from "../../middlewares/auth";

const router = Router();

// Routes for /api/v1/patients
router.post("/", requireAuth("ADMIN", "PATIENT"), PatientController.createPatient);
router.get("/", requireAuth("ADMIN", "DOCTOR"), PatientController.getAllPatients);
router.get("/me", requireAuth("PATIENT"), PatientController.getMyProfile);
router.get("/:id", requireAuth("ADMIN", "DOCTOR", "PATIENT"), PatientController.getSinglePatient);
router.patch("/:id", requireAuth("ADMIN", "PATIENT"), PatientController.updatePatient);
router.delete("/:id", requireAuth("ADMIN"), PatientController.deletePatient);

export const PatientRoutes = router;
