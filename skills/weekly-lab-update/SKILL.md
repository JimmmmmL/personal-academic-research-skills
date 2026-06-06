---
name: weekly-lab-update
description: Generate a pipeline-aware weekly academic research update from a .pipeline project repo, paper reading notes, experiment ledger, result summaries, gap matrix, decision log, task state, or user notes. Use when the user needs a Chinese weekly report, Chinese group-meeting outline, English brief, lab update, progress summary, next-week plan, or a concise explanation of what changed across literature review, experiments, idea shifts, writing, review, or blockers.
---

# Weekly Lab Update

用这个 skill 把 `.pipeline/` 里的项目状态和用户补充笔记整理成周报、组会提纲和英文简版汇报。重点不是流水账，而是回答：本周项目发生了什么变化，哪些结论已经确认，哪些只是初步假设，下周要交付什么，以及需要讨论什么。

## 输出模式

- 中文周报
- 中文组会提纲
- 英文简版汇报

如果用户没有指定，默认输出中文周报，并附一版简短组会提纲。

## Pipeline Reading Strategy

If `.pipeline/` exists, default to project mode. Read these first:

```
.pipeline/docs/research_brief.json
.pipeline/memory/project_truth.md
.pipeline/memory/agent_handoff.md
.pipeline/tasks/tasks.json
```

Then read phase-specific files only when needed:

| Weekly focus | Read |
|---|---|
| Literature-heavy | `.pipeline/memory/literature_bank.md`, `.pipeline/docs/paper_bank.json`, `.pipeline/docs/paper_digests.md`, `literature/*/memory-bank.md` if needed |
| Experiment-heavy | `.pipeline/memory/experiment_ledger.md`, `.pipeline/docs/result_summary.md` |
| Idea-shift / gap | `.pipeline/docs/gap_matrix.md`, `.pipeline/memory/decision_log.md` |
| Writing-heavy | `paper/`, `sections/`, `.pipeline/docs/result_summary.md`, `.pipeline/memory/decision_log.md` |
| Review / rebuttal | `.pipeline/memory/review_log.md`, `.pipeline/docs/rebuttal_draft.md` |

If the user provides notes, merge them with pipeline evidence. User notes can
explain intent and priorities, but do not override file-backed results unless
the user explicitly says the files are stale.

## Weekly Focus Classification

Classify the week before writing:

- `literature-heavy`: many papers found, screened, or deep-read; taxonomy or related-work understanding changed.
- `experiment-heavy`: runs, ablations, debugging, metrics, or implementation changed.
- `idea-shift`: gap, hypothesis, problem framing, or direction changed.
- `writing-heavy`: sections, figures, tables, citations, or draft structure changed.
- `review-rebuttal`: review analysis, rebuttal strategy, or camera-ready changes dominate.
- `mixed`: multiple streams made meaningful progress.
- `low-activity`: limited progress; focus on blockers and recovery plan.

The update should be organized around the focus, not around a fixed chronology.

## Core Workflow

1. Determine the date/week range. If unspecified, use the current date and label it as the current weekly update.
2. Read project memory as described above.
3. Extract changes, not raw activity:
   - new confirmed facts;
   - new or rejected hypotheses;
   - paper-reading takeaways that changed the project;
   - experiment result deltas and current best setup;
   - idea/gap changes and why;
   - blockers and decisions needed.
4. Mark each important statement as one of:
   - `confirmed`: backed by project files, logs, papers, or user confirmation.
   - `preliminary`: plausible but needs another paper search, run, or ablation.
   - `blocked`: cannot progress without data, compute, code, decision, or clarification.
5. Read the relevant output templates:
   - `references/weekly_report_template.md` for Chinese weekly reports.
   - `references/meeting_outline_template.md` for group-meeting outlines.
   - `references/english_brief_template.md` for English briefs.
6. Write the output. In project mode, save the latest update to `.pipeline/docs/weekly_update.md` and archive a dated copy under `.pipeline/docs/weekly_updates/YYYY-MM-DD.md` unless the user asked for chat-only output.
7. Update `.pipeline/memory/agent_handoff.md` with the next-week action summary when the update includes next steps.

## Output Rules

- Default: Chinese weekly report plus a short Chinese meeting outline.
- If the user asks for English, keep it short and lab-readable; do not translate the entire Chinese report mechanically.
- Do not write a daily timeline unless requested.
- Emphasize “what changed, why it matters, what evidence supports it, and what comes next.”
- Next-week plans must be checkable deliverables, not vague intentions.
- If progress is small, say so directly and make blockers/action recovery clear.
- If experiments failed, summarize what they ruled out or exposed.
- If reading dominated the week, summarize taxonomy/gap/baseline changes instead of listing every paper.
- If the idea changed, explain old direction, new direction, reason for change, and missing evidence.

## Evidence Constraints

- Do not inflate progress or invent results.
- Do not claim a paper was read, a result improved, or an idea was selected unless backed by project files or user notes.
- Mark tentative interpretations as `初步` or `待验证`.
- Separate “导师需要知道的结论” from “自己还在猜的解释”.
- If date filtering is impossible from the files, state that the update is based on current project state plus available dated entries.

## 何时读引用文件

- 输出中文周报时读取 `references/weekly_report_template.md`。
- 输出组会提纲时读取 `references/meeting_outline_template.md`。
- 输出英文简报时读取 `references/english_brief_template.md`。
