#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const args = parseArgs(process.argv.slice(2));
const root = process.cwd();
const topic = args.topic || "";
const stage = args.stage || "survey";
const goal = args.goal || "";
const targetVenue = args.venue || "";
const now = new Date().toISOString();

mkdir(".pipeline/docs");
mkdir(".pipeline/memory");
mkdir(".pipeline/tasks");
mkdir(".pipeline/.events");
mkdir("paper");
mkdir("figures");

writeJsonIfMissing(".pipeline/docs/research_brief.json", {
  topic,
  goal,
  currentStage: stage,
  targetVenue,
  successThreshold: "",
  createdAt: now
});

writeJsonIfMissing(".pipeline/docs/paper_bank.json", {
  version: 1,
  papers: []
});

writeJsonIfMissing(".pipeline/tasks/tasks.json", {
  version: 1,
  tasks: []
});

writeIfMissing("AGENTS.md", renderAgents(topic, stage));
writeIfMissing(".pipeline/memory/project_truth.md", `# Project Truth

## Topic
${topic || "(fill in)"}

## Goal
${goal || "(fill in)"}

## Confirmed Decisions

`);
writeIfMissing(".pipeline/memory/orchestrator_state.md", "# Orchestrator State\n\n");
writeIfMissing(".pipeline/memory/execution_context.md", "# Execution Context\n\n");
writeIfMissing(".pipeline/memory/literature_bank.md", `# Literature Bank

| URL | Title | Year | Venue | Relevance | Status | Date | Notes |
|---|---|---:|---|---:|---|---|---|
`);
writeIfMissing(".pipeline/memory/experiment_ledger.md", `# Experiment Ledger

| Run | Date | Config | Metric | Result | Notes |
|---|---|---|---|---|---|
`);
writeIfMissing(".pipeline/memory/review_log.md", "# Review Log\n\n");
writeIfMissing(".pipeline/memory/agent_handoff.md", "# Agent Handoff\n\n");
writeIfMissing(".pipeline/memory/decision_log.md", "# Decision Log\n\n");

console.log(`Initialized academic research project at ${root}`);
console.log(`Topic: ${topic || "(not set)"}`);
console.log(`Stage: ${stage}`);

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

function mkdir(rel) {
  fs.mkdirSync(path.join(root, rel), { recursive: true });
}

function writeIfMissing(rel, content) {
  const file = path.join(root, rel);
  if (fs.existsSync(file)) return;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
}

function writeJsonIfMissing(rel, obj) {
  writeIfMissing(rel, `${JSON.stringify(obj, null, 2)}\n`);
}

function renderAgents(topic, stage) {
  return `# Academic Research Project

Topic: ${topic || "(fill in)"}
Current stage: ${stage}

Use the personal academic research harness. On startup, read .pipeline/docs/research_brief.json and .pipeline/memory/project_truth.md, then route to the focused skill needed for the user's task.

Preferred routing:
- Literature search: paper-finder
- Paper reading: paper-deep-note
- Gap / idea analysis: research-gap-finder
- Experiment summary: experiment-log-summarizer
- Paper writing: paper-writing
- Figures: academic-plotting
- Peer review: paper-reviewer
- Rebuttal: review-rebuttal

Do not fabricate citations, experiment results, benchmark numbers, or venue rules.
`;
}
