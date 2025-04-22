import type { NextFunction, Request, Response } from "express";
import { AppError } from "openapi-ts-router";

export const invalidPathMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) =>
  next(
    new AppError("#ERR_PATH_NOT_FOUND", 404, {
      description: `The specified path '${req.method} ${req.path}' does not exist!`,
    }),
  );
