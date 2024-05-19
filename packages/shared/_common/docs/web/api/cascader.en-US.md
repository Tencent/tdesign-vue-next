---
title: Cascader
description: Cascading selectors are useful for data sets that have a clear hierarchical structure that the user can view and select through. in general, a cascade selector include:Selectors and cascades.
isComponent: true
usage: { title: '', description: '' }
spline: form
---

### Single Cascaded Selector

Provide a single cascade selector, after the selection of each level to display the selected content.

{{ base }}

### Multi-selection cascade selector

Provide multi-choice cascading selector, display multi-choice content through label.

{{ multiple }}

### Collapsible Options Multi-selector

In the case of multiple selections, the selected items are collapsed, and the selected items exceeding the value are collapsed.

{{ collapsed }}

### Cascade selectors of different size

Provide large, medium and small three different height, width selector to adapt to different size layout.

{{ size }}

### Filterable Cascade Selector

Enter the Filter option. It is used in business scenarios with specific requirements. Filter text by default.

{{ filterable }}

### Disabling Cascading Selectors

Cascaded selectors that provide a disabled state.

{{ disabled }}

### Display only the last cascade selector

You can display only the label of the last level of the selected item in the input box, rather than the full path of the selected item.

{{ show-all-levels }}

### Cascading selector for selecting any item

When enabled, you can select any level of options.

{{ check-strictly }}

### Cascaded selector in full path mode

The default input/output value type is the value of the leaf node. The full path value is used when `value-type="full"`

- In the case of single selection, `value` is a one-dimensional array after selection, such as: `['1','1.1']`
- In the case of multiple selection, `value` is a two-dimensional array after selection, such as: `[['1','1.1'],['1','1.2']]`

{{ value-type }}

### Customize Selected Value Mode

Only valid for multiple-choice conditions.`  onlyLeaft`indicates that only leaf nodes are selected in any case;`parentFirst`indicates that only parent nodes are selected when all child nodes are selected;`all`indicates that both parent nodes and child nodes are selected.

{{ value-mode }}

### Different Trigger Methods

Submenus can be loaded by different triggering methods.

{{ trigger }}

### Display when the text is too long

When the data text is too long, use the browser `title` to display the long text.

{{ ellipsis }}

### Limit the number of options

Limits the maximum number of selections for a multi-choice selector. This is typically used when you need to limit the number of multi-choice options.

{{ max }}

### Customizing Data Field Aliases

When using `options` to configure drop-down options, if the data fields are not `label` and `value`, you can use `keys` to define aliases.

{{ keys }}

### Dynamic Loading

The selector contents can be customized according to requirements. It is used in business scenarios with complex logic or specific requirements.

{{ load }}

### Cascading Panels

Cascading panel used alone for combination with other triggers

{{ panel }}
