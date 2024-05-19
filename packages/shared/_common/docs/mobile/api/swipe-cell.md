---
title: SwipeCell 滑动单元格
description: 用来承载列表中的更多操作，通过左右滑动来展示，按钮的宽度固定高度根据列表高度而变化。
spline: base
isComponent: true
toc: false
---

### 左滑单操作

{{ left-one-menu }}

### 左滑双操作

{{ left-two-menu }}

### 左滑多操作

{{ left-more-menu }}

### 左滑大列表

{{ left-card }}

### 右滑单操作

{{ right-menu }}

### 通过 expanded 实现父子组件联动

{{ bind }}

### 通过直接传入内容或者使用 slot#content 来渲染

{{ content }}

### 是否启用滑动功能

{{ disabled }}

### 左右两侧都有菜单

{{ btns }}

### 点击事件

{{ event }}

### css 样式

- slot 里面的内容需要自己定义样式
- 当使用 slot 插入按钮时，插槽第一层包裹组件设置了 height: 100%, 但是第二层内容没有设置，为了实现垂直铺满的效果，需要手动设置 style="height:100%"
- 如果是使用 #right 和#left 属性传递按钮数组，可以使用 theme 快速指定菜单背景颜色，theme 取值为 t-button 组件的 theme 取值
