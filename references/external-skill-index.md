# External AI-Research-SKILLs Index

Do not vendor the full
[AI-Research-SKILLs](https://github.com/Orchestra-Research/AI-Research-SKILLs.git)
library into this repo by default. It contains many domain-specific skills and
should be loaded only when a task matches a specific implementation stack.

Recommended layout:

```text
workspace/
├── personal-academic-research-skills/
└── AI-Research-SKILLs/
```

When the upstream repo is not a sibling directory, set or remember its location
outside this repo:

```bash
export AI_RESEARCH_SKILLS_DIR=<your-ai-research-skills-clone>
```

Do not hard-code machine-specific absolute paths in this repo.

## Routing Table

| Need | External skill area |
|---|---|
| Model architecture experiments | `AI-Research-SKILLs/01-model-architecture/*/SKILL.md` |
| Tokenization | `AI-Research-SKILLs/02-tokenization/*/SKILL.md` |
| Fine-tuning, LoRA, PEFT, Unsloth, LLaMA Factory | `AI-Research-SKILLs/03-fine-tuning/*/SKILL.md` |
| Mechanistic interpretability | `AI-Research-SKILLs/04-mechanistic-interpretability/*/SKILL.md` |
| Data processing | `AI-Research-SKILLs/05-data-processing/*/SKILL.md` |
| RLHF, GRPO, post-training, verl, TRL | `AI-Research-SKILLs/06-post-training/*/SKILL.md` |
| Safety alignment and guardrails | `AI-Research-SKILLs/07-safety-alignment/*/SKILL.md` |
| Distributed training | `AI-Research-SKILLs/08-distributed-training/*/SKILL.md` |
| Cloud / compute infrastructure | `AI-Research-SKILLs/09-infrastructure/*/SKILL.md` |
| Quantization, pruning, FlashAttention, optimization | `AI-Research-SKILLs/10-optimization/*/SKILL.md` and `AI-Research-SKILLs/19-emerging-techniques/*/SKILL.md` |
| Evaluation harnesses | `AI-Research-SKILLs/11-evaluation/*/SKILL.md` |
| Inference serving | `AI-Research-SKILLs/12-inference-serving/*/SKILL.md` |
| Experiment tracking / MLOps | `AI-Research-SKILLs/13-mlops/*/SKILL.md` |
| Agent frameworks | `AI-Research-SKILLs/14-agents/*/SKILL.md` |
| RAG / vector DBs | `AI-Research-SKILLs/15-rag/*/SKILL.md` |
| Prompt engineering libraries | `AI-Research-SKILLs/16-prompt-engineering/*/SKILL.md` |
| Observability | `AI-Research-SKILLs/17-observability/*/SKILL.md` |
| Multimodal models | `AI-Research-SKILLs/18-multimodal/*/SKILL.md` |
| Research ideation | `AI-Research-SKILLs/21-research-ideation/*/SKILL.md` |
| Agent-native research artifacts | `AI-Research-SKILLs/22-agent-native-research-artifact/*/SKILL.md` |

## Use Protocol

1. Match the user's concrete implementation need to one row.
2. Open only the relevant external `SKILL.md`.
3. Do not load the whole external repo.
4. Record any resulting experiment or implementation decision in `.pipeline/`
   if the harness is active.

## What Is Already Integrated

This repo already includes compressed versions of the upstream writing-related
skills most useful for academic output:

- `20-ml-paper-writing/ml-paper-writing` -> `skills/paper-writing`
- `20-ml-paper-writing/academic-plotting` -> `skills/academic-plotting`
- `20-ml-paper-writing/systems-paper-writing` -> `skills/systems-paper-writing`

For normal paper drafting, figure generation, and reviewer simulation, use the
local skills first.
