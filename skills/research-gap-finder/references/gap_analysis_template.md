# Gap Matrix 模板

```markdown
# Research Gap Analysis

## 输入覆盖范围
- 主题：
- 项目阶段：
- 论文总数：
- 已精读 / summarized / analyzed 论文数：
- evidence maturity：low / medium / high
- 是否包含用户已有想法：
- 覆盖边界说明：

## Evidence Snapshot
- 主要证据文件：
- 高相关论文：
- 仍缺的关键论文或方向：
- 当前不能下结论的部分：

## 问题 Framing 摘要
- 核心研究问题：
- 当前主流设定：
- 明确包含：
- 明确不包含：
- 最小可验证版本：

## Coverage Map
| Axis | 已覆盖 | 薄弱 / 缺失 | 支撑证据 | 备注 |
|---|---|---|---|---|
| Problem setting |  |  |  |  |
| Method family |  |  |  |  |
| Mechanism |  |  |  |  |
| Dataset / benchmark |  |  |  |  |
| Metrics |  |  |  |  |
| Baselines |  |  |  |  |
| Ablation / analysis |  |  |  |  |
| Efficiency / deployment |  |  |  |  |

## 已有路线与瓶颈
### 路线 A：
- 代表论文：
- 解决了什么：
- 还没解决什么：
- 关键瓶颈：

### 路线 B：
- 代表论文：
- 解决了什么：
- 还没解决什么：
- 关键瓶颈：

## 争议点 / 弱证据点
- 结论不一致的地方：
- 常见但未充分验证的假设：
- claim-evidence 不匹配：
- 评测设计不可靠之处：

## Bottleneck Inventory
- 数据或 benchmark 层面：
- 方法层面：
- 评测层面：
- 系统部署层面：
- 理论或分析层面：

## Candidate Gap Matrix
| ID | 类型 | Gap / Idea | 支撑证据 | Novelty threat | Evidence strength | Feasibility | Decision | Next test |
|---|---|---|---|---|---|---|---|---|
| G1 | capability / mechanism / evaluation / assumption / data / efficiency / theory / negative-result |  |  | critical / high / moderate / low / unverified | strong / medium / weak | high / medium / low | pursue / verify-first / park / reject |  |

## 候选方向详述
### G1：
- 一句话 idea：
- 具体研究问题：
- 为什么这个 gap 可能成立：
- 哪些已有工作没有充分覆盖：
- 最小方法假设：
- 最小实验验证：
- 必须对比的 baseline：
- 成功判据：
- 失败判据：
- 最大风险：
- 如果被已有工作覆盖，如何 refine：

## 推荐优先级
1.
2.
3.

## 风险提示
- 可能只是阅读不足：
- 可能已被近期论文覆盖：
- 可能无法在当前资源下验证：
- 可能只是工程整合而非论文贡献：
```

## 写作提醒

- gap 的价值不在于“新颖表述”，而在于“被清楚界定且可验证”。
- 如果更像工程集成机会或评测缺口，也要明确指出。
- 每个 gap 至少要给出一个证据来源和一个 next test。
- 不要生成超过 5 个候选；过多候选会降低收敛质量。
