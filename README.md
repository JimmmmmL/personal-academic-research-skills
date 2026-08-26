# Personal Academic Research Skills

Codex skills for academic research projects: literature search, paper reading,
project memory, figure generation, review, and rebuttal drafting.

This repo is designed for lab use. It keeps the useful parts of several research
skill collections, but avoids merging everything into one large prompt. The main
principle is progressive disclosure: load a small router first, then read only
the specialized skill or reference file needed for the current task.

## What This Repo Combines

- Oh-my-paper style project memory: `.pipeline/`, staged research workflow,
  task state, literature bank, experiment ledger, review log, and handoff notes.
- Personal lightweight research skills: paper finding, concise paper notes,
  project-memory compaction, reviewer simulation, and rebuttals.
- A focused academic plotting skill with reproducible numerical plots,
  editable-first diagrams, reference-guided planning, and visual QA.

ARS-style academic-paper drafting is not the default path here. Use
`paper-reviewer` for strict reviewer simulation and `review-rebuttal` for
response drafting.

## Repository Layout

```text
personal-academic-research-skills/
├── skills/
│   ├── academic-research-harness/   # project router and .pipeline protocol
│   ├── compact-research-project/    # archive stale state and compact hot memory
│   ├── paper-finder/                # multi-angle paper discovery
│   ├── academic-plotting/           # Figure 1, architecture diagrams, plots
│   ├── paper-note/                  # concise notes for individual papers
│   ├── paper-reviewer/              # harsh pre-submission review
│   └── review-rebuttal/             # evidence-grounded rebuttal drafting
├── scripts/
│   ├── init_research_project.mjs
│   ├── session_context.mjs
│   └── update_task_state.mjs
├── templates/
└── references/
    └── external-skill-index.md
```

Inside each initialized research project, literature-search artifacts live under
`literature/<topic-name>/`, while cross-topic project memory stays in
`.pipeline/`.

## Recommended Project Topology

Use one top-level repo as the complete research workspace:

```text
my-paper-project/
├── AGENTS.md
├── .pipeline/
│   ├── docs/
│   │   ├── research_brief.json
│   │   ├── paper_bank.json
│   │   ├── paper_notes.md
│   │   ├── gap_matrix.md
│   │   ├── selected_idea.md
│   │   ├── experiment_map.md
│   │   └── result_summary.md
│   ├── memory/
│   │   ├── literature_bank.md
│   │   ├── experiment_ledger.md
│   │   └── decision_log.md
│   └── archive/                     # cold snapshots; never startup context
├── literature/
├── meetings/
├── experiments/
│   ├── src/                         # first-party code
│   ├── configs/
│   ├── scripts/
│   └── third_party/                 # selected baselines/dependencies
├── results/
├── figures/                         # figure source and working assets
└── paper/                           # LaTeX and exported paper figures
```

Track first-party experiment code in the top-level repo. This gives Codex one
project boundary for decisions, implementation, results, and writing. Keep the
Git repository small by ignoring datasets, checkpoints, raw logs, caches, and
large generated outputs rather than moving the whole experiment implementation
to another workspace.

- experiment component map: `.pipeline/docs/experiment_map.md`
- run-level facts: `.pipeline/memory/experiment_ledger.md`
- compact result story: `.pipeline/docs/result_summary.md`
- decision-relevant artifacts: `results/`

For third-party code under `experiments/third_party/`:

- use a Git submodule when following upstream commits matters;
- use a Git subtree or vendor copy when atomic checkout and local modification
  matter more;
- do not use a nested untracked clone, because the top-level repo cannot record
  which code version produced a result.

For an existing project, migrate `.pipeline/docs/experiment_repos.md` into
`experiment_map.md` once, verify every result still has a path and revision,
then preserve the old file in the first compaction snapshot.

For `paper/`, prefer normal top-level tracking. If Overleaf must support
bidirectional collaborative editing, make `paper/` the one intentional
submodule, or use a documented subtree/sync workflow. Declare one source of
truth; do not casually edit both sides.

Context control comes from `.pipeline/` being compact hot memory and from not
recursively opening deep folders. Historical state lives under
`.pipeline/archive/` and is loaded only through explicit pointers.

## Core Skill Routing

| User intent | Skill |
|---|---|
| Start or resume a research project | `academic-research-harness` |
| Find papers / related work | `paper-finder` |
| Make a concise note for one paper | `paper-note` |
| Archive stale state / compact context | `compact-research-project` |
| Create figures and plots | `academic-plotting` |
| Simulate reviewer feedback | `paper-reviewer` |
| Draft rebuttal | `review-rebuttal` |

