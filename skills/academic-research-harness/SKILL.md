---
name: academic-research-harness
description: Personal academic research project harness for Codex. Use when starting or resuming a research project, coordinating literature search, gap analysis, experiments, paper writing, review, rebuttal, or weekly research updates through a .pipeline memory structure. Routes to paper-finder, paper-deep-note, research-gap-finder, experiment-log-summarizer, paper-writing, academic-plotting, survey-writer, paper-reviewer, and review-rebuttal instead of doing every task inline.
metadata:
  version: "0.1.0"
---

# Academic Research Harness

This is the project-level router and memory protocol for personal academic
research. It keeps long-running research coherent through `.pipeline/` state and
delegates phase work to focused skills.

## First Rule

Do not load every related skill. Identify the user's current intent, inspect
only the required `.pipeline` memory files, then invoke/read the one focused
skill needed for the next action.

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
| Deep-read one paper | `paper-deep-note` | `.pipeline/docs/paper_digests.md`, `paper_bank.json`, `literature_bank.md` |
| Analyze gap, decide idea, test novelty | `research-gap-finder` | `.pipeline/docs/gap_matrix.md`, `decision_log.md`, `agent_handoff.md` |
| Summarize experiment logs | `experiment-log-summarizer` | `experiment_ledger.md`, `result_summary.md` |
| Write ML/AI paper sections | `paper-writing` | `paper/` or `sections/`, `result_summary.md` |
| Write Chinese survey / related work draft | `survey-writer` | `paper/related_work.*` or `.pipeline/docs/survey.md` |
| Create Figure 1, architecture diagrams, plots | `academic-plotting` | `figures/`, `paper/figures/`, or `assets/figures/` |
| Simulate peer review | `paper-reviewer` | `review_log.md` |
| Draft rebuttal from reviewer comments | `review-rebuttal` | `.pipeline/docs/rebuttal_draft.md` |
| Weekly lab update | `weekly-lab-update` | `.pipeline/docs/weekly_update.md` |

For ML/AI implementation tasks outside this repo, consult
`references/external-skill-index.md` and read only the matched external skill.

## Pipeline Memory

The canonical project state is:

```
.pipeline/
  docs/
    research_brief.json
    paper_bank.json
    gap_matrix.md
    paper_digests.md
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
```

Use `project_truth.md` for confirmed facts and decisions only. Use
`decision_log.md` for rejected ideas, tradeoffs, and why a path was not chosen.
Use `agent_handoff.md` to record what the next phase needs.

## Role Modes

Use these modes as lightweight behavior frames, not separate agents:

- `Conductor`: plan next action, update tasks, judge phase transitions.
- `Literature Scout`: run `paper-finder`, screen relevance, update literature memory.
- `Idea Analyst`: run `paper-deep-note` and `research-gap-finder`.
- `Experiment Driver`: design, run, and summarize experiments; update ledger.
- `Paper Writer`: write sections using `paper-writing`, `survey-writer`, and `academic-plotting`.
- `Reviewer`: run `paper-reviewer` or `review-rebuttal`.

## Update Protocol

After any substantive task:

1. Append a dated entry to `.pipeline/memory/project_truth.md` only for confirmed progress.
2. Append rejected options or uncertainty to `.pipeline/memory/decision_log.md`.
3. Update `.pipeline/memory/agent_handoff.md` with next-step context.
4. Update `.pipeline/tasks/tasks.json` when a task status changes.

Do not claim a paper, citation, result, or benchmark exists unless it is backed
by a source, file, log, or user-provided evidence.

## Writing Preference

For paper writing, prefer this stack:

1. Oh-my-paper style project state and staged writing flow from this harness.
2. `paper-writing` for ML/AI narrative, sections, templates, and citations.
3. `academic-plotting` for Figure 1 and result figures.
4. `paper-reviewer` for harsh review.

Do not route normal drafting through ARS academic-paper. Use ARS-style reviewer
simulation only if a local ARS reviewer skill is installed or explicitly
requested.
