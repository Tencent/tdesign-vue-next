---
title: Tag 
description: Tags are commonly used for marking, categorizing and selecting.
isComponent: true
usage: { title: '', description: '' }
spline: data
---

### Basic Tag

The basic tag is the default tag style. Suitable for general forms.

{{ base }}

### Tag with Icon

Embed an icon in the tag. Suitable for using icons to assist in tag classification or expressing the attributes of the tag.

{{ icon }}

### Deletable and Addable Tags

Deletable or addable tags. Adding tags can be combined with input box components.

{{ delete }}

### Selectable Tags

Tags have two states: selected and unselected. You can switch by clicking on the tag. Similar to the effect of a checkbox. you can set any theme style checked tag with `checkedProps` and unchecked tag with `uncheckedProps`.

{{ selectable }}

### Selectable TagGroup

{{ check-tag-group }}

### Overflow Text Tag

You can set max width of tag with `maxWidth`, overflow text would be ellipsis.

{{ long-text }}

### Different Sizes of Tags

Available in large, medium (default) and small sizes.

{{ size }}

### Different Shapes of Tags

Available in square, round and mark shapes.

{{ shape }}

### Self-defined Color of Tags

customize the colors through `color` attribute when `theme` attribute doesn't meet requirements.

{{ custom-color }}