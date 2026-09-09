import type { Request, Response } from "express";

export const notFound = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
    error: {
      path: req.originalUrl,
      method: req.method,
      message: "The requested route does not exist on this server",
    },
  });
};
