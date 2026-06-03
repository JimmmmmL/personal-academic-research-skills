---
name: academic-plotting
description: Create publication-quality figures for ML/AI papers from paper context, method descriptions, experiment tables, CSV/JSON results, or training logs. Use for Figure 1, architecture diagrams, method overviews, ablation plots, training curves, benchmark comparisons, and LaTeX-ready figure outputs.
metadata:
  version: "0.1.0"
  derived_from: "AI-Research-SKILLs/20-ml-paper-writing/academic-plotting"
---

# Academic Plotting

Generate figures for papers while keeping numerical plots reproducible and
diagram prompts grounded in the paper text.

## Choose The Workflow

| Figure type | Workflow | Read |
|---|---|---|
| Architecture, system diagram, pipeline, Figure 1 overview | Diagram | `references/diagram-generation.md`, `references/style-guide.md` |
| Bar chart, line chart, scatter, heatmap, ablation, training curve | Data plot | `references/data-visualization.md`, `references/style-guide.md` |

If the figure has numerical axes, use matplotlib/seaborn. If it has boxes,
arrows, and components, use diagram mode.

## Grounding Rules

- Extract labels, modules, and claims from the user's text or project files.
- Do not invent components or numbers.
- For result figures, save the raw data or cite the file it came from.
- Use colorblind-safe palettes for quantitative plots.
- Captions must state the takeaway and be understandable without the main text.

## Default Output Locations

Use the first matching directory:

- `paper/figures/`
- `figures/`
- `assets/figures/`

Also save generation scripts when creating data plots, so figures can be
regenerated.

## Diagram Mode

1. Read the method/abstract/overview text.
2. Extract entities, relationships, and data flow.
3. Choose a layout: pipeline, layered architecture, hub-and-spoke, or hierarchy.
4. Choose one visual style from `references/style-guide.md`.
5. Produce a detailed prompt or editable diagram spec.

If an image-generation API key is unavailable, produce a precise diagram spec
that can be implemented later.

## Data Plot Mode

1. Read the data table, CSV, JSON, logs, or result summary.
2. Identify methods, metrics, benchmarks, and whether values are means or runs.
3. Choose chart type:
   - time/step axis: line plot
   - methods x benchmarks: grouped bar
   - ranking: horizontal bar
   - continuous relation: scatter
   - matrix: heatmap
4. Generate a script and figure.
5. Include uncertainty/error bars when the data provides multiple runs.
