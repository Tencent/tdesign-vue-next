---
title: SelectInput
description: Definition:filter general input box,
isComponent: true
usage: { title: '', description:'' }
spline: data
---

### Filter Input Box

Unified filter logic includes: input box, drop-down box, borderless mode, etc. You can use the filter input box to customize complex filters.

It is developed based on components such as `TagInput` `Input` `Popup` and supports all features of these components. It is mainly applied to filter components such as `Select` `Cascader` `TreeSelect` `DatePicker` `TimePicker`.

### Single Selection Filter Input Box

You can use `SelectInput` to customize any style of radio selector.

{{ single }}

### Multi-selection filter input box

You can use `SelectInput` to customize any style of multi-selection selector.

{{ multiple }}

### Auto-fill Filter

You can use `SelectInput` to customize any style of auto-fill filter.

{{ autocomplete }}

### Input boxes with preceding or following content

- Use `label` to customize the prefix content.
- Use `suffix` to customize the postfix content.
- The front icon is customized by using `prefixIcon`.
- Use `suffixIcon` to customize the rear icon.

{{ label-suffix }}

### Filter input boxes in different statuses

Use `status` and `tips` to control status and prompt copy.

{{ status }}

### Filter input box with adjustable width of drop-down box

Drop-down box width rule: By default, the width of the drop-down box is the same as the width of the trigger element. If the width of the drop-down box exceeds the width of the input box component, the drop-down box will be expanded automatically, but the maximum width cannot exceed `1000px`. You can also freely set the width of the drop-down box by clicking `popupProps.overlayStyle.width`.`  When the popupProps.overlayStyle`type is a function, you can dynamically control the width of the drop-down box more flexibly.

{{ width }}

### Input box with more items selected

Use `excessTagsDisplayType` to control the rendering method when the tag exceeds:Horizontal scroll display and line-feed display. The default is line-feed display.

{{ excess-tags-display-type }}

### The filter input box of the selected item can be collapsed

When the number of selected items exceeds `minCollapsedNum`, they will be collapsed. You can use `collapsedItems` to customize the rendering method in the collapse option.

{{ collapsed-items }}

### You can customize the filter input box of the selected item

Use `valueDisplay` or `tag` to customize the selected item.

{{ custom-tag }}

### Borderless Single Selection Filter

`borderless` is used to control whether to render in borderless mode.

{{ borderless }}

### Multi-selection filter in borderless mode

{{ borderless-multiple }}

### Single-selection filter with automatic width

{{ autowidth }}

### Multi-selection filter with automatic width

{{ autowidth-multiple }}
