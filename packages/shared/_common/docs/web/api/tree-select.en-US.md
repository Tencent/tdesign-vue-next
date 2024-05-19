---
title: TreeSelect
description: Information entry control similar to Select, suitable for selecting a tree data structure.
isComponent: true
usage: { title: '', description: '' }
spline: form
---

### Basic Tree Selection

The most basic method of use, often used to select provinces.

{{ base }}

### Tree Selection with Multiple Selection

Allows you to select multiple options.

{{ multiple }}

### Filterable Tree Selection

The tree structure supports filtering.

{{ filterable }}

### Complex Data Type

Supports controlling the type of selected value.

{{ valuetype }}

### Attribute Passthrough

Transparent transmission of `popupProps` and `treeProps` is supported.

{{ props }}

### Asynchronous Loading

Asynchronous loading of tree nodes through transparent transmission.

{{ lazy }}

### Collapsible Options

In the case of multiple selections, the selected items exceeding this value are collapsed.

{{ collapsed }}

### Customize Display of Selected Items

Support custom selected item display, often used to combine label and value display.

{{ valuedisplay }}
