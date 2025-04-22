import { defineConfig } from "orval";

export default defineConfig({
  orval_zod: {
    input: "./openapi/schema-v1.yaml",
    output: {
      client: "zod",
      target: "./src/generated/api-schema-v1/zod",
      mode: "tags",
      clean: true,
    },
  },
});
