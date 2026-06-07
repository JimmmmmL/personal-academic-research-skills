---
name: research-gap-finder
description: Interactive research-gap and idea-convergence skill for an active academic project after papers have been found and noted. Use when the input is a .pipeline project repo, paper_bank.json, paper_notes.md, literature_bank.md, topic-folder notes, or a user's early idea, and the user wants to reason step by step about what is worth doing, compare candidate research directions, identify missing evidence, trigger paper-finder for targeted follow-up searches, select a direction, or update gap_matrix, decision_log, and agent_handoff without forced novelty claims.
---

# Research Gap Finder

用这个 skill 基于现有 literature 和 paper notes，和用户一步一步讨论“什么东西值得做”。它不是一次性替用户生成最终 idea，而是先整理证据、提出少量候选方向、指出哪些地方证据不足、必要时回到 `paper-finder` 补检索，然后让用户选择或组合方向。

核心原则来自 ideation workflow：**diverge then converge**。先给 2-4 个差异化候选，再设置用户 checkpoint。不要跳过用户选择。

## Grounding Contract

- 优先使用项目内证据：`.pipeline/docs/paper_notes.md`、`.pipeline/docs/paper_bank.json`、`.pipeline/memory/literature_bank.md`、`.pipeline/docs/research_brief.json`、`literature/<topic-name>/memory-bank.md`。
- 每个候选方向必须说明证据来源、缺失证据、可能重合的已有工作、最小验证实验。
- 不要把“当前没看到”写成“没人做过”。默认 novelty 是待验证。
- 如果关键证据不足，先提出 targeted paper-finder queries，而不是硬造 gap。
- 不要替用户最终拍板。必须在候选方向对比后停下，等待用户选择、组合、否定或要求补检索。

## Core Workflow

### Step 1: Read Project Evidence

If `.pipeline/` exists, read:

```
.pipeline/docs/research_brief.json
.pipeline/docs/paper_bank.json
.pipeline/docs/paper_notes.md
.pipeline/memory/literature_bank.md
.pipeline/memory/project_truth.md
.pipeline/memory/decision_log.md
.pipeline/docs/gap_matrix.md if present
```

Also inspect `literature/<topic-name>/memory-bank.md` or summaries only when the current topic needs more detail.

If the user gives a specific idea, evaluate that idea first and then generate alternatives.

### Step 2: Diagnose Evidence Maturity

Label the current evidence:

- `low`: fewer than 5 relevant papers, mostly metadata/abstract notes, or no clear baselines.
- `medium`: several paper notes and a visible taxonomy, but missing recent or mechanism-level coverage.
- `high`: enough notes to compare methods, datasets, baselines, limitations, and failure modes.

If evidence is `low`, generate a preliminary map plus targeted `paper-finder` tasks. Do not present strong novelty claims.

### Step 3: Build A Compact Landscape

Summarize only what affects ideation:

- problem variants and task settings;
- method families and representative papers;
- baselines and benchmarks;
- repeated limitations or untested assumptions;
- evaluation weaknesses;
- places where papers disagree;
- project constraints: compute, timeline, data, target venue, user preference.

### Step 4: Generate 2-4 Candidate Directions

Generate 2-4 candidates, no more unless the user asks. Candidates should be meaningfully different:

- conservative baseline/ablation direction;
- mechanism or method direction;
- evaluation/benchmark direction;
- negative-result or boundary-case direction;
- bolder new framing if evidence supports it.

For each candidate include:

- name;
- core idea in 1-2 sentences;
- research question;
- evidence from existing literature;
- what is missing or uncertain;
- required follow-up paper search, if any;
- minimum experiment or sanity check;
- likely baselines;
- feasibility and risk;
- why it might be publishable or why it may only be a workshop/internal direction.

### Step 5: Quality Gate

Evaluate candidates lightly, not as a full reviewer report:

| Dimension | Check |
|---|---|
| Clarity | Is the research question concrete enough to test? |
| Novelty threat | Which papers may already cover it? critical / high / moderate / low / unverified |
| Validity | Does the idea plausibly address the bottleneck? |
| Feasibility | Can the project test it with available data, compute, code, and time? |
| Significance | If it works, would it change method design, evaluation, or framing? |
| Evidence need | What exact paper search or note is needed before committing? |

If novelty threat is `critical` or `high`, present the overlap and suggest refinements or abandonment. If novelty is `unverified`, propose search queries for `paper-finder`.

### Step 6: User Checkpoint

Stop after presenting candidates and ask the user to choose:

```markdown
## 需要你确认
1. 你倾向哪个方向？
2. 是否要组合两个方向？
3. 哪个风险你最担心？
4. 是否先启动 paper-finder 补查某个证据缺口？
```

Do not write a final publishable angle or experiment plan before the user responds.

### Step 7: Converge After User Selection

Only after user selection:

1. Write or append `.pipeline/docs/gap_matrix.md`.
2. Write selected direction to `.pipeline/docs/selected_idea.md`.
3. Append selection reasoning, rejected directions, and evidence gaps to `.pipeline/memory/decision_log.md`.
4. Update `.pipeline/memory/agent_handoff.md` with the next action:
   - run `paper-finder` with specific queries;
   - make notes for specific papers using `paper-note`;
   - run a sanity experiment;
   - refine writing/framing.

Do not write confirmed claims to `project_truth.md` unless backed by files or explicit user confirmation.

## Targeted Paper-Finder Handoff

When evidence is insufficient, output concrete search tasks:

```markdown
## 建议补充检索
- Query:
- Why needed:
- What would change if found:
- Search angles:
  - direct concept:
  - mechanism:
  - application/framing:
  - venue/year:
```

Then ask whether to run `paper-finder`. If the user says yes, route to `paper-finder`; after new papers are noted, rerun this skill.

## Output Shape Before User Selection

Default pre-selection output:

```markdown
# Gap / Idea Exploration

## Evidence Snapshot

## Current Landscape

## Candidate Directions
### Direction A
...

## Comparison Table

## Missing Evidence / Paper-Finder Tasks

## 需要你确认
...
```

## Output Shape After User Selection

Default post-selection output:

```markdown
# Selected Research Direction

## Direction
## Core Question
## Why This Is Worth Doing
## Evidence Base
## Novelty Threats
## Minimum Experiment
## Baselines
## Risks
## Next Actions
## Rejected / Parked Directions
```

## References

- Read `references/problem_framing_template.md` when the problem boundary is fuzzy.
- Read `references/gap_analysis_template.md` before writing `gap_matrix.md` or `selected_idea.md`.
