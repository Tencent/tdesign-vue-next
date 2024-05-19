---
title: SelectInput 筛选器输入框
description: 定义：筛选器通用输入框，
isComponent: true
usage: { title: '', description: '' }
spline: data
---

### 筛选器输入框

统一筛选器逻辑包含：输入框、下拉框、无边框模式等，可以使用筛选器输入框定制复杂的筛选器。

基于 `TagInput` `Input` `Popup` 等组件开发，支持这些组件的全部特性。将主要应用于 `Select` `Cascader` `TreeSelect` `DatePicker` `TimePicker` 等筛选器组件。

### 单选筛选器输入框

可使用 `SelectInput` 自由定制任何风格的单选选择器。

{{ single }}

### 多选筛选器输入框

可使用 `SelectInput` 自由定制任何风格的多选选择器。

{{ multiple }}

### 自动填充筛选器

可使用 `SelectInput` 自由定制任何风格的自动填充筛选器。

{{ autocomplete }}

### 有前置或后置内容的输入框

- 前置内容使用 `label` 自定义。
- 后置内容使用 `suffix` 自定义。
- 前置图标使用 `prefixIcon` 自定义。
- 后置图标使用 `suffixIcon` 自定义。

{{ label-suffix }}

### 不同状态的筛选器输入框

使用 `status` 和 `tips` 控制状态和提示文案。

{{ status }}

### 可调整下拉框宽度的筛选器输入框

下拉框宽度规则：下拉框宽度默认和触发元素宽度保持同宽，如果下拉框宽度超出输入框组件会自动撑开下拉框宽度，但最大宽度不超过 `1000px`。也可以通过 `popupProps.overlayInnerStyle.width` 自由设置下拉框宽度。`popupProps.overlayInnerStyle` 类型为函数时，可以更灵活地动态控制下拉框宽度。

{{ width }}

### 选中项数量超出的输入框

使用 `excessTagsDisplayType` 控制标签超出时的呈现方式：横向滚动显示和换行显示，默认为换行显示。

{{ excess-tags-display-type }}


### 可折叠选中项的筛选器输入框

选中项数量超过 `minCollapsedNum` 时会被折叠，可使用 `collapsedItems` 自定义折叠选项中的呈现方式。

{{ collapsed-items }}

### 可自定义选中项的筛选器输入框

使用 `valueDisplay` 或者 `tag` 自定义选中项。

{{ custom-tag }}

### 无边框模式的单选筛选器

`borderless` 用于控制是否呈现为无边框模式。

{{ borderless }}

### 无边框模式的多选筛选器

{{ borderless-multiple }}

### 自动宽度的单选筛选器

{{ autowidth }}


### 自动宽度的多选筛选器

{{ autowidth-multiple }}
