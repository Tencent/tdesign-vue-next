---
title: Tooltip 文字提示
description: 用于文字提示的气泡框。
isComponent: true
usage: { title: '', description: '' }
spline: data
---

### 基础用法

{{ base }}
### 带箭头的文字提示

带箭头的文字提示有较明确的指向性。常用于有多个需要提示的信息并列放置时，对某个具体信息进行提示。

{{ arrow }}

### 不带箭头的文字提示

不带箭头的文字提示没有明确指向性。常用于不需要针对性提示的场景中。 

{{ no-arrow }}

### 带主题色的文字提示

提供浅灰色、蓝色、绿色、红色、黄色主题的文字提示。

{{ theme }}
### 不同触发方式的文字提示

支持常见元素事件触发文字提示。

{{ trigger }}

### 轻量文字提示

悬浮元素出现文字提示，不依赖 Popup，具体 API 请参考 `TooltipLite Props`

{{ lite }}
