---
title: Textarea 多行文本框
description: 用于承载用户多行信息录入的组件，常用于描述信息、反馈表单中意见等需要一段相当长文本的场景。可以设置最大文案长度。
isComponent: true
usage: { title: '', description: '' }
spline: form
---

### 基础多行文本框

用于多行文本的输入。

{{ base }}

### 限制最大字符数

限制输入的最大字符数并展示字符数。

{{ maxlength }}

### 绑定 DOM 事件

可绑定 `onKeypress` `onKeydown` `onKeyup` `onFocus` `onBlur` 等 DOM 原生事件。

{{ events }}

### 不同状态的多行文本框

支持只读、禁用状态。

{{ type }}
