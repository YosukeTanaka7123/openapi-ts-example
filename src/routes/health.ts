import { Router } from "express";
import { createExpressOpenApiRouter } from "openapi-ts-router";
import type { paths } from "~/generated/api-schema-v1/types";
import type { ExtractPrefixedProps } from "~/utils";

export const healthRouter = Router();
const openApiRouter =
  createExpressOpenApiRouter<ExtractPrefixedProps<paths, "/health">>(
    healthRouter,
  );

openApiRouter.get("/health", {
  handler: (_req, res) => {
    res.json({ status: "OK" });
  },
});
