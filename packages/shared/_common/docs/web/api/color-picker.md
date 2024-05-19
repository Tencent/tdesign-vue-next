---
title: ColorPicker 颜色选择器
description: 用于颜色选择，支持多种格式。
isComponent: true
usage: { title: '', description: '' }
spline: form
---

### 面板颜色选择器

没有触发器，直接显示颜色选择器面板。

{{ panel }}

### 带触发元素的颜色选择器

通过触发器触发显示选择器面板，透传全部属性到面板选择器组件。

{{ trigger }}

### 不同色彩模式的颜色选择器

支持单色模式、线性渐变两种颜色模式选择，可单独一种模式使用，也可同时两种模式切换。使用 `colorMode` 进行配置。

{{ color-mode }}

### 允许调整透明度的颜色选择器

设置 `enableAlpha=true` 即可开启选择器的透明度设置。

{{ enable-alpha }}

### 可配置系统色的颜色选择器

可以通过 `swatchColors` 配置系统预设颜色，值为 null 或 [] 则不显示系统色。

{{ swatch-color }}

### 可配置最近使用颜色的颜色选择器

可以通过 `recentColors` 配置最近使用的颜色，值为 [] 表示以组件内部的“最近使用颜色”为准，值长度大于 0 则以该值为准显示“最近使用颜色”。值为 null 则完全不显示“最近使用颜色”。

{{ recent-color }}

### 禁用状态的颜色选择器

{{ status-disabled }}

### 只读状态的颜色选择器

{{ status-readonly }}