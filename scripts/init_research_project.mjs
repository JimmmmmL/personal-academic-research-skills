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
mkdir("literature");
mkdir("results");
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
writeIfMissing(".pipeline/docs/paper_notes.md", "# Paper Notes\n\n");
writeIfMissing(".pipeline/docs/gap_matrix.md", "# Gap Matrix\n\n");
writeIfMissing(".pipeline/docs/selected_idea.md", "# Selected Idea\n\n");
writeIfMissing(".pipeline/docs/result_summary.md", "# Result Summary\n\n");
writeIfMissing(".pipeline/docs/experiment_repos.md", `# External Experiment Repositories

This project repo is the research control plane. Keep large training code,
datasets, checkpoints, and raw logs in external experiment repositories. Sync
only the evidence needed for research decisions and paper writing back here.

| Alias | Repo | Role | Branch / Commit | Last Synced | Notes |
|---|---|---|---|---|---|

## Sync Rules

- Record every meaningful run in \`.pipeline/memory/experiment_ledger.md\`.
- Store only lightweight artifacts in \`results/\`: result tables, selected logs,
  compact CSV/JSON summaries, and links to large artifacts.
- Include external repo alias and commit/hash whenever a result depends on code.
- Do not copy checkpoints, datasets, full training logs, or generated caches into
  this project repo unless the user explicitly asks.
`);

writeJsonIfMissing(".pipeline/tasks/tasks.json", {
  version: 1,
  tasks: []
});

writeIfMissing("AGENTS.md", renderAgents(topic, stage));
writeIfMissing("CLAUDE.md", renderAgents(topic, stage));
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

| Run | Date | External Repo | Commit | Config | Metric | Result | Artifact | Notes |
|---|---|---|---|---|---|---|---|---|
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
- Paper notes: paper-note
- Gap / idea analysis: research-gap-finder
- Experiment summary: experiment-log-summarizer
- Paper writing: paper-writing
- Figures: academic-plotting
- Peer review: paper-reviewer
- Rebuttal: review-rebuttal

Do not fabricate citations, experiment results, benchmark numbers, or venue rules.

Experiment code is external by default. Use .pipeline/docs/experiment_repos.md
as the entry point to external experiment repositories, and summarize confirmed
results into .pipeline/memory/experiment_ledger.md, .pipeline/docs/result_summary.md,
and lightweight files under results/. Do not recursively inspect or copy large
external experiment repositories unless the user asks for a specific run,
commit, or artifact.

Default context discipline:
- Literature tasks: read .pipeline/memory/literature_bank.md, .pipeline/docs/paper_bank.json, and .pipeline/docs/paper_notes.md first.
- Experiment tasks: read .pipeline/docs/experiment_repos.md, .pipeline/memory/experiment_ledger.md, and .pipeline/docs/result_summary.md first.
- Writing tasks: read .pipeline/docs/selected_idea.md and .pipeline/docs/result_summary.md before opening specific paper sections.
`;
}
