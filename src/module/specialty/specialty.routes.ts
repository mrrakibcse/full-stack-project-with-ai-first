import { Router } from "express";
import { SpecialtyController } from "./specialty.controller";

const router = Router();

// Routes for /api/v1/specialties
router.post("/", SpecialtyController.createSpecialty);
router.get("/", SpecialtyController.getAllSpecialties);
router.get("/:id", SpecialtyController.getSingleSpecialty);
router.patch("/:id", SpecialtyController.updateSpecialty);
router.delete("/:id", SpecialtyController.deleteSpecialty);

export const SpecialtyRoutes = router;
