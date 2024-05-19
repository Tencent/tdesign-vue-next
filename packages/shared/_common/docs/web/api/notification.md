---
title: Notification 消息通知
description: 轻量级的全局消息提示和确认机制，出现和消失时需要有缓动动画。
isComponent: true
usage: { title: '', description: '' }
spline: message
---

### 基础的消息通知

基础消息通知，可手动关闭也可自动退出。

{{ base }}

### 带图标的消息通知

带图标的消息通知提供两种情况：普通消息通知和重要消息通知（如：系统错误等）。

{{ icon }}

### 带操作的消息通知

带有操作的消息通知为用户提供下一步行动点，在消息提示框中进行简要快捷的交互。

{{ operation }}

### 位置控制

全局提示显示位置可控制，`placement` 用于控制大概位置，`offset` 用于设置相对于 `placement` 所在位置的偏移

{{ placement }}

### 关闭提示

如果不希望通过计时关闭，或者用户点击按钮关闭，也可以使用关闭函数。

{{ toggle }}
