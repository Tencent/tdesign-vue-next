---
title: Popup
description: The pop-up layer component is the basis for the implementation of other pop-up window components such as the bubble confirmation box. When the capabilities provided by these components cannot meet the customization requirements, they can be encapsulated on the basis of the pop-up layer component.
isComponent: true
usage: { title: '', description: '' }
spline: message
---

### Basic pop-up layer

It consists of a floating layer content and a trigger element, both of which can be customized. Use `content` to customize the floating layer content.

{{ base }}

### Trigger Element

You can use `triggerElement` to customize the trigger element.

{{ trigger-element }}

### Popup Layer with Different Trigger Methods

Trigger when floating (default), trigger when clicking, trigger when getting focus, trigger when right-clicking, etc.

{{ trigger }}

### Location Direction

Use `placement` to control the direction of the floating layer. If you need a floating layer arrow, set `showArrow=true`.

{{ placement }}

### Floating Layer Style

The floating layer style can be controlled using overlayClassName, overlayStyle, overlayInnerStyle.

- `overlayClassName` is used to define the floating layer style class name.
- `overlayStyle` is used to define the floating layer style, such as the floating layer width. The width of the floating layer is rendered according to the content width by default, and the width and maximum width can be freely set.
- `overlayInnerStyle` is used to define the style of the floating layer content, such as the maximum height of the content and whether to display a scroll bar. When the value is of type function, the width of the floating layer content can be the same as that of the trigger element.

{{ style }}

### Pop-up layer that can be displayed

You can freely control the display or hiding of the pop-up layer by using `visible`.

{{ visible }}

### Mounting Parent Node

The default parent node of the floating layer is `body`. You can freely adjust the parent node element mounted by `attach`.

{{ container }}

### Destroy pop-up layer when it can be hidden

`destroyOnClose` is used to control whether to destroy the floating layer content when the floating layer is hidden.

{{ destroy }}

### Disable pop-up layer

When the component is turned off, the pop-up layer is no longer displayed.

{{ disabled }}
