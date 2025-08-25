#!/usr/bin/env node
var fs = require("fs");

var version = JSON.parse(fs.readFileSync("./package.json")).version;
var README = fs.readFileSync("./README.md", "utf8");
fs.writeFileSync(
    "README.md",
    README.replace(
        /simple-statistics@([\d.]+)/g,
        "simple-statistics@" + version
    )
);
