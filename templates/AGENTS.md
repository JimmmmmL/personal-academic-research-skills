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
- `idea`: analyze gap, deep-read papers, refine contribution
- `experiment`: design, run, and summarize experiments
- `writing`: draft paper sections and figures
- `review`: simulate review or draft rebuttal
- `direct`: follow the user's explicit instruction

## Memory Rules

- `.pipeline/memory/project_truth.md` stores confirmed facts and decisions.
- `.pipeline/memory/literature_bank.md` stores human-readable papers.
- `.pipeline/docs/paper_bank.json` stores machine-readable paper metadata.
- `.pipeline/memory/experiment_ledger.md` stores experiment configurations and results.
- `.pipeline/memory/review_log.md` stores review reports and major concerns.
- `.pipeline/memory/decision_log.md` stores rejected ideas and uncertainty.
- `.pipeline/memory/agent_handoff.md` stores what the next phase needs.

Do not fabricate citations, benchmark results, experiment outcomes, or venue
rules. Mark unverified items explicitly.

## Preferred Skill Routing

- Papers and related work: `paper-finder`
- Single-paper reading: `paper-deep-note`
- Gap and idea analysis: `research-gap-finder`
- Experiment logs: `experiment-log-summarizer`
- ML paper drafting: `paper-writing`
- Related work / Chinese survey: `survey-writer`
- Figures and plots: `academic-plotting`
- Peer review: `paper-reviewer`
- Rebuttal: `review-rebuttal`
