---
name: paper-finder
description: "Finds and organizes ML, CV, NLP, and AI research papers based on textual descriptions and keywords. Searches across arxiv, Google Scholar, Semantic Scholar, and top venues (CVPR, ECCV, ICCV, NeurIPS, ICML, ICLR, SIGGRAPH, SIGGRAPH Asia, EMNLP, ACL, CoRL, RSS, AAAI, IJCAI, WACV, BMVC, MICCAI, KDD, WWW, NAACL, COLM, and more). Maintains a persistent memory bank of discovered papers, a mind-graph linking papers to topics, individual paper summaries, and BibTeX entries. Use this skill whenever the user wants to find papers, search for related work, build a literature review, discover what exists on a topic, compare papers, organize references, generate BibTeX, or manage a research paper collection. Also use when the user mentions 'find me papers on...', 'what papers exist about...', 'related work for...', 'literature search', 'paper survey', or references any ML conference/venue by name."
---

# Paper Finder

Research paper discovery and organization agent. Find relevant ML/AI/CV/NLP
papers, organize them into a persistent knowledge base, and connect them across
topics.

## Search Quality Contract

Default to recall-first search. The first pass should find the important papers,
not merely a plausible list. Do not let `.pipeline` bookkeeping, output
formatting, or early good-looking results reduce search coverage.

For every non-trivial search:

1. Understand the precise technical property the user cares about.
2. Run direct-concept searches.
3. Run mandatory multi-angle searches:
   - cross-domain synonyms;
   - enabling mechanisms / building blocks;
   - motivating applications / problem framings.
4. Run venue- and index-specific searches.
5. Follow the citation graph from 1-2 top-relevance papers.
6. Only then rank, filter, and record.

If the user asks for "recent", "latest", "new", or the field is fast moving,
explicitly search the current and previous 2-3 years, plus arXiv/OpenReview.

## Directory Structure

Each search/topic gets its own folder under `literature/`. The topic folder name
should be a short, descriptive kebab-case name for the search topic (e.g.,
`mixed-resolution-diffusion/`, `video-generation-efficiency/`). The user may
also specify a custom folder name. Create on first use:

```
literature/
  <topic-name>/
    memory-bank.md        # Master list of all discovered papers for this topic
    mind-graph.md         # Topic-paper connection graph
    summaries/            # Per-paper .md files via paper-deep-note
    references.bib        # Topic-level BibTeX for this search
    pdfs/                 # Downloaded PDFs (only when user asks)
    discussions/          # Paper comparison logs
```

If the user references an existing folder (e.g.,
`@literature/mixed-resolution-diffusion/` or an older
`@mixed-resolution-diffusion/` folder), operate within that folder. If starting
a new search without a specified folder, derive a descriptive name from the
search query and create it under `literature/`.

## Searching for Papers

### Web search is mandatory

Use WebSearch and WebFetch for every search. Training knowledge alone misses
recent papers. If web tools are denied, retry once, then tell the user you need
web access and explain what you would search for.

### Search strategy

Run multiple parallel searches per query. Use a candidate-set mindset: gather
papers first, deduplicate second, rank third.

1. **Semantic Scholar API** via WebFetch:
   `https://api.semanticscholar.org/graph/v1/paper/search?query=<query>&limit=20&fields=title,authors,year,venue,abstract,externalIds,citationCount,url`
2. **WebSearch** with queries like `<topic> paper <venue> <year>` — useful for
   Google Scholar-like discovery.
3. **Venue-specific** when relevant: `<topic> CVPR 2026`,
   `<topic> site:openreview.net`, `<topic> NeurIPS 2025`, `<topic> ACL 2026`.
4. **Index-specific** searches: `site:arxiv.org/abs <topic>`,
   `site:openreview.net <topic>`, `site:paperswithcode.com <topic>`.
5. **Follow citations** on Semantic Scholar for highly relevant papers.

Relevant venues by field:

