import fs from "node:fs";
import openapiTS, { astToString } from "openapi-typescript";

const input = "./openapi/schema-v1.yaml";
const outDir = "./src/generated/api-schema-v1/";
const outFile = "types.d.ts";

fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(
  `${outDir}${outFile}`,
  astToString(
    await openapiTS(new URL(input, import.meta.url), {
      exportType: true,
      arrayLength: true,
    }),
  ),
);
