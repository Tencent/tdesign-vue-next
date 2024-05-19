---
title: Swiper 轮播框
description: 轮播视图容器。
isComponent: true
usage: { title: '', description: '' }
spline: message
---


### 基本使用

轮播框组件最基本的使用

{{ base }}

### 垂直布局

通过设置`direction`为`vertical`使轮播框在垂直方向上轮播，默认为`horizontal`。

{{ vertical }}

### 导航器位置

通过设置`navigation`中的`placement`属性值来控制导航器位置，可设置位于主体的内侧或是外侧。

{{ placement }}

### 分式导航器

通过设置`navigation`中的`type`属性值为`fraction`来控制导航器以分式的样式展示，默认为`bars`。

{{ fraction }}

### 渐隐模式

通过设置`animation`属性值为`fade`来控制轮播框以渐隐的样式展示，默认为`slide`。

{{ fade }}

### 卡片模式

通过设置`type`属性值为`card`来控制导航器以卡片的样式展示。

{{ card }}

### 手动跳转

通过设置`current`属性值来控制轮播框播放哪一项，`current`起始值为`0`。

{{ current }}

### 导航器的大小

通过设置`navigation`中的`size`属性值来控制轮播框导航器的大小。

{{ size }}