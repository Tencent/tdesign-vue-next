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

# 运行快照测试
npm run test:snapshot

# 运行监视模式
npm run test:watch
```

### 1.2 目录结构

- test   测试目录
|-- e2e UI测试
|-- unit 单元测试
|-- shared 公共方法
|-- ...

## 2. 单元测试

```
npm run test:unit
```

- test/unit目录中，创建对应的组件目录，用于存放测试文件
- index.test.js 用于测试组件较细粒度的属性事件方法
- demo.test.js 用于测试组件 demo 是否正常工作

### 2.1 单元测试规范
- 每个组件至少有一个单元测试文件 index.test.js 和一个 demo 测试文件 demo.test.js
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
由于vue-jest的限制，在组件vue文件中引入ts文件，而该ts文件又调用Vue，比如Vue.extend，则会解析失败。
