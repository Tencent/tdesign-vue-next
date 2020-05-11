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

### 2.1 注册组件
在`script/test/setup.js`中注册要测试的组件

### 2.2 添加单元测试用例

- test/unit目录中，创建对应的组件目录，用于存放测试文件
- 在上述测试组件目录中增加`index.test.js`
- 用例书写请使用vue-test-utils

## 3. 快照测试

```
npm run test:snapshot
```

### 3.1 添加快照测试入口

- 在test/unit对应的组件目录增加快照测试入口文件`snapshot.test.js`
- 加入测试代码，测试代码请参考`test/unit/button/snapshot.test.js`
- 运行测试命令时，会自动在当前目录下生成测试快照__snapshots__

## 4. 服务端渲染测试

服务端渲染测试主要利用node环境下的测试快照，与已有jsdom环境快照进行对比
```
npm run test:node
```

## 注意事项
由于vue-jest的限制，在组件vue文件中引入ts文件，而该ts文件又调用Vue，比如Vue.extend，则会解析失败。
