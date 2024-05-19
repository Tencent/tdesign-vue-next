## TDesign 公共库

公共库包含公共样式与工具函数，各框架以子仓库的形式引入此仓库。

### 目录说明

```
|-- style // 组件库 UI 开发
  |-- web // web UI 开发
  |-- mobile // mobile UI 开发
|-- js // 组件库公用函数
```

### UI 开发指南

[参考](./style/web/README.md)

### 如何进行分支开发

分支拉取规则：网页组件使用 feature/web/_ ；移动端组件使用 feature/mobile/_ ；小程序使用 feature/mp/\* 。

具体示例如下，

```
feature/web/button
feature/mobile/button
feature/mp/button
```
