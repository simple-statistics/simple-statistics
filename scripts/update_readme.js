#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import pkg from "../package.json" with { type: "json" };

const README = readFileSync("./README.md", "utf8");
writeFileSync(
    "README.md",
    README.replace(
        /simple-statistics@([\d.]+)/g,
        `simple-statistics@${pkg.version}`
    )
);
