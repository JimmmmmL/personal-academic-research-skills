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
- Personal lightweight research skills: paper finding, deep reading notes, gap
  analysis, benchmark extraction, experiment summaries, surveys, weekly reports,
  and rebuttals.
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

## Core Skill Routing

| User intent | Skill |
|---|---|
| Start or resume a research project | `academic-research-harness` |
| Find papers / related work | `paper-finder` |
| Read one paper deeply | `paper-deep-note` |
| Analyze gaps or refine ideas | `research-gap-finder` |
| Extract benchmark tables | `benchmark-extractor` |
| Summarize experiment logs | `experiment-log-summarizer` |
| Write Chinese survey / related work | `survey-writer` |
| Write ML/AI paper sections | `paper-writing` |
| Write systems papers | `systems-paper-writing` |
| Create figures and plots | `academic-plotting` |
| Simulate reviewer feedback | `paper-reviewer` |
| Draft rebuttal | `review-rebuttal` |
| Prepare weekly lab update | `weekly-lab-update` |

## Installation

Clone this repo wherever you keep Codex skills:

```bash
git clone <this-repo-url> personal-academic-research-skills
```

If your Codex setup expects skills under a specific directory, copy or symlink
the subdirectories under `skills/` into that directory. For local development,
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
│   └── paper_bank.json
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
- update `references.bib` when citation material is verified.

### 2. Paper Reading And Gap Analysis

Use `paper-deep-note` for single-paper reading cards. Use
`research-gap-finder` after enough papers are collected. The intended flow is:

```text
paper-finder -> paper-deep-note -> research-gap-finder -> decision_log
```

The goal is to distinguish real gaps from gaps caused by incomplete reading.

### 3. Experiments

Record runs in `.pipeline/memory/experiment_ledger.md`. When logs become messy,
use `experiment-log-summarizer` to produce:

- confirmed results;
- possible explanations marked as hypotheses;
- current best configuration;
- failed runs and what they rule out;
- next experiment suggestions.

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
