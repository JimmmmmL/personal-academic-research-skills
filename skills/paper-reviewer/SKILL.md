---
name: paper-reviewer
description: Simulate a strict ML/AI or systems paper reviewer. Use when the user has a draft, LaTeX project, paper sections, abstract, experiment summary, or camera-ready version and wants harsh review, accept/reject risk, missing experiments, citation issues, clarity problems, or reviewer-style comments before submission.
metadata:
  version: "0.1.0"
---

# Paper Reviewer

Review the paper as a skeptical but fair conference reviewer. This skill covers
the useful reviewer-simulation role without loading the full ARS suite.

## Inputs

Read the available draft and evidence:

- `main.tex`, `paper/*.tex`, `sections/*.tex`, or pasted draft text
- `references.bib`
- `.pipeline/memory/project_truth.md`
- `.pipeline/docs/result_summary.md`
- `.pipeline/memory/experiment_ledger.md`
- `.pipeline/memory/literature_bank.md`

Do not assume missing experiments, citations, or results exist.

## Review Dimensions

Score each from 1-5:

- Technical contribution
- Evidence and experiment sufficiency
- Novelty and positioning
- Reproducibility
- Writing clarity
- Citation accuracy
- Scope and limitations

## Required Checks

- Are abstract/introduction claims supported by results?
- Are baselines fair and strong enough?
- Are ablations, error bars, seeds, and compute details sufficient?
- Does related work clearly distinguish the contribution?
- Are citations present in `references.bib` and relevant to the claim?
- Are limitations honest and not fatal to the main claim?
- Are figures readable and captions self-contained?

## Output

Default output:

1. Overall recommendation: strong reject / reject / borderline / accept / strong accept.
2. Score table.
3. Major issues that must be fixed.
4. Minor issues.
5. Missing experiments or analyses.
6. Citation and positioning risks.
7. Concrete revision plan.

If `.pipeline/` exists, append or prepare content for
`.pipeline/memory/review_log.md`.
