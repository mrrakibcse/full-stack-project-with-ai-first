import type { Request, Response } from "express";
import { SpecialtyService } from "./specialty.service";
import type { ISpecialtyFilterRequest } from "./specialty.interface";

// --- Create Specialty ---
const createSpecialty = async (req: Request, res: Response) => {
  try {
    // 1. Call database service
    const result = await SpecialtyService.createSpecialtyIntoDB(req.body);

    // 2. Send response
    res.status(201).json({
      success: true,
      message: "Specialty created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create specialty",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// --- Get All Specialties ---
const getAllSpecialties = async (req: Request, res: Response) => {
  try {
    // 1. Parse filter parameters
    const filters: ISpecialtyFilterRequest = {
      searchTerm:
        typeof req.query.searchTerm === "string"
          ? req.query.searchTerm
          : undefined,
      isDeleted:
        typeof req.query.isDeleted === "string"
          ? req.query.isDeleted === "true"
          : undefined,
    };

    // 2. Call database service
    const result = await SpecialtyService.getAllSpecialtiesFromDB(filters);

    // 3. Send response
    res.status(200).json({
      success: true,
      message: "Specialties retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve specialties",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// --- Get Single Specialty ---
const getSingleSpecialty = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!id) {
      res.status(400).json({
        success: false,
        message: "Specialty ID is required",
      });
      return;
    }

    // 3. Call database service
    const result = await SpecialtyService.getSingleSpecialtyFromDB(id);

    // 4. Send response
    res.status(200).json({
      success: true,
      message: "Specialty retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Specialty not found",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// --- Update Specialty ---
const updateSpecialty = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!id) {
      res.status(400).json({
        success: false,
        message: "Specialty ID is required",
      });
      return;
    }

    // 3. Call database service
    const result = await SpecialtyService.updateSpecialtyIntoDB(id, req.body);

    // 4. Send response
    res.status(200).json({
      success: true,
      message: "Specialty updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update specialty",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// --- Delete Specialty ---
const deleteSpecialty = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!id) {
      res.status(400).json({
        success: false,
        message: "Specialty ID is required",
      });
      return;
    }

    // 3. Call database service
    const result = await SpecialtyService.deleteSpecialtyFromDB(id);

    // 4. Send response
    res.status(200).json({
      success: true,
      message: "Specialty deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete specialty",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const SpecialtyController = {
  createSpecialty,
  getAllSpecialties,
  getSingleSpecialty,
  updateSpecialty,
  deleteSpecialty,
};

