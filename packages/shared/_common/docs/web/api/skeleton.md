---
title: Skeleton 骨架屏
description: 当网络较慢时，在页面真实数据加载之前，给用户展示出页面的大致结构。
isComponent: true
usage: { title: '', description: '' }
spline: data
---

### 基础骨架屏

最简单的骨架屏效果。

{{ base }}

### 带动画效果的骨架屏

提供渐变和闪烁两种动画效果。

{{ animation }}

### 带延迟效果的骨架屏

设置最短延迟响应时间，低于响应时间的操作不显示加载状态。

{{ delay }}

### 不同主题的骨架屏

可以通过 `theme` 属性快速定义不同主题风格的骨架屏。

{{ theme }}

### 组合用法

包含图片、文字、按钮、输入框、头像、标签等多种元素组合在一起的占位效果。

{{ advance }}