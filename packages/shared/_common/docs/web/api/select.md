---
title: Select 选择器
description: 用于收纳大量选项的信息录入类组件。
isComponent: true
usage: { title: "", description: "" }
spline: form
---

### 单选选择器

提供单选的选择器，选取后只展示单个内容。

使用 `options` 配置下拉选项时，如果数据字段不是 `label` 和 `value`，可以使用 `keys` 定义别名。

{{ base }}

### 多选选择器

提供多选的选择器，通过标签展示多选内容。添加属性 `multiple` 即可设置为多选。

{{ multiple }}

### 分组选择器

对信息进行分组的选择器，能够直观呈现方便用户辨识。在有层级关系，但选项内容较少的场景下使用。

{{ group }}

### 不同状态的选择器

提供 普通状态、禁用状态、加载状态 三种状态的选择器。

{{ status }}

### 不同尺寸的选择器

提供大、中（默认）、小三种不同尺寸的的选择器。

{{ size }}

### 自定义下拉选项的选择器

{{ custom-options }}

### 自定义面板的选择器

可以使用 `panelTopContent` 和 `panelBottomContent` 自定义下拉面板的顶部内容和底部内容。

{{ panel }}

### 自定义选中项的选择器

{{ custom-selected }}

### 自定义折叠选中项选择器

多选情况下，超出该数值的选中项折叠。

{{ collapsed }}

### 可过滤的选择器

输入过滤已选项。在有特定诉求的业务场景时使用。默认过滤文本，有 `filter` 方法时，按照 `filter` 方法过滤。

1、`filterable`和`onSearch`(`@search`)存在时，执行远程搜索。

2、`filter`存在时（不需要有`filterable`），执行`filter`方法。

3、仅有`filterable`时，执行默认过滤 不区分大小写。

{{ filterable }}

### 远程搜索选择器

可根据需求定制选择器内容。在有复杂逻辑或有特定诉求的业务场景时使用。`reserveKeyword` 用于 `multiple` 且 `filterable` 时，选中一个选项后保留当前的搜索关键词。

{{ remote-search }}

### 可创建新条目的选择器

允许用户创建新条目，需配合 `filterable` 使用。

{{ creatable }}

### 限制可选数目的选择器

限制多选选择器的最大可选数目。通常在需要限制多选可选数目时使用。

{{ max }}

### 有前缀图标的选择器

可定制前缀图标。

{{ prefix }}

### 文字选择器/无边框的选择器

通过文字按钮触发的选择器，用于修改内容。通常在空间受限、并且需要轻量化选择的场景使用。

{{ noborder }}

### 已选值为对象的选择器

定制已选项输出值类型。需要输出选中值包含 label 时使用。

{{ label-in-value }}

### 自定义下拉框宽度的选择器

自定义下拉样式的选择器，在需要自定义下拉样式时使用。

下拉框宽度默认和输入框宽度同宽，如果内容宽度超出会自动变宽。可使用 `popupProps.overlayInnerStyle` 自由控制宽度。

{{ popup-props }}

### 通过滚动事件加载选项的选择器

业务中常常有选项通过滚动触底持续加载的需求，通过`popup.onScroll`或`popup.onScrollToBottom`，可以快速实现滚动加载选项的能力。

{{ scroll-bottom }}

### 开启虚拟滚动的选择器

- 虚拟滚动一般用于数据量较大的场景，设置 `scroll={ type: 'virtual' }` 即可开启虚拟滚动模式，通过 `scroll.bufferSize` 预设加载过程中提前加载的数据数量。
- 为保证组件收益最大化，当数据量小于 `threshold` 时，无论虚拟滚动的配置是否存在，组件内部都不会开启虚拟滚动，`threshold` 默认为 `100`。

{{ virtual-scroll }}
