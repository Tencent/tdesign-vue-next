# 测试规范

## 概览

### 主要 script 命令

```bash
## 组件单元测试与组件快照测试
npm run test

## 快照更新
npm run test:update
```

### 组件单元测试 `unit`

```bash

npm run test:unit

## 开发环境
npm run test:unit-dev

## 开发环境-指定组件
npm run test:unit-dev button

## 开发环境gui
npm run test:unit-gui

## 开发环境gui-指定组件
npm run test:unit-gui button

## 生成覆盖率报告
npm run test:unit-coverage
```

### 组件快照测试 `snap`

```bash
npm run test:snap
```

### 目录结构

```
test   测试目录
|-- e2e  UI测试
|-- unit 单元测试
|-- snap  快照测试
|-- ...
```

## 单元测试

```shell
npm run test:unit
```

详情见 [TDesign 单元测试规范](https://github.com/Tencent/tdesign-vue-next/wiki/TDesign-%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95%E8%A7%84%E8%8C%83)

## 注意事项

## E2E 测试

调研后发现 cypress 可以覆盖 Puppeteer 的 E2E 测试场景，优先选择了 cypress 作为测试框架，它能实现以下功能：

- 开箱即用
- 官方 doc 很多，利于开发与维护
- gui 界面（ env：google 浏览器），可边测边调整
- 自定义 commands
- 自定义 fixture，可 mock 数据
- 支持 ci 运行测试，可上传到 bashBoard
- 关注测试覆盖率（ Chrome 的 coverage ）
- 截图功能，用例失败的场景节点会被截图保存，利于复现
- 录屏功能，每个测试用例都会记录下来（ MP4 ）
- 社区其他的插件支持

## 如何运行

### cli 运行

```shell
npm run cypress
```

### GUI 界面运行

```shell
npm run cypress-gui
```

## 测试规范

使用 BDD 模式进行开发，必须在流水线里面通过单元测试。

```shell
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

## 测试示例

```shell
describe('测试按钮组件', () => {
  beforeEach(() => {
    // 打开某个页面
    cy.visit('/#/components/button');
  });
  // 测试用例定义
  it('case1: 测试三种按钮类型，内容，渲染正确的类型跟内容', function() {
    cy.get('.button')
      .should(ele => {
        expect(ele).to.have.text('按钮1');
      });
    ...
  });
  it('case2: 测试按钮尺寸，渲染正确的大小', function() {
  });
  it('case3: 测试带图标按钮，按钮内容里的图标位置', function() {
  });
  it('case4: 测试loading状态的按钮', function() {
  });
});

```

## 注意事项

e2e 测试建议放在 test/e2e/ 目录下面
common script 配置文件（包含测试相关配置文件）

```
src
test 测试目录
|-- e2e // 这里面放 e2e 的测试内容
|-- unit
|-- ssr
|-- ...
```
