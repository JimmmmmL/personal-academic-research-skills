---
name: compact-research-project
description: Archive stale or superseded academic-research state and compact the active `.pipeline/` memory without losing provenance. Use when a long-running project has accumulated abandoned directions, oversized decision logs, obsolete handoffs, old experiment runs, duplicated paper notes, or enough context that agents repeatedly load irrelevant history.
---

# Compact Research Project

Reduce the active research context while preserving a lossless, searchable
history under `.pipeline/archive/`.

## Safety Rules

- Treat compaction as a semantic migration, not a deletion pass.
- Copy or move the exact pre-compaction source into a dated archive before
  rewriting any canonical file.
- Preserve confirmed facts, evidence pointers, unresolved questions, active
  tasks, current best results, and decision rationales.
- Never convert a hypothesis into a confirmed fact while summarizing.
- Keep large datasets, checkpoints, caches, and raw logs in their existing
  artifact locations; archive only project memory and small research records.
- Do not compact files merely because they are old. Archive them when they are
  superseded, inactive, duplicated, or irrelevant to the current direction.

## Workflow

1. Read `.pipeline/docs/research_brief.json`,
   `.pipeline/memory/project_truth.md`, the current
   `.pipeline/docs/selected_idea.md`, and active task state.
2. Run `node <skill-dir>/scripts/audit_pipeline.mjs` from the project root to
   identify large active-memory files. Treat its thresholds as prompts for
   inspection, not automatic archive decisions.
3. Classify material:
   - `hot`: required for the current direction or next two to three actions;
   - `warm`: still plausible or decision-relevant, but not needed at startup;
   - `cold`: superseded directions, completed runs, stale handoffs, duplicated
     notes, and resolved discussions.
4. Create `.pipeline/archive/YYYY-MM-DD-<slug>/`.
5. Preserve the original versions under the snapshot directory using their
   relative paths, for example
   `.pipeline/archive/2026-06-20-direction-reset/memory/decision_log.md`.
6. Add `manifest.md` to the snapshot with:
   - reason and scope;
   - files preserved;
   - active direction at compaction time;
   - facts and decisions retained in hot memory;
   - pointers from rewritten files to archived detail.
7. Rewrite the active canonical files around the current project state.
8. Append the snapshot to `.pipeline/archive/index.md`.
9. Re-read the compacted files as a fresh agent would. Verify that the next
   action, current evidence, unresolved risks, and provenance are recoverable
   without opening the archive.

## Hot-Memory Contract

Keep these files compact and current:

- `project_truth.md`: confirmed project facts and durable decisions only.
- `execution_context.md`: one current task, acceptance criteria, blockers, and
  immediate file pointers.
- `agent_handoff.md`: current state and the next two to three actions.
- `selected_idea.md`: active research claim, mechanism, scope, and open risks.
- `result_summary.md`: decision-relevant findings, current best result, negative
  evidence, and artifact pointers.
- `decision_log.md`: unresolved decisions plus short retained rationales for
  rejected directions that could otherwise be repeated.
- `experiment_ledger.md`: active and comparison-critical runs; move completed
  run history into a snapshot while retaining stable run IDs and pointers.
- `paper_notes.md`: concise notes for papers relevant to the active direction;
  retain complete metadata in `paper_bank.json` or topic-level literature files.

Use these default review targets, adjusting when the project genuinely needs
more detail:

| File | Review when larger than |
|---|---:|
| `execution_context.md` | 80 lines |
| `agent_handoff.md` | 100 lines |
| `project_truth.md` | 180 lines |
| `selected_idea.md` | 180 lines |
| `result_summary.md` | 240 lines |
| `decision_log.md` | 300 lines |
| `experiment_ledger.md` | 500 lines |
| `paper_notes.md` | 800 lines |

## Archive Boundaries

Archive `.pipeline/` memory aggressively when it is cold. Leave
`literature/`, `meetings/`, `experiments/`, `paper/`, `figures/`, and
`results/` in place by default because the harness should not load them
recursively. Move material from those folders only when the user explicitly
asks for repository cleanup, and preserve paths or add redirects when other
files reference them.

Prefer one snapshot for one coherent transition, such as:

- `direction-reset`
- `post-submission`
- `completed-ablation-cycle`
- `literature-prune`

Do not create an archive snapshot for trivial formatting edits.
