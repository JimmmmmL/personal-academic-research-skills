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
mkdir(".pipeline/archive");
mkdir("literature");
mkdir("experiments");
mkdir("meetings");
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
writeIfMissing(".pipeline/docs/experiment_map.md", `# Experiment Map

Keep first-party experiment code under \`experiments/\` and track it in the
top-level project repo. Register third-party or nested dependencies here so
results remain traceable without scanning the whole workspace.

| Name | Path | Role | Origin | Integration | Revision | Notes |
|---|---|---|---|---|---|---|
| main | experiments/ | primary training and evaluation | project | top-level repo | HEAD | |

## Integration Rules

- Record every meaningful run in \`.pipeline/memory/experiment_ledger.md\`.
- Put third-party baselines under \`experiments/third_party/\`.
- Prefer a submodule when upstream tracking matters. Prefer subtree/vendor code
  when atomic checkout and local modification matter more.
- Store only lightweight, decision-relevant artifacts in \`results/\`.
- Keep datasets, checkpoints, full logs, caches, and large outputs ignored or in
  configured artifact storage.
`);

writeJsonIfMissing(".pipeline/tasks/tasks.json", {
  version: 1,
  tasks: []
});

ensureBlock(".gitignore", "research-workspace-generated-files", `# Local experiment data and generated artifacts
experiments/**/data/
experiments/**/datasets/
experiments/**/checkpoints/
experiments/**/outputs/
experiments/**/logs/
experiments/**/.cache/
experiments/**/wandb/
*.ckpt
*.pt
*.pth

# Secrets and local environments
.env
.env.*
.venv/
venv/

# Python and editor caches
__pycache__/
*.pyc
.DS_Store

# LaTeX build artifacts
*.aux
*.bbl
*.bcf
*.blg
*.fdb_latexmk
*.fls
*.log
*.out
*.run.xml
*.synctex.gz
*.toc
`);

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

| Run | Date | Code Path | Revision | Config | Metric | Result | Artifact | Notes |
|---|---|---|---|---|---|---|---|---|
`);
writeIfMissing(".pipeline/archive/index.md", `# Pipeline Archive

Do not load archive snapshots during normal startup. Open a snapshot only when
the active memory links to it or historical detail is required.

| Snapshot | Date | Reason | Active Direction | Notes |
|---|---|---|---|---|
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

function ensureBlock(rel, marker, content) {
  const file = path.join(root, rel);
  const begin = `# BEGIN ${marker}`;
  const end = `# END ${marker}`;
  const existing = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
  if (existing.includes(begin)) return;
  const separator = existing && !existing.endsWith("\n\n") ? "\n" : "";
  const block = `${begin}\n${content.trimEnd()}\n${end}\n`;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.appendFileSync(file, `${separator}${block}`, "utf8");
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
- Memory compaction: compact-research-project
- Paper writing: paper-writing
- Figures: academic-plotting
- Peer review: paper-reviewer
- Rebuttal: review-rebuttal

Do not fabricate citations, experiment results, benchmark numbers, or venue rules.

Experiment code lives under experiments/ by default. Use
.pipeline/docs/experiment_map.md as the entry point to first-party code and
nested dependencies, and summarize confirmed results into
.pipeline/memory/experiment_ledger.md, .pipeline/docs/result_summary.md, and
lightweight files under results/. Do not recursively inspect experiments/ unless
the user asks for a specific component, run, config, or artifact.

Treat .pipeline/ as hot memory. Do not load .pipeline/archive/ during normal
startup. Use compact-research-project when canonical memory is dominated by
superseded directions, completed runs, stale handoffs, or duplicated notes.

Default context discipline:
- Literature tasks: read .pipeline/memory/literature_bank.md, .pipeline/docs/paper_bank.json, and .pipeline/docs/paper_notes.md first.
- Experiment tasks: read .pipeline/docs/experiment_map.md, .pipeline/memory/experiment_ledger.md, and .pipeline/docs/result_summary.md first.
- Writing tasks: read .pipeline/docs/selected_idea.md and .pipeline/docs/result_summary.md before opening specific paper sections.
`;
}