Gap analysis, experiment synthesis, benchmark extraction, surveys, and paper
drafting remain normal research tasks, but this suite no longer installs thin
single-purpose skills for them. Handle them directly from the project evidence
or add a focused skill later if repeated use demonstrates a concrete need.

## Installation

Clone this repo wherever you keep Codex skills:

```bash
git clone <this-repo-url> personal-academic-research-skills
```

If your Codex setup expects skills under a specific directory, copy or symlink
the subdirectories under `skills/` into that directory. 

```bash
cp -r personal-academic-research-skills/skills/* ~/.codex/skills/
```

or if you are using Claude Code, 

```bash
cp -r personal-academic-research-skills/skills/* ~/.claude/skills/
```

For local development,
you can also keep this repo as a standalone skill source and reference paths
from your Codex configuration.

This repo uses Node.js scripts for project initialization. Check Node.js:

```bash
node --version
```

No npm install is required for the built-in scripts.

## Starting A Research Project

From the root of a research project, run:

```bash
node ../personal-academic-research-skills/scripts/init_research_project.mjs \
  --topic "your research topic" \
  --stage survey \
  --venue ICLR
```

Adjust the relative path if this skills repo lives elsewhere.

The script creates:

```text
.pipeline/
├── docs/
│   ├── research_brief.json
│   ├── paper_bank.json
│   ├── paper_notes.md
│   ├── gap_matrix.md
│   ├── selected_idea.md
│   ├── experiment_map.md
│   └── result_summary.md
├── memory/
│   ├── project_truth.md
│   ├── literature_bank.md
│   ├── experiment_ledger.md
│   ├── review_log.md
│   ├── decision_log.md
│   ├── agent_handoff.md
│   └── execution_context.md
├── tasks/
│   └── tasks.json
└── archive/
    └── index.md
literature/
experiments/
meetings/
results/
paper/
figures/
AGENTS.md
```

After initialization, open the project in Codex and ask naturally, for example:

```text
帮我找一下这个方向最近两年的相关工作
```

or:

```text
基于现在的 experiment_ledger，总结一下结果并判断下一步实验
```

Codex should read `AGENTS.md`, detect `.pipeline/`, and route through the
appropriate skill.

## Typical Workflows

### 1. Literature Survey

Ask for related work or paper search. `paper-finder` will:

- search multiple sources;
- run direct, cross-domain synonym, mechanism-level, and application-framing
  search angles;
- record papers in `.pipeline/memory/literature_bank.md`;
- maintain machine-readable metadata in `.pipeline/docs/paper_bank.json`;
- create or update topic-specific folders under `literature/<topic-name>/`;
- update `references.bib` when citation material is verified.

### 2. Paper Reading And Idea Analysis

Use `paper-note` for concise single-paper notes. Once enough evidence is
collected, analyze candidate directions directly from the paper bank, notes,
and literature memory. The intended evidence flow is:

```text
paper-finder -> paper-note -> evidence comparison -> decision_log
```

The goal is to distinguish real gaps from gaps caused by incomplete reading.
Paper notes are synchronized to `.pipeline/docs/paper_notes.md`; the same
paper's machine-readable status and short insight summary are merged into
`.pipeline/docs/paper_bank.json`.
Use `paper-finder` for targeted follow-up whenever a claimed gap lacks evidence.
After user selection, record the result in `.pipeline/docs/selected_idea.md`,
`.pipeline/docs/gap_matrix.md`, and `.pipeline/memory/decision_log.md`.

### 3. Experiments

Keep the primary implementation under `experiments/` and register each
component in `.pipeline/docs/experiment_map.md`:

```markdown
| Name | Path | Role | Origin | Integration | Revision | Notes |
|---|---|---|---|---|---|---|
| main | experiments/ | training and evaluation | project | top-level repo | HEAD | primary codebase |
| baseline-x | experiments/third_party/baseline-x | comparison | upstream URL | submodule | abc1234 | patched locally |
```

Then record meaningful runs in `.pipeline/memory/experiment_ledger.md`. Each
entry should include the code path, revision, config, metric, result, and any
lightweight artifact saved under `results/`.

When logs become messy, synthesize them directly into:

- confirmed results;
- possible explanations marked as hypotheses;
- current best configuration;
- failed runs and what they rule out;
- next experiment suggestions;
- ledger entries and a compact `.pipeline/docs/result_summary.md` update.

