import type { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = await auth.api.getSession({
      headers: req.headers as unknown as Headers,
    });

    if (!session) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: Please log in to continue",
      });
      return;
    }

    // Attach authenticated user and session to request object
    (req as unknown as { user: typeof session.user; session: typeof session.session }).user = session.user;
    (req as unknown as { user: typeof session.user; session: typeof session.session }).session = session.session;

    next();
  } catch (error) {
    next(error);
  }
};
