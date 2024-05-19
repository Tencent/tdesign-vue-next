---
title: DatePicker 日期选择器
description: 用于选择某一具体日期或某一段日期区间。
isComponent: true
usage: { title: '', description: '' }
spline: form
---

### 年份选择器

用于年份的选择。用户仅需输入年份信息时使用，常用于如年账单等按年记录数据的查询场景。

{{ year }}

### 月份选择器

用于月份的选择。用户仅需输入月份信息时使用。

{{ month }}

### 季度选择器

用于季度的选择。用户仅需输入季度信息时使用。

{{ quarter }}

### 周选择器

用于周的选择。用户仅需输入年份 + 周信息时使用。

{{ week }}

### 日期选择器

用于具体日期的选择。用户仅需要输入非常具体的日期信息时使用。

{{ base }}
### 日期时间选择器

用于日期和时间相关联的选择。用户需要输入包含时间在内的日期时使用。

{{ date-time }}

### 日期区间选择器

用于某一段日期的选择。用户需要输入一段日期区间时使用。

{{ date-range }}

### 带快捷标签的日期选择器

具有可提前设置的时间标签。当日期信息具有规律性，需要点击标签快捷输入时。

{{ date-presets-alt }}

### 可禁用日期的选择器

可将不支持用户选择的日期禁止点击。

{{ disable-date }}
### 指定周起始日的选择器

可以通过 `firstDayOfWeek` 属性指定一周从星期几开始，仅在日期选择时(`mode = date`) 时有效，默认为 1 即从周一开始，如下可以设置为周日开始。

{{ first-day-of-week }}

### 自定义图标的选择器

支持通过 `prefixIcon` 和 `suffixIcon` 自定义设置前缀和后缀图标。

{{ custom-icon }}

### 日期选择面板单独使用

支持 `DatePickerPanel` 和 `DateRangePickerPanel` 单独使用场景，可以自行组装日期选择器。

{{ panel }}

### 不限制日期区间选择范围的选择器

{{ cancel-range-limit }}

## FAQ

### 后端数据格式要求比较特殊，如何快捷格式化日期？

`onChange` 回调事件中会返回用 `dayjs` 包装好的当前选中的日期对象，可以自行借助第三方库格式化也可以使用提供的 `dayjs` 对象进行自定义转化。

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
