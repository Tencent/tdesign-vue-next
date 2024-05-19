---
title: ColorPicker
description: Used for color selection, supports multiple formats.
isComponent: true
usage: { title: '', description: '' }
spline: form
---

### Panel Color Selector

There is no trigger and the color picker panel is displayed directly.

{{ panel }}

### Color Picker with Trigger Element

Trigger the display selector panel through the trigger, and transparently transfer all attributes to the panel selector component.

{{ trigger }}

### Color selector for different color modes

Support monochrome mode, linear gradient two color mode selection, can be used in a single mode, can also switch between two modes at the same time. Use `colorMode` to configure.

{{ color-mode }}

### Color picker with transparency adjustment

Set `enableAlpha=true` to enable the transparency of the selector.

{{ enable-alpha }}

### Color Selector with Configurable System Color

You can configure the system preset colors through `swatchColors`. If the value is null or [], the system colors will not be displayed.

{{ swatch-color }}

### Configurable Color Selector for Recently Used Color

The most recently used color can be configured through `recentColors`. A value of [] indicates that the "Most Recently Used Color" in the component is used as the standard. If the value length is greater than 0, the "Most Recently Used Color" is displayed based on this value. A value of null does not display Recent Colors at all.

{{ recent-color }}

### Disabling Color Selector

{{ status-disabled }}

### Read-only Color Selector

{{ status-readonly }}
