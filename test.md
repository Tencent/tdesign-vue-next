# 测试规范

## 1. 概览

### 1.1 主要script命令

```
# 运行全部测试
npm run test

# 运行单元测试
npm run test:unit

# 运行服务端渲染测试
npm run test:node

# 运行监视模式
npm run test:watch

# 生成测试覆盖率报告
npm run test:coverage
```

### 1.2 目录结构

- test   测试目录
|-- e2e  UI测试
|-- unit 单元测试
|-- ssr  服务端测试
|-- ...

## 2. 单元测试

```
npm run test:unit
```

- test/unit目录中，创建对应的组件目录，用于存放测试文件
- index.test.js 用于测试组件较细粒度的属性事件方法
- demo.test.js 用于测试组件 demo 是否正常工作

### 2.1 单元测试规范
- 每个组件至少有两个单元测试文件，一个是测试源代码的单元测试文件 index.test.js，另一个则是测试组件示例代码的单元测试文件 demo.test.js
- 用例书写请使用：[vue-test-utils](https://vue-test-utils.vuejs.org/zh/)
- 断言库请使用：[https://jestjs.io/docs/en/expect](https://jestjs.io/docs/en/expect)

#### 单元测试文件
需要对组件的 props/event/slot/methods 分别覆盖测试。具体组织方式可以参考 button，简单的渲染测试可以直接使用 snapshot

#### 测试调试
可以指定 --testPathPattern 以跑特定的测试文件，例如只想看 button 的测试结果：

```
npx jest --testPathPattern test/unit/button/* --config script/test/jest.unit.conf.js
```

如果确认是预期的修改造成的 snapshot 变化，可以加上 -u 参数更新 snapshot:

```
npx jest --testPathPattern test/unit/button/* --config script/test/jest.unit.conf.js -u
```

可以浏览器打开根目录下的 test-report.html(git ignored) 查看测试报告

## 4. 服务端渲染测试

服务端渲染测试主要利用node环境下的测试快照，与已有jsdom环境快照进行对比
```
npm run test:node
```

## 注意事项


# E2E 测试

调研后发现cypress可以覆盖Puppeteer的E2E测试场景，优先选择了cypress 作为测试框架，它能实现以下功能：

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

### cli运行

```
npm run cypress
```

### GUI界面运行
```
npm run cypress-gui
```

## 测试规范

使用BDD模式进行开发，必须在流水线里面通过单元测试。

```
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

```
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
common
script 配置文件（包含测试相关配置文件）
src
test 测试目录
|-- e2e // 这里面放 e2e 的测试内容
|-- unit
|-- ssr
|-- ...
