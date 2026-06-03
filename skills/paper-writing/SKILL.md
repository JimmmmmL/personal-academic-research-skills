---
name: paper-writing
description: Write and revise ML/AI conference papers from a research repo, experiment results, pipeline memory, or existing LaTeX draft. Use for NeurIPS, ICML, ICLR, ACL, AAAI, COLM paper drafting, section rewriting, contribution framing, citation verification, LaTeX template setup, camera-ready cleanup, and resubmission formatting. For systems venues, use systems-paper-writing when available.
metadata:
  version: "0.1.0"
  derived_from: "AI-Research-SKILLs/20-ml-paper-writing/ml-paper-writing"
---

# Paper Writing

This is the concise writing router for ML/AI papers. It preserves the useful
parts of AI-Research-SKILLs while keeping the entry file small.

## First Rules

- Do not fabricate citations, benchmark numbers, ablation results, or venue rules.
- Never write BibTeX from memory. Use `paper-finder` or
  `references/citation-workflow.md`.
- If the repo and results are clear, draft concrete text proactively and flag
  uncertainties with the draft.
- If `.pipeline/` exists, read its memory before writing.

## Inputs To Inspect

For an active harness project, read only what is needed:

- `.pipeline/memory/project_truth.md`
- `.pipeline/docs/result_summary.md` or `.pipeline/memory/experiment_ledger.md`
- `.pipeline/memory/literature_bank.md`
- `.pipeline/docs/paper_bank.json`
- existing `paper/`, `sections/`, `main.tex`, `references.bib`

For a normal research repo, inspect README, results, configs, logs, figures, and
existing `.bib` files. Use `rg` to find result summaries, citations, and claims.

## Mode Router

| Need | Read |
|---|---|
| From repo/results to first draft | `references/writing-guide.md`, then relevant result files |
| Contribution framing, abstract, introduction | `references/writing-guide.md` |
| Adding or checking citations | `references/citation-workflow.md` |
| Venue checklist / reproducibility / limitations | `references/checklists.md` |
| Anticipating reviewer concerns | `references/reviewer-guidelines.md` |
| Full bibliography of writing sources | `references/sources.md` |
| Template setup | `templates/README.md`, then the selected template dir |

Do not read all references by default.

## Core Workflow

1. Identify the one-sentence contribution.
2. Confirm or infer the target venue and paper type.
3. Build a claims-to-evidence map:
   - claim
   - supporting experiment/result/source
   - section where it appears
   - citation or file evidence
4. Draft or revise the requested section.
5. Mark unverified citations as explicit placeholders.
6. Update `.pipeline/memory/agent_handoff.md` if the harness is active.

## Complete Paper Order

When asked for a full ML/AI paper:

1. Figure 1 plan and caption.
2. Abstract using the five-sentence formula.
3. Introduction with 2-4 concrete contributions.
4. Method with enough detail for reimplementation.
5. Experiments with claim-by-claim evidence.
6. Related work organized by method family, not paper-by-paper.
7. Limitations and reproducibility notes.
8. Checklist and citation audit.

Use `academic-plotting` for Figure 1 and result figures. Use `paper-reviewer`
for a harsh pass after a full draft exists.

## Citation Discipline

Before adding a new citation:

1. Search with `paper-finder` or an external bibliographic API.
2. Verify the paper exists.
3. Fetch BibTeX programmatically when possible.
4. Verify the cited claim is supported by the source.
5. Add to `references.bib` and `paper_bank.json`.

If any step fails, write a visible placeholder and tell the user what remains
unverified.

## Template Policy

Bundled templates are selected defaults only: `neurips2025`, `icml2026`, and
`iclr2026`. For ACL, AAAI, COLM, or current-year CFP changes, verify current
official venue requirements before final submission.

When converting venues, start from the target template and move content sections
over. Do not merge old and new LaTeX preambles.
