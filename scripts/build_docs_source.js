#!/usr/bin/env node
// Mirrors index.js and src/*.js (excluding the hand-written src/*.d.ts files)
// into .typedoc-src/, so that TypeDoc infers types from JSDoc instead of the
// colocated .d.ts files, which TypeScript's module resolution would otherwise
// prefer over the .js source.
import { cpSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, ".typedoc-src");

rmSync(outDir, { recursive: true, force: true });
mkdirSync(path.join(outDir, "src"), { recursive: true });

cpSync(path.join(root, "index.js"), path.join(outDir, "index.js"));

for (const entry of readdirSync(path.join(root, "src"))) {
    if (path.extname(entry) === ".js") {
        cpSync(path.join(root, "src", entry), path.join(outDir, "src", entry));
    }
}
