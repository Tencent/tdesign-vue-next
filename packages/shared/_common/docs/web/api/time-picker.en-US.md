---
title: TimePicker
description: Used to select a specific point in time or a time period.
isComponent: true
usage: { title: '', description: '' }
spline: form
---

### Hour, Minute, Second Selector

The selection interface consists of three parts: hour, minute and second. Used when the user needs to enter a time accurate to seconds.

{{ hms }}

### Selectors for Custom Time Format

If the scene needs a custom format, you can change the time format with `format`, and the panel and input box will follow the format change.

{{ hm }}

### Custom Step Length Selector

The selection interface is composed of hour and minute, and the minute scale step is greater than 1. Scenarios where users do not require high time accuracy, such as data filtering.

{{ show-steps }}

### 12-hour time selector

12-hour time format display. Used when the user needs to display the time in 12-hour format.

{{ twelve-hour-meridian }}

### Time Range Selector

Used for selection of a certain period of time. Used when the user needs to enter a time interval.

{{ range }}

### You can enter directly from the keyboard

The change function is enabled by default. When one of the hours, minutes and seconds is selected, the hours, minutes and seconds can be modified by direct input through the numeric keypad or direction keys.

{{ keyboard }}

### Don't display the Clear button

The qualification assembly does not have an empty button. The default component will show the empty button when it has a time value.

{{ hide-clear-button }}

### Disable

Use of the component is prohibited.

{{ disabled }}

### Using Time Picker Panel Alone

If you only need the panel, you can use `TimePickerPanel` to meet the usage scenario.

{{ panel }}

### Time Picker with shortcut label

you can use `presets`to set.

{{ presets }}