import { Router } from "express";
import { createExpressOpenApiRouter } from "openapi-ts-router";
import { ulid } from "ulid";
import { zValidator } from "validation-adapters/zod";
import type { paths } from "~/generated/api-schema-v1/types";
import {
  createUserBody,
  createUserResponse,
  deleteUserParams,
  getUserListQueryParams,
  getUserListResponse,
  getUserParams,
  getUserResponse,
  updateUserBody,
  updateUserParams,
  updateUserResponse,
} from "~/generated/api-schema-v1/zod/users";
import type { ExtractPrefixedProps } from "~/utils";

export const usersRouter = Router();
const openApiRouter =
  createExpressOpenApiRouter<ExtractPrefixedProps<paths, "/users">>(
    usersRouter
  );

openApiRouter.get("/users", {
  queryValidator: zValidator(getUserListQueryParams),
  handler: (req, res) => {
    const { limit } = req.query;

    res.json(
      getUserListResponse.parse({
        items: [],
        total: 0,
        page: 1,
        limit_per_page: limit || 10,
      })
    );
  },
});

openApiRouter.post("/users", {
  bodyValidator: zValidator(createUserBody),
  handler: (req, res) => {
    const { name, email, password } = req.body;

    res.json(
      createUserResponse.parse({
        id: ulid(),
        name,
        email,
        password,
      })
    );
  },
});

openApiRouter.get("/users/{userId}", {
  pathValidator: zValidator(getUserParams),
  handler: (req, res) => {
    const { userId } = req.params;

    res.json(
      getUserResponse.parse({
        id: userId,
        name: "John Doe",
        email: "example@email.com",
      })
    );
  },
});

openApiRouter.put("/users/{userId}", {
  pathValidator: zValidator(updateUserParams),
  bodyValidator: zValidator(updateUserBody),
  handler: (req, res) => {
    const { userId } = req.params;
    const { name, email, password } = req.body;

    res.json(
      updateUserResponse.parse({
        id: userId,
        name,
        email,
        password,
      })
    );
  },
});

openApiRouter.del("/users/{userId}", {
  pathValidator: zValidator(deleteUserParams),
  handler: (req, res) => {
    const { userId: _userId } = req.params;

    res.status(204).end();
  },
});
