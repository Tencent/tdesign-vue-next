---
title: Popconfirm
description: The bubble confirmation box is usually used for secondary confirmation scenarios that do not cause serious consequences. It will pop up a floating layer on the clicked element to prompt confirmation. The bubble confirmation box has no mask. Click the area outside the confirmation box to close it.
isComponent: true
usage: { title: '', description: '' }
spline: message
---

### Basic Bubble Confirmation Box

Use the instruction text and operation buttons to confirm the simpler operation twice.

{{ base }}

### Bubble confirmation boxes for different icons

Add icons before the description text, such as normal, warning and alarm icons, to enhance the expression to better attract the attention of users.

{{ icon }}

### Bubble confirmation box with description

In addition to the main description text, the detailed description related to the operation is added to describe the more complicated and confusing operation in detail.

{{ describe }}

### Customize confirmation and cancel buttons

with `confirmBtn` and `cancelBtn` attributes. You can pass Button component attributes or use slot method.

{{ button }}

### To control the position of the bubble confirmation box

`popupProps` can be used to transparently transfer all the supported properties of the Popup component that the pop-up window depends on, such as controlling the position where the pop-up window appears.

{{ inherit }}
