---
title: Statistic
description: Highlight and display a set of numeric or descriptive statistical data.
isComponent: true
usage: { title: "", description: "" }
spline: data
---

Statistic is used to highlight and display a set of numeric or descriptive statistical data. If you need to maintain the consistent font style of numbers with the site's design, we recommend downloading the TCloudNumber font from the "Number Font" section of <a href="https://tdesign.tencent.com/design/fonts">fonts</a>, and importing the TCloudNumberVF.ttf font resource into your project for use.

### Basic

Use when you need to highlight a set of numeric or descriptive statistical data.

{{ base }}

### Trend

Set the trend state of the component through trend and control the trend display position through trendPlacement.

{{ trend }}

### Color

The color style provides five default TDesign style color values, which can also be customized.

{{ color }}

### Prefix/Suffix Slot

Customize through the prefix and suffix slots.

{{ slot }}

### Animation

Configure the initial value and duration of the animation through animation. Use the animationStart attribute to control when the animation starts. If there are special requirements, you can also use ref to get the instance and call start for control.

{{ animation }}

### Loading

Control the loading state of the numeric value through loading.

{{ loading }}

### Combination

{{ combination }}
