import esbuild from "esbuild";

await esbuild.build({
  bundle: true,
  minify: true,
  sourcemap: true,
  entryPoints: ["./src/main.ts"],
  outdir: "./dist",
  outExtension: {
    ".js": ".mjs",
  },
  platform: "node",
  format: "esm",
  banner: {
    // commonjs用ライブラリをESMプロジェクトでbundleする際に生じることのある問題への対策
    js: 'import { createRequire } from "module"; import url from "url"; const require = createRequire(import.meta.url); const __filename = url.fileURLToPath(import.meta.url); const __dirname = url.fileURLToPath(new URL(".", import.meta.url));',
  },
});
