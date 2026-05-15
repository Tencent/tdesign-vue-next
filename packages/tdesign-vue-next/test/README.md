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

```bash
# 快照
pnpm run test:snap
# 更新快照
pnpm run test:snap-update
```

## 单元测试规范
1. 测试用例覆盖范围
- 组件的每个 API 都必须编写测试用例。
- 如果某个 API 同时支持基础数据类型（string/number/boolean）和复杂数据类型（Slot/Function），则需分别编写两个测试用例，覆盖不同类型的输入。
- 参考示例：Form 组件的测试用例，确保覆盖率达到或接近 100%。

2. 测试内容范围
- 组件本身的功能和行为。
- 组件内部的 hooks（自定义 Hook）。
- 组件内部的 utils（工具函数）。

3. 测试文件命名及存放规范
- 测试文件统一放置在对应组件目录下的 __tests__ 文件夹中。
- 命名规则：
  - 组件测试文件：[组件名].test.tsx，例如 form.test.tsx。
  - 多子组件场景：每个子组件单独编写测试文件，例如 form.test.tsx 和 form-item.test.tsx。
  - 组件内部 hooks 测试文件：[组件名].hooks.test.tsx，例如 form.hooks.test.tsx。
  - 组件内部 utils 测试文件：同 hooks 规则，例如 form.utils.test.tsx。

详情见 [TDesign 单元测试规范](https://github.com/Tencent/tdesign-vue-next/wiki/TDesign-%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95%E8%A7%84%E8%8C%83)。

## 测试示例

1. 编写用例
使用 BDD 模式进行开发，必须在流水线里面通过单元测试。

可参照 `packages/components/form/__tests__/form.test.tsx`

```ts
describe('组件名', () => {
  beforeEach(() => {
    // 打开某个页面
    cy.visit('/#/components/button');
  });
  describe('props', () => {
    it(':propsName[propsTypes]', async () => {
      ...
    });
    ...
  })
  describe('events', () => {
    it('eventsName', async () => {
      ...
    })
    ...
  })
  describe('instanceFunctions', () => {
    it('instanceFunctionsName', async () => {
      ...
    })
    ...
  })
});

```

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
