#!/usr/bin/env bash

rm -r simple-statistics.github.com
git clone https://github.com/simple-statistics/simple-statistics.github.com.git
node simple-statistics.github.com/update_version.js ../package.json
cd simple-statistics.github.com
git add index.html
git commit -m "chore: Update version"
