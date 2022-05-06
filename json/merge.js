#!/usr/bin/env volta run --node lts node

const fs = require('fs');
const path = require('path');

function main(targetPath, sourcePath) {
  const target = fileExists(targetPath) ? readJson(targetPath) : {};
  const source = readJson(sourcePath);

  // Dumb merge for now.
  const newTarget = { ...target, ...source };
  
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, JSON.stringify(newTarget, null, 2));
}

function readJson(file) {
  let raw;
  try {
    raw = fs.readFileSync(file, 'utf-8');
  } catch (error) {
    throw new Error(`Unable to open ${file}: ${error.message}`);
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new Error(`${file} is not valid JSON: ${error.message}`);
  }
}

function fileExists(file) {
  try {
    return fs.statSync(file).isFile();
  } catch {
    return false;
  }
}

main(...process.argv.slice(2));
