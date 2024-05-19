---
title: Link 链接
description: 文字超链接用于跳转一个新页面，如当前项目跳转，友情链接等。
isComponent: true
usage: { title: '', description: '' }
spline: base
---

### 文字链接

#### 基础文字链接

最简单的文字链接形式，点击后直接跳转到对应链接。

{{ base }}

#### 下划线文字链接

在文字下加横线，表明此处为链接。

{{ underline }}

#### 带图标的文字链接

文字链接与图标搭配使用，通过图标快速了解链接所代表的含义。

{{ icon }}


### 链接悬浮态样式的链接

悬浮状态包含 2 种状态：文本颜色变化 和 添加下划线。由 `hover` 控制，可选值：`color | underline` 

{{ hover }}

### 提示不同状态的链接

在`default、primary、success、warning、danger`不同状态下，可提供对应的链接主题色。

{{ theme }}

### 禁用的链接

当链接不可用时，显示禁用状态。

{{ disabled }}

### 不同尺寸的链接

提供大、中（默认）、小三种尺寸。

{{ size }}

