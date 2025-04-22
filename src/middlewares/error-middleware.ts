import type { NextFunction, Request, Response } from "express";
import { AppError } from "openapi-ts-router";
import { ZodError } from "zod";
import type { components } from "~/generated/api-schema-v1/types";

type ErrorResponse = components["schemas"]["AppError"];

type ErrorHandler<E> = (err: E) => ErrorResponse;

export const errorMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Logging the error
  console.error(err);

  let errorResponse: ErrorResponse;

  // AppError
  if (err instanceof AppError) {
    errorResponse = appErrorHandler(err);
  }

  // ZodError
  else if (err instanceof ZodError) {
    errorResponse = zodErrorHandler(err);
  }

  // UnknownError
  else {
    errorResponse = unknownErrorHandler(err);
  }

  // Set the response status and send the error response
  res.status(errorResponse.status).json(errorResponse);
  return next();
};

const appErrorHandler: ErrorHandler<AppError> = (err) => ({
  status: err.status,
  title: err.name,
  detail: err.description,
  code: err.code,
});

const zodErrorHandler: ErrorHandler<ZodError> = (err) => ({
  status: 500,
  title: "InternalServerError",
  detail: `${err.name} - Unexpected schema error occurred`,
});

const unknownErrorHandler: ErrorHandler<unknown> = (err) => ({
  status: 500,
  title: "InternalServerError",
  detail:
    err instanceof Error
      ? `${err.name} - ${err.message}`
      : "An unknown error occurred",
});
