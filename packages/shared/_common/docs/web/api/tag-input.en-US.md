---
title: TagInput
description: Used to enter a text label.
isComponent: true
usage: { title: '', description: '' }
spline: data
---

### Basic Tag Input Box

{{ base }}

### Input box with more tags

Use `excessTagsDisplayType` to control the rendering method when the tag exceeds:Horizontal scroll display and line-feed display. The default is line-feed display.

{{ excess }}

### Tag input box with limited number

Use `max` to control the maximum number of tags.

{{ max }}

### Label input boxes with different size

Provide large, medium (default), small three different size of the label input box.

{{ size }}

### Tag input box that can collapse too many tags

- `mincollapsedNum` is used to control the display of labels that exceed this number.
- `collapsedItems` is used to customize the rendering method of collapsed tags.

{{ collapsed }}

### Tag Input Box for Customizable Tags

- `tag` is used to define the content of a single tag- `valueDispaly` is used to completely customize the full tag content

{{ custom-tag }}

### Tag input boxes in different statuses

The status of the label input box can be divided into: normal, read-only, disabled, successful, alarm, error, etc., in which the status of successful, alarm, error, etc. is generally used for form verification. This property is inherited from the Input box component.

{{ status }}

### Tag input boxes for different themes

Use `tagProps` to control all attributes of the tag, such as:Color settings.

{{ theme }}

### Label input box with adaptive width

{{ auto-width }}

### Drag and drop the order of the tag input box {{ draggable }}
