---
title: AutoComplete 自动填充
description: 用于根据用户输入内容提示更多联想词场景
isComponent: true
usage: { title: '', description: '' }
spline: form
---

### 基础自动填充

{{ base }}

### 可过滤的自动填充

- 设置 `filterable` 后的默认过滤规则为：不区分大小写，文本任意位置。
- 如果 `filterable` 的默认规则不符合需求，可以使用 `filter` 自定义过滤规则。

{{ filter }}

### 可自定义联想词的自动填充

- 使用 `option` 自定义联想词

{{ option }}

### 可自定义触发元素的自动填充

{{ trigger-element }}

### 不同尺寸的自动填充

{{ size }}

### 不同状态的自动填充

{{ status }}