- CV: CVPR, ECCV, ICCV, WACV
- ML: NeurIPS, ICML, ICLR, COLM, AAAI, AISTATS, UAI
- NLP: ACL, EMNLP, NAACL, COLING
- Graphics/3D: SIGGRAPH, SIGGRAPH Asia, 3DV
- Robotics: CoRL, RSS, ICRA, IROS
- Medical: MICCAI, MIDL
- Data/Web: KDD, WWW, SIGIR, RecSys
- Preprints: arXiv cs.CV/cs.CL/cs.LG/cs.AI/stat.ML

### Multi-angle search (mandatory)

A single concept can be described using very different vocabulary depending on
the angle. After the initial direct-concept searches, you MUST run at least one
additional search round covering these three angles. Skipping these is the #1
cause of missed papers.

1. **Cross-domain synonyms**: The same idea often has established names in
   adjacent fields. Before searching, brainstorm 2-4 alternative terms from
   related domains (graphics, neuroscience, signal processing, HCI, information
   theory, databases, robotics, etc.). For example, "mixed-resolution spatial
   tokens" in ML maps to "foveated rendering" in graphics, "saliency-driven
   attention" in neuroscience, or "non-uniform sampling" in signal processing.
   Search using these alternative vocabularies.

2. **Enabling mechanisms / building blocks**: Search for the specific technical
   components needed to implement the concept, not just the concept itself.
   Every novel representation requires changes to attention, positional
   encodings, loss functions, normalization, routing, memory, retrieval,
   training data, or evaluation. For example, mixed-resolution tokens require
   modified RoPE/positional embeddings, cross-resolution attention alignment,
   and boundary handling. Search for mechanism-level terms such as "positional
   encoding mixed resolution" or "RoPE phase alignment multi-scale".

3. **Motivating applications / problem framing**: Papers solving the same
   technical problem may frame it as a different goal. Search from the
   perspective of why someone would build this: efficiency, speed, perceptual
   quality, robustness, safety, hardware constraints, long-context scaling,
   data scarcity, controllability, or interpretability. For example, "spatial
   acceleration diffusion" and "latent upsampling" can lead to mixed-resolution
   tokens even when "mixed-resolution tokens" does not.

After initial results come in, also **follow the citation graph**: fetch the
related-work section of 1-2 top-relevance papers and scan for references you
have not found yet.

### Understand the concept precisely

