---
title: Tag 标签
description: 定义：标签常用于标记、分类和选择。
isComponent: true
usage: { title: "", description: "" }
spline: data
---

### 基础标签

基础标签为默认的标签样式。适用于常规表单。

{{ base }}

### 带图标的标签

在标签内嵌入图标。适用于用图标来辅助标签分类，或表达标签的属性。

{{ icon }}

### 可删除和添加标签

可删除或添加的标签。添加标签可组合输入框组件使用。

{{ delete }}

### 可选择标签

标签有已选和未选两种状态，可以通过点击标签来切换。类似多选框的效果。可以通过 `checkedProps` 设置任意风格选中态，`uncheckedProps`设置任意风格未选中状态。

{{ selectable }}

### 可选择标签组

{{ check-tag-group }}

### 超长省略文本标签

通过 `maxWidth` 设置最大宽度，超出部分自动省略。

{{ long-text }}

### 不同尺寸的标签

提供大、中（默认）、小三种尺寸。

{{ size }}

### 不同形状的标签

提供方形、圆角方形、标记型三种形状。

{{ shape }}

### 自定义标签颜色

`theme`提供的颜色不满足业务需求的时候，可以通过`color` 属性自定义颜色

{{ custom-color }}
