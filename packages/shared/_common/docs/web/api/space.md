---
title: Space 间距
description: 控制组件之间的间距。
isComponent: true
usage: { title: '', description: '' }
spline: layout
---

### 基本用法

默认为横向排列，控制相邻组件水平间距。

{{ base }}

### 垂直间距

可以设置 `direction=vertical` 调整为竖向排列。

{{ vertical }}

### 间距大小

可以通过 `size` 调整间距大小，自带三个可选值 `small`、`medium`、`large`。
也可以自定义设置，设置为数组时参数为 `[row-gap, column-gap]`。

{{ size }}

### 对齐方式

可以通过 `align` 设置辅轴对齐方式，效果与 `align-items` 一致。

{{ align }}

### 自动换行

可以通过 `breakLine` 控制是否自动换行，默认不换行。

{{ break-line }}

### 设置分隔符

可以通过 `separator` 设置分隔符。

{{ separator }}
