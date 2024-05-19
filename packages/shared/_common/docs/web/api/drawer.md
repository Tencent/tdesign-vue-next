---
title: Drawer 抽屉
description: 抽屉常通过单击临近的按钮控件打开，从屏幕边缘滑入的浮层面板，又称半屏弹窗。
isComponent: true
usage: { title: '', description: '' }
spline: message
---

### 可查看的抽屉

承载展示性的信息内容。当页面空间有限时，可用抽屉增大页面扩展性。

{{ base }}

### 可操作的抽屉

操作类抽屉在抽屉中承载需要编辑或操作的表单，可在用户需要操作时使用。

{{ operation }}

### 不显示蒙层的抽屉

通过设置`showOverlay`，可以控制是否显示抽屉的蒙层。

{{ no-mask }}

### 不同位置的抽屉

通过`placement`，可以让抽屉在不同的位置展示。

{{ placement }}

### 不同尺寸的抽屉

通过 `size` 属性控制抽屉展示宽度。

{{ size }}

### 自定义头部和底部的抽屉

通过`header`和`footer` 可以调整抽屉的头部和底部内容。

{{ custom }}

### 弹出模式抽屉

支持覆盖及推开内容区域的方式展示抽屉，
整个页面的 `push` 模式需设置 `attach` 为 body。（抽屉组件默认挂载到元素本身所在的位置）。

{{ popup }}

### 渲染和呈现在当前父元素的抽屉

通过 `showInAttachedElement` 属性指定抽屉出现的父容器元素，父元素需要有定位属性，如：position: relative。

{{ attach-parent }}

### 关闭时销毁抽屉

通过`destroyOnClose`，可以在关闭抽屉时将抽屉从页面节点上销毁。

{{ destroy }}

### 可拖拽的抽屉

通过`sizeDraggable`，可以拖拽抽屉的边缘自由改变抽屉的大小。

{{ size-draggable }}
