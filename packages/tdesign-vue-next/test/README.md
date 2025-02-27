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
# 单测
pnpm run test:unit
# 开发环境
pnpm run test:unit-dev
# 开发环境-指定组件
pnpm run test:unit-dev button
# 开发环境 展示 UI 界面
pnpm run test:unit-gui
# 开发环境 展示 UI 界面-指定组件
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

详情见 [TDesign 单元测试规范](https://github.com/Tencent/tdesign-vue-next/wiki/TDesign-%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95%E8%A7%84%E8%8C%83)。

## 测试示例

使用 BDD 模式进行开发，必须在流水线里面通过单元测试。

```ts
describe('测试按钮组件', () => {
  beforeEach(() => {
    // 打开某个页面
    cy.visit('/#/components/button');
  });
  // 测试用例定义
  it('case1: 测试三种按钮类型，内容，渲染正确的类型跟内容', function() {
  });
  it('case2: 测试按钮尺寸，渲染正确的大小', function() {
  });
  it('case3: 测试带图标按钮，按钮内容里的图标位置', function() {
  });
  it('case4: 测试loading状态的按钮', function() {
  });
});

```
