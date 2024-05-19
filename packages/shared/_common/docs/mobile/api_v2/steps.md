---
title: Steps 步骤条
description: 用于任务步骤展示或任务进度展示。
spline: base
isComponent: true
toc: false
---

## 代码演示

步骤条，方向可以横向和纵向，可以自定义步骤条显示内容以及是否可写

### 组件类型

#### 水平步骤条

支持三种类型：序号、图标、简略

{{ horizontal }}


#### 垂直步骤条

支持三种类型：序号、图标、简略

{{ vertical }}

### 组件状态

#### 选项卡状态

共支持 4 种状态：未完成（default）、已完成（finish）、进行中（process）、错误（error）

{{ status }}


#### 特殊类型

通过已有特性，改造出两种常见类型：

- 垂直自定义（在 Cascader 中使用）
- 纯展示步骤条
- 可以参考以下代码实现

{{ special }}