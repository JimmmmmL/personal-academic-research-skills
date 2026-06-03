#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const args = parseArgs(process.argv.slice(2));
if (!args.id || !args.status) {
  console.error("Usage: update_task_state.mjs --id task-001 --status done [--note text]");
  process.exit(2);
}

const root = process.cwd();
const tasksPath = path.join(root, ".pipeline", "tasks", "tasks.json");
if (!fs.existsSync(tasksPath)) {
  console.error("No .pipeline/tasks/tasks.json found.");
  process.exit(1);
}

const state = JSON.parse(fs.readFileSync(tasksPath, "utf8"));
const task = (state.tasks || []).find((item) => item.id === args.id);
if (!task) {
  console.error(`Task not found: ${args.id}`);
  process.exit(1);
}

task.status = args.status;
task.updatedAt = new Date().toISOString();
if (args.note) task.note = args.note;

fs.writeFileSync(tasksPath, `${JSON.stringify(state, null, 2)}\n`, "utf8");
console.log(`Updated ${args.id} -> ${args.status}`);

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (!a.startsWith("--")) continue;
    const key = a.slice(2);
    const value = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : "true";
    out[key] = value;
  }
  return out;
}
