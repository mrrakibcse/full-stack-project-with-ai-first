import type { Request, Response } from "express";
import { SpecialtyService } from "./specialty.service";
import type { ISpecialtyFilterRequest } from "./specialty.interface";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

// --- Create Specialty ---
const createSpecialty = catchAsync(async (req: Request, res: Response) => {
  const result = await SpecialtyService.createSpecialtyIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Specialty created successfully",
    data: result,
  });
});

// --- Get All Specialties ---
const getAllSpecialties = catchAsync(async (req: Request, res: Response) => {
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

  const result = await SpecialtyService.getAllSpecialtiesFromDB(filters);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Specialties retrieved successfully",
    data: result,
  });
});

// --- Get Single Specialty ---
const getSingleSpecialty = catchAsync(async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  if (!id) {
    res.status(400).json({
      success: false,
      message: "Specialty ID is required",
    });
    return;
  }

  const result = await SpecialtyService.getSingleSpecialtyFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Specialty retrieved successfully",
    data: result,
  });
});

// --- Update Specialty ---
const updateSpecialty = catchAsync(async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  if (!id) {
    res.status(400).json({
      success: false,
      message: "Specialty ID is required",
    });
    return;
  }

  const result = await SpecialtyService.updateSpecialtyIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Specialty updated successfully",
    data: result,
  });
});

// --- Delete Specialty ---
const deleteSpecialty = catchAsync(async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  if (!id) {
    res.status(400).json({
      success: false,
      message: "Specialty ID is required",
    });
    return;
  }

  const result = await SpecialtyService.deleteSpecialtyFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Specialty deleted successfully",
    data: result,
  });
});

export const SpecialtyController = {
  createSpecialty,
  getAllSpecialties,
  getSingleSpecialty,
  updateSpecialty,
  deleteSpecialty,
};


