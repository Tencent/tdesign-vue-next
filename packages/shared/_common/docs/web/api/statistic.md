---
title: Statistic 统计数值
description: 突出展示某个或某组数字、带描述的统计类数据。
isComponent: true
usage: { title: "", description: "" }
spline: data
---

Statistic 组件用于突出展示某个或某组数字、带描述的统计类数据。
如果需要与站点演示一致的数字字体效果，推荐您到 <a href="https://tdesign.tencent.com/design/fonts">数字字体章节</a>，将 TCloudNumber 字体下载并将包含的 TCloudNumberVF.ttf 做为 TCloudNumber 字体资源引入到具体项目中使用。

### 基础用法

当需要突出某个或某组数字或展示带描述的统计类数据时使用。

{{ base }}

### 趋势不同的组件

通过 `trend` 设置组件的趋势状态，配合 `trendPlacement` 控制趋势展示的位置。

{{ trend }}

### 颜色

颜色风格默认提供 TDesign 风格的五种颜色值，也可以使用自定义色值。

{{ color }}

### 前缀后缀/自定义

通过 prefix 和 suffix 插槽自定义。

{{ slot }}

### 数值动画

通过 `animation` 配置动画的初始值和持续时间。使用 `animationStart`属性可以控制动画开始时刻。
如果有特殊需求时也可以通过 ref 获取实例，调用`start`进行控制。

{{ animation }}

### 加载中

通过 `loading` 可以控制数值的加载状态。

{{ loading }}

### 组合使用

{{ combination }}
