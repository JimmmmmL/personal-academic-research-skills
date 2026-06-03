---
name: research-gap-finder
description: Analyze research gaps and candidate ideas from an active academic project after papers have been found and deep-read. Use when the input is a .pipeline project repo, paper_bank.json, paper_digests.md, literature_bank.md, a set of paper-deep-note outputs, or the user's early idea, and the user needs grounded gap analysis, idea generation, novelty-threat checks, feasibility ranking, problem framing, experiment hypotheses, or updates to gap_matrix and decision_log without forced novelty claims.
---

# Research Gap Finder

用这个 skill 在已经完成部分/全部 `paper-finder` 和 `paper-deep-note` 工作后，基于项目证据分析 research gaps 和可做的 ideas。目标不是“脑暴创新点”，而是把已读论文中的覆盖面、矛盾、弱证据、未验证假设和实验缺口收敛成少量可验证的研究方向。

## Grounding Contract

- 优先使用项目内证据：`.pipeline/docs/paper_digests.md`、`.pipeline/docs/paper_bank.json`、`.pipeline/memory/literature_bank.md`、`.pipeline/docs/research_brief.json`。
- 每个 gap 都必须指向支持它的证据来源：具体论文、digest 结论、实验弱点、争议点、benchmark 缺口或用户确认的 project truth。
- 区分 `confirmed gap`、`plausible gap`、`engineering opportunity`、`evaluation gap`、`reading gap`、`weak idea`。
- 不要把“我没看到有人做”当作 novelty。默认把 novelty 当成待验证，除非有充分搜索和对照。
- 候选 idea 必须可验证：给出最小实验、关键 baseline、失败判据和最大风险。

## Core Workflow

1. Detect project mode. If `.pipeline/` exists, read only:
   - `.pipeline/docs/research_brief.json`
   - `.pipeline/docs/paper_bank.json`
   - `.pipeline/docs/paper_digests.md`
   - `.pipeline/memory/literature_bank.md`
   - `.pipeline/memory/project_truth.md`
   - `.pipeline/memory/decision_log.md`
2. Determine evidence maturity:
   - `low`: fewer than 5 relevant papers or mostly abstract-level notes.
   - `medium`: 5-15 papers with several deep notes and visible taxonomy.
   - `high`: enough deep notes to compare methods, datasets, baselines, and failure modes.
3. Build a coverage map: problems, method families, datasets/benchmarks, metrics, assumptions, failure modes, and claimed limitations.
4. Read `references/problem_framing_template.md` when the problem boundary is fuzzy. Read `references/gap_analysis_template.md` before writing the final analysis.
5. Generate 2-5 candidate gaps/ideas. Keep them meaningfully different, not small variants of the same angle.
6. Evaluate each candidate with a lightweight quality gate: clarity, novelty threat, validity, feasibility, significance, and evidence strength.
7. Rank candidates into:
   - `pursue`: worth turning into experiment plan.
   - `verify-first`: promising but needs targeted paper search or one sanity experiment.
   - `park`: useful background but not current priority.
   - `reject`: likely covered, too weak, or infeasible.
8. In project mode, update `.pipeline/docs/gap_matrix.md`, `.pipeline/memory/decision_log.md`, and `.pipeline/memory/agent_handoff.md`.

## Evidence Inputs

Use `paper_bank.json` fields to filter papers:

- Prioritize `status`: `analyzed`, `summarized`, `accepted`, then `candidate`.
- Downweight papers with `evidenceLevel`: `metadata` or `abstract`.
- Use `analysis.projectUse`, `analysis.mainClaim`, `analysis.readingPriority`, `topics`, `notes`, and `relevance` when present.

Use `paper_digests.md` to extract:

- repeated limitations across papers;
- claims with weak or narrow evidence;
- missing ablations or unfair baselines;
- dataset/metric mismatch;
- unresolved contradictions between papers;
- opportunities to combine mechanisms only if the combination answers a clear research question.

If there is not enough evidence, output a preliminary gap map and explicitly request the next `paper-finder` or `paper-deep-note` targets.

## Gap Types

Label each candidate as one primary type:

- `capability gap`: current methods fail on a clearly defined capability or setting.
- `mechanism gap`: papers use a component but do not explain/test why it works.
- `evaluation gap`: benchmarks or metrics do not measure the actual claimed ability.
- `assumption gap`: common assumptions are unrealistic, brittle, or untested.
- `data gap`: data distribution, annotation, contamination, scale, or domain shift issue.
- `efficiency gap`: compute, memory, latency, or deployment constraints are underexplored.
- `theory/analysis gap`: empirical behavior lacks explanation or formal characterization.
- `negative-result gap`: a plausible approach likely fails but the failure is informative.

## Candidate Quality Gate

Score only when evidence is sufficient; otherwise use `N/A`.

| Dimension | Question |
|---|---|
| Clarity | Is the research question specific enough to implement and test? |
| Novelty threat | Which existing papers might already cover it? Is overlap critical/high/moderate/low/unverified? |
| Validity | Does the proposed mechanism plausibly address the bottleneck? |
| Feasibility | Can the project test it with available data, compute, code, and time? |
| Significance | If it works, would it change method design, evaluation practice, or paper framing? |
| Evidence strength | Is the gap grounded in multiple papers, one strong paper, or only intuition? |

Novelty threat labels:

- `critical_overlap`: same method and same problem appears covered.
- `high_overlap`: most contributions are covered by one or more papers.
- `moderate_overlap`: components exist separately; delta needs sharpening.
- `low_overlap`: only adjacent work found in current evidence.
- `unverified`: current evidence is insufficient; targeted search required.

If `critical_overlap` or `high_overlap` appears, do not discard silently. Record it in `decision_log.md` with the overlapping papers and possible refinements.

## Project Pipeline Mode

Append or update `.pipeline/docs/gap_matrix.md` with:

```markdown
## YYYY-MM-DD Gap Analysis

### Evidence Snapshot
- Topic:
- Papers considered:
- Deep notes considered:
- Evidence maturity: low / medium / high

### Coverage Map
| Axis | Covered | Weak / Missing | Evidence |
|---|---|---|---|

### Candidate Gap Matrix
| ID | Type | Gap / Idea | Evidence | Novelty Threat | Feasibility | Decision | Next Test |
|---|---|---|---|---|---|---|---|

### Recommended Next Steps
1.
2.
3.
```

Append `.pipeline/memory/decision_log.md` for:

- rejected gaps and why;
- overlap risks;
- assumptions that need targeted paper search;
- user-selected direction when the user confirms one.

Update `.pipeline/memory/agent_handoff.md` with the next action:

- papers to find/read next;
- one sanity experiment to run;
- candidate direction to refine;
- writing implications if the idea is already mature.

Do not write confirmed claims to `project_truth.md` unless they are directly backed by project evidence or user confirmation.

## Output Rules

- Default output: coverage map, 2-5 candidate gaps, quality-gate table, recommended next step.
- If the user asks “有没有 idea 可以做”, present candidates but do not overclaim novelty.
- If evidence maturity is low, lead with “当前只能做 preliminary gap map”.
- If the user has an idea, evaluate it first, then optionally generate alternatives.
- Ask for user selection before converting a candidate into a final publishable angle or experiment plan.
