# Interactive Gap / Idea Template

Use this template before user selection to compare candidate directions. After
the user chooses, use the selected-direction section at the bottom.

```markdown
# Gap / Idea Exploration

## Evidence Snapshot
- Topic:
- Project goal:
- Target venue / constraint:
- Papers considered:
- Paper notes considered:
- Evidence maturity: low / medium / high
- User's existing idea, if any:

## Current Literature Landscape
| Axis | What seems covered | What seems weak / open | Evidence |
|---|---|---|---|
| Problem setting |  |  |  |
| Method family |  |  |  |
| Mechanism |  |  |  |
| Dataset / benchmark |  |  |  |
| Metric / evaluation |  |  |  |
| Baselines |  |  |  |
| Analysis / ablation |  |  |  |

## Candidate Directions

### Direction A: [name]
- Core idea:
- Research question:
- Why it may be worth doing:
- Supporting evidence:
- Missing evidence:
- Novelty threat: critical / high / moderate / low / unverified
- Minimum experiment:
- Required baselines:
- Feasibility: high / medium / low
- Biggest risk:
- If evidence is insufficient, targeted paper-finder queries:

### Direction B: [name]
- Core idea:
- Research question:
- Why it may be worth doing:
- Supporting evidence:
- Missing evidence:
- Novelty threat:
- Minimum experiment:
- Required baselines:
- Feasibility:
- Biggest risk:
- If evidence is insufficient, targeted paper-finder queries:

## Candidate Comparison
| Direction | Novelty threat | Evidence strength | Feasibility | Expected value | Main risk | What to do next |
|---|---|---|---|---|---|---|
| A |  |  |  |  |  |  |
| B |  |  |  |  |  |  |

## Suggested Paper-Finder Follow-up
- Query:
  - Why needed:
  - What finding would change:
  - Search angles:

## User Checkpoint
1. Which direction do you prefer?
2. Should any directions be combined?
3. Which risk worries you most?
4. Should we run paper-finder before deciding?
```

## Selected Direction Template

Use only after the user selects or combines directions.

```markdown
# Selected Research Direction

## Direction

## Core Question

## Why This Is Worth Doing

## Evidence Base

## Novelty Threats

## Minimum Experiment

## Required Baselines

## Risks And Kill Criteria

## Next Actions
- Paper-finder follow-up:
- Paper-note follow-up:
- Experiment:
- Writing / framing:

## Rejected Or Parked Directions
- Direction:
  - Reason:
```

## Writing Rules

- Generate 2-4 candidate directions by default.
- Do not auto-select a final direction before user confirmation.
- A gap is only useful if it leads to a testable question or a targeted paper search.
- If evidence is weak, say so and propose `paper-finder` queries.
