# Personal Academic Research Skills

Codex skills for academic research projects: literature search, paper reading,
gap analysis, experiment tracking, paper writing, figure generation, review, and
rebuttal drafting.

This repo is designed for lab use. It keeps the useful parts of several research
skill collections, but avoids merging everything into one large prompt. The main
principle is progressive disclosure: load a small router first, then read only
the specialized skill or reference file needed for the current task.

## What This Repo Combines

- Oh-my-paper style project memory: `.pipeline/`, staged research workflow,
  task state, literature bank, experiment ledger, review log, and handoff notes.
- Personal lightweight research skills: paper finding, concise paper notes, gap
  analysis, benchmark extraction, experiment summaries, surveys, and rebuttals.
- Selected AI-Research-SKILLs writing components: ML paper writing, systems
  paper writing, and academic plotting, with long guidance moved behind
  references.

ARS-style academic-paper drafting is not the default path here. Use
`paper-reviewer` for strict reviewer simulation and `review-rebuttal` for
response drafting.

## Repository Layout

```text
personal-academic-research-skills/
├── skills/
│   ├── academic-research-harness/   # project router and .pipeline protocol
│   ├── paper-finder/                # multi-angle paper discovery
│   ├── paper-writing/               # ML/AI paper drafting and citation checks
│   ├── academic-plotting/           # Figure 1, architecture diagrams, plots
│   ├── systems-paper-writing/       # OSDI/SOSP/ASPLOS/NSDI/EuroSys writing
│   ├── paper-reviewer/              # harsh pre-submission review
│   └── ...                          # focused reading, gap, survey, rebuttal skills
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

Use one project repo as the research control plane, plus external experiment
repos for large codebases:

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
│   │   ├── experiment_repos.md
│   │   └── result_summary.md
│   └── memory/
│       ├── literature_bank.md
│       ├── experiment_ledger.md
│       └── decision_log.md
├── literature/
├── results/
├── paper/
└── figures/

external-training-repo/
├── training code
├── configs
├── raw logs
└── checkpoints
```

The project repo should be small enough to open in Codex and publish on GitHub.
Keep training code, datasets, checkpoints, raw logs, and caches in external
experiment repos. Sync only the research evidence needed for decisions and
writing:

- external repo entry: `.pipeline/docs/experiment_repos.md`
- run-level facts: `.pipeline/memory/experiment_ledger.md`
- compact result story: `.pipeline/docs/result_summary.md`
- lightweight copied artifacts: `results/`

This avoids context pollution without making repo communication complicated.
Codex reads `.pipeline/` first, then opens a specific literature topic, result
artifact, paper section, or external repo commit only when the user asks.

## Core Skill Routing

| User intent | Skill |
|---|---|
| Start or resume a research project | `academic-research-harness` |
| Find papers / related work | `paper-finder` |
| Make a concise note for one paper | `paper-note` |
| Analyze gaps or refine ideas | `research-gap-finder` |
| Extract benchmark tables | `benchmark-extractor` |
| Summarize experiment logs | `experiment-log-summarizer` |
| Write Chinese survey / related work | `survey-writer` |
| Write ML/AI paper sections | `paper-writing` |
| Write systems papers | `systems-paper-writing` |
| Create figures and plots | `academic-plotting` |
| Simulate reviewer feedback | `paper-reviewer` |
| Draft rebuttal | `review-rebuttal` |

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
│   ├── experiment_repos.md
│   └── result_summary.md
├── memory/
│   ├── project_truth.md
│   ├── literature_bank.md
│   ├── experiment_ledger.md
│   ├── review_log.md
│   ├── decision_log.md
│   ├── agent_handoff.md
│   └── execution_context.md
└── tasks/
    └── tasks.json
literature/
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

### 2. Paper Reading And Gap Analysis

Use `paper-note` for concise single-paper notes. Use
`research-gap-finder` after enough papers are collected. The intended flow is:

```text
paper-finder -> paper-note -> research-gap-finder -> decision_log
```

The goal is to distinguish real gaps from gaps caused by incomplete reading.
Paper notes are synchronized to `.pipeline/docs/paper_notes.md`; the same
paper's machine-readable status and short insight summary are merged into
`.pipeline/docs/paper_bank.json`.
`research-gap-finder` then uses these files as evidence to summarize the
landscape, propose 2-4 candidate directions, flag missing evidence, and ask the
user whether to choose a direction, combine directions, or run `paper-finder`
for targeted follow-up. After user selection, it writes the result to
`.pipeline/docs/selected_idea.md`, `.pipeline/docs/gap_matrix.md`, and
`.pipeline/memory/decision_log.md`.

### 3. Experiments

For most research projects, keep the experiment implementation in a separate
repo. In the project repo, first register it in
`.pipeline/docs/experiment_repos.md`:

```markdown
| Alias | Repo | Role | Branch / Commit | Last Synced | Notes |
|---|---|---|---|---|---|
| main-exp | <github-or-relative-repo> | training and evaluation | main / abc1234 | 2026-06-07 | primary codebase |
```

Then record meaningful runs in `.pipeline/memory/experiment_ledger.md`. Each
entry should include the external repo alias, commit/hash, config, metric,
result, and any lightweight artifact saved under `results/`.

When logs become messy, use `experiment-log-summarizer` to produce:

- confirmed results;
- possible explanations marked as hypotheses;
- current best configuration;
- failed runs and what they rule out;
- next experiment suggestions;
- ledger entries and a compact `.pipeline/docs/result_summary.md` update.

Do not copy large checkpoints, datasets, full raw logs, or generated caches into
the project repo unless there is a specific reason. Prefer links, commit hashes,
small CSV/JSON summaries, selected log excerpts, and final result tables.

### 4. Paper Writing

For ML/AI papers, use `paper-writing`. It follows this order:

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

Citation rule: never write BibTeX from memory. Use `paper-finder` or
`paper-writing/references/citation-workflow.md` to verify citations. Unverified
citations should be explicit placeholders.

For systems venues, use `systems-paper-writing` instead.

### 5. Figures

Use `academic-plotting`:

- architecture, method overview, workflow diagrams: diagram mode;
- ablations, benchmark comparisons, training curves: data plot mode.

Numerical plots should be generated from saved data or logs, not invented from
paper prose.

### 6. Review And Rebuttal

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

The paper-writing, systems-writing, and academic-plotting pieces used most often
for academic output have already been compressed into this repo, so users do not
need to load the whole upstream library for normal writing tasks.

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
