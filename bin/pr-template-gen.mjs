#!/usr/bin/env node
import { spawnSync } from "child_process";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tsxPath = path.join(__dirname, "..", "node_modules", ".bin", "tsx");
const scriptPath = path.join(__dirname, "..", "main.ts");
const envPath = path.join(__dirname, "..", ".env");

const args = [];

if (fs.existsSync(envPath)) {
  args.push(`--env-file=${envPath}`);
}

args.push(scriptPath, ...process.argv.slice(2));

const result = spawnSync(tsxPath, args, { stdio: "inherit" });
process.exit(result.status);
