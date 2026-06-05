---
name: paper-deep-note
description: Produce a precise Chinese deep-reading note for a single academic paper from a PDF, arXiv/OpenReview link, title, abstract, paper excerpts, or an existing paper_bank entry. Use when the user wants paper analysis, structured reading notes, method breakdown, claim-vs-evidence checking, experiment evaluation, reproduction risks, related-work positioning, project relevance, or to update .pipeline paper_digests and paper_bank after reading one paper.
---

# Paper Deep Note

用这个 skill 处理单篇论文精读。目标不是“摘要复述”，而是把一篇论文变成可复用的研究资产：准确拆解方法，检查证据是否支撑 claim，评估复现和引用价值，并同步到当前项目记忆。

## Precision Contract

- 优先精确，不要为了完整而填空。未知就写 `未知`。
- 区分 `论文明确声称`、`论文实验支持`、`读者推断`、`项目启发`。
- 如果没有全文，不要评价公式细节、完整实验设置、消融充分性或复现难点的细枝末节。
- 不要把作者 claim 改写成事实；用 claim-evidence 表明确证据来源。
- 精读必须服务项目：这篇论文能作为 baseline、related work、方法组件、反例、评测参考，还是可以暂缓。

## Core Workflow

1. Identify and normalize the paper: title, authors, year, venue/preprint source, URL, arXiv/DOI/Semantic Scholar ID when available.
2. Determine evidence level: `fulltext`, `partial-text`, `abstract`, `metadata`, or `user-notes`.
3. If the user gave only a title, search/fetch the paper before analysis when tools are available. If web/PDF access is blocked, say what evidence is missing.
4. In an active `.pipeline/` project, read only the needed project context:
   - `.pipeline/docs/research_brief.json`
   - `.pipeline/docs/paper_bank.json`
   - `.pipeline/memory/literature_bank.md`
   - `.pipeline/docs/paper_digests.md` if it exists
5. Read `references/note_template.md` before producing the note. Read `references/reading_guidelines.md` when assigning reading priority, score, or reproduction risk.
6. Produce the Chinese deep note. If the user asks for a quick screening note, keep the same fields but compress each section.
7. Update project memory when `.pipeline/` exists, unless the user explicitly asks for analysis only.

## What To Analyze

For fulltext or strong excerpts, cover:

- Problem framing: exact task, assumptions, input/output, why existing work is insufficient.
- Method: architecture/pipeline, objective functions, training/inference procedure, data construction, key modules, and what is genuinely novel.
- Experiments: datasets, metrics, baselines, ablations, statistical/qualitative evidence, compute scale, code/data availability.
- Claim-evidence alignment: major claims, the specific table/figure/section supporting each claim, and whether support is strong or weak.
- Related-work positioning: what line of work it belongs to, 2-5 neighboring papers or categories, and what it changes relative to them.
- Project value: whether this paper affects the user's hypothesis, experiment plan, baseline choice, survey taxonomy, or paper framing.

For abstract-only or metadata-only inputs, still output a useful screening card, but mark method and experiment conclusions as provisional.

## Project Pipeline Mode

When `.pipeline/` exists, synchronize the reading result after the note:

1. Append a dated digest to `.pipeline/docs/paper_digests.md`.
2. Merge into `.pipeline/docs/paper_bank.json` by normalized URL, arXiv ID, DOI, Semantic Scholar ID, or lowercase title.
3. If the paper already exists, preserve existing fields and only improve `status`, `evidenceLevel`, `notes`, `topics`, and optional `analysis`.
4. Update `.pipeline/memory/literature_bank.md` status to `summarized` or `analyzed` when the paper is already listed.
5. If the reading changes project direction, append a short note to `.pipeline/memory/decision_log.md`; only confirmed facts go to `project_truth.md`.

Use `paper_bank.json` compatible fields:

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
  "status": "summarized",
  "evidenceLevel": "fulltext",
  "notes": "one-line relevance note",
  "analysis": {
    "readingPriority": "值得精读",
    "qualityScore": null,
    "mainClaim": "",
    "projectUse": "baseline|related-work|method-component|evaluation|negative-example|background|defer",
    "digestPath": ".pipeline/docs/paper_digests.md"
  }
}
```

Allowed `status`: `discovered`, `candidate`, `summarized`, `analyzed`, `accepted`, `rejected`.

## Topic Folder Mode

If the paper came from a `paper-finder` topic folder, also maintain that folder:

```
literature/<topic-name>/
  memory-bank.md
  mind-graph.md
  summaries/<short-id>.md
  references.bib
```

Save the detailed note to `literature/<topic-name>/summaries/<short-id>.md`
when the folder exists or the user asks for per-paper files. Update
`memory-bank.md` status to `summarized` or `analyzed`. Update `mind-graph.md`
only with topic-level relationships, not noisy pairwise comparisons. If the
user explicitly points to an older root-level topic folder, use that folder for
compatibility.

## Output Rules

- Default response: a concise top summary plus the full Chinese deep note.
- For project mode: mention which project memory files were updated.
- For quick screening: keep the same headings but shorten each section.
- In “是否值得精读”, use only:
  - `值得精读`
  - `值得速读`
  - `可暂缓`
- For scoring, use `N/A` unless there is enough evidence to judge method, experiments, and writing quality.

## 默认交付

- 默认给出长版中文精读卡。
- 如果信息不足，在卡片顶部先给出“输入覆盖范围说明”。
- 如果处在项目中，同步 `.pipeline/docs/paper_digests.md` 和 `.pipeline/docs/paper_bank.json`。
