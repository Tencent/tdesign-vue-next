---
title: Select
description: An information entry class component for accommodating a large number of options.
isComponent: true
usage: { title: "", description: "" }
spline: form
---

### Single Selector

Provide a single selector, select only a single display content.

When using `options` to configure drop-down options, if the data fields are not `label` and `value`, you can use `keys` to define aliases.

{{ base }}

### Multi-selection selector

Provide a multi-choice selector to display multi-choice content through tags. Add the attribute `multiple` to set multi-selection.

{{ multiple }}

### Group Selector

The selector for grouping information can be visually presented for user identification. Use in scenarios where there are hierarchical relationships but few options.

{{ group }}

### Selectors in different statuses

It provides the selector of three states: normal state, disabled state and loading state.

{{ status }}

### Selectors of different size

Large, medium (default), and size selectors are available.

{{ size }}

### Customizing the Selector of Drop-down Options

{{ custom-options }}

### Selectors for Custom Panels

You can use `panelTopContent` and `panelBottomContent` to customize the top and bottom content of the drop-down panel.

{{ panel }}

### Customizing the Selector of the Selected Item

{{ custom-selected }}

### Customizing the Selected Item Selector for Collapsing

In the case of multiple selections, the selected items exceeding this value are collapsed.

{{ collapsed }}

### Filterable Selectors

Enter the Filter option. It is used in business scenarios with specific requirements. The text is filtered by default. If there is a `filter` method, the `filter` method is used.

1.  Perform remote search when `filterable` and `onSearch`(`@search`) exist.

2.  When `filter` exists (`filterable` is not required), execute the `filter` method.

3.  When only `filterable` is available, the default filtering is case-insensitive.

{{ filterable }}

### Remote Search Selector

The selector contents can be customized according to requirements. Use in business scenarios with complex logic or specific requirements. When reserveKeyword`is used for`multiple`and`filterable`, select an option to keep the current search keyword.

{{ remote-search }}

### Selectors for Creating New Entries

Allows users to create new entries. This is required in conjunction with `filterable`.

{{ creatable }}

### Limit the number of selectors

Limits the maximum number of selections for a multi-choice selector. This is typically used when you need to limit the number of multi-choice options.

{{ max }}

### Selector with Prefix Icon

Customizable prefix icon.

{{ prefix }}

### Text selector/borderless selector

A selector triggered by a text button for modifying content. It is usually used in scenes where space is limited and lightweight selection is required.

{{ noborder }}

### Selector with selected value as object

Customize the selected output value type. Use when the output selection contains label.

{{ label-in-value }}

### Selectors for Customizing the Width of Drop-down Box

Selector for custom drop-down styles, used when a custom drop-down style is required.

By default, the width of the drop-down box is the same as the width of the input box. If the content width exceeds the width, it will automatically become wider. The width can be freely controlled using `popupProps.overlayInnerStyle`.

{{ popup-props }}

### Loading Option Selectors via Scrolling Events

Businesses often need to load options continuously by scrolling to the bottom. You can quickly load options by scrolling through `popup.onScroll` or `popup.onScrollToBottom`.

{{ scroll-bottom }}

### Enable virtual scrolling selector

- Virtual scrolling is generally used for scenes with large data volume. Set `scroll={ type:'virtual' }`enables the virtual scroll mode, and presets the amount of data to be loaded in advance during the loading process through`scroll.bufferSize`.
- To maximize the revenue of a component, when the data volume is less than `threshold`, virtual scrolling will not be enabled inside the component, regardless of whether the virtual scrolling configuration exists.`threshold` is `100` by default.

{{ virtual-scroll }}
