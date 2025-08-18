import path from "path";
import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

export default defineConfig([
  // ESM build
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.js",
      format: "es",
      sourcemap: true,
    },
    plugins: [
      typescript({
        tsconfig: path.resolve(__dirname, "tsconfig.json"),
        declaration: true,
        declarationDir: "dist",
        rootDir: "src",
      }),
      terser(),
    ],
  },
  // CJS build
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.cjs",
      format: "cjs",
      sourcemap: true,
    },
    plugins: [
      typescript({
        tsconfig: path.resolve(__dirname, "tsconfig.json"),
        declaration: false, // already emitted above
      }),
      terser(),
    ],
  },
]);
