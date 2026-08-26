# Academic Research Project

This project uses the personal academic research harness.

## Startup

When `.pipeline/` exists, first read:

- `.pipeline/docs/research_brief.json`
- `.pipeline/memory/project_truth.md`
- `.pipeline/memory/orchestrator_state.md`
- `.pipeline/memory/execution_context.md` if non-empty

Then ask what mode to use only when the next action is ambiguous:

- `planning`: inspect state and decide next task
- `literature`: find papers and update literature memory
- `idea`: analyze gap, make paper notes, refine contribution
- `experiment`: design, run, and summarize experiments
- `writing`: draft paper sections and figures
- `review`: simulate review or draft rebuttal
- `compact`: archive stale state and rewrite active project memory
- `direct`: follow the user's explicit instruction

## Context Discipline

This repo is the complete research workspace. Literature details, experiment
code, and paper drafts can all be large, so default to interface files before
opening deep folders.

- For literature, read `.pipeline/memory/literature_bank.md`,
  `.pipeline/docs/paper_bank.json`, and `.pipeline/docs/paper_notes.md` first.
- For experiments, read `.pipeline/docs/experiment_map.md`,
  `.pipeline/memory/experiment_ledger.md`, and
  `.pipeline/docs/result_summary.md` first.
- For writing, read `.pipeline/docs/selected_idea.md`,
  `.pipeline/docs/result_summary.md`, and the specific `paper/` section the user
  asks about.
- Do not recursively read `literature/`, `experiments/`, `meetings/`, `results/`,
  `paper/`, `figures/`, or `.pipeline/archive/` unless the user asks for a
  specific topic, component, run, artifact, meeting, section, or historical
  snapshot.

## Memory Rules

- `.pipeline/memory/project_truth.md` stores confirmed facts and decisions.
- `.pipeline/memory/literature_bank.md` stores human-readable papers.
- `.pipeline/docs/paper_bank.json` stores machine-readable paper metadata.
- `.pipeline/docs/paper_notes.md` stores concise paper notes.
- `.pipeline/docs/gap_matrix.md` stores evidence-grounded gaps and candidate ideas.
- `.pipeline/docs/selected_idea.md` stores the user-confirmed research direction.
- `.pipeline/docs/experiment_map.md` stores experiment component paths, origins,
  integration methods, and revisions.
- `.pipeline/docs/result_summary.md` stores the current compact result story for
  decisions and writing.
- `.pipeline/memory/experiment_ledger.md` stores experiment configurations and results.
- `.pipeline/memory/review_log.md` stores review reports and major concerns.
- `.pipeline/memory/decision_log.md` stores rejected ideas and uncertainty.
- `.pipeline/memory/agent_handoff.md` stores what the next phase needs.
- `.pipeline/archive/` stores lossless snapshots of superseded project memory
  and is cold storage, not startup context.
- `literature/<topic-name>/` stores topic-specific search outputs,
  summaries, discussions, PDFs, and topic-level BibTeX.
- `experiments/` stores first-party experiment code and mapped third-party
  baselines.
- `meetings/` stores raw meeting notes; durable decisions must be promoted into
  `.pipeline/memory/project_truth.md` or `decision_log.md`.
- `results/` stores lightweight copied artifacts only: compact result tables,
  selected logs, JSON/CSV summaries, and links to large artifacts.

Track first-party experiment source under `experiments/` in the top-level repo.
Keep checkpoints, datasets, raw logs, and generated caches ignored or in
artifact storage. Use `.pipeline/docs/experiment_map.md` as the entry point, and
include code path plus revision for results that depend on nested code.

Do not fabricate citations, benchmark results, experiment outcomes, or venue
rules. Mark unverified items explicitly.

## Preferred Skill Routing

- Papers and related work: `paper-finder`
- Single-paper note: `paper-note`
- Memory compaction: `compact-research-project`
- Figures and plots: `academic-plotting`
- Peer review: `paper-reviewer`
- Rebuttal: `review-rebuttal`

Perform idea analysis, experiment synthesis, benchmark extraction, surveys,
and drafting directly from the mapped project evidence; there is no dedicated
skill for those tasks in this suite.
