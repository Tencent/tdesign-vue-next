---
title: PullDownRefresh 下拉刷新
description: 用于快速刷新页面信息，刷新可以是整页刷新也可以是页面的局部刷新。
spline: base
isComponent: true
toc: false
---

### 顶部下拉刷新

下拉刷新会触发 refresh 事件

通过 `loadingTexts` 属性可以自定义多个状态的文案，默认值为 ['下拉刷新', '松手刷新', '正在刷新', '刷新完成']

通过 `loadingBarHeight` 属性可以自定义下拉区域高度，默认为 50px

通过 `maxBarHeight` 属性可以自定义最大下拉高度，默认为 80px

通过 `loadingProps` 属性可以自定义 loading 图标的属性

通过 `refreshTimeout` 属性可以自定义加载超时时间，默认为 3000ms。超时后会触发 timeout 事件，可传入回调函数

{{ base }}
