---
title: DatePicker
description: Use to select a specific date or a range of dates.
isComponent: true
usage: { title: '', description: '' }
spline: form
---

### Year Selector

Used for year selection. It is used when the user only needs to enter the year information, and is often used in query scenarios where data is recorded by year, such as annual bills.

{{ year }}

### Month Selector

Used for month selection. Use only when the user needs to enter month information.

{{ month }}

### Quarter Selector

Used for quarterly selection. Use only when the user needs to enter quarterly information.

{{ quarter }}

### Week Selector

Used for week selection. Used when the user only needs to enter year + week information.

{{ week }}

### Date Picker

For selection of specific dates. Use only when the user needs to enter very specific date information.

{{ base }}

### Date Time Selector

For date and time associated selections. Used when the user needs to enter a date including a time.

{{ date-time }}

### Date Range Selector

Used for selection of a certain period of time. Used when the user needs to enter a date range.

{{ date-range }}

### Date picker with shortcut label

with a time stamp that can be set in advance. When the date information is regular and needs to be clicked for quick input.

{{ date-presets-alt }}

### Date selector can be disabled

The date that does not support user selection can be disabled from clicking.

{{ disable-date }}

### Selector for specifying the start of the week

You can specify the day of the week from which a week starts through the `firstDayOfWeek` attribute. This is only valid when a date is selected (`mode = date`). The default value is 1, that is, it starts from Monday. You can set it to start from Sunday as follows.

{{ first-day-of-week }}

### Custom Icon Selector

Prefix and suffix icons can be customized through `prefixIcon` and `suffixIcon`.

{{ custom-icon }}

### Date Selection Panel Used Alone

You can use `DatePickerPanel` and `DateRangePickerPanel` separately. You can assemble your own date picker.

{{ panel }}

### An unbounded date range selector。

{{ cancel-range-limit }}

## FAQ

### The backend data format is special. How can I format the date quickly?

The `onChange` callback event will return the currently selected date object wrapped in `dayjs`. You can format it with the help of a third-party library or use the provided `dayjs` object for custom conversion.

```js
<DatePicker onChange={(value, { dayjsValue }) => {
  const data = dayjsValue.format('YYYYMMDD');
  ...
}}>

<DateRangePicker onChange={(value, { dayjsValue }) => {
  const data = dayjsValue.map(d => d.format('YYYYMMDD'));
  ...
}}>
```
