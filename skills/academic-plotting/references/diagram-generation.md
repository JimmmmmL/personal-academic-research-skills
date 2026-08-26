# Editable Scientific Diagrams

Architecture and method figures must preserve semantic structure. A beautiful
raster with incorrect arrows or garbled labels is not publication-ready.

## Preferred Rendering Order

1. **Direct SVG** for most pipelines and architectures. It is editable,
   diffable, scalable, and easy to inspect.
2. **TikZ** when the paper already uses LaTeX-native diagrams or math-heavy
   labels and the toolchain is available.
3. **Vector editor or external SVG system** for asset-rich illustrations.
4. **Raster generation** for ideation or genuinely pictorial content. Treat it
   as a draft unless the final use truly requires raster.

Do not force a complex pictorial illustration into brittle TikZ, and do not use
image generation for a simple box-and-arrow diagram whose text and geometry can
be deterministic.

## Semantic Spec

Write the spec before drawing. It should contain:

```text
Intent: one-sentence takeaway
Reading order: left-to-right / top-to-bottom / cyclic / hierarchical
Groups: named regions and their purpose
Nodes: stable id, exact visible label, optional short subtitle, group
Edges: source id -> target id, meaning, data/control/optional/error type
Emphasis: what is primary, secondary, or contextual
Constraints: aspect ratio, column width, mandatory/forbidden elements
```

Stable node IDs make revisions safe even when visible labels change. Every
arrow must encode an explicit relationship; do not add arrows for decoration.

## Reference-Driven Workflow

Use reference figures to identify a layout grammar, not to copy content. Record
only transferable properties such as panel rhythm, grouping strategy,
annotation density, border treatment, and emphasis pattern. Then:

1. plan the information hierarchy;
2. render one structurally faithful draft;
3. compare the artifact with the semantic spec;
4. fix content and routing before polishing style;
5. inspect again at final size.

For complex figures, generating alternative layouts can be useful, but compare
them against the same intent and fidelity rubric. Do not select on aesthetics
alone.

## SVG Requirements

- Use a meaningful `viewBox`; avoid fixed pixel-only scaling.
- Keep text as text where publisher compatibility permits.
- Group related elements and give major groups stable IDs.
- Reuse markers and style definitions rather than duplicating them.
- Place connectors beneath nodes and route them to avoid crossing labels.
- Use shapes, markers, or line styles in addition to color.
- Avoid external image links that make the SVG non-portable; embed licensed
  assets or keep them beside the source with clear provenance.
- Verify the SVG opens in a browser and in the intended editor. Export a PDF
  through the project's normal vector toolchain when possible.

## Raster-Assisted Path

When image generation materially helps pictorial content, give the renderer the
semantic spec, exact required labels, aspect ratio, and a restrained style
brief. Inspect all text and edges. If the raster draft is chosen, reconstruct it
as editable SVG directly or use an optional tool such as AutoFigure-Edit. Keep
the original spec so reconstruction can be checked semantically.

Never claim that a raster-to-SVG conversion is fully editable without opening
the result and confirming that text, connectors, and components are separate
objects.

## Diagram QA

- Read labels and arrows aloud in reading order; each should form a coherent
  explanation of the method.
- Check spelling, capitalization, mathematical notation, arrow direction, and
  optional/error line conventions against the source text.
- Remove legends that can become direct labels and decoration that carries no
  meaning.
- Test the figure at final column width, in grayscale, and on a typical screen.
- Keep a PNG preview but deliver the SVG/TikZ source and vector publication
  export as the authoritative artifacts.
