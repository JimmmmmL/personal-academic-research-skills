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
- `direct`: follow the user's explicit instruction

## Context Discipline

This repo is the research control plane. Literature details, experiment code,
and paper drafts can all be large, so default to interface files before opening
deep folders.

- For literature, read `.pipeline/memory/literature_bank.md`,
  `.pipeline/docs/paper_bank.json`, and `.pipeline/docs/paper_notes.md` first.
- For experiments, read `.pipeline/docs/experiment_repos.md`,
  `.pipeline/memory/experiment_ledger.md`, and
  `.pipeline/docs/result_summary.md` first.
- For writing, read `.pipeline/docs/selected_idea.md`,
  `.pipeline/docs/result_summary.md`, and the specific `paper/` section the user
  asks about.
- Do not recursively read `literature/`, `results/`, `paper/`, or external
  experiment repositories unless the user asks for a specific topic, run,
  artifact, or section.

## Memory Rules

- `.pipeline/memory/project_truth.md` stores confirmed facts and decisions.
- `.pipeline/memory/literature_bank.md` stores human-readable papers.
- `.pipeline/docs/paper_bank.json` stores machine-readable paper metadata.
- `.pipeline/docs/paper_notes.md` stores concise paper notes.
- `.pipeline/docs/gap_matrix.md` stores evidence-grounded gaps and candidate ideas.
- `.pipeline/docs/selected_idea.md` stores the user-confirmed research direction.
- `.pipeline/docs/experiment_repos.md` stores external experiment repo entries
  and sync rules.
- `.pipeline/docs/result_summary.md` stores the current compact result story for
  decisions and writing.
- `.pipeline/memory/experiment_ledger.md` stores experiment configurations and results.
- `.pipeline/memory/review_log.md` stores review reports and major concerns.
- `.pipeline/memory/decision_log.md` stores rejected ideas and uncertainty.
- `.pipeline/memory/agent_handoff.md` stores what the next phase needs.
- `literature/<topic-name>/` stores topic-specific search outputs,
  summaries, discussions, PDFs, and topic-level BibTeX.
- `results/` stores lightweight copied artifacts only: compact result tables,
  selected logs, JSON/CSV summaries, and links to large external artifacts.

Experiment source code, checkpoints, datasets, raw logs, and generated caches
should stay in external experiment repositories by default. Use
`.pipeline/docs/experiment_repos.md` as the entry point, and include external
repo alias plus commit/hash for results that depend on code.

Do not fabricate citations, benchmark results, experiment outcomes, or venue
rules. Mark unverified items explicitly.

## Preferred Skill Routing

- Papers and related work: `paper-finder`
- Single-paper note: `paper-note`
- Gap and idea analysis: `research-gap-finder`
- Experiment logs: `experiment-log-summarizer`
- ML paper drafting: `paper-writing`
- Related work / Chinese survey: `survey-writer`
- Figures and plots: `academic-plotting`
- Peer review: `paper-reviewer`
- Rebuttal: `review-rebuttal`
