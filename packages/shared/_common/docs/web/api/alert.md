---
title: Alert 警告
description: 警告条用于承载需要用户注意的信息。
isComponent: true
usage: { title: '', description: '' }
spline: message
---

### 基础警告

使用简洁文字提示的最基础警告条，包含 4 种情况的提示：普通消息，成功，警示，失败。

{{ base }}

### 带操作的警告

当需要对此警告做操作，可以配置 `operation` 来增加相关操作。

{{ operation }}

### 带相关描述文字的警告

当信息内容较复杂时，可使用相关描述文字辅助说明。

{{ title }}

### 折叠的警告

当信息内容超过 2 行时，可使用折叠的方式将部分信息隐藏。

{{ collapse }}
