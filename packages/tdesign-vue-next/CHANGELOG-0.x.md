---
title: 更新日志
spline: explain
toc: false
docClass: timeline
---

## 🌈 0.26.2 `2022-12-14` 
### 🚀 Features
- `Table`: 
  - 树形结构，支持点击行展开树节点， @chaishi ([#2147](https://github.com/Tencent/tdesign-vue-next/pull/2147))
  - 树形结构，点击树节点展开图标时，不触发 `onRowClick` 行点击事件 @chaishi ([#2147](https://github.com/Tencent/tdesign-vue-next/pull/2147))
  - 虚拟滚动支持滚动到具体的某一个元素，用于呈现选中行/选中项 @chaishi ([#2112](https://github.com/Tencent/tdesign-vue-next/pull/2112))
  - 虚拟滚动支持数据变化时不重置，进而支持树形结构无限滚动 @chaishi ([#2112](https://github.com/Tencent/tdesign-vue-next/pull/2112))
### 🐞 Bug Fixes
- `Guide`: 
  -  `skip` 和 `finish` 事件正确返回 `current` @zhangpaopao0609 ([#2160](https://github.com/Tencent/tdesign-vue-next/pull/2160))
  - 默认属性通过全局配置获取 @zhangpaopao0609 ([#2161](https://github.com/Tencent/tdesign-vue-next/pull/2161))
- `Form`: 
  - 修复`ValidateResultContext ` 不满足类型约束 @ufec ([#2165](https://github.com/Tencent/tdesign-vue-next/pull/2165))
  - 修复 `min` 为 `0` 时不校验问题 @yaogengzhu ([#2151](https://github.com/Tencent/tdesign-vue-next/pull/2151))
  - 修复`ValidateResultContext ` 不满足类型约束 @ufec ([#2165](https://github.com/Tencent/tdesign-vue-next/pull/2165))
  - 修复 `min` 为 `0` 时不校验问题 @yaogengzhu ([#2151](https://github.com/Tencent/tdesign-vue-next/pull/2151))
- `Table`: 虚拟滚动支持表格高度变化 @chaishi ([#2112](https://github.com/Tencent/tdesign-vue-next/pull/2112))
- `DatePicker`: 
  - 修复右侧面板月份展示错误问题  @honkinglin ([#2157](https://github.com/Tencent/tdesign-vue-next/pull/2157))
  - 修复 `tips` 样式问题 @honkinglin ([#2159](https://github.com/Tencent/tdesign-vue-next/pull/2159))
- `Popconfirm`: 修复 `confirmBtn` 等属性存在类型错误  @pengYYYYY ([#2158](https://github.com/Tencent/tdesign-vue-next/pull/2158))
- `Dropdown`: 修复 `hover` 有时候不能触发打开下拉菜单  @pengYYYYY ([#2158](https://github.com/Tencent/tdesign-vue-next/pull/2158))

## 🌈 0.26.1 `2022-12-09` 
### 🐞 Bug Fixes
- `Guide`: 相对元素位置不正确 @zhangpaopao0609 ([#2130](https://github.com/Tencent/tdesign-vue-next/pull/2130))
- `Dialog`: 修复滚动条判断问题  @honkinglin ([#2134](https://github.com/Tencent/tdesign-vue-next/pull/2134))
- `Table`: `demo` 样式优化 @pengYYYYY ([#2115](https://github.com/Tencent/tdesign-vue-next/pull/2115))
- `SelectInput`: 修复 `selectInput` 出现异常的`tips` 节点 @pengYYYYY ([#2115](https://github.com/Tencent/tdesign-vue-next/pull/2115))
- `Select`: 修复虚拟滚动失效的问题 @uyarn ([#2142](https://github.com/Tencent/tdesign-vue-next/pull/2142))
- `TagInput`: 修复拼音输入时按下删除键触发标签删除问题 @dianjie ([#2140](https://github.com/Tencent/tdesign-vue-next/pull/2140))
- `Table`: 修复点击行展开报错问题 @chaishi ([#2144](https://github.com/Tencent/tdesign-vue-next/pull/2144))
- `Textarea`: 修复中文拼硬输入时触发高度计算但不触发 `onChange` () @zhangpaopao0609 ([#2145](https://github.com/Tencent/tdesign-vue-next/pull/2145))
## 🌈 0.26.0 `2022-12-08` 

### 🚨 Breaking Changes
- `SelectInput`: 
  - `selectInputWrapRef` 更名为 `selectInputRef ` @chaishi ([#2125](https://github.com/Tencent/tdesign-vue-next/pull/2125))
  - 涉及 `DOM` 类名变更，和 `React` 保持一致，方便全部框架复用一份 CSS @chaishi ([#2125](https://github.com/Tencent/tdesign-vue-next/pull/2125))

### 🚀 Features
- `Table`: 
  - 可筛选表格，新增 `filter.popupProps` ，支持透传 Popup 组件全部属性 @chaishi ([#2105](https://github.com/Tencent/tdesign-vue-next/pull/2105))
  - 选中行表格，新增 `selectOnRowClick`，支持点击行选中 @chaishi ([#2105](https://github.com/Tencent/tdesign-vue-next/pull/2105))
- `ColorPicker`: 新增`clearable`及`showPrimaryColorPreview`API，控制是否展示颜色选择条右侧预览区域 @uyarn ([#2096](https://github.com/Tencent/tdesign-vue-next/pull/2096))
- `Upload`:  `onProgress` 事件新增参数 `XMLHttpRequest`，用于获取 http status 等信息 @chaishi ([#2106](https://github.com/Tencent/tdesign-vue-next/pull/2106))
- `TimePicker`: 新增`tips`和`status` API，onPick新增context参数回调 @uyarn ([#2124](https://github.com/Tencent/tdesign-vue-next/pull/2124))
### 🐞 Bug Fixes
- `Table`: 
  - 修复拖拽排序问题 @chaishi ([#2105](https://github.com/Tencent/tdesign-vue-next/pull/2105))
  - 修复表头超出省略报错问题 @chaishi ([#2131](https://github.com/Tencent/tdesign-vue-next/pull/2131))
  - 本地数据排序，支持默认对排序字段进行数据排序， @chaishi ([#2131](https://github.com/Tencent/tdesign-vue-next/pull/2131))
- `ColorPicker`: 修复无法删除颜色值的问题 @uyarn ([#2096](https://github.com/Tencent/tdesign-vue-next/pull/2096))
- `ConfigProvider`: 修复 `v-loading` 方式使用时会发出警告问题  @yusongh ([#2054](https://github.com/Tencent/tdesign-vue-next/pull/2054))
- `InputNumber`: 无法输入小数点后面的第一位数字 `0`， @chaishi ([#2107](https://github.com/Tencent/tdesign-vue-next/pull/2107))
- `Radio`: 修复 `click` 事件没有绑定在最外层，导致无法正确获取点击事件问题 @chaishi ([#2105](https://github.com/Tencent/tdesign-vue-next/pull/2105))
- `TimePicker`: 修复面板开启时无法点击清空按钮清空数值的问题 @uyarn ([#2124](https://github.com/Tencent/tdesign-vue-next/pull/2124))
- `SelectInput`: 修复宽度自适应场景，宽度问题， @chaishi ([#2125](https://github.com/Tencent/tdesign-vue-next/pull/2125))
- `InputAdornment`: 修复 inputAdornment 样式 @honkinglin ([#2127](https://github.com/Tencent/tdesign-vue-next/pull/2127))
- `ImageViewer `: 修复 `image-viewer` 移除动画缺失问题 @honkinglin ([#2118](https://github.com/Tencent/tdesign-vue-next/pull/2118))
- `RangeInput`: 修复 `status` 无效问题 @honkinglin ([#2123](https://github.com/Tencent/tdesign-vue-next/pull/2123))
## 🌈 0.25.0 `2022-12-01` 
### 🚨 Breaking Changes
- `Jumper`: `Jumper` 更名为 `PaginationMini` 组件，正在使用 `Jumper` 组件的同学请从 `Pagination` 中导出替换 @honkinglin ([#2066](https://github.com/Tencent/tdesign-vue-next/pull/2066))

### 🚀 Features
- `Table`: 选中行功能，新增 `reserveSelectedRowOnPaginate`，用于支持在分页场景中，仅选中当前页数据，切换分页时清空选中结果，全选仅选中当前页数据 @chaishi ([#2074](https://github.com/Tencent/tdesign-vue-next/pull/2074))
- `Calendar`: 日历组件支持多个高亮单元格； @PsTiu ([#2075](https://github.com/Tencent/tdesign-vue-next/pull/2075))
### 🐞 Bug Fixes
- `Table`: 
  - 修复本地数据分页场景中，切换分页大小，`onPageChange` 事件参数返回的数据不正确问题 @chaishi ([#2074](https://github.com/Tencent/tdesign-vue-next/pull/2074))
  - 序号列支持跨分页显示() @chaishi ([#2074](https://github.com/Tencent/tdesign-vue-next/pull/2074))
  - 修复分页场景下，设置 max-height 和 bordered 之后，边框线位置不正确 () @chaishi ([#2074](https://github.com/Tencent/tdesign-vue-next/pull/2074))
  - 行选中事件参数选中数据支持 `data.push` @chaishi ([#2074](https://github.com/Tencent/tdesign-vue-next/pull/2074))
- `TagInput`: 
  - 不同尺寸的间距和高度问题修复 @chaishi ([#2087](https://github.com/Tencent/tdesign-vue-next/pull/2087))
  - 右侧图标会和标签重合问题 @chaishi ([#2087](https://github.com/Tencent/tdesign-vue-next/pull/2087))
  - 修复 `onRemove` 事件参数未能返回最新 `value` 问题 @chaishi ([#2087](https://github.com/Tencent/tdesign-vue-next/pull/2087))
  - 修复拼音输入时按下 `Enter` 触发标签确认问题 @chaishi ([#2087](https://github.com/Tencent/tdesign-vue-next/pull/2087))
  - 修复拼音输入时按下删除键触发标签删除问题，当在拼音输入完成后允许删除标签() @chaishi ([#2087](https://github.com/Tencent/tdesign-vue-next/pull/2087))
- `Image`: 
  - 修复  `placeholder` 接收类型警告  @pengYYYYY ([#2094](https://github.com/Tencent/tdesign-vue-next/pull/2094))
  -  修复图片组件的 `overlayContent` 无效  @pengYYYYY ([#2094](https://github.com/Tencent/tdesign-vue-next/pull/2094))
- `AutoComplete`: 支持使用 `triggerElement` 自定义 `AutoComplete` 的触发元素 @chaishi ([#2070](https://github.com/Tencent/tdesign-vue-next/pull/2070))
- `Tooltip`: 修复继承 `Popup` 组件 `disabled` 属性失效  @Zzongke ([#2069](https://github.com/Tencent/tdesign-vue-next/pull/2069))
- `Calendar`: 修复日历组件在月历模式下高亮显示的 `bug`。 @PsTiu ([#2075](https://github.com/Tencent/tdesign-vue-next/pull/2075))
- `Menu`: 修复多层收纳导航 `head-menu` 默认未激活 @sinbadmaster ([#2073](https://github.com/Tencent/tdesign-vue-next/pull/2073))
- `Dialog`: 调整 `body` 锁定逻辑 @honkinglin ([#2083](https://github.com/Tencent/tdesign-vue-next/pull/2083))
- `Drawer`: 修复 `drawer` 动画效果 @honkinglin ([#2089](https://github.com/Tencent/tdesign-vue-next/pull/2089))
- `Textarea`: 修复 `status` 类型为 `default` 无效  @pengYYYYY ([#2094](https://github.com/Tencent/tdesign-vue-next/pull/2094))
- `ImageViewer`: 提升 `ImageViewer` 默认 `zIndex`  @sinbadmaster ([#2071](https://github.com/Tencent/tdesign-vue-next/pull/2071))
- `Calendar`: 修复日历组件中 `lodash` 的引入会全量引入 @PsTiu ([#2082](https://github.com/Tencent/tdesign-vue-next/pull/2082))

### 🚧 Others
- 更新 `Message/Notification/Dialog` 等组件文档 @chaishi ([#2065](https://github.com/Tencent/tdesign-vue-next/pull/2065))
- `SelectInput`: 示例代码样式修复 @Wen1kang ([#2077](https://github.com/Tencent/tdesign-vue-next/pull/2077))
- `Calendar`: 示例代码样式修复 @Wen1kang ([#2090](https://github.com/Tencent/tdesign-vue-next/pull/2090))

## 🌈 0.24.9 `2022-11-24` 
### 🚀 Features
- `Volar`: 新增 `volar` 代码提示文件 @chaishi ([#2055](https://github.com/Tencent/tdesign-vue-next/pull/2055))
### 🐞 Bug Fixes
- `Cascader`:  修复自定义 `collapsed` 示例展示问题 @xiaosansiji ([#2048](https://github.com/Tencent/tdesign-vue-next/pull/2048))
- `Table`: 可编辑行，修复因没有监听数据变化，出现的校验不通过问题， @chaishi ([#2053](https://github.com/Tencent/tdesign-vue-next/pull/2053))
- `Dropdown`: 修复多次点击下拉菜单选项且开启 `hideAfterClick` 后无法弹出菜单的异常 @uyarn ([#2052](https://github.com/Tencent/tdesign-vue-next/pull/2052))
- `Menu`:  修复 `submenu` 子菜单左右间距不一致 @dianjie ([#2047](https://github.com/Tencent/tdesign-vue-next/pull/2047))

## 🌈 0.24.8 `2022-11-22` 
### 🚀 Features
- `InputNumber`: 
  - 支持 `allowInputOverLimit`，用于设置是否允许输入数字超过 `max` `min` 范围的值 @chaishi ([#2030](https://github.com/Tencent/tdesign-vue-next/pull/2030))
  - 新增和减少按钮支持 `allowInputOverLimit` @chaishi ([#2037](https://github.com/Tencent/tdesign-vue-next/pull/2037))
- `AutoComplete`: 新增组件 `AutoComplete` 自动填充 @chaishi ([#2031](https://github.com/Tencent/tdesign-vue-next/pull/2031))
### 🐞 Bug Fixes
- `DatePicker`: 
  - 修复 `seperator` 问题 @honkinglin ([#2021](https://github.com/Tencent/tdesign-vue-next/pull/2021))
  - 修复周选择器高亮错误问题 @honkinglin ([#2036](https://github.com/Tencent/tdesign-vue-next/pull/2036))
- `ColorPicker`: 修复渐变滑竿滑动后导致 `picker` 自动关闭的问题 @S-mohan ([#2024](https://github.com/Tencent/tdesign-vue-next/pull/2024))
- `TagInput`: 修复 `tag-input` 示例代码上下间距不对称问题 @yusongh ([#2028](https://github.com/Tencent/tdesign-vue-next/pull/2028))
- `Upload`: 部分 `button` 组件使用 `link` 替换 @Wen1kang ([#2027](https://github.com/Tencent/tdesign-vue-next/pull/2027))
- `HeadMenu`: 修复菜单折叠问题 @dianjie ([#2029](https://github.com/Tencent/tdesign-vue-next/pull/2029))
- `InputNumber`: 修复上个版本无法输入小数点问题 @chaishi ([#2030](https://github.com/Tencent/tdesign-vue-next/pull/2030))
- `Transfer`: 修复 `operations` 样式问题 @Wen1kang ([#2042](https://github.com/Tencent/tdesign-vue-next/pull/2042))
- `Anchor`: 修复组件对 `popup` 的引用错误 @pengYYYYY ([#2043](https://github.com/Tencent/tdesign-vue-next/pull/2043))
- `HeadMenu`: 修复菜单折叠问题 @dianjie ([#2029](https://github.com/Tencent/tdesign-vue-next/pull/2029))
### 🚧 Others
- `SelectInput`: `demo` 原生滚动条样式改为内置样式 @dianjie ([#2033](https://github.com/Tencent/tdesign-vue-next/pull/2033))
- `Form`: 修复 `form` 示例代码样式问题 @Wen1kang ([#2042](https://github.com/Tencent/tdesign-vue-next/pull/2042))
- `Cascader`: 补充组件单元测试 @pengYYYYY ([#2043](https://github.com/Tencent/tdesign-vue-next/pull/2043))
- `Select`: 补充组件单元测试 @pengYYYYY ([#2043](https://github.com/Tencent/tdesign-vue-next/pull/2043))
- `Notification`: 补充组件单元测试 @pengYYYYY ([#2043](https://github.com/Tencent/tdesign-vue-next/pull/2043))
- `Anchor`: 补充组件单元测试 @pengYYYYY ([#2043](https://github.com/Tencent/tdesign-vue-next/pull/2043))
- `AutoComplete`: 补充组件单元测试 @pengYYYYY ([#2043](https://github.com/Tencent/tdesign-vue-next/pull/2043))
## 🌈 0.24.7 `2022-11-16` 
### 🚀 Features
- `Breadcrumb`: 新增`icon`API @uyarn ([#1998](https://github.com/Tencent/tdesign-vue-next/pull/1998))
- `Slider`: 修复 `slider` 样式问题 @HQ-Lin ([#2011](https://github.com/Tencent/tdesign-vue-next/pull/2011))
- `Button`: 新增`suffix` API，支持需要为按钮配置文字后置图标的场景 @uyarn ([#2018](https://github.com/Tencent/tdesign-vue-next/pull/2018))
- `CodeTip`: 增加编辑器代码提示 @chaishi ([#2005](https://github.com/Tencent/tdesign-vue-next/pull/2005))

### 🐞 Bug Fixes
- `ImageViewer`: 
  - 调整`ImageViewer`顶部按钮的大小 @Wen1kang ([#2010](https://github.com/Tencent/tdesign-vue-next/pull/2010))
  - 修复样式问题 @HQ-Lin ([#2015](https://github.com/Tencent/tdesign-vue-next/pull/2015))
- `Breadcrumb`: 修复文字省略样式失效的问题 @uyarn ([#1998](https://github.com/Tencent/tdesign-vue-next/pull/1998))
- `InputNumber`: `value` 支持受控 @chaishi ([#2002](https://github.com/Tencent/tdesign-vue-next/pull/2002))
- `Alert`: 修复内嵌 `link` 时，`hover` 会导致 `alert` 消失 @Lmmmmmm-bb ([#2000](https://github.com/Tencent/tdesign-vue-next/pull/2000))
- `Table`: 修复 `EnhancedTable` 树形结构，在编译后的运行过程中缺少实例方法（开发环境正常）问题 () @chaishi ([#2004](https://github.com/Tencent/tdesign-vue-next/pull/2004))
- `Comment`: 修复 `comment` 样式问题 @HQ-Lin ([#2007](https://github.com/Tencent/tdesign-vue-next/pull/2007))
- `Select`: 修复筛选默认模糊大小写的功能 @skytt ([#2009](https://github.com/Tencent/tdesign-vue-next/pull/2009))
- `Watermark`: 修复异步获取 `watermark` `content`，水印不更新的问题 @insekkei ([#1997](https://github.com/Tencent/tdesign-vue-next/pull/1997))
- `PopConfirm`: 修复 `text` 描述的颜色 @iLunZ ([#2006](https://github.com/Tencent/tdesign-vue-next/pull/2006))

### 🚧 Others
- `Card`: 优化 `demo` 样式 @Wen1kang ([#2014](https://github.com/Tencent/tdesign-vue-next/pull/2014))
- `Avatar`: 优化 `demo` 样式 @Wen1kang ([#2014](https://github.com/Tencent/tdesign-vue-next/pull/2014))
- `Comment`: 优化 `demo` 样式 @Wen1kang ([#2013](https://github.com/Tencent/tdesign-vue-next/pull/2013))
- `Collapse`: 优化 `demo` 样式 @Wen1kang ([#2013](https://github.com/Tencent/tdesign-vue-next/pull/2013))
- `Calender`: 优化 `demo` 样式 @Wen1kang ([#2016](https://github.com/Tencent/tdesign-vue-next/pull/2016))
## 🌈 0.24.6 `2022-11-09` 
### 🚀 Features
- `Table`: 优化超出省略场景，浮层默认出现位置 `placement` @chaishi ([#1968](https://github.com/Tencent/tdesign-vue-next/pull/1968))
- `TimePicker`: 新增`onPick` API 用于处理每次选择时间的回调 @uyarn ([#1975](https://github.com/Tencent/tdesign-vue-next/pull/1975))
- `Upload`: 多上传文件模式支持使用 `fileListDisplay` 自定义文件列表，插槽和属性均可  @chaishi ([#1978](https://github.com/Tencent/tdesign-vue-next/pull/1978))
- `Demo`: `stackblitz` 默认打开 `.vue` 文件  @pengYYYYY ([#1977](https://github.com/Tencent/tdesign-vue-next/pull/1977))
- `Timeline`: 增加 `timeline` 组件 @pengYYYYY ([#1980](https://github.com/Tencent/tdesign-vue-next/pull/1980))
- `TagInput`: 修复空引用错误  @pengYYYYY ([#1980](https://github.com/Tencent/tdesign-vue-next/pull/1980))
### 🐞 Bug Fixes
- `Input`: 
  - 默认值 `format` 失效问题， @chaishi ([#1968](https://github.com/Tencent/tdesign-vue-next/pull/1968))
  - 修复在输入框进行预渲染处于 `display: none` 状态时，宽度计算不正确问题 @chaishi ([#1968](https://github.com/Tencent/tdesign-vue-next/pull/1968))
  - 元素判空 @chaishi ([#1969](https://github.com/Tencent/tdesign-vue-next/pull/1969))
- `Calendar`: 
  - 修复了年份选择下拉框刷新的问题 @PsTiu ([#1972](https://github.com/Tencent/tdesign-vue-next/pull/1972))
  - 修复日历组件 `cellAppend` 属性作为 `Function` 时参数错误的问题 @PsTiu ([#1972](https://github.com/Tencent/tdesign-vue-next/pull/1972))
- `Table`: 当禁用resizable时，表格默认使用用户定义的列宽 @ZTao-z ([#1935](https://github.com/Tencent/tdesign-vue-next/pull/1935))
- `TimePicker`: 修复12小时制时分列首位的异常 @uyarn ([#1975](https://github.com/Tencent/tdesign-vue-next/pull/1975))
- `Popup`: 使用 `overlayInnerStyle` 定义定宽  @pengYYYYY ([#1977](https://github.com/Tencent/tdesign-vue-next/pull/1977))
- `Image`: 修复 `error slot` 无效  @pengYYYYY ([#1977](https://github.com/Tencent/tdesign-vue-next/pull/1977))
### 🚧 Others
- `docs`:  增加英文文档 @uyarn ([#1963](https://github.com/Tencent/tdesign-vue-next/pull/1963))
- `InputNumber`: 文档问题 @chaishi ([#1969](https://github.com/Tencent/tdesign-vue-next/pull/1969))
- `Calendar`: 补充日历组件单元测试 @PsTiu ([#1972](https://github.com/Tencent/tdesign-vue-next/pull/1972))
- `TimePicker`: 补充 `time-picker` 单元测试用例 @uyarn ([#1979](https://github.com/Tencent/tdesign-vue-next/pull/1979))
- `Popup`: 补充 `popup`  单元测试用例 @byq1213 ([#1966](https://github.com/Tencent/tdesign-vue-next/pull/1966))
## 🌈 0.24.5 `2022-11-01` 
### 🚀 Features
- `Pagination`: 透传`selectProps` 和 `selectProps.popupProps` 到组件 `Pagination`，以便实现挂载节点等复杂场景需求 @chaishi ([#1931](https://github.com/Tencent/tdesign-vue-next/pull/1931))
- `Input`: 支持对 `unicode` 字符长度的判定 @chaishi ([#1927](https://github.com/Tencent/tdesign-vue-next/pull/1927))

### 🐞 Bug Fixes

- `Table`: 
  - 修复吸顶表头超出省略问题， @chaishi ([#1931](https://github.com/Tencent/tdesign-vue-next/pull/1931))
  - 提高 `dragSortOptions` 优先级，以便父组件自定义全部参数， @chaishi ([#1931](https://github.com/Tencent/tdesign-vue-next/pull/1931))
  - 本地分页表格中，使用拖拽排序，数据交换结果不正确， @chaishi ([#1931](https://github.com/Tencent/tdesign-vue-next/pull/1931))
- `Dropdown`: 
  - 修复无法使用 `v-for` 渲染 `item` 的异常 @uyarn ([#1936](https://github.com/Tencent/tdesign-vue-next/pull/1936))
  - 修复在 `JSX` 中使用有告警的异常 @uyarn ([#1936](https://github.com/Tencent/tdesign-vue-next/pull/1936))
- `Form`: 
   - 修复 `onBlur` 会清空校验状态的问题 @k1nz ([#1933](https://github.com/Tencent/tdesign-vue-next/pull/1933))
   - 修正 `date` 规则中 `delimiters` 属性值 @k1nz ([#1933](https://github.com/Tencent/tdesign-vue-next/pull/1933))
- `Slider`: 修复 `vertical` 示例展示异常  @pengYYYYY ([#1918](https://github.com/Tencent/tdesign-vue-next/pull/1918))
- `CheckBox`: 修复 `readonly` 属性没效果  @pengYYYYY ([#1930](https://github.com/Tencent/tdesign-vue-next/pull/1930))
- `Loading`: 修复部分场景 `v-loading` 异常的问题  @uyarn ([#1937](https://github.com/Tencent/tdesign-vue-next/pull/1937))
- `Datepicker`: 修复 `popupProps.onVisibleChange` 方法不能正常触发的问题 @xiaosansiji ([#1939](https://github.com/Tencent/tdesign-vue-next/pull/1939))
- `Select`: 修复无法使用 `0` 作为 `value`  @pengYYYYY ([#1940](https://github.com/Tencent/tdesign-vue-next/pull/1940))
- `Collapse`: 修复 `ExpandIcon` 未按照 `API` 文档实现  @asbstty ([#1941](https://github.com/Tencent/tdesign-vue-next/pull/1941))
- `DatePicker`: 修复单选日期时间无法确定问题 @HQ-Lin ([#1942](https://github.com/Tencent/tdesign-vue-next/pull/1942))
### 🚧 Others
- `Space`: 补充 `Space` 单元测试 @LadyChatterleyLover ([#1920](https://github.com/Tencent/tdesign-vue-next/pull/1920))
- `Icon`: 补充 `Icon` 组件单元测试 @LadyChatterleyLover ([#1925](https://github.com/Tencent/tdesign-vue-next/pull/1925))
- `Image`: 补充 `Image` 组件单元测试 @LadyChatterleyLover ([#1922](https://github.com/Tencent/tdesign-vue-next/pull/1922))
- `Jumper`: 补充 `Jumper` 单元测试 @LadyChatterleyLover ([#1921](https://github.com/Tencent/tdesign-vue-next/pull/1921))
- `Form`: 补充 `Form` 单元测试 @k1nz ([#1933](https://github.com/Tencent/tdesign-vue-next/pull/1933))
- `Input`: 独立长度限制相关逻辑 `useLimitLength` @chaishi ([#1927](https://github.com/Tencent/tdesign-vue-next/pull/1927))

## 🌈 0.24.3 `2022-10-26` 
### 🚀 Features
- `Upload`: 多图片上传，图片文件名支持 `abridgeName` @chaishi ([#1899](https://github.com/Tencent/tdesign-vue-next/pull/1899))
-  `Site`: 增加 `boxshadow` 主题生成器 @uyarn ([#1884](https://github.com/Tencent/tdesign-vue-next/pull/1884))

### 🐞 Bug Fixes
- `Dropdown`: 修复子节点文字省略功能丢失的问题 @uyarn ([#1877](https://github.com/Tencent/tdesign-vue-next/pull/1877))
- `Upload`: 
  - 修复 `name` 无效问题 @chaishi ([#1899](https://github.com/Tencent/tdesign-vue-next/pull/1899))
  - 图片上传，自定义上传方法不支持图片回显问题 @chaishi ([#1899](https://github.com/Tencent/tdesign-vue-next/pull/1899))
  - 修复 `theme=file` `draggable=true` 时，拖拽无效问题， @chaishi ([#1899](https://github.com/Tencent/tdesign-vue-next/pull/1899))
- `Select`: 
  - 修复远程搜索带过滤时，已选择内容 `label` 丢失问题 @pengYYYYY ([#1908](https://github.com/Tencent/tdesign-vue-next/pull/1908))
  - 修复初始值为 `undefined` 时，出现报错 @pengYYYYY ([#1908](https://github.com/Tencent/tdesign-vue-next/pull/1908))
### 🚧 Others
- `Demo`: 完成示例代码 `space` 组件替换 @pengYYYYY ([#1878](https://github.com/Tencent/tdesign-vue-next/pull/1878))
- `InputAdornment`: 样式优化 @zhangpaopao0609 ([#1883](https://github.com/Tencent/tdesign-vue-next/pull/1883))
- `Transfer`: 样式优化 @zhangpaopao0609 ([#1886](https://github.com/Tencent/tdesign-vue-next/pull/1886))
- `Notification`: 样式优化 @zhangpaopao0609 ([#1888](https://github.com/Tencent/tdesign-vue-next/pull/1888))
- `Comment`: 样式优化 @zhangpaopao0609 ([#1896](https://github.com/Tencent/tdesign-vue-next/pull/1896))
- `DatePicker`: 月份及季度选择时右侧面板展示修复 @sinbadmaster ([#1891](https://github.com/Tencent/tdesign-vue-next/pull/1891))

## 🌈 0.24.2 `2022-10-17` 
### 🚀 Features
- `Select`: 下拉框隐藏的时候清空筛选文本 @skytt ([#1847](https://github.com/Tencent/tdesign-vue-next/pull/1847))
- `Tag`: 样式优化，实现 `light-outline` 风格 @HelKyle ([#1859](https://github.com/Tencent/tdesign-vue-next/pull/1859))
- `Table`: 增强型表格，支持列配置，支持不传 `displayColumns` 时默认显示全部列， @chaishi ([#1869](https://github.com/Tencent/tdesign-vue-next/pull/1869))
- `DatePicker`: 调整 `requiredMark api` 可独立控制星号展示 @HQ-Lin ([#1832](https://github.com/Tencent/tdesign-vue-next/pull/1832))
### 🐞 Bug Fixes
- `Dropdown`: 
  - 修复插槽下 `item` 使用 `v-if` 异常的问题 @uyarn ([#1851](https://github.com/Tencent/tdesign-vue-next/pull/1851))
  - 修复`trigger`部分响应式丢失的问题 @uyarn ([#1858](https://github.com/Tencent/tdesign-vue-next/pull/1858))
  - 修复插槽平铺内容为子节点内容渲染丢失部分元素的问题 @uyarn ([#1870](https://github.com/Tencent/tdesign-vue-next/pull/1870))
- `Table`: 
  - 筛选功能，`resetValue` 无效，() @chaishi ([#1869](https://github.com/Tencent/tdesign-vue-next/pull/1869))
  - 表头吸顶功能，数据变化更新吸顶位置，() @chaishi ([#1869](https://github.com/Tencent/tdesign-vue-next/pull/1869))
  - 组件类型未导出  @pengYYYYY ([#1871](https://github.com/Tencent/tdesign-vue-next/pull/1871))
  - 移除demo中对吸顶表格的最大宽度限制 @ZTao-z ([#1854](https://github.com/Tencent/tdesign-vue-next/pull/1854))
- `Tooltip`: 修复 `tooltip` 无法显示问题 @ChrisLee0211 ([#1842](https://github.com/Tencent/tdesign-vue-next/pull/1842))
- `DatePicker`: 修复 `range` 数据格式化异常问题 @HQ-Lin ([#1845](https://github.com/Tencent/tdesign-vue-next/pull/1845))
- `Tree`: `watch` 联动判断找不到父节点  @Reg1350 ([#1848](https://github.com/Tencent/tdesign-vue-next/pull/1848))
- `Card`: 修复 `demo` 样式 @yilaierwang ([#1861](https://github.com/Tencent/tdesign-vue-next/pull/1861))
- `Avatar`: `demo` 中头像类型展示，删除重复头像并调整展示顺序 @tutaizi ([#1838](https://github.com/Tencent/tdesign-vue-next/pull/1838))
- `Tree`: `watch` 联动判断找不到父节点  @Reg1350 ([#1848](https://github.com/Tencent/tdesign-vue-next/pull/1848))
- `Card`: 修复 `demo` 样式 @yilaierwang ([#1861](https://github.com/Tencent/tdesign-vue-next/pull/1861))
- `Avatar`: `demo` 中头像类型展示，删除重复头像并调整展示顺序 @tutaizi ([#1838](https://github.com/Tencent/tdesign-vue-next/pull/1838))
- `Popup`: 关闭时销毁 `dom` @Lmmmmmm-bb ([#1867](https://github.com/Tencent/tdesign-vue-next/pull/1867))

### 🚧 Others
- `Tooltip`: 补充 `tooltip` 单元测试 @LadyChatterleyLover ([#1849](https://github.com/Tencent/tdesign-vue-next/pull/1849))
- `Drawer`: 补充 `drawer` 单元测试 @LadyChatterleyLover ([#1833](https://github.com/Tencent/tdesign-vue-next/pull/1833))
- `Guide`: 样式优化 @zhangpaopao0609 ([#1853](https://github.com/Tencent/tdesign-vue-next/pull/1853))
- `Transfer`: 补充 `transfer` 单元测试 @LadyChatterleyLover ([#1862](https://github.com/Tencent/tdesign-vue-next/pull/1862))
- `TagInput`:  补充 `tag-input` 单元测试 @LadyChatterleyLover ([#1865](https://github.com/Tencent/tdesign-vue-next/pull/1865))
- `InputAdornment`: 样式优化 @zhangpaopao0609 ([#1852](https://github.com/Tencent/tdesign-vue-next/pull/1852))
- `Site`: 增加官网构建更新覆盖率徽章 @pengYYYYY ([#1866](https://github.com/Tencent/tdesign-vue-next/pull/1866))
- `ColorPicker`: 补充 `color-picker `单元测试 @S-mohan ([#1872](https://github.com/Tencent/tdesign-vue-next/pull/1872))

## 🌈 0.24.1 `2022-10-10` 
### 🐞 Bug Fixes
- `Dropdown`: 修复插槽用法的使用缺陷  @uyarn ([#1827](https://github.com/Tencent/tdesign-vue-next/pull/1827))
- `Hooks`: 修复受控属性 `modelValue` 和其他受控属性处理逻辑不一致的问题 @jxwanglong ([#1828](https://github.com/Tencent/tdesign-vue-next/pull/1828))
### 🚧 Others
- `Message`: 补充 `message` 单元测试 @LadyChatterleyLover ([#1824](https://github.com/Tencent/tdesign-vue-next/pull/1824))


## 🌈 0.24.0 `2022-10-09` 
### 🚨 Breaking Changes
- `Dropdown`: 调整`Dropdown`样式，优化多层菜单样式结构，多层菜单结构有变动 @uyarn ([#1817](https://github.com/Tencent/tdesign-vue-next/pull/1817))
### 🚀 Features
- `Table`: 
  - 表格列属性 `attrs` 支持自定义任意单元格属性 @chaishi ([#1804](https://github.com/Tencent/tdesign-vue-next/pull/1804))
  - 新增列属性 `colspan`，用于设置单行表头合并 @chaishi ([#1804](https://github.com/Tencent/tdesign-vue-next/pull/1804))
  - 超出省略功能，支持同时设置省略浮层内容 `ellipsis.content` 和属性透传 `ellipsis.props` @chaishi ([#1804](https://github.com/Tencent/tdesign-vue-next/pull/1804))
- `Dropdown`: 
  - 支持`direction` API，支持向左展开菜单 @uyarn ([#1817](https://github.com/Tencent/tdesign-vue-next/pull/1817))
  -  新增`theme`等API 支持自定义菜单项主题 @uyarn ([#1817](https://github.com/Tencent/tdesign-vue-next/pull/1817))
  - 支持直接使用 `t-dropdown-menu` 作为子节点，同时继续支持 `dropdown` 的具名插槽，插槽方式支持多级菜单嵌套 @uyarn ([#1817](https://github.com/Tencent/tdesign-vue-next/pull/1817))
- `Dialog`: 增加 `fullscreen api`  @gumingWu ([#1687](https://github.com/Tencent/tdesign-vue-next/pull/1687))
- `Select`: 调整下拉交互允许输入时，不关闭下拉面板，减少相关交互问题 @uyarn ([#1808](https://github.com/Tencent/tdesign-vue-next/pull/1808))
### 🐞 Bug Fixes
- `Upload`: 
  - 修复 `upload` 导出预期外的变量导致组件注册时出现告警 @pengYYYYY ([#1775](https://github.com/Tencent/tdesign-vue-next/pull/1775))
  - 添加参数 `response` 到事件 `onSuccess`，单文件是对象，多文件是数组， @chaishi ([#1776](https://github.com/Tencent/tdesign-vue-next/pull/1776))
- `Tree`:
  -  修复`expandOnClickNode`与`checkable`冲突的问题 @uyarn ([#1812](https://github.com/Tencent/tdesign-vue-next/pull/1812))
  - 修复`disabled`状态下无法展开子选项的错误 @uyarn ([#1812](https://github.com/Tencent/tdesign-vue-next/pull/1812))
- `TreeSelect`: 
  - 修复节点选中状态变化时 `change` 事件触发两次 @Lmmmmmm-bb ([#1797](https://github.com/Tencent/tdesign-vue-next/pull/1797))
  - 修复多选状态下点击选项直接关闭面板的问题 @uyarn ([#1812](https://github.com/Tencent/tdesign-vue-next/pull/1812))
- `Swiper`: 修复卡片模式时，切换空白的问题 @btea ([#1796](https://github.com/Tencent/tdesign-vue-next/pull/1796))
- `Popup`: 修复更改 `classprefix` 导致展开收起动画失效及相关连锁问题 @uyarn ([#1790](https://github.com/Tencent/tdesign-vue-next/pull/1790))
- `TimePicker`: 修复部分设备下无法获取内联 `token` 导致的滚动异常 @uyarn ([#1790](https://github.com/Tencent/tdesign-vue-next/pull/1790))

### 🚧 Others
- `Textarea`: 补充 `textarea`单元测试 @LadyChatterleyLover ([#1772](https://github.com/Tencent/tdesign-vue-next/pull/1772))
- `Radio`: 补充 `radio`单元测试 @LadyChatterleyLover ([#1772](https://github.com/Tencent/tdesign-vue-next/pull/1772))
- `Checkbox`: 补充 `checkbox` 单元测试 @LadyChatterleyLover ([#1781](https://github.com/Tencent/tdesign-vue-next/pull/1781))
- `Progress`: 补充 `progress`单元测试 @LadyChatterleyLover ([#1783](https://github.com/Tencent/tdesign-vue-next/pull/1783))
- `Input`: 补充 `input` 单元测试 @LadyChatterleyLover ([#1764](https://github.com/Tencent/tdesign-vue-next/pull/1764))
- `Comment`: 补充 `comment` 单元测试 @LadyChatterleyLover ([#1785](https://github.com/Tencent/tdesign-vue-next/pull/1785))
- `Loading`: 补充 `loading` 单元测试 @LadyChatterleyLover ([#1789](https://github.com/Tencent/tdesign-vue-next/pull/1789))
- `List`: 补充 `list` 单元测试 @LadyChatterleyLover ([#1788](https://github.com/Tencent/tdesign-vue-next/pull/1788))
- `Alert`: 补充 `alert` 单元测试 @LadyChatterleyLover ([#1786](https://github.com/Tencent/tdesign-vue-next/pull/1786))
- `Progress`: 用 `space` 组件替换更新 `progress` 的示例代码 @yusongh ([#1799](https://github.com/Tencent/tdesign-vue-next/pull/1799))
- `TreeSelect`: 增加 `change` 事件单元测试 @Lmmmmmm-bb ([#1797](https://github.com/Tencent/tdesign-vue-next/pull/1797))
- `Comment`: 用 `space` 组件替换更新 `comment` 的示例代码 @RayJason ([#1805](https://github.com/Tencent/tdesign-vue-next/pull/1805))
- `List`: 用 `space` 组件替换更新 `list` 的示例代码 @RayJason ([#1805](https://github.com/Tencent/tdesign-vue-next/pull/1805))
- `Loading`: 用 `space` 组件替换更新 `loading` 的示例代码@RayJason ([#1805](https://github.com/Tencent/tdesign-vue-next/pull/1805))
- `Dialog`: 补充 `dialog` 单元测试 @LadyChatterleyLover ([#1811](https://github.com/Tencent/tdesign-vue-next/pull/1811))
- `Steps`: 补充 `steps` 单元测试 @LadyChatterleyLover ([#1813](https://github.com/Tencent/tdesign-vue-next/pull/1813))
- `InputNumber`: 补充 `input-number` 单元测试 @LadyChatterleyLover ([#1816](https://github.com/Tencent/tdesign-vue-next/pull/1816))


## 🌈 0.23.1 `2022-09-28` 
### 🐞 Bug Fixes
- `Upload`: 
  - 请求支持带上自定义 `headers` @chaishi ([#1767](https://github.com/Tencent/tdesign-vue-next/pull/1767)). 恢复 
  -  `withCredentials`  @chaishi ([#1768](https://github.com/Tencent/tdesign-vue-next/pull/1768))
- `DatePicker`: 
  - 支持 `valueType api` @HQ-Lin ([#1769](https://github.com/Tencent/tdesign-vue-next/pull/1769))
  - 修复传入 `lambda` 函数被频繁触发问题 @HQ-Lin ([#1749](https://github.com/Tencent/tdesign-vue-next/pull/1749))
- `InputNumber`: 输入中文或特殊符号时，清空数字为 `undefined` @chaishi ([#1767](https://github.com/Tencent/tdesign-vue-next/pull/1767))
- `Menu`: 修复横向菜单栏子类过多，样式错乱问题 @sinbadmaster ([#1742](https://github.com/Tencent/tdesign-vue-next/pull/1742))

### 🚧 Others
- `Badge`: 补充 `Badge` 组件单元测试 @LadyChatterleyLover ([#1746](https://github.com/Tencent/tdesign-vue-next/pull/1746))
- `Grid`: 补充 `grid` 单元测试 @LadyChatterleyLover ([#1755](https://github.com/Tencent/tdesign-vue-next/pull/1755))
- `Layout`: 补充 `layout` 单元测试 @LadyChatterleyLover ([#1760](https://github.com/Tencent/tdesign-vue-next/pull/1760))
- `Avatar`: 补充 `avatar` 单元测试 @LadyChatterleyLover ([#1753](https://github.com/Tencent/tdesign-vue-next/pull/1753))

## 🌈 0.23.0 `2022-09-27` 
### 🚨 Breaking Changes
- `Upload`: 
  - `autoUpload=false` 时，增加 `onChange` 事件的触发@chaishi ([#1723](https://github.com/Tencent/tdesign-vue-next/pull/1723))
  - ⚠️ `formatResponse` 不再对 `file` 对象进行格式化，仅处理 `response` 属性进行处理。如果要扩展 `file` 对象，请在 `onChange` 事件中处理

### 🚀 Features
- `Upload`: 
  - `UploadFile` 对象新增 `uploadTime` 属性，用于表示上传时间 @chaishi ([#1723](https://github.com/Tencent/tdesign-vue-next/pull/1723))
  - `theme=file` 支持多文件上传 @chaishi ([#1723](https://github.com/Tencent/tdesign-vue-next/pull/1723))
  - 文件上传前处理函数 `beforeUpload` 存在时，依然支持 `sizeLimit` 检测 @chaishi ([#1723](https://github.com/Tencent/tdesign-vue-next/pull/1723))
  - 新增 `beforeAllFilesUpload`，所有文件上传之前执行，支持一次性判定所有文件是否继续上传。已经存在的 `beforeUpload` 用于判定单个文件的是否继续上传 @chaishi ([#1723](https://github.com/Tencent/tdesign-vue-next/pull/1723))
  - 新增事件 `onValidate`，文件校验不通过时触发，可能情况有：自定义全文件校验不通过、文件数量校验不通过、文件数量校验不通过、文件名重复（允许重复文件名场景下不会触发）@chaishi ([#1723](https://github.com/Tencent/tdesign-vue-next/pull/1723))
  - 新增事件 `onOneFileSuccess` ，多文件上传场景下，在单个文件上传成功后触发 @chaishi ([#1723](https://github.com/Tencent/tdesign-vue-next/pull/1723))
  - 新增事件 `onOneFileFail` ，多文件上传场景下，在单个文件上传失败后触发 @chaishi ([#1723](https://github.com/Tencent/tdesign-vue-next/pull/1723))
  - 新增 `formatRequest` 用于新增或修改上传请求参数（现有的 `format` 用于格式化文件对象）@chaishi ([#1723](https://github.com/Tencent/tdesign-vue-next/pull/1723))
  - 新增 `triggerButtonProps` 用于指定文件选择触发按钮风格 @chaishi ([#1723](https://github.com/Tencent/tdesign-vue-next/pull/1723))
- `Table`: 
  - 新增 `column.resizable` 支持自定义任意列是否可拖拽调整宽度 @ZTao-z ([#1732](https://github.com/Tencent/tdesign-vue-next/pull/1732))
  - 新增 `showHeader`，支持隐藏表头 @chaishi ([#1740](https://github.com/Tencent/tdesign-vue-next/pull/1740))
  - 新增 `column.colKey = serial-number`，支持序号列功能，(( @chaishi ([#1740](https://github.com/Tencent/tdesign-vue-next/pull/1740))
  - 新增 `showSortColumnBgColor`，用于控制是否显示排序列背景色 @chaishi ([#1740](https://github.com/Tencent/tdesign-vue-next/pull/1740))
  - 支持属性 `tree.treeNodeColumnIndex` 动态修改， () @chaishi ([#1740](https://github.com/Tencent/tdesign-vue-next/pull/1740))
- `Menu`: 如果存在链接参数，默认使用标签 `<a>`  @Lmmmmmm-bb ([#1728](https://github.com/Tencent/tdesign-vue-next/pull/1728)) 
- `Image`: 增加 `image` 组件 @pengYYYYY ([#1735](https://github.com/Tencent/tdesign-vue-next/pull/1735))

### 🐞 Bug Fixes
- `Table`: 
  -  树形结构，叶子节点缩进距离修正 @chaishi ([#1740](https://github.com/Tencent/tdesign-vue-next/pull/1740))
  - 超出省略功能，`ellipsisTitle`优先级应当高于 `ellipsis`，  @chaishi ([#1740](https://github.com/Tencent/tdesign-vue-next/pull/1740))
  - 修复不提供 `expandedRowKeys` 的绑定会报错 @MyZhouGit ([#1705](https://github.com/Tencent/tdesign-vue-next/pull/1705))
  - 行选中功能，修复 `column.type=single` 时，`column.title` 无效问题， @chaishi ([#1740](https://github.com/Tencent/tdesign-vue-next/pull/1740))
  - 过滤功能，`list.value` 值为 `number` 无法高亮过滤图标问题 @chaishi ([#1740](https://github.com/Tencent/tdesign-vue-next/pull/1740))
  - 行选中功能，数据变化时，选中的数据依旧是变化前的数据， @chaishi ([#1740](https://github.com/Tencent/tdesign-vue-next/pull/1740))
- `Swiper`:
  -  修复鼠标悬停移出后没有重新轮播问题  @yusongH ([#1717](https://github.com/Tencent/tdesign-vue-next/pull/1717))
  - 修复 `trriger` 属性不生效问题  @yusongH ([#1717](https://github.com/Tencent/tdesign-vue-next/pull/1717))
  - 修复鼠标悬停移出后没有重新轮播问题 @yusongH ([#1717](https://github.com/Tencent/tdesign-vue-next/pull/1717))
  -  修复 `swiper` 组件的 `demo` 显示不正确 @yusongH ([#1725](https://github.com/Tencent/tdesign-vue-next/pull/1725))
- `ImageViewer`: 
  - 按 `class` 命名规范修复组件 `class` 命名 @sinbadmaster ([#1731](https://github.com/Tencent/tdesign-vue-next/pull/1731))
 - 修复 `demo` 中弹出窗样式异常 @sinbadmaster ([#1731](https://github.com/Tencent/tdesign-vue-next/pull/1731))
- `DatePicker`: 
  - 修复 `prefixIcon` `suffixIcon` 失效问题  @HQ-Lin ([#1724](https://github.com/Tencent/tdesign-vue-next/pull/1724))
  - 优化 `datepicker` 输入事件交互 @HQ-Lin ([#1736](https://github.com/Tencent/tdesign-vue-next/pull/1736))
- `Dialog`: 修复在弹窗内按下鼠标,在蒙层中松开会关闭弹窗的问题 @sechi747 ([#1739](https://github.com/Tencent/tdesign-vue-next/pull/1739))
- `TreeSelect`:  修复 `popuoContent` 无 `padding` @fenbitou ([#1714](https://github.com/Tencent/tdesign-vue-next/pull/1714))
- `Hooks`:  修复使用 `v-model.trim` 会将内容清空的问题 @zhangpaopao0609 ([#1721](https://github.com/Tencent/tdesign-vue-next/pull/1721))
- `TimePicker`: 调整 `time-pick` 样式 @wanghanzhen ([#1730](https://github.com/Tencent/tdesign-vue-next/pull/1730))
- `Upload`: 修复一个请求上传多个文件，参数携带全部文件，当前只会携带一个 `file` 参数@chaishi ([#1723](https://github.com/Tencent/tdesign-vue-next/pull/1723))
### 🚧 Others
-  `Dropdown`: 补充 `dropdown` 单元测试@Isabella327 ([#1708](https://github.com/Tencent/tdesign-vue-next/pull/1708))
- `Switch`: 补充 `switch` 单元测试 @ChrisLee0211 ([#1729](https://github.com/Tencent/tdesign-vue-next/pull/1729))
- `Tabs`: 补充 `Tabs` 单元测试 @YunYouJun ([#1734](https://github.com/Tencent/tdesign-vue-next/pull/1734))
- `Tag`: 补充 `tag` 单元测试 @LadyChatterleyLover ([#1743](https://github.com/Tencent/tdesign-vue-next/pull/1743))
- `Skeleton`: 补充 `skeleton` 单元测试  @LadyChatterleyLover ([#1744](https://github.com/Tencent/tdesign-vue-next/pull/1744))
- `Card`:  补充 `card` 组件单元测试 @LadyChatterleyLover ([#1745](https://github.com/Tencent/tdesign-vue-next/pull/1745))


## 🌈 0.22.1 `2022-09-21` 
### 🐞 Bug Fixes
- `Collapse`: 修复 `content api` 不支持  @isanxia ([#1707](https://github.com/Tencent/tdesign-vue-next/pull/1707))
- `TimePicker`: 修复部分场景滚动异常无法选中 `23:59:59` 的问题 @uyarn ([#1711](https://github.com/Tencent/tdesign-vue-next/pull/1711))
- `Steps`: 修复 `StepItem` 使用插槽渲染 `value` 属性无效的问题 @k1nz ([#1712](https://github.com/Tencent/tdesign-vue-next/pull/1712))
- `Steps`: 修复使用反转顺序 `sequence=reverse` 显示错误的问题 @k1nz ([#1712](https://github.com/Tencent/tdesign-vue-next/pull/1712))
- `Tag`: 修复 `close` 事件冒泡 @itzj86 ([#1713](https://github.com/Tencent/tdesign-vue-next/pull/1713))
- `InputNumber`: 处理 `0` 比较的异常  @uyarn([#common850](https://github.com/Tencent/tdesign-common/pull/850)) 
### 🚧 Others
- `Collapse`: 增加单元测试用例 @isanxia ([#1707](https://github.com/Tencent/tdesign-vue-next/pull/1707))


## 🌈 0.22.0 `2022-09-19` 
### 🚨 Breaking Changes
- `DatePicker`: 移除 `valueType api` @HQ-Lin ([#1668](https://github.com/Tencent/tdesign-vue-next/pull/1668))

### 🚀 Features
- `LiveDemo`: 添加 `watermark` `LiveDemo` @k1nz ([#1684](https://github.com/Tencent/tdesign-vue-next/pull/1684))
- `Table`: 可编辑单元格，添加 `row/rowIndex/col/colIndex` 到 `onEdited` @chaishi ([#1695](https://github.com/Tencent/tdesign-vue-next/pull/1695))
- `ImageViewer`: 支持 `title` 与 `trigger` 中的 `open api` @sinbadmaster ([#1686](https://github.com/Tencent/tdesign-vue-next/pull/1686))
- `DatePicker`: 默认时间调整成 `00:00:00` @HQ-Lin ([#1660](https://github.com/Tencent/tdesign-vue-next/pull/1660))
- `DatePicker`: 优化二次修改日期不规范时清空另一侧数据 @HQ-Lin ([#1688](https://github.com/Tencent/tdesign-vue-next/pull/1688))

### 🐞 Bug Fixes
- `Input`: 修复默认状态提示文字颜色错误问题 @xiaosansiji ([#1663](https://github.com/Tencent/tdesign-vue-next/pull/1663))
- `Jumper`: 修复 `tips props` 类型缺失 @HelKyle ([#1669](https://github.com/Tencent/tdesign-vue-next/pull/1669))
- `Demos`: 修复 `select-input` 示例展示   @pengYYYYY ([#1670](https://github.com/Tencent/tdesign-vue-next/pull/1670))
- `Tooltip`:  修复无法正常展示 @zhangpaopao0609 ([#1675](https://github.com/Tencent/tdesign-vue-next/pull/1675))
- `LiveDemo`: 修复 `Select` 的 `LiveDemo` 问题  @k1nz ([#1684](https://github.com/Tencent/tdesign-vue-next/pull/1684))
- `Table`: 延迟更新表头时使用当前表宽重新计算各列宽度 @ZTao-z ([#1691](https://github.com/Tencent/tdesign-vue-next/pull/1691))
- `Select`: 修复 `clear` 清除操作，当前会设置 `value` 为空字符串  @pengYYYYY ([#1681](https://github.com/Tencent/tdesign-vue-next/pull/1681))
- `Steps`: 修复 `Steps` 使用插槽报错不渲染的问题 @k1nz ([#1697](https://github.com/Tencent/tdesign-vue-next/pull/1697))
- `Steps`: 修复 `Steps` 生产环境 `extra` 插槽显示异常问题 @k1nz ([#1697](https://github.com/Tencent/tdesign-vue-next/pull/1697))
- `ImageViewer`: 修复键盘事件监听时机 @sinbadmaster ([#1686](https://github.com/Tencent/tdesign-vue-next/pull/1686))
- `Menu`: 修复 `menuItem` 过多时超出显示滚动条  @sinbadmaster ([#1381](https://github.com/Tencent/tdesign-vue-next/pull/1381))
- `Menu`: 平铺式侧边导航，收起菜单，三级目录不展示  @sinbadmaster ([#1381](https://github.com/Tencent/tdesign-vue-next/pull/1381))
- `Pagination`: `hover` 增加过渡效果 @zhangpaopao0609 ([#1689](https://github.com/Tencent/tdesign-vue-next/pull/1689))

### 🚧 Others
- `Build`: 修复默认导入引用文件缺失问题 @HQ-Lin ([#1685](https://github.com/Tencent/tdesign-vue-next/pull/1685))
- `Pagination`: 补充单元测试 @HelKyle ([#1690](https://github.com/Tencent/tdesign-vue-next/pull/1690))

## 🌈 0.21.1 `2022-09-15`
### 🐞 Bug Fixes
- `ToolTip`: 修复ToolTip无法正常展示的问题 @zhangpaopao0609 ([#1675](https://github.com/Tencent/tdesign-vue-next/pull/1675))

## 🌈 0.21.0 `2022-09-14` 
### 🚨 Breaking Changes
- 支持 `es module` 导出不带样式产物，调整 `lib` 包内容，新增 `cjs` 产物支持 `commonjs` 导出不带样式产物 @HQ-Lin ([#1646](https://github.com/Tencent/tdesign-vue-next/pull/1646))

### 🚀 Features
- `hooks`:  优化受控与非受控 `hooks` @zhangpaopao0609 ([#1582](https://github.com/Tencent/tdesign-vue-next/pull/1582))
- `Guide`: 新增 `Guide` 引导组件 @zhangpaopao0609 ([#1540](https://github.com/Tencent/tdesign-vue-next/pull/1540))

### 🐞 Bug Fixes
- `LiveDemo`: 修复 `tree` ` live demo` 问题 @HQ-Lin ([#1628](https://github.com/Tencent/tdesign-vue-next/pull/1628))
- `Dropdown`: 修复树形结构下的 `onclick` 调用错误 @pengYYYYY ([#1647](https://github.com/Tencent/tdesign-vue-next/pull/1647))
- `Table`: 修复 `columns type` 为 `multiple` 时，设置 `className` 无效的问题  @ojhaywood ([#1633](https://github.com/Tencent/tdesign-vue-next/pull/1633))
- `Table`: 优化列宽调整策略 @ZTao-z ([#1649](https://github.com/Tencent/tdesign-vue-next/pull/1649))
- `TimePicker`: 修复往前点击时间时滚动异常的问题 @uyarn ([#1657](https://github.com/Tencent/tdesign-vue-next/pull/1657))
- `watermark`: 修复 `removable` 无效 @samhou1988 ([#1635](https://github.com/Tencent/tdesign-vue-next/pull/1635))
- `Form`: 修复 `labelAlign` 为 `top` 时, `form-item lable` 为空 `labl`e 还会占据空间的问题 @ojhaywood ([#1623](https://github.com/Tencent/tdesign-vue-next/pull/1623))
- `ImageViewer`:  多图片示例切换状态修复 @sinbadmaster ([#1630](https://github.com/Tencent/tdesign-vue-next/pull/1630))

### 🚧 Others
- `Demo`: 使用 `space` 组件简化 `avatar`, `badge`, `calendar`, `card`, `collapse` 示例 @RayJason ([#1655](https://github.com/Tencent/tdesign-vue-next/pull/1655))
- `Demo`: 使用 `space` 组件简化 `checkbox`, `colorPicker `, `form` 示例 @RayJason ([#1659](https://github.com/Tencent/tdesign-vue-next/pull/1659))

## 🌈 0.20.5 `2022-09-07`

### 🐞 Bug Fixes
 
- 修复 `package.json` 中 `exports` 配置变更导致的 `autoimport` 失效


## 🌈 0.20.4 `2022-09-06` 
### 🚀 Features

- `Select`: 
  - 支持基础功能「全选」 @RayJason ([#1566](https://github.com/Tencent/tdesign-vue-next/pull/1566))
  - `change` 事件回掉函数增加选中 `option` 参数  @RayJason ([#1566](https://github.com/Tencent/tdesign-vue-next/pull/1566))
- `Table`: 
  - 树形结构，新增 `getTreeExpandedRow`，用于获取展开的树形节点 @chaishi ([#1591](https://github.com/Tencent/tdesign-vue-next/pull/1591))
  -  可编辑单元格，`edit.rules` 新增数据类型 `function`，用于动态设置校验规则， @chaishi ([#1591](https://github.com/Tencent/tdesign-vue-next/pull/1591))
- `Popup`: 增加 `delay` prop @ikeq ([#1568](https://github.com/Tencent/tdesign-vue-next/pull/1568))
- `Loading`: 实现自定义指令 `v-loading`，支持 `fullscreen` `inheritColor` 修饰符  @zhangpaopao0609 ([#1579](https://github.com/Tencent/tdesign-vue-next/pull/1579))
- `ImageViewer`: 增加 `ImageViewer` 组件  @sinbadmaster ([#1516](https://github.com/Tencent/tdesign-vue-next/pull/1516))
- `ConfigProvider`: 主题配置新增圆角面板 支持圆角配置 @mingrutough1 @uyarn ([#1606](https://github.com/Tencent/tdesign-vue-next/pull/1606))
- `Button`: 增加 `tag` 和 `herf` 属性 @pengYYYYY ([#1597](https://github.com/Tencent/tdesign-vue-next/pull/1597))
- `Form`: 添加 `whitespace` 校验默认错误信息 @k1nz ([#1567](https://github.com/Tencent/tdesign-vue-next/pull/1567))

### 🐞 Bug Fixes
- `Cascader`: 
  - 修复 `value` 为 `number` 类型时有告警  @Lmmmmmm-bb ([#1593](https://github.com/Tencent/tdesign-vue-next/pull/1593))
  - 修复 `loadingText` 无效  @pengYYYYY ([#1601](https://github.com/Tencent/tdesign-vue-next/pull/1601))
  - 修复多选状态下点击 `label` 展开子级表现异常 @pengYYYYY ([#1601](https://github.com/Tencent/tdesign-vue-next/pull/1601))
- `DatePicker`: 
  - 修复 `cell-click` 事件失效问题 @HQ-Lin ([#1544](https://github.com/Tencent/tdesign-vue-next/pull/1544))
  - 修复空字符串页面崩溃问题 @HQ-Lin ([#1590](https://github.com/Tencent/tdesign-vue-next/pull/1590))
- `Tabs`: 修复 `addable` 添加按钮定位错误 @HelKyle ([#1553](https://github.com/Tencent/tdesign-vue-next/pull/1553))
- `Select`: 修复 `creatable` 模式下的 `filter` 能力 @skytt ([#1550](https://github.com/Tencent/tdesign-vue-next/pull/1550))
- `InputNumber`: 修复 `number` 类型校验 `bug` @Lmmmmmm-bb ([#1548](https://github.com/Tencent/tdesign-vue-next/pull/1548))
- `Checkbox`: 修复全选时可以选中已禁用选项的问题 @RayJason ([#1554](https://github.com/Tencent/tdesign-vue-next/pull/1554))
- `Tree`: `setData` 支持 `keys` 别名  @zhangpaopao0609 ([#1559](https://github.com/Tencent/tdesign-vue-next/pull/1559))
- `Popup`: 修复子 `popup` 销毁时父级意外关闭 @ikeq ([#1568](https://github.com/Tencent/tdesign-vue-next/pull/1568))
- `Swiper`:  修复动态渲染问题  @btea ([#1580](https://github.com/Tencent/tdesign-vue-next/pull/1580))
- `Table`: 修复表格部分元素无法随 table 变化而变化，如：空数据， @chaishi ([#1591](https://github.com/Tencent/tdesign-vue-next/pull/1591))
- `Button`: 修复 `button` `loading` 状态的样式问题 @uyarn ([#1610](https://github.com/Tencent/tdesign-vue-next/pull/1610))
- `TimePicker`: 修复部分设备滚动边界的跳动异常  @uyarn ([#1618](https://github.com/Tencent/tdesign-vue-next/pull/1618))
- `Tabs`: 修复 `addable` 添加按钮定位错误 @HelKyle ([#1553](https://github.com/Tencent/tdesign-vue-next/pull/1553))
- `LiveDemo`: 修复`slider` 垂直布局预览问题 @wbxl2000 ([#1603](https://github.com/Tencent/tdesign-vue-next/pull/1603))
### 🚧 Others
- `Jumper`: 增加单元测试 @Lmmmmmm-bb ([#1569](https://github.com/Tencent/tdesign-vue-next/pull/1569))


## 🌈 0.20.3 `2022-08-30` 
### 🚀 Features
- `DatePicker`: 优化不设置 `valueType` 场景下与 `format` 一致 @HQ-Lin ([#1525](https://github.com/Tencent/tdesign-vue-next/pull/1525))
- `Table`: 文本超出提示由 `Popup` 更为 `Tooltip`，以便于定制各种提示文本主题色 @PDieE ([#1497](https://github.com/Tencent/tdesign-vue-next/pull/1497))
- `Swiper`: 增加 `dots` 和 `dots-bar` 样式  @LeoEatle ([#1498](https://github.com/Tencent/tdesign-vue-next/pull/1498))
- `Grid`：`align` 可选值新增 `start/end/center` 等 @Micro-sun ([#1532](https://github.com/Tencent/tdesign-vue-next/pull/1532))

### 🐞 Bug Fixes
- `Table`: 
  - 修复了`editableCellState` 表现与预期相反的问题 @sechi747 ([#1489](https://github.com/Tencent/tdesign-vue-next/pull/1489))
  - 允许在表头分割线一定范围内触发列宽调整逻辑 @ZTao-z ([#1522](https://github.com/Tencent/tdesign-vue-next/pull/1522))
- `Cascader`:  
  - 修复单选模式下 `clearIcon`无法删除 @Lmmmmmm-bb ([#1524](https://github.com/Tencent/tdesign-vue-next/pull/1524))
  - 修复在输入时 `entry` 键会默认全选第一个选项的全部内容  @pengYYYYY ([#1534](https://github.com/Tencent/tdesign-vue-next/pull/1534))
  - 修复通过 `SelectInputProps ` 透传方法属性导致传入 `SelectInput` 的数据变成的数组  @pengYYYYY ([#1534](https://github.com/Tencent/tdesign-vue-next/pull/1534))
- `RangeInput`: 修正`RangeInput`右侧图标没有居中对齐的问题 @PDieE ([#1509](https://github.com/Tencent/tdesign-vue-next/pull/1509))
- `DatePicker`: 修复了 `TExtraContent` 组件中的 `selectedValue Props` 定义不正确的问题 () @sechi747 ([#1511](https://github.com/Tencent/tdesign-vue-next/pull/1511))
- `Dialog`: 非模态对话框优化拖拽事件鼠标表现 () @huoyuhao ([#1474](https://github.com/Tencent/tdesign-vue-next/pull/1474))

- `Popup`: 修复 `overlayInnerStyle ` 未监听变化，增强 `container` 健壮性  @pengYYYYY ([#1534](https://github.com/Tencent/tdesign-vue-next/pull/1534))
- `InputNumber`: 修复 `string` 与 `number` 比较错误及其导致的分页组件样式异常的问题 ([common#784](https://github.com/Tencent/tdesign-common/pull/784)) @uyarn ([#1537](https://github.com/Tencent/tdesign-vue-next/pull/1537))
- `Popconfirm`: `Popconfirm` 样式优化 @zhangpaopao0609 ([#1519](https://github.com/Tencent/tdesign-vue-next/pull/1519))
- `Input`: 修正 `clearable` 和 `password` 模式的预览按钮无法同时存在的问题 @PDieE ([#1518](https://github.com/Tencent/tdesign-vue-next/pull/1518))

## 🌈 0.20.2 `2022-08-23` 
### 🚀 Features
- `Table`: 
   - 支持行拖拽排序和列拖拽排序同时存在，() @chaishi ([#1467](https://github.com/Tencent/tdesign-vue-next/pull/1467))
   - 行展开功能，新增事件参数 `currentRowData`，表示当前展开行 @chaishi ([#1467](https://github.com/Tencent/tdesign-vue-next/pull/1467))
   - 可编辑单元格/行功能，新增 `editableCellState` 用于控制单元格是否可编辑，() @chaishi ([#1467](https://github.com/Tencent/tdesign-vue-next/pull/1467))
   - 可编辑单元格/行功能，新增 `edit.defaultEditable` 用于设置初始状态是否为编辑态 @chaishi ([#1467](https://github.com/Tencent/tdesign-vue-next/pull/1467))
- `Select`: 
   - 支持开启虚拟滚动处理大量数据的场景 @uyarn ([#1451](https://github.com/Tencent/tdesign-vue-next/pull/1451))
   - 调整 `loading` 态显示优先于 `empty` 属性 @skytt  @uyarn ([#1451](https://github.com/Tencent/tdesign-vue-next/pull/1451))
- `InputNumber`: 支持超过 `16` 位的大数字 @chaishi ([#1412](https://github.com/Tencent/tdesign-vue-next/pull/1412))
- `ConfigProvider`: 支持自定义全局 `icon`  @zhangpaopao0609 ([#1420](https://github.com/Tencent/tdesign-vue-next/pull/1420))
- `Rate`: 新增 `rate` 组件 @Yilun-Sun ([#1415](https://github.com/Tencent/tdesign-vue-next/pull/1415))
- `Dialog`: 增加弹窗回车事件 `API` @huoyuhao ([#1433](https://github.com/Tencent/tdesign-vue-next/pull/1433))

### 🐞 Bug Fixes
- `Table`: 
   - 修复吸顶表头，末尾有 `1px` 未对齐 @chaishi ([#1412](https://github.com/Tencent/tdesign-vue-next/pull/1412))
   - 修复窗口变化时，固定列阴影未更新问题 () @chaishi ([#1439](https://github.com/Tencent/tdesign-vue-next/pull/1439))
   - 修复行选中功能，多选，分页数据异步加载，`onSelectChange` 参数 `selectedRowData` 数据不完整问题，表示当前展开行，() @chaishi ([#1467](https://github.com/Tencent/tdesign-vue-next/pull/1467))
   - 修复可编辑行，联动数据校验问题，() @chaishi ([#1467](https://github.com/Tencent/tdesign-vue-next/pull/1467))
- `Tree`: 
   - `tree` 可选时 `onActive` 失效  @zhangpaopao0609 ([#1453](https://github.com/Tencent/tdesign-vue-next/pull/1453))
   - 修正 `setItem` 无法正确 展开，高亮，选中节点  @PDieE ([#1465](https://github.com/Tencent/tdesign-vue-next/pull/1465))
- `Cascader`: 
   - 修复异步获取 `options` 后的懒加载无效  () @pengYYYYY ([#1471](https://github.com/Tencent/tdesign-vue-next/pull/1471))
   - 修复 `value` 不是 `options` 的健值会报错 () @pengYYYYY ([#1471](https://github.com/Tencent/tdesign-vue-next/pull/1471))
- `InputNumber`: 修复数字精度问题 @chaishi ([#1412](https://github.com/Tencent/tdesign-vue-next/pull/1412))
- `Transfer`: `Transfer` 与 `Tree` 结合使用时，当 children 为空数组时，应当展示父节点  @zhangpaopao0609 ([#1438](https://github.com/Tencent/tdesign-vue-next/pull/1438))
- `Drawer`: 修复拖拽改变抽屉高度时可超出屏幕的问题 @sechi747 ([#1450](https://github.com/Tencent/tdesign-vue-next/pull/1450))
- `Tabs`: 修复 `card` 主题下 `onDragSort` 的 `targetIndex` 参数不正确的问题 @sechi747 ([#1455](https://github.com/Tencent/tdesign-vue-next/pull/1455))
- `Breadcrumb`: 修复了设置 `disabled` 属性后仍触发点击事件的问题 @sechi747 ([#1461](https://github.com/Tencent/tdesign-vue-next/pull/1461))
- `DaterPicker`: 调整默认展示时间为 `00:00:00` @HQ-Lin ([#1458](https://github.com/Tencent/tdesign-vue-next/pull/1458))
- `Slider`: 修复 `Slider` 输入框无法输入 `0` 问题 @ChrisLee0211 ([#1469](https://github.com/Tencent/tdesign-vue-next/pull/1469))


### 🚧 Others
- `Breadcrumb`: 增加 `breadcrumb` 单元测试 @xxxlj ([#1459](https://github.com/Tencent/tdesign-vue-next/pull/1459))


## 🌈 0.20.1 `2022-08-16` 
### 🚀 Features
- `Popup`: 新增 `overlayInnerClassName` 支持设置浮层内容样式名 @HQ-Lin ([#1431](https://github.com/Tencent/tdesign-vue-next/pull/1431))
### 🐞 Bug Fixes
- `Menu`: 修复下拉样式问题  @HQ-Lin ([#1431](https://github.com/Tencent/tdesign-vue-next/pull/1431))
- `DatePicker`: 修复有值时面板切换失效问题 @HQ-Lin ([#1425](https://github.com/Tencent/tdesign-vue-next/pull/1425))

## 🌈 0.20.0 `2022-08-15` 
### 🚨 Breaking Change
-  `Popup`: `overlayStyle` 调整为控制 `t-popup` 层级，新增 `overlayInnerStyle` 控制 `t-popup__content` 层级与原先 `overlayStyle` 效果一致。@HQ-Lin ([#1383](https://github.com/Tencent/tdesign-vue-next/pull/1383))
### 🚀 Features
- `Icon`: 新增`qq`、`wechat`、`wecom`、`relativity`和`pin-filled`等图标 @uyarn ([#1382](https://github.com/Tencent/tdesign-vue-next/pull/1382))
- `Table`:
  - 可编辑行功能，校验函数 `validateRowData` 和 `validateTableData` 返回值支持 `Promise` 对象 @chaishi ([#1392](https://github.com/Tencent/tdesign-vue-next/pull/1392))
  - 增加 `footerSummary` 到 `props` @chaishi ([#1371](https://github.com/Tencent/tdesign-vue-next/pull/1371))
- `DatePicker`: 支持季度国际化配置 @HQ-Lin ([#1379](https://github.com/Tencent/tdesign-vue-next/pull/1379))
- `Link`: 新增 `Link` 组件 @huoyuhao ([#1391](https://github.com/Tencent/tdesign-vue-next/pull/1391))
### 🐞 Bug Fixes
- `Table`:
  - 可编辑单元格，多选和日期选择，点击下拉浮层中的内容会导致退出编辑， @chaishi ([#1392](https://github.com/Tencent/tdesign-vue-next/pull/1392))
  - 列宽度和小于表宽的情况下，调整列宽的结果与预期不符 @ZTao-z ([#1406](https://github.com/Tencent/tdesign-vue-next/pull/1406))
  - 宽度计算函数添加注释 @ZTao-z ([#1413](https://github.com/Tencent/tdesign-vue-next/pull/1413))
  - 列宽度和小于表宽的情况下，调整列宽的结果与预期不符 @ZTao-z ([#1406](https://github.com/Tencent/tdesign-vue-next/pull/1406))
- `Menu`:
  - 修复在 `nuxt3` 里面鼠标悬浮或者点击子菜单不出现 元素代码里面出现一瞬间就消失了  @zhangpaopao0609 ([#1400](https://github.com/Tencent/tdesign-vue-next/pull/1400))
  - `t-menu-item` 大于 `8` 个将会溢出 @zhangpaopao0609 ([#1377](https://github.com/Tencent/tdesign-vue-next/pull/1377))
- `Tabs`: 修复 `Tabs` 选项卡在 `nuxt3 ssr` 应用中报错 `window is not defined`  @zhangpaopao0609 ([#1398](https://github.com/Tencent/tdesign-vue-next/pull/1398))
- `SelectInput`:
  - 修复属性 `props.readonly = true` 或 `props.allowInput = false` 时，仍会调用 `onBlur` 的问题 @k1nz ([#1351](https://github.com/Tencent/tdesign-vue-next/pull/1351))
  -修复当 `readonly` 或 `disabled` 属性为  `true` 、表单禁用时， `clearable` 按钮可以点击的问题 () @k1nz ([#1351](https://github.com/Tencent/tdesign-vue-next/pull/1351))
  - 修复同时开启 `readonly` 和 `allowInput` 属性时，可以输入的问题 @k1nz ([#1351](https://github.com/Tencent/tdesign-vue-next/pull/1351))
  - 修复在 `Form` 组件中使用禁用态表单不生效的问题 @k1nz ([#1351](https://github.com/Tencent/tdesign-vue-next/pull/1351))
  - 修复外部传入 `style` 无法透传到 `Input`  @pengYYYYY ([#1416](https://github.com/Tencent/tdesign-vue-next/pull/1416))
- `Select`:
  - 修复属性 `props.readonly = true` 或 `props.filterable = false` 时，仍会调用 `onBlur` 的问题 @k1nz ([#1351](https://github.com/Tencent/tdesign-vue-next/pull/1351))
  - 修复当 `readonly` 或 `disabled` 属性为 `true` 、表单禁用时， `clearable` 按钮可以点击的问题 () @k1nz ([#1351](https://github.com/Tencent/tdesign-vue-next/pull/1351))
  - 修复同时开启 `readonly` 和 `filterable` 属性时，可以输入的问题 @k1nz ([#1351](https://github.com/Tencent/tdesign-vue-next/pull/1351))
- `DatePicker`: 修复下拉样式问题  @HQ-Lin ([#1397](https://github.com/Tencent/tdesign-vue-next/pull/1397))
- `Input`: 修复在表单禁用时， `clearable` 按钮可以点击的问题 () @k1nz ([#1351](https://github.com/Tencent/tdesign-vue-next/pull/1351))
- `Cascader`: 修复在表单禁用时， `clearable` 按钮可以点击的问题 () @k1nz ([#1351](https://github.com/Tencent/tdesign-vue-next/pull/1351))
- `Popup`: 修复嵌套使用点击 `trigger` 元素时异常关闭  @ikeq ([#1419](https://github.com/Tencent/tdesign-vue-next/pull/1419))
- `Transfer`: 穿梭框 `checked` 和 `value` 的值不在 `data` 时会报错  @pengYYYYY ([#1416](https://github.com/Tencent/tdesign-vue-next/pull/1416))
- `Upload`: `size-limit ` 使用 `MB` 以上单位时校验错误  @pengYYYYY ([#1416](https://github.com/Tencent/tdesign-vue-next/pull/1416))
- `Dialog`: 对话框 `footer` 不显示情况下，`body padding` 与 `dialog padding` 冲突  @pengYYYYY ([#1416](https://github.com/Tencent/tdesign-vue-next/pull/1416))
- `Tree`: 组件实例方法 `setItem` 参数错误  @pengYYYYY ([#1416](https://github.com/Tencent/tdesign-vue-next/pull/1416))
- `InputNumber`: 修复无法触发 `onEnter` 方法   @pengYYYYY ([#1416](https://github.com/Tencent/tdesign-vue-next/pull/1416))
- `Nuxt3`: 修复因 `nuxt3` 将 `global `作为关键词，编译为 `globalThis` 导致的组件运行错误   @zhangpaopao0609 ([#1401](https://github.com/Tencent/tdesign-vue-next/pull/1401))

## 🌈 0.19.1 `2022-08-09` 
### 🚀 Features
- `DatePicker`: 支持周、季度选择器 @HQ-Lin ([#1336](https://github.com/Tencent/tdesign-vue-next/pull/1336))
- `Pagination`: 极简模式下合并快速跳转与页码跳转控制器 @HQ-Lin ([#1359](https://github.com/Tencent/tdesign-vue-next/pull/1359))
- `Style`: 新增字体相关 `CSS Token`，支持通过 `CSS Token` 修改字体相关配置 具体请参考 [font tokens](https://github.com/Tencent/tdesign-common/blob/develop/style/web/theme/_font.less) @uyarn ([#1358](https://github.com/Tencent/tdesign-vue-next/pull/1358))
- `Textarea`: 增加 `focus` 和 `blur` 实例方法 @timi137137 ([#1349](https://github.com/Tencent/tdesign-vue-next/pull/1349))
- `Input`: 增加 `focus` 和 `blur` 实例方法 @timi137137 ([#1349](https://github.com/Tencent/tdesign-vue-next/pull/1349))
- `Table`: 
  - 支持使用插槽 `footer-summary` 定义通栏表尾，同时支持同名属性 Props `footer-summary` 渲染通栏表尾 @chaishi ([#1357](https://github.com/Tencent/tdesign-vue-next/pull/1357))
  - 由于表格支持定义多行表尾，因而本次支持使用 `rowspanAndColspanInFooter` 定义表尾行数据合并单元格，使用方法同 `rowspanAndColspan`， @chaishi ([#1357](https://github.com/Tencent/tdesign-vue-next/pull/1357))  
  - 支持 `min-width` 透传到元素 `<col>`， @chaishi ([#1357](https://github.com/Tencent/tdesign-vue-next/pull/1357))
  - 新增 `cellEmptyContent`，当列数据为空时显示指定值， @chaishi ([#1357](https://github.com/Tencent/tdesign-vue-next/pull/1357))
  - 可编辑行功能，新增实例方法 `validate`，支持校验表格内的全部数据， @chaishi ([#1357](https://github.com/Tencent/tdesign-vue-next/pull/1357))
### 🐞 Bug Fixes
- `Table`: 
  - 修复深色模式下垂直和水平方向滚动条交汇处出现白点的样式问题 by @RayJason @uyarn ([#1358](https://github.com/Tencent/tdesign-vue-next/pull/1358))
  - 行选中会触发重置列宽调整的结果 @chaishi ([#1357](https://github.com/Tencent/tdesign-vue-next/pull/1357))
  - 可编辑行功能，提交校验时只校验了第一列， @chaishi ([#1357](https://github.com/Tencent/tdesign-vue-next/pull/1357))
  - 列配置功能，带边框模式，移除分页组件边框下方多余的边框 @chaishi ([#1357](https://github.com/Tencent/tdesign-vue-next/pull/1357))
- `Menu`:  使用 `relatedTarget` 标准属性兼容浏览器差异，修复在火狐浏览器无法收起的问题 ,   @sinbadmaster ([#1345](https://github.com/Tencent/tdesign-vue-next/pull/1345))
- `ColorPicker`: 优化更新 `color-picker` 组件样式 @S-mohan ([#1346](https://github.com/Tencent/tdesign-vue-next/pull/1346))
- `Dialog`: 修复 `confirm-btn` 类型问题  @pengYYYYY ([#1363](https://github.com/Tencent/tdesign-vue-next/pull/1363))
- `Dropdown`: 修复 `popupElem` 为空时的组件内部报错  @pengYYYYY ([#1363](https://github.com/Tencent/tdesign-vue-next/pull/1363))
- `TagInput`: 修复 `taginput` 空值时缺失 `padding` 的问题 @uyarn  @pengYYYYY ([#1363](https://github.com/Tencent/tdesign-vue-next/pull/1363))

## 🌈 0.19.0 `2022-08-03` 

### 🚨 Breaking Change
- 调整全局 `border-radius` 样式 token，`@border-radius` 改名为 `@border-radius-default`，支持更多圆角 `token`。 使用 `esm` 包修改 `less token` 的业务需要注意 @mingrutough1 [common #666](https://github.com/Tencent/tdesign-common/pull/666)，组件库中各组件实现圆角也做了统一调整，详情参见 https://github.com/Tencent/tdesign/discussions/158

### 🚀 Features
- `SelectInput`: `SelectInput` 及相关的 `Select/Cascader/TreeSelect` 组件交互调整，再次点击输入框时也可以收起下拉框。 @xiaosansiji ([#1299](https://github.com/Tencent/tdesign-vue-next/pull/1299))
- `Upload`: 增加 `setPercent ` 实例方法用于满足自定义上传方法时设置上传进度 @pengYYYYY ([#1331](https://github.com/Tencent/tdesign-vue-next/pull/1331))
### 🐞 Bug Fixes
- `Table`:
  - 树形结构，展开全部功能，默认不应该展开懒加载节点 @chaishi ([#1307](https://github.com/Tencent/tdesign-vue-next/pull/1307))
  - 多级表头，表尾列显示异常 @chaishi ([#1307](https://github.com/Tencent/tdesign-vue-next/pull/1307))
  - 吸顶的多级表头，左侧边线缺失问题 @chaishi ([#1307](https://github.com/Tencent/tdesign-vue-next/pull/1307))
- `Dialog`: 删除冗余的样式 @huoyuhao ([#1305](https://github.com/Tencent/tdesign-vue-next/pull/1305))
- `Cascader`: 修复在异步获取 `option` 的情况下，参数校验导致用户行为异常 @pengYYYYY ([#1317](https://github.com/Tencent/tdesign-vue-next/pull/1317))
- `Popup`: 修复 `content` 为纯英文时无法自动换行   @pengYYYYY ([#1317](https://github.com/Tencent/tdesign-vue-next/pull/1317))
- `Tree`: 修复 `setData` 组件存在 `children` 后的导致组件崩溃 @ardor-zhang ([#657](https://github.com/Tencent/tdesign-common/pull/657))
- `Tabs`:
  - 修复 `tabpanel` 组件的 `label` 不能根据函数进行自定义展示  @pengYYYYY ([#1331](https://github.com/Tencent/tdesign-vue-next/pull/1331))
  - 修复组合场景下的示例 @LAWTED ([#1334](https://github.com/Tencent/tdesign-vue-next/pull/1334))
- `Upload`: 修复 ` draggable` 和 `multiple` 组合使用时组件无输出 @pengYYYYY ([#1331](https://github.com/Tencent/tdesign-vue-next/pull/1331))
- `ClassPrefix`：替换遗漏的 `classprefix` @uyarn ([#1300](https://github.com/Tencent/tdesign-vue-next/pull/1300))
### 🚧 Others
- `Table`: 修复 `validateRowDate` 拼写错误到 `validateRowData`   @pengYYYYY ([#1317](https://github.com/Tencent/tdesign-vue-next/pull/1317))

## 🌈 0.18.1 `2022-07-26` 
### 🚀 Features
- `Table`: 树形结构，支持 `resetData` 重置整个树形结构数据 @chaishi ([#1278](https://github.com/Tencent/tdesign-vue-next/pull/1278))
- `TagInput`: 支持标签拖拽 @ardor-zhang ([#1271](https://github.com/Tencent/tdesign-vue-next/pull/1271))
- `Slider`: `Slider` 新增 `showStep` 属性控制步长刻度值显示 @ChrisLee0211 ([#1287](https://github.com/Tencent/tdesign-vue-next/pull/1287))
- `Upload`: 支持单组件的文案配置 @uyarn ([#1289](https://github.com/Tencent/tdesign-vue-next/pull/1289))
- 支持通过CSS Token配置组件圆角 @mingrutough1 ([common#648](https://github.com/Tencent/tdesign-common/pull/648))
### 🐞 Bug Fixes
- `DatePicker`: 
  - 修复重置日期后面板月份未重置问题 @HQ-Lin ([#1248](https://github.com/Tencent/tdesign-vue-next/pull/1248))
  - 修复 `range` 选择器开始时间被禁用问题 @HQ-Lin ([#1270](https://github.com/Tencent/tdesign-vue-next/pull/1270))
- `Form`: 修复 `help` 插槽不生效的问题 @k1nz ([#1272](https://github.com/Tencent/tdesign-vue-next/pull/1272))
- `Dialog`: 修复 `preventScrollThrough` 为 `false` 情况下，`body` 间去了滚动条宽度 @huoyuhao ([#1261](https://github.com/Tencent/tdesign-vue-next/pull/1261))
- `Table`: 树形结构，懒加载节点重置时（即调用 `setData`）没有清空子节点信息问题 @chaishi ([#1278](https://github.com/Tencent/tdesign-vue-next/pull/1278))
- `Card`: 修复 `loading` 状态无效  @pengYYYYY ([#1275](https://github.com/Tencent/tdesign-vue-next/pull/1275))
- `Space`: 组件中若存在 `v-if`，则不渲染的组件间距依然存在  @pengYYYYY ([#1275](https://github.com/Tencent/tdesign-vue-next/pull/1275))
- `InputNumber`: 修复初始化为 `undefined` 情况下操作按钮 `disabled` 的校验问题   @pengYYYYY ([#1275](https://github.com/Tencent/tdesign-vue-next/pull/1275))
- `Radio`: 修复点击选择父盒子点击事件触发两次  @pengYYYYY ([#1275](https://github.com/Tencent/tdesign-vue-next/pull/1275))
- `Select`: 修复`autowidth` 无效  @pengYYYYY ([#1280](https://github.com/Tencent/tdesign-vue-next/pull/1280))
## 🌈 0.18.0 `2022-07-18` 
### 🚨 Breaking Changes
- `Table`:  
  - 可编辑表格行，行校验函数由 `validateRowDate` 更名为 `validateRowData` @chaishi ([#1219](https://github.com/Tencent/tdesign-vue-next/pull/1219))
### 🚀 Features
- `Table`:
  - 树形结构，支持同时添加多个根节点 @chaishi ([#1219](https://github.com/Tencent/tdesign-vue-next/pull/1219))
  - 可选中行，扩大选择组件的点击范围 @chaishi ([#1232](https://github.com/Tencent/tdesign-vue-next/pull/1232))
  - 拖拽调整宽度，非边框模式，悬浮到表头时，显示表头边框 @chaishi ([#1232](https://github.com/Tencent/tdesign-vue-next/pull/1232))
### 🐞 Bug Fixes
- `Table`: 
  - 修复可编辑单元格，校验失败的信息无法清除问题， @chaishi ([#1219](https://github.com/Tencent/tdesign-vue-next/pull/1219))
  - 树形结构，修复树形结构懒加载顺序问题， @chaishi ([#1219](https://github.com/Tencent/tdesign-vue-next/pull/1219))
- `Swiper`: 动态修改 `swiper item` 会出现 `vue` 警告 @btea ([#1231](https://github.com/Tencent/tdesign-vue-next/pull/1231))
- `Tree`: 修复节点过滤后被一直锁住的问题 @ardor-zhang ([#1199](https://github.com/Tencent/tdesign-vue-next/pull/1199))
- `DatePicker`: 调整 `bem` 命名 @HQ-Lin ([#1225](https://github.com/Tencent/tdesign-vue-next/pull/1225))

## 🌈 0.17.5 `2022-07-14` 
### 🚀 Features
- `Icon`: 新增 `mirror` 和 `rotation` 图标 @uyarn ([#1201](https://github.com/Tencent/tdesign-vue-next/pull/1201))
- `DatePicker`: 支持面板年月动态响应 value 变化 @HQ-Lin ([#1206](https://github.com/Tencent/tdesign-vue-next/pull/1206))
### 🐞 Bug Fixes
- `Table`:
  - 列宽拖拽，拖动到边界处后无法再次拖动 @chaishi ([#1210](https://github.com/Tencent/tdesign-vue-next/pull/1210))
  - 多级表头场景下的多选，无法全选 @chaishi ([#1210](https://github.com/Tencent/tdesign-vue-next/pull/1210))
  - 修复可选中行 `table` 组件，`data` 为空数据时，默认全选按钮会选中的问题 @qdzhaoxiaodao ([#1188](https://github.com/Tencent/tdesign-vue-next/pull/1188))
- `Input`:
  - 修复 `autowidth` 表现异常  @pengYYYYY ([#1216](https://github.com/Tencent/tdesign-vue-next/pull/1216))
  - 修复 `Input` 组件切换 `type` 后不生效的问题 @qdzhaoxiaodao ([#1183](https://github.com/Tencent/tdesign-vue-next/pull/1183))
  - 修复 `Input` 组件切换 `type` 后不生效的问题 @qdzhaoxiaodao ([#1183](https://github.com/Tencent/tdesign-vue-next/pull/1183))
- `InputNumber`: 修复初始化时对 `null` 及字符串校验异常 @sinbadmaster ([#1214](https://github.com/Tencent/tdesign-vue-next/pull/1214))
- `Dialog`: 多个 `dialog` 同时存在时使用 `esc` 关闭异常 @sinbadmaster ([#1209](https://github.com/Tencent/tdesign-vue-next/pull/1209))
- `Icon`: 修复 `iconfont` 高级用法由于 `t-icon` 的干扰导致渲染异常的情况 @uyarn ([#1201](https://github.com/Tencent/tdesign-vue-next/pull/1201))
## 🌈 0.17.4 `2022-07-11` 
### 🚀 Features
- `DatePicker`: 新增 `panelPreselection api` @HQ-Lin ([#1164](https://github.com/Tencent/tdesign-vue-next/pull/1164))
- `Drawer`: 新增`sizeDraggble`属性 支持通过拖拽改变抽屉宽度/高度 @uyarn ([#1167](https://github.com/Tencent/tdesign-vue-next/pull/1167))
- `CascaderPanel`: 增加 `cascader-panel` 组件 @pengYYYYY ([#1161](https://github.com/Tencent/tdesign-vue-next/pull/1161))
- `Cascader`: 增加 `inputProps`, ` tagInputProps`, `tagProps` 属性 @pengYYYYY ([#1161](https://github.com/Tencent/tdesign-vue-next/pull/1161))
- `Table`: 支持行编辑功能 @chaishi ([#1186](https://github.com/Tencent/tdesign-vue-next/pull/1186))
- `Upload`: 增加 `allowUploadDuplicateFile` 支持配置相同文件名上传行为 @morningbao ([#1187](https://github.com/Tencent/tdesign-vue-next/pull/1187))
- `TimePicker`: 支持毫秒使用场景 @uyarn ([#1195](https://github.com/Tencent/tdesign-vue-next/pull/1195))
- `Tree`:  `tree` 支持拖拽 @ardor-zhang ([#1119](https://github.com/Tencent/tdesign-vue-next/pull/1119))
### 🐞 Bug Fixes
- `Dialog`:
  - 修复 `dialog` 阻止冒泡导致 `popup` 无法正常关闭 @HQ-Lin ([#1178](https://github.com/Tencent/tdesign-vue-next/pull/1178))
  - 修复打开对话框，出现滚动条() @pengYYYYY ([#1161](https://github.com/Tencent/tdesign-vue-next/pull/1161))
  - 内部样式未使用 `prefix` 导致替换前缀方式的样式丢失 @uyarn ([#1191](https://github.com/Tencent/tdesign-vue-next/pull/1191))
- `Slider`:
  - 修复 `label` 属性不生效 `bug` @ChrisLee0211 ([#1184](https://github.com/Tencent/tdesign-vue-next/pull/1184))
  - 修复 `tooltipProps` 为布尔值时丢失响应性问题 @ChrisLee0211 ([#1184](https://github.com/Tencent/tdesign-vue-next/pull/1184))
- `Space`: 通过FOR循环的内容 没有实现间隔效果  @pengYYYYY ([#1156](https://github.com/Tencent/tdesign-vue-next/pull/1156))
- `DatePicker`: 修复日期格式化问题 @HQ-Lin ([#1164](https://github.com/Tencent/tdesign-vue-next/pull/1164))
- `TimePicker`: 优化可输入模式的使用体验 避免高频输入场景与滚动事件重复更新 `value` 的异常 @uyarn ([#1169](https://github.com/Tencent/tdesign-vue-next/pull/1169))
- `Tree`: 取消修改 `value` 类型, 将传入 `TCheckBox` 组件的 `name` 转为 `string` 类型 @sufuwang ([#1172](https://github.com/Tencent/tdesign-vue-next/pull/1172))
- `Cascader`: 修复筛选无法输入问题 @pengYYYYY ([#1161](https://github.com/Tencent/tdesign-vue-next/pull/1161))
- `DatePicker`: 优化面板月份展示 @HQ-Lin ([#1180](https://github.com/Tencent/tdesign-vue-next/pull/1180))
- `Transfer`: 全选应该只选择搜索后的结果 @btea ([#1177](https://github.com/Tencent/tdesign-vue-next/pull/1177))
- `Select`: 多选下 `hover` 出现换行的异常 @uyarn ([#1191](https://github.com/Tencent/tdesign-vue-next/pull/1191))
- `Input`: `autoWidth` 在部分场景下失效导致组件样式异常 @uyarn ([#1191](https://github.com/Tencent/tdesign-vue-next/pull/1191))
- `Drawer`: 修复开启 `destroyOnClose` 之后，没了动画效果  @pengYYYYY ([#1185](https://github.com/Tencent/tdesign-vue-next/pull/1185))
- `TreeSelect`: 修复异步加载回显展示问题 @Godlike-meteor ([#1194](https://github.com/Tencent/tdesign-vue-next/pull/1194))
- `Textarea`: 修复无法传入 `attrs` 中的 `style` @sinbadmaster ([#1179](https://github.com/Tencent/tdesign-vue-next/pull/1179))

## 🌈 0.17.3 `2022-07-04` 
### 🚀 Features
- `Table`:
  - 可编辑单元格，支持编辑组件联动，  @chaishi ([#1137](https://github.com/Tencent/tdesign-vue-next/pull/1137))
  - 形结构支持半选状态 @chaishi ([#1142](https://github.com/Tencent/tdesign-vue-next/pull/1142))
- `Form`: 添加内置校验方法 `whitespace` @timi137137 ([#1110](https://github.com/Tencent/tdesign-vue-next/pull/1110))
- `Jumper`: 新增 `jumper` 组件 @HQ-Lin ([#1104](https://github.com/Tencent/tdesign-vue-next/pull/1104))
### 🐞 Bug Fixes
- `Table`:
  - 表头吸顶显示问题 @chaishi ([#1102](https://github.com/Tencent/tdesign-vue-next/pull/1102))
  - `paginationAffixedBottom` 支持配置 Affix 组件全部特性 @chaishi ([#1102](https://github.com/Tencent/tdesign-vue-next/pull/1102))
  - 修复动态数据合并元格问题， @chaishi ([#1135](https://github.com/Tencent/tdesign-vue-next/pull/1135))
  - 修复树形结构设置 `indent = 0` 无效问题， @chaishi ([#1135](https://github.com/Tencent/tdesign-vue-next/pull/1135))
- `DatePicker`:
  - 修复 `Jumper` 组件类名错误 @HQ-Lin ([#1085](https://github.com/Tencent/tdesign-vue-next/pull/1085))
  - 修复日期选择器在表单禁用后还能点击的问题 @timi137137 ([#1117](https://github.com/Tencent/tdesign-vue-next/pull/1117))
- `Dialog`:
  - 修复 `closeOnOverlayClick` `closeOnEscKeydown` 默认值导致的无法设置的问题 () @pengYYYYY ([#1101](https://github.com/Tencent/tdesign-vue-next/pull/1101))
  - 修复滚动失效问题  @HQ-Lin ([#1130](https://github.com/Tencent/tdesign-vue-next/pull/1130))
- `Select`:
  - 修复多选下换行提前占满一行的问题 @uyarn ([#1143](https://github.com/Tencent/tdesign-vue-next/pull/1143))
  - 修复 `input` 高度 `height 100%` 导致换行高度异常的问题 @uyarn ([#1143](https://github.com/Tencent/tdesign-vue-next/pull/1143))
- `Upload`: 在每次上传前将错误提示数据重置 @sinbadmaster ([#1103](https://github.com/Tencent/tdesign-vue-next/pull/1103))
- `RadioGroup`: 修复 `RadioGroup` 多次赋予不存在的值时文字不能正常显示 @timi137137 ([#1109](https://github.com/Tencent/tdesign-vue-next/pull/1109))
- `Drawer`: 修复 `closeOnOverlayClick` `closeOnEscKeydown` 默认值导致的无法设置的问题 () @pengYYYYY ([#1101](https://github.com/Tencent/tdesign-vue-next/pull/1101))
- `Tree`: `getRightData` 方法兼容 `value` 的 `alias`  @sufuwang ([#1118](https://github.com/Tencent/tdesign-vue-next/pull/1118))
- `Form`: 修复不传 `form.onSubmit` 回调函数导致的 `scrollToFirstError` 参数失效的问题 @k1nz ([#1120](https://github.com/Tencent/tdesign-vue-next/pull/1120))
- `DatePicker`: 修复 `clearble` 响应式问题 @HQ-Lin ([#1124](https://github.com/Tencent/tdesign-vue-next/pull/1124))
- `Slider`: 使用 `InputNumber` 时在使用 `range` 属性情况下传入 `min` 或 `max` 会导致手动输入显示 `NaN` 问题 @ChrisLee0211 ([#1136](https://github.com/Tencent/tdesign-vue-next/pull/1136))
- `Pagination`: 修复如果页面总数变更后当前页数不变的问题 @timi137137 ([#1147](https://github.com/Tencent/tdesign-vue-next/pull/1147))
- `RangeInput`: 修复 `rangeinput` 样式问题 @HQ-Lin ([#1123](https://github.com/Tencent/tdesign-vue-next/pull/1123))


## 🌈 0.17.2 `2022-06-28` 
### 🐞 Bug Fixes
- `ClassPrefix`: 未使用 `classPrefix` 的节点修复 () @pengYYYYY ([#1092](https://github.com/Tencent/tdesign-vue-next/pull/1092))
- `Input`: `type=number` 支持 `maxlength` 限制输入长度 @sinbadmaster ([#1088](https://github.com/Tencent/tdesign-vue-next/pull/1088))
- `Select`: 修复 `options` 属性 `disabled` 禁用选项不起作用 () @pengYYYYY ([#1094](https://github.com/Tencent/tdesign-vue-next/pull/1094))

## 🌈 0.17.1 `2022-06-27` 
### 🐞 Bug Fixes
- `Select`: 修复分组插槽使用在列表尾部会产生多余渲染，修复筛选状态交互。 @pengYYYYY ([#1082](https://github.com/Tencent/tdesign-vue-next/pull/1082))

## 🌈 0.17.0 `2022-06-27` 
### 🚨 Breaking Changes
- `reset`: 默认移除全局 `reset` 样式引入，可从 `tdesign-vue-next/dist/reset.css` 中单独引入
### 🚀 Features
- `Select`:
  - 增加列表展开时定位置选中项 @huoyuhao ([#1068](https://github.com/Tencent/tdesign-vue-next/pull/1068))
  - 修复 `options content`  属性向下透传问题 @pengYYYYY ([#1020](https://github.com/Tencent/tdesign-vue-next/pull/1020))
- `Form`: 现在 `FormItem.label` 为 `string` 类型时， `Form.errorMessage` 模板中的 `${name}` 会被替换为 `FormItem.label` 属性；当 `label` 属性为 `slot/function` 时，`${name}` 会被替换为 `FormItem.name` 属性 @k1nz ([#1022](https://github.com/Tencent/tdesign-vue-next/pull/1022))
- `Space`: 新增 `Space` 组件 @HQ-Lin ([#1035](https://github.com/Tencent/tdesign-vue-next/pull/1035))
- `Watermark`: 新增 `Watermark` 组件 @samhou1988 ([#921](https://github.com/Tencent/tdesign-vue-next/pull/921))
- `ConfigProvider`: 增加 `input` 组件 `autocomplete` 配置，增加 `dialog` 组件  `closeOnEscKeydown`, `closeOnOverlayClick` 配置,  增加 `select` 组件 `filterable`  配置，增加 `drawer` 组件  `closeOnEscKeydown`, `closeOnOverlayClick` 配置  @pengYYYYY ([#1074](https://github.com/Tencent/tdesign-vue-next/pull/1074))
- `Local`: 增加日语和韩语语言包 @pengYYYYY ([#1074](https://github.com/Tencent/tdesign-vue-next/pull/1074))
- `Table`: `fullRow` 不参与排序 @uyarn ([#1080](https://github.com/Tencent/tdesign-vue-next/pull/1080))
- `Watermark`: 新增 `Watermark` 组件 @samhou1988 ([#921](https://github.com/Tencent/tdesign-vue-next/pull/921))
- `Tree`:  `tree-checkbox` 支持 `number` 类型 @sufuwang ([#1032](https://github.com/Tencent/tdesign-vue-next/pull/1032))
### 🐞 Bug Fixes
- `DatePicker`:
  - 修复响应式问题 @HQ-Lin ([#1050](https://github.com/Tencent/tdesign-vue-next/pull/1050))
  - 修复 `clearable` 失效问题 @HQ-Lin ([#1055](https://github.com/Tencent/tdesign-vue-next/pull/1055))
- `Dialog`:
  - 修复 `update` 方法未正确更新   @pengYYYYY ([#1052](https://github.com/Tencent/tdesign-vue-next/pull/1052))
  - 修复 `destroy` 方法只是隐藏，没有销毁节点  @pengYYYYY ([#1052](https://github.com/Tencent/tdesign-vue-next/pull/1052))
- `TreeSelect`: 修改因传入 `treeProps.keys.children` 不生效的问题 @Godlike-meteor ([#1025](https://github.com/Tencent/tdesign-vue-next/pull/1025))
- `DatePicker`: 处理`disabled`无法生效的问题 @kerwin612 ([#1036](https://github.com/Tencent/tdesign-vue-next/pull/1036))
- `Slider`: 修复 `Slider` 组件使用 `inputNumberProp` 时，点击滑动条无法把值同步到 `InputNumber` 组件问题 @ChrisLee0211 ([#1034](https://github.com/Tencent/tdesign-vue-next/pull/1034))
- `Select`:
  - 修复 `group` 模式下的无法筛选 @pengYYYYY ([#1026](https://github.com/Tencent/tdesign-vue-next/pull/1026))
  - 修复设置可输入后移动端没有弹出输入法  @pengYYYYY ([#1072](https://github.com/Tencent/tdesign-vue-next/pull/1072))
- `Upload`:
  - 修复 `onSelectChange` 未实现 @pengYYYYY ([#1052](https://github.com/Tencent/tdesign-vue-next/pull/1052))
  - 修复 `progress` 进度展示误差问题  @pengYYYYY ([#1072](https://github.com/Tencent/tdesign-vue-next/pull/1072))
- `Cascader`:
  - 修复设置 `placeholder ` 无效, 优化 `filterable` 判断逻辑  @pengYYYYY ([#1072](https://github.com/Tencent/tdesign-vue-next/pull/1072))
  - 修复 `loading` 错位问题, 修复 `onBlur`, `onFocus` 事件实现 @pengYYYYY ([#1075](https://github.com/Tencent/tdesign-vue-next/pull/1075))
- `Radio`: 修复 `value` 为  `0` 时走入空值逻辑分支 @pengYYYYY ([#1026](https://github.com/Tencent/tdesign-vue-next/pull/1026))
- `TagInput`: 默认超出的换行为 `break-line` @skytt ([#1057](https://github.com/Tencent/tdesign-vue-next/pull/1057))
- `Form`: 修复校验规则为空时，校验信息不清空的问题 @k1nz ([#1071](https://github.com/Tencent/tdesign-vue-next/pull/1071))
- `Tree`: 修复 `setData` 方法未正确更新  @sufuwang ([#1059](https://github.com/Tencent/tdesign-vue-next/pull/1059))
- `Table`: 修复仅有`firstFullRow`不渲染的问题 @uyarn ([#1080](https://github.com/Tencent/tdesign-vue-next/pull/1080))

## 🌈 0.16.1 `2022-06-20` 
### 🚀 Features
- `Form`: 
  - 新增 `validateOnly` 实例方法 @k1nz ([#998](https://github.com/Tencent/tdesign-vue-next/pull/998))
  - 新增 `validate、submit` 实例方法参数 `showErrorMessage` @k1nz ([#998](https://github.com/Tencent/tdesign-vue-next/pull/998))
- `Table`:
  - 支持拖拽调整宽度，设置 `resizable=true` 即可 @chaishi ([#1011](https://github.com/Tencent/tdesign-vue-next/pull/1011))
  - 支持表头吸顶、表尾吸底、滚动条吸底、分页器吸底等 @chaishi ([#1011](https://github.com/Tencent/tdesign-vue-next/pull/1011))
  - 树形结构，`appendTo` 支持添加多条数据 @chaishi ([#1011](https://github.com/Tencent/tdesign-vue-next/pull/1011))
  - 树形结构，支持数据节点 懒加载 子节点数据 @chaishi ([#1011](https://github.com/Tencent/tdesign-vue-next/pull/1011))
- `Cascader`: 支持 `filter API` 用于自定义搜索方法  @pengYYYYY ([#1000](https://github.com/Tencent/tdesign-vue-next/pull/1000))
- `Dialog`: 新增 `preventScrollThrough` @uyarn ([#1009](https://github.com/Tencent/tdesign-vue-next/pull/1009))
### 🐞 Bug Fixes
- `Table`: 
  - 支持动态数据合并单元格 @chaishi ([#1011](https://github.com/Tencent/tdesign-vue-next/pull/1011))
  - 吸顶表头和自定义显示列场景，支持列拖拽调整顺序 @chaishi ([#1011](https://github.com/Tencent/tdesign-vue-next/pull/1011))
  - 修复 `firstFullRow` 存在时，拖拽排序的顺序不正确问题 @chaishi ([#1011](https://github.com/Tencent/tdesign-vue-next/pull/1011))
  - 修复加载更多的加载组件尺寸异常问题 @uyarn ([#1014](https://github.com/Tencent/tdesign-vue-next/pull/1014))
- `DatePicker`:
  - 修复 `datepicker format` 导致的高亮问题 @HQ-Lin ([#987](https://github.com/Tencent/tdesign-vue-next/pull/987))
  - 修复通过过快捷方式设置的时间区间高亮数据异常  @HQ-Lin ([#995](https://github.com/Tencent/tdesign-vue-next/pull/995))
  - 修复栅格的情况下组件宽度 超过父级容器的限制 组件显示不完整  @HQ-Lin ([#995](https://github.com/Tencent/tdesign-vue-next/pull/995))
- `TimePicker`:
  - 修复在 `datepicker` 中混用 不保留修改结果二次打开的异常 @uyarn ([#986](https://github.com/Tencent/tdesign-vue-next/pull/986))
  - 修复部分情况下由于 `allowInput ref` 问题导致保留改动结果的错误 @uyarn ([#986](https://github.com/Tencent/tdesign-vue-next/pull/986))
  - `range` 组件最外层使用 `range-picker` 命名与单时间选项区分 @uyarn ([#986](https://github.com/Tencent/tdesign-vue-next/pull/986))
- `Select`:
  - 修复使用 `onEnter` 事件报错  @pengYYYYY ([#1000](https://github.com/Tencent/tdesign-vue-next/pull/1000))
  - 修复远程搜索功能失效了  @pengYYYYY ([#1000](https://github.com/Tencent/tdesign-vue-next/pull/1000))
- `Form`:
  - `submit` 和 `reset` 现在不会触发 `submit` 和 `reset` 事件 @k1nz ([#998](https://github.com/Tencent/tdesign-vue-next/pull/998))
  - `submit` 实例方法兼容 `safari` 浏览器 @k1nz ([#998](https://github.com/Tencent/tdesign-vue-next/pull/998))
- `Dialog`: 修复 `dialog` 蒙层点击事件失效 @HQ-Lin ([#1001](https://github.com/Tencent/tdesign-vue-next/pull/1001))
- `Cascader`: 修复可过滤情况下，结果为空时候的 `popup` 宽度问题  @pengYYYYY ([#1000](https://github.com/Tencent/tdesign-vue-next/pull/1000))
- `Input`: 修复 `type` 为 `password` 时 `clearable` 属性不生效  @pengYYYYY ([#1000](https://github.com/Tencent/tdesign-vue-next/pull/1000))
- `ConfigProvider`: 修复 `inject` 在 `computed` 中意外出现, 优化配置文件 `merge` 性能 @pengYYYYY ([#1003](https://github.com/Tencent/tdesign-vue-next/pull/1003))
- `Tabs`: 修复 `panels` 变化时，往右按钮不出现的问题 @LeeJim ([#1008](https://github.com/Tencent/tdesign-vue-next/pull/1008))

## 🌈 0.16.0 `2022-06-14` 
### 🚨 Breaking Changes
- `Select`: 基于 `selectInput` 重构组件 , 并使用 `CompositionAPI` 重构组件逻辑, 增加相关 `API` @pengYYYYY ([#965](https://github.com/Tencent/tdesign-vue-next/pull/965))
- `DatePicker`: 重构 `DatePicker` 为 `compositionAPI`，全新的UI样式及交互，移除 `range api`，分别导出 `Datepicker` 与 `DateRangePicker` @HQ-Lin ([#943](https://github.com/Tencent/tdesign-vue-next/pull/943))
- `TimePicker`: 重构`TimePicker`为 `compositionAPI`，全新的UI样式及交互，`disableTime API` 有所调整, 调整交互为点击确认按钮保留改动, 直接关闭弹窗不保留改动恢复初始值。 @uyarn ([#943](https://github.com/Tencent/tdesign-vue-next/pull/943))

### 🚀 Features
- `Table`:  
  - 筛选对话框输入筛选内容之后按回车应该和按确定按钮一样，() @chaishi ([#935](https://github.com/Tencent/tdesign-vue-next/pull/935))
  - 筛选功能支持自定义组件方式，示例：`columns: [{ filter: { component: DatePicker, props: {} } }]` @chaishi ([#935](https://github.com/Tencent/tdesign-vue-next/pull/935))
  - 拖拽排序事件，新增参数 `data` 和 `newData`，分别表示变更前后的数据 @chaishi ([#935](https://github.com/Tencent/tdesign-vue-next/pull/935))
- `popup`: 支持动态设置 `trigger` & `placement` @ikeq ([#932](https://github.com/Tencent/tdesign-vue-next/pull/932))
- `InputAdornment`: 新增 `input-adornment` 组件 @HQ-Lin ([#949](https://github.com/Tencent/tdesign-vue-next/pull/949))
- `TreeSelect`: 增加 `autoWidth` `borderless` API @pengYYYYY ([#939](https://github.com/Tencent/tdesign-vue-next/pull/939))
- `Select`: 增加 `select` 的键盘选中交互 @pengYYYYY ([#979](https://github.com/Tencent/tdesign-vue-next/pull/979))
- `Pagination`: 增加`pageEllipsisMode API`, 用于配置页码数量超出时，首尾省略模式   @pengYYYYY ([#979](https://github.com/Tencent/tdesign-vue-next/pull/979))
- `Skeleton`: 增加 ` delay API` 用于延迟加载  @pengYYYYY ([#979](https://github.com/Tencent/tdesign-vue-next/pull/979))
- `TimePickerPanel` ：新增 `TimePickerPanel` 组件用于单独使用面板的场景, 新增 `disableTime`、`onFocus`、`onBlur`、`onInput` 等API  @uyarn ([#943](https://github.com/Tencent/tdesign-vue-next/pull/943))
- `Datepicker`: 增加 `allowInput api`, 新增 `DatePickerPanel` 与 `DateRangePickerPanel` 单独使用支持年份、月份区间选择 @HQ-Lin  ([#943](https://github.com/Tencent/tdesign-vue-next/pull/943))

### 🐞 Bug Fixes
- `DatePicker`:
  - `enable-time-picker` 状态下，`prefixIcon` 不起作用 @chiyu1996 ([#953](https://github.com/Tencent/tdesign-vue-next/pull/953))
  - 修复 `datepicker separator` 日期分隔符属性失效问题 @chiyu1996 ([#954](https://github.com/Tencent/tdesign-vue-next/pull/954))
- `Table`:
  - 合并单元格支持动态数据， @chaishi ([#969](https://github.com/Tencent/tdesign-vue-next/pull/969))
  - 修复 `Table` 透传 `loading size` 为枚举无效的问题 @uyarn ([#970](https://github.com/Tencent/tdesign-vue-next/pull/970))
- `Form`:
  - 修复调用实例方法 `reset` 添加参数无效 @k1nz ([#964](https://github.com/Tencent/tdesign-vue-next/pull/964))
  - 修复调用实例方法 `submit` 后 `onSubmit` 回调函数参数 `e` 为 `undefined` 的问题 @k1nz ([#964](https://github.com/Tencent/tdesign-vue-next/pull/964))
- `Slider`:
  - 修复 `inputNumberProps` 无法支持 `readonly`、`tips` 等 `api` 配置问题 @ChrisLee0211 ([#941](https://github.com/Tencent/tdesign-vue-next/pull/941))
  - 修复 `slider` 数字输入框初始化重复渲染问题 @ChrisLee0211 ([#982](https://github.com/Tencent/tdesign-vue-next/pull/982))
- `Popup`: 修复初始化 `visible` 为 `true` 时的定位抖动 @ikeq ([#932](https://github.com/Tencent/tdesign-vue-next/pull/932))
- `Select`: 修复透传 `inputProps` 参数无效 () @pengYYYYY ([#965](https://github.com/Tencent/tdesign-vue-next/pull/965))
- `Switch`:  修复 `slots.label` 参数无效 @webfansplz ([#978](https://github.com/Tencent/tdesign-vue-next/pull/978))
- `TreeSelect`: 优化过滤状态下的输入框交互，修复 `selectInput` 参数透传数据响应问题 @pengYYYYY ([#939](https://github.com/Tencent/tdesign-vue-next/pull/939))
- `Cascader`: 修复下拉面板宽度问题 @pengYYYYY ([#939](https://github.com/Tencent/tdesign-vue-next/pull/939))
- `CheckBox`: 修复二次封装多选框组件插槽定义选项失效   @pengYYYYY ([#979](https://github.com/Tencent/tdesign-vue-next/pull/979))
- `Upload`: 修复图片列表模式存在图片列表的情况下，拖拽图片会触发浏览器默认打开图片行为 @pengYYYYY ([#979](https://github.com/Tencent/tdesign-vue-next/pull/979))
## 🌈 0.15.4 `2022-06-01` 
### 🚀 Features
- `Tree`: 使用 `compositionAPI` 重构 `tree` 组件 @pengYYYYY ([#857](https://github.com/Tencent/tdesign-vue-next/pull/857))
- `Cascader`:
  - 增加属性透传  `selectInputProps`  @pengYYYYY ([#857](https://github.com/Tencent/tdesign-vue-next/pull/857))
  - 修复 `options` 异步获取无法选择任意级的选项  @pengYYYYY ([#910](https://github.com/Tencent/tdesign-vue-next/pull/910))
  - 修复无法透传属性 `popupProps`  @pengYYYYY ([#857](https://github.com/Tencent/tdesign-vue-next/pull/857))
-  `Site` 增加主题配置器 @uyarn ([#766](https://github.com/Tencent/tdesign-vue-next/pull/766))
### 🐞 Bug Fixes
- `Menu`:
  - 修复暗黑模式下 popup 样式问题 @LeeJim ([#916](https://github.com/Tencent/tdesign-vue-next/pull/916))
  - 修复箭头方向错误的问题 @LeeJim ([#916](https://github.com/Tencent/tdesign-vue-next/pull/916))
- `Steps`: 修复插槽渲染逻辑问题   @pengYYYYY ([#910](https://github.com/Tencent/tdesign-vue-next/pull/910))
- `Dropdown`: 修复通过插槽方式渲染点击事件 `data` 参数不正确   @pengYYYYY ([#910](https://github.com/Tencent/tdesign-vue-next/pull/910))
- `Radio`: 修复 `Group` 模式下 `allowUncheck` 显示错误   @pengYYYYY ([#910](https://github.com/Tencent/tdesign-vue-next/pull/910))
- `InputNumber`: 修复 `v-model` 值不为 `number` 类型时的报错，增加类型判断组件表现  @pengYYYYY ([#910](https://github.com/Tencent/tdesign-vue-next/pull/910))
- `Form`: 修复 `reset` 方法报错  @pengYYYYY ([#910](https://github.com/Tencent/tdesign-vue-next/pull/910))
- `Tree`: 修复存在keys属性时，严重闪烁  @pengYYYYY ([#857](https://github.com/Tencent/tdesign-vue-next/pull/857))
- `Transfer`: 修复当与tree结合的全选判断问题   @pengYYYYY ([#857](https://github.com/Tencent/tdesign-vue-next/pull/857))

## 🌈 0.15.3 `2022-05-30` 
### 🚀 Features
- `Table`: 
  - `appendTo` 支持添加新节点到根节点， @chaishi ([#896](https://github.com/Tencent/tdesign-vue-next/pull/896))
  - 新增 `getTreeNode`，用于获取整个树形结构， @chaishi ([#896](https://github.com/Tencent/tdesign-vue-next/pull/896))
  - 添加 `onDragSort` 事件到 EnhancedTable @chaishi ([#896](https://github.com/Tencent/tdesign-vue-next/pull/896))
- `InputNumber`: 透传 Input 组件全部特性 @jchalex ([#900](https://github.com/Tencent/tdesign-vue-next/pull/900))
### 🐞 Bug Fixes
- `transfer`: 修改 `v-model`，页面没有同步更新 ( ) @btea ([#890](https://github.com/Tencent/tdesign-vue-next/pull/890))
- `InputNumber`: 修复必填问题 @youuss ([#897](https://github.com/Tencent/tdesign-vue-next/pull/897))
- `Button`: 修复ref应用错误的问题 @btea ([#898](https://github.com/Tencent/tdesign-vue-next/pull/898))
- `Swiper`: 动态列表渲染问题 @btea ([#902](https://github.com/Tencent/tdesign-vue-next/pull/902))
- `Table`: 可编辑单元格，使用日期选择器时，切换月份也会导致退出编辑模式 @chaishi ([#901](https://github.com/Tencent/tdesign-vue-next/pull/901))
- `Form`: 修复 `form` 实例方法 `submit` 调用后的刷新问题  @pengYYYYY ([#899](https://github.com/Tencent/tdesign-vue-next/pull/899))


## 🌈 0.15.2 `2022-05-27` 
### 🐞 Bug Fixes
- `Form`:
  - 修复表单重置 `onReset` 不传会报错 ,  @pengYYYYY ([#861](https://github.com/Tencent/tdesign-vue-next/pull/861))
  - 修复实例方法 `reset` 参数不生效的问题 @k1nz ([#868](https://github.com/Tencent/tdesign-vue-next/pull/868))
  - `reset` 和 `submit` 现在会调用原生 `form` 中的方法 @k1nz ([#868](https://github.com/Tencent/tdesign-vue-next/pull/868))- `ColorPicker`:
  - 点击panel会关闭的问题 () @S-mohan ([#885](https://github.com/Tencent/tdesign-vue-next/pull/885))
  - 修复 `color-picker-panel` 使用 `v-model` 值没有正确更新 @pengYYYYY ([#843](https://github.com/Tencent/tdesign-vue-next/pull/843))
- `Select`: 修复 `option` 显示问题  @pengYYYYY ([#887](https://github.com/Tencent/tdesign-vue-next/pull/887))
- `Affix`: 兼容`<keep-alive/>`场景 @kerwin612 ([#870](https://github.com/Tencent/tdesign-vue-next/pull/870))
- `Upload`: 修复 `placeholder` 在 `image` 模式下不生效  @pengYYYYY ([#861](https://github.com/Tencent/tdesign-vue-next/pull/861))
- `Transfer`: 修复列表数量变化时的页码展示问题 @BigLiao ([#864](https://github.com/Tencent/tdesign-vue-next/pull/864))
- `Tabs`: 修复选项卡新增和删除在normal风格下无效 () @pengYYYYY ([#880](https://github.com/Tencent/tdesign-vue-next/pull/880))


## 🌈 0.15.1 `2022-05-23` 
### 🚀 Features
- `Table`: 支持可编辑单元格的表格 () @chaishi ([#846](https://github.com/Tencent/tdesign-vue-next/pull/846))
- `Select`: 新增事件 `onPopupVisibleChange` @chaishi ([#846](https://github.com/Tencent/tdesign-vue-next/pull/846))
- `Select`: 新增 `onChange` 事件参数，`trigger`，用于表示当次变化的触发来源 @chaishi ([#846](https://github.com/Tencent/tdesign-vue-next/pull/846))
### 🐞 Bug Fixes
- `Table`: `EnhancedTable`，树形结构中，可选中表格禁用行勾选问题：动态设置选中列时，禁用失效 () @chaishi ([#842](https://github.com/Tencent/tdesign-vue-next/pull/842))
- `Table`: `EnhancedTable`，树形结构中，`toggleExpandData` 和 `expandAll/FoldAll` 混合使用时，树形结构展开有误 () @chaishi ([#842](https://github.com/Tencent/tdesign-vue-next/pull/842))
- `Slider`: 修复slider部分tooltip属性设置无法生效问题 @ChrisLee0211 ([#844](https://github.com/Tencent/tdesign-vue-next/pull/844))
- `Input`: 清除操作触发了非必要事件 `onBlur`，移除  () @chaishi ([#846](https://github.com/Tencent/tdesign-vue-next/pull/846))
- `Drawer`: 修复按键 `ESC` 关闭无法触发  @pengYYYYY ([#840](https://github.com/Tencent/tdesign-vue-next/pull/840))
- `Select`: 修复使用 `creatable` 创建新条目时，会出现额外空选项   @pengYYYYY ([#840](https://github.com/Tencent/tdesign-vue-next/pull/840))
- `Select`: 修复 `showArrow` 属性设置为  `false`，右侧箭头依然显示  @pengYYYYY ([#840](https://github.com/Tencent/tdesign-vue-next/pull/840))
- `Progress`: 修复 `theme` 动态变化错误   @pengYYYYY ([#840](https://github.com/Tencent/tdesign-vue-next/pull/840))
- `Transfer`: 修复 `transfer` 选中态无法点击 @pengYYYYY ([#840](https://github.com/Tencent/tdesign-vue-next/pull/840))

## 🌈 0.15.0 `2022-05-20` 
### 🚨 Breaking Changes
- `Cascader`:  基于`select-input`组件重构，文本过长省略使用原生 `title` 展示全文本，不再使用 `tooltip` @pengYYYYY ([#585](https://github.com/Tencent/tdesign-vue-next/pull/585))
### 🚀 Features
- `Table`: 
  - 树形结构，支持默认展开全部，`tree.defaultExpandAll`， @chaishi ([#779](https://github.com/Tencent/tdesign-vue-next/pull/779))
  - 树形结构，支持自由控制展开全部，或收起全部 `expandAll()` `foldAll()` @chaishi ([#779](https://github.com/Tencent/tdesign-vue-next/pull/779))
  - 树形结构，支持拖拽排序，调整同层级顺序 @chaishi ([#779](https://github.com/Tencent/tdesign-vue-next/pull/779))
  - 树形结构，支持在当后节点之后插入新节点 `insertAfter` @chaishi ([#779](https://github.com/Tencent/tdesign-vue-next/pull/779))
- `Form`: 
  - 支持 `help` 配置的表单项说明内容与错误提示同时展示，未配置 `help` 时不再默认占位 @HQ-Lin ([#792](https://github.com/Tencent/tdesign-vue-next/pull/792))
  - 使用 `CompositionAPI` 重构 `Form` 组件  @k1nz ([#782](https://github.com/Tencent/tdesign-vue-next/pull/782))
- `Cascader`: 增加 `popupVisible`, `readonly`, `selectInputProps`, `onPopupVisibleChange` 属性，具体描述查看文档 @pengYYYYY ([#585](https://github.com/Tencent/tdesign-vue-next/pull/585))
- `nuxt`: 修复在 `nuxt3` 中的适配问题，可参考案例 [tdesign-vue-next-nuxt-starter](https://github.com/yixiaco/tdesign-vue-next-nuxt-starter) @yixiaco ([#726](https://github.com/Tencent/tdesign-vue-next/pull/726))
- `Tabs`: 添加拖拽功能 @GitHub-Mr-Chen ([#744](https://github.com/Tencent/tdesign-vue-next/pull/744))
- `Anchor`: 增加 demo 演示功能 @ontheroad1992 ([#804](https://github.com/Tencent/tdesign-vue-next/pull/804))

### 🐞 Bug Fixes
- `Form`:
  - 修复 `number` 规则校验不生效的问题  @k1nz ([#782](https://github.com/Tencent/tdesign-vue-next/pull/782))
  - 修复组件实例方法 `setValidateMessage` 缺失的问题  @k1nz ([#782](https://github.com/Tencent/tdesign-vue-next/pull/782))
  - 修复 `FormItem` 的 `showErrorMessage` 属性失效的问题  @k1nz ([#782](https://github.com/Tencent/tdesign-vue-next/pull/782))
  - 修复触发方式 `blur` 不生效的问题  @k1nz ([#782](https://github.com/Tencent/tdesign-vue-next/pull/782))
  - 修复传入的字段值为 `undefined` 的时候不会更新双向绑定值 , () @k1nz ([#782](https://github.com/Tencent/tdesign-vue-next/pull/782))
- `Table`:
  - 修复在ssr环境中的兼容 @pengYYYYY ([#723](https://github.com/Tencent/tdesign-vue-next/pull/723))
  - 拖拽排序，修复参数为 `undefined` 问题， @chaishi ([#779](https://github.com/Tencent/tdesign-vue-next/pull/779))
  - 使用 `header-affixed-top` 时，异步下不能动态更新列  @chaishi ([#779](https://github.com/Tencent/tdesign-vue-next/pull/779))
- `Popup`:
  - 增加`zIndex` api @ikeq ([#788](https://github.com/Tencent/tdesign-vue-next/pull/788))
  - 修复设置 `destroyOnClose` 后可能出现的异常抖动 @ikeq ([#788](https://github.com/Tencent/tdesign-vue-next/pull/788))- `Menu`: 修复 expanded 不受控的问题 @LeeJim ([#794](https://github.com/Tencent/tdesign-vue-next/pull/794))
- `Cascader`:
  - 修复第二级菜单点击后无法展示第三级菜单  @pengYYYYY ([#585](https://github.com/Tencent/tdesign-vue-next/pull/585))
  - 修复组件可以同时打开多个  @pengYYYYY ([#585](https://github.com/Tencent/tdesign-vue-next/pull/585))
  - 修复 `filterable` 不支持忽略大小写, 优化过滤状态交互  @pengYYYYY ([#585](https://github.com/Tencent/tdesign-vue-next/pull/585))
- `Menu`: 
  - 修复 `width` 不生效的问题 @LeeJim ([#807](https://github.com/Tencent/tdesign-vue-next/pull/807))
  - 修复暗色模式的 `Popup` @LeeJim ([#816](https://github.com/Tencent/tdesign-vue-next/pull/816))
  - 修复 `Popup` 无法正常展示的问题 @LeeJim ([#815](https://github.com/Tencent/tdesign-vue-next/pull/815))
  -  修复 `expand-type` 不生效的问题 @LeeJim ([#817](https://github.com/Tencent/tdesign-vue-next/pull/817))
- `Transfer`: 修复对 `pagination` 组件的引用报错 @pengYYYYY ([#723](https://github.com/Tencent/tdesign-vue-next/pull/723))
- `Swiper`: `slot` 执行位置不对，导致 `vue` 警告 @btea ([#783](https://github.com/Tencent/tdesign-vue-next/pull/783))
- `Steps`: 修复 `readonly` 不起作用的问题 @k1nz ([#756](https://github.com/Tencent/tdesign-vue-next/pull/756))
- `Slider`: 修复 `slider` 组件 `onChange` 事件 `init` 阶段被意外触发问题 @ChrisLee0211 ([#786](https://github.com/Tencent/tdesign-vue-next/pull/786))- `CheckboxGroup`: 修复响应式丢失的问题 @k1nz ([#793](https://github.com/Tencent/tdesign-vue-next/pull/793))
- `Transfer`: 异步赋值 `checked` 不生效 @btea ([#800](https://github.com/Tencent/tdesign-vue-next/pull/800))
- `Switch`: 修复 `disabled` 状态下仍然可以点击 @k1nz ([#782](https://github.com/Tencent/tdesign-vue-next/pull/782))
- `TreeSelect`: 修复 `placeholder` 传入无效 @k1nz ([#782](https://github.com/Tencent/tdesign-vue-next/pull/782))
- `ColorPicker`: 使用 `common` 中的常量, 删除无用的代码, 样式 `BEM`, 文档 `demo` 样式问题 @S-mohan ([#819](https://github.com/Tencent/tdesign-vue-next/pull/819))


## 🌈 0.14.2 `2022-05-14` 
### 🚀 Features
- `Table`:
  - 支持自定义树形结构图标 `treeExpandAndFoldIcon`，同时支持全局配置此图标， @chaishi ([#746](https://github.com/Tencent/tdesign-vue-next/pull/746))
  - 支持隐藏排序文本提示 `hideSortTips`，同时支持全局配置是否隐藏排序文本提示， @chaishi ([#746](https://github.com/Tencent/tdesign-vue-next/pull/746))
- `Notification`:
  - 使用项目中已有的js动画方案，替换先前的`transitionGroup`方案，完善了组件出现和回收动画效果。其中涉及到**common**子仓库的修改，删除之前transition相关的类名，添加了一个`&-list__showt`类名。 @qunbotop ([#731](https://github.com/Tencent/tdesign-vue-next/pull/731))
  - 增加`onMouseenter`和`onMouseleave`事件，保证鼠标移入移出组件时，`duration`时间的停止和重新计时。 @qunbotop ([#731](https://github.com/Tencent/tdesign-vue-next/pull/731))
- `Dropdown`: 使用 `compositionAPI` 重构 `dropdown` 组件 @qunbotop ([#749](https://github.com/Tencent/tdesign-vue-next/pull/749))
- `Popconfirm`: `visible` 属性支持 `v-model` 语法糖 @k1nz ([#710](https://github.com/Tencent/tdesign-vue-next/pull/710))
- `Swiper`: 增加新组件 swiper @btea ([#690](https://github.com/Tencent/tdesign-vue-next/pull/690))
- `Icon`: 更新图标 新增`file-icon`图标 调整`file-excel`、`file-pdf`、`file-powerpoint`、`file-unknown`、`file-word`和`star-filled`图标的绘制路径 @uyarn ([#732](https://github.com/Tencent/tdesign-vue-next/pull/732))
### 🐞 Bug Fixes
- `Form`: 
  - 修复当 `modelValue` 为外部传入的 `undefined` 时，双向绑定失效  @pengYYYYY ([#764](https://github.com/Tencent/tdesign-vue-next/pull/764))
  - 修复 `attrs` 注入异常  @pengYYYYY ([#764](https://github.com/Tencent/tdesign-vue-next/pull/764))
- `Table`: 
  - `renderExpandedRow`为非必填 @uyarn ([#724](https://github.com/Tencent/tdesign-vue-next/pull/724))
  - 修复 多级表头 + 列配置 综合示例中，列数量超出一定限制时报错， @chaishi ([#770](https://github.com/Tencent/tdesign-vue-next/pull/770))
- `InputNumber`: 修复 `input-number` 重构 `hook` 使用错误出现的问题 @youuss ([#719](https://github.com/Tencent/tdesign-vue-next/pull/719))
- `Tooltip`: support set placement by mouse @Hoofoo-WHU ([#718](https://github.com/Tencent/tdesign-vue-next/pull/718))
- `ConfigProvider`: 修复`animation`属性`exclude`和`include`在TS中都必填的问题 @uyarn ([#724](https://github.com/Tencent/tdesign-vue-next/pull/724))
- `ColorPicker`: - fix(ColorPicker): 遍历循环的时候无法监听change 事件会报错 () @S-mohan ([#738](https://github.com/Tencent/tdesign-vue-next/pull/738))
- `TimePicker`: `time-range-picker` 中 `suffix icon` 丢失问题 @uyarn ([#740](https://github.com/Tencent/tdesign-vue-next/pull/740))
- `Message`: 修复插件式调用时，用户传入`onCloseBtnClick`事件时，无法触发回调。 @qunbotop ([#731](https://github.com/Tencent/tdesign-vue-next/pull/731))
- `Notification`: 修复插件式调用时，用户传入`onCloseBtnClick` `onDurationEnd`事件时，无法触发回调。 @qunbotop ([#731](https://github.com/Tencent/tdesign-vue-next/pull/731))
- `Menu`: 修复 `expandMutex` 属性设置无效  @pengYYYYY ([#750](https://github.com/Tencent/tdesign-vue-next/pull/750))
- `Slider`: 修复 `toolTipProps` 属性设置无效, 拼写错误  @pengYYYYY ([#750](https://github.com/Tencent/tdesign-vue-next/pull/750))
- `Popconfirm`: 修复箭头与 `trigger` 属性 @pengYYYYY ([#750](https://github.com/Tencent/tdesign-vue-next/pull/750))
- `Dialog`: 修复初始化且为显示时的 `lock` 问题 @pengYYYYY ([#750](https://github.com/Tencent/tdesign-vue-next/pull/750))
- `Breadcrumb`: 修复弹出 `tooltip` 异常 @pengYYYYY ([#750](https://github.com/Tencent/tdesign-vue-next/pull/750))
- `Input`: 修复 `autowidth` 模式计算错误  @pengYYYYY ([#750](https://github.com/Tencent/tdesign-vue-next/pull/750))- `TimePicker`: 修复当modelValue为外部传入的undefined时，clearable失效  @pengYYYYY ([#764](https://github.com/Tencent/tdesign-vue-next/pull/764))
- `Steps`: 支持 `separator api` & 修复响应式问题 @HQ-Lin ([#759](https://github.com/Tencent/tdesign-vue-next/pull/759))
- `progress`: 环形进度条显示比例不准确 @uyarn ([#767](https://github.com/Tencent/tdesign-vue-next/pull/767))

## 🌈 0.14.1 `2022-05-06` 
### 🚀 Features
- `Table`: 新增 API `ellipsisTitle` 用于单独控制表头的超出省略 [@chaishi](https://github.com/chaishi) ([#694](https://github.com/Tencent/tdesign-vue-next/pull/694))
### 🐞 Bug Fixes
- `Loading`: 使用 `attach` 的情况下，`loading` 设置为 `false`，无法隐藏半透明蒙层， [@chaishi](https://github.com/chaishi) ([#694](https://github.com/Tencent/tdesign-vue-next/pull/694))
- `Table`:
  - 加载状态 `loading` 会导致拖拽排序失效的问题， [@chaishi](https://github.com/chaishi) ([#694](https://github.com/Tencent/tdesign-vue-next/pull/694))
  - TS 类型 `TableColumns[0]` 在严格模式下的使用问题 [@chaishi](https://github.com/chaishi) ([#694](https://github.com/Tencent/tdesign-vue-next/pull/694))
- `Menu`:
  - 使用 `t-submenu` `template #icon` 无效的问题 [@fengxianqi](https://github.com/fengxianqi) ([#643](https://github.com/Tencent/tdesign-vue-next/pull/643))
  - 修复 `expandMutex` 无法动态更新 [@pengYYYYY](https://github.com/pengYYYYY) ([#691](https://github.com/Tencent/tdesign-vue-next/pull/691))
- `Input`: 修复 `onChange` 触发两次 [@pengYYYYY](https://github.com/pengYYYYY) ([#691](https://github.com/Tencent/tdesign-vue-next/pull/691))
- `Tabs`: 修复 `add` 方法点击报错 [@pengYYYYY](https://github.com/pengYYYYY) ([#691](https://github.com/Tencent/tdesign-vue-next/pull/691))
- `Textarea`: 修复 `autofocus` 参数更新无法聚焦 [@pengYYYYY](https://github.com/pengYYYYY) ([#691](https://github.com/Tencent/tdesign-vue-next/pull/691))
- `Select`: 修复在结合 `option` 使用下的 `render` 告警 [@pengYYYYY](https://github.com/pengYYYYY) ([#691](https://github.com/Tencent/tdesign-vue-next/pull/691))
- `Slider`: 将 `marks` 属性更改为响应性属性，并内部修复marks刻度节点点击事件无效问题 [@ChrisLee0211](https://github.com/ChrisLee0211)  ([#683](https://github.com/Tencent/tdesign-vue-next/pull/683))
- `Dropdown`: 修复下拉菜单点击后报错 [@pengYYYYY](https://github.com/pengYYYYY) ([#691](https://github.com/Tencent/tdesign-vue-next/pull/691))


## 🌈 0.14.0 `2022-04-29`
### 🚨 Breaking Changes
- `Popup`: 去除 `reference` 包裹元素 [@ikeq](https://github.com/ikeq) ([#635](https://github.com/Tencent/tdesign-vue-next/pull/635))
### 🚀 Features
- `Pagination`: 新增 `showFirstAndLastPageBtn`、`showPreviousAndNextBtn` `API` [@HQ-Lin](https://github.com/HQ-Lin) ([#665](https://github.com/Tencent/tdesign-vue-next/pull/665))
- `Pagination`: 新增 `showPageSize`、`showPageNumber` `API` [@HQ-Lin](https://github.com/HQ-Lin) ([#666](https://github.com/Tencent/tdesign-vue-next/pull/666))
- `Calendar`: 日历组件修正 `value` 属性，新增了 `month` 和 `year` 属性 [@PsTiu](https://github.com/PsTiu) ([#676](https://github.com/Tencent/tdesign-vue-next/pull/676))
### 🐞 Bug Fixes
- `Dialog`: 修复 `alert` 类型错误 [@pengYYYYY](https://github.com/pengYYYYY) ([#645](https://github.com/Tencent/tdesign-vue-next/pull/645))
- `Form`: 修复 `help` 节点状态问题 [@HQ-Lin](https://github.com/HQ-Lin) ([#656](https://github.com/Tencent/tdesign-vue-next/pull/656))
- `Transfer`: 修复选择无效和搜索无效 [@pengYYYYY](https://github.com/pengYYYYY) ([#662](https://github.com/Tencent/tdesign-vue-next/pull/662))
- `DataPicker`: `data-picker` 增加 `apply` 事件 [@Godlike-meteor](https://github.com/Godlike-meteor) ([#647](https://github.com/Tencent/tdesign-vue-next/pull/647))
- `TreeSelect`: 修复右侧箭头状态与清除回掉 [@pengYYYYY](https://github.com/pengYYYYY) ([#679](https://github.com/Tencent/tdesign-vue-next/pull/679))
- `Input`: 
  - 修复 `suffix` 渲染问题 [@pengYYYYY](https://github.com/pengYYYYY) ([#679](https://github.com/Tencent/tdesign-vue-next/pull/679))
  - 修复 `input` 组件 `clearable` 问题 [@DYS1230](https://github.com/DYS1230) ([#673](https://github.com/Tencent/tdesign-vue-next/pull/673))



## 🌈 0.13.0 `2022-04-22`

### 🚨 Breaking Changes

* Table: 拖拽排序，`drag=sort` 表示列拖拽排序，`drag=row` 表示行拖拽排序，`drag=row-handler` 表示行手柄列拖拽排序。如果您使用了 `drag="col"` 来实现行拖拽排序，请更为使用 `drag="row-handler"`([pr #594](https://github.com/Tencent/tdesign-vue-next/pull/594)), ([@chaishi](https://github.com/chaishi))

### 🐞 Bug Fixes

* Drawer: 修复 `header` 属性无效问题 ()
* Textarea: 修复在设置自动高度后，赋值后不高度不改变的问题 () 
* DatePicker:  修复当传入值为非日期格式的情况页面卡死的问题 [@Godlike-meteor](https://github.com/Godlike-meteor) ([#624](https://github.com/Tencent/tdesign-vue-next/pull/624)) 
* Transfer: 修复设置 `targetSort` 后未按预期展示的问题
* TreeSelect: [@Godlike-meteor](https://github.com/Godlike-meteor)
  * 修复 `value` 渲染异常问题 ([#633](https://github.com/Tencent/tdesign-vue-next/pull/633))
  * 修复组件在多选时无 `v-model` 展示异常问题 ([#622](https://github.com/Tencent/tdesign-vue-next/pull/622)) 
* Upload:) ([#603](https://github.com/Tencent/tdesign-vue-next/pull/603)) [@pengYYYYY](https://github.com/pengYYYYY)
  * 修复上传失败状态流转问题 
  * 修复上传文件尺寸限制计算问题 
* Table: ([pr #594](https://github.com/Tencent/tdesign-vue-next/pull/594)), ([@chaishi](https://github.com/chaishi))
  * 多级表头和列配置功能混合使用时，表格宽度渲染不正确问题
  * 表头吸顶，不对齐问题
  * 列配置功能，按需引入 `Button` 组件。避免业务按需引入 `Table` 组件时，出现组件不存在错误
  * 无法使用插槽自定义过滤图标
  * 修复 `TdBaseTableProps` 和 `TdPrimaryTableProps` 关于 `onCellClick` 的 TS 类型冲突
  * 单选，报错 `e.stopPropagation is not a function`
  * 单选 和 多选触发了不应该触发的 'onChange' 事件

### 🚀  Features

* Table: ([pr #594](https://github.com/Tencent/tdesign-vue-next/pull/594)), ([@chaishi](https://github.com/chaishi))
  * 支持简易列拖拽排序
  * 树形结构，行展开或收起时，触发事件 `onTreeExpandChange`
* Checkbox: 使用 `compositionAPI` 重构 ([pr #584](https://github.com/Tencent/tdesign-vue-next/pull/584)), ([@k1nz](https://github.com/k1nz))
* Breadcrumb: 使用 `compositionAPI` 重构 ([pr #567](https://github.com/Tencent/tdesign-vue-next/pull/567)), ([@Blackn-L](https://github.com/Blackn-L))

## 🌈 0.12.2 `2022-04-19`

### 🐞 Bug Fixes

- `Transfer` 修复设置 targetSort 后未按预期展示的问题 [@BigLiao](https://github.com/BigLiao) ([#599](https://github.com/Tencent/tdesign-vue-next/pull/599))
- `Anchor`: 修复 click 事件参数不正确 [@pengYYYYY](https://github.com/pengYYYYY) ([#589](https://github.com/Tencent/tdesign-vue-next/pull/589))
- 修复 slider 引起的产物报错 [@pengYYYYY](https://github.com/pengYYYYY)

## 🌈 0.12.1 `2022-04-17`

### 🚀 Features

- `Card` 新增卡片组件 [@zhwachen](https://github.com/zhwachen) ([#530](https://github.com/Tencent/tdesign-vue-next/pull/530))
- `Form` 优化 样式 & 默认渲染 extra 节点 [@HQ-Lin](https://github.com/HQ-Lin) ([#572](https://github.com/Tencent/tdesign-vue-next/pull/572))

### 🐞 Bug Fixes

- `Calendar`修复日历组件 cell 和 cellAppend 插槽在 build 版本不生效的问题 [@PsTiu](https://github.com/PsTiu) ([#564](https://github.com/Tencent/tdesign-vue-next/pull/564))
- `Checkbox` 修复组件开发时，热更新导致的 provide & inject 失效 [@k1nz](https://github.com/k1nz) ([#561](https://github.com/Tencent/tdesign-vue-next/pull/561))
- `Collapse` 异步获取 panel 列表优化 [@asbstty](https://github.com/asbstty) ([#571](https://github.com/Tencent/tdesign-vue-next/pull/571))
- `Timepicker` 修复手动清空 value 的异常 [@uyarn](https://github.com/uyarn) ([#575](https://github.com/Tencent/tdesign-vue-next/pull/575))

### 🚧 Others

- `Transfer` 使用 `CompositionAPI` 重构 [@btea](https://github.com/btea) ([#496](https://github.com/Tencent/tdesign-vue-next/pull/496))

## 🌈 0.12.0 `2022-04-08`

### 🚨 Breaking Changes

- 重构 `Table` 为 `CompositionAPI` [@chaishi](https://github.com/chaishi) ([#468](https://github.com/Tencent/tdesign-vue-next/pull/468))
  - `BaseTable` `HTML` 结构变更，写过 `CSS` 样式覆盖的同学需注意更新样式。由之前的两个 `table` 分别渲染 `thead` 和 `tbody`，更为一个 `table`
  - 行拖拽排序功能，使用方法有调整，从 `sortOnRowDraggable` 更为 `dragSort='row'`
  - 表头更为使用 `th` 标签，之前为 `td`，不符合语义
  - 事件 `row-db-click` 更为 `row-dblclick` ，`onRowDbClick` 更为 `onRowDblclick`
  - 事件 `row-hover` 更为 `row-mouseover`, `onRowHover` 更为 `onRowMouseover`
  - `CSS` 类名 `t-table__row-first-full-row` 更为 `t-table__first-full-row`，`t-table__row-last-full-row` 更为 `t-table__last-full-row`
  - 移除属性 `minWidth`

### 🚀  Features

- 新增 `Collapse` 组件，使用 `CompositionAPI` [@asbstty](https://github.com/asbstty) ([#535](https://github.com/Tencent/tdesign-vue-next/pull/535))
- 新增 `Message` 的 `fadeIn` 和 `fadeOut` 动画 [@Zack921](https://github.com/Zack921) ([#546](https://github.com/Tencent/tdesign-vue-next/pull/546))
- 新增 `color-picker` 渐变预览，改进最近使用色交互 [@S-mohan](https://github.com/S-mohan) ([#545](https://github.com/Tencent/tdesign-vue-next/pull/545))
- 新增 `Table` 特性 [@chaishi](https://github.com/chaishi) ([#468](https://github.com/Tencent/tdesign-vue-next/pull/468))
  - 排序交互变更：排序方式支持点击直接排序 issue#480
  - 优化表格最后一列 `ellipsis` 浮层位置底部右对齐
  - 新增超出省略功能， `ellipsis` 支持透传 Popup 组件全部属性
  - 新增表尾合计行，支持固定在底部，支持多行合计，支持完全自定义内容 issue#116
  - 新增 `loadingProps` 透传加载组件全部特性
  - 新增固定行（冻结行）
  - 新增排序图标自定义，插槽(`slot='filterIcon'`)和渲染函数(`props.filterIcon`) 均可
  - 新增全局配置：过滤图标、空元素、异步加载文本配置、排序按钮文本配置
  - 新增 `scroll` 滚动事件
  - 新增表头吸顶功能，issue#216
  - 新增综合功能：多级表头 + 固定表头 + 固定列 + 表头吸顶 + 虚拟滚动 + 自定义列配置
  - 过滤功能，条件为真时，高亮筛选图标
  - 新增列拖拽排序功能，通过拖拽手柄调整表格排序

### 🐞  Bug Fixes

- 修复 `configProvider` 警告 和 `globalConfig` 数据响应式问题 [@pengYYYYY](https://github.com/pengYYYYY) ([#543](https://github.com/Tencent/tdesign-vue-next/pull/543))
- 修复 `Input` `type=password` 时 `autocomplete` 警告以及 `toggle password` 问题 [@pengYYYYY](https://github.com/pengYYYYY) ([#543](https://github.com/Tencent/tdesign-vue-next/pull/543)) ([#559](https://github.com/Tencent/tdesign-vue-next/pull/559))
- 修复 `Checkbox` `Group` 插槽形式 `disabled` 属性没有生效 [@pengYYYYY](https://github.com/pengYYYYY) ([#543](https://github.com/Tencent/tdesign-vue-next/pull/543))
- 修复 `Upload` 中 `triggerUpload` 方法未正确导出 和 自定义拖拽上传demo中“点击上传”按钮无效  [@k1nz](https://github.com/k1nz) ([#533](https://github.com/Tencent/tdesign-vue-next/pull/533))
- 修复 `Slider` `inputNumberProps` 未正常透传 [@delbertbeta](https://github.com/delbertbeta) ([#547](https://github.com/Tencent/tdesign-vue-next/pull/547))
- 修复 `Affix` `onFixedChange` 触发时机，在固定状态发生变化时才会触发该事件（改动之前为：滚动一直触发）
- 修复 `Table` 的 若干 `Bug` [@chaishi](https://github.com/chaishi) ([#468](https://github.com/Tencent/tdesign-vue-next/pull/468))

## 🌈 0.11.2 `2022-04-02`

### 🚀  Features

- 重构 `TreeSelect` 为 `CompositionApi` [@Godlike-meteor](https://github.com/Godlike-meteor) [(#508)](https://github.com/Tencent/tdesign-vue-next/pull/508)
- 重构 日历组件 为 `CompositionApi` [@PsTiu](https://github.com/PsTiu) [(#472)](https://github.com/Tencent/tdesign-vue-next/pull/472)
- 国际化配置迁移至 `common`，相关代码优化 [@pengYYYYY](https://github.com/pengYYYYY) [(#492)](https://github.com/Tencent/tdesign-vue-next/pull/492)

### 🐞  Bug Fixes

- 重构 `Tabs` 为 `CompositionApi` [@LeeJim](https://github.com/LeeJim) (#490)
- 修复 `Upload` `triggerupload` 方法未导出 [@pengYYYYY](https://github.com/pengYYYYY) [(#515)](https://github.com/Tencent/tdesign-vue-next/pull/515)
- 修复 `InputNumber` 未注册 `input` 组件 [@pengYYYYY](https://github.com/pengYYYYY) [(#514)](https://github.com/Tencent/tdesign-vue-next/pull/514)
- 修复 `CheckboxGroup` `disabled` 属性无效 [@pengYYYYY](https://github.com/pengYYYYY) [(#514)](https://github.com/Tencent/tdesign-vue-next/pull/514)
- 修复 `Input` 的 `type` 传入无效 [@pengYYYYY](https://github.com/pengYYYYY) [(#516)](https://github.com/Tencent/tdesign-vue-next/pull/516)
- 修复 `SelectInput` 示例代码样式 [@pengYYYYY](https://github.com/pengYYYYY) [(#500)](https://github.com/Tencent/tdesign-vue-next/pull/500) 
- 修复 `Pagination` 跳转页输入框展示了额外 `placeholder` 默认内容 [@xiaosansiji](https://github.com/xiaosansiji) [(#507)](https://github.com/Tencent/tdesign-vue-next/pull/507)


## 🌈 0.11.0 `2022-03-25`

### 🚨 Breaking Changes

* Input: 外部传入 `class` 挂载至 `t-input__wrap`, 不再挂载到 `t-input` ([pr #476](https://github.com/Tencent/tdesign-vue-next/pull/476)), ([@pengYYYYY](https://github.com/pengYYYYY))
* textarea: 去除 `t-textarea__wrap` 层 ([pr #476](https://github.com/Tencent/tdesign-vue-next/pull/476)), ([@pengYYYYY](https://github.com/pengYYYYY))

### 🐞 Bug Fixes

* Dialog: 修复 `dialog` 组件点击警告 ([pr #463](https://github.com/Tencent/tdesign-vue-next/pull/444)), 
* Steps: 修复 `readonly` 状态下依然可以点击 ([pr #465](https://github.com/Tencent/tdesign-vue-next/pull/465)
* Cascader:
  * 修复动态改 `options` 为空数组不生效 ([pr #486](https://github.com/Tencent/tdesign-vue-next/pull/486))
  * 修复可过滤状态下的下拉面板拉起闪烁  ([pr #483](https://github.com/Tencent/tdesign-vue-next/pull/444)), 
  * 修复可过滤状态下的输入内容未被正常销毁  ([pr #483](https://github.com/Tencent/tdesign-vue-next/pull/444)), 
* TimePicker:
  * 修复此刻快捷标签文案配置 ([pr #483](https://github.com/Tencent/tdesign-vue-next/pull/483))
  * `focused` 态样式修复 ([pr #476](https://github.com/Tencent/tdesign-vue-next/pull/476))
* DatePicker: `focused` 态样式修复 ([pr #476](https://github.com/Tencent/tdesign-vue-next/pull/476))
* Select: 修复 `popup` 属性透传问题 ([pr #483](https://github.com/Tencent/tdesign-vue-next/pull/483))
* Upload: 修复 `method props` 失效 ([pr #476](https://github.com/Tencent/tdesign-vue-next/pull/476))
* SelectInput: ([pr #476](https://github.com/Tencent/tdesign-vue-next/pull/476))
  * 修复在非输入状态下无 `focused` 态
  * 修复在非输入状态下不能显示清除按钮
  * 修复在 `single` 模式下 `inputValue` 的受控表现
* Form: 修复空表单时候的 `reduce` 语法错误 ([pr #475](https://github.com/Tencent/tdesign-vue-next/pull/475))
* Steps: 修复 `readonly` 状态下依然可以点击 ([pr #476](https://github.com/Tencent/tdesign-vue-next/pull/465))
* Progress: `theme` 为 `plump` 且 `percentage` 为 `10` 没有展示文案 ([pr #476](https://github.com/Tencent/tdesign-vue-next/pull/467)), ([@uyarn](https://github.com/uyarn))

### 🚀  Features

* ColorPicker:  新增 `ColorPicker` 颜色选择器组件, 请参照[官网](https://tdesign.tencent.com/vue-next/components/color-picker)使用,  ([pr #330](https://github.com/Tencent/tdesign-vue-next/pull/408)), ([@S-mohan](https://github.com/S-mohan))
* Input: 增加 `inputClass`, 挂载 `class` 到 `t-input` ([pr #476](https://github.com/Tencent/tdesign-vue-next/pull/476)), ([@pengYYYYY](https://github.com/pengYYYYY))
* Checkbox: 使用 `compositionAPI` 重构 ([pr #476](https://github.com/Tencent/tdesign-vue-next/pull/476)), ([@whylost](https://github.com/whylost))

## 🌈 0.10.2 `2022-03-18`

### 🐞 Bug Fixes

* TimePicker: `close`、`open` 事件回调增加参数 ([pr #455](https://github.com/Tencent/tdesign-vue-next/pull/455)), ([@uyarn](https://github.com/uyarn))
* DatePicker: 打开时间面板重置时间 ([pr #453](https://github.com/Tencent/tdesign-vue-next/pull/453)), ([@uyarn](https://github.com/uyarn))
* Table: 修复 `table-cell` 点击告警。([pr #447](https://github.com/Tencent/tdesign-vue-next/pull/447)), ([@pengYYYYY](https://github.com/pengYYYYY))
* Pagination: 修复分页组件 `pageSize` 默认值不正确导致的受控问题。([pr #444](https://github.com/Tencent/tdesign-vue-next/pull/444)), , , ([@pengYYYYY](https://github.com/pengYYYYY))
* UseRipple: 修复 `useRipple` 的告警 ([pr #439](https://github.com/Tencent/tdesign-vue-next/pull/439)), , ([@pengYYYYY](https://github.com/pengYYYYY))
* Menu:
  * 当菜单项超出时，正常展示 `Popup` ([pr #438](https://github.com/Tencent/tdesign-vue-next/pull/427)), ,([@LeeJim](https://github.com/LeeJim))
  * 修复在没 `overflow` 时，仍出现滚动条的问题 ([pr #315](https://github.com/Tencent/tdesign-common/pull/315)), ([@LeeJim](https://github.com/LeeJim))
* InputNumber: 修复 `decimal` 计算错误 ([pr #433](https://github.com/Tencent/tdesign-vue-next/pull/433)), ([@uyarn](https://github.com/uyarn))
* Notification: 使用 `transition-group` 优化完善 `notification` 回收时的动画效果 ([pr #429](https://github.com/Tencent/tdesign-vue-next/pull/429)), ([@qunbotop](https://github.com/qunbotop))
* Upload:([pr #427](https://github.com/Tencent/tdesign-vue-next/pull/427)), ([@pengYYYYY](https://github.com/pengYYYYY))
  * 修复不可上传时的点击状态。
  * 修复 `onCancelUpload` 事件无效
* Input:
  * 修复组件 `keypress` 事件未触发 ([pr #433](https://github.com/Tencent/tdesign-vue-next/pull/433)), ([@uyarn](https://github.com/uyarn))
  * 修复在 `readonly` 模式下的聚焦样式([pr #437](https://github.com/Tencent/tdesign-vue-next/pull/437)), ([@pengYYYYY](https://github.com/pengYYYYY))
* TagInput: ([pr #437](https://github.com/Tencent/tdesign-vue-next/pull/437)), ([@pengYYYYY](https://github.com/pengYYYYY))
  * 修复 `breakline` 模式下的 `clearIcon` 样式重叠
  * 修复 `autowidth` 模式下的 `padding` 不对称
  * 修复超出滚动失效

### 🚀  Features

* Switch: 使用 `compositionAPI` 重构 ([pr #434](https://github.com/Tencent/tdesign-vue-next/pull/434)), ([@zouhangwithsweet](https://github.com/zouhangwithsweet))
* Notification: 使用 `compositionAPI` 重构 ([pr #429](https://github.com/Tencent/tdesign-vue-next/pull/429)), ([@qunbotop](https://github.com/qunbotop))
* Textarea: 使用 `compositionAPI` 重构 ([pr #432](https://github.com/Tencent/tdesign-vue-next/pull/432)), ([@btea](https://github.com/btea))
* Select: 支持单选 `valueDisplay` 插槽 ([pr #449](https://github.com/Tencent/tdesign-vue-next/pull/449)), ([@pengYYYYY](https://github.com/pengYYYYY))
* Popup: 新增 `enter、leave` 事件，支持鼠标进入、移出的事件 ([pr #438](https://github.com/Tencent/tdesign-vue-next/pull/427)), ([@LeeJim](https://github.com/LeeJim))
* Input: 新增 `autoWidth、align、tips` 的支持，统一 `InputNumber` 中的 `Input` 使用 `Input` 组件减少重复实现 ([pr #433](https://github.com/Tencent/tdesign-vue-next/pull/433)), ([@uyarn](https://github.com/uyarn))
* Upload: ([pr #427](https://github.com/Tencent/tdesign-vue-next/pull/427)), ([@pengYYYYY](https://github.com/pengYYYYY))
  * 使用 `CompositionAPI` 重构 `upload` 组件。
  * 增加合并上传
  * 支持国际化配置

## 🌈 0.10.1 `2022-03-14`


### 🐞 Bug Fixes

* TreeSelect: 修复边框样式异常和右侧图标样式异常


## 🌈 0.10.0 `2022-03-11`

### 🚨 Breaking Changes

* Input: `DOM` 结构调整，最外层调整为 `t-input__wrap`([pr #409](https://github.com/Tencent/tdesign-vue-next/pull/409)), ([@pengYYYYY](https://github.com/pengYYYYY))

### 🐞 Bug Fixes

* Select:
  * 修复单选下斜八度动画覆盖文字的错误 ([pr #421](https://github.com/Tencent/tdesign-vue-next/pull/421)), ([@uyarn](https://github.com/uyarn))
  * 修复 `filterable` 属性导致高度变化 ([pr #430](https://github.com/Tencent/tdesign-vue-next/pull/430)), , ([@pengYYYYY](https://github.com/pengYYYYY))
  * 修复事件与双向绑定数据更新时机不一致问题 ([pr #421](https://github.com/Tencent/tdesign-vue-next/pull/421)), ([@uyarn](https://github.com/uyarn))
* cascader: ([pr #422](https://github.com/Tencent/tdesign-vue-next/pull/422)), ([@pengYYYYY](https://github.com/pengYYYYY))
  * 修复 `filterable` 属性导致 `hover` 样式异常的问题
  * 修复可选任意一级缺少高亮状  ([issue #114](https://github.com/Tencent/tdesign-vue-next/issue/114))
* DatePicker: 修复按需引入时，按钮展示问题 ([pr #425](https://github.com/Tencent/tdesign-vue-next/pull/425)), , ([@BuptStEve](https://github.com/BuptStEve))
* Tree: 修复数据无法更新问题 ([pr #406](https://github.com/Tencent/tdesign-vue-next/pull/406)), ([@pengYYYYY](https://github.com/pengYYYYY))

### 🚀  Features

* Badge: 使用 `compositionAPI` 重构组件 ([pr #402](https://github.com/Tencent/tdesign-vue-next/pull/402)), ([issue #58](https://github.com/Tencent/tdesign-vue-next/pull/58)), ([@ChrisLee0211](https://github.com/ChrisLee0211 ))

## 🌈 0.9.4 `2022-03-04`

### 🐞 Bug Fixes

* 修复在 `typescript` 严格模式下打包出错  


## 🌈 0.9.3 `2022-03-04`


### 🐞 Bug Fixes

* DatePicker: ([pr #389](https://github.com/Tencent/tdesign-vue-next/pull/376)), ([@xiaosansiji](https://github.com/xiaosansiji))
  * 修复 `onPick` 事件配置无效
  * 修复无法清除面板中已选值
  * 修复点击年份或月份后，日期弹窗意外消失
* TagInput: ([pr #387](https://github.com/Tencent/tdesign-vue-next/pull/387))
  * 修复在有输入的值且无 `tag` 的情况下，不展示清除按钮。且点击后 `onClear` 方法未触发。
  * 修复在 `auto-width` 模式下的交互问题
* Dialog:
  * 修复 `dialog plugin` 聚焦 `button` 通过键盘频繁触发 ([pr #395](https://github.com/Tencent/tdesign-vue-next/pull/395)), 
  * 修复 `closeBtn` 为 `false` 的时候依然可以点击关闭区域关闭弹窗 ([pr #392](https://github.com/Tencent/tdesign-vue-next/pull/392)), 
* Table: 修复按需引用时，直接引用 `Table` 报错： ([pr #388](https://github.com/Tencent/tdesign-vue-next/pull/388)), 
* Select: 修复自定义创建 `option` 交互异常 ([pr #397](https://github.com/Tencent/tdesign-vue-next/pull/397)), 
* Form: 修复表单 `submit` 事件中的 `firstError` 不正确 ([pr #397](https://github.com/Tencent/tdesign-vue-next/pull/382)), 
* Cascader: 优化类名判断相关代码导致的性能问题 ([pr #397](https://github.com/Tencent/tdesign-vue-next/pull/382))
* Input: 修复 `onChange` 和 `on-change`事件 未生效 ([pr #395](https://github.com/Tencent/tdesign-vue-next/pull/395)), 
* InputNumber: 修复在增加小数点位数的状态下，v-model绑定的value与展示的值不同 ([pr #392](https://github.com/Tencent/tdesign-vue-next/pull/392)), 
* Breadcrumb: 修复 `disabled` 无效 ([pr #391](https://github.com/Tencent/tdesign-vue-next/pull/391)), 
* Checkbox：修复 `value` 重复时，导致渲染 `key` 相同的报错 ([pr #387](https://github.com/Tencent/tdesign-vue-next/pull/387)),

### 🚀  Features

* SelectInput:  新增 `SelectInput` 筛选器组件, 请参照[官网](https://tdesign.tencent.com/vue-next/components/select-input)使用,  (), ([@chaishi](https://github.com/chaishi))
* Input: 增加 `format` 属性  ()
* 全局配置: 支持关闭斜八度波纹动画  (), , ([@uyarn](https://github.com/uyarn))

## 🌈 0.9.2 `2022-02-26`

### 🐞 Bug Fixes

* SelectInput: 修复 `src/select-input/interface.d.ts` 文件被 `tsc` 编译忽略导致的组件 `import interface` 错误


## 🌈 0.9.1 `2022-02-25`

### 🐞 Bug Fixes

* 修复构建产物 `typescript` 声明文件路径错误

## 🌈 0.9.0 `2022-02-25`


### 🚨 Breaking Changes

* Input: `input` 元素 `ref` 名称由 `refInputElem` 更为 `inputRef` ([pr #330](https://github.com/Tencent/tdesign-vue-next/pull/330)), ([@chaishi](https://github.com/chaishi))

### 🐞 Bug Fixes

* Slider: ([@pengYYYYY](https://github.com/pengYYYYY))
  * 修复游标定位错乱 ([pr #248](https://github.com/Tencent/tdesign-common/pull/248))
  * 修复 `marks` 属性不支持 `array` 数据结构([pr #355](https://github.com/Tencent/tdesign-vue-next/pull/355))
* Input: 去除 `autocomplete` 默认值，保持浏览器默认值 ([pr #330](https://github.com/Tencent/tdesign-vue-next/pull/330)), ([@chaishi](https://github.com/chaishi))
* Upload: 修复文件数大于等于 `max` 时，上传按钮依然可以点击 (), , ([@pengYYYYY](https://github.com/pengYYYYY))
* Notification: 修复 `offset` 参数无效 ([pr #351](https://github.com/Tencent/tdesign-vue-next/pull/349)), , ([@pengYYYYY](https://github.com/pengYYYYY))
* Table: 修复固定表头错位 ([pr #352](https://github.com/Tencent/tdesign-vue-next/pull/352)), , , , ([@pengYYYYY](https://github.com/pengYYYYY))
* Button: 修复 `primary outline` 模式下边框展示异常的问题 ([pr #238](https://github.com/Tencent/tdesign-common/pull/238)), ([@pengYYYYY](https://github.com/pengYYYYY))

### 🚀  Features

* TagInput: ([pr #330](https://github.com/Tencent/tdesign-vue-next/pull/330)), ([@chaishi](https://github.com/chaishi))
  * `valueDisplay` 新增参数 `onClose`
  * 新增特性 `autoWidth`, 宽度自适应
* Input: 新增特性 `autoWidth`, 宽度自适应 ([pr #330](https://github.com/Tencent/tdesign-vue-next/pull/330)), ([@chaishi](https://github.com/chaishi))
* Checkbox: `change` 事件新增参数，`context.current` 表示当前变化的数据项；`context.type` 表示引起选中数据变化的是选中或是取消选中 ([pr #330](https://github.com/Tencent/tdesign-vue-next/pull/330)), ([@chaishi](https://github.com/chaishi))
* 通用方法 `renderTNodeJSX` 同时支持驼峰命名的插槽，和中划线命名的插槽 ([pr #330](https://github.com/Tencent/tdesign-vue-next/pull/330)), ([@chaishi](https://github.com/chaishi))
* 使用 `compositionAPi` 重构国际化 `mixin` ([pr #356](https://github.com/Tencent/tdesign-vue-next/pull/356)), ([@yc910920](https://github.com/yc910920))

## 🌈 0.8.1 `2022-02-18`


### 🐞 Bug Fixes

* Form: ([pr #277](https://github.com/Tencent/tdesign-vue-next/pull/277))
  * 修复 `FormItem.statusIcon` 优先级没有大于 `Form.statusIcon` 的问题
  * 修复 `FormItem.rules` 优先级没有大于 `Form.rules` 的问题
* Progress: 修复环状进度条小于 5% 时渲染错误 ([pr #329](https://github.com/Tencent/tdesign-vue-next/pull/329)), ([@uyarn](https://github.com/uyarn))
* TimePicker: 修复部分鼠标滚动选择出现偏差 ([pr #324](https://github.com/Tencent/tdesign-vue-next/pull/324)), ([@uyarn](https://github.com/uyarn))
* Input: 修复 `prefixIcon`, `suffixIcon` 对驼峰写法不支持 ([pr #318](https://github.com/Tencent/tdesign-vue-next/pull/318))
* Cascader 解决 `value` 类型为 `Number` 时，数据回填异常及 `clearable` 失效问题 ([ccf478b](https://github.com/Tencent/tdesign-vue-next/commit/ccf478be940daf95ea64667be96ccd27637f283a))
* Textarea: 修复 `value` 未定义时字数统计展示异常的问题 ([pr #298](https://github.com/Tencent/tdesign-vue-next/pull/298)), 
* Loading: 修复存在 `attach` 时，当 `loading` 设置为 `false`，无法隐藏加载元素 ([pr #315](https://github.com/Tencent/tdesign-vue-next/pull/315))
* Dialog: 修复展开动画位置 ([pr #312](https://github.com/Tencent/tdesign-vue-next/pull/312))


### 🚀  Features

* Form: ([pr #277](https://github.com/Tencent/tdesign-vue-next/pull/277))
  * 支持对象和数组嵌套的复杂数据校验，同时可以判断是数组的第几项校验不通过，
  * 支持统一配置校验信息，无需每个字段的每个规则都单独配置 `message`
  * 支持表单 `disabled`
* Popup: ([pr #313](https://github.com/Tencent/tdesign-vue/pull/313)), ([@uyarn](https://github.com/uyarn))
  * 支持嵌套使用
  * 去除额外 `reference` 包裹元素
  * 弹窗展开动画优化
  * `overlayStyle` 类型为 Function 时，增加 `popupElement` 作为第二个参数，表示浮层元素 DOM 节点
  * 新增 `onScroll` 属性，响应下拉选项滚动事件
* TreeSelect: 增加 `t-select-warper` `class` ([pr #277](https://github.com/Tencent/tdesign-vue-next/pull/277))

## 🌈 0.8.0 `2022-01-28`

### 🚨 Breaking Changes

* Tag: `variant` 可选值修改为 `dark/light/outline/light-outline`, `plain` 已废弃 ([pr #274](https://github.com/Tencent/tdesign-vue-next/pull/274)), ([@pengYYYYY](https://github.com/pengYYYYY))

### 🐞 Bug Fixes

* Alert: 修复未正常展示关闭按钮 ([e8bd6ba](https://github.com/Tencent/tdesign-vue-next/commit/e8bd6ba50ce164f7976d9c28b04137c1ef5a0e05))
* Calendar: ([@PsTiu](https://github.com/PsTiu))
  * 修复日历组件 `monthChange` 事件在年只通过月份下拉框触发的问题 ([1b4e3a2](https://github.com/Tencent/tdesign-vue-next/commit/1b4e3a286f31ab979ddce19674afa9eb92996c46))
  * 修复日历控制区按钮 `hover` 样式 ([pr #169](https://github.com/Tencent/tdesign-common/pull/169))
  * 修复全局配置 `calendar.controllerConfig` 不生效的问题 ([72c1771](https://github.com/Tencent/tdesign-vue-next/commit/72c17717d6f783ed7324f2a4e56d446dda0980eb))
* InputNumber: 修复双向绑定设置成 `undefined` 实现清空, 下次激活输入框自动恢复上次的值 ([961a8a5](https://github.com/Tencent/tdesign-vue-next/commit/961a8a540276c42e14b066c2413183f93cdd068f))
* Select: 修复可过滤状态下, 需要双击背景才可关闭下拉框 ([31f0258](https://github.com/Tencent/tdesign-vue-next/commit/31f0258ac67caf14dc7bb2610972f06307ccee96))
* TreeSelect:
  * 修复可过滤状态下, 需要双击背景才可关闭下拉框 ([31f0258](https://github.com/Tencent/tdesign-vue-next/commit/31f0258ac67caf14dc7bb2610972f06307ccee96))
  * 修复在空状态时不显示 `placeholder`([8a44df9](https://github.com/Tencent/tdesign-vue-next/commit/8a44df9940a5705b103dfa543dd7b5f58065abee)), ()
* Content: 修复 `Content` 内容无法响应式 ([7ebd287](https://github.com/Tencent/tdesign-vue-next/commit/7ebd28747f0cb3975b205ada5828e961b62b1d66)), (), ()
* Slider: 修复双向绑定值失效 ([c554129](https://github.com/Tencent/tdesign-vue-next/commit/c5541293d9c7258208c7240018fff964faa1a760)), (), ([@backrunner](https://github.com/backrunner))
* Table: 修复表头单元格合并显示异常 ([a121a0d](https://github.com/Tencent/tdesign-vue-next/commit/a121a0de2b5f28702b515d49e58a7cb467263be0))
* Tabs: 修复 `remove` 事件警告 ([2beac1c](https://github.com/Tencent/tdesign-vue-next/commit/2beac1ceefe16bf55e2babed4b4e9bcf488f3094)), ()
* Tag: 修复`click` 事件参数错误 ([e6ade96](https://github.com/Tencent/tdesign-vue-next/commit/e6ade96d0a607a57b41a13fc15694117871a9242))
* Breadcrumb: 修复面包屑 `item disabled` 状态样式, ([pr #190](https://github.com/Tencent/tdesign-common/pull/190)), ( [@samhou1988](https://github.com/samhou1988))
* Input: 修复输入框相关样式重复引入的问题 ([pr #182](https://github.com/Tencent/tdesign-common/pull/182)), ([@xiaosansiji](https://github.com/xiaosansiji))
* Select/Input/InputNumber/Switch: 背景色、边框样式等与设计不一致的, 统一修复 ([pr #194](https://github.com/Tencent/tdesign-common/pull/194)), ( [@uyarn](https://github.com/uyarn))

### 🚀  Features

* InputNumber: 增加 `align` 属性 ([961a8a5](https://github.com/Tencent/tdesign-vue-next/commit/961a8a540276c42e14b066c2413183f93cdd068f))
* Button: 统一各类型按钮边框宽度 ([pr #176](https://github.com/Tencent/tdesign-common/pull/176)), ([@BigLiao](https://github.com/BigLiao))

## 🌈 0.7.0 `2022-01-21`

### 🚨 Breaking Changes

* FormRule 的 `min` 和 `len` 根据一个中文等于两个字符的计算规则进行, 和 `max` 保持一致；`min` 和 `len` 在值为 Number 时, 进行数字大小的校验而非数字长度校验 ([pr #220](https://github.com/Tencent/tdesign-vue/pull/220)), ([@pengYYYYY](https://github.com/pengYYYYY))

### 🐞 Bug Fixes

* Select: 修复下拉面板在远程搜索时的渲染出错 , ([pr #237](https://github.com/Tencent/tdesign-vue-next/pull/237)), ([@pengYYYYY](https://github.com/pengYYYYY))
* Icon: 修复 ssr 渲染问题 ([pr #228](https://github.com/Tencent/tdesign-vue/pull/228)), ([@uyarn](https://github.com/uyarn))
* 修复 `umd` 产物中未包括 `reset` 及 `css variables` 声明的问题 ([pr #236](https://github.com/Tencent/tdesign-vue-next/pull/236)), ([@xiaosansiji](https://github.com/xiaosansiji))

### 🚀  Features

* Skeleton: 新增 `Skeleton` 骨架屏组件, 请参照[官网](https://tdesign.tencent.com/vue-next/components/skeleton)使用, ([pr #214](https://github.com/Tencent/tdesign-vue/pull/214)), ([@pengYYYYY](https://github.com/pengYYYYY))
* TagInput: 新增 `TagInput` 组件, 请参照[官网](https://tdesign.tencent.com/vue-next/components/skeleton)使用, ([pr #131](https://github.com/Tencent/tdesign-vue-next/pull/131)), ([@chaishi](https://github.com/chaishi))
* Select: 新增 `panelTopContent`, `panelBottomContent` 插槽 ([pr #221](https://github.com/Tencent/tdesign-vue-next/pull/221)), ([@pengYYYYY](https://github.com/pengYYYYY)), 
* Textarea: 新增属性 `status` 用于控制状态, `tips` 用于控制信息提示 ([pr 246](https://github.com/Tencent/tdesign-vue-next/pull/246)), ([@chaishi](https://github.com/chaishi))
* Table:
  * 新增懒加载、虚拟滚动特性 ([pr #155](https://github.com/Tencent/tdesign-vue-next/pull/155)), ([@Louiszhai](https://github.com/Louiszhai))
  * 新增 `onCellClick` 事件 ([pr #247](https://github.com/Tencent/tdesign-vue-next/pull/247)), ([@pengYYYYY](https://github.com/pengYYYYY))

## 🌈 0.6.4 `2022-01-16`

### 🐞 Bug Fixes

* Cascader: 修复 `input` 宽度处理和过滤状态下的输入框样式 ([3f054b7](https://github.com/Tencent/tdesign-vue-next/commit/3f054b7ade7cf062f2f39a0d31b6457abb66ebd2))
* Dropdown: 修复 `popupProps` 的 `overlayClass` 属性透传 ([98e83ce](https://github.com/Tencent/tdesign-vue-next/commit/98e83ce2323ab8cf578fff41f1b645bae785dea4))
* Swiper: 修复循环渲染无效 ([a1dc97d](https://github.com/Tencent/tdesign-vue-next/commit/a1dc97d8bdf5420552549a5ecde8f30941290062)), ()
* Tabs: 修复 `change` 事件触发两次 ([1a6cbb2](https://github.com/Tencent/tdesign-vue-next/commit/1a6cbb20f94fda106fdd05c88f0436cb6420392d))
* Menu: 修复菜单事件触发两次 ([f8b234c](https://github.com/Tencent/tdesign-vue-next/pull/206/commits/f8b234c441d0741fce0b5b1bcac6e14b597235ff))
* Icon: 修复修改 `name` 无法重新渲染 ([7708a56](https://github.com/Tencent/tdesign-vue-next/pull/178/commits/7708a560ed8dd9e934588188c95d9dfb2bedef2a)), (), ()
* Dialog: 修复 `closeOnEscKeydown` 事件 ([72f5bcb](https://github.com/Tencent/tdesign-vue-next/pull/207/commits/72f5bcbe2173186f61481218b9e009c777e3448c)), ([@vnues](https://github.com/vnues))
* Drawer: 修复 `closeOnEscKeydown` 事件 ([433de96](https://github.com/Tencent/tdesign-vue-next/pull/207/commits/433de96d5ec7e72efe882375b81a1f9ca8a6b520)), ([@vnues](https://github.com/vnues))
* Datepicker: 修复周起始为月最后一天时, 周显示错误 ([pr 117](https://github.com/Tencent/tdesign-vue-next/pull/196)), ([@xiaosansiji](https://github.com/xiaosansiji))
* Select: 修复禁用状态下下拉 `icon` 展示样式, ([pr 113](https://github.com/Tencent/tdesign-common/pull/113)), ([@pengYYYYY](https://github.com/pengYYYYY))
* Tab: ([@vnues](https://github.com/vnues)), (), ()
  * 修复关闭全部选项卡时, 无选项卡 ([e3608b3](https://github.com/Tencent/tdesign-vue-next/pull/148/commits/e3608b39d05c1e105a5b3eb48ffb8b13921d2d09))
  * 修复可滑动的选项卡中 点击左右切换会需要先点击选项卡才能点击切换 ([a8bd20a](https://github.com/Tencent/tdesign-vue-next/pull/148/commits/a8bd20a59c9b5b7f56ecfc5eb3b18b2298b738af))
* Calendar: ([fde826e](https://github.com/Tencent/tdesign-vue-next/pull/163/commits/fde826ed62e17fd3e275824c8fa3c10a7e75afff)), ([@PsTiu](https://github.com/PsTiu))
  * 修复单元格三个点击事件无效
  * 修复 `controllerChange` 返回值不正确
  * 修复点击了“隐藏周末”后切换为年模式会展示不出单元格
* Table:
  * 修复过滤功能不显示空数据元素 ([e52c4d8](https://github.com/Tencent/tdesign-vue-next/commit/e52c4d842107cd9a0d05f3c5e260f4879a6b042e))
  * 修复行拖不生效与拖拽动画 ([8673e87](https://github.com/Tencent/tdesign-vue-next/commit/8673e875f3b83971097401b2bfead11a4f5bb668))
  * 修复固定表头与内容没有对齐 ([0a161e8](https://github.com/Tencent/tdesign-vue-next/commit/0a161e8e27cec2024ecdbff4bd03d78664735c8f))
  * 修复异步拉取数据 `maxHeight` 不生效 ([367c0dc](https://github.com/Tencent/tdesign-vue-next/commit/367c0dcdd4f54fc7a86c4b4f59104569e9372002))
  * 修复固定表头没有对齐 ([bbea4de](https://github.com/Tencent/tdesign-vue-next/commit/bbea4de85000651d29035ffb8cc3ca8db841b0d7))

### 🚀  Features

* Calendar: 增加 `monthChange` 事件 ([fde826e](https://github.com/Tencent/tdesign-vue-next/commit/fde826ed62e17fd3e275824c8fa3c10a7e75afff)), ([@PsTiu](https://github.com/PsTiu))
* Avatar: 使用 `compositionApi` 重构组件逻辑 ([1547cb9](https://github.com/Tencent/tdesign-vue-next/pull/160/commits/1547cb90b6103841280f7ead98f0ae69763c9eb6)), ([@vnues](https://github.com/vnues))
* Alert: ([@simpleAndElegant](https://github.com/simpleAndElegant))
  * 增加展开动画 ([76ee15f](https://github.com/Tencent/tdesign-vue-next/pull/159/commits/76ee15f338dfce59e3ad31fab2b332c256c5484d))
  * 使用 `compositionApi` 重构组件逻辑 ([4aec957](https://github.com/Tencent/tdesign-vue-next/pull/159/commits/76ee15f338dfce59e3ad31fab2b332c256c5484d))

## 🌈 0.6.3 `2022-01-06`

### 🐞 Bug Fixes

* Menu:
  * 修复 `menu-item` 在不使用 `icon` 插槽的时候, 在左侧收回的时候多了一个数字 ([f801349](https://github.com/Tencent/tdesign-vue-next/commit/f80134917b20ce6400b013743628299c40db2f65)),  (), ([@LeeJim](https://github.com/LeeJim))
  * 修复三级菜单无缩进效果([f6e6142](https://github.com/Tencent/tdesign-vue-next/commit/f6e6142ccf6eea353926c5743138cd7992aa5fff)), (), ([@simpleAndElegant](https://github.com/simpleAndElegant))
  * 修复禁用菜单未禁用点击 ([45db957](https://github.com/Tencent/tdesign-vue-next/commit/45db9574dc76590a1ce27e3aafdd3a040a844a7f)), (), ([@simpleAndElegant](https://github.com/simpleAndElegant))
  * 修复双层导航显示错误 ([99749ed](https://github.com/Tencent/tdesign-vue-next/commit/99749ed4b0eaa57ccfef05a9fa920f36ba313f03)), ()
  * 修复 `change` 事件两次触发 ([0b65c7a](https://github.com/Tencent/tdesign-vue-next/commit/0b65c7a1852a3e03084a86226d82c7f8d5a70925))
* Popup:
  * 修复 `mousedown` 事件无效 ([a1d3303](https://github.com/Tencent/tdesign-vue-next/commit/a1d330327b27288c362bfb5d6cb4953c764426a6))
  * 修复 `destroy on close` 事件无效 ([fde46e7](https://github.com/Tencent/tdesign-vue-next/commit/fde46e73c7c439101663c2c5591ed08ab9aca854))
* Input:
  * 修复 `size` 属性无效 ([db155b3](https://github.com/Tencent/tdesign-vue-next/commit/db155b30fb009374308b2376d4a7dd7bf64338e8)), ()
  * 修复点击清除 `icon` 后无法 `focus` ([2c34e05](https://github.com/Tencent/tdesign-vue-next/commit/2c34e05cf183985ffd734e8bf14d77cbd07a041e))
* Drawer:
  * 修复当抽屉打开时, `body` 有滚动条时可以滚动 ([8b94878](https://github.com/Tencent/tdesign-vue-next/commit/8b9487825d338a78f9e027d7e5fa64b1a7f1bf7b)), ([@caoML](https://github.com/caoML))
  * 修复上方抽屉无动画效果, 并且显示卡顿 ([52a4f37](https://github.com/Tencent/tdesign-vue-next/commit/8b9487825d338a78f9e027d7e5fa64b1a7f1bf7b)), ()
* Table:
  * 修复 `mouseenter` 和 `mouseleave` 事件无效 ([52b6ac0](https://github.com/Tencent/tdesign-vue-next/commit/52b6ac0a67bb8dab59edf4da5a689679ab5d9c92))
  * 修复合并表格下的列宽度无效与错乱 ([02898ac](https://github.com/Tencent/tdesign-vue-next/commit/02898ac8deb67ee054e3aa7cc80ca733efb5019a))
* Textarea:
  * 修复私有类名传入无效 ([e9ad3c4](https://github.com/Tencent/tdesign-vue-next/commit/e9ad3c4003c830e8589ac41e5af3b42f4f71e305))
  * 修复在空状态下的加载无效 ([797f8a7](https://github.com/Tencent/tdesign-vue-next/commit/797f8a7076f3bb209a41ab8c1fbbdc8ed8023b8b))
* Dropdown: 修复使用 `slot` 时点击无法关闭 ([e6f7cd1](https://github.com/Tencent/tdesign-common/pull/60/commits/52a4f37af5beb21d0bfe5e7291e6a03db1863b2f))
* DatePicker: 修复 `date-picker` 样式问题和选择面板无法点击 ([06994ab](https://github.com/Tencent/tdesign-vue-next/commit/06994ab48b213f55606ed51bc87265f421011166)), ()
* TreeSelect: 修复 `collapsedItem` 渲染异常 ([7539d67](https://github.com/Tencent/tdesign-vue-next/commit/7539d675ee2075d878693367a97945c2fe5d5ea7)), ()
* Breadcrumb: 修复点击后触发两次 ([abe1c1b](https://github.com/Tencent/tdesign-vue-next/commit/abe1c1bf4e1c1f549029e2c5c1dc3f57aa41b15d))
* Calendar: 修复月份与年份组件参数对象使用错误 ([a3284d5](https://github.com/Tencent/tdesign-vue-next/commit/a3284d5efd1c619ac90799d301071415d7628955)), (), ([@Dreamcreative](https://github.com/Dreamcreative))
* Pagination: 使用`InputNumber` 组件替代 `input`, 并内置跳转页码控制 ([86a2d09](https://github.com/Tencent/tdesign-vue-next/commit/86a2d09d0649b655b8ce9b8611f84bfc60a64b4a))
* Select: 修复点击清空后的触发下拉菜单展开 ([7340f8d](https://github.com/Tencent/tdesign-vue-next/commit/7340f8df87ef20ce44a34ee9c9e102192abd4262)) 
* Steps: 修复 `slot` 无法渲染 ([e841050](https://github.com/Tencent/tdesign-vue-next/commit/e84105013267ea4292c6b42c74d287f062294bfd)), ([@vnues](https://github.com/vnues))
* Tabs: 修复循环创建下的结点渲染错误 ([07d79b6](https://github.com/Tencent/tdesign-vue-next/commit/07d79b6db603e16f63870cae15b2721b7d3ffc29))
* Upload: 修复上传文件后出现两个删除按钮 ([4296ebd](https://github.com/Tencent/tdesign-vue-next/commit/4296ebd908b6a615c8d9307d849c471906a205f9)), ()

### 🚀  Features

* Cascader:
  * 增加 `value-type` ([f7aaba2](https://github.com/Tencent/tdesign-vue-next/commit/f7aaba26804610fb9c9daec69e7b58003bf311b6))
  * 选择器宽度调整为继承外部宽度 ([41d4434](https://github.com/Tencent/tdesign-vue-next/commit/41d4434ef9cc1a75453b2fc477c11f363b2d55f2))
* Input:
  * 增加左侧、右侧文本 ([db155b3](https://github.com/Tencent/tdesign-vue-next/commit/db155b30fb009374308b2376d4a7dd7bf64338e8)), ([@mokywu](https://github.com/mokywu))
  * 增加 `placeholder` 全局配置  ([d727836](https://github.com/Tencent/tdesign-vue-next/commit/d72783641f4724cd16823ff5afe6de8f27933a9a))
* Steps: 增加 `readonly` 配置 ([d1ba7aa](https://github.com/Tencent/tdesign-vue-next/commit/d1ba7aa0aeb26fb69f57a1e2d41535249a3cad8b))
* Radio: 支持 `allowUnCheck` ([fa3acbf](https://github.com/Tencent/tdesign-vue-next/commit/fa3acbf199d818fe95d9b4493e641da47ebe2de5))
* Slider: 优化 `popup` 显示行为 ([076afde](https://github.com/Tencent/tdesign-vue-next/commit/076afded5e81ab6c09600dc2e0eb97ee05a68860)), (), ([@vnues](https://github.com/vnues))

## 🌈 0.6.0 `2021-12-22`

### 🚨 Breaking Changes

* `0.5.0` 升级至 `0.6.0` 版本 CSS BEM 规范改动列表 ()

### 🐞 Bug Fixes

* Slider: 清除在 `inputNumber` 不展示的情况时的冗余外部 `dom` ([4c14567](https://github.com/Tencent/tdesign-vue-next/commit/31c0c0461507d75e8ff12b6a774d1195e4678dd6))
* DatePicker
  * 修复区间选择在多个 `panel` 渲染异常 ([31c0c04](https://github.com/Tencent/tdesign-vue-next/commit/31c0c0461507d75e8ff12b6a774d1195e4678dd6))
  * 修复区间选择选择年月时点击无效 ([31c0c04](https://github.com/Tencent/tdesign-vue-next/commit/31c0c0461507d75e8ff12b6a774d1195e4678dd6))
* Input: 修复无 `placeholder` 默认值问题 ([1ff9ea0](https://github.com/Tencent/tdesign-vue-next/commit/1ff9ea0e59ee64eb8214355272d8caf3242e1068))
* Loading 修复 `loadingPlugin` 隐藏报错 ([6922d97](https://github.com/Tencent/tdesign-vue-next/commit/6922d97647af431a755479f16951d8db6be8b38c))
* Pagination:
  * 增加跳转输入框输入边界判断 ([b0787ce](https://github.com/Tencent/tdesign-vue-next/commit/b0787ce0258aff1aacda3b7549400eff225c70f2))
  * 参数受控修复([3e41844](https://github.com/Tencent/tdesign-vue-next/pull/12/commits/3e418447bea5166ef1f458c333129c7b72602153))
* Table: 修复 `enhancedTable` 安装类型报错 ([98e564b](https://github.com/Tencent/tdesign-vue-next/commit/98e564be6f3f414ffa5ab89768223799a73b2f89))
* TreeSelect:
  * 修复在 `collapsedItems` 模式下的选项数量渲染错误 ()([86a2d09](https://github.com/Tencent/tdesign-vue-next/pull/42/commits/86a2d09d0649b655b8ce9b8611f84bfc60a64b4a))
  * 修复点击关闭触发了下拉框 ([3324aae](https://github.com/Tencent/tdesign-vue-next/commit/3324aaeb232eb31a7c41b1bf6adb4feb93c51442))
* Pagination: 可跳转的分页组件中使用 `input-number` 组件替换 `input`([86a2d09](https://github.com/Tencent/tdesign-vue-next/pull/42/commits/86a2d09d0649b655b8ce9b8611f84bfc60a64b4a))
* Textarea: 修复 `v-model` 无效, 处理滚动条样式 ([3c3c915](https://github.com/Tencent/tdesign-vue-next/pull/14/commits/3c3c9153f02cd60788c40802b6b35799012b417a))
* Drawer: 修复事件点击无效无效 () ([3c3c915](https://github.com/Tencent/tdesign-vue-next/pull/14/commits/3c3c9153f02cd60788c40802b6b35799012b417a))
* TimePicker: 修复在 `HH:mm:ss format` 下渲染报错
* Radio: 修复边界条件下的滚动 `bug` ([#860adfc](https://github.com/Tencent/tdesign-vue-next/pull/12/commits/860adfc8d59f7ceaa4d55eeee7e6ab1922c0e71e))
* Chore: 替换组件名称变量, 支持 `webstorm` 代码提示。([#cdc2582](https://github.com/Tencent/tdesign-vue-next/pull/7/commits/cdc2582325b332d29d2e96c58c4ae0646c5a0a02))

### 🚀  Features

* Checkbox: 新增 `checkbox` 插槽使用 ([fe3171b](https://github.com/Tencent/tdesign-vue-next/commit/fe3171b306a66c43ab25c3c7b38c8ad124571c10))
* Table: 新增 `expandedRow` 插槽使用  ([fe3171b](https://github.com/Tencent/tdesign-vue-next/commit/fe3171b306a66c43ab25c3c7b38c8ad124571c10))
* Select: 增加键盘事件([#39](https://github.com/Tencent/tdesign-vue-next/pull/12/commits/18bb03240d6d7556c4e5d8e568f9d7fbf9a0cdc8))([18bb032](https://github.com/Tencent/tdesign-vue-next/pull/12/commits/18bb03240d6d7556c4e5d8e568f9d7fbf9a0cdc8))
* Upload: 提取公共 `XHR` ([#82d1b0b](https://github.com/Tencent/tdesign-vue-next/pull/12/commits/82d1b0bd757d55d6723ae04b8649610cfa60b66b))
* DatePicker: 支持 `prefixIcon` 和 `suffixIcon` 插槽 ([#1d534c6](https://github.com/Tencent/tdesign-vue-next/pull/11/commits/1d534c6f29cdb8fc565858909e02b239a0f4887e))

## 🌈 0.5.0 `2021-12-08`

### 🚨 Breaking Changes

* 从 0.5.0 版本开始, 将只在外网 `npm registry` 上发布, 请安装外网包 [tdesign-vue-next](https://www.npmjs.com/package/tdesign-vue-next)
* LocalProvider 配置多语言方案已废弃, 请升级为 ConfigProvider。
* Icon:
  * 独立为 `npm` 包 `tdesign-icons-vue-next`, 项目中有直接使用 `Icon` 请升级后安装此npm包。
  * 新增 `CaretLeftSmallIcon` 等23个Icon, 移除 `ResourceListIcon`。 [@uyarn](https://github.com/uyarn)

### 🐞 Bug Fixes

* Slider: 修复 `inputNumber` 逻辑, 优化 `Dom` 展示处理。
* Dialog: 修复 `DialogPlugin` 非 `methods` 问题。
* Menu:
  * 修复暗黑模式下菜单分组标题颜色使用错误的问题。
  * 修复滚动条展示样式。
* Table: 修复 `expand icon` 旋转角度。
* Cascader:
  * 修复 `filter` 文字高亮处理只处理第一个颜色的问题。
  * 修复 `empty` 展示宽度过短的问题。
  * 修复 `collapsedItems` 只实现了 `render function` 未实现插槽。

### 🚀  Features

* Upload:
  * 自动上传模式删除非必要上传按钮。
  * 输入框模式新增删除按钮。
* Textarea: 支持 `maxcharacter` 用于字符文本长度控制。
* Checkbox: 全选功能支持插槽写法。
* Cascader: 支持 `loading` 状态。
* DatePicker: 支持 `firstDayOfWeek` API。

## 🌈 0.4.4 `2021-11-29`

### 🐞 Bug Fixes

* Select: 修复直传 `options` 时 `filterable` 模式下有问题。
* Steps: 修复 `layout` 问题。
* Radio: 修复 `radio-group value` 不存在渲染问题。
* Popup: 修复在嵌套使用时问题。
* DialogPlugin:
  * 修复 `DialogPlugin` 为不可执行方法问题
  * 修复插件方式使用时 `ClassName` 透传覆盖。
* MessagePlugin: 修复 `MessagePlugin` 为不可执行方法问题。
* NotificationPlugin: 修复 `NotificationPlugin` 为不可执行方法问题。

### 🚀  Features

* Steps: 组件部分逻辑重构, `direction` 即将在下个版本废弃, 请改用 `layout` API, 可选项类型不变。
* Tree: 支持 `disableCheck` 方法。
* Menu: 支持子菜单 `disabled` 配置
* Cascader: `checkStrictly=true` 时, 点击选项, 级联选择器不会收起；`collapsedItems` 支持 `function/slot` 自定义配置用法, 
* Upload:
  * 补充上传失败判定条件, `formatResponse` 返回值 `error` 为真, 则表示上传失败
  * `progress` 事件参数新增 `type: 'real' | 'mock'`, 分别表示真实进度和模拟进度
  * 如果接口和 `formatResponse` 都没有返回 `url`, 组件会默认填充一个图片预览地址
  * `progress` 事件返回的进度不会超过 100
  * 上传成功后执行 `formatResponse`

## 🌈 0.4.3 `2021-11-22`

### 🐞 Bug Fixes

* Input：修复小键盘无法触发 `enter` 事件问题。
* List: 修复 `API` 变动但 `props` 未变动的问题。
* Loading：修复在 `safari` 的表现异常问题。
* Select: 修复 `value` 参数校验问题。
* Menu:
  * 部导航下拉菜单与双层导航激活样式效果丢失。
  * 收起侧边导航, 展开收起子菜单, `expanded` 不同步。
  * 动态获取的菜单内容选中后, 父级菜单没有 `t-is-active`。
* Grid: 优化 `gutter` 逻辑, 传入 `number` 类型不指定纵向间隔。
* Table:
  * 修复 `rowClassName` 支持 `string`。
  * 修复 `selected-row-keys` 外部传值无效问题。
* TimePicker:
  * 调整 `step` 的逻辑 改为首位都为 `0`, 处理。
  * `clear` 事件处理冒泡。

### 🚀  Features

* Avatar: 新增 `avatar` 组件。
* Calendar：新增属性 `fillWithZero`, `ConfigProvider` 新增配置项 `fillWithZero`。

## 🌈 0.4.2 `2021-11-15`

### 🐞 Bug Fixes

* DatePicker: 修复 `footer` 样式。
* Tabs: `destroyOnHide` 逻辑修复。
* Popconfirm: 修复在 `0.4.1` 版本无法使用的问题。
* Upload:
  * 模拟进度触发进度条更新事件。
  * 修复不可用状态下的样式问题。
* TreeSelect: 修复 `v-model` 绑定的 `bug`。
* Popup: 修复 `popup arrow` 定位不跟随 `content` 内容问题。

### 🚀  Features

* Form:
  * 增加 `successBorder API`, 控制是否显示校验成功的边框。
  * 增加 `requiredMark API`, 是否显示必填符号.
* Table: 新增 `tree` 属性, 支持在表格中展示树形结构。
  * `tree.indent` 控制树结点缩进距离, 单位：`px`, 默认为 `24px`。
  * `tree.treeNodeColumnIndex` 控制树结点在第几列渲染, 默认为 `0` , 第一列。
  * `tree.childrenKey` 控制树形结构子节点字段, 默认为 `children`。
  * `tree.checkStrictly` 控制树形结构的行选中（多选）, 父子行选中是否独立, 默认独立, 值为 `true`
  * `selectChange` 事件回调参数新增 `type`, 用以区分操作类型
* TreeSelect: 新增 `collapsedItems API` 的参数。
* Select: 新增 `collapsedItems API` 的参数。

## 🌈 0.4.1 `2021-11-06`

### 🐞 Bug Fixes

* DatePicker:
  * 修复 `v-model` 使用场景下 `value` 未同步的问题。
  * 修复 `placeholder` 属性传入数组类型报错的问题。
* Table:
  * 修复 `size=small` 时展开按钮被隐藏的问题;内容超 `maxHeight` 时固定表头。
  * 修复固定列样式。
  * 修复 `expandIcon` 关闭后无法展开。
* Tag:修复 `icon api` 无法使用 `slot` 的问题。
* Tabs:修复生产环境和测试环境表现不一致。
* Popup:修复组件更新时定位的问题。
* TS: 修复 `TNode` `类型定义, MessagePlugin` 类型定义。

### 🚀  Features

* Table:
  * 增加 `expandIcon` 插槽。
  * 增加表格过滤自定义。
* 全局配置: 增加 `drawer` 和 `dialog` 的全局配置。

## 🌈 0.4.0 `2021-10-29`

### 🚨 Breaking Changes

* Button: `shape` 默认值由 `square` 调整为 `rectangle`, 支持正方形按钮展示, 手动设置 `shape = square` 的小伙伴请删除设置, 没有设置过 `shape` 属性的可以忽略。

### 🐞 Bug Fixes

* Dropdown: 修复 `item` 为函数时的渲染错误。
* Cascader：修复 `defaultValue` 监听变化的问题, 只消费一次。
* Tag: 修复 `icon svg` 引用错误, 后续 `icon` 会迁移到独立包。
* Calender：修复组件事件抛出问题。
* Pagination：修复无法隐藏分页大小控制器。
* DatePicker: 修复时间日期区间选择时选择时间问题。
* InputNumber：修复 `descrease` 样式问题。
* Upload: 修复图片预览 `icon` 无法点击。

### 🚀  Features

* Form: 优化 `FormItem` 提示文案展示效果。
* Textarea: 透传外层属性。

## 🌈 0.3.5 `2021-10-25`

### 🐞 Bug Fixes

* Breadcrumb: 修复 `Router` 注册后, `to` 属性无法跳转到正确页面。
* Tab: 修复点击删除 `tab` 按钮报错。
* ToolTip: 修复显示异常。

### 🚀  Features

* 新增 `Comment` 组件。
* Select: 增加 `collapsedItems` && `minCollapsedNum` `API`。
* Cascader: 增加 `collapsedItems` && `minCollapsedNum` `API`。
* TreeSelect: 增加 `collapsedItems` && `minCollapsedNum` `API`。

## 🌈 0.3.4 `2021-10-14`

### 🐞 Bug Fixes

* Steps 修复:
  * 带 `icon` 步骤条未显示 `icon`。
  * 修复组件中的 `current` 属性值。
* Pagination: 修复 `change` 事件边界触发问题。
* Form: `0.3.3` 版本 `rules` 校验规则失效。
* Transfer: 处理 `disable` 选项可选的问题 && 处理重复 `key` 的 `warning`。

### 🚀  Features

* 增加 `cascader` 组件的 `load` 属性, `filterable` 属性。

## 🌈 0.3.3 `2021-09-29`

### 🐞 Bug Fixes

* Upload 修复
  * 组件 `method prop` 不生效 && 优化 `dragger` 组件的 `slot` 性能告警。
  * 修复 `format-response` 回掉函数不生效。
* Pagination: 修复组件事件不符合预期的问题 。
* Table: 修复在表头是多级表头的情况下排序不生效。
* Tree: 修复删除节点报错。
* Tooltip: 修复 `slot` 用法下, `class` 属性未能正常响应变化的问题。
* Dropdown: 修复 `overlayClassName` 属性设置无效的问题。
* 修复 `package.json`的 `peerDependencies` 锁定版本问题。
* Select: 修复受控用法下取消勾选状态同步的问题。

### 🚀  Features

* 优化打包流程 & 支持按需引入组件 & 支持自定义主题配置。
* 新增 `Slider` 组件。
* Menu: 支持超过两级的菜单展示。
* 选中行增加类名 `t-table-row--selected`。
* `Upload` 新特性:
  * 新增取消上传事件 `cancel-upload`。
  * 新增自定义上传方法 `requestMethod`。
  * 新增 `showUploadProgress` 属性, 用于表示「是否显示上传进度」。
  * 新增 `sizeLimit` 属性, 表示文件大小限制, 支持 `1000` 和 `{ size: 3, unit: 'MB', message: '文件过大' }` 等方式, 支持单位有 'B' | 'KB' | 'MB' | 'GB'。
* `FormItem` 支持 `labelWidth、labelAlign` & 调整 `labelWidth` 默认值为 `100px`。

## 🌈 0.3.2 `2021-09-22`

### 🐞 Bug Fixes

* DatePicker: 组件增加日期范围的起始结束判断, 修复相关样式。
* Table: 修复组件事件触发逻辑。
* Pagination: 修复组件分页组件在页数小于等于 `1` 的时候不展示问题。
* 修复 `Affix` 与 `Anchor` 结合无法定位到对应 `tab` 。

### 🚀  Features

* Anchor: 增加自定义游标。

## 🌈 0.3.1 `2021-09-17`

### 🚨 Breaking Changes

* Transfer: 组件重构, API,修改了 `keysType` 的定义。
* List: 组件 `asyncLoading` 缺陷修复 & `avatar` 重命名为 `image`。

### 🐞 Bug Fixes

* Select: 修复关闭按钮失效。
* List: 修复 `asyncLoading`逻辑缺陷。
* Pagination: 修复受控属性问题。
* Table: 修复加载状态, 修复异步加载, 修复分页数据绑定问题, 修复组件告警。

### 🚀  Features

* Upload: 新增 `Upload` 组件。
* DatePicker:新增 `DatePicker` 组件。
* Tree: 重构 `Tree` 组件, 同步特性与 `API`。
* Transfer: 重构 `Transfer` 组件, 同步特性与 `API`。
* Input: 实现 `autofocus` 属性。
* Tooltip: 添加 `visible-change` 事件。
* Dialog: 插槽支持透传 `style` 和 `className` 。
* Table: 增加拖拽排序, 增加固定列动态变化。

## 🌈 0.2.0 `2021-09-10`

### 🚨 Breaking Changes

* Radio Button: 调整组件样式 & 支持 `variant api` & `buttonStyle api` 已废弃。
* Form: 同步组件特性, 回调函数从 `result` 修改至 `validateResult`。

### 🐞 Bug Fixes

* Checkbox: 修复`class` 不透传问题。
* Drawer: 修复组件 `header=false` 和 `closeBtn=false` 不生效问题。

### 🚀  Features

* Dropdown: 新增 `Dropdown` 组件。

## 🌈 0.1.18 `2021-09-08`

### 🐞 Bug Fixes

* Select: 修复组件无边框场景下尺寸异常。
* 修复 `cascader common` 引用路径问题。
* Popup: 修复展开动画向上延展问题。

### 🚀  Features

* Swiper: 新增 `Swiper` 组件。

## 🌈 0.1.16 `2021-09-03`

### 🐞 Bug Fixes

* 修复 `package.json` 中 `typings` 文件路径

### 🚀  Features

* TimePicker: 新增 `TimePicker` 组件。
* TreeSelect: 新增 `TreeSelect` 组件。
* Cascader: 新增 `Cascader` 组件。
* 切换 `eslint` 规则集到 `eslint-config-airbnb-base`。
* Select: 改进 `show` 规则, 提高多 `options` 下的 `dom` 性能。

## 0.1.14 `2021-09-01`

### 🐞 Bug Fixes

* `TypeScript` 修复引用路径问题。

## 🌈 0.1.13 `2021-08-31`

### 🐞 Bug Fixes

* MenuItem:  修复组件 `to` 属性无法跳转问题。
* Select:  修复 `close icon` 点击后冒泡问题。

### 🚀  Features

* Popup: 增加下拉动效特性。
* ToolTip: 重构组件, `UI` 与 `API` 特性同步。
* Gride:  重构组件, `UI` 与 `API` 特性同步。
* Pagination:  重构组件, `UI` 与 `API` 特性同步。
* InputNumber:  重构组件, `UI` 与 `API` 特性同步。

## 🌈 0.1.12 `2021-08-27`

### 🐞 Bug Fixes

* Select: 重构组件, `UI` 与 `API` 特性同步。
* Dialog: 重构组件, `UI` 与 `API` 特性同步。
* CheckBox: 修复 `Checked` 参数校验问题。
* Tag：`UI` 样式修复。

### 🚀  Features

* Affix: 新增 `Affix` 组件。
* Anchor: 新增 `Anchor` 组件。
* Button: 新增斜八度点击动画。
* Tree: 新增斜八度点击动画。
* Select: 新增斜八度点击动画。
* 子仓库 `common` 迁移到 `_common`。

## 🌈 0.1.11 `2021-08-20`

### 🐞 Bug Fixes

* 修复导致vite无法热更新的问题

### 🚀  Features

* 仓库开发环境及站点从 `webpack` 迁移至 `vite`。
* Loading: 重构组件, `UI` 与 `API` 特性同步。
* Tabs: 重构组件, `UI` 与 `API` 特性同步。
* Steps: 重构组件, `UI` 与 `API` 特性同步。
* Breadcrumb: 重构组件, `UI` 与 `API` 特性同步。
* Menu: 重构组件, `UI` 与 `API` 特性同步。

## 🌈 0.1.10 `2021-08-13`

### 🐞 Bug Fixes

* 修复 `TypeScript` 引用路径问题, 迁移 `props` 至 `src` 下。

## 🌈 0.1.9 `2021-08-09`

### 🐞 Bug Fixes

* Tabs: 修复 `panel` 无法实时更新的问题。
* PopConfirm: 重构组件, `UI` 与 `API` 特性同步。
* Popup: 重构组件, `UI` 与 `API` 特性同步。

### 🚀  Features

* Calendar: 新增 `Calendar` 组件。
* Table: 新增 `Table`组件。。

## 🌈 0.1.8 `2021-07-01`

### 🚀  Features

* Menu: 新增 `Menu` 组件。

## 🌈 0.1.3 `2021-06-08`

### 🚀  Features

* Transfer: 新增 `Transfer` 组件。

## 🌈 0.1.2 `2021-05-20`

### 🚀  Features

* Pagination: 新增 `Pagination`组件。

## 🌈 0.1.0 `2021-05-19`

### 🚀  Features

* 首个测试版发布。`Upload`、`Calendar`、`Menu`、`DatePicker`、`TimePicker`、`TextArea`、`Pagination`、`Transfer` 组件除外。
