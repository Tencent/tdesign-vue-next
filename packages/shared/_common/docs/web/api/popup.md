---
title: Popup 弹出层
description: 弹出层组件是其他弹窗类组件如气泡确认框实现的基础，当这些组件提供的能力不能满足定制需求时，可以在弹出层组件基础上封装。
isComponent: true
usage: { title: '', description: '' }
spline: message
---

### 基础弹出层

由是让浮层内容和触发元素组成，两者均可自定义。使用 `content` 自定义浮层内容。

{{ base }}

### 触发元素

可以使用 `triggerElement` 自定义触发元素。

{{ trigger-element }}

### 不同触发方式的弹出层

提供悬浮时触发（默认）、点击时触发、获取焦点时触发、右击时触发等方式。

{{ trigger }}

### 位置方向

使用 `placement` 控制浮层方向，如果需要浮层箭头，设置 `showArrow=true` 即可。

{{ placement }}

### 浮层样式

浮层样式可以使用 overlayClassName、 overlayStyle、 overlayInnerStyle 控制。

- `overlayClassName` 用于定义浮层样式类名。
- `overlayStyle` 用于定义浮层样式，比如浮层宽度。浮层宽度默认根据内容宽度呈现，可自由设置宽度和最大宽度。
- `overlayInnerStyle` 用于定义浮层内容部分样式，比如内容最大高度以及是否出滚动条。值为类型为函数时，可以实现浮层内容宽度和触发元素同宽。

{{ style }}

### 可控制显示的弹出层

可以通过 `visible` 自由控制弹出层的显示或隐藏。

{{ visible }}

### 挂载父节点

浮层默认父节点是 `body`，可通过 `attach` 自由调整挂载的父节点元素。

{{ container }}

### 可隐藏时销毁的弹出层

`destroyOnClose` 用于控制浮层隐藏时是否销毁浮层内容。

{{ destroy }}

### 禁用状态的弹出层

组件禁用后，不再显示弹出层。

{{ disabled }}
