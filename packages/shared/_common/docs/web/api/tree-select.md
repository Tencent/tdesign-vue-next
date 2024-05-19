---
title: TreeSelect 树选择
description: 类似 Select 的信息录入控件，适用于选择树形的数据结构。
isComponent: true
usage: { title: '', description: '' }
spline: form
---

### 基础树选择

最基本的使用方法，常用于选择省份。

{{ base }}

### 带多选的树选择

允许选取多个选项。

{{ multiple }}

### 可过滤的树选择

树结构支持过滤。

{{ filterable }}

### 复杂数据类型

支持控制选中值的类型。

{{ valuetype }}

### 属性透传

支持透传 `popupProps` 和 `treeProps` 。

{{ props }}

### 异步加载

通过透传实现异步加载树节点。

{{ lazy }}

### 可折叠选项

多选情况下，超出该数值的选中项折叠。

{{ collapsed }}

### 自定义选中项展示

支持自定义选中项展示，常用于组合 label 和 value 展示。

{{ valuedisplay }}

### 自定义前后缀

支持自定义选择器的前缀、后缀，也可以使用suffixIcon自定义翻转箭头图标。

{{ prefixsuffix }}
