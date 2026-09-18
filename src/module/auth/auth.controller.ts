import type { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const registerPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.registerPatient(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Patient registered successfully",
    data: result,
  });
});

export const AuthController = {
  registerPatient,
};
