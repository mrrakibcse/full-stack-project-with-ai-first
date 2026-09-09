import type { ErrorRequestHandler } from "express";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next
) => {
  const statusCode = typeof err.statusCode === "number" ? err.statusCode : 500;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
};
