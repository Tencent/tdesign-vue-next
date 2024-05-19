---
title: Breadcrumb 面包屑
description: 显示当前页面在系统层级结构的位置，并能返回之前任意层级的页面。
isComponent: true
usage: { title: '', description: '' }
spline: navigation
---

### 基础面包屑

适用于广泛的基础用法，系统拥有超过两级以上的层级结构，用于切换向上任意层级的内容。

{{ base }}

### 带图标的面包屑

可自定义每项内容，统一图标加文字，图标放在文字前面。

{{ icon }}

### 自定义分隔符的面包屑

通过 `separator` 属性自定义分隔符，建议用图标而非文本符号。

{{ custom }}

<!-- ### 带下拉的面包屑
面包屑支持下拉菜单，带下拉的面包屑分隔符建议避免使用 “ > ”。

{{ dropdown }} -->

### 使用 options 配置面包屑

使用 `options` 属性配置面包屑内容。

{{ options }}
