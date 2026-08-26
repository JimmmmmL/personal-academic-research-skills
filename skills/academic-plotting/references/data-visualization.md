# Reproducible Data Figures

Use Matplotlib's object-oriented API as the dependable rendering base. Seaborn
is useful for statistical aggregation and distribution plots; SciencePlots is
an optional style layer, not a substitute for deliberate figure design.

## Start From The Question

Choose the encoding from the comparison the reader must make:

| Analytical question | Usually use | Avoid |
|---|---|---|
| Change over ordered steps or time | line with markers; confidence band if supported | one marker per dense sample |
| Compare methods across a few datasets | dot plot or grouped bar | dozens of tightly packed bars |
| Rank many methods on one metric | ordered horizontal dot/bar | unsorted vertical bars |
| Show paired changes | slope graph or paired points | independent bars that hide pairing |
| Show a distribution | ECDF, box, violin plus observations | mean-only bar |
| Show two continuous variables | scatter; fit only when justified | decorative regression |
| Show a matrix | heatmap with a perceptually valid scale | rainbow/jet |
| Show a tradeoff or Pareto frontier | scatter with selected labels | connecting unordered methods |

Prefer direct labels when they reduce lookup. Use facets rather than overloaded
legends when panels share a meaningful scale.

## Statistical Integrity

- Keep individual runs when available. State whether bands/bars are SD, SE, CI,
  quantiles, or another statistic, and record sample count.
- Do not add uncertainty when only a single aggregate is available.
- Use a zero baseline for bars unless a clearly disclosed exception is
  necessary. Lines and dots need not start at zero, but avoid a misleading
  range.
- Preserve missing values as missing; do not silently replace them with zero.
- Do not connect unordered categorical points with a line.
- Compute rankings, normalization, smoothing, and confidence intervals in the
  saved script, with the transformation visible near the data load.

## Implementation Pattern

Use a self-contained script with explicit input and output paths. Resolve paths
relative to the script or project root, create the output directory, and fail
loudly on missing columns or non-finite values.

```python
from pathlib import Path
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

HERE = Path(__file__).resolve().parent
data = pd.read_csv(HERE / "fig_result.csv")
required = {"step", "score", "method"}
missing = required.difference(data.columns)
if missing:
    raise ValueError(f"missing columns: {sorted(missing)}")
if not np.isfinite(data[["step", "score"]].to_numpy(dtype=float)).all():
    raise ValueError("step and score must be finite numeric values")

fig, ax = plt.subplots(figsize=(3.25, 2.35), constrained_layout=True)
for method, frame in data.groupby("method", sort=False):
    frame = frame.sort_values("step")
    ax.plot(frame["step"], frame["score"], marker="o", markevery=4,
            linewidth=1.4, label=method)
ax.set(xlabel="Training step", ylabel="Score")
ax.spines[["top", "right"]].set_visible(False)
ax.legend(frameon=False)
fig.savefig(HERE / "fig_result.pdf")
fig.savefig(HERE / "fig_result.png", dpi=300)
```

When SciencePlots is already installed, `import scienceplots` followed by a
small style composition such as `plt.style.use(["science", "no-latex"])` can
provide a clean baseline. Override it for the paper's actual font, dimensions,
and accessibility needs. Do not make the figure depend on a TeX installation
unless the project already uses and tests it.

## Export And Verification

- Obtain exact widths from the current venue template; do not hard-code yearly
  venue guesses into a reusable skill.
- Prefer PDF for LaTeX and SVG when downstream manual editing is expected.
- Embed or outline fonts only when the publisher workflow requires it.
- Also export a 300 dpi PNG preview; DPI does not improve a vector asset.
- Regenerate from a clean process and inspect both vector and preview outputs.
- Check dense labels, exponent notation, legend overlap, clipped annotations,
  panel alignment, and whether important differences survive grayscale.
