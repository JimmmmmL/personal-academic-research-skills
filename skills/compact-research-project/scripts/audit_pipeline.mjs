#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const pipeline = path.join(root, ".pipeline");
const asJson = process.argv.includes("--json");

if (!fs.existsSync(pipeline)) {
  console.error("No .pipeline directory found in the current project.");
  process.exit(1);
}

const limits = new Map([
  ["execution_context.md", 80],
  ["agent_handoff.md", 100],
  ["project_truth.md", 180],
  ["selected_idea.md", 180],
  ["result_summary.md", 240],
  ["decision_log.md", 300],
  ["experiment_ledger.md", 500],
  ["paper_notes.md", 800],
]);

const files = walk(pipeline)
  .map((file) => inspect(file))
  .sort((a, b) => b.bytes - a.bytes || a.path.localeCompare(b.path));

const report = {
  generatedAt: new Date().toISOString(),
  root,
  totals: {
    files: files.length,
    bytes: files.reduce((sum, file) => sum + file.bytes, 0),
    lines: files.reduce((sum, file) => sum + file.lines, 0),
  },
  files,
};

if (asJson) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log("# Active .pipeline Audit\n");
  console.log(`Files: ${report.totals.files}`);
  console.log(`Lines: ${report.totals.lines}`);
  console.log(`Bytes: ${report.totals.bytes}\n`);
  console.log("| File | Lines | Bytes | Review |");
  console.log("|---|---:|---:|---|");
  for (const file of files) {
    console.log(
      `| \`${file.path}\` | ${file.lines} | ${file.bytes} | ${file.review ? "yes" : ""} |`,
    );
  }
}

function walk(dir) {
  const output = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "archive" || entry.name === ".events") continue;
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) output.push(...walk(absolute));
    if (entry.isFile()) output.push(absolute);
  }
  return output;
}

function inspect(file) {
  const content = fs.readFileSync(file);
  const relative = path.relative(root, file);
  const lines =
    content.length === 0 ? 0 : content.toString("utf8").split(/\r?\n/).length;
  const limit = limits.get(path.basename(file));
  return {
    path: relative,
    lines,
    bytes: content.length,
    review: Boolean(limit && lines > limit),
    lineLimit: limit || null,
  };
}
