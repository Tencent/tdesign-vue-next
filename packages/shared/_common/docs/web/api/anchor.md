---
title: Anchor 锚点
description: 页面内的超级链接，用于跳转到页面内指定位置
isComponent: true
usage: { title: '', description: '' }
spline: navigation
---

### 基础锚点

锚点间不存在层级关系。适用于锚点间为同级关系时，属于页面结构简单的场景。

{{ base }}

### 多级锚点

锚点内含有层级关系。适用锚点内含有父子级关系时，属于页面结构复杂的场景。

{{ multiple }}

### 自定义游标锚点

支持根据自己的需求，设置游标的样式
{{ cursor }}

### 指定容器锚点

指定响应滚动的容器进行锚点定位，以及 click 事件的应用，阻止锚点添加到 uri 上。

{{ container }}

### 特定交互锚点

用于锚点定位后的交互, 包括: 高亮当前锚点、复制链接

{{ target }}

### 不同尺寸的锚点

提供大、小两种尺寸

{{ small }}

{{ large }}

### 自定义锚点高亮

{{ customize-highlight }}