Do not commit large checkpoints, datasets, full raw logs, or generated caches.
Prefer artifact-store links, revisions, small CSV/JSON summaries, selected log
excerpts, and final result tables.

### 4. Memory Compaction

Use `compact-research-project` when `.pipeline/` has accumulated abandoned
directions, completed experiment cycles, duplicated notes, or stale handoffs.
The skill:

- audits active memory size;
- classifies state as hot, warm, or cold;
- preserves exact originals in
  `.pipeline/archive/YYYY-MM-DD-<slug>/`;
- rewrites canonical memory around the active direction;
- adds archive pointers and verifies that a fresh agent can recover the next
  action without loading history.

Compaction is not deletion. Normal startup must ignore `.pipeline/archive/`.
Open an archive snapshot only when a canonical file points to it or historical
detail is needed.

### 5. Paper Writing

Draft from confirmed project evidence in this order when it fits the paper:

```text
one-sentence contribution
-> Figure 1 plan
-> abstract
-> introduction
-> method
-> experiments
-> related work
-> limitations / checklist / citation audit
```

Citation rule: never write BibTeX from memory. Use `paper-finder` or an
authoritative source to verify citations. Unverified citations should be
explicit placeholders. Venue-specific drafting does not have a dedicated skill
in this suite.

### 6. Figures

Use `academic-plotting`:

- architecture, method overview, workflow diagrams: editable-first diagram
  mode with reference-guided planning and visual critique;
- ablations, benchmark comparisons, training curves: reproducible data-plot
  mode with source data, vector export, and final-size QA.

Numerical plots should be generated from saved data or logs, not invented from
paper prose.

The current workflow incorporates the reference-planning-critique loop from
[PaperVizAgent](https://github.com/google-research/papervizagent), the
editable-SVG direction from
[AutoFigure-Edit](https://github.com/ResearAI/AutoFigure-Edit), and optionally
[SciencePlots](https://github.com/garrettj403/SciencePlots) as a Matplotlib
style baseline. See
[`skills/academic-plotting/references/tooling.md`](skills/academic-plotting/references/tooling.md)
for selection criteria and limitations.

### 7. Review And Rebuttal

Before submission, use `paper-reviewer` for a harsh reviewer-style pass. After
real reviews arrive, use `review-rebuttal` to classify concerns and draft a
professional response without inventing missing experiments.

Weekly or meeting updates are handled on demand in the interactive session:
ask Codex to summarize the current `.pipeline/` state, experiment ledger,
paper notes, or decision log into the format you need. There is no separate
weekly skill or persistent weekly-report artifact.

## Using AI-Research-SKILLs

This repo intentionally does not vendor the full
[AI-Research-SKILLs](https://github.com/Orchestra-Research/AI-Research-SKILLs.git)
repository. That upstream repo contains many useful implementation skills, but
loading or copying all of them makes the skill set noisy and context-heavy.

Recommended setup:

```bash
git clone https://github.com/Orchestra-Research/AI-Research-SKILLs.git
```

Place it next to this repo when possible:

```text
workspace/
├── personal-academic-research-skills/
└── AI-Research-SKILLs/
```

When a task needs a specific implementation stack, read
`references/external-skill-index.md` and then open only the matching upstream
skill. Examples:

- LoRA / PEFT fine-tuning: `AI-Research-SKILLs/03-fine-tuning/peft/SKILL.md`
- distributed training: `AI-Research-SKILLs/08-distributed-training/*/SKILL.md`
- vLLM / SGLang serving: `AI-Research-SKILLs/12-inference-serving/*/SKILL.md`
- RAG / vector databases: `AI-Research-SKILLs/15-rag/*/SKILL.md`
- evaluation harnesses: `AI-Research-SKILLs/11-evaluation/*/SKILL.md`

Academic plotting is maintained locally. Other writing or implementation
guidance should be loaded only when a concrete task needs it.

## Maintaining The Repo

Keep `SKILL.md` files short. Put long details in `references/` and only load
them when the current task needs them.

Avoid committing project-specific `.pipeline/`, generated papers, LaTeX build
artifacts, local paths, API keys, or private experiment data.

Before publishing, run checks for private paths and secrets:

```bash
rg -n "PRIVATE_PATH|LOCAL_ONLY|API_KEY|TOKEN|SECRET" .
```

Also inspect recently edited files for machine-specific paths before pushing.
