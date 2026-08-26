# Optional Open-Source Tooling

This review was last checked on 2026-08-26. Treat project maturity, APIs, model
support, and installation requirements as time-sensitive; verify upstream before
adopting one in a live workflow.

## Recommended Integrations

### PaperVizAgent (formerly PaperBanana)

- Official code: https://github.com/google-research/papervizagent
- Paper: https://arxiv.org/abs/2601.23265
- Useful idea: retrieve structurally relevant references, plan content, derive
  style guidance, render, and refine through a critic loop.
- Best fit: complex academic illustration ideation and candidate generation.
- Caveat: the official workflow is API/model-heavy and its primary illustration
  outputs are raster. Use its orchestration pattern by default; adopt the full
  project only when its dependencies and cost fit the task.

### AutoFigure-Edit

- Official code: https://github.com/ResearAI/AutoFigure-Edit
- Paper: https://arxiv.org/abs/2603.06674
- Useful idea: long-context and reference-guided generation followed by
  structured, component-level SVG reconstruction and visual editing.
- Best fit: complex conceptual figures that need editable SVG output.
- Caveat: local use has a substantial stack, including external segmentation
  dependencies and model providers. Do not silently install or treat it as a
  lightweight default. Always inspect reconstructed labels and connectors.

### SciencePlots

- Official code: https://github.com/garrettj403/SciencePlots
- Useful idea: composable Matplotlib style sheets for a clean scientific
  baseline; MIT licensed and broadly used.
- Best fit: reproducible numerical plots when Matplotlib is already the project
  standard.
- Caveat: a style sheet cannot choose the right encoding, validate statistics,
  or guarantee venue compliance. The paper template and artifact inspection
  still control font, width, and layout decisions.

## Watch, Do Not Default To

### VisPainter

- Code: https://github.com/HerzogFL/VisPainter
- Paper: https://arxiv.org/abs/2510.27452
- Promising idea: multi-agent editing with bitmap preview plus vector source.
- Current limitation at review time: the repository states that major framework
  pieces are still being organized/released, and the public implementation is
  small and platform-specific. Re-evaluate later; do not build the default
  skill path around it yet.

## Selection Rule

Use the smallest dependable stack that produces the authoritative artifact:

- exact numerical evidence -> Matplotlib/Seaborn, optionally SciencePlots;
- deterministic boxes/arrows -> direct SVG or TikZ;
- complex illustrative layout -> PaperVizAgent-style planning and critique;
- raster concept that must remain editable -> AutoFigure-Edit or careful manual
  SVG reconstruction.

Avoid depending on a project solely because its demo image looks polished.
Check editability, semantic fidelity, reproducibility, maintenance state,
license, installation burden, and whether model/API costs are acceptable.
