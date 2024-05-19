---
title: Calendar
description: Container for displaying data or dates in a calendar format.
isComponent: true
usage: { title: "", description: "" }
spline: data
---

### Event calendar panel

A date display container that can display events within dates. It is commonly used when there is enough space and when it is necessary to carry or display event information.

{{ base }}

### Card mode calendar

Using individual dates as units, nested within a container with limited space to display dates and other information.

{{ card }}

### Function example

#### Specify highlighted dates

Customize specified highlighted dates through component properties. The component defaults to highlighting “today” or “the current month”. The `value` attribute can be used to set this highlighted date.

{{ value }}

#### Switch mode Calendar/Monthly

Specify the display form of the component through component properties. The component is displayed in calendar form by default and provides “Calendar” and “Monthly” mode switching buttons. Developers can switch modes by modifying the `mode` attribute.

{{ mode }}

#### Specify the first day of the week in the first column

Specify the first day of the week in the first column: Specify the first day of the week in the calendar’s first column through component properties. The component defaults to “Monday” in the first column and can be set to other days of the week through the `firstDayOfWeek` attribute (only valid when `mode` is `month`).

{{ first-day-of-week }}

#### Control related configuration

Customize the control of the component through component properties. In some business scenarios, it may be necessary to globally hide or disable controls. This can also be achieved through the `controllerConfig` attribute for local control.

{{ controller-config }}

### Customization

#### Custom calendar range

Specify the value range of the year and month selection box through component properties. By default, the component allows years to be selected from `1970 - ∞` and there is no restriction on months. The range attribute can be used to set the selectable `range` of the calendar.

{{ range }}

#### Customizing the display of weeks

You can customize the display of weeks through the `week` attribute or slot. By default, the weeks in the calendar are displayed as “Monday” to “Sunday”, but in some scenarios, you may want to customize the display.

{{ week }}

### Event example

Use `methods` to define the execution logic of events. Developers can use these events to implement more customized features.

{{ events }}

### Slot example

#### Header slot (top left corner of the component)

Display content in the top left corner of the component. In some business scenarios, you may need to display a title or similar content in the top left corner of the component. In this case, you can use the `head` named slot.

{{ head }}

#### Cell slot - Append content

Append content to the existing cell display. By default, the current date is displayed in the calendar cell. If you need to display additional information, you can use the `cellAppend` named slot.

{{ cell-append }}

#### Cell slot - Custom content

Completely rewrite the content displayed in the cell. Unlike the `cellAppend` named slot, the `cell` named slot allows you to fully customize the cell content.

{{ cell }}

#### Attribute slot

Use the `Props API` to use slots. In some scenarios, you may want to render slot content through the `Props API`. `head`, `cell` and`cellAppend` all have their corresponding `Props API`. The following briefly demonstrates the `Props API` for `head` and `cell`.

{{ slot-props-api }}
