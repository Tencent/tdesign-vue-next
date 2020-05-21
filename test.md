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

## 4. 服务端渲染测试

服务端渲染测试主要利用node环境下的测试快照，与已有jsdom环境快照进行对比
```
npm run test:node
```

## 注意事项

