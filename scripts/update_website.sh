#!/usr/bin/env bash

git clone -b update-version https://github.com/simple-statistics/simple-statistics.github.com.git
node simple-statistics.github.com/update_version.js ../package.json
cd simple-statistics.github.com
git add index.html
git commit -m "chore: Update version"
