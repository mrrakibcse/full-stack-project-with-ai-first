import type { Request, Response } from "express";
import { PatientService } from "./patient.service";
import type { IPatientFilterRequest } from "./patient.interface";
import type { BloodGroup, MaritalStatus } from "../../generated/client";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

// --- Create Patient Profile ---
const createPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await PatientService.createPatientIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Patient profile created successfully",
    data: result,
  });
});

// --- Get All Patients ---
const getAllPatients = catchAsync(async (req: Request, res: Response) => {
  const filters: IPatientFilterRequest = {
    searchTerm:
      typeof req.query.searchTerm === "string"
        ? req.query.searchTerm
        : undefined,
    bloodGroup:
      typeof req.query.bloodGroup === "string"
        ? (req.query.bloodGroup as BloodGroup)
        : undefined,
    maritalStatus:
      typeof req.query.maritalStatus === "string"
        ? (req.query.maritalStatus as MaritalStatus)
        : undefined,
    isDeleted:
      typeof req.query.isDeleted === "string"
        ? req.query.isDeleted === "true"
        : undefined,
  };

  const result = await PatientService.getAllPatientsFromDB(filters);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Patients retrieved successfully",
    data: result,
  });
});

// --- Get My Patient Profile ---
const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const user = (req as unknown as { user?: { id: string } }).user;
  if (!user?.id) {
    res.status(401).json({
      success: false,
      message: "Unauthorized: User not found in session",
    });
    return;
  }

  const result = await PatientService.getMyPatientProfileFromDB(user.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Patient profile retrieved successfully",
    data: result,
  });
});

// --- Get Single Patient ---
const getSinglePatient = catchAsync(async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  if (!id) {
    res.status(400).json({
      success: false,
      message: "Patient ID is required",
    });
    return;
  }

  const result = await PatientService.getSinglePatientFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Patient retrieved successfully",
    data: result,
  });
});

// --- Update Patient ---
const updatePatient = catchAsync(async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  if (!id) {
    res.status(400).json({
      success: false,
      message: "Patient ID is required",
    });
    return;
  }

  const result = await PatientService.updatePatientIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Patient updated successfully",
    data: result,
  });
});

// --- Delete Patient (Soft delete) ---
const deletePatient = catchAsync(async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  if (!id) {
    res.status(400).json({
      success: false,
      message: "Patient ID is required",
    });
    return;
  }

  const result = await PatientService.deletePatientFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Patient deleted successfully",
    data: result,
  });
});

export const PatientController = {
  createPatient,
  getAllPatients,
  getMyProfile,
  getSinglePatient,
  updatePatient,
  deletePatient,
};
