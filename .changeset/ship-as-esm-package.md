---
"simple-statistics": patch
---

Mark the package as `"type": "module"` and rename the CommonJS bundle to `dist/simple-statistics.cjs`. Consumers resolve through the `exports` map, so both `import "simple-statistics"` and `require("simple-statistics")` keep working unchanged — only the internal CJS bundle path moved. (Code that hard-coded the deep path `simple-statistics/dist/simple-statistics.js`, bypassing the package entry points, should switch to the package name or the `.cjs` path.)