Before searching, understand the exact technical distinction the user cares
about. If they describe a specific mechanism (e.g., "tokens of different
spatial sizes within a single image"), search for that literal property. Do not
broaden to superficially similar but technically different work (e.g., cascaded
pipelines, generic super-resolution, or unrelated multi-scale processing).

When uncertain, explicitly write the distinction before searching:

```text
Target property:
- What must be true for a paper to count
- What similar-but-not-counting work should be excluded
- Which adjacent terms might still reveal relevant papers
```

### Recent-paper coverage

For fast-moving ML/AI topics, include explicit year and venue coverage:

```text
<topic> arxiv 2026
<topic> arxiv 2025
<topic> OpenReview 2026
<topic> ICLR 2026
<topic> NeurIPS 2025
<topic> ICML 2026
```

Do not stop at older landmark papers unless the user asked for historical
background. Use landmark papers to expand citations, not as a substitute for
recent search.

### Filtering

- Prioritize papers that match the user's exact technical concept.
- Prioritize algorithmic, methodological, or empirical contributions over
  generic architecture/engineering/system descriptions unless the user wants
  systems work.
- Prioritize recent work when the topic is current, but keep older landmark
  papers when they define the vocabulary or citation graph.
- Note citation counts when available.
- Tier results by relevance:
  - **Tier 1**: direct match to the mechanism/problem.
  - **Tier 2**: adjacent but useful mechanism, framing, or baseline.
  - **Tier 3**: background, survey, or weakly related.

## Project Pipeline Mode

If the current directory contains `.pipeline/`, operate in project mode after
the search strategy above. Project mode adds synchronization; it must not reduce
search coverage.

Read existing memory before searching to avoid duplicates:

```
.pipeline/memory/project_truth.md
.pipeline/memory/literature_bank.md
.pipeline/docs/paper_bank.json
.pipeline/memory/decision_log.md
```

In project mode, still create or update the `literature/<topic-name>/` folder.
Also synchronize
accepted or candidate discoveries to:

```
.pipeline/memory/literature_bank.md   # human-readable table
.pipeline/docs/paper_bank.json        # machine-readable paper metadata
references.bib                        # project-level BibTeX when present or requested
```

Do not overwrite existing project memory. Append or merge by normalized URL,
arXiv ID, DOI, Semantic Scholar paper ID, or lowercase title.

`literature_bank.md` append format:

```markdown
| [URL] | Title | Year | Venue | Relevance | Status | Date | Notes |
```

`paper_bank.json` schema:

```json
{
  "version": 1,
  "papers": [
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
      "status": "discovered",
      "evidenceLevel": "metadata|abstract|fulltext",
      "notes": ""
    }
  ]
}
```

Use `status=accepted` only when the user or project context indicates the paper
should be used in the final related work. Otherwise use `discovered`,
`candidate`, or `rejected`.

## Memory Bank (`memory-bank.md`)

Master record of all discovered papers. Append new entries, never overwrite.
Read existing file before searching to avoid duplicates.

```markdown
# Paper Memory Bank
Last updated: YYYY-MM-DD

### [short-id] Paper Title
- **Authors**: Author list
- **Venue**: Conference/Journal, Year
- **URL**: Link to paper
- **Citations**: N (if known)
- **Status**: discovered | summarized | analyzed
- **Topics**: topic1, topic2
- **Abstract**: 1-2 sentence description
- **Notes**: Relevance observations
---
```

## Mind Graph (`mind-graph.md`)

Topic-centric hierarchy — NOT pairwise paper comparisons. Each topic has 1-3
umbrella/landmark papers plus other relevant work.

```markdown
# Mind Graph
Last updated: YYYY-MM-DD

### Topic Name
- **Description**: One-line description
- **Related topics**: [other topic], [other topic]
- **Key papers**:
  - [short-id] Paper Title (Venue Year) — why it's key for this topic
- **Other relevant papers**:
  - [short-id] Paper Title — one-line note
```

## BibTeX (`references.bib`)

Write a single combined `references.bib` file with all papers. Use
`@inproceedings` for conferences, `@article` for journals, `@misc` for arXiv
preprints. Citation key = short-id.

In project pipeline mode, prefer the project-level `references.bib` at the repo
root. If `literature/<topic-name>/references.bib` also exists, keep it
synchronized with the project-level file and avoid duplicate keys.

## Paper Summaries and Comparisons

- **Summaries**: Invoke `paper-deep-note` or a research-paper analyst skill.
  Save to `literature/<topic-name>/summaries/<short-id>.md`. Only when user
  explicitly asks — do not auto-summarize.
- **Comparisons**: Read existing summaries first; save discussion to
  `literature/<topic-name>/discussions/<descriptive-name>.md`.
- **References to known papers**: Search summaries and memory bank first. Only
  re-read the original paper if the user explicitly asks.

## PDF Management

Do NOT download PDFs unless the user explicitly asks. When asked:

1. Read `references.bib` to extract the arXiv eprint ID or URL for each paper.
   This is the canonical source. Do not read memory-bank.md or other files just
   to find download URLs.
2. Construct the PDF URL from the arXiv ID: `https://arxiv.org/pdf/<eprint-id>`.
3. Download via curl/WebFetch and save to
   `literature/<topic-name>/pdfs/<short-id>.pdf`.
4. Only fall back to memory-bank.md or web search if a paper has no entry in
   references.bib.

## Interaction Flow

1. **Search**: Run direct, multi-angle, venue/index-specific, and citation-graph
   searches. Present a ranked list with title, venue, year, citations, URL, and
   one-line relevance.
2. **Record**: Add papers to `literature/<topic-name>/memory-bank.md`, update
   `literature/<topic-name>/mind-graph.md`, write topic-level
   `literature/<topic-name>/references.bib`; in project mode also update
   `.pipeline/memory/literature_bank.md` and `.pipeline/docs/paper_bank.json`.
3. **Ask**: Whether the user wants deeper analysis of any specific papers.
