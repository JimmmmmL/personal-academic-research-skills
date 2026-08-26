---
name: academic-plotting
description: Create publication-ready figures for research papers from method text, experiment data, tables, or logs. Use for editable architecture and pipeline diagrams, Figure 1 overviews, ablations, training curves, benchmark comparisons, and LaTeX-ready visual assets; do not use it to invent results or decorate unsupported claims.
metadata:
  version: "0.2.0"
  derived_from: "AI-Research-SKILLs/20-ml-paper-writing/academic-plotting"
---

# Academic Plotting

Create a truthful, editable, reproducible figure bundle—not merely an attractive
preview. Optimize for the figure's communicative job at its final printed size.

## Route The Figure

| Figure | Primary representation | Read |
|---|---|---|
| Numerical axes, measured values, uncertainty | Python source plus PDF/SVG | `references/data-visualization.md`, `references/style-guide.md` |
| Architecture, method, workflow, system overview | Editable SVG or TikZ plus preview | `references/diagram-generation.md`, `references/style-guide.md` |
| Composite with plots and conceptual panels | Build panels in their native representations, then compose as vector | all three references |

Read `references/tooling.md` only when choosing or installing an optional
external renderer. Do not install packages, clone repositories, or call a paid
API without the authority normally required for those actions.

## Ground The Content

Before rendering, extract a figure brief:

- communicative intent: the one sentence the reader should learn;
- evidence: exact data files, method text, labels, modules, and relationships;
- required visual elements and elements explicitly out of scope;
- target venue/template, column width, and expected output formats;
- uncertainty: anything that needs user confirmation rather than invention.

Never infer missing metric values, error bars, module names, causal arrows, or
performance claims. Preserve raw measurements; compute derived values in the
generation script and document the computation.

## Reference-Guided Planning

When the user supplies references, or when browsing is appropriate and
available, inspect a small set of structurally relevant figures. Learn their
layout grammar, information density, typography, and use of emphasis. Do not
copy distinctive artwork or transfer scientific content from a reference.

Convert the brief into a semantic spec before rendering:

1. content hierarchy and reading order;
2. nodes/panels and exact labels;
3. edges, direction, meaning, and line convention;
4. grouping, alignment, and approximate proportions;
5. semantic emphasis and restrained palette;
6. caption takeaway.

This planning and critique loop is adapted from PaperVizAgent; editable-first
output is adapted from AutoFigure-Edit. The optional integrations and their
tradeoffs are documented in `references/tooling.md`.

## Render, Inspect, Refine

Render a draft, then inspect the actual output rather than trusting source code
or a generation prompt. Use an image-viewing or PDF-rendering tool when
available. Revise only issues visible in the artifact or violations of the
semantic spec.

The final review must cover:

- content fidelity: numbers, labels, arrows, ordering, and claims;
- readability at final column width, including at least 7 pt effective text;
- visual hierarchy and absence of collisions, clipping, or unnecessary ink;
- accessibility in grayscale and under common color-vision deficiencies;
- consistency with the rest of the paper;
- editability/reproducibility and successful clean regeneration.

Stop when the artifact passes the checks. Do not run an arbitrary number of
self-critique rounds.

## Deliverables

Use the first existing output directory among `paper/figures/`, `figures/`, and
`assets/figures/`; otherwise create `figures/`. Keep related files together:

- vector publication asset: PDF or SVG;
- editable source: Python, SVG, TikZ, or composition source;
- PNG preview for quick inspection;
- source data or a stable pointer to it for numerical figures;
- concise caption draft and regeneration command.

If only a raster conceptual draft is possible, label it as a draft and retain
the semantic spec needed to reconstruct an editable final figure.
