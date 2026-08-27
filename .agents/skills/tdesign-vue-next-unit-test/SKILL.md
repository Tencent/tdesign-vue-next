---
name: tdesign-vue-next-unit-test
description: 按 tdesign-vue-next 规范编写、补充、迁移或审查 Vue 组件单元测试，并运行 Vitest 验证。适用于 packages/components 下的组件 API 测试、Issue 回归测试，以及相关 hooks、utils 测试。
---

# TDesign Vue Next Unit Test

## 规范来源

开始前阅读 `packages/tdesign-vue-next/test/README.md`，以其中的“单元测试规范”为唯一规范来源。Skill 只负责执行规范，不另行定义冲突规则。

## 工作流程

1. 阅读目标组件源码、API 定义、现有测试和相邻组件测试，不根据文件名猜测行为。
2. 列出需要覆盖的 `props`、`events`、`slots`、`instanceFunctions` 和 `scenarios`，确认现有覆盖后再修改。
3. 将组件测试放在 `packages/components/<component>/__tests__/`，并沿用项目现有的 Vitest、Vue Test Utils 和 TSX 写法。
4. 仅修改任务涉及的测试。遇到不符合新结构的存量文件时，只整理本次新增或修改的用例；除非任务明确要求，不批量迁移无关用例。
5. 完成后运行目标组件测试；用户要求覆盖率时再运行覆盖率检查。

## 分组规则

在组件名对应的顶层 `describe` 下按需使用以下直接子分组：

- `props`：单一 Prop 输入及其渲染或行为结果。
- `events`：事件触发时机、次数和参数。
- `slots`：默认、具名和作用域插槽。
- `instanceFunctions`：通过 ref 暴露的实例方法。
- `scenarios`：多 API 联动、完整交互流程、模式、状态和边界情况。

遵守以下约束：

- 不创建空分组。
- 不在组件根 `describe` 下直接放置 `it` 或 `test`。
- `scenarios` 内按具体能力继续分组，使用可描述行为的名称，不使用 `others`、`misc` 或 `internal logic` 等模糊名称。
- Prop 和 Slot 提供相同能力时，分别验证两条输入通道；优先级、覆盖和回退规则放入 `scenarios`。
- 为修复 Issue 新增或补充回归测试时，在对应的 `it` 或 `test` 紧邻上方添加 `// Issue: <完整 Issue URL>`，不要只写 Issue 编号。该规则适用于所有分组；缺少地址时获取真实地址，不得猜测或编造。
- 不为覆盖实现细节而重复相同断言，优先验证公开 API 和用户可观察行为。

## 分类示例

以组件的标题和交互能力为例：

- 单独验证 `title` Prop 能否正确渲染，放入 `props`。
- 单独验证 `title` Slot 能否正确渲染，放入 `slots`。
- 同时传入 `title` Prop 和 Slot，验证优先级或回退规则，放入 `scenarios > content priority`。
- 验证 `click` 事件的触发次数和参数，放入 `events`。
- 通过 ref 调用 `focus()` 并验证结果，放入 `instanceFunctions`。
- 验证禁用状态下点击不会触发事件，涉及 Prop 与 Event 联动，放入 `scenarios > disabled interaction`。

## 文件边界

- 多子组件分别使用独立的组件测试文件，并各自遵循组件分组规则。
- hooks 使用 `*.hooks.test.tsx`，utils 使用 `*.utils.test.tsx`；这类非组件测试不强制使用五类分组。
- 多个测试文件共用的挂载逻辑可提取到 `mount.tsx`；其中只放 mount factory、测试数据、查询方法和清理逻辑，不直接编写测试用例，也不使用五类分组。仅被单个测试文件使用的辅助逻辑保留在原测试文件中。
- 不修改自动生成的 Demo 测试，除非任务明确要求。

## 验证

从仓库根目录运行目标组件测试：

```bash
pnpm -C packages/tdesign-vue-next/test test:unit <component>
```

需要覆盖率时运行：

```bash
pnpm -C packages/tdesign-vue-next/test test:unit-coverage <component>
```

若调整存量测试结构，确保用例语义、断言和快照保持不变，并报告测试结果及未验证项。
