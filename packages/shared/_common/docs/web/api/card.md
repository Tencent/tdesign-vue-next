---
title: Card 卡片
description: 最基础的卡片容器，可承载文字、列表、图片、段落，常用于后台概览页面。
isComponent: true
usage: { title: '', description: '' }
spline: data
---

### 极简卡片

仅有内容的卡片形式。

#### 有边框

{{ bordered }}

#### 无边框

{{ bordered-none }}

### 带 header 的卡片

由极简卡片上方的标题栏组成，标题栏中可包含标题、图片、操作区、状态等内容。顶部栏可以定义所有的内容，以用户的自定义元素为准。

#### 不带分割线

{{ header }}

#### 带分割线

{{ header-bordered }}

### 带 footer 的卡片

由极简卡片下方的底部栏组成，可包含标题、图片、操作区、状态等内容。

{{ footer }}

#### 全部为操作内容的底部栏

{{ footer-actions }}

#### 全部为展示内容的底部栏

{{ footer-content }}

#### 同时带展示内容与操作内容的底部栏

{{ footer-content-actions }}

### 同时带 header 和 footer 的卡片

由顶部栏、底部栏和极简卡片组成的复杂卡片，三个区域内容可根据需要对内容进行配置。

{{ header-subtitle-footer-actions }}

{{ header-footer-actions }}

### 不同标题内容的卡片

带有主标题、副标题、或标题描述的卡片。

#### 带主副标题的卡片

{{ header-subtitle }}

#### 带标题描述的卡片

{{ header-description }}

#### 同时带主副标题与标题描述的卡片

{{ header-all-props }}


#### 自定义loadingProps的卡片

{{ custom-loading-props }}
