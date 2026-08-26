---
name: academic-research-harness
description: Personal academic research project harness for Codex. Use when starting or resuming a research project and coordinating literature, experiments, figures, writing, review, or rebuttal through a .pipeline memory structure. Routes to a focused skill when one exists and otherwise works directly from project evidence.
metadata:
  version: "0.1.0"
---

# Academic Research Harness

This is the project-level router and memory protocol for personal academic
research. It keeps long-running research coherent through `.pipeline/` state and
routes phase work to focused skills only when they add demonstrated value.

## First Rule

Do not load every related skill. Identify the user's current intent, inspect
only the required `.pipeline` memory files, then use one focused skill when the
router lists one. Otherwise perform the task directly from project evidence.

## Project Detection

If the current directory has `.pipeline/`, treat it as an active research
project. Read:

- `.pipeline/docs/research_brief.json`
- `.pipeline/memory/project_truth.md`
- `.pipeline/memory/execution_context.md` when a current task exists
- the phase-specific memory file listed below

If `.pipeline/` is absent and the user asks to start a research project, run or
adapt `scripts/init_research_project.mjs`.

## Phase Router

| User intent | Use first | Update after completion |
|---|---|---|
| Start a new research project | `scripts/init_research_project.mjs` | `.pipeline/docs/research_brief.json`, `AGENTS.md` |
| Find papers, related work, source discovery | `paper-finder` | `literature_bank.md`, `paper_bank.json`, `references.bib` |
| Make a concise note for one paper | `paper-note` | `.pipeline/docs/paper_notes.md`, `paper_bank.json`, `literature_bank.md` |
| Analyze gap, decide idea, test novelty | Work directly from `paper-note` outputs; use `paper-finder` for missing evidence | `.pipeline/docs/gap_matrix.md`, `.pipeline/docs/selected_idea.md`, `decision_log.md`, `agent_handoff.md` |
| Summarize experiment logs or workspace results | Work directly from mapped runs and artifacts | `experiment_ledger.md`, `result_summary.md`, `experiment_map.md`, `results/` |
| Compact stale or oversized project memory | `compact-research-project` | `.pipeline/archive/`, compact canonical memory files |
| Write paper sections, survey, or related work | Work directly from verified project evidence and venue instructions | `paper/` or `sections/`, `result_summary.md` |
| Create Figure 1, architecture diagrams, plots | `academic-plotting` | `figures/`, `paper/figures/`, or `assets/figures/` |
| Simulate peer review | `paper-reviewer` | `review_log.md` |
| Draft rebuttal from reviewer comments | `review-rebuttal` | `.pipeline/docs/rebuttal_draft.md` |

For specialized ML/AI implementation tasks, consult
`references/external-skill-index.md` and read only the matched external skill.

## Pipeline Memory

The canonical project state is:

```
.pipeline/
  docs/
    research_brief.json
    paper_bank.json
    gap_matrix.md
    paper_notes.md
    selected_idea.md
    experiment_map.md
    result_summary.md
  memory/
    project_truth.md
    orchestrator_state.md
    execution_context.md
    literature_bank.md
    experiment_ledger.md
    review_log.md
    agent_handoff.md
    decision_log.md
  tasks/
    tasks.json
  archive/
literature/
  <topic-name>/
    memory-bank.md
    mind-graph.md
    summaries/
    references.bib
experiments/
meetings/
results/
paper/
figures/
```

Use `project_truth.md` for confirmed facts and decisions only. Use
`decision_log.md` for rejected ideas, tradeoffs, and why a path was not chosen.
Use `agent_handoff.md` to record what the next phase needs.

## Experiment Workspace

Keep first-party training and evaluation code under `experiments/` in the
project workspace. Track it in the top-level repo by default so research state,
code, results, and writing share one project boundary.

- Use `.pipeline/docs/experiment_map.md` to index experiment components, local
  paths, origins, integration method, and revisions.
- Put original project code directly under `experiments/`.
- Put third-party baselines under `experiments/third_party/`. Use a submodule
  when upstream tracking matters, or a subtree/vendor copy when one-repo
  checkout and local modification matter more.
- Use `.pipeline/memory/experiment_ledger.md` for run-level evidence. Include
  code path and revision when a result depends on a nested dependency.
- Use `.pipeline/docs/result_summary.md` for the compact result story used by
  idea analysis and paper writing.
- Use `results/` only for lightweight, decision-relevant artifacts. Keep
  datasets, checkpoints, raw logs, caches, and large generated outputs ignored
  under local storage or configured artifact storage.
- Do not recursively inspect all of `experiments/` by default. Open the mapped
  component, config, run, or artifact required by the current task.

Treat `paper/` as first-party project content when possible. If collaborators
must edit through Overleaf Git, allow `paper/` to be the one intentional
submodule or use a subtree/sync workflow, but keep a single declared source of
truth in project documentation.

## Memory Compaction

Keep `.pipeline/` as hot project memory rather than a complete event history.
When stale directions, completed runs, or repeated notes make canonical files
hard to load, route to `compact-research-project`.

- Preserve exact pre-compaction files under
  `.pipeline/archive/YYYY-MM-DD-<slug>/`.
- Keep `.pipeline/archive/index.md` as the archive entry point.
- Never load `.pipeline/archive/` during normal startup.
- Retain archive pointers and decision-critical summaries in canonical files.

## Role Modes

Use these modes as lightweight behavior frames, not separate agents:

- `Conductor`: plan next action, update tasks, judge phase transitions.
- `Literature Scout`: run `paper-finder`, screen relevance, update literature memory.
- `Idea Analyst`: use `paper-note`; compare evidence directly and run targeted `paper-finder` searches for unresolved claims.
- `Experiment Driver`: design, run, and summarize experiments; update ledger.
- `Paper Writer`: draft directly from verified evidence and use `academic-plotting` for figures.
- `Reviewer`: run `paper-reviewer` or `review-rebuttal`.

## Update Protocol

After any substantive task:

1. Append a dated entry to `.pipeline/memory/project_truth.md` only for confirmed progress.
2. Append rejected options or uncertainty to `.pipeline/memory/decision_log.md`.
3. Update `.pipeline/memory/agent_handoff.md` with next-step context.
4. Update `.pipeline/tasks/tasks.json` when a task status changes.
5. Compact or archive superseded state when an update would otherwise keep
   growing inactive context.

Do not claim a paper, citation, result, or benchmark exists unless it is backed
by a source, file, log, or user-provided evidence.

## Writing Preference

For paper writing, prefer this stack:

1. Project state and verified evidence from this harness.
2. Direct drafting against the user's venue template and instructions.
3. `academic-plotting` for Figure 1 and result figures.
4. `paper-reviewer` for harsh review.

Do not route normal drafting through ARS academic-paper. Use ARS-style reviewer
simulation only if a local ARS reviewer skill is installed or explicitly
requested.
