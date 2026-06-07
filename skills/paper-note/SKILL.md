---
name: paper-note
description: Produce a concise Chinese note for one academic paper from a PDF, arXiv/OpenReview link, title, abstract, excerpts, or an existing paper_bank entry. Use when the user wants a simple vivid explanation of what a paper is doing, the main insight, section-by-section gist, key takeaways, project inspiration, or a lightweight paper note saved into .pipeline paper_notes and paper_bank. Prefer this over long audit-style notes unless the user explicitly asks for detailed experiment review.
---

# Paper Note

用这个 skill 处理单篇论文笔记。目标是用简单、生动、直白的语言讲清楚一篇 paper 的整体思路、核心 insight、每个 section 大概在说什么，以及它对当前项目有什么启发。

这不是长篇审计。默认不要输出大段证据表、完整复现评估、复杂评分或面面俱到的实验拆解，除非用户明确要求。

## Output Philosophy

- 优先讲清楚“这篇论文到底想干嘛”和“它的想法为什么有意思”。
- 用直觉和类比帮助理解，但每个类比都要能映射回真实技术组件。
- 保留技术准确性：未知就写 `未知`，不要为了讲得顺而补全论文没说的内容。
- 输出要短而有用，适合以后做 related work、gap analysis、组会汇报时快速翻看。
- 对项目的启发要具体：能借鉴到哪个模块、实验、baseline、taxonomy、idea 或反例。

## Core Workflow

1. Identify paper metadata: title, authors, year, venue/preprint source, URL, arXiv/DOI when available.
2. Determine evidence level: `fulltext`, `partial-text`, `abstract`, `metadata`, or `user-notes`.
3. If only a title is provided, search/fetch the paper when tools are available. If access is blocked, state what is missing.
4. In an active `.pipeline/` project, read only what helps interpret relevance:
   - `.pipeline/docs/research_brief.json`
   - `.pipeline/docs/paper_bank.json`
   - `.pipeline/memory/literature_bank.md`
   - `.pipeline/docs/paper_notes.md`
5. Read `references/note_template.md` before writing the note.
6. Write the concise Chinese paper note.
7. In project mode, synchronize `.pipeline/docs/paper_notes.md` and `.pipeline/docs/paper_bank.json` unless the user asks for chat-only output.

## What To Capture

Default note sections:

- `一句话`: one-sentence plain-language summary.
- `直觉版讲解`: vivid beginner-friendly explanation of the paper's idea.
- `论文结构`: section-by-section gist, focusing on what each section contributes.
- `核心 insight`: what idea, assumption, mechanism, or framing makes the paper useful.
- `方法简图`: short pipeline or bullet flow, not a full architecture audit.
- `实验在证明什么`: only the main evidence needed to understand the paper's claim.
- `对当前项目的启发`: concrete project relevance.
- `可引用点 / 可比较点`: how this paper may be used in related work or experiments.
- `疑问和局限`: short list of caveats or things to verify later.

For abstract-only inputs, keep the same sections but mark method, experiment, and limitation judgments as provisional.

## Project Pipeline Mode

When `.pipeline/` exists:

1. Append a dated compact note to `.pipeline/docs/paper_notes.md`.
2. Merge or update `.pipeline/docs/paper_bank.json` by normalized URL, arXiv ID, DOI, Semantic Scholar ID, or lowercase title.
3. Preserve existing paper fields and improve only `status`, `evidenceLevel`, `notes`, `topics`, and optional `analysis`.
4. Update `.pipeline/memory/literature_bank.md` status to `noted` or `summarized` when the paper is already listed.
5. If the note changes project direction, append a short item to `.pipeline/memory/decision_log.md`.

Use compatible `paper_bank.json` fields:

```json
{
  "id": "short-id",
  "title": "Paper Title",
  "authors": ["Author"],
  "year": 2026,
  "venue": "ICLR",
  "url": "https://...",
  "doi": "",
  "arxiv": "",
  "semanticScholarId": "",
  "citationCount": null,
  "topics": ["topic"],
  "relevance": 0.0,
  "status": "noted",
  "evidenceLevel": "fulltext",
  "notes": "one-line insight and project relevance",
  "analysis": {
    "mainInsight": "",
    "projectUse": "baseline|related-work|method-inspiration|evaluation|negative-example|background|defer",
    "notePath": ".pipeline/docs/paper_notes.md"
  }
}
```

Allowed `status`: `discovered`, `candidate`, `noted`, `summarized`, `analyzed`, `accepted`, `rejected`.

## Topic Folder Mode

If the paper came from a `paper-finder` topic folder, save the note to:

```
literature/<topic-name>/summaries/<short-id>.md
```

Update `literature/<topic-name>/memory-bank.md` status to `noted` or
`summarized`. Update `mind-graph.md` only when the note clarifies a topic-level
relationship.

If the user explicitly points to an older root-level topic folder, use that
folder for compatibility.

## Output Rules

- Default response should be compact: roughly 1-2 screens unless the user asks for detail.
- Lead with the intuitive explanation, not metadata.
- Avoid long tables by default.
- Do not include numeric quality scores by default.
- Do not produce a full reproduction-risk analysis unless requested.
- If information is missing, add a short `输入覆盖范围` note at the top.

## Default Delivery

- Chinese paper note using `references/note_template.md`.
- Project updates to `.pipeline/docs/paper_notes.md` and `.pipeline/docs/paper_bank.json` when in project mode.
- A brief note about updated files.
