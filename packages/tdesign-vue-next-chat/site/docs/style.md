---
title: 自定义样式
description: 样式自定义指南
spline: explain
isGettingStarted: true
---

## 概述

TDesign AIGC 系列组件底层UI基于 Web Components 技术构建，提供了灵活的样式自定义方案。由于 Web Components 的 Shadow DOM 特性，传统的 CSS 选择器无法直接穿透组件内部样式，因此我们提供了两种主要的样式自定义方式：

1. **CSS 自定义属性（CSS Variables）**：修改预定义的 CSS 变量来调整组件样式
2. **CSS Parts**：通过 `::part()` 伪元素选择器直接修改组件内部元素样式[了解更多](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

## 方式一：CSS 自定义属性（优先推荐）

组件内部定义了丰富的 CSS 自定义属性，你可以通过重新定义这些变量来自定义样式，以设置对话输入框的背景色为例：

```css
/* 全局定义 */
:root {
  --td-chat-input-background: red;
}

/* 针对特定组件实例内部定义，优先级更高 */
.my-chat-sender {
  --td-chat-input-background: blue;
}

```

## 方式二：CSS Parts

CSS Parts 允许你直接选择和修改 Web Components 内部的特定元素。组件通过 `exportparts` 属性暴露内部元素[了解更多](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/exportparts)，你可以使用 `::part()` 伪元素选择器来修改这些元素的样式。

以设置对话输入框圆角为例，先在chrome调试器中查看内部元素style，找到计划要设置样式的元素节点对应的part属性`t-chat__input__content`：

```html
<t-chat-sender class="my-chat-sender" exportparts="t-chat__input, t-chat__input__content">
  <div class="t-chat__input" part="t-chat__input">
    <div class="t-chat__input__content" part="t-chat__input__content"></div>
  </div>
</t-chat-sender>

```

```css
.my-chat-sender::part(t-chat__input__content) {
  border-radius: 2px;
}
```

## 最佳实践

在实际项目中，你可以组合使用上面两种方式来实现更精细的样式控制，建议优先使用 CSS 变量进行基础样式调整，在需要精细控制时再使用 CSS Parts。具体如下：

### 1. 优先使用 CSS 变量
- CSS 变量提供了更好的一致性和可维护性
- 支持动态主题切换
- 性能更好，避免了复杂的选择器

### 2. CSS Parts 用于精细控制
- 当未找到合适的 CSS 变量或者无法满足需求时使用 CSS Parts
- 可以访问伪元素和伪类

比如，如果希望改变对话输入框字体大小和hover态 ，可以这样写：

```css
.accessible-chat {
  --td-chat-input-font-size: 16px;
}
```

```css
.accessible-chat chat-sender::part(t-textarea__inner):hover {
  outline: 2px solid #0052d9;
}
```


## 常见问题

### Q: 为什么我的 CSS 选择器不生效？
A: 组件内部有使用 Shadow DOM，外部 CSS 无法直接穿透。请使用 CSS 变量或 CSS Parts 的方式修改。

### Q: 如何知道组件支持哪些 CSS 变量？
A: Chrome Style查找元素样式，或查看[仓库内组件的样式文件](https://github.com/TDesignOteam/tdesign-web-components/blob/develop/src/chatbot/style/_var.less)（_var.less），所有以 `--td-` 开头的都是可自定义的变量。
