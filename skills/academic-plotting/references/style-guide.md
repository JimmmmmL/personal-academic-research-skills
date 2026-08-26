# Publication Figure Style

The paper template is the source of truth for dimensions and fonts. Inspect it
instead of relying on remembered venue measurements.

## Hierarchy Before Decoration

- Make the intended takeaway the strongest visual signal.
- Use position and grouping first, then size/weight, then color.
- Keep one primary accent and a restrained supporting palette.
- Prefer whitespace over borders; prefer direct labels over repeated legend
  lookup.
- Avoid gradients, heavy shadows, 3D effects, stock clip art, and ornamental
  icons unless the scientific content genuinely needs pictorial cues.

## Typography

- Match the paper's type family when practical, but prioritize legibility and
  reliable embedding.
- Judge type at the final placed size. Keep effective text at least 7 pt, with
  axis and major component labels typically larger.
- Use sentence case and short labels. Move explanation into the caption rather
  than shrinking paragraphs into the figure.
- Keep mathematical notation consistent with the manuscript.

## Color And Accessibility

- Use a colorblind-safe qualitative palette such as Okabe–Ito for unrelated
  series; use perceptually uniform sequential maps such as viridis/cividis for
  magnitude.
- Use a diverging scale only around a meaningful midpoint.
- Avoid jet/rainbow scales and red-versus-green as the only distinction.
- Reinforce color with markers, dash patterns, labels, or shape.
- Check grayscale contrast. Pale yellow and light gray commonly disappear on
  white paper.

Suggested Okabe–Ito colors:

```python
OKABE_ITO = [
    "#0072B2", "#E69F00", "#009E73", "#D55E00",
    "#CC79A7", "#56B4E9", "#F0E442", "#000000",
]
```

Do not automatically color “ours” red and every baseline gray. Highlighting
must serve the figure's stated comparison and should not hide competitive
baselines.

## Lines, Axes, And Panels

- Use a small, consistent line-weight hierarchy.
- Keep grids faint and only where they aid value lookup.
- Remove redundant spines and panel titles; do not remove axes needed to decode
  values.
- Align panel bounds, baselines, and internal margins.
- Use `(a)`, `(b)`, `(c)` labels consistently and refer to them in the caption.
- Avoid chart titles when the caption already supplies the title.

## Caption Draft

A useful caption states what is encoded, defines uncertainty or non-obvious
symbols, and gives the supported takeaway. It does not make claims beyond the
data and does not start with “Figure X shows”.

## Final-Size Checklist

- all text readable without zooming;
- no clipped or overlapping labels;
- numbers and labels match the source;
- color is not the sole carrier of meaning;
- caption defines uncertainty and abbreviations;
- vector output renders correctly in the manuscript;
- editable source and regeneration instructions are present.
