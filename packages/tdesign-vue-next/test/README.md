# 测试规范

## 概览

### 主要 script 命令

```bash
# 组件单元测试与组件快照测试
pnpm run test
# 快照更新
pnpm run test:update
```

### 组件单元测试 `unit`

```bash
# 运行全量单测
pnpm run test:unit
# 运行全量单测并 watch 更改
pnpm run test:unit-dev
# 指定组件进行单测，组件测试时推荐使用此方式
pnpm run test:unit-dev button
# 展示 UI 界面，可查看覆盖率
pnpm run test:unit-gui
# 展示 UI 界面-指定组件
pnpm run test:unit-gui button
# 生成覆盖率报告
pnpm run test:unit-coverage
```

### 组件快照测试 `snap`

Demo 快照测试由 `packages/tdesign-vue-next/test/src/snap/csr.test.ts` 和 `packages/tdesign-vue-next/test/src/snap/ssr.test.ts` 集中维护，不需要为每个组件单独创建 `demo.test.tsx`，也不适用组件单测的五类分组。

```bash
# 快照
pnpm run test:snap
# 更新快照
pnpm run test:snap-update
```

## 单元测试规范

### 测试用例覆盖范围

- 组件的每个 API 都必须编写测试用例。
- 如果某个 API 同时支持基础数据类型（string/number/boolean）和复杂数据类型（Slot/Function），则需分别编写测试用例，覆盖不同类型的输入。
- 参考 Form 组件的测试用例，确保覆盖率达到或接近 100%。

### 测试内容范围

- 组件本身的功能和行为。
- 组件内部的 hooks（自定义 Hook）。
- 组件内部的 utils（工具函数）。

### 测试文件命名及存放规范

- 测试文件统一放置在对应组件目录下的 `__tests__` 文件夹中。
- 组件测试文件：`[组件名].test.tsx`，例如 `form.test.tsx`。
- 多子组件场景：每个子组件单独编写测试文件，例如 `form.test.tsx` 和 `form-item.test.tsx`。
- 组件内部 hooks 测试文件：`[组件名].hooks.test.tsx`，例如 `form.hooks.test.tsx`。
- 组件内部 utils 测试文件：`[组件名].utils.test.tsx`，例如 `form.utils.test.tsx`。
- 多个测试文件共用的挂载逻辑可提取到 `mount.tsx`，用于存放 mount factory、测试数据、查询方法和清理逻辑；仅被单个测试文件使用的辅助逻辑应保留在原测试文件中。
- `mount.tsx` 是测试辅助文件，不直接编写测试用例，也不要求使用组件测试分组。

### 组件测试分组规范

组件测试使用 BDD 模式。顶层 `describe` 使用组件名，其直接子级按以下类别组织：

- `props`：验证不同 Props 对组件渲染和行为的影响。
- `events`：验证事件触发时机及回调参数。
- `slots`：验证默认插槽、具名插槽和作用域插槽。
- `instanceFunctions`：验证组件通过 ref 暴露的实例方法。
- `scenarios`：验证多 API 联动、完整交互流程、不同模式和边界情况。

遵循以下原则：

- 分组按需创建，不保留空的 `describe`。
- 组件根 `describe` 下不直接放置 `it` 或 `test`。
- 能明确归属于单一公开 API 类型的测试放入前四类；跨多个 API 或无法归属于单一 API 的完整行为放入 `scenarios`。
- `scenarios` 可继续按具体功能嵌套分组，例如 `keyboard interaction`、`range selection` 或 `edge cases`，避免使用 `others`、`misc` 等含义模糊的名称。
- 当 Prop 和 Slot 提供相同能力时，分别在 `props` 和 `slots` 中验证各自的输入通道；两者同时使用时的优先级、覆盖和回退规则放入 `scenarios`。
- 为修复 Issue 新增或补充的回归测试，应在对应的 `it` 或 `test` 紧邻上方以 `// Issue: <完整 Issue URL>` 标注来源，不只填写 Issue 编号。该规则适用于所有分组，不限于 `scenarios`。
- hooks、utils 等非组件测试不强制使用上述五类分组；子组件测试仍遵循组件测试分组规范。

```ts
// Issue: https://github.com/Tencent/tdesign-vue-next/issues/1234
it('handles the reported edge case', () => {});
```

详情见 [TDesign 单元测试规范](https://github.com/Tencent/tdesign-vue-next/wiki/TDesign-%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95%E8%A7%84%E8%8C%83)。

## 测试示例

使用 BDD 模式进行开发，测试必须在流水线中通过。可参照 `packages/components/form/__tests__/form.test.tsx`。

```ts
describe('ComponentName', () => {
  // 组件属性测试：验证不同 Props 对渲染和行为的影响
  describe('props', () => {});

  // 组件事件测试：验证事件触发时机及回调参数
  describe('events', () => {});

  // 组件插槽测试：验证默认插槽、具名插槽和作用域插槽
  describe('slots', () => {});

  // 组件实例方法测试：验证通过 ref 暴露的方法
  describe('instanceFunctions', () => {});

  // 综合场景测试：验证多 API 联动、交互流程和边界情况
  describe('scenarios', () => {});
});
```

示例用于展示完整结构；实际测试中应删除没有对应测试用例的空分组。

2. 命令行查看测试用例

```bash
pnpm run test:unit-dev button
```

3. 通过 UI 查看更多细节

```bash
pnpm run test:unit-gui button
```

<img src="/docs/imgs/test-ui-dashboard.png" alt="test ui demo"/>

<img src="/docs/imgs/test-ui-coverage.png" alt="test ui demo"/>
