---
name: experiment-log-summarizer
description: summarize machine learning experiment logs in Chinese when the input includes training logs, eval results, hyperparameter changes, user notes, external experiment repo commits, or multiple runs and the user needs a grounded experiment summary, error analysis, best configuration recap, or project-level result sync.
---

# Experiment Log Summarizer

用这个 skill 整理实验日志、参数改动、训练结果和失败记录，输出中文实验总结。重点是区分证据与猜测，并把外部实验 repo 里的分散结果同步成 project repo 可以消费的轻量研究记录。

## 工作流

1. 先读 `.pipeline/docs/experiment_repos.md`、`.pipeline/memory/experiment_ledger.md` 和 `.pipeline/docs/result_summary.md`，如果这些文件存在。
2. 把输入按实验轮次、外部 repo alias、commit/hash、配置、结果、artifact 和备注拆开。
3. 参考 `references/experiment_template.md` 汇总主要结论。
4. 在需要失败归因或误差分析时，参考 `references/error_analysis_template.md`。
5. 输出实验总结，并给出需要写回 project repo 的 ledger/result_summary 更新。

## 输入处理规则

- 接收训练日志、eval 结果、参数表、用户备注和多轮实验对比。
- 接收外部实验 repo 的分支、commit、run id、artifact 路径或链接。
- 如果日志不完整，优先整理可确认事实，再列缺口。
- 如果同一实验有多次重复运行，优先总结稳定趋势，不要被单次波动误导。
- 如果结果依赖外部代码，必须记录 repo alias 和 commit/hash；缺失时标为 `missing`，不要假设。

## 输出规则

- 默认输出：
  - 本次实验目标
  - 外部 repo / commit / artifact 对应关系
  - 做了哪些改动
  - 结果变化
  - 可能原因
  - 当前最佳配置
  - 失败实验总结
  - 下一步建议
  - 可写回 `.pipeline/memory/experiment_ledger.md` 的条目
  - 可写回 `.pipeline/docs/result_summary.md` 的短摘要
- “结果变化”只写有数字、日志或明确记录支撑的内容。
- “可能原因”必须明确标为推测，不要伪装成已验证结论。
- 不要把大型 checkpoint、完整 raw log、数据集或训练缓存复制进 project repo；只建议保存轻量表格、精选日志片段、CSV/JSON 摘要或外部 artifact 链接到 `results/`。

## 证据与表述约束

- 明确区分：
  - `证据`：日志、指标、配置表、用户明确说明
  - `推测`：对涨跌原因的解释、潜在 bug 假设、过拟合猜测
- 不要把失败实验简化成“无效”，要指出失败是因为假设错误、实现问题、数据问题还是评测问题。
- 写入 project repo 的结果必须能追溯到外部 repo alias、commit/hash、配置或用户提供的明确证据。

## 何时读引用文件

- 始终读取 `references/experiment_template.md`。
- 在需要拆失败原因、错误模式或后续验证动作时读取 `references/error_analysis_template.md`。
