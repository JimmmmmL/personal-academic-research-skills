#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const pipeline = path.join(root, ".pipeline");
if (!fs.existsSync(pipeline)) process.exit(0);

const lines = ["# Session Context", ""];
const brief = readJson(".pipeline/docs/research_brief.json");
if (brief) {
  lines.push(`Topic: ${brief.topic || ""}`);
  lines.push(`Stage: ${brief.currentStage || ""}`);
  if (brief.targetVenue) lines.push(`Target venue: ${brief.targetVenue}`);
  lines.push("");
}

appendSection("Current Task", ".pipeline/memory/execution_context.md", 40);
appendSection("Latest Handoff", ".pipeline/memory/agent_handoff.md", 30, true);
appendSection("Recent Decisions", ".pipeline/memory/decision_log.md", 30, true);

lines.push(`Generated: ${new Date().toISOString()}`);
console.log(lines.join("\n"));

function readJson(rel) {
  try {
    return JSON.parse(fs.readFileSync(path.join(root, rel), "utf8"));
  } catch {
    return null;
  }
}

function appendSection(title, rel, maxLines, tail = false) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, "utf8").trim();
  if (!content) return;
  const parts = content.split("\n");
  const selected = tail ? parts.slice(-maxLines) : parts.slice(0, maxLines);
  lines.push(`## ${title}`);
  lines.push(selected.join("\n"));
  lines.push("");
}
