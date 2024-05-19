---
title: Image 图片
description: 用于展示图片素材。
isComponent: true
usage: { title: '', description: '' }
spline: data
---

### 基础图片

不同填充模式的图片

提供 fill、contain、cover、none、scale-down 5 种填充类型。

{{ fill-mode }}

不同填充位置的图片

图片相对于容器的位置。当图片过大时，提供显示图片的局部左侧对齐、或右侧对齐的不同位置。

{{ fill-position }}

### 不同形状的图片

提供方形、圆角方形、圆角 3 种形状。

当图片长宽不相等时，无法使用 circle 展示一个正圆。

{{ shape }}

### 图集样式的图片

图片呈现图集样式的效果。

{{ gallery-cover }}

### 加载状态的图片

显示加载的不同状态，提供默认、自定义两种占位样式。

{{ placeholder }}

### 图片懒加载

#### 单图用法

placeholder 在图像加载时占位显示。

{{ lazy-single }}

#### 图片列表用法

多张图片滚动下拉时，尚未出现的图片会用占位图表示，呈现懒加载的效果。

{{ lazy-list }}

### 图片扩展元素

带有悬浮层的图片。

#### 始终显示

悬浮层常驻显示，不因用户操作出现或消失。

{{ extra-always }}

#### 悬浮显示

默认不显示悬浮层，鼠标悬浮到图片区域后悬浮层出现。

{{ extra-hover }}

### 支持 `avif` 和 `webp` 格式的图片

支持使用 `srcset` 设置特殊格式的图片渲染，如 `.avif` 和 `.webp`。图片转码为 AVIF/WEBP 推荐使用腾讯云数据万象<a href="https://cloud.tencent.com/document/product/436/60455">图片压缩服务</a>。

{{ avif }}
