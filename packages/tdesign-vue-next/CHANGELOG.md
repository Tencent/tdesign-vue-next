---
title: 更新日志
spline: explain
toc: false
docClass: timeline
---

## 🌈 1.18.5 `2026-03-12`

### 🐞 Bug Fixes

- `Tree`: 修复 1.18.3 中开启虚拟滚动后滚动中出现空白的错误 @uyarn ([#6483](https://github.com/Tencent/tdesign-vue-next/pull/6483))

## 🌈 1.18.4 `2026-03-11`

### 🐞 Bug Fixes

- `FormItem`: 单独使用时触发校验会在控制台报错的问题 @betavs ([#6467](https://github.com/Tencent/tdesign-vue-next/pull/6467))
- `Table`: 修复 1.18.3 版本更新导致的筛选功能失效的问题 @betavs ([#6481](https://github.com/Tencent/tdesign-vue-next/pull/6481))

## 🌈 1.18.3 `2026-03-05`

### 🚀 Features

- `Select`: 新增支持 BigInt 类型的选项 @Jie-echo ([#6460](https://github.com/Tencent/tdesign-vue-next/pull/6460))

### 🐞 Bug Fixes

- `DatePicker`: 修复单选的情况下清除数据时会触发多次 onChange 回调的错误 @RSS1102 ([#6451](https://github.com/Tencent/tdesign-vue-next/pull/6451))
- `Drawer`: 修复 push mode 下弹窗样式异常的问题 @Zn-Dk ([#6446](https://github.com/Tencent/tdesign-vue-next/pull/6446))
- `DrawerPlugin`: 修正使用 `className` 时的打开动画异常问题 @Cat1007 ([#6424](https://github.com/Tencent/tdesign-vue-next/pull/6424))
- `InputNumber`: 修复 `disabled` 时，hover 对应颜色异常的问题 @RylanBot ([common#2402](https://github.com/Tencent/tdesign-common/pull/2402))
- `Progress`: 修复 line 和 plump 主题不支持小尺寸的问题 @liweijie0812 ([#6340](https://github.com/Tencent/tdesign-vue-next/pull/6340))
- `Swiper`: 修复 `点状` 与 `点条状` 导航器中，`navigation.size` 配置无效、`navigation.placement=outside`时导航器颜色不正确的问题 @Wesley-0808 ([common#2418](https://github.com/Tencent/tdesign-common/pull/2418))

## 🌈 1.18.2 `2026-02-05`

### 🐞 Bug Fixes

- `DateRangePicker`: 修复 `1.18.1` 版本 `needConfirm` 为 false 时，修改被还原的问题 @liweijie0812 ([#6410](https://github.com/Tencent/tdesign-vue-next/pull/6410))

## 🌈 1.18.1 `2026-02-04`

### 🚀 Features

- `DatePicker`:
  - 新增 `onClear` 清空按钮点击时触发事件 @Wesley-0808 ([#6316](https://github.com/Tencent/tdesign-vue-next/pull/6316))
  - `presets` 支持自定义渲染，用于配置精确时分秒等预设场景 @uyarn ([#6316](https://github.com/Tencent/tdesign-vue-next/pull/6316))
  - 新增 `disableTime` API，用于配置时间选择器中被禁用的时间 @Wesley-0808 ([#6316](https://github.com/Tencent/tdesign-vue-next/pull/6316))
  - 新增 `range` 和 `panelActiveDate` API，用于支持定义日期选择范围，具体使用请参考示例 @Wesley-0808 ([#6316](https://github.com/Tencent/tdesign-vue-next/pull/6316))
- `DateRangePicker`:
  - `disabled` API 新增支持数组类型，用于单独禁用开始日期或结束日期 @uyarn ([#6390](https://github.com/Tencent/tdesign-vue-next/pull/6390))
  - 新增 `range` 和 `panelActiveDate` API，用于支持定义日期选择范围，具体使用请参考示例 @Wesley-0808 ([#6316](https://github.com/Tencent/tdesign-vue-next/pull/6316))
- `Icon`: 新增 217 个与人工智能、文档、徽标和文件相关的图标 @RADWIMPS426 @uyarn ([#6367](https://github.com/Tencent/tdesign-vue-next/pull/6367))
- `Menu`: 支持菜单面板在空间不足时的自动反转 @RSS1102 ([#6392](https://github.com/Tencent/tdesign-vue-next/pull/6392))
- `RangeInput`: `disabled` 支持数组形式配置，用于单独禁用左区间或右区间 @RSS1102 ([#5648](https://github.com/Tencent/tdesign-vue-next/pull/5648))

### 🐞 Bug Fixes

- `Cascader`: 修复 useCascaderContext 传递 disabled 失效问题 @liweijie0812 ([#6332](https://github.com/Tencent/tdesign-vue-next/pull/6332))
- `DateRangePicker`: 修复 `needConfirm` 为 false，点击预设无效的问题 @liweijie0812 ([#6388](https://github.com/Tencent/tdesign-vue-next/pull/6388))
- `Drawer`: 优化开启 `sizeDraggable` 功能时，调整当前抽屉尺寸后没有实时计算的问题 @yrc2333 ([#6328](https://github.com/Tencent/tdesign-vue-next/pull/6328))
- `InputNumber`: 修复大数计算前导零被错误清除的问题 @Liumingxun ([common#2394](https://github.com/Tencent/tdesign-common/pull/2394))
- `Menu`: 修复侧边导航菜单收起时，内容为插槽方式 Tooltip 无法生效的问题 @liweijie0812 ([#6341](https://github.com/Tencent/tdesign-vue-next/pull/6341))
- `Table`: 修复远程分页场景下全选逻辑错误，在 `1.18.0` 版本的问题 @RSS1102 ([#6393](https://github.com/Tencent/tdesign-vue-next/pull/6393))
- `Transfer`: 修复 `disabled` 为数组时功能不生效的问题 @RSS1102 ([#5648](https://github.com/Tencent/tdesign-vue-next/pull/5648))

### 📝 Documentation

- `Dialog`: 补充与嵌套弹窗相关使用问题的文档 @engvuchen ([#5847](https://github.com/Tencent/tdesign-vue-next/pull/5847))

## 🌈 1.18.0 `2026-01-08`

### 🚀 Features

- `DialogPlugin`: 支持接收 ConfigProvider 的全局配置，如自定义前缀 @Wesley-0808 @uyarn @Copilot ([#6212](https://github.com/Tencent/tdesign-vue-next/pull/6212))
- `DrawerPlugin`: 支持接收 ConfigProvider 的全局配置，如自定义前缀 @Wesley-0808 @uyarn @Copilot ([#6212](https://github.com/Tencent/tdesign-vue-next/pull/6212))
- `Form`: 自定义校验方法 `validator` 新增 `context` 回调参数，包括 `formData` 和 `name` 用于 JSON Schema 等生成式表单场景 @uyarn ([#6321](https://github.com/Tencent/tdesign-vue-next/pull/6321))
- `LoadingPlugin`: 支持接收 ConfigProvider 的全局配置，如自定义前缀 @Wesley-0808 @uyarn @Copilot ([#6212](https://github.com/Tencent/tdesign-vue-next/pull/6212))
- `MessagePlugin`: 支持接收 ConfigProvider 的全局配置，如自定义前缀 @Wesley-0808 @uyarn @Copilot ([#6212](https://github.com/Tencent/tdesign-vue-next/pull/6212))
- `NotificationPlugin`:
  - 新增 `className` 和 `style` API，支持自定义通知框类、内联样式 @Wesley-0808 ([#6307](https://github.com/Tencent/tdesign-vue-next/pull/6307))
  - 支持接收 ConfigProvider 的全局配置，如自定义前缀 @Wesley-0808 @uyarn @Copilot ([#6212](https://github.com/Tencent/tdesign-vue-next/pull/6212))
- `TagInput`: 修复横向滚动模式下增删选项滚动条位置异常的问题 @liweijie0812 @Copilot ([#6213](https://github.com/Tencent/tdesign-vue-next/pull/6213))
- `Upload`: 新增支持 .ai、.ps、.eps 等支持的文件类型 @uyarn ([common#2374](https://github.com/Tencent/tdesign-common/pull/2374)) ([#6324](https://github.com/Tencent/tdesign-vue-next/pull/6324))
- `Calendar`: `range` API 支持单独设置开始范围或结束范围 @shumuuu ([#6211](https://github.com/Tencent/tdesign-vue-next/pull/6211))

### 🐞 Bug Fixes

- `Cascader`: 修复在 Safari 浏览器中点击展开图标没有变换方向的问题 @liweijie0812 ([#6312](https://github.com/Tencent/tdesign-vue-next/pull/6312))
- `EnhancedTable`: 修复行选中收缩后, 表格头全选状态异常的问题 @Copilot ([#6208](https://github.com/Tencent/tdesign-vue-next/pull/6208))
- `Image`: 修复 loading 和 error 状态下的字体大小问题 @Nero978 @RADWIMPS426 ([common#2383](https://github.com/Tencent/tdesign-common/pull/2383))
- `ImageViewer`:
  - 修复不支持 trigger 配置无触发器的场景使用的问题 @uyarn ([#6302](https://github.com/Tencent/tdesign-vue-next/pull/6302))
  - 修复无法使用插槽自定义预览标题的问题 @betavs ([#6277](https://github.com/Tencent/tdesign-vue-next/pull/6277))
  - 优化开启 `close-on-overlay`时，缩小图片后新增的空白区域无法正常关闭预览的问题 @QuentinHsu ([#6235](https://github.com/Tencent/tdesign-vue-next/pull/6235))
  - 修正 `zIndex` 默认值为 3000，此前为错误的 2600，如有涉及层级覆盖请注意此变更 ⚠️ @liweijie0812 ([#6128](https://github.com/Tencent/tdesign-vue-next/pull/6128))
- `List`: 修复 ListItem 的默认边距和多余底部分割线问题 @Nero978 @liweijie0812 ([common#2386](https://github.com/Tencent/tdesign-common/pull/2386)) ([common#2382](https://github.com/Tencent/tdesign-common/pull/2382)) ([#6324](https://github.com/Tencent/tdesign-vue-next/pull/6324))
- `Menu`: 修复在 Safari 浏览器中点击展开图标没有变换方向的问题 @liweijie0812 ([#6312](https://github.com/Tencent/tdesign-vue-next/pull/6312))
- `Select`: 修复在 Safari 浏览器中点击展开图标没有变换方向的问题 @liweijie0812 ([#6312](https://github.com/Tencent/tdesign-vue-next/pull/6312))
- `Slider`: 修复 `v-model` 修改数组单个元素时响应式失效的问题 @RSS1102 ([#6313](https://github.com/Tencent/tdesign-vue-next/pull/6313))
- `Swiper`: 修复 `type='card'` 时，宽度计算不稳定的问题 @RylanBot ([#6185](https://github.com/Tencent/tdesign-vue-next/pull/6185))
- `Table`: 修复列配置弹窗打开时不触发回调事件的问题 @tuzixiangs ([#6174](https://github.com/Tencent/tdesign-vue-next/pull/6174))
- `Tabs`: 修复当宽度增加到足以适合所有标签时，滚动状态不会取消的问题 @wesley-0808 @Copilot ([#6293](https://github.com/Tencent/tdesign-vue-next/pull/6293))
- `Textarea`: 修复无法直接通过 height 配置高度的问题 @engvuchen ([#6040](https://github.com/Tencent/tdesign-vue-next/pull/6040))
- `Tooltip`: 修复`Tooltip` 配合`Textarea` 使用在空内容下的错误 @engvuchen ([#6040](https://github.com/Tencent/tdesign-vue-next/pull/6040))
- `TreeSelect`: 修复在 Safari 浏览器中点击展开图标没有变换方向的问题 @liweijie0812 ([#6312](https://github.com/Tencent/tdesign-vue-next/pull/6312))
- `HeadMenu`: 修复使用 JSX 动态渲染 MenuItem 时控制台警告的问题 @Copilot ([#6221](https://github.com/Tencent/tdesign-vue-next/pull/6221))
- `Popup`: 修复页面缩放后 onScrollToBottom 事件无法触发的问题 @Copilot ([#6205](https://github.com/Tencent/tdesign-vue-next/pull/6205))
- `Table`:
  - 修复单选模式下取消行高亮时 `activeRowList` 未正确清空的问题 @Copilot ([#6222](https://github.com/Tencent/tdesign-vue-next/pull/6222))
  - 修复组件实例方法 `clearValidateData` 没有清理可编辑单元格验证结果的问题 @RSS1102 ([#6186](https://github.com/Tencent/tdesign-vue-next/pull/6186))
- `TreeSelect`: 修复 `label` 插槽不生效的问题 @RSS1102 ([#6294](https://github.com/Tencent/tdesign-vue-next/pull/6294))
- `Upload`: 修复 `1.17.4` 自定义上传按钮但未定义点击事件时，点击按钮无效的问题 @Wesley-0808 ([#6280](https://github.com/Tencent/tdesign-vue-next/pull/6280))

## 🌈 1.17.7 `2025-12-18`

### 🚀 Features

- `ImageViewer`:
  - 优化下载跨域图片时的格式处理，优化通过下载获取的文件大小 @RylanBot ([common#2311](https://github.com/Tencent/tdesign-common/pull/2311)) ([#6270](https://github.com/Tencent/tdesign-vue-next/pull/6270))
  - 支持直接下载同域图片，避免二次转换导致体积增大和动图失效等问题 @RylanBot ([common#2311](https://github.com/Tencent/tdesign-common/pull/2311)) ([#6270](https://github.com/Tencent/tdesign-vue-next/pull/6270))
- 支持 .dark 类名，丰富切换深色模式的方式 @liweijie0812 ([common#2355](https://github.com/Tencent/tdesign-common/pull/2355))

### 🐞 Bug Fixes

- `Avatar`: 修复样式与设计稿不一致的问题 @liweijie0812 ([common#2364](https://github.com/Tencent/tdesign-common/pull/2364)) ([#6270](https://github.com/Tencent/tdesign-vue-next/pull/6270))
- `DatePicker`: 修复按需引入组件且开启时间面板时打包后丢失部分样式的问题 @uyarn ([#6257](https://github.com/Tencent/tdesign-vue-next/pull/6257))
- `DateRangePicker`: 修复在表单中使用且携带`default-time`参数时，二次选择会置空数据的缺陷 @RSS1102 ([#6268](https://github.com/Tencent/tdesign-vue-next/pull/6268))
- `Dropdown`: 修复编辑器提示缺少 `TDropdownMenu` 类型声明的问题 @RSS1102 ([#6238](https://github.com/Tencent/tdesign-vue-next/pull/6238))
- `Menu`: 修复菜单选项默认边距和图标大小的问题 @liweijie0812 ([common#2369](https://github.com/Tencent/tdesign-common/pull/2369)) ([#6270](https://github.com/Tencent/tdesign-vue-next/pull/6270))
- `Tree`: 修复子节点为自定义的 Input 等元素时，选中文本的高亮样式被隐藏的问题 @RylanBot ([common#2370](https://github.com/Tencent/tdesign-common/pull/2370)) ([#6270](https://github.com/Tencent/tdesign-vue-next/pull/6270))
- `Popconfirm`: 修复快速点击默认按钮时 `getComputedStyle` 报错的问题 @Copilot ([#6224](https://github.com/Tencent/tdesign-vue-next/pull/6224))

### 📈 Performance

- 移除产物中的冗余内容 @liweijie0812 ([#6269](https://github.com/Tencent/tdesign-vue-next/pull/6269))

## 🌈 1.17.6 `2025-12-01`

### 🐞 Bug Fixes

- `DatePicker`: 修复 1.16.0 版本后，日期区间选择器跨年时右侧面板月份错误同步变化的问题 @liweijie0812 @Copilot ([#6204](https://github.com/Tencent/tdesign-vue-next/pull/6204))

## 🌈 1.17.5 `2025-11-28`

### 🐞 Bug Fixes

- `Tree`: 修复 `1.17.3` 版本过滤中可选节点被错误禁用的问题 @RylanBot ([common#2345](https://github.com/Tencent/tdesign-common/pull/2345)) ([#6196](https://github.com/Tencent/tdesign-vue-next/pull/6196))

## 🌈 1.17.4 `2025-11-28`

### 🚀 Features

- `Table`: 优化通过分页操作后 Table 内容变化时的展示效果，分页器会锚定在当前视口 @RSS1102 ([#6172](https://github.com/Tencent/tdesign-vue-next/pull/6172))

### 🐞 Bug Fixes

- `Calendar`: 优化透传组件 props 事件的处理方式，修复透传的回调函数无法触发的问题 @Wesley-0808 ([#6157](https://github.com/Tencent/tdesign-vue-next/pull/6157))
- `DatePicker`: 优化日期范围选择器的交互问题，避免先选择结束日期后需重复操作多次的问题 @mikasayw ([#6143](https://github.com/Tencent/tdesign-vue-next/pull/6143))
- `Description`: 修复无边框模式下`itemLayout`垂直排列的间距问题 @mikasayw ([#6156](https://github.com/Tencent/tdesign-vue-next/pull/6156))
- `Input`:
  - 修正 input 及上层 select 等组件在 safari 中初次渲染 auto-width 失效的问题 @Cat1007 ([common#2336](https://github.com/Tencent/tdesign-common/pull/2336)) ([#6188](https://github.com/Tencent/tdesign-vue-next/pull/6188))
  - 优化透传组件 props 事件的处理方式，修复透传的回调函数无法触发的问题 @Wesley-0808 ([#6157](https://github.com/Tencent/tdesign-vue-next/pull/6157))
- `SelectInput`: 优化透传组件 props 事件的处理方式，修复透传的回调函数无法触发的问题 @Wesley-0808 ([#6157](https://github.com/Tencent/tdesign-vue-next/pull/6157))
- `Slider`: 修复初始化时精度计算错误的问题 @RylanBot ([#6183](https://github.com/Tencent/tdesign-vue-next/pull/6183))
- `Table`:
  - 优化透传组件 props 事件的处理方式，修复透传的回调函数无法触发的问题 @Wesley-0808 ([#6157](https://github.com/Tencent/tdesign-vue-next/pull/6157))
  - 修复可编辑单元格在`keepEditMode`下没有正确在 validateData 回调展示的问题 @uyarn ([#5490](https://github.com/Tencent/tdesign-vue-next/pull/5490))
- `TagInput`: 优化透传组件 props 事件的处理方式，修复透传的回调函数无法触发的问题 @Wesley-0808 ([#6157](https://github.com/Tencent/tdesign-vue-next/pull/6157))
- `TreeSelect`: 优化透传组件 props 事件的处理方式，修复透传的回调函数无法触发的问题 @Wesley-0808 ([#6157](https://github.com/Tencent/tdesign-vue-next/pull/6157))
- `Upload`:
  - 优化透传组件 props 事件的处理方式，修复透传的回调函数无法触发的问题 @Wesley-0808 ([#6157](https://github.com/Tencent/tdesign-vue-next/pull/6157))
  - 修复不支持文件数组上传的问题 @GATING ([#6169](https://github.com/Tencent/tdesign-vue-next/pull/6169))
- `Table`: 修复分页受控模式下 `current` 属性手动变更不触发 `onPageChange` 的问题 @RSS1102 ([#6163](https://github.com/Tencent/tdesign-vue-next/pull/6163))

### 📝 Documentation

- `Calendar`: 补充`range`参数的用法示例 @shumuuu ([#6148](https://github.com/Tencent/tdesign-vue-next/pull/6148))

## 🌈 1.17.3 `2025-11-14`

### 🚀 Features

- `DatePicker`: 在未配置 `enableTimePicker` 场景下也应用 `defaultTime` 的配置，影响 `valueType` 为 `time-stamp`的返回值及 `onChange` 的回调参数 ⚠️ @RSS1102 @uyarn ([#6140](https://github.com/Tencent/tdesign-vue-next/pull/6140))
- `Divider`: 新增 `size` API，用于控制间距大小 @liweijie0812 ([#6094](https://github.com/Tencent/tdesign-vue-next/pull/6094))
- `Guide`: 支持在调整窗口大小时自动调整引导组件的展示效果 @yrc2333 ([#6133](https://github.com/Tencent/tdesign-vue-next/pull/6133))
- `Form`: `pattern` API 新增支持 string 类型 @liweijie0812 ([#6134](https://github.com/Tencent/tdesign-vue-next/pull/6134))
- `Form`: 在 `setValidateMessage` 中添加 `success` 验证类型支持 @RSS1102 ([#6147](https://github.com/Tencent/tdesign-vue-next/pull/6147))

### 🐞 Bug Fixes

- `Popup`: 修复在 SSR 场景下的异常问题 @uyarn ([#6124](https://github.com/Tencent/tdesign-vue-next/pull/6124))
- `Table`: 修复在 pageSize 由小到大改变时无法自定义当前页的问题 @RSS1102 ([#6127](https://github.com/Tencent/tdesign-vue-next/pull/6127))
- `Tabs`: 修复开启 `destroyOnHide` 移除标签后会导致后续 TabItem 状态异常的问题 @yrc2333 ([#6137](https://github.com/Tencent/tdesign-vue-next/pull/6137))
- `Empty`: 修复多语言动态切换响应式无效 @liweijie0812 ([#6126](https://github.com/Tencent/tdesign-vue-next/pull/6126))
- `Menu`: 修复快速操作菜单时，父菜单关闭后子菜单未正确收起的问题 @RSS1102 ([#6121](https://github.com/Tencent/tdesign-vue-next/pull/6121))

## 🌈 1.17.2 `2025-10-30`

### 🚀 Features

- `Affix`: 新增支持`content`API，与其他组件保持一致 @ImaginingMaker @zhangpaopao0609 ([#5981](https://github.com/Tencent/tdesign-vue-next/pull/5981))
- `Cascader`:
  - 支持 `filterable` 与 `checkStrictly` 及`valueMode = parentFirst`配合使用，展示非叶子节点的效果 @uyarn ([#6102](https://github.com/Tencent/tdesign-vue-next/pull/6102))
  - `option` 新增`onChange`和`onExpand` 方法，用于多选场景下，自定义节点时自定义点击节点的触发逻辑，具体使用请参考自定义下拉选项的参考示例 @uyarn ([#6102](https://github.com/Tencent/tdesign-vue-next/pull/6102))
- `Popup`: 新增 `getPopper()` 方法，将返回 popper 实例，用于基于 popper 进行动态操作的场景 @RSS1102 ([#6096](https://github.com/Tencent/tdesign-vue-next/pull/6096))

### 🐞 Bug Fixes

- `AutoComplete`: 修复使用键盘选中后，删除输入框内容时无法再次打开选项弹窗的问题 @SaberA1ter ([#6059](https://github.com/Tencent/tdesign-vue-next/pull/6059))
- `Cascader`:
  - 修复多选自定义节点无法进行展开处理的问题 @uyarn ([#6102](https://github.com/Tencent/tdesign-vue-next/pull/6102))
  - 修复`reserveKeyword` API 无效的问题 @uyarn ([#6102](https://github.com/Tencent/tdesign-vue-next/pull/6102))
- `DatePicker`: 修复面板底部内容区域在非需要情况下仍存在的问题 @huguangju ([#6055](https://github.com/Tencent/tdesign-vue-next/pull/6055))
- `DateRangePicker`: 修复全局替换图标场景下，点击关闭按钮报错的问题 @uyarn ([#6108](https://github.com/Tencent/tdesign-vue-next/pull/6108))
- `Form`: 修复错误消息 `max` 和 `min` 英文翻译错误 @liweijie0812 ([#6082](https://github.com/Tencent/tdesign-vue-next/pull/6082))
- `ImageViewer`:
  - 修复 `zIndex` 过大导致工具栏的 tooltip 会被遮挡的问题 @liweijie0812 ([#6107](https://github.com/Tencent/tdesign-vue-next/pull/6107))
  - 修复预览图片时点击右键后失焦，预览图会跟随鼠标移动的问题 @mikasayw ([#6098](https://github.com/Tencent/tdesign-vue-next/pull/6098))
- `MessagePlugin`: 修复`className`参数无效的问题 @Wesley-0808 ([#6097](https://github.com/Tencent/tdesign-vue-next/pull/6097))
- `NotificationPlugin`: 优化 `offset` 没有对容器层生效的问题 @liweijie0812 ([#6087](https://github.com/Tencent/tdesign-vue-next/pull/6087))
- `Rate`: 修复`color`属性不支持响应式的问题 @mikasayw ([#6072](https://github.com/Tencent/tdesign-vue-next/pull/6072))
- `Table`: 修复控制台的告警问题 @mikasayw ([#6070](https://github.com/Tencent/tdesign-vue-next/pull/6070))
- `Menu`: 修复父菜单关闭时子菜单状态残留 @RSS1102 ([#6086](https://github.com/Tencent/tdesign-vue-next/pull/6086))
- `Table`: 当未提供 `pageSize` 时确保使用 `defaultPageSize` 大小 @RSS1102 ([#6101](https://github.com/Tencent/tdesign-vue-next/pull/6101))

### 📝 Documentation

- `ImageViewer`: 优化示例页面操作栏被主题生成器遮挡的问题 @liweijie0812 ([#6107](https://github.com/Tencent/tdesign-vue-next/pull/6107))

## 🌈 1.17.1 `2025-10-09`

### 🐞 Bug Fixes

- `Descriptions`: 修复无边框模式下的边距问题 @liweijie0812 ([#6043](https://github.com/Tencent/tdesign-vue-next/pull/6043))
- `Watermark`: 修复 `1.17.0` SSR 场景下构建时报错的问题 @Wesley-0808 ([#6047](https://github.com/Tencent/tdesign-vue-next/pull/6047))
- `Calendar`: 修复了当设定日历的 range 值为同一年内时，终止月份之后的月份选项没有正常禁用的问题 @shumuuu ([#6045](https://github.com/Tencent/tdesign-vue-next/pull/6045))

## 🌈 1.17.0 `2025-09-25`

### 🚀 Features

- `Watermark`: 新增 `layout` API，支持生成不同布局的水印 @Wesley-0808 ([#5991](https://github.com/Tencent/tdesign-vue-next/pull/5991))
- `Icon`:
  - `tdesign-icons-vue-next` 发布 `0.4.x` 版本，新增`align-bottom`、`no-result`、`no-result-filled`、 `tree-list`、`wifi-no`、 `wifi-no-filled`、`logo-stackblitz-filled`、`logo-stackblitz`、`logo-wecom-filled` 图标；移除 `video-camera-3`、`video-camera-3-filled`、`list` 图标，此前有依赖以上移除图标升级请注意 ⚠️ @uyarn ([#5968](https://github.com/Tencent/tdesign-vue-next/pull/5968))
  - 按需加载方式使用的图标资源支持可变粗细功能，通过`strokeWidth`属性进行配置, 具体使用参考文档和示例 @uyarn ([#5968](https://github.com/Tencent/tdesign-vue-next/pull/5968))
  - 按需加载方式使用的图标资源支持多色填充功能，通过`strokeColor` 和 `fillColor` 属性进行配置，具体使用参考文档和示例 @uyarn ([#5968](https://github.com/Tencent/tdesign-vue-next/pull/5968))
- `ImageViewer`: 新增默认 trigger 渲染 ，默认为当前使用的图片作为默认 trigger，降低组件的使用难度，具体参考相关示例改动 @EthanShen10086 ([#5935](https://github.com/Tencent/tdesign-vue-next/pull/5935))
- `Notification`: 新增 `onClose` 事件，用于处理调用 `NotifyPlugin.close()` 的相关回调场景 @baozjj ([#5958](https://github.com/Tencent/tdesign-vue-next/pull/5958))
- `Tabs`: 拖拽至 `draggable = false` 区域时，将不显示可放置状态 @RSS1102 ([#5990](https://github.com/Tencent/tdesign-vue-next/pull/5990))

### 🐞 Bug Fixes

- `Form`: 修复校验规则在多级 name 对应 FormItem 错误触发的问题 @uyarn ([#6022](https://github.com/Tencent/tdesign-vue-next/pull/6022))
- `ImageViewer`: trigger 方法新增传入图片 index 参数，具体使用方法参考示例 @betavs ([#6016](https://github.com/Tencent/tdesign-vue-next/pull/6016))
- `Notification`: 修复调用 `NotifyPlugin.close()` 错误触发 `onCloseBtnClick` 回调的问题 @baozjj ([#5958](https://github.com/Tencent/tdesign-vue-next/pull/5958))
- `QRCode`: 修复初始 value 值为空时，组件无法渲染的问题 @Wesley-0808 ([#5982](https://github.com/Tencent/tdesign-vue-next/pull/5982))
- `Skeleton`: 修复使用 `rowCol` 时，额外渲染 `theme` 默认配置的错误行为 @uyarn ([#6009](https://github.com/Tencent/tdesign-vue-next/pull/6009))
- `Textarea`: 修复内容超长情况下，设置 `autosize` 没有完整自动撑开高度，存在有滚动条的问题 @engvuchen ([#6019](https://github.com/Tencent/tdesign-vue-next/pull/6019))
- `Tree`: 修复自定义 icon 全被设为 open 状态，导致图标颜色错误的问题 @RylanBot ([#5993](https://github.com/Tencent/tdesign-vue-next/pull/5993))
- `TreeSelect`:
  - 修复过滤场景下，展开状态节点前置图标没有正常展示的问题 @uyarn ([#6025](https://github.com/Tencent/tdesign-vue-next/pull/6025))
  - 修复选中节点后展开状态触发不必要的更新的问题 @uyarn ([#6025](https://github.com/Tencent/tdesign-vue-next/pull/6025))
- `Typography`:
  - 修复自定义复制内容无效的问题 @Wesley-0808 ([#5977](https://github.com/Tencent/tdesign-vue-next/pull/5977))
  - 修复定义的 `mark` 颜色错误应用于文字颜色 @Wesley-0808 ([#5705](https://github.com/Tencent/tdesign-vue-next/pull/5705))
- `Watermark`: 修复多行图文水印图片配置了灰度时，整个画布内容也会灰度的问题 @Wesley-0808 ([#5991](https://github.com/Tencent/tdesign-vue-next/pull/5991))
- `FakeArrow`: 修复 `overlayStyle` 类型定义错误的问题 @haozang54-source ([#5971](https://github.com/Tencent/tdesign-vue-next/pull/5971))

## 🌈 1.16.1 `2025-09-01`

### 🐞 Bug Fixes

- `Tabs`: 修复`1.16.0` 新增 `TabPanel` onRemove 事件后导致的移除选项时控制台报错的问题 @uyarn ([#5955](https://github.com/Tencent/tdesign-vue-next/pull/5955))

## 🌈 1.16.0 `2025-08-28`

### 🚀 Features

- 新增 `--td-text-color-watermark` 变量， 用于水印等需要透明度的场景 @uyarn ([#5932](https://github.com/Tencent/tdesign-vue-next/pull/5932))
- `Skeleton`: 修复 `theme` 默认值不符合文档描述的问题，需要 `paragraph` 效果升级后手动设置`theme` ⚠️ @liweijie0812 ([#5872](https://github.com/Tencent/tdesign-vue-next/pull/5872))
- `TabPanel`: 新增 `remove` 事件，方便独立 Panel 处理移除后的相关逻辑 @RSS1102 ([#5853](https://github.com/Tencent/tdesign-vue-next/pull/5853))
- `Table`: 新增切换分页后重置滚动条回到顶部的特性 @RSS1102 ([#5885](https://github.com/Tencent/tdesign-vue-next/pull/5885))
- `Tabs`: 将 remove 事件从删除图标移至外层容器, 保证替换图标功能正常使用，有覆盖删除图标样式请注意此变更 ⚠️ @RSS1102 ([#5853](https://github.com/Tencent/tdesign-vue-next/pull/5853))

### 🐞 Bug Fixes

- `DateRangePicker`:
  - 修复`disableTime` 功能异常的问题 @uyarn ([#5940](https://github.com/Tencent/tdesign-vue-next/pull/5940))
  - 修复`disableDate` 的函数用法返回参数回调与文档不符的问题，此前有基于错误参数请注意此变更 ⚠️ @uyarn ([#5940](https://github.com/Tencent/tdesign-vue-next/pull/5940))
- `Select`: 修复`tips` API 插槽使用方式的告警问题 @Kalinrun ([#5910](https://github.com/Tencent/tdesign-vue-next/pull/5910))
- `Skeleton`: 修复骨架屏动画 `animation-delay` 属性默认值问题 @anlyyao ([common#2248](https://github.com/Tencent/tdesign-common/pull/2248))
- `Transfer`: 修复 `operation` 传递函数数组渲染错误的问题 @RSS1102 ([#5794](https://github.com/Tencent/tdesign-vue-next/pull/5794))
- `Tree`: 修复树节点开启 `draggable` 后，在 disabled 状态下依旧生效的异常 @RylanBot ([#5914](https://github.com/Tencent/tdesign-vue-next/pull/5914))
- `Watermark`: 修复水印组件因为透明度问题覆盖内容及在 SSR 场景下的使用问题 @uyarn ([#5932](https://github.com/Tencent/tdesign-vue-next/pull/5932))

## 🌈 1.15.5 `2025-08-18`

### 🐞 Bug Fixes

- `DatePicker`: 修复 `1.15.3` 版本中日期范围选择面板年份错误的问题 @uyarn ([#5901](https://github.com/Tencent/tdesign-vue-next/pull/5901))
- `InputNumber`: 修复 `1.15.3` 版本后设置`allowInputOverLimit` 为 false 但未设置最小值的展示异常问题 @YuShengHou ([#5898](https://github.com/Tencent/tdesign-vue-next/pull/5898))

## 🌈 1.15.4 `2025-08-15`

### 🐞 Bug Fixes

- `Textarea`: 修复 `allowInputOverMax` 无法在 `maxcharacter` 配置下生效的问题 @RSS1102 ([#5888](https://github.com/Tencent/tdesign-vue-next/pull/5888))

## 🌈 1.15.3 `2025-08-14`

### 🚀 Features

- `Card`: 新增 `headerClassName`、`headerStyle`、`bodyClassName`、`bodyStyle`、`footerClassName`、`footerStyle`，方便用于定制卡片组件的各部分样式 @An0510 ([#5867](https://github.com/Tencent/tdesign-vue-next/pull/5867))
- `InputNumber`: 当值为 undefined 或 null，且`allowInputOverLimit`为 false 时，需重置为最小值 @dhj-l ([#5881](https://github.com/Tencent/tdesign-vue-next/pull/5881))

### 🐞 Bug Fixes

- `Cascader`: 修复可过滤场景下，鼠标移入下拉面板后展现异常的缺陷 @byrdkm17 ([#5866](https://github.com/Tencent/tdesign-vue-next/pull/5866))
- `ColorPicker`: 修复 `popupProps.onVisibleChange` 回调函数不执行的问题 @RylanBot ([#5839](https://github.com/Tencent/tdesign-vue-next/pull/5839))
- `DatePicker`: 优化年份选择模式下选择同面板年份后面板内容的展示效果 @uyarn ([#5882](https://github.com/Tencent/tdesign-vue-next/pull/5882))
- `Input`: 修复中文输入法激活时回车触发 `onEnter` 事件的问题 @dhj-l ([#5862](https://github.com/Tencent/tdesign-vue-next/pull/5862))
- `QRCode`: 修复 `type='svg'` 时 `value` 值变化而二维码未刷新的问题 @RSS1102 ([#5864](https://github.com/Tencent/tdesign-vue-next/pull/5864))
- `Select`: 修复 `1.15.2` 版本中控制台关于 `size` 属性的告警问题 @RSS1102 ([#5844](https://github.com/Tencent/tdesign-vue-next/pull/5844))
- `SelectInput`: 修复删除标签时组件闪烁的问题 @novlan1 ([#5868](https://github.com/Tencent/tdesign-vue-next/pull/5868))
- `Typography`: 修复 Title 组件无法使用 `class` 的问题 @Wesley-0808 ([#5842](https://github.com/Tencent/tdesign-vue-next/pull/5842))
- `Checkbox`: 修复点击之后 `onClick` 事件触发两次的问题 @RSS1102 ([#5825](https://github.com/Tencent/tdesign-vue-next/pull/5825))

### 📈 Performance

- `Statistic`: 修改 `color` 属性类型为字符串，以支持任何 [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) 支持的颜色值 @RSS1102 ([#5843](https://github.com/Tencent/tdesign-vue-next/pull/5843))

### 📝 Documentation

- `Table`: 完善 `scrollToElement` 函数参数说明 @YuShengHou ([#5870](https://github.com/Tencent/tdesign-vue-next/pull/5870))

## 🌈 1.15.2 `2025-07-31`

### 🚀 Features

- `DateRangePicker`: 支持 `needConfirm` API @uyarn ([#5795](https://github.com/Tencent/tdesign-vue-next/pull/5795))

### 🐞 Bug Fixes

- `ColorPicker`：
  - 修复设置 `swatch-colors` 值为 `null` 时功能异常的问题 @betavs ([#5793](https://github.com/Tencent/tdesign-vue-next/pull/5793))
  - 减少颜色跨色彩空间的多次转换，降低误差 @RylanBot ([#5814](https://github.com/Tencent/tdesign-vue-next/pull/5814))
- `Menu`: 修复顶部菜单在`expandType=popup`模式下子组件存在多层封装后无法正常高亮的问题 @uyarn ([#5821](https://github.com/Tencent/tdesign-vue-next/pull/5821))
- `PopConfirm`: 修复当初始 `visible` 为 true 时，点击外部区域时弹窗不关闭的问题 @RSS1102 ([#5790](https://github.com/Tencent/tdesign-vue-next/pull/5790))
- `Popup`: 修复当初始 `visible` 为 true 时，点击外部区域时弹窗不关闭的问题 @RSS1102 ([#5790](https://github.com/Tencent/tdesign-vue-next/pull/5790))
- `Select`: 修复 Form 设置为 disabled 或 readonly 时，多选选项仍可删除的错误 @An0510 ([#5775](https://github.com/Tencent/tdesign-vue-next/pull/5775))
- `DatePicker`: 修复单周模式下切换年份时高亮仍显示的问题 @baozjj ([#5812](https://github.com/Tencent/tdesign-vue-next/pull/5812))
- `Descriptions`: 修复无边框模式下左右内边距的异常问题 @liweijie0812 ([common#2219](https://github.com/Tencent/tdesign-common/pull/2219))
- `Select`: 错误删除选项中不存在的标签 @RSS1102 ([#5781](https://github.com/Tencent/tdesign-vue-next/pull/5781))
- `Table`:
  - 修复表格非多选模式，按`A`键触发全选的问题 @liweijie0812 ([#5809](https://github.com/Tencent/tdesign-vue-next/pull/5809))
  - 修复 `resizable` 开启时，列边框线引起的列名内容移动的问题 @QuentinHsu ([common#2224](https://github.com/Tencent/tdesign-common/pull/2224))
- `Watermark`: 修复深色模式下，文字水印内容显示不明显的问题 @liweijie0812 ([#5782](https://github.com/Tencent/tdesign-vue-next/pull/5782))

## 🌈 1.15.1 `2025-07-18`

### 🚀 Features

- `QRCode`: 增加编辑器代码提示 @liweijie0812 ([#5758](https://github.com/Tencent/tdesign-vue-next/pull/5758))

## 🌈 1.15.0 `2025-07-17`

### 🚀 Features

- `QRCode`: 新增 `QRCode` 二维码组件，通过 `unplugin` 插件按需引入,安装 `@tdesign-vue-next/auto-import-resolver`，导入 `TDesignResolver` 改为 `import { TDesignResolver } from '@tdesign-vue-next/auto-import-resolver';` @Wesley-0808 ([#5719](https://github.com/Tencent/tdesign-vue-next/pull/5719))

- `Variables`: `--td-font-size-title-large` 从 `20px` 调整为 `18px`, 新增 `--td-font-size-title-extraLarge` 变量，值为 `20px`，此前有使用此变量，请注意此变更 ⚠️ @uyarn ([#5752](https://github.com/Tencent/tdesign-vue-next/pull/5752))
- `SelectInput`: 支持单选模式下可输入功能与自定义展示内容 `valueDisplay` 的配合使用，`Select`、`TreeSelect`、`Cascader` 等组件此功能同样支持；此功能可能影响单选下 `valueDisplay` 使用的场景，升级请注意此变更 ⚠️ @uyarn ([#5751](https://github.com/Tencent/tdesign-vue-next/pull/5751))
- `Helper`: 修复代码提示中缺失 `SwiperItem` 类型和相关提示的问题，同时更新组件的 API 相关信息 @liweijie0812 ([#5722](https://github.com/Tencent/tdesign-vue-next/pull/5722))
- `Locale`: 支持内置多语言的英文版本的单复数场景正常展示 @YunYouJun ([#5680](https://github.com/Tencent/tdesign-vue-next/pull/5680))
- `PaginationMini`: 优化提示文案展示 @baozjj ([#5670](https://github.com/Tencent/tdesign-vue-next/pull/5670))
- `Upload`: 上传图片风格新增 `trigger` API，用于自定义触发上传的内容 @D-xuanmo ([#5678](https://github.com/Tencent/tdesign-vue-next/pull/5678))

### 🐞 Bug Fixes

- `Cascader`: 优化点击非叶子节点选项的部分区域错误触发选中的问题 @uyarn ([#5748](https://github.com/Tencent/tdesign-vue-next/pull/5748))
- `Checkbox`: 修复全选功能在只读或禁用选项，但已选中场景下的功能问题 @uyarn ([#5749](https://github.com/Tencent/tdesign-vue-next/pull/5749))
- `DatePicker`: 处理多选情况下周和季度模式的标签删除异常的问题 @betavs ([#5732](https://github.com/Tencent/tdesign-vue-next/pull/5732))
- `DateRangePickerPanel`: 修复 `onCellClick` 在初始为空时返回值不正确的问题 @Kyle-Alpha ([#5681](https://github.com/Tencent/tdesign-vue-next/pull/5681))
- `DrawerPlugin`: 修复返回值类型 @Cat1007 ([#5679](https://github.com/Tencent/tdesign-vue-next/pull/5679))
- `Input`: 优化不同尺寸下 `prefixIcon` 没有跟随变化的问题 @uyarn ([#5752](https://github.com/Tencent/tdesign-vue-next/pull/5752))
- `InputAdornment`: 修复透传原生属性无效的问题 @cfool ([#5726](https://github.com/Tencent/tdesign-vue-next/pull/5726))
- `Loading`: 修复在 `iPadOS` 的微信中图标位置错误的问题 @Nero978 ([#5717](https://github.com/Tencent/tdesign-vue-next/pull/5717))
- `Upload`: 增强对 `.jpg` 文件类型的支持 @QuentinHsu ([#5754](https://github.com/Tencent/tdesign-vue-next/pull/5754))

## 🌈 1.14.2 `2025-06-30`

### 🐞 Bug Fixes

- `Alert`: 优化 `max-line` 开启后，未过滤注释节点导致折叠按钮误判的问题 @baozjj ([#5650](https://github.com/Tencent/tdesign-vue-next/pull/5650))
- `Button`: 修复 `form` 属性不生效的问题 @uyarn ([#5676](https://github.com/Tencent/tdesign-vue-next/pull/5676))
- `Message`: 修复 `1.14.0` 后由于 createVNode 替代 createApp 导致 message 实例重复创建，`closeAll` 功能异常的问题 @baozjj ([#5669](https://github.com/Tencent/tdesign-vue-next/pull/5669))

### 📝 Documentation

- `主题生成器`: 修复站点受主题生成器影响深色模式下 box-shadow 展示异常的问题 @liweijie0812

## 🌈 1.14.1 `2025-06-27`

### 🐞 Bug Fixes

- `Select`:
  - 修复多选远程搜索场景下， 当前选中项不存在 options 内时，placeholder 展示异常的问题 @uyarn ([#5660](https://github.com/Tencent/tdesign-vue-next/pull/5660))
  - 修复多选远程搜索场景下，当前选中项不存在 options 内时，删除选项功能异常的问题 @uyarn ([#5660](https://github.com/Tencent/tdesign-vue-next/pull/5660))

## 🌈 1.14.0 `2025-06-26`

### 🚀 Features

- `Alert`: 新增 `closeBtn` API，与其他组件保持一致，`close` 将在未来版本废弃，请尽快调整为`closeBtn` 使用 @ngyyuusora ([#5621](https://github.com/Tencent/tdesign-vue-next/pull/5621))
- `DialogPlugin`: 新增支持 appContext 的绑定和传入，用于支持在插件场景中使用 router 或全局指令的场景 @Cat1007 ([#5559](https://github.com/Tencent/tdesign-vue-next/pull/5559))
- `DrawerPlugin`: 新增支持 appContext 的绑定和传入，用于支持在插件场景中使用 router 或全局指令的场景 @Cat1007 ([#5559](https://github.com/Tencent/tdesign-vue-next/pull/5559))
- `LoadingPlugin`: 新增支持 appContext 的绑定和传入，用于支持在插件场景中使用 router 或全局指令的场景 @Cat1007 ([#5559](https://github.com/Tencent/tdesign-vue-next/pull/5559))
- `MessagePlugin`: 新增支持 appContext 的绑定和传入，用于支持在插件场景中使用 router 或全局指令的场景 @Cat1007 ([#5559](https://github.com/Tencent/tdesign-vue-next/pull/5559))
- `NotificationPlugin`: 新增支持 appContext 的绑定和传入，用于支持在插件场景中使用 router 或全局指令的场景 @Cat1007 ([#5559](https://github.com/Tencent/tdesign-vue-next/pull/5559))
- `Popup`: 优化浮层箭头在空间不足场景下没有跟随浮层进行偏移，导致箭头位置不准确的问题 @Cat1007 ([#5038](https://github.com/Tencent/tdesign-vue-next/pull/5038))
- `Select`: 远程搜索场景中，支持直接使用 `valueType= value` 的场景保留已选中 option 的数据进行展示，具体可参考示例代码 @RSS1102 ([#5638](https://github.com/Tencent/tdesign-vue-next/pull/5638))
- `Tree`:
  - 多选场景下每个节点新增 hover 提示，与单选场景保持一致 @RSS1102 ([#5632](https://github.com/Tencent/tdesign-vue-next/pull/5632))
  - 修复点击选项的展开按钮错误触发 `onClick` 事件的问题，此前有基于此异常逻辑实现相关功能的业务请注意此变更 ⚠️ @Soya-xy ([#5512](https://github.com/Tencent/tdesign-vue-next/pull/5512))

### 🐞 Bug Fixes

- `Cascader`: 修复 `valueType="full"` ，value 为 undefined 时组件内部报错的问题 @liweijie0812 ([#5581](https://github.com/Tencent/tdesign-vue-next/pull/5581))
- `ColorPicker`: 修复渐变模式下点击滑块添加色点时定位错误的问题 @betavs ([#5565](https://github.com/Tencent/tdesign-vue-next/pull/5565))
- `DialogPlugin`: 修复插件用法 `destroyOnClose` 表现不正常的问题 @Cat1007 ([#5559](https://github.com/Tencent/tdesign-vue-next/pull/5559))
- `DrawerPlugin`: 修复插件用法 `destroyOnClose` 表现不正常的问题 @Cat1007 ([#5559](https://github.com/Tencent/tdesign-vue-next/pull/5559))
- `Form`: 修复 `id` 属性不生效的问题 @zhangpaopao0609 ([#5640](https://github.com/Tencent/tdesign-vue-next/pull/5640))
- `Popup`: 修复当 `triggerElement` 为字符串类型时，不能正常用于元素选择器的异常 @uyarn ([#5651](https://github.com/Tencent/tdesign-vue-next/pull/5651))
- `Select`: 添加 `selectInputProps` 透传多选属性到 `valueDisplay` @RSS1102 ([#5594](https://github.com/Tencent/tdesign-vue-next/pull/5594))
- `Textarea`: 优化滚动条的样式问题 @RSS1102 ([#5647](https://github.com/Tencent/tdesign-vue-next/pull/5647))
- `TimeRangePicker`: 修复点击面板确定按钮未重置非法格式输入的问题 @QuentinHsu ([#5622](https://github.com/Tencent/tdesign-vue-next/pull/5622))

### 📝 Documentation

- `Alert`: 优化 Alert 演示交互，在关闭后显示“显示 Alert”按钮以恢复显示 @baozjj ([#5646](https://github.com/Tencent/tdesign-vue-next/pull/5646))

## 🌈 1.13.2 `2025-06-04`

### 🐞 Bug Fixes

- `ColorPicker`: 修复 `onChange` 和 `onRecentChange` 回调失效的问题 @RylanBot ([#5545](https://github.com/Tencent/tdesign-vue-next/pull/5545))
- `Input`: 修复输入框在 `composition` 方法中主动失去焦点后，丢失响应式的问题 @QuentinHsu ([#5538](https://github.com/Tencent/tdesign-vue-next/pull/5538))
- `InputNumber`: 修复开启`decimalPlaces`后输入因进位导致展示差异的问题 @QuentinHsu ([#5522](https://github.com/Tencent/tdesign-vue-next/pull/5522))
- `Select`: 修复 `1.13.1` 版本中多选场景不存在选项中的值不能正常展示的问题 @RSS1102 ([#5553](https://github.com/Tencent/tdesign-vue-next/pull/5553))
- `Table`: 优化关闭列配置弹窗时，选择列数据与所展示列数据不一致的问题 @RSS1102 ([#5546](https://github.com/Tencent/tdesign-vue-next/pull/5546))

### 🚧 Others

- `Drawer`: 修复 `cancelBtn` 和 `confirmBtn` 的类型缺失`null` 类型声明的问题 @RSS1102 ([#5555](https://github.com/Tencent/tdesign-vue-next/pull/5555))

## 🌈 1.13.1 `2025-05-29`

### 🚀 Features

- `ConfigProvider`: `FormConfig` 新增 `requiredMarkPosition`，用于全局配置`requiredMark`的位置 @Wesley-0808 ([#5510](https://github.com/Tencent/tdesign-vue-next/pull/5510))
- `Progress`: 当 `theme=plump` 时，当进度条填色区域大小足够容下百分比内容时，内容自动将显示于进度条填色区域内，否则将显示于进度条填色区域的右侧，具体呈现请参考文档示例 @RSS1102 @Soya-xy ([#5460](https://github.com/Tencent/tdesign-vue-next/pull/5460))
- `Select`: `valueDisplay` 参数 `value` 返回完整选项内容，用于使用其他参数进行展示定制的场景 @RSS1102 ([#5509](https://github.com/Tencent/tdesign-vue-next/pull/5509))

### 🐞 Bug Fixes

- `Dropdown`: 修复默认下拉菜单样式存在额外边距的展示问题 @QuentinHsu ([common#2151](https://github.com/Tencent/tdesign-common/pull/2151))
- `Progress`: 修复声明`label`参数后不能正常展示默认 `label` 的异常 @Soya-xy @l123wx ([#5507](https://github.com/Tencent/tdesign-vue-next/pull/5507)) ([#5517](https://github.com/Tencent/tdesign-vue-next/pull/5517))
- `Select`: 修复多选模式下，存在不可选的选项已在选中项中时，仍可通过标签按钮和键盘删除的缺陷 @Wesley-0808 ([#5488](https://github.com/Tencent/tdesign-vue-next/pull/5488))
- `Transfer`: 优化动态加载数据场景下的组件报错问题 @Wesley-0808 ([#5475](https://github.com/Tencent/tdesign-vue-next/pull/5475))
- `MessagePlugin`: 修复插件调用场景下，`attach` 所在节点被清空后，新的 `message` 无法显示的问题 @MrElvin ([#5477](https://github.com/Tencent/tdesign-vue-next/pull/5477))

### 🚧 Others

- 全局处理同时存在`Boolean`和`Slot`方式的 API 在声明 API 后无法正常展示默认渲染节点的问题 @Soya-xy ([#5507](https://github.com/Tencent/tdesign-vue-next/pull/5507))
- 优化插槽方法的判断兼容更多组件类型的使用 @uyarn ([#5521](https://github.com/Tencent/tdesign-vue-next/pull/5521))

## 🌈 1.13.0 `2025-05-14`

### 🚀 Features

- `ColorPicker`: @RylanBot ([#5319](https://github.com/Tencent/tdesign-vue-next/pull/5319)) 使用渐变模式的业务请注意此变更 ⚠️
  - 自动根据「触发器 / 最近颜色 / 预设颜色」的色值进行切换单色和渐变模式
  - 只开启渐变模式时，过滤「预设颜色 / 当前颜色」中的非渐变色值
  - 新增 format `HEX8`，移除 `HSB`
- `Dialog`: 新增 `lazy` API , 打开此配置默认不直接渲染 Dialog， 用于懒加载的场景，此前有依赖 `destroyOnClose` 实现初始化不加载的业务请注意此变更 ⚠️ @RSS1102 ([#5307](https://github.com/Tencent/tdesign-vue-next/pull/5307))
- `Drawer`: 新增 `lazy` API , 打开此配置默认不直接渲染 Drawer，用于懒加载的场景 @RSS1102，此前有依赖 `destroyOnClose` 实现初始化不加载的业务请注意此变更 ⚠️ ([#5375](https://github.com/Tencent/tdesign-vue-next/pull/5375))
- `TagInput`: 优化可拖拽调整位置状态下，鼠标光标显示为移动样式 @liweijie0812 ([#5424](https://github.com/Tencent/tdesign-vue-next/pull/5424))
- `TimePicker`: 新增`onConfirm` 和`onClear` 回调方法 @Wesley-0808 ([#5349](https://github.com/Tencent/tdesign-vue-next/pull/5349))

### 🐞 Bug Fixes

- `Breadcrumb`: 修复 `1.12.0` 版本改动导致的响应式和控制台告警的问题 @Wesley-0808 ([#5414](https://github.com/Tencent/tdesign-vue-next/pull/5414))
- `Cascader`:
  - 修复下拉面板默认存在边距的问题 @reallimengzhe ([#5427](https://github.com/Tencent/tdesign-vue-next/pull/5427))
  - 修复选项存在超长文字时，在不同尺寸下显示异常的问题 @Shabi-x @uyarn ([#5373](https://github.com/Tencent/tdesign-vue-next/pull/5373))
- `ColorPicker`: @RylanBot
  - 修复添加最近使用颜色功能异常的问题 ([#5428](https://github.com/Tencent/tdesign-vue-next/pull/5428))
  - 开启透明通道时的返回值格式化异常 ([#5319](https://github.com/Tencent/tdesign-vue-next/pull/5319))
- `Comment`: 插槽内容渲染错误 @QuentinHsu ([#5446](https://github.com/Tencent/tdesign-vue-next/pull/5446))
- `DatePicker`: 修复 `label` 插槽无效的问题 @RSS1102 ([#5393](https://github.com/Tencent/tdesign-vue-next/pull/5393))
- `DateRangePicker`: 修复缺少 `readonly` 类型定义的问题 @Wesley-0808 ([#5430](https://github.com/Tencent/tdesign-vue-next/pull/5430))
- `Drawer`: 修复 `DrawerPlugin` 返回实例类型错误的问题 @Wesley-0808 ([#5444](https://github.com/Tencent/tdesign-vue-next/pull/5444))
- `RadioGroup`: @betavs ([#5417](https://github.com/Tencent/tdesign-vue-next/pull/5417))
  - 修复阻止默认行为时机错误导致无法正确输入空格的问题
  - 修复键盘操作时重复触发 `onChange` 事件的问题
- `Select`: 修复 `valueType` 为 `object` 且与 `keys` 同时设置时，选择绑定值错误的问题 @morningbao ([#5374](https://github.com/Tencent/tdesign-vue-next/pull/5374))
- `Space`:
  - 修复嵌套组件情况下，样式被错误应用的问题 @RylanBot ([#5418](https://github.com/Tencent/tdesign-vue-next/pull/5418))
  - 修复`fragment`虚拟节点未展开的问题 @QuentinHsu ([#5388](https://github.com/Tencent/tdesign-vue-next/pull/5388))
  - 修复`Teleport`结构意外渲染为`SpaceItem`节点，导致额外占用间距的问题 @QuentinHsu ([#5388](https://github.com/Tencent/tdesign-vue-next/pull/5388))
- `Tag`: 修复 `max-width` 未设置不渲染 `title` 属性的问题 @betavs ([#5413](https://github.com/Tencent/tdesign-vue-next/pull/5413))
- `Textarea`: 修复 `autosize` 模式下初始高度计算不正确的问题 @RSS1102 ([#5451](https://github.com/Tencent/tdesign-vue-next/pull/5451))
- `Keyboard`: 修复 `Dialog`、 `Drawer` 或 `其他弹窗组件` 组合使用场景，使用`ESC`按键关闭弹窗冲突的问题 @Wesley-0808 ([#5143](https://github.com/Tencent/tdesign-vue-next/pull/5143))

### 🚧 Others

- `TagInput`: 优化 `TagInput` 处理空值的逻辑 @yuhengshen ([#5357](https://github.com/Tencent/tdesign-vue-next/pull/5357))

## 🌈 1.12.0 `2025-04-24`

### 🚀 Features

- `Breadcrumb`: 新增 `ellipsis`、`maxItems`、`itemsAfterCollapse`、`itemsBeforeCollapse` 相关 API，用于折叠面包屑的场景，具体使用请参考文档示例 @Wesley-0808 ([#5261](https://github.com/Tencent/tdesign-vue-next/pull/5261))
- `ColorPicker`: 新增 `onClear` 清除按钮事件回调 @mikasayw ([#5109](https://github.com/Tencent/tdesign-vue-next/pull/5109))
- `DatePicker`: 新增 `readonly` 属性，用于只读配置 @mikasayw ([#5293](https://github.com/Tencent/tdesign-vue-next/pull/5293))
- `Drawer`:
  - 新增 `DrawerPlugin`，支持`插件函数式`调用 @Wesley-0808 ([#5067](https://github.com/Tencent/tdesign-vue-next/pull/5067))
  - 新增 `drawerClassName` API，用于定义抽屉本身的相关类名 @Wesley-0808 ([#5067](https://github.com/Tencent/tdesign-vue-next/pull/5067))
- `Form`: 新增 `requiredMarkPosition`，可定义必填符号的位置 @Wesley-0808 ([#5223](https://github.com/Tencent/tdesign-vue-next/pull/5223))
- `Icon`: 新增 `logo-miniprogram` 小程序、`logo-cnb` 云原生构建、`seal` 印章、`quote` 引号等图标 @taowensheng1997 @uyarn @RADWIMPS426 ([#5355](https://github.com/Tencent/tdesign-vue-next/pull/5355))
- `Select`: 取消勾选面板中的已选项时触发 `remove` 事件回调 @QuentinHsu ([#5333](https://github.com/Tencent/tdesign-vue-next/pull/5333))
- `Swiper`: 新增 `cardScale`，支持自定义卡片模式下的缩放比例 @joinmouse ([#5272](https://github.com/Tencent/tdesign-vue-next/pull/5272))
- `Upload`: `image-flow` 模式下支持自定义错误文本 @ngyyuusora ([#5326](https://github.com/Tencent/tdesign-vue-next/pull/5326))

### 🐞 Bug Fixes

- `ColorPicker`: 修复切换颜色无效的问题 @mikasayw ([#5282](https://github.com/Tencent/tdesign-vue-next/pull/5282))
- `Drawer`: 优化拖拽调整大小的过程中，Drawer 页内容会被选中的问题 @joinmouse ([#5233](https://github.com/Tencent/tdesign-vue-next/pull/5233))
- `DatePicker`: 修复 `readonly`为 `true` 时， `clearable` 仍然生效的问题 @xiaojueshi ([#5303](https://github.com/Tencent/tdesign-vue-next/pull/5303)) ([#5305](https://github.com/Tencent/tdesign-vue-next/pull/5305))
- `InputNumber`:
  - 修复`tips`插槽重复渲染的问题 @mikasayw ([#5286](https://github.com/Tencent/tdesign-vue-next/pull/5286))
  - 优化数字输入框的边界问题 @Sight-wcg([#5358](https://github.com/Tencent/tdesign-vue-next/pull/5358))
- `Menu`: 修复 `menu-item` 的 `onClick` 事件触发两次的问题 @RSS1102 ([#5235](https://github.com/Tencent/tdesign-vue-next/pull/5235))
- `Select`:
  - 修复 `tips` 插槽无效的问题 @liweijie0812 ([#5250](https://github.com/Tencent/tdesign-vue-next/pull/5250))
  - 修复当 `check-all` 为空字符串时的效果异常的问题 @betavs ([#5221](https://github.com/Tencent/tdesign-vue-next/pull/5221))
  - 修复`1.11.x`版本中，未设置 `label` 时选项展示异常的问题 @RSS1102 ([#5257](https://github.com/Tencent/tdesign-vue-next/pull/5257))
  - 修复多选场景下 `onEnter` 回调参数丢失的问题，同时保持多选单选回车交互逻辑一致 @uyarn ([#5361](https://github.com/Tencent/tdesign-vue-next/pull/5361))
  - 修复 `keys` 属性配置 `content` 作为 value 时不生效问题 @hello-ishine ([#5199](https://github.com/Tencent/tdesign-vue-next/pull/5199))
- `Table`:
  - 修复当 `reserveSelectedRowOnPaginate` 为`false` 时，没有正确返回全选当前页数据的问题 @RSS1102 ([#5248](https://github.com/Tencent/tdesign-vue-next/pull/5248))
  - 修复 column 的 `checkProps` 未配置导致的点击行选中行为异常的问题 @uyarn ([#5362](https://github.com/Tencent/tdesign-vue-next/pull/5362))
- `Select`: 修复多选场景下无法通过键盘操作选中全选选项的问题 @uyarn ([#5361](https://github.com/Tencent/tdesign-vue-next/pull/5361))
- `Swiper`: 优化默认容器高度，避免 navigator 位置异常的问题 @uyarn ([#5278](https://github.com/Tencent/tdesign-vue-next/pull/5278))
- `Tabs`:
  - 优化路由切换过程中，Tabs 未初始化出现卸载错误的场景 @RSS1102 ([#5359](https://github.com/Tencent/tdesign-vue-next/pull/5359))
  - 优化选项卡存在超长 label 时的滑动效果 @wonkzhang([#5316](https://github.com/Tencent/tdesign-vue-next/pull/5316))
- `Textarea`: 调整 focus 时机延迟到组件完全渲染之后 @RSS1102 ([#5153](https://github.com/Tencent/tdesign-vue-next/pull/5153))
- `TreeSelect`: 修复当 `valueType='object'` 时无初始化选中数据时产生意外错误 @RSS1102 ([#5322](https://github.com/Tencent/tdesign-vue-next/pull/5322))

### 📝 Documentation

- `Swiper`: 优化组件跳转沙箱演示缺失示例样式的问题 @uyarn ([#5278](https://github.com/Tencent/tdesign-vue-next/pull/5278))
- `Dialog`: 优化文档内容，统一内容描述 @Wesley-0808 ([#5067](https://github.com/Tencent/tdesign-vue-next/pull/5067))

## 🌈 1.11.5 `2025-03-25`

### 🐞 Bug Fixes

- `Table`:
  - 修复表格内容未渲染时，设置 `drag-sort` 拖动事件报错的问题 @RSS1102 ([#5224](https://github.com/Tencent/tdesign-vue-next/pull/5224))
  - 修复 `Table` 展开的详细内容文字无法被选中的问题 @RSS1102 ([#5224](https://github.com/Tencent/tdesign-vue-next/pull/5224))
  - 修复可选中行表格在火狐浏览器中的样式异常问题 @uyarn([#5225](https://github.com/Tencent/tdesign-vue-next/pull/5225))
- `Menu`: 修复 `menu-item` 的 `props` 中 `to` 定义时缺少 `string` 类型的问题 @calandnong ([#5198](https://github.com/Tencent/tdesign-vue-next/pull/5198))
- `TreeSelect`: 修复 `panelTopContent` 和 `panelBottomContent` 的定义缺失问题 @uyarn ([#5220](https://github.com/Tencent/tdesign-vue-next/pull/5220))
- `Bundle`: 修复`1.11.0` 版本的 `esm` 产物的使用问题 @zhangpaopao0609 ([#5192](https://github.com/Tencent/tdesign-vue-next/pull/5192))

## 🌈 1.11.4 `2025-03-15`

### 🚀 Features

- `Button`: 默认 `shape` 补充相关类名,方便相关定制 @Saraph1nes ([#5187](https://github.com/Tencent/tdesign-vue-next/pull/5187))

### 🐞 Bug Fixes

- `Table` : 修复 `1.11.3` 版本中浮层向上状态时的箭头位置异常问题 @uyarn ([common#2088](https://github.com/Tencent/tdesign-common/pull/2088))
- `Plugin`: 修复 `WebStorm` 中 DescriptionsItem 组件的提示问题 @liweijie0812 ([#5182](https://github.com/Tencent/tdesign-vue-next/pull/5182))

## 🌈 1.11.3 `2025-03-13`

### 🚀 Features

- `ConfigProvider`: 新增支持 `@tdesign-vue-next/chat` 的国际化配置能力 @uyarn @zydemail
  ([#5179](https://github.com/Tencent/tdesign-vue-next/pull/5179))

### 🐞 Bug Fixes

- `Dialog`: 修复自定义 `cancelBtn` 文本时仍保留 `t-dialog__cancel` 样式问题 @RSS1102 ([#5157](https://github.com/Tencent/tdesign-vue-next/pull/5157))
- `Table`: 修复表格内容未渲染时，设置`drag-sort` 拖动事件报错的问题 @Wesley-0808 ([#5140](https://github.com/Tencent/tdesign-vue-next/pull/5140))
- `Select`: 修复使用 `filter` 时无需设置 `filterable` @RSS1102 ([#5169](https://github.com/Tencent/tdesign-vue-next/pull/5169))
- `DatePicker`: 修复日期禁用范围错误 @RSS1102 ([#5119](https://github.com/Tencent/tdesign-vue-next/pull/5119))
- `ColorPicker`: 修复点击清除按钮未触发 `onChange` 回调问题 @wakisun ([#5111](https://github.com/Tencent/tdesign-vue-next/pull/5111))
- `Select`: 修复当 `valueType = 'object'` 时，在有已选择数据的情况下筛选数据，全选产生错误 Tag 显示的问题。 @RSS1102 ([#5167](https://github.com/Tencent/tdesign-vue-next/pull/5167))
- `DatePicker`: 修复 `prefixIcon` 插槽告警的问题 @uyarn ([#5179](https://github.com/Tencent/tdesign-vue-next/pull/5179))
- `Bundle` : 修复产物中部分类型文件路径异常的问题 @zhangpaopao0609 ([#5174](https://github.com/Tencent/tdesign-vue-next/pull/5174))

## 🌈 1.11.2 `2025-03-05`

### 🚀 Features

- `ImageViewer`: 新增`imageReferrerpolicy`API，适用于配置 Referrerpolicy 的场景 @Wesley-0808 ([#5134](https://github.com/Tencent/tdesign-vue-next/pull/5134))
- `ImageViewer`: 新增`onDownload`API，用于自定义下载回调 @Wesley-0808 ([#5134](https://github.com/Tencent/tdesign-vue-next/pull/5134))

### 🐞 Bug Fixes

- `Dialog`: 修复`1.11.0`版本`footer`内容不能动态变更的问题 @Wesley-0808 ([#5152](https://github.com/Tencent/tdesign-vue-next/pull/5152))

### 🚧 Others

- `helper`: 修复部分组件在 `Webstorm` 提示异常的问题 @liweijie0812 ([#5136](https://github.com/Tencent/tdesign-vue-next/pull/5136))

## 🌈 1.11.1 `2025-03-01`

### 🐞 Bug Fixes

- `bundle`: 修复`1.11.0`版本 `cjs` 产物的依赖报错问题 @uyarn ([#5116](https://github.com/Tencent/tdesign-vue-next/pull/5116))
- `List`: 修复`1.11.0`版本`scrollTo`实例方法异常的问题 @uyarn ([#5117](https://github.com/Tencent/tdesign-vue-next/pull/5117))
- `Dialog`: 修复`1.11.0`版本控制台报错问题 @Wesley-0808 ([#5126](https://github.com/Tencent/tdesign-vue-next/pull/5126))
- `Table`: 修复按下`Ctrl C`复制快捷键导致清空选中行的问题 @Wesley-0808 ([#5124](https://github.com/Tencent/tdesign-vue-next/pull/5124))

## 🌈 1.11.0 `2025-02-27`

### 🚀 Features

- `AutoComplete`: 新增 `empty` API，用于配置空状态下的下拉内容展示 @liweijie0812 ([#4908](https://github.com/Tencent/tdesign-vue-next/pull/4908))
- `Dialog`: 新增`dialogCard`组件，用于非脱离文档流场景 @Wesley-0808 ([#5002](https://github.com/Tencent/tdesign-vue-next/pull/5002))
- `Table`: 新增`validateTableCellData`实例方法，用于校验表格可编辑单元格数据 @Wesley-0808 ([#5105](https://github.com/Tencent/tdesign-vue-next/pull/5105))

### 🐞 Bug Fixes

- `Select`:
  - 默认搜索方法优先展示全等项 @Cat1007 ([#5051](https://github.com/Tencent/tdesign-vue-next/pull/5051))
  - 多选情况下点击清除按钮重复触发 `change` 事件的问题 @betavs ([#5092](https://github.com/Tencent/tdesign-vue-next/pull/5092))
  - 修复可过滤场景下存在全选选项时，全选行为的异常 @RSS1102 @uyarn ([#5104](https://github.com/Tencent/tdesign-vue-next/pull/5104))
- `Tree`: 修复动态切换 `expandAll` 的功能异常问题 @RSS1102 ([#4988](https://github.com/Tencent/tdesign-vue-next/pull/4988))
- `Form`: 修复 `status` 属性没有应用到校验状态上的问题 @RSS1102 ([#5008](https://github.com/Tencent/tdesign-vue-next/pull/5008))
- `Statistic`: 修复 decimalPlaces=0 时数值动画期间精度错误的问题 @liweijie0812 ([#5055](https://github.com/Tencent/tdesign-vue-next/pull/5055))
- `TreeSelect`: 首次渲染时自动展开选定节点 @RSS1102 ([#5003](https://github.com/Tencent/tdesign-vue-next/pull/5003))

### 📝 Documentation

- `docs`: `ConfigProvider` 增加 `globalConfig` API 文档，`Layout` 子组件 `Content` 新增 API 文档 @liweijie0812 ([#5090](https://github.com/Tencent/tdesign-vue-next/pull/5090))
- `docs`: 全局配置页面路由修改为`config-provider`，与其他组件保持一致 @liweijie0812 ([#5090](https://github.com/Tencent/tdesign-vue-next/pull/5090))

### 🚧 Others

- `plugin`: 新增`ConfigProvider`、`Typography` 等组件的编辑器提示功能 @liweijie0812 ([#5090](https://github.com/Tencent/tdesign-vue-next/pull/5090))
- `dependency`: 调整组件依赖 `lodash` 为 `lodash-es` @zhangpaopao0609 ([#4959](https://github.com/Tencent/tdesign-vue-next/pull/4959))

## 🌈 1.10.7 `2025-01-24`

### 🚀 Features

- `Icon`: 新增`logo-alipay`、`logo-behance-filled`等图标，修改`logo-wecom`图标，移除不合理的`logo-wecom-filled`图标 @uyarn ([#4926](https://github.com/Tencent/tdesign-vue-next/pull/4926))
- `Table`: 支持 `scrollToElement` 方法在非虚拟滚动的情况下使用 @Cat1007 ([#4946](https://github.com/Tencent/tdesign-vue-next/pull/4946))
- `DatePicker`: 新增`multiple` API，用于支持多选场景，具体使用请参考示例 @uyarn ([#4854](https://github.com/Tencent/tdesign-vue-next/pull/4854))

### 🐞 Bug Fixes

- `Select`:
  - 修复分组情况下标题不存在 `group` 的渲染报错的问题 @RSS1102 ([#4896](https://github.com/Tencent/tdesign-vue-next/pull/4896))
  - 修复 `option value` 为 `boolean` 时控制台类型错误警告 @SaberA1ter ([#4932](https://github.com/Tencent/tdesign-vue-next/pull/4932))
  - 修复使用`empty` API 自定义空状态内容缺失默认样式的问题 @liweijie0812 ([#4909](https://github.com/Tencent/tdesign-vue-next/pull/4909))
  - 修复全选配合选项 `disabled` 状态使用的错误问题 @msg-fobbit ([#4947](https://github.com/Tencent/tdesign-vue-next/pull/4947))
- `Progress`: 修复 `progress` 为 100 时，`status` 无效的问题 @rofixro ([#4895](https://github.com/Tencent/tdesign-vue-next/pull/4895))
- `AutoComplete`: 修复选项为空时显示效果异常的问题 @betavs ([#4907](https://github.com/Tencent/tdesign-vue-next/pull/4907))
- `Breadcrumb`: 修复 `herf` 和 `to` 同时存在时点击后会先后触发 @rofixro ([#4916](https://github.com/Tencent/tdesign-vue-next/pull/4916))
- `Table`: 修复不支持默认的键盘横向操作滚动宽表格的问题 @uyarn ([#4904](https://github.com/Tencent/tdesign-vue-next/pull/4904))
- `ImageViewer`: 修复开启 `closeOnOverlay` 时，点击蒙层关闭存在闪烁情况的问题 @huangchen1031 ([#4931](https://github.com/Tencent/tdesign-vue-next/pull/4931))
- `ColorPicker`: 修复支持渐变模式下，第一次打开时 `tabs` 位置没有跟随变化的问题 @natural1024 ([#4903](https://github.com/Tencent/tdesign-vue-next/pull/4903))
- `Cascader`: 修复某一级的 `children` 长度为 `1` 时导致的样式错误问题 @msg-fobbit ([#4951](https://github.com/Tencent/tdesign-vue-next/pull/4951))
- `Tabs`: 修复可滑动`Tabs`配合`action`使用的样式问题 @Wesley-0808 ([#4953](https://github.com/Tencent/tdesign-vue-next/pull/4953))
- `DatePicker`: 修复日期范围选择器在跨年场景下，周模式选中范围样式缺失的问题 @uyarn ([#4854](https://github.com/Tencent/tdesign-vue-next/pull/4854))

### 📝 Documentation

- `Loading`: 移除重复的示例 @RSS1102 ([#4949](https://github.com/Tencent/tdesign-vue-next/pull/4949))
- `Descriptions`: 添加对于 `labelStyle` 的使用说明 @RSS1102 ([#4950](https://github.com/Tencent/tdesign-vue-next/pull/4950))
- `Plugin`: 更新插件提示内容 @liweijie0812 ([#4892](https://github.com/Tencent/tdesign-vue-next/pull/4892))

## 🌈 1.10.6 `2024-12-31`

### 🚀 Features

- `List`: 新增`scrollTo`方法，支持滚动到指定元素，可参考示例使用 @natural1024 ([#4863](https://github.com/Tencent/tdesign-vue-next/pull/4863))
- `Radio`: 新增 `theme` API，用于决定 `options` 方式渲染的 `Radio` 样式 @myronliu347 @liweijie0812 ([#4872](https://github.com/Tencent/tdesign-vue-next/pull/4872))

### 🐞 Bug Fixes

- `Table`:
  - 修复 `isFilterValueExist` 无法正常处理 `null` 值导致无法正常清除筛选的问题 @HHaoWang ([#4829](https://github.com/Tencent/tdesign-vue-next/pull/4829))
  - 修复 `filterIcon` 不生效 @liweijie0812 ([#4837](https://github.com/Tencent/tdesign-vue-next/pull/4837))
  - 修复 `1.10.0` 版本的 `updateEditedCellValue` 的功能异常问题 @uyarn ([#4869](https://github.com/Tencent/tdesign-vue-next/pull/4869))
  - 修复删除行操作后使用 `validateTableData` 方法进行校验仍存在删除行的问题 @uyarn ([#4878](https://github.com/Tencent/tdesign-vue-next/pull/4878))
- `Cascader`:
  - 当 `valueType` 为 `full` 时会意外触发 `change` 事件 @betavs ([#4870](https://github.com/Tencent/tdesign-vue-next/pull/4870))
  - 校验无效值逻辑错误并优化代码 @betavs ([#4870](https://github.com/Tencent/tdesign-vue-next/pull/4870))
- `Dialog`:
  - 当 `header` 和 `closeBtn` 都为 `false` 时，不渲染 `header dom` @chensid @ylunwang ([#4841](https://github.com/Tencent/tdesign-vue-next/pull/4841))
  - 修复`1.10.4`版本后`closeOnClickOverlay`默认开启行为和挂载`body`行为的缺失问题 @uyarn ([#4877](https://github.com/Tencent/tdesign-vue-next/pull/4877))
- `Swiper`: 修复 `autopaly=false`, 修改 `current` 无效 @liweijie0812 ([#4845](https://github.com/Tencent/tdesign-vue-next/pull/4845))
- `Upload`: 上传组件图片展示样式优化 @huangchen1031 ([#4853](https://github.com/Tencent/tdesign-vue-next/pull/4853))
- `Slider`: 滑块可以正常在移动端设备中拖动 @zd5043039119 ([#4860](https://github.com/Tencent/tdesign-vue-next/pull/4860))
- `DatePicker`: 优化日期范围选择面板初始化展示的逻辑，保持右侧面板大于左侧面板 @uyarn ([#4879](https://github.com/Tencent/tdesign-vue-next/pull/4879))
- `DateRangePicker`: 修复开始结束值同时存在的逻辑判断错误问题 @betavs ([#4868](https://github.com/Tencent/tdesign-vue-next/pull/4868))
- `Tree`: 修复使用`keys`定义`value`无法配合 `scrollTo` 一起使用的问题 @uyarn ([#4880](https://github.com/Tencent/tdesign-vue-next/pull/4880))

### 📝 Documentation

- `Tree`: 新增关于唯一键值不可重复的问题 FAQ @RSS1102 @uyarn ([#4852](https://github.com/Tencent/tdesign-vue-next/pull/4852))

## 🌈 1.10.5 `2024-12-10`

### 🚀 Features

- `TimePicker`: 支持 `readonly` 属性 @RSS1102 ([#4812](https://github.com/Tencent/tdesign-vue-next/pull/4812))
- `DatePicker`: 支持 `readonly` 属性 @RSS1102 ([#4790](https://github.com/Tencent/tdesign-vue-next/pull/4790))

### 🐞 Bug Fixes

- `Tabs`:
  - 修正渲染函数导致的生产版本错误 @Cat1007 ([#4787](https://github.com/Tencent/tdesign-vue-next/pull/4787))
  - 优化 `scale` 下的指示器宽度错位的问题 @Cat1007 ([#4786](https://github.com/Tencent/tdesign-vue-next/pull/4786))
- `Transfer`:
  - 修复树形组件选项禁用在全选下仍可选中的缺陷 @uyarn ([#4810](https://github.com/Tencent/tdesign-vue-next/pull/4810))
  - 修复拖拽排序向后移动的功能异常 @uyarn ([#4810](https://github.com/Tencent/tdesign-vue-next/pull/4810))
- `Table`:
  - 修复可分页的表格设置`size` 分页组件没有跟随变化的问题 @uyarn ([#4828](https://github.com/Tencent/tdesign-vue-next/pull/4828))
  - 修复 `enhanced-table` `disableDataPage` 属性传值问题 @lxzlx624 ([#4781](https://github.com/Tencent/tdesign-vue-next/pull/4781))
- `Dropdown`: 示例里 `prefixIcon` 字段应该调整为函数形式 @Lnncoco ([#4769](https://github.com/Tencent/tdesign-vue-next/pull/4769))
- `Pagination`: 增加`class`方便区分组件状态 @uyarn ([#4828](https://github.com/Tencent/tdesign-vue-next/pull/4828))
- `ColorPicker`: 修复 `colorMode` 文案国际化 @liweijie0812 ([#4778](https://github.com/Tencent/tdesign-vue-next/pull/4778))
- `Dropdown`: 当 `options` 为空时，控制台报错的问题 @betavs ([#4785](https://github.com/Tencent/tdesign-vue-next/pull/4785))
- `Drawer`: 修复 `closeOnOverlayClick` 属性默认值为 `true` 导致全局参数无法设置的问题 () @PengYYYYY ([#4801](https://github.com/Tencent/tdesign-vue-next/pull/4801))
- `DatePicker`: 修正 `needConfirm` 为 `false` 的场景下，`preset` 选择失效的问题 @Cat1007 ([#4792](https://github.com/Tencent/tdesign-vue-next/pull/4792))
- `Input`: 修复在 `Form` 设置全局只读下，组件的状态异常问题 @xiaojueshi ([#4818](https://github.com/Tencent/tdesign-vue-next/pull/4818))
- `Tree`: 修复树开启虚拟滚动后容器宽度发生变化会导致回滚到顶部的问题 @uyarn ([#4826](https://github.com/Tencent/tdesign-vue-next/pull/4826))

### 📝 Documentation

- `Chat`: 增加高阶组件 `AI Chat 对话` 入口 @zydemail ([#4777](https://github.com/Tencent/tdesign-vue-next/pull/4777))

## 🌈 1.10.4 `2024-11-20`

### 🚀 Features

- `Icon`: @uyarn ([#4729](https://github.com/Tencent/tdesign-vue-next/pull/4729))
  - 图标库发布 `0.4.0`版本，新增 907 个新图标
  - 命名优化，`blockchain` 重命名改为 `transform-1`，`gesture-pray-1` 重命名为 `gesture-open`，`gesture-ranslation-1` 重命名为 `wave-bye`， `gesture-up-1` 重命名为 `gesture-typing`，`gesture-up-2` 重命名为`gesture-right-slip`，`logo-wechat` 重命名为`logo-wechat-stroke-filled`
  - 移除 `tree-list`、`logo-adobe-photoshop-1` 等错误图标
- `Nuxt` : `@tdesign-vue-next/nuxt` 发布 `0.1.5` 版本, 自动导入 `Typography`、`Empty` 组件和新图标
- `Switch`: 新增 `before-change` API , 用于需要发起异步请求的场景 @centuryPark ([#4699](https://github.com/Tencent/tdesign-vue-next/pull/4699))
- `Cascader`: 单选模式下当 `trigger` 为 `hover` 时，选中选项后自动关闭面板 @uyarn ([#4717](https://github.com/Tencent/tdesign-vue-next/pull/4717))
- `Checkbox`: 新增 `title` API，用于在选项展示禁用原因等场景 @liweijie0812 ([#4737](https://github.com/Tencent/tdesign-vue-next/pull/4737))
- `RadioGroup`: 新增 `readonly` API @liweijie0812 ([#4737](https://github.com/Tencent/tdesign-vue-next/pull/4737))
- `Form`: 全部 `readonly`API 默认值改 undefined ，修复表单 `readonly` 为 true，表单输入类组件 `readonly` 为 false 时的表现异常问题 @liweijie0812 ([#4737](https://github.com/Tencent/tdesign-vue-next/pull/4737))
- `AnchorItem`: 新增 `customScroll API`，支持关闭默认滚动动画，由用户可自定义锚点滚动的行为 @boogie-ben ([#4386](https://github.com/Tencent/tdesign-vue-next/pull/4386))
- `Dialog`: 新增 API `BeforeOpen` 对话框执行打开动画效果前触发，`BeforeClose` 对话框执行消失动画效果前触发 @Wesley-0808 ([#4733](https://github.com/Tencent/tdesign-vue-next/pull/4733))
- `Drawer`: 新增 API `BeforeOpen` 抽屉执行打开动画效果前触发，`BeforeClose` 抽屉执行关闭动画效果前触发 @Wesley-0808 ([#4733](https://github.com/Tencent/tdesign-vue-next/pull/4733))

### 🐞 Bug Fixes

- `Input`:
  - 修复 `AutoWidth` 状态下，使用中文输入法时，`InputPreValue` 不会更新为输入值的问题 @Wesley-0808 ([#4688](https://github.com/Tencent/tdesign-vue-next/pull/4688))
  - 优化 `scale` 下的自动宽度错位的问题 @Cat1007 ([#4713](https://github.com/Tencent/tdesign-vue-next/pull/4713))
  - 修复 `1.10.3` 版本引入的 `autowidth` 在 `transform` 容器下的展示不全问题 @Cat1007 ([#4754](https://github.com/Tencent/tdesign-vue-next/pull/4754))
- `TreeSelect`:
  - 修复异步加载且 `valueType="object"` 情况下，`v-model` 报错 @ylunwang ([#4734](https://github.com/Tencent/tdesign-vue-next/pull/4734))
  - 修复异步加载且 `valueMode="onlyLeaf"` 情况下的选中逻辑 ([common#1976](https://github.com/Tencent/tdesign-common/pull/1976)) @ylunwang ([#4734](https://github.com/Tencent/tdesign-vue-next/pull/4734))
- `Menu`:
  - `menu-group` 的 `title` 插槽无效 @chensid ([#4755](https://github.com/Tencent/tdesign-vue-next/pull/4755))
  - 修复当项目不包含 `vue-router` 时，会产生额外的 `warning` @dsh0416 ([#4719](https://github.com/Tencent/tdesign-vue-next/pull/4719))
- `TagInput`: 修复在 `readonly` 模式下仍可以通过 `Backspace` 按键删除已选项的缺陷 @RSS1102 ([#4696](https://github.com/Tencent/tdesign-vue-next/pull/4696))
- `Avatar`: 头像链接切换后，清除上一张图片加载失败的占位符 @Cat1007 ([#4724](https://github.com/Tencent/tdesign-vue-next/pull/4724))
- `ColorPicker`: 最近使用颜色需要选中才能删除 @superNos ([#4720](https://github.com/Tencent/tdesign-vue-next/pull/4720))
- `Tabs`: `dialog` 中的 `tabs` 默认选中样式不正确 @chensid ([#4722](https://github.com/Tencent/tdesign-vue-next/pull/4722))
- `Cascader`: 修复当选项 `label` 非字符串时 `title` 渲染异常的问题 @uyarn ([#4759](https://github.com/Tencent/tdesign-vue-next/pull/4759))
- `InputNumber`: 修复 `largeNumber` 下 `format` 错误作用于 `value` 上的问题 @uyarn ([#4695](https://github.com/Tencent/tdesign-vue-next/pull/4695))

### 📝 Documentation

- `Icon`: 优化图标检索功能，支持中英文搜索图标 @uyarn ([#4729](https://github.com/Tencent/tdesign-vue-next/pull/4729))

## 🌈 1.10.3 `2024-10-27`

### 🚀 Features

- `TimePicker`: 新增 `autoSwap` API，支持`1.10.2` 版本之后仍支持保持选定的左右侧时间大小顺序 @uyarn ([#4662](https://github.com/Tencent/tdesign-vue-next/pull/4662))
- `Select`: `valueDisplay` 增加`label`参数 @uyarn ([#4645](https://github.com/Tencent/tdesign-vue-next/pull/4645))

### 🐞 Bug Fixes

- `Select`:
  - 修复使用虚拟滚动配合过滤加自定义渲染内容时渲染异常的问题 @uyarn ([#4677](https://github.com/Tencent/tdesign-vue-next/pull/4677))
  - 修复可过滤场景下回车键会清空输入框的错误交互行为 @uyarn ([#4677](https://github.com/Tencent/tdesign-vue-next/pull/4677))
  - 部分节点事件增加容错判断 @uyarn ([#4677](https://github.com/Tencent/tdesign-vue-next/pull/4677))
  - 修复 `loading` 配合触底事件 `onScrollToBottom` 一起使用的问题 @lllllllqw ([#4625](https://github.com/Tencent/tdesign-vue-next/pull/4625))
- `Descriptions`:
  - 修复 `layout`为 `vertical` 下的设置 `span`的展示问题 @zhangpaopao0609 ([#4656](https://github.com/Tencent/tdesign-vue-next/pull/4656))
  - 修复 `span` 大于 `column` 配置的渲染问题 @zhangpaopao0609 ([#4656](https://github.com/Tencent/tdesign-vue-next/pull/4656))
- `Tree`: 修复没有子节点时，自定义图标无法点击 @RSS1102 ([#4638](https://github.com/Tencent/tdesign-vue-next/pull/4638))
- `Space`: 修复使用`v-if`的情况下存在冗余空格的问题 @Luffy-developer ([#4663](https://github.com/Tencent/tdesign-vue-next/pull/4663))
- `InputNumber`: 禁用时焦点事件仍然会触发的问题 @betavs ([#4661](https://github.com/Tencent/tdesign-vue-next/pull/4661))
- `DatePicker`: panel top arrow doesn't work when using week mode @RSS1102 ([#4673](https://github.com/Tencent/tdesign-vue-next/pull/4673))
- `Table`: 多级表头下的通过 colspan 合并表头 @wangyang0210 ([#4669](https://github.com/Tencent/tdesign-vue-next/pull/4669))
- `Input`: 修复 Input type="number" 时，无法输入小数位末尾 0 的问题 @wilonjiang ([#4660](https://github.com/Tencent/tdesign-vue-next/pull/4660))
- `Drawer`: 修复打开 `drawer` 时页面抖动的问题 @uyarn ([#4671](https://github.com/Tencent/tdesign-vue-next/pull/4671))
- `Dialog`: 修复打开 `dialog` 时页面抖动的问题 @RSS1102 @uyarn ([#4671](https://github.com/Tencent/tdesign-vue-next/pull/4671))

### 📝 Documentation

- `Tree`: 修复`valueMode` API 的拼写错误问题 @Simon-He95 ([#4622](https://github.com/Tencent/tdesign-vue-next/pull/4622))
- `Docs`: 修复`Codesandbox`示例启动失败或需要打开 devbox 才可以运行的问题 @RSS1102 ([#4610](https://github.com/Tencent/tdesign-vue-next/pull/4610))

### 🚧 Others

- `Table`: 修复`table`的 API 文档中多余的`。` @Wesley-0808 ([#4683](https://github.com/Tencent/tdesign-vue-next/pull/4683))

## 🌈 1.10.2 `2024-09-27`

### 🚀 Features

- `Table`: 可展开收起场景下新增 `t-table__row--expanded` 和 `t-table__row--folded` 用于区分展开和收起的行 @uyarn ([#4586](https://github.com/Tencent/tdesign-vue-next/pull/4586))
- `Rate`: 新增`clearable` API, 用于支持清空评分 @uyarn ([#4603](https://github.com/Tencent/tdesign-vue-next/pull/4603))
- `TimePicker`: 支持时间区间选择器自动调整左右区间 @uyarn ([#4606](https://github.com/Tencent/tdesign-vue-next/pull/4606))
- `i18n`: 国际化新增 意大利语 `it_IT` 俄语 `ru_RU` @liweijie0812 ([#4592](https://github.com/Tencent/tdesign-vue-next/pull/4592))

### 🐞 Bug Fixes

- `Select`:
  - 修复选项的 title 为空字符串或置空时的渲染效果 @uyarn ([#4602](https://github.com/Tencent/tdesign-vue-next/pull/4602))
  - 修复选中选项后没有正常触发`blur`事件的问题 @uyarn ([#4602](https://github.com/Tencent/tdesign-vue-next/pull/4602))
  - 修复当 `Form` 开启 `disabled`，`Select` 关闭 `disabled` 状态下选项仍然展示禁用的错误 @uyarn ([#4580](https://github.com/Tencent/tdesign-vue-next/pull/4580))
- `DatePicker`:
  - 修复周选择器下，年份边界日期返回格式错误的问题 @uyarn ([#4606](https://github.com/Tencent/tdesign-vue-next/pull/4606))
  - 优化周选择器配合 `firstDayOfWeek` 使用的问题，详情请参考周选择器示例代码 @uyarn ([#4606](https://github.com/Tencent/tdesign-vue-next/pull/4606))
- `TreeSelect`: 修复多选状态下默认点击父节点选项的行为为选中 @uyarn ([#4579](https://github.com/Tencent/tdesign-vue-next/pull/4579))
- `Tree`: 修复多选下配置 `expandOnClickNode` 后没有正确生效的问题 @uyarn ([#4579](https://github.com/Tencent/tdesign-vue-next/pull/4579))
- `Transfer`: `search` 事件缺少 `trigger` 参数 @betavs ([#4590](https://github.com/Tencent/tdesign-vue-next/pull/4590))
- `InputNumber`: 修复数字输入框小数位数类型定义错误问题，由 `String` 改为 `Number` 类型 @D-xuanmo ([#4599](https://github.com/Tencent/tdesign-vue-next/pull/4599))
- `RangInput`: 修复开启 `clearable ` 值为空报错 @liweijie0812 ([#4608](https://github.com/Tencent/tdesign-vue-next/pull/4608))
- `ConfigProvider`: 修复全局配置丢失响应式问题 @aolyang ([#4612](https://github.com/Tencent/tdesign-vue-next/pull/4612))
- `DateRangePicker`: 修复配置时间相关格式时，没有正确处理`defaultTime`的问题 @uyarn ([#4606](https://github.com/Tencent/tdesign-vue-next/pull/4606))
- `Upload`: 修复部分`theme`下禁用下链接不可点击的问题 @uyarn ([#4614](https://github.com/Tencent/tdesign-vue-next/pull/4614))
- `Drawer`: 优化非模态框的阴影样式 @RSS1102 @uyarn ([#4614](https://github.com/Tencent/tdesign-vue-next/pull/4614))
- `ColorPicker`: 修复设置`inputProps.width`导致的样式问题 @RyouSY @uyarn ([#4614](https://github.com/Tencent/tdesign-vue-next/pull/4614))
- `Typography`: 修复`title`的字体大小问题 @uyarn ([#4614](https://github.com/Tencent/tdesign-vue-next/pull/4614))
- `Swiper`: 修复分段式导航在暗色模式下箭头颜色不适配的问题 @uyarn ([#4614](https://github.com/Tencent/tdesign-vue-next/pull/4614))
- `ImageViewer`: 优化图片查看器默认的缩放比例，减少滚轮缩放效果的闪烁感 @RSS1102 ([#4583](https://github.com/Tencent/tdesign-vue-next/pull/4583))
- `Textarea`: 修复设置 `autosize` 且切换页面时组件异常的问题 @RSS1102 ([#4539](https://github.com/Tencent/tdesign-vue-next/pull/4539))

## 🌈 1.10.1 `2024-09-11`

### 🐞 Bug Fixes

- `Table`: 修复开启`ellipsis`配置的节点因为状态更新问题导致部分场景分页切换时存在异常的问题 @uyarn ([#4555](https://github.com/Tencent/tdesign-vue-next/pull/4555))

## 🌈 1.10.0 `2024-09-10`

### 🚀 Features

- `Empty`: 新增 `Empty` 空状态组件 @HaixingOoO ([#4519](https://github.com/Tencent/tdesign-vue-next/pull/4519))
- `Typography`: 新增 `Typography` 排版组件 @byq1213 ([#4293](https://github.com/Tencent/tdesign-vue-next/pull/4293))
- `Cascader`:
  - 新增级联面板支持自定义下拉选项内容的能力 @uyarn ([#4513](https://github.com/Tencent/tdesign-vue-next/pull/4513))
  - 新增 `panelTopContent` 和 `panelBottomContent` API @uyarn ([#4546](https://github.com/Tencent/tdesign-vue-next/pull/4546))
- `Form`:
  - 添加 `whitespace` 校验默认错误信息 @liweijie0812 ([#4508](https://github.com/Tencent/tdesign-vue-next/pull/4508))
  - 新增`id` API，表单原生的 `id` 属性，支持用于配合非表单内的按钮通过 `form` 属性来触发表单事件 @uyarn ([#4538](https://github.com/Tencent/tdesign-vue-next/pull/4538))
- `Tag`:
  - 新增 `title` API 控制鼠标悬停显示的文本 @liweijie0812 ([#4517](https://github.com/Tencent/tdesign-vue-next/pull/4517))
  - 修改  `maxWidth` 生效的 `dom` 节点，方便控制文本内容长度 @liweijie0812 ([#4532](https://github.com/Tencent/tdesign-vue-next/pull/4532))
- `ConfigProvider`: 新增 `descriptions.colonText` `rate.rateText` `setpes.checkIcon` 支持全局配置 @liweijie0812 ([#4476](https://github.com/Tencent/tdesign-vue-next/pull/4476))
- `RadioGroup`: `change` 事件回调添加 `name` 属性 @taninsist ([#4491](https://github.com/Tencent/tdesign-vue-next/pull/4491))
- `Button`: 新增 `form` API，原生的 `form` 属性，支持用于通过 `form` 属性触发对应 `id` 的 `form` 的表单事件 @uyarn ([#4538](https://github.com/Tencent/tdesign-vue-next/pull/4538))
- `InputNumber`: `decimalPlaces` 类型扩展，支持灵活的进位配置 @zhangpaopao0609 ([#4536](https://github.com/Tencent/tdesign-vue-next/pull/4536))

### 🐞 Bug Fixes

- `List`:
  - 修复使用虚拟滚动列表时使用 `v-if` 展示的场景容器未判空异常的问题 @zhengchengshi ([#4541](https://github.com/Tencent/tdesign-vue-next/pull/4541))
  - 修复 `list-item` 的 `props` 错误导致部分 `API` 不生效的问题 @summer-077 ([#4544](https://github.com/Tencent/tdesign-vue-next/pull/4544))
- `Tag`: 修复全局替换 `closeBtn` 图标的场景下报错的问题 @uyarn ([#4494](https://github.com/Tencent/tdesign-vue-next/pull/4494))
- `TimePicker`: 修复 `format` 仅支持 `HH:mm:ss` 格式的问题 @liweijie0812 ([#4505](https://github.com/Tencent/tdesign-vue-next/pull/4505))
- `Table`: 修复拖拽调整列宽之后超出省略样式丢失的问题 @uyarn ([#4545](https://github.com/Tencent/tdesign-vue-next/pull/4545))

### 🚧 Others

- `Table`: 修复分页文档的展示示例错误问题 @uyarn ([#4501](https://github.com/Tencent/tdesign-vue-next/pull/4501))
- `Menu`: 更新关于`MenuItem`的 `routerLink`的相关文档 @Nero978 ([#4543](https://github.com/Tencent/tdesign-vue-next/pull/4543))

## 🌈 1.9.9 `2024-08-16`

### 🚀 Features

- `RangeInput`: 支持无边框 `borderless` 模式 @liweijie0812 ([#4442](https://github.com/Tencent/tdesign-vue-next/pull/4442))
- `DateRangePicker`: 支持无边框 `borderless` 模式 @liweijie0812 ([#4442](https://github.com/Tencent/tdesign-vue-next/pull/4442))
- `TimeRangePicker`: 支持无边框 `borderless` 模式 @liweijie0812 ([#4442](https://github.com/Tencent/tdesign-vue-next/pull/4442))

### 🐞 Bug Fixes

- `Cascader`:
  - 修复点击清空按钮多次触发 `change` 事件的问题 @uyarn ([#4478](https://github.com/Tencent/tdesign-vue-next/pull/4478))
  - 修复在可过滤下输入值后未选中值时，点击清空按钮后错误选中选项的问题 @uyarn ([#4478](https://github.com/Tencent/tdesign-vue-next/pull/4478))
- `Tabs`:
  - 修复组件在全局替换图标下，存在替换组件 `event` 事件导致移除操作异常的问题 @uyarn ([#4485](https://github.com/Tencent/tdesign-vue-next/pull/4485))
  - 修复 `t-tabs__bar` 在 `dialog` 中的尺寸问题 @RyouSY ([#4438](https://github.com/Tencent/tdesign-vue-next/pull/4438))
- `Upload`: 修复部分图标不支持全局替换的问题 @uyarn ([#4434](https://github.com/Tencent/tdesign-vue-next/pull/4434))
- `Dialog`: 修复 `cancelBtn` 和 `confirmBtn` 设置为`null` 的类型问题 @chouchouji ([#4439](https://github.com/Tencent/tdesign-vue-next/pull/4439))
- `Input`: 修复 `maxlength` 不准确问题 @novlan1 ([#4429](https://github.com/Tencent/tdesign-vue-next/pull/4429))
- `TagInput`: 修复 `tagProps` 没有作用到折叠的标签上的缺陷 @uyarn ([#4465](https://github.com/Tencent/tdesign-vue-next/pull/4465))
- `Pagination`: 修复 `pagination` 在 `pageSize` 改变时，`onChange` 无法获取最新 `pageSize` 的问题 @1379255913 ([#4450](https://github.com/Tencent/tdesign-vue-next/pull/4450))
- `RangeInput`: 清空图标不能正常显示 @betavs ([#4453](https://github.com/Tencent/tdesign-vue-next/pull/4453))
- `Dropdown`: 修复由于没有动态计算导致使用方修改 `DropdownItem` 高度后计算位置错误的问题 @uyarn ([#4484](https://github.com/Tencent/tdesign-vue-next/pull/4484))
- `Table`: 修复拖拽排序时，祖先节点内的顺序错误的问题 @uyarn ([common#1880](https://github.com/Tencent/tdesign-common/pull/1880))
- `InputNumber`: 修复小数点精度计算，以 `0` 开头的计算边界逻辑缺失导致计算错误的问题 @uyarn ([common#1879](https://github.com/Tencent/tdesign-common/pull/1879))

### 🚧 Others

- `Progress`: TS 类型改名 `StatusEnum`=>`ProgressStatus`,`ThemeEnum`=>`ProgressTheme` @liweijie0812 ([#4426](https://github.com/Tencent/tdesign-vue-next/pull/4426))
- `RangeInput`: 增加 `liveDemo` @liweijie0812 ([#4442](https://github.com/Tencent/tdesign-vue-next/pull/4442))

## 🌈 1.9.8 `2024-07-23`

### 🚀 Features

- `Form`: 支持通过表单的`readonly`属性影响`TagInput`组件 @xiaojueshi ([#4370](https://github.com/Tencent/tdesign-vue-next/pull/4370))
- `Icon`: 新增有序列表图标 `list-numbered`，优化`lock-off`的绘制路径 @double-deng ([#4378](https://github.com/Tencent/tdesign-vue-next/pull/4378))
- `TreeSelect`: `valueDisplay` 回调整个节点信息，用于输入框的回调展示 @uyarn ([#4389](https://github.com/Tencent/tdesign-vue-next/pull/4389))
- `Dropdown`: 新增`panelTopContent` 和 `panelBottomContent` API 的实现 @uyarn ([#4388](https://github.com/Tencent/tdesign-vue-next/pull/4388))
- `ImageViewer`: 新增 `attach` API，支持自定义 `ImageViewer` 的挂载节点 @josonyang ([#4405](https://github.com/Tencent/tdesign-vue-next/pull/4405))
- `Tree`: 使用 `getTreeData` 获取树结构，支持 `children`为 `true` 的情况 @josonyang ([#4405](https://github.com/Tencent/tdesign-vue-next/pull/4405))
- `DatePicker`: 新增 `needConfirm` API，支持日期时间选择器不需要点击确认按钮保存选择时间 @Cat1007 ([#4411](https://github.com/Tencent/tdesign-vue-next/pull/4411))

### 🐞 Bug Fixes

- `DateRangePicker`: @liweijie0812
  - 修复 `Form` 表单处于禁用时，禁用不生效的问题 ([#4380](https://github.com/Tencent/tdesign-vue-next/pull/4380))
  - 修复 `label` 样式异常的问题 ([common#1845](https://github.com/Tencent/tdesign-common/pull/1845))
- `TagInput`: 修复 `Form` 组件 `disabled` 属性无法影响到 `TagInput` 组件 @xiaojueshi ([#4353](https://github.com/Tencent/tdesign-vue-next/pull/4353))
- `Icon`: 修复图标`chart-column`的命名错误问题 @uyarn ([#4378](https://github.com/Tencent/tdesign-vue-next/pull/4378))
- `Input`: 修复禁用状态下仍可以切换明文密文的问题 @jby0107 ([#4387](https://github.com/Tencent/tdesign-vue-next/pull/4387))
- `Avatar`: 修复`max`属性在多层嵌套下不生效的问题 @1379255913 ([#4326](https://github.com/Tencent/tdesign-vue-next/pull/4326))
- `Table`: 修复 `thClassName` 不支持函数和数组使用的缺陷 @theBestVayne ([#4406](https://github.com/Tencent/tdesign-vue-next/pull/4406))
- `Breadcrumb`: 修复`_blank`配置打开两次新 `Tab` 页的缺陷 @uyarn ([#4421](https://github.com/Tencent/tdesign-vue-next/pull/4421))
- `Notification`: 修复部分节点前缀没有跟随`classPrefix`变化的问题 @uyarn ([#4421](https://github.com/Tencent/tdesign-vue-next/pull/4421))

### 🚧 Others

- `Table`: 修复文档关于`footerAffixedBottom` API 的文案错误 @Tsuj100 ([#4384](https://github.com/Tencent/tdesign-vue-next/pull/4384))

## 🌈 1.9.7 `2024-06-28`

### 🚀 Features

- `Tree`:
  - 新增 `allowDrop` API，支持拖放限制的能力 @TabSpace ([#4312](https://github.com/Tencent/tdesign-vue-next/pull/4312))
  - `ScrollTo` 支持 `key` 属性，支持通过节点唯一值滚动到指定节点，详见示例代码 @uyarn ([#4334](https://github.com/Tencent/tdesign-vue-next/pull/4334))
- `Descriptions`: 新增 `tableLayout` 属性 @zhangpaopao0609 ([#4257](https://github.com/Tencent/tdesign-vue-next/pull/4257))
- `Tabs`: 新增 `scrollPosition` 选中滑块滚动最终停留位置 @oljc ([#4269](https://github.com/Tencent/tdesign-vue-next/pull/4269))
- `Dialog`: 新增 `dialogStyle` 和 `dialogClassName` API，作用于弹窗本身，方便对弹窗本身样式进行调整 @uyarn ([#4347](https://github.com/Tencent/tdesign-vue-next/pull/4347))
- `Plugin`: 单独导出涉及 `Plugin` 相关组件的样式，支持修改前缀的部分场景使用 @uyarn ([#4343](https://github.com/Tencent/tdesign-vue-next/pull/4343))
- `InputNumber`: 支持 `Form` 组件的 `readonly` API @xiaojueshi ([#4321](https://github.com/Tencent/tdesign-vue-next/pull/4321))

### 🐞 Bug Fixes

- `Select`:
  - 修复键盘上下键选中选项后 `onEnter` 事件获取的 `context.value` 错误的问题 @1379255913 ([#4303](https://github.com/Tencent/tdesign-vue-next/pull/4303))
  - 修复`Option`在`OptionGroup`中必须使用 `v-for` 才可以使用的缺陷 @1379255913 ([#4318](https://github.com/Tencent/tdesign-vue-next/pull/4318))
- `DatePicker`:
  - 修复切换 `mode`时，日期选择器切换头部显示错误的问题 @wilonjiang ([#4292](https://github.com/Tencent/tdesign-vue-next/pull/4292))
  - 修复切换 `mode` 时，`format` 未匹配导致组件解析失败的问题 @wilonjiang ([#4292](https://github.com/Tencent/tdesign-vue-next/pull/4292))
- `Table`:
  - 修正 `tableLayout: auto` 和固定表头搭配使用的列宽不同步问题 @Cat1007 ([#4285](https://github.com/Tencent/tdesign-vue-next/pull/4285))
  - 删除 `ellipsis.tsx` 中不必要的标志重置 @xiaojueshi ([#4349](https://github.com/Tencent/tdesign-vue-next/pull/4349))
- `Tree`:
  - 修复组件没有暴露`scrollTo`方法的问题，保留`scrollToElement`方法 @uyarn ([#4334](https://github.com/Tencent/tdesign-vue-next/pull/4334))
  - 修复通过`scrollTo` 指定滚动节点，多次滚动节点位置异常的问题 @uyarn ([#4334](https://github.com/Tencent/tdesign-vue-next/pull/4334))
- `Pagination`: 选择器更改时内部当前值未修改 @betavs ([#4284](https://github.com/Tencent/tdesign-vue-next/pull/4284))
- `Cascader`: 修复无 `children` 选项点击时不会显示之前的列表 @1379255913 ([#4301](https://github.com/Tencent/tdesign-vue-next/pull/4301))

## 🌈 1.9.6 `2024-06-06`

### 🚀 Features

- `Form`: 新增 `readonly` 属性，支持配置表单只读 @xiaojueshi ([#4176](https://github.com/Tencent/tdesign-vue-next/pull/4176))
- `Button`: 新增 `loadingProps` API @novlan1 ([#4219](https://github.com/Tencent/tdesign-vue-next/pull/4219))
- `Breadcrumb`: 优化展示文字 `overflow` 展示 `tooltip` 的判断条件 @xiaojueshi ([#4220](https://github.com/Tencent/tdesign-vue-next/pull/4220))
- `Table`: 优化展示文字 `overflow` 展示 `tooltip` 的判断条件 @xiaojueshi ([#4220](https://github.com/Tencent/tdesign-vue-next/pull/4220))
- `SelectInput`: 新增 `size` 属性 @1379255913 ([#4229](https://github.com/Tencent/tdesign-vue-next/pull/4229))
- `Watermark`: 增强水印防篡改能力 @oljc ([#4233](https://github.com/Tencent/tdesign-vue-next/pull/4233))
- `Tabs`: 支持通过滚轮或者触摸板进行滚动操作 @oljc ([#4222](https://github.com/Tencent/tdesign-vue-next/pull/4222))
- `DatePicker`: 优化日期区间选择器头部区间的变化逻辑，选择后左侧区间大于右侧区间，则默认调整为左侧区间始终比右侧区间小 @uyarn ([#4263](https://github.com/Tencent/tdesign-vue-next/pull/4263))
- `Input`: 新增 `spellCheck` 是否开启拼写检查 @liweijie0812 ([#4265](https://github.com/Tencent/tdesign-vue-next/pull/4265))
- `TreeSelect`: 对外暴露 `treeRef` @novlan1 ([#4235](https://github.com/Tencent/tdesign-vue-next/pull/4235))
- `ImageViewer`: 支持原生 `svg` 渲染 @josonyang ([#4249](https://github.com/Tencent/tdesign-vue-next/pull/4249))
- `Drawer`: 增加拖拽时的最大最小限制，增加 `onSizeDragEnd` 回调函数 @ZWkang ([#4009](https://github.com/Tencent/tdesign-vue-next/pull/4009))

### 🐞 Bug Fixes

- `Cascader`:
  - 修复`prefixIcon`、`suffix` 和 `suffixIcon` 的 `slot` 功能缺失的问题 @1379255913 ([#4229](https://github.com/Tencent/tdesign-vue-next/pull/4229))
  - 修复 `autofocus` 功能失效的问题 @uyarn ([#4266](https://github.com/Tencent/tdesign-vue-next/pull/4266))
- `Tabs`: 修复滑块定位问题 @ZTH520 ([#4207](https://github.com/Tencent/tdesign-vue-next/pull/4207))
- `List`: 修复开启虚拟滚动的异常问题 @uyarn ([#4208](https://github.com/Tencent/tdesign-vue-next/pull/4208))
- `Table`: 修正固定行和虚拟滚动的组合使用场景 @Cat1007 ([#4145](https://github.com/Tencent/tdesign-vue-next/pull/4145))
- `Select`: 修复远程搜索配合过滤，输入筛选条件后，使用键盘选择异常的问题 @ZTH520 ([#4218](https://github.com/Tencent/tdesign-vue-next/pull/4218))
- `Table`: 修复`filter.type`的告警逻辑问题 @uyarn ([#4226](https://github.com/Tencent/tdesign-vue-next/pull/4226))
- `InputNumber`: 修复 `allowInputOverLimit=false` 大小值判断时，`value` 为 `undefined` 时，会出现显示 Infinity 的问题 @HaixingOoO @uyarn ([#4262](https://github.com/Tencent/tdesign-vue-next/pull/4262))
- `DatePicker`: 修复在指定 `format` 和 `valueType` 下，年份解析错误问题 @Ericleungs ([#4161](https://github.com/Tencent/tdesign-vue-next/pull/4161))

## 🌈 1.9.5 `2024-05-16`

### 🚀 Features

- `Input`: 新增 `borderless` API，支持无边框模式 @uyarn ([#4159](https://github.com/Tencent/tdesign-vue-next/pull/4159))
- `AutoComplete`: 新增 `borderless` API，支持无边框模式 @liweijie0812 ([#4192](https://github.com/Tencent/tdesign-vue-next/pull/4192))
- `ColorPicker`: 新增 `borderless` API，支持无边框模式 @liweijie0812 ([#4192](https://github.com/Tencent/tdesign-vue-next/pull/4192))
- `TagInput`: 新增 `borderless` API，支持无边框模式 @liweijie0812 ([#4192](https://github.com/Tencent/tdesign-vue-next/pull/4192))
- `DatePicker`: @liweijie0812 ([#4192](https://github.com/Tencent/tdesign-vue-next/pull/4192))
- 新增 `borderless` API，支持无边框模式
- 新增 `label` API ，支持自定义定义左侧文本
- `TimePicker`:
  - 新增 `borderless` API，支持无边框模式 @liweijie0812 ([#4192](https://github.com/Tencent/tdesign-vue-next/pull/4192))
  - 新增 `valueDisplay` API ，支持自定义展示内容 @liweijie0812 ([#4192](https://github.com/Tencent/tdesign-vue-next/pull/4192))
  - 新增 `label` API ，支持自定义定义左侧文本 @liweijie0812 ([#4195](https://github.com/Tencent/tdesign-vue-next/pull/4195))
  - 此刻按钮在设置 `preset` API 时不再展示 @uyarn ([#4191](https://github.com/Tencent/tdesign-vue-next/pull/4191))
- `Upload`: 新增 `trigger-button-props` 中 `default` 和 `content` 参数透传 @betavs ([#4126](https://github.com/Tencent/tdesign-vue-next/pull/4126))
- `Radio`: 禁用优先级 `Radio.disabled` > `RadioGroup.disabled` > `Form.disabled` @liweijie0812 ([#4182](https://github.com/Tencent/tdesign-vue-next/pull/4182))
- `Scroll`: 调整滚动条兼容的实现方式，优化 `1.9.4` 版本需要依赖 `autoprefixer` 版本更新的问题 @LoopZhou

### 🐞 Bug Fixes

- `Table`:
  - 修正虚拟滚动下滚动到指定行的错误 @Cat1007 ([#4129](https://github.com/Tencent/tdesign-vue-next/pull/4129))
  - 修改表格判断内容是否溢出 @thc-07 ([#4093](https://github.com/Tencent/tdesign-vue-next/pull/4093))
- `Upload`:
  - 修复图片上传错误类型下的样式异常的问题 @uyarn ([#4197](https://github.com/Tencent/tdesign-vue-next/pull/4197))
  - `data` 属性定义缺失 `Function` 类型 @betavs ([#4127](https://github.com/Tencent/tdesign-vue-next/pull/4127))
- `Select`: 在选择框可输入时，每次输入都会触发 popup-visible-change 事件 @Liao-js ([#4137](https://github.com/Tencent/tdesign-vue-next/pull/4137))
- `Transfer`: 修复穿梭框存在默认已选且不允许移除的值仍可移除的异常问题 @liect ([#4147](https://github.com/Tencent/tdesign-vue-next/pull/4147))
- `Textarea`: 兼容组件销毁情况下，元素不存在导致报错的问题 @PDieE ([#4144](https://github.com/Tencent/tdesign-vue-next/pull/4144))
- `Form`: 修复表单`disabled`为`true`，表单输入类组件`disabled`为`false`时的表现异常问题 @uyarn ([#4189](https://github.com/Tencent/tdesign-vue-next/pull/4189))
- `Menu`: 提升 `t-popup__menu` 的样式优先级，解决 dist 内样式优先级一致导致样式异常的问题 @uyarn ([#4197](https://github.com/Tencent/tdesign-vue-next/pull/4197))
- `Select`: 优化已选样式覆盖已禁用样式的问题 @fython ([#4197](https://github.com/Tencent/tdesign-vue-next/pull/4197))
- `Cascader`: 修复 `Cascader` 多选状态下 删除选项时触发多次 `change` 事件的问题 @algerkong ([#4140](https://github.com/Tencent/tdesign-vue-next/pull/4140))
- `ColorPicker`: 修复切换预览颜色时，通道按钮位置不变的问题 @fennghuang ([#4177](https://github.com/Tencent/tdesign-vue-next/pull/4177))

### 🚧 Others

- `Tabs`: 更新可滑动的选项卡示例文档 @fennghuang ([#4167](https://github.com/Tencent/tdesign-vue-next/pull/4167))
- `Upload`: 修复`locale`跳转链接异常的问题 @uyarn ([#4197](https://github.com/Tencent/tdesign-vue-next/pull/4197))

## 🌈 1.9.4 `2024-04-18`

### 🚀 Features

- `Textarea`:
  - 新增 `allow-input-over-max` 属性 @betavs ([#4086](https://github.com/Tencent/tdesign-vue-next/pull/4086))
  - 新增`onValidate` 事件 @betavs ([#4086](https://github.com/Tencent/tdesign-vue-next/pull/4086))
- `Scroll`: 修复由于 `Chrome 121` 版本支持 scroll width 之后导致 Table、Select 及部分出现滚动条组件的样式异常问题 @loopzhou (common#1765)。请注意，基于 @vue/cli-service 4.x 及以下版本初始化的项目由于依赖的 `autoprefixer` 版本过低，会因为这个修复受影响编译，请整体升级@vue/cli-service 至 5.0 以上

### 🐞 Bug Fixes

- `DatePicker`: 对于 `valueType = 'Date'` 不进行初始化的 parse @Cat1007 ([#4066](https://github.com/Tencent/tdesign-vue-next/pull/4066))
- `Loading`: `hide` 函数错误关闭所有 `Loading` 实例. @XBIsland ([#4081](https://github.com/Tencent/tdesign-vue-next/pull/4081))
- `Popup`: 修复在 `webcomponent` 场景下由于 `shadowroot` 导致 `document` 判断异常引起的展示问题 @decadef20 ([#4091](https://github.com/Tencent/tdesign-vue-next/pull/4091))
- `Descriptions`: 修复内容为空时候的报错 @zhangpaopao0609 ([#4092](https://github.com/Tencent/tdesign-vue-next/pull/4092))
- `Textarea`: `autosize` 在 `Firefox` 中不生效。 @XBIsland ([#4104](https://github.com/Tencent/tdesign-vue-next/pull/4104))
- `DatePicker`: 修复`1.9.3`版本中周和季度模式选择异常的问题 @uyarn ([#4096](https://github.com/Tencent/tdesign-vue-next/pull/4096))
- `Tabs`: 修复拖拽排序后手动新增 `tab` 位置异常问题 @Liao-js ([#4108](https://github.com/Tencent/tdesign-vue-next/pull/4108))
- `Cascader`: 修复自定义渲染内容不支持多选 @ZTH520 ([#4109](https://github.com/Tencent/tdesign-vue-next/pull/4109))
- `TimePicker`: 修复没有选中具体区间时预设值错误的问题 @uyarn ([#4123](https://github.com/Tencent/tdesign-vue-next/pull/4123))
- `Skeleton`: 修复设置 `delay` 延迟并且 `loading` 为 `true` 时，无法在到达 `delay` 时间前取消准备到来的 `loading` @boogie-ben ([#4119](https://github.com/Tencent/tdesign-vue-next/pull/4119))
- `BreadcrumbItem`: 修复读取 `content` 内容；文本溢出时调用 `slot?.default()` 非函数的问题 @boogie-ben ([#4120](https://github.com/Tencent/tdesign-vue-next/pull/4120))

## 🌈 1.9.3 `2024-03-29`

### 🐞 Bug Fixes

- `Form`: 修复`1.9.1`版本的告警问题 @uyarn ([#4060](https://github.com/Tencent/tdesign-vue-next/pull/4060))
- `Loading`: 修复`1.9.1`版本对外暴露 `directive` 使用的告警及命名错误 @uyarn ([#4060](https://github.com/Tencent/tdesign-vue-next/pull/4060))
- `DatePicker`: 修复`1.9.1`版本使用`Date`的异常问题 @uyarn

## 🌈 1.9.1 `2024-03-28`

### 🚀 Features

- `Breadcrumb`: `breadcrumb-item`新增 `click` 事件 @uyarn ([#4017](https://github.com/Tencent/tdesign-vue-next/pull/4017))
- `Tag`: 新增`color` API，支持自定义颜色 @maoyiluo ([#4023](https://github.com/Tencent/tdesign-vue-next/pull/4023))
- `TagInput`: 扩展 `collapsedItems` 的删除功能
- `DatePicker`: 新增 `valueDisplay` 和 `selectInputProps` API，支持对展示内容进行自定义 @uyarn ([#4038](https://github.com/Tencent/tdesign-vue-next/pull/4038))

### 🐞 Bug Fixes

- `Descriptions`:
  - 修复编辑器对 `t-descriptions-item` 组件的提示缺失问题 @uyarn ([#4006](https://github.com/Tencent/tdesign-vue-next/pull/4006))
  - 优化自适应宽度的问题 @uyarn ([#4006](https://github.com/Tencent/tdesign-vue-next/pull/4006))
- `Loading`:
  - 修复 `LoadingPlugin` 调用时 `preventScrollThrough` 参数无效。 @XBIsland ([#4040](https://github.com/Tencent/tdesign-vue-next/pull/4040))
  - 修复使用 `unplugin-vue-components` 按需加载，`v-loading` 指令无效 @XBIsland ([#4048](https://github.com/Tencent/tdesign-vue-next/pull/4048))
- `Table`:
  - `activeRowType = multiple`时，`activeRowList` 赋值错误。 @XBIsland ([#4010](https://github.com/Tencent/tdesign-vue-next/pull/4010))
  - 修正数据长度变化时，虚拟滚动表格总高度计算错误的问题 @Cat1007 ([#4016](https://github.com/Tencent/tdesign-vue-next/pull/4016))
- `Notification`: `NotifyPlugin` 返回错误 `NotificationInstance` 导致 `NotifyPlugin.close` 函数错误关闭组件。 @XBIsland ([#4014](https://github.com/Tencent/tdesign-vue-next/pull/4014))
- `Form`: 避免`form-item`的 `label`属性当 `for` 为空时仍然赋值的问题 @sechi747 ([#4027](https://github.com/Tencent/tdesign-vue-next/pull/4027))
- `Cascader`: 修复 `value` 数据回填异常导致样式失效问题 ([#4021](https://github.com/Tencent/tdesign-vue-next/pull/4021)) @XBIsland ([#4025](https://github.com/Tencent/tdesign-vue-next/pull/4025))
- `Tnput`: 修复 `hover` 时键盘操作无法触发 `blur` 事件。 ([#3963](https://github.com/Tencent/tdesign-vue-next/pull/3963)) ([#3903](https://github.com/Tencent/tdesign-vue-next/pull/3903)) ([#3639](https://github.com/Tencent/tdesign-vue-next/pull/3639)) @XBIsland ([#4032](https://github.com/Tencent/tdesign-vue-next/pull/4032))
- `Locale`: 修复`Image`和`ImageViewer` 英语语言包异常的问题 @uyarn ([#4038](https://github.com/Tencent/tdesign-vue-next/pull/4038))
- `DatePicker`: 修复 `format` 与 `valueType` 不一致的场景下计算错误的问题 @uyarn ([#4058](https://github.com/Tencent/tdesign-vue-next/pull/4058))
- `Tabs`: 修复使用 `action` 时控制台告警的问题 @uyarn ([#4057](https://github.com/Tencent/tdesign-vue-next/pull/4057))
- `ColorPicker`: 修复 `linear-gradient` 模式无法拖动调整颜色的问题 (#4015) @XBIsland ([#4022](https://github.com/Tencent/tdesign-vue-next/pull/4022))
- `Icon`: 优化 `Icon` 无网络场景的描述，着重标出处理方案 @xiexin12138 ([#4024](https://github.com/Tencent/tdesign-vue-next/pull/4024))

### 🚧 Others

- `Menu`: 去除 `demo` 中的争议属性 @sinbadmaster ([#4049](https://github.com/Tencent/tdesign-vue-next/pull/4049))

## 🌈 1.9.0 `2024-03-07`

### 🚀 Features

- `Description`:
  - `layout` 类型定义调整为字符串多类型 @chaishi ([#3939](https://github.com/Tencent/tdesign-vue-next/pull/3939))
  - 支持嵌套的描述组件 @zhangpaopao0609 ([#3970](https://github.com/Tencent/tdesign-vue-next/pull/3970))
- `Form`: `trigger` 支持 `submit` @liweijie0812 ([#3910](https://github.com/Tencent/tdesign-vue-next/pull/3910))
- `Demo`: 支持 `Typescript` 代码示例 @chaishi @uyarn @RSS1102 @HaixingOoO ([#3929](https://github.com/Tencent/tdesign-vue-next/pull/3929))
- `Statistic`: `color`黑色风格适配深色模式 [(common#1721)](https://github.com/Tencent/tdesign-common/pull/1721) @liweijie0812 ([#3910](https://github.com/Tencent/tdesign-vue-next/pull/3910))
- `Slider`: 支持通过 `label=null` 或 `label=false` 隐藏滑块数字浮层 @chaishi ([#3997](https://github.com/Tencent/tdesign-vue-next/pull/3997))
- `Table`: 支持全局配置 `size` @Lyan-u ([#3993](https://github.com/Tencent/tdesign-vue-next/pull/3993))
- `Nuxt`: 移除产物中的 nuxt module，调整为安装`@tdesign-vue-next/nuxt`使用，解决使用`es/nuxt`的功能异常的问题，详细使用方式请参考快速开始中的介绍 @uyarn @liweijie0812 ([#4001](https://github.com/Tencent/tdesign-vue-next/pull/4001))

### 🐞 Bug Fixes

- `Table`:
  - 修正虚拟滚动下 `footer` 的实现 @Cat1007 ([#3965](https://github.com/Tencent/tdesign-vue-next/pull/3965))
  - 树形结构表格，修复同时异步设置 `data` 和 `expandedTreeNodes` 时，展开节点无效问题（延迟设置有效）， @chaishi ([#3967](https://github.com/Tencent/tdesign-vue-next/pull/3967))
  - 固定列表格，在 `Dialog` 中固定列宽度被挤压问题， @chaishi ([#3967](https://github.com/Tencent/tdesign-vue-next/pull/3967))
  - 完善 `Table` 组件 `Typescript` 类型定义 @chaishi ([#3936](https://github.com/Tencent/tdesign-vue-next/pull/3936))
  - 修复列拖拽排序问题 @chaishi ([#3968](https://github.com/Tencent/tdesign-vue-next/pull/3968))
  - 修正在 `footer` 高度更新的场景下, `footer` 没有被正常刷新的问题 @Cat1007 ([#3975](https://github.com/Tencent/tdesign-vue-next/pull/3975))
- `Drawer`: 修复 `closeBtn` 属性 `Boolean` 类型转换未生效的问题 @trojanyao ([#3427](https://github.com/Tencent/tdesign-vue-next/pull/3427))
- `Form`: 校验判断不严谨的问题 @betavs ([#3960](https://github.com/Tencent/tdesign-vue-next/pull/3960))
- `Select`: 修复 select createAble 选中没有触发 change 事件问题 @hkaikai ([#3962](https://github.com/Tencent/tdesign-vue-next/pull/3962))
- `Nuxt`: 修复在`nuxt`中使用 `Form` 组件无法正常构建的问题 @richardji202 ([#3977](https://github.com/Tencent/tdesign-vue-next/pull/3977))
- `ColorPicker`: `color` 值未同步更新 @betavs ([#4005](https://github.com/Tencent/tdesign-vue-next/pull/4005))
- `Drawer`: 修复 `closeBtn` 属性 `Boolean` 类型转换未生效的问题 @trojanyao ([#3427](https://github.com/Tencent/tdesign-vue-next/pull/3427))
- `Affix`: 修正 `margin` 计算，避免出现 `error` @Cat1007 ([#3972](https://github.com/Tencent/tdesign-vue-next/pull/3972))

### 🚧 Others

- `Code`: 编辑器代码提示更新 @liweijie0812 ([#3927](https://github.com/Tencent/tdesign-vue-next/pull/3927))

## 🌈 1.8.1 `2024-01-31`

### 🚀 Features

- `Loading`: 支持自定义 `v-loading` 配置，具体参考示例代码 @uyarn ([#3911](https://github.com/Tencent/tdesign-vue-next/pull/3911))

### 🐞 Bug Fixes

- `Tabs`:
  - 修复层级问题影响 `action`区域操作的问题 @uyarn ([#3881](https://github.com/Tencent/tdesign-vue-next/pull/3881))
  - 逻辑容错处理 @betavs ([#3891](https://github.com/Tencent/tdesign-vue-next/pull/3891))
- `Form`:
  - `FormRule` 规则中 `trigger` 值类型缺失 `all` 选项 @betavs ([#3875](https://github.com/Tencent/tdesign-vue-next/pull/3875))
  - 修复计算 `^` 字符异常的问题 @uyarn ([#3881](https://github.com/Tencent/tdesign-vue-next/pull/3881))
- `Drawer`:
  - `visible` 为 `false` 时，按 `esc` 会触发 `onEscKeydown` 和 `onCancel` 事件 @betavs ([#3836](https://github.com/Tencent/tdesign-vue-next/pull/3836))
  - 修复 `closeOnEscKeydown` 开启时任意按键都会触发 `Drawer` 问题 @ruanlinxin ([#3904](https://github.com/Tencent/tdesign-vue-next/pull/3904))
- `Input`: 修复禁用状态下 `focused` 样式未消除的问题 @wilonjiang ([#3840](https://github.com/Tencent/tdesign-vue-next/pull/3840))
- `TreeSelect`: 修复可过滤开启时搜索框内容与 `filter` 函数不同步更新的问题 @PeterJayawesome ([#3862](https://github.com/Tencent/tdesign-vue-next/pull/3862))
- `VirtualScroll`: 修改 `virtual` 中的 `buffer` 实现,修正错位的 translateY 的计算逻辑 @Cat1007 ([#3776](https://github.com/Tencent/tdesign-vue-next/pull/3776))
- `Slider`: @uyarn
  - 修复 `step` 设置小于 `1` 时的使用异常问题 ([#3883](https://github.com/Tencent/tdesign-vue-next/pull/3883))
  - 修复 `inputProps` 的 `onChange` 事件无法正常触发的问题 ([#3906](https://github.com/Tencent/tdesign-vue-next/pull/3906))
- `Loading`: 修复未设置 `z-index` 默认值的问题 @betavs ([#3881](https://github.com/Tencent/tdesign-vue-next/pull/3881))
- `DatePicker`: 修复单独配置 `popupProps` 的 `on-visible-change` 功能异常的问题 @uyarn ([#3908](https://github.com/Tencent/tdesign-vue-next/pull/3908))
- `TagInput`: 修复 `taginput` 中 `size` 对默认 `collapsedItems` 不生效的问题 @SadWood ([#3847](https://github.com/Tencent/tdesign-vue-next/pull/3847))
- `Radio`: 修复回车时控制台报错的问题 @liweijie0812 ([#3896](https://github.com/Tencent/tdesign-vue-next/pull/3896))

### 🚧 Others

- `Form`: `trigger api` 文档更新 @liweijie0812 ([#3882](https://github.com/Tencent/tdesign-vue-next/pull/3882))
- `Tree`: 示例代码由 `OptionsAPI` 更为 `CompositionAPI` @chaishi ([#3899](https://github.com/Tencent/tdesign-vue-next/pull/3899))
- `Descriptions`: 展示冒号示例文字错误 @czq297297 ([#3841](https://github.com/Tencent/tdesign-vue-next/pull/3841))

## 🌈 1.8.0 `2024-01-09`

### 🚀 Features

- `Descriptions`: 新增 `Descriptions` 描述组件 @zhangpaopao0609 ([#3787](https://github.com/Tencent/tdesign-vue-next/pull/3787))
- `Slider`: 实现 `changeEnd` 事件 @Lyan-u ([#3780](https://github.com/Tencent/tdesign-vue-next/pull/3780))
- `Form`: 为 `Form Item` 校验信息增加 `title` 属性，用于鼠标停留时展示完整信息 @sosohime ([#3779](https://github.com/Tencent/tdesign-vue-next/pull/3779))
- `ImageViewer`: 新增默认缩放比例 @timi137137 ([#3678](https://github.com/Tencent/tdesign-vue-next/pull/3678))
- `Radio`: 新增 `readonly` 属性 @betavs ([#3814](https://github.com/Tencent/tdesign-vue-next/pull/3814))

### 🐞 Bug Fixes

- `Table`:
  - 修复行拖拽排序场景，异步加载行会变到第一行问题 @chaishi ([#3819](https://github.com/Tencent/tdesign-vue-next/pull/3819))
  - 拖拽排序场景，修复通过 `push` 新增 `data` 元素后，被添加的新元素出现在第一列问题 @chaishi ([#3822](https://github.com/Tencent/tdesign-vue-next/pull/3822))
  - 修复 `sortablejs` 操作 `DOM` 后对虚拟 `DOM` 产生的副作用。 @huangchen1031 ([#3825](https://github.com/Tencent/tdesign-vue-next/pull/3825))
  - 修复 `EnhancedTable` 树型表格表头操作全选，会选中已禁用选择的行的问题 @huangchen1031 @uyarn ([#3832](https://github.com/Tencent/tdesign-vue-next/pull/3832))
- `Cascader`: 修复 `mutiple & show-all-levels = false` 的场景下设置`value`为`options`内不存在的值报错 @Zz-ZzzZ ([#3810](https://github.com/Tencent/tdesign-vue-next/pull/3810))
- `DatePicker`: 国际化切换无效() @liweijie0812 ([#3818](https://github.com/Tencent/tdesign-vue-next/pull/3818))
- `TagInput`: 解决 `disabled` 为真时，可以点击的问题 @betavs ([#3831](https://github.com/Tencent/tdesign-vue-next/pull/3831))
- `Radio`: 处理选中状态也会触发 `change` 事件的问题 @betavs ([#3782](https://github.com/Tencent/tdesign-vue-next/pull/3782))

## 🌈 1.7.2 `2023-12-22`

### 🚀 Features

- `Upload`:
  - 设置 `uploadPastedFiles` 默认值为 `true` @chaishi ([#3754](https://github.com/Tencent/tdesign-vue-next/pull/3754))
  - 输入框类型的上传组件，新增类名 `t-upload--theme-file-input` @chaishi ([#3754](https://github.com/Tencent/tdesign-vue-next/pull/3754))
- `Table`: @chaishi ([#3758](https://github.com/Tencent/tdesign-vue-next/pull/3758))
  - 行选中功能，新增 `rowSelectionType` 用于定义是单选/多选，用于支持即使没有配置 `columns: [{ rowKey: "row-select", type: 'single' }]` 的情况下，也能通过 `selectOnRowClick` 进行行选中的控制
  - 行选中功能，新增 `rowSelectionAllowUncheck` ，用于控制单选场景，是否允许取消选中
- `ImageViewer`: 图片预览，加载失败时，不显示错误文本，只显示图标 @chaishi ([#3754](https://github.com/Tencent/tdesign-vue-next/pull/3754))
- `Menu`: 选中后关闭菜单，与其他组件保持交互行为一致() @uyarn ([#3764](https://github.com/Tencent/tdesign-vue-next/pull/3764))
- `RadioGroup`: 优化组件样式体验，`variant`为`default-filled`时初始状态不执行动画 @loganylwu ([#3765](https://github.com/Tencent/tdesign-vue-next/pull/3765))
- `Card`: `card` 组件支持传入 `loadingProps` 参数 @iiimix ([#3731](https://github.com/Tencent/tdesign-vue-next/pull/3731))
- `DatePicker`: 支持 `cancelRangeSelectLimit` `API` @githubid0719 ([#3718](https://github.com/Tencent/tdesign-vue-next/pull/3718))
- `Dropdown`: 移除对 `left` 的 `item` 样式特殊处理 @uyarn ([#3752](https://github.com/Tencent/tdesign-vue-next/pull/3752))

### 🐞 Bug Fixes

- `ImageViewer`:
  - 去除默认值设置以使用 `globalConfig` 中的默认值,避免在不同语言环境中出现异常 @sinbadmaster ([#3709](https://github.com/Tencent/tdesign-vue-next/pull/3709))
  - 修改键盘事件绑定对象,避免影响全局键盘事件 @sinbadmaster ([#3712](https://github.com/Tencent/tdesign-vue-next/pull/3712))
- `Table`:
  - 修复 `column-controller-visible-change` 事件参数 `trigger` 值不正确问题 @chaishi ([#3716](https://github.com/Tencent/tdesign-vue-next/pull/3716))
  - 虚拟滚动场景，修复吸顶 `Affix` 表头无法滚动同步问题 @Cat1007 ([#3746](https://github.com/Tencent/tdesign-vue-next/pull/3746))
  - 横向滚动场景，修复在 `Windows` 场景中，按下鼠标（不松开鼠标）横向滚动时，表头没有跟随滚动问题 @chaishi ([#3753](https://github.com/Tencent/tdesign-vue-next/pull/3753))
  - 可筛选表格，修复筛选值为 `0` 时，筛选图表没有高亮问题， @chaishi ([#3753](https://github.com/Tencent/tdesign-vue-next/pull/3753))
  - `fixedRowHeight` 场景下初始化失败，导致虚拟滚动不生效 @Cat1007 ([#3739](https://github.com/Tencent/tdesign-vue-next/pull/3739))
  - 修正表格精度,避免表头和表格出现精度误差因此预期外的滚动条 @Cat1007 ([#3747](https://github.com/Tencent/tdesign-vue-next/pull/3747))
- `Tree`:
  - 处理 `height` 属性无效的问题 @betavs ([#3717](https://github.com/Tencent/tdesign-vue-next/pull/3717))
  - 解决选中态初始化异常的问题 @TabSpace ([#3742](https://github.com/Tencent/tdesign-vue-next/pull/3742))
- `ImageViewer`: 滚轮缩放符合操作直觉 @sinbadmaster ([#3738](https://github.com/Tencent/tdesign-vue-next/pull/3738))
- `DateRangePicker`: 修复 `12` 月时选择同一个月内的日期后，第一次打开面板左右月份一样的问题 @Lyan-u ([#3727](https://github.com/Tencent/tdesign-vue-next/pull/3727))
- `Dialog`: 修正 `DialogPlugin` 获取元素操作 `className` 的时机 @Cat1007 ([#3732](https://github.com/Tencent/tdesign-vue-next/pull/3732))
- `DatePicker`: 修复日期选择禁用后，后缀图标颜色改变的问题 @HaixingOoO @uyarn ([#3752](https://github.com/Tencent/tdesign-vue-next/pull/3752))
- `Table`: 修复 `1.7.1` 中，`Shift` 连续选中失效问题， @chaishi ([#3753](https://github.com/Tencent/tdesign-vue-next/pull/3753))
- `Select`: 修复 `1.6.0` 版本后 可过滤下 重新打开没有正常清除过滤输入内容的问题 @uyarn ([#3762](https://github.com/Tencent/tdesign-vue-next/pull/3762))
- `TreeSelect`: 修复可过滤下，重新打开没有清除过滤输入内容的问题 @uyarn ([#3762](https://github.com/Tencent/tdesign-vue-next/pull/3762))
- `Upload`: 修复取消拖拽上传后，状态无法回到组件初始状态问题， @chaishi ([#3754](https://github.com/Tencent/tdesign-vue-next/pull/3754))
- `InputNumber`: `allowInputOverLimit` 为 `false` 时，数字超过最大值 `onBlur` 不触发 @zhaodesen ([#3722](https://github.com/Tencent/tdesign-vue-next/pull/3722))
- `Pagination`: 将总数单位 `项` 改为 `条` , 保持内容一致性 @dinghuihua ([common#1687](https://github.com/Tencent/tdesign-common/pull/1687))

### 🚧 Others

- `Dialog`: 增加统一管理弹窗 hooks @AuYuHui ([#3635](https://github.com/Tencent/tdesign-vue-next/pull/3635))

## 🌈 1.7.1 `2023-12-07`

### 🚀 Features

- `Table`: 支持 `thClassName` 单独给表头添加类名 @chaishi ([#3669](https://github.com/Tencent/tdesign-vue-next/pull/3669))
- `TimePicker`: `props.presets`预设快捷时间选择 @liweijie0812 ([#3665](https://github.com/Tencent/tdesign-vue-next/pull/3665))
- `Dropdown`: 添加`DropdownItem`传递`boolean attribute`时的转换(#3692) @Zz-ZzzZ ([#3702](https://github.com/Tencent/tdesign-vue-next/pull/3702))

### 🐞 Bug Fixes

- `Tree`:
  - `tree` 节点禁用状态逻辑改进 @TabSpace ([#3653](https://github.com/Tencent/tdesign-vue-next/pull/3653))
  - `value`, `active`, `expanded` 属性, 支持数组操作触发视图变更 @TabSpace ([#3682](https://github.com/Tencent/tdesign-vue-next/pull/3682))
- `Select`:
  - 远程搜索不再进行本地过滤，支持远程对选项 `trim` 或者额外处理的场景 @uyarn ([#3707](https://github.com/Tencent/tdesign-vue-next/pull/3707))
  - 修复非虚拟滚动场景下，无法键盘回车键直接选中过滤后的选项的缺陷 @uyarn ([#3707](https://github.com/Tencent/tdesign-vue-next/pull/3707))
- `Loading`: `ts` 类型丢失, `volar` 提示无效 @liweijie0812 ([#3684](https://github.com/Tencent/tdesign-vue-next/pull/3684))
- `AutoComplete`: 使用 `lodash/escapeRegExp` 转换关键字文本 @ZWkang ([#3661](https://github.com/Tencent/tdesign-vue-next/pull/3661))
- `Table`: 本地数据分页场景，修复行选中无效问题，[#3669](https://github.com/Tencent/tdesign-vue-next/pull/3669) @chaishi ([#3669](https://github.com/Tencent/tdesign-vue-next/pull/3669))
- `DropdownItem`: 处理禁用状态可点击的问题 @betavs ([#3696](https://github.com/Tencent/tdesign-vue-next/pull/3696))
- `Tabs`: 优化初始化滚动的场景，对处于中间的部分场景进行进一步优化 @uyarn ([#3699](https://github.com/Tencent/tdesign-vue-next/pull/3699))
- `Popup`: 修复控制台报错 @liweijie0812 ([#3705](https://github.com/Tencent/tdesign-vue-next/pull/3705))
- `Pagination`: 分页组件 `foldedMaxPageBtn` 优化 @DYS1230 ([#3704](https://github.com/Tencent/tdesign-vue-next/pull/3704))
- `BreadcrumbItem`: 修复 `target` 属性为 `_blank` 时没有在新标签页打开() @selicens ([#3637](https://github.com/Tencent/tdesign-vue-next/pull/3637))
- `AutoComplete`: 没选中项回车不触发选中事件 @liweijie0812 ([#3700](https://github.com/Tencent/tdesign-vue-next/pull/3700))

### 🚧 Others

- `BaseUsage`: 基础示例部分的代码格式化 @coderYangLiu ([#3654](https://github.com/Tencent/tdesign-vue-next/pull/3654))
- `Doc`: 更新 `CONTRIBUTING.md` @uyarn ([#3681](https://github.com/Tencent/tdesign-vue-next/pull/3681))

## 🌈 1.7.0 `2023-11-22`

### 🚀 Features

- `Statistic`: 新增 `Statistic` 统计数值组件 @liweijie0812 ([#3329](https://github.com/Tencent/tdesign-vue-next/pull/3329))
- `Loading`: 当使用 `Plugin` 或指令调用时，隐藏 `Loading` 将会移除 `app` 实例 @Zz-ZzzZ ([#3576](https://github.com/Tencent/tdesign-vue-next/pull/3576))
- `Space`: 支持老旧浏览器也能正常显示子元素之间的间距，() @chaishi ([#3565](https://github.com/Tencent/tdesign-vue-next/pull/3565))
- `Input`: `value` 支持数据类型 `number` @chaishi ([#3600](https://github.com/Tencent/tdesign-vue-next/pull/3600))
- `Tabs`: 新增滚动后对超长场景计算滚动距离的逻辑 @uyarn ([#3624](https://github.com/Tencent/tdesign-vue-next/pull/3624))
- `Tabs`: 支持`action`的使用 @uyarn ([#3624](https://github.com/Tencent/tdesign-vue-next/pull/3624))

### 🐞 Bug Fixes

- `Affix`: 新增元素判空，避免出现元素不存在报错 @chaishi ([#3584](https://github.com/Tencent/tdesign-vue-next/pull/3584))
- `Radio`: `useKeyboard` 通过正则匹配 `space`, 修复误判断删除键（`backspace`）为空格键（`space`） @liweijie0812 ([#3599](https://github.com/Tencent/tdesign-vue-next/pull/3599))
- `Checkbox`: `useKeyboardEvent ` 通过正则匹配 `space`, 修复误判断删除键（`backspace`）为空格键（`space`） @liweijie0812 ([#3599](https://github.com/Tencent/tdesign-vue-next/pull/3599))
- `Collapse`: 自定义右侧操作点击触发了折叠事件 () @liweijie0812 ([#3581](https://github.com/Tencent/tdesign-vue-next/pull/3581))
- `Hooks`: 修复在使用 `dragSort` 时不使用回调 `Props` 函数出现的报错 @SuperManito ([#3592](https://github.com/Tencent/tdesign-vue-next/pull/3592))
- `Select`: 修复`1.6.6`版本后，多选模式下，无法通过 enter 键选中选项问题 @wilonjiang ([#3608](https://github.com/Tencent/tdesign-vue-next/pull/3608))
- `Cascader`: 修复默认值在选项中不存在时的报错 @PengYYYYY ([#3611](https://github.com/Tencent/tdesign-vue-next/pull/3611))
- `Dialog`: 修复 `attach="body"` `destroyOnClose` 嵌套超过三层关闭报错 @AuYuHui ([#3619](https://github.com/Tencent/tdesign-vue-next/pull/3619))
- `Table`: 修复多级表头场景，列配置功能失效问题 @chaishi ([#3622](https://github.com/Tencent/tdesign-vue-next/pull/3622))

### 🚧 Others

- `Table`: 优化示例代码 @chaishi ([#3584](https://github.com/Tencent/tdesign-vue-next/pull/3584))

## 🌈 1.6.8 `2023-11-07`

### 🚀 Features

- `ImageViewer`: 新增支持 `closeOnEscKeydown`，用于控制是否允许 ESC 退出预览， @chaishi ([#3566](https://github.com/Tencent/tdesign-vue-next/pull/3566))
- `Upload`: @chaishi
  - 图片预览功能，新增支持透传图片预览全部属性 `imageViewerProps` ([#3566](https://github.com/Tencent/tdesign-vue-next/pull/3566))
  - ⚠️ 新增图片上传大小超出限制提醒，有额外单独实现此功能的业务需注意是否存在重复显示大小限制提醒问题 ([#3566](https://github.com/Tencent/tdesign-vue-next/pull/3566))
  - 多文件/图片上传场景下，`autoUpload=false` 时，支持使用 Props 属性/函数/插槽等方法自定义上传按钮和取消上传按钮 ([#3566](https://github.com/Tencent/tdesign-vue-next/pull/3566))
  - 多文件/图片上传场景下，`autoUpload=false` 时，区分已上传状态和待上传状态 ([#3566](https://github.com/Tencent/tdesign-vue-next/pull/3566))
  - 批量文件上传支持在列表中显示上传失败的原因 ([#3566](https://github.com/Tencent/tdesign-vue-next/pull/3566))
  - 新增支持 `fileListDisplay=null` 控制单文件或文件列表不显示 ([#3573](https://github.com/Tencent/tdesign-vue-next/pull/3573))

### 🐞 Bug Fixes

- `Table`:
  - 修复 `v1.6.7` 引起的单元格编辑失效问题 @chaishi ([#3577](https://github.com/Tencent/tdesign-vue-next/pull/3577))
  - 多级表头 + 列宽调整场景，修正动态列表头宽度计算错误的问题 @Cat1007 ([#3552](https://github.com/Tencent/tdesign-vue-next/pull/3552))
  - 在提供列配置选项时,默认只提供叶子列作为配置选项,作为最细粒度配置的方式 @Cat1007 ([#3555](https://github.com/Tencent/tdesign-vue-next/pull/3555))
  - 修正列变动时,列宽重置的判断问题 @Cat1007 ([#3568](https://github.com/Tencent/tdesign-vue-next/pull/3568))
  - 修正动态列变化时，表头过小或表头高度更新错误导致意外的滚动条出现的问题 @Cat1007 ([#3557](https://github.com/Tencent/tdesign-vue-next/pull/3557))
- `TreeSelect`: 处理导入的样式文件异常问题 @betavs ([#3556](https://github.com/Tencent/tdesign-vue-next/pull/3556))
- `Upload`: @chaishi
  - 修复 `max=1 multiple=false` 情况下，无法替换上传文件问题 ([#3566](https://github.com/Tencent/tdesign-vue-next/pull/3566))
  - 图片上传场景，修复禁用态卡片无法显示问题 ([#3573](https://github.com/Tencent/tdesign-vue-next/pull/3573))
- `Tree`: 提供获取树结构数据的 api: getTreeData @TabSpace ([#3571](https://github.com/Tencent/tdesign-vue-next/pull/3571))
- `Dialog`: 修复以 Plugin 的方式调用时，更新 className 会报错并且会覆盖组件的原 className @Zz-ZzzZ ([#3570](https://github.com/Tencent/tdesign-vue-next/pull/3570))

## 🌈 1.6.7 `2023-11-01`

### 🚀 Features

- `Table`:
  - 可编辑单元格场景，支持通过 `updateEditedCellValue` 方法更新当前行编辑状态任意单元格的值 @chaishi ([#3522](https://github.com/Tencent/tdesign-vue-next/pull/3522))
  - 可编辑单元格，支持使用 `updateEditedCellValue` 更新整行编辑态数据 @chaishi ([#3536](https://github.com/Tencent/tdesign-vue-next/pull/3536))
  - 多级表头下，动态列配置支持指定父级列以展示其下的所有子列 @Cat1007 ([#3539](https://github.com/Tencent/tdesign-vue-next/pull/3539))
- `Slider`: 增加 `label` 的函数方式参数支持 ([#3470](https://github.com/Tencent/tdesign-vue-next/pull/3470))@liect ([#3502](https://github.com/Tencent/tdesign-vue-next/pull/3502))
- `Timeline`: `TimelineItem` 新增 `onClick` 事件 @liweijie0812 ([#3512](https://github.com/Tencent/tdesign-vue-next/pull/3512))
- `Select`: 支持通过键盘选择时同时滚动到可视选项范围的能力 @uyarn ([#3542](https://github.com/Tencent/tdesign-vue-next/pull/3542))

### 🐞 Bug Fixes

- `Table`:
  - `primaryTableRef` 未绑定，导致其导出的方法无法使用 @AuYuHui ([#3528](https://github.com/Tencent/tdesign-vue-next/pull/3528))
  - 可编辑单元格，修复某一列单元格数据发生变化时，其他列接收到的 `editedRow` 不是最新数据问题 @chaishi ([#3536](https://github.com/Tencent/tdesign-vue-next/pull/3536))
- `Select`:
  - 修复在虚拟滚动下通过键盘回车选择过滤项错误的问题 @uyarn ([#3542](https://github.com/Tencent/tdesign-vue-next/pull/3542))
  - 修复多选小尺寸和大尺寸的样式缺陷 by @Zzongke ([#3542](https://github.com/Tencent/tdesign-vue-next/pull/3542))
- `Tree`:
  - 完善受控逻辑，解决 `onChange` 事件触发时，组件状态传递有延迟的问题 @TabSpace ([#3509](https://github.com/Tencent/tdesign-vue-next/pull/3509))
  - 解决 `watch` 时机问题 @TabSpace ([#3526](https://github.com/Tencent/tdesign-vue-next/pull/3526))
- `Upload`:
  - 修复当 `upload` 为手动上传时，进度无法显示的问题 @ziyi99 ([#3531](https://github.com/Tencent/tdesign-vue-next/pull/3531))
  - 修复拖拽的文件不符合 `accept` 配置时，拖拽结束后不会触发 `Drop` 事件的问题 @ziyi99 ([#3532](https://github.com/Tencent/tdesign-vue-next/pull/3532))
- `Tabs`: 动态修改 `TabNav` 选项卡数量导致滑动按钮不符合预期 @betavs ([#3517](https://github.com/Tencent/tdesign-vue-next/pull/3517))
- `Timeline`: 修复 `TimelineItem` 的 `dotColor` 默认值错误 @liweijie0812 ([#3512](https://github.com/Tencent/tdesign-vue-next/pull/3512))
- `Pagination`: 修复当前页在被动更改时触发 `onCurrentChange` 事件 @Zz-ZzzZ ([#3511](https://github.com/Tencent/tdesign-vue-next/pull/3511))
- `Menu`: 修复菜单收起时的样式问题 by @RayJason ([#3542](https://github.com/Tencent/tdesign-vue-next/pull/3542))
- `Radio`: 修复只有一个选项的边角样式缺陷 @uyarn ([#3542](https://github.com/Tencent/tdesign-vue-next/pull/3542))
- `ColorPicker`: 修复最近使用颜色异常问题 @liect ([#3515](https://github.com/Tencent/tdesign-vue-next/pull/3515))
- `TreeSelect`: 修复未使用 `keys` 别名 @liect ([#3520](https://github.com/Tencent/tdesign-vue-next/pull/3520))

## 🌈 1.6.5 `2023-10-20`

### 🚀 Features

- `TagInput`: 支持在超长滚动模式下进行滚动，对选项进行增删操作 @liweijie0812 ([#3501](https://github.com/Tencent/tdesign-vue-next/pull/3501))
- `Tabs`: `destroyOnHide` 默认值回退为 true，懒加载使用请配合 `destroyOnHide` 设置为 false 使用，详情请看示例 @liweijie0812 ([#3504](https://github.com/Tencent/tdesign-vue-next/pull/3504))

### 🐞 Bug Fixes

- `Tree`: 修复当 `node` 的 `value` 为 `0` 时不会渲染的问题 @Zz-ZzzZ ([#3500](https://github.com/Tencent/tdesign-vue-next/pull/3500))
- `SelectInput`: 修复`1.6.2`之后非多选场景下基于`SelectInput`的组件如`Select`等，自动聚焦输入框的问题 @uyarn ([#3506](https://github.com/Tencent/tdesign-vue-next/pull/3506))
- `DatePicker`: 修复`1.6.2`之后选中控制台报错的问题 @uyarn ([#3506](https://github.com/Tencent/tdesign-vue-next/pull/3506))

### 🚧 Others

- `Select`: 修复示例的错误 @liect ([#3503](https://github.com/Tencent/tdesign-vue-next/pull/3503))

## 🌈 1.6.4 `2023-10-19`

### 🚀 Features

- `Table`: 可筛选表格，支持设置 `confirmEvents: ['onChange']` 后，单选筛选器(`Radio`) 选择完成后自动关闭筛选器浮层 @chaishi ([#3478](https://github.com/Tencent/tdesign-vue-next/pull/3478))
- `Tabs`: `destroyOnHide` 默认值改 `false` @liweijie0812 ([#3467](https://github.com/Tencent/tdesign-vue-next/pull/3467))
- `Tabs`: 新增 `lazy` 支持选项卡懒加载 @liweijie0812 ([#3467](https://github.com/Tencent/tdesign-vue-next/pull/3467))

### 🐞 Bug Fixes

- `Cascader`:
  - 修复顶层 `class` 使用了 `proxy` 值，导致样式表现异常 @PengYYYYY ([#3488](https://github.com/Tencent/tdesign-vue-next/pull/3488))
  - 多选场景，未开启搜索功能，宽度自适应模式，修复鼠标悬浮时宽度会发生变化问题 ([#1623](https://github.com/Tencent/tdesign-common/pull/1623))
- `SelectInput`:
  - `renderPrefixContent` 返回 `[null,undefined]` 或 `[undefined,undefined]`，传递给 `input props.label`, 导致 `input` 渲染空的 `t-input__prefix` 节点 @liweijie0812 ([#3479](https://github.com/Tencent/tdesign-vue-next/pull/3479))
  - 修复下拉框内无法输入或聚焦“输入框”、“数字输入框”等可聚焦元素 @chaishi ([#3492](https://github.com/Tencent/tdesign-vue-next/pull/3492))
- `ImageViewer`: 控制栏控件中部数据，在步长值不为 `0.5` 时，精度丢失的问题 @xiaojueshi ([#3476](https://github.com/Tencent/tdesign-vue-next/pull/3476))
- `DatePicker`: `prefixIcon` 插槽不生效 @liweijie0812 ([#3479](https://github.com/Tencent/tdesign-vue-next/pull/3479))
- `TagInput`: 多选场景，未开启搜索功能，宽度自适应模式，修复鼠标悬浮时宽度会发生变化问题 ([#1623](https://github.com/Tencent/tdesign-common/pull/1623))
- `Select`: 多选场景，未开启搜索功能，宽度自适应模式，修复鼠标悬浮时宽度会发生变化问题 ([#1623](https://github.com/Tencent/tdesign-common/pull/1623))
- `TreeSelect`: 多选场景，未开启搜索功能，宽度自适应模式，修复鼠标悬浮时宽度会发生变化问题 ([#1623](https://github.com/Tencent/tdesign-common/pull/1623))
- `Grid`: 修复 `Row` 和 `Col` 子组件配置项属性均为必填的类型问题 @uyarn ([#3491](https://github.com/Tencent/tdesign-vue-next/pull/3491))

## 🌈 1.6.2 `2023-10-12`

### 🚀 Features

- `Tag`: `CheckTag` 支持多种风格标签配置 @chaishi ([#3419](https://github.com/Tencent/tdesign-vue-next/pull/3419))
- `Tag`: 支持标签组 `CheckTagGroup` 选择 @chaishi ([#3419](https://github.com/Tencent/tdesign-vue-next/pull/3419))

### 🐞 Bug Fixes

- `Badge`: 边框圆角方形样式([common#1617](https://github.com/Tencent/tdesign-common/pull/1617)) @liweijie0812 ([#3461](https://github.com/Tencent/tdesign-vue-next/pull/3461))
- `Badge`: 开启`dot` 忽略形状设置 @liweijie0812 ([#3461](https://github.com/Tencent/tdesign-vue-next/pull/3461))
- `Table`: 修复行高亮受控属性 `activeRowKeys` 无效问题 @chaishi ([#3463](https://github.com/Tencent/tdesign-vue-next/pull/3463))

## 🌈 1.6.1 `2023-10-11`

### 🚀 Features

- `Table`:
  - 键盘操作，可编辑单元格，支持使用 `Tab` 键切换可编辑的单元格，实现快速修改操作 @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
  - 键盘操作，优化行高亮键盘操作和样式，兼容行选中功能 @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
  - 键盘操作，行选中功能支持不设置行高亮，也能使用键盘操作选中、取消选中、全选、取消全选等 @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
  - 树形结构表格，支持通过行唯一标识滚动到指定行（之前仅可通过行下标滚动到指定行） @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
  - 支持整个表格懒加载 @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
- `Popup`: 组件新增实例方法 `update/getOverlay/getOverlayState`，用于更新或获取浮层内容、状态等 @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
- `Select`: 支持键盘操作下拉选项选中或取消 @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
- `Cascader`: 支持使用 `valueDisplay` 自定义选中项的内容呈现 @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
- `Tree`: 提供虚拟滚动能力 @TabSpace ([#3410](https://github.com/Tencent/tdesign-vue-next/pull/3410))
- `Badge`: `content`、`count` 插槽支持 @liweijie0812 ([#3454](https://github.com/Tencent/tdesign-vue-next/pull/3454))

### 🐞 Bug Fixes

- `Input`: 聚焦和失焦事件纠正，当组件已经处于聚焦状态时，点击 `label/suffix/prefix/icon` 等元素，不再重复触发一次失焦和聚焦事件 @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
- `TagInput`: 聚焦和失焦事件纠正，当组件已经处于聚焦状态时，点击标签，不再重复触发一次失焦和聚焦事件 @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
- `Select`:
  - 聚焦和失焦事件纠正，下拉选项选中时不再自动失焦，以便继续切换选项 @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
  - 筛选后使用键盘上下键选择功能异常 @liweijie0812 ([#3420](https://github.com/Tencent/tdesign-vue-next/pull/3420))
  - 修复下拉选项闪现 @betavs ([#3418](https://github.com/Tencent/tdesign-vue-next/pull/3418))
- `Cascader`:
  - 聚焦和失焦事件纠正，下拉选项选中时不再自动失焦，以便继续切换选项 @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
  - 修复 `cascader` 渲染多余的 `tag-input__prefix` 元素导致表现异常 @PengYYYYY ([#3446](https://github.com/Tencent/tdesign-vue-next/pull/3446))
  - `change` 事件中 `source` 异常问题 @PengYYYYY ([#3456](https://github.com/Tencent/tdesign-vue-next/pull/3456))
- `Tree`: 解决 `setData` 方法无法触发属性变更的问题 @TabSpace ([#3410](https://github.com/Tencent/tdesign-vue-next/pull/3410))
- `Form`: 修复 `statusIcon` 为函数或插槽时，参数为空的问题 @SBDaQingWa ([#3449](https://github.com/Tencent/tdesign-vue-next/pull/3449))

### 🚧 Others

- docs: 新增 `CodeSandbox` 支持 @LadyChatterleyLover ([#3422](https://github.com/Tencent/tdesign-vue-next/pull/3422))

## 🌈 1.5.7 `2023-09-21`

### 🚀 Features

- `Table`: 支持通过属性 `local` 配置组件所有文本 @chaishi ([#3380](https://github.com/Tencent/tdesign-vue-next/pull/3380))
- `Card`: `title` 使用 `div` 取代 `span` 在自定义场景下更符合规范 @uyarn ([#3385](https://github.com/Tencent/tdesign-vue-next/pull/3385))

### 🐞 Bug Fixes

- `Dialog`:
  - 修复 `Dialog plugin` 事件销毁 `Dialog` 未销毁 `wrapper`，导致多个 `wrapper` 在页面 @Zzongke ([#3383](https://github.com/Tencent/tdesign-vue-next/pull/3383))
  - 修复没有定义确认按钮属性场景时（即没有设置 `confirmBtn`），`confirmLoading` 无效问题 @chaishi ([#3393](https://github.com/Tencent/tdesign-vue-next/pull/3393))
- `Table`: 列配置弹框，关闭时默认不销毁 @chaishi ([#3380](https://github.com/Tencent/tdesign-vue-next/pull/3380))
- `Checkbox`: 修复 `checkbox-group` 的 `innerValue.value` 为 `undefined` 导致异常 @Nice-PLQ ([#3405](https://github.com/Tencent/tdesign-vue-next/pull/3405))
- `List`: 修复 `1.5.6` 版本 `list-item` 丢失 `props` 的异常 @uyarn ([#3376](https://github.com/Tencent/tdesign-vue-next/pull/3376))

## 🌈 1.5.6 `2023-09-14`

### 🚀 Features

- `Table`:
  - 可编辑单元格，支持透传编辑组件事件属性 `edit.props.onChange` @chaishi ([#3353](https://github.com/Tencent/tdesign-vue-next/pull/3353))
  - 可高亮行表格，支持鼠标点击高亮表格行，支持键盘操作高亮行（ArrowDown/ArrowUp/Space/ESC/Shift），支持连续高亮行区域 @chaishi ([#3353](https://github.com/Tencent/tdesign-vue-next/pull/3353))
  - 可悬浮表格，除鼠标悬浮表格行之外，本次新增支持键盘操作悬浮表格行 @chaishi ([#3353](https://github.com/Tencent/tdesign-vue-next/pull/3353))
  - 可选中行表格，支持键盘操作（ArrowDown/ArrowUp/Space/ESC/Shift） @chaishi ([#3353](https://github.com/Tencent/tdesign-vue-next/pull/3353))
  - 除全局配置支持语言配置外，本次新增通过属性 `local` 进行单个组件进行语言配置 @chaishi ([#3362](https://github.com/Tencent/tdesign-vue-next/pull/3362))
  - 列配置功能，支持定义 `columnControllerTopContent` 和 `columnControllerBottomContent` 定义列配置弹框顶部或底部内容 @chaishi ([#3362](https://github.com/Tencent/tdesign-vue-next/pull/3362))
  - 列配置功能，支持分组显示列配置信息，一般用于表格列数量特别多，需要分类显示场景 @chaishi ([#3362](https://github.com/Tencent/tdesign-vue-next/pull/3362))
- `SelectInput`: 新增 `valueDisplayOptions`，可配置在使用 `valueDisplay` 时也使用自带的占位符与输入回显实现 @ngyyuusora ([#3342](https://github.com/Tencent/tdesign-vue-next/pull/3342))
- `List`: 支持虚拟滚动的支持 @uyarn ([#3360](https://github.com/Tencent/tdesign-vue-next/pull/3360))
- `TreeSelect`: 支持`panelTopContent`和 `panelBottomContent` 的使用 @uyarn ([#3355](https://github.com/Tencent/tdesign-vue-next/pull/3355))

### 🐞 Bug Fixes

- `Table`:
  - 修复 Dialog 弹框中打开表格，表格中分页组件信息出现超出省略问题 @chaishi ([#3352](https://github.com/Tencent/tdesign-vue-next/pull/3352))
  - 列配置功能，修复每次打开自定义列配置弹框，都会创建一个新的弹框而旧弹框没有消除问题 @chaishi ([#3362](https://github.com/Tencent/tdesign-vue-next/pull/3362))
- `Dialog`:
  - 修复 Dialog 弹框中打开表格，分页组件信息出现超出省略问题 @chaishi ([#3352](https://github.com/Tencent/tdesign-vue-next/pull/3352))
  - 类型问题，修复 DialogPlugin({ cancenBtn: '取消' }) 提醒类型缺失问题 @chaishi ([#3352](https://github.com/Tencent/tdesign-vue-next/pull/3352))
- `Cascader`: 修复 `borderless` 无效 @PengYYYYY ([#3359](https://github.com/Tencent/tdesign-vue-next/pull/3359))
- `Pagination`: 修复 Dialog 弹框中打开表格，分页组件信息出现超出省略问题 @chaishi ([#3352](https://github.com/Tencent/tdesign-vue-next/pull/3352))
- `Input`: 修复默认不显示，满足某种条件后才显示的场景下，自动宽度计算错误问题 @chaishi ([#3352](https://github.com/Tencent/tdesign-vue-next/pull/3352))
- `useResizeObserver`: 修复缺少容器元素判空问题 @chaishi ([#3372](https://github.com/Tencent/tdesign-vue-next/pull/3372))

### 🚧 Others

- `Tree`: 更新可筛选树的 Demo @liweijie0812 ([#3326](https://github.com/Tencent/tdesign-vue-next/pull/3326))

## 🌈 1.5.4 `2023-09-07`

### 🚀 Features

- `Table`: @chaishi
  - 可筛选表格，`onFilterChange` 事件新增参数 `trigger: 'filter-change' | 'confirm' | 'reset' | 'clear'`，表示触发筛选条件变化的来源 ([#3316](https://github.com/Tencent/tdesign-vue-next/pull/3316))
  - 可筛选表格，支持使用 `filter.label` 单独定义晒选项别名，可以和 `title` 标题不一样 ([#3321](https://github.com/Tencent/tdesign-vue-next/pull/3321))
- `Watermark`: 文字新增`fontFamily`属性 @LadyChatterleyLover ([#3314](https://github.com/Tencent/tdesign-vue-next/pull/3314))
- `Dialog`: @chaishi
  - 支持使用 `confirmLoading` 控制确认按钮加载状态 ([#3343](https://github.com/Tencent/tdesign-vue-next/pull/3343))
  - 组件实例函数新增 `confirmDialog.setConfirmLoading(true)` 和 `confirmDialog.update({ confirmLoading: true })`，用于设置确认按钮加载状态 ([#3343](https://github.com/Tencent/tdesign-vue-next/pull/3343))
- `TreeSelect`: 树选择支持 suffix 和 suffixIcon @ngyyuusora ([#3290](https://github.com/Tencent/tdesign-vue-next/pull/3290))

### 🐞 Bug Fixes

- `Form`: 修复 form 组件 scrollToFirstError 无效的问题 @dreamlords ([#3294](https://github.com/Tencent/tdesign-vue-next/pull/3294))
- `Table`: @chaishi
  - 可筛选表格，修复 `resetValue` 在清空筛选时，未能重置到指定 `resetValue` 值的问题 ([#3316](https://github.com/Tencent/tdesign-vue-next/pull/3316))
  - 可筛选表格，修复晒选项的值为 `false` 时，筛选图标未能高亮问题 ([#3321](https://github.com/Tencent/tdesign-vue-next/pull/3321))
  - 树形结构，可拖拽调整行顺序，修复最后一个节点展开的子节点位置不正确问题 ([#3296](https://github.com/Tencent/tdesign-vue-next/pull/3296))
  - 树形结构，修复 `v1.5.3` 中 `tree.defaultExpandAll` 失效问题 ([#3296](https://github.com/Tencent/tdesign-vue-next/pull/3296))
  - 树形结构表格，修复 expandedTreeNodes.sync 和 @expanded-tree-nodes-change 使用 expandTreeNodeOnClick 时无效问题
  - 支持不使用 columnController 时也可以使用列配置 @ngyyuusora ([#3301](https://github.com/Tencent/tdesign-vue-next/pull/3301))
  - 可筛选表格，解决 `title` 使用函数或插槽定义时，过滤结果行文本显示问题 ([#3321](https://github.com/Tencent/tdesign-vue-next/pull/3321))
  - 可编辑表格，修复多个可编辑表格同时存在时，校验互相影响问题 ([#3341](https://github.com/Tencent/tdesign-vue-next/pull/3341))
- `Image`: 修复 `fallback` 在第一次加载失败后无效问题 @chaishi ([#3319](https://github.com/Tencent/tdesign-vue-next/pull/3319))
- `Select`: 修复下拉框多选状态下不显示前缀图标 @LadyChatterleyLover ([#3323](https://github.com/Tencent/tdesign-vue-next/pull/3323))
- `Menu`: 修复双层菜单未配置`router`时 to 属性无法基于`vue-router`默认跳转的缺陷 @uyarn ([#3325](https://github.com/Tencent/tdesign-vue-next/pull/3325))
- `Breadcrumb`: 修复未配置`router`时 to 属性无法基于`vue-router`默认跳转的缺陷 @uyarn ([#3325](https://github.com/Tencent/tdesign-vue-next/pull/3325))
- `Transfer`: 修复穿梭框组件无法搜索深层级树形结构数据 @LadyChatterleyLover ([#3336](https://github.com/Tencent/tdesign-vue-next/pull/3336))
- `Form`: 修复 form 组件 scrollToFirstError 无效的问题 @dreamlords ([#3294](https://github.com/Tencent/tdesign-vue-next/pull/3294))

## 🌈 1.5.3 `2023-08-29`

### 🚀 Features

- `Upload`: 上传组件 `theme='image'` 时，在 `disabled` 状态不显示上传按钮 @yuzunyue ([#3277](https://github.com/Tencent/tdesign-vue-next/pull/3277))
- `Input`: 添加 `maxlength` 属性 `String` 类型 @Zz-ZzzZ ([#3271](https://github.com/Tencent/tdesign-vue-next/pull/3271))
- `Textarea`: 添加 `maxlength` 属性 `String` 类型 @Zz-ZzzZ ([#3271](https://github.com/Tencent/tdesign-vue-next/pull/3271))
- `Table`: 树形结构，没有设置 `expandedTreeNodes` 情况下，`data` 数据发生变化时，自动重置收起所有展开节点。如果希望保持展开节点，请使用属性 `expandedTreeNodes` 控制变化后的数据展开节点。原因：表格数据变化前后的节点可能会有不同，`expandedTreeNodes`自然也会不同，组件内部无法预判新数据中展开哪些节点 @chaishi ([#3283](https://github.com/Tencent/tdesign-vue-next/pull/3283))

### 🐞 Bug Fixes

- `Table`:
  - 拖拽排序 + 本地数据分页场景，修复拖拽排序事件参数 `currentIndex/targetIndex/current/target` 等不正确问题 @chaishi ([#3283](https://github.com/Tencent/tdesign-vue-next/pull/3283))
  - 拖拽排序 + 本地数据分页场景，修复在第二页以后的分页数据中拖拽调整顺序后，会自动跳转到第一页问题 @chaishi ([#3283](https://github.com/Tencent/tdesign-vue-next/pull/3283))
  - 支持分页非受控用法的拖拽排序场景 @chaishi ([#3283](https://github.com/Tencent/tdesign-vue-next/pull/3283))
- `Button`: 修复了 `button` 在 `loading` 状态下依然可以触发点击事件的问题 @yuzunyue ([#3269](https://github.com/Tencent/tdesign-vue-next/pull/3269))
- `Upload`: 修复非自动上传时图片缩略图不显示 @imp2002 ([#3276](https://github.com/Tencent/tdesign-vue-next/pull/3276))
- `Menu`: 修复通过 `v-for` 渲染双层菜单时部分属性失效的问题 @uyarn ([#3289](https://github.com/Tencent/tdesign-vue-next/pull/3289))
- `Tabs`: 修复在封装`tabs`组件时内部定义了`slot`后使用`v-for`不渲染的问题 @Zz-ZzzZ ([#3288](https://github.com/Tencent/tdesign-vue-next/pull/3288))
- `Cascader`: 修复 `cascader` 清空时展开状态表现 @PengYYYYY ([#3284](https://github.com/Tencent/tdesign-vue-next/pull/3284))
- `Message`: 修复 `message` 没有触发 `onClose` 事件 @Zzongke ([#3258](https://github.com/Tencent/tdesign-vue-next/pull/3258))

### 🚧 Others

- `Table`: 文档修正 `tree.checkStrictly` 默认值为 `false` @chaishi ([#3283](https://github.com/Tencent/tdesign-vue-next/pull/3283))

## 🌈 1.5.2 `2023-08-22`

### 🚀 Features

- `Table`:
  - 支持使用名为 `ellipsis` 或者 `ellipsis-<colKey>` 的插槽自定义超出省略时的浮层内容，使用方法可参考示例代码 @chaishi ([#3259](https://github.com/Tencent/tdesign-vue-next/pull/3259))
  - 树形结构，支持通过属性 `expandedTreeNodes.sync` 自由控制展开节点，非必传属性 @chaishi ([#3260](https://github.com/Tencent/tdesign-vue-next/pull/3260))
  - 树形结构，新增组件实例方法 `removeChildren`，用于移除子节点 @chaishi ([#3260](https://github.com/Tencent/tdesign-vue-next/pull/3260))
- `Switch`: `onchange` 参数添加 `context: { e: MouseEvent }` @liweijie0812 ([#3247](https://github.com/Tencent/tdesign-vue-next/pull/3247))
- `Keys`: 全局 `keys api` 引用 `common.ts` 导出变量 @PengYYYYY ([#3243](https://github.com/Tencent/tdesign-vue-next/pull/3243))
- `Transfer`: 支持 `targetDraggable`，可对目标列表进行排序，具体使用方式见示例代码 @uyarn ([#3267](https://github.com/Tencent/tdesign-vue-next/pull/3267))

### 🐞 Bug Fixes

- `Menu`: @uyarn ([#3263](https://github.com/Tencent/tdesign-vue-next/pull/3263))
  - 修复普通双层菜单模式路由跳转功能失效的问题
  - 修复普通双层菜单 `click` 事件丢失的问题
- `Table`:
  - 树形结构，修复组件实例方法 展开全部 `expandAll` 问题 @chaishi ([#3260](https://github.com/Tencent/tdesign-vue-next/pull/3260))
  - 点击行展开/点击行选中，修复 `expandOnRowClick` 和 `selectOnRowClick` 无法独立控制行点击执行交互问题 @chaishi ([#3260](https://github.com/Tencent/tdesign-vue-next/pull/3260))
- `Upload`: 修复 `showUploadProgress` 属性不生效 @imp2002 ([#3245](https://github.com/Tencent/tdesign-vue-next/pull/3245))
- `Switch`: 调整 `disabled` 禁用优先级，`Switch.disabled > Form.disabled` @liweijie0812 ([#3247](https://github.com/Tencent/tdesign-vue-next/pull/3247))
- `Link`: 调整 `disabled` 禁用优先级，`Link.disabled > Form.disabled` @liweijie0812 ([#3252](https://github.com/Tencent/tdesign-vue-next/pull/3252))

### 🚧 Others

- `Transfer`: 树形示例增加 `keys` 配置，方便了解使用方式 @uyarn ([#3267](https://github.com/Tencent/tdesign-vue-next/pull/3267))

## 🌈 1.5.1 `2023-08-15`

### 🚨 Breaking Changes

- `Icon`: @uyarn ([#3174](https://github.com/Tencent/tdesign-vue-next/pull/3174))
  - 新增 960 个图标
  - 调整图标命名，`photo` 为 `camera`，`books` 为 `bookmark`, `stop-cirle-1` 为 `stop-circle-stroke`；
  - 移除 `money-circle` 图标，具体请查看图标页面

### 🚀 Features

- `Select`:
  - 支持透传 `label` 属性，定义内部标签名称 @chaishi ([#3212](https://github.com/Tencent/tdesign-vue-next/pull/3212))
  - 增加 `keys.disabled` 用于定制字段控制选项的禁用 @PengYYYYY ([#3202](https://github.com/Tencent/tdesign-vue-next/pull/3202))
- `Table`: 可编辑单元格场景，新增 `edit.keepEditMode` ，用于保持单元格始终为编辑模式 @chaishi ([#3199](https://github.com/Tencent/tdesign-vue-next/pull/3199))
- `Link`: 新增透传 `download` 属性，支持浏览器直接下载 () @xiaosansiji ([#3201](https://github.com/Tencent/tdesign-vue-next/pull/3201))
- `Guide`: 完整支持自定义高亮框 @zhangpaopao0609 ([#3111](https://github.com/Tencent/tdesign-vue-next/pull/3111))
- `Button`: 支持使用 `tab` 键聚焦 @chaishi ([#3218](https://github.com/Tencent/tdesign-vue-next/pull/3218))
- `Checkbox`: 支持使用空格键选中或取消选中 @chaishi ([#3218](https://github.com/Tencent/tdesign-vue-next/pull/3218))
- `Radio`: 支持使用空格键选中或取消选中 @chaishi ([#3218](https://github.com/Tencent/tdesign-vue-next/pull/3218))
- `Form`: `FormItem` 组件支持遗漏的属性 `status` 和 `tips`，用于定义不同状态的提升文本；其中 `tips` 支持插槽形式 @chaishi ([#3225](https://github.com/Tencent/tdesign-vue-next/pull/3225))
- `InputNumber`: `tips` 支持使用插槽自定义 @chaishi ([#3225](https://github.com/Tencent/tdesign-vue-next/pull/3225))
- `TreeSelect`: 增加 `keys` 字段用于定制数据中对应的字段别名 @PengYYYYY ([#3202](https://github.com/Tencent/tdesign-vue-next/pull/3202))
- `Cascader`: 增加 `keys.disabled` 用于定制字段控制节点的禁用 @PengYYYYY ([#3202](https://github.com/Tencent/tdesign-vue-next/pull/3202))
- `Tree`: 增加 `keys.disabled` 用于定制字段控制节点的禁用 @PengYYYYY ([#3202](https://github.com/Tencent/tdesign-vue-next/pull/3202))
- `Transfer`: 增加 `keys.disabled` 用于定制字段控制选项的禁用 @PengYYYYY ([#3202](https://github.com/Tencent/tdesign-vue-next/pull/3202))
- `ImageViewer`: 修复图片浏览的全局配置无效 @sinbadmaster ([#3236](https://github.com/Tencent/tdesign-vue-next/pull/3236))
- `MenuItem`: 修复点击后的回调函数报错 @PengYYYYY ([#3237](https://github.com/Tencent/tdesign-vue-next/pull/3237))

### 🐞 Bug Fixes

- `Table`:
  - 修复 `dragSort` 配置为 `row-handler-col` 时拖拽排序不生效的问题 @nined9 ([#2717](https://github.com/Tencent/tdesign-vue-next/pull/2717))
  - 虚拟滚动场景，修复默认的滚动条长度（位置）和滚动后的不一致问题 @chaishi ([#3199](https://github.com/Tencent/tdesign-vue-next/pull/3199))
- `Popup`: `overlayEl` 未绑定，第一次点开无法定位到选中项 @AuYuHui ([#3189](https://github.com/Tencent/tdesign-vue-next/pull/3189))
- `Menu`: 修复同一个 `MenuItem` 多次触发 `onChange` 的问题 @leezng ([#3187](https://github.com/Tencent/tdesign-vue-next/pull/3187))
- `SelectInput`: 修复宽度自适应模式 `autoWidth` 下拉框宽度过窄问题 @chaishi ([#3212](https://github.com/Tencent/tdesign-vue-next/pull/3212))
- `Select`: 修复宽度自适应模式 `autoWidth` 下拉框宽度过窄问题 @chaishi ([#3212](https://github.com/Tencent/tdesign-vue-next/pull/3212))
- `Link`: 修复 `target` 属性未传时，实际渲染 `<a />` 标签会显示 `target` 空属性的问题 @xiaosansiji ([#3201](https://github.com/Tencent/tdesign-vue-next/pull/3201))
- `TreeSelect`: 自定义显示 `tag` 关闭异常 @sinbadmaster ([#3217](https://github.com/Tencent/tdesign-vue-next/pull/3217))
- `Form`: 修复 `scrollToFirstError` 无法滚动到 `<form-item :name="list[${index}].name"` 这样的列表元素问题 @chaishi ([#3225](https://github.com/Tencent/tdesign-vue-next/pull/3225))
- `ImageViewer`: 清除图片查看状态 @sinbadmaster ([#3224](https://github.com/Tencent/tdesign-vue-next/pull/3224))
- `MenuItem`: `onClick` 事件参数调整 @dexterBo ([#3228](https://github.com/Tencent/tdesign-vue-next/pull/3228))
- `Tree`: 修复 `tree` 组件深度监听问题 @PengYYYYY ([#3232](https://github.com/Tencent/tdesign-vue-next/pull/3232))

### 🚧 Others

- `Demo`: 修复 `form` 的 `custom-validator` 示例代码 @PengYYYYY ([#3205](https://github.com/Tencent/tdesign-vue-next/pull/3205))
- `Icon`: 新增分类展示全部图标的 UI @uyarn ([#3174](https://github.com/Tencent/tdesign-vue-next/pull/3174))
- `InputNumber`: `tips` 使用统一的类名 `.t-tips` 和 `t-is-xxx` @chaishi ([#3225](https://github.com/Tencent/tdesign-vue-next/pull/3225))
- `Cascader`: 补充 `borderless` 文档 @PengYYYYY ([#3202](https://github.com/Tencent/tdesign-vue-next/pull/3202))
- `Test`: 修复测试告警 @PengYYYYY ([#3229](https://github.com/Tencent/tdesign-vue-next/pull/3229))
- `Affix`: 修复 `offsetBottom/offsetTop` 文档描述 @xiaosansiji ([#3233](https://github.com/Tencent/tdesign-vue-next/pull/3233))
- `Treeselect`: 修复 `keys` 文档描述 @xiaosansiji ([#3233](https://github.com/Tencent/tdesign-vue-next/pull/3233))

## 🌈 1.4.2 `2023-08-02`

### 🚀 Features

- `Table`: 可筛选表格，当前 `filterValue` 未设置过滤值的默认值时，不再透传 `undefined` 到筛选器组件，某些组件的默认值必须为数组，不允许是 `undefined` @chaishi ([#3164](https://github.com/Tencent/tdesign-vue-next/pull/3164))
- `Table`: 可筛选表格，支持透传 `attrs/style/classNames` 属性、样式、类名等信息到自定义组件 @chaishi ([#3164](https://github.com/Tencent/tdesign-vue-next/pull/3164))

### 🐞 Bug Fixes

- `Table`: 固定表头固定列空数据场景，“暂无数据”错位显示问题 @chaishi ([#3167](https://github.com/Tencent/tdesign-vue-next/pull/3167))
- `Table`: 远程分页使用非受控用法时，切换超过 `defaultPageSize` 的页面大小数据展示不全 @ngyyuusora ([#3173](https://github.com/Tencent/tdesign-vue-next/pull/3173))

### 🚧 Others

- `Image`: 代码整理 @chaishi ([#3167](https://github.com/Tencent/tdesign-vue-next/pull/3167))

## 🌈 1.4.1 `2023-07-27`

### 🐞 Bug Fixes

- `Table`: 可编辑表格校验错误信息样式不对齐 @chaishi ([#3155](https://github.com/Tencent/tdesign-vue-next/pull/3155))
- `Tree`: 树选择器单选无法选中 @uyarn ([#3159](https://github.com/Tencent/tdesign-vue-next/pull/3159))

### 🚧 Others

- `Common`: 输入框类组件的 `tips` 使用统一的文本提示样式，注意 `tips` 类名变更 @chaishi ([#3155](https://github.com/Tencent/tdesign-vue-next/pull/3155))

## 🌈 1.4.0 `2023-07-26`

### 🚀 Features

- `TimePicker`:
  - `disableTime` 回调新增毫秒参数 @uyarn ([#3151](https://github.com/Tencent/tdesign-vue-next/pull/3151))
  - 优化展示不可选时间选项时滚动到不可选选项的体验 @uyarn ([#3151](https://github.com/Tencent/tdesign-vue-next/pull/3151))
- `Menu`: 重构侧边栏导航子菜单展开/收起动画实现，修复 `SubMenu` 菜单项过多时无法完整展示的问题 @xiaosansiji ([#3140](https://github.com/Tencent/tdesign-vue-next/pull/3140))
- `Image`: 属性 `src` 支持传入 `File` 文件类型显示图片 @chaishi ([#3136](https://github.com/Tencent/tdesign-vue-next/pull/3136))
- `ImageViewer`: 属性 `images` 支持传入 `File` 文件类型预览图片 @chaishi ([#3136](https://github.com/Tencent/tdesign-vue-next/pull/3136))
- `Upload`: 文件上传列表支持显示缩略图，通过 `showThumbnail` 属性控制 @chaishi ([#3136](https://github.com/Tencent/tdesign-vue-next/pull/3136))

### 🐞 Bug Fixes

- `Table`:
  - 可编辑表格场景，支持设置 `colKey` 值为链式属性，如：`a.b.c` @chaishi ([#3137](https://github.com/Tencent/tdesign-vue-next/pull/3137))
  - 可编辑表格场景，行编辑，`edit.props` 和 `edit.on` 为函数时，新增参数 `updateEditedCellValue` 用于更新编辑状态的表格数据 @chaishi ([#3137](https://github.com/Tencent/tdesign-vue-next/pull/3137))
  - 列宽调整 + 表头吸顶 + 列配置自定义综合场景下，列宽变少时，表格宽度无法恢复原来的宽度 @chaishi ([#3137](https://github.com/Tencent/tdesign-vue-next/pull/3137))
  - 修复可编辑单元格场景，执行 `validateTableData` 函数后，没有触发事件 `onValidate` 问题 @chaishi ([#3143](https://github.com/Tencent/tdesign-vue-next/pull/3143))
- `Tree`: 修复 `active` 事件中，参数 `context` 中 `actived` 值和实际状态相反 @gaoachao ([#3134](https://github.com/Tencent/tdesign-vue-next/pull/3134))
- `Button`: 禁用优先级, `Button.disabled > Form.disabled` @liweijie0812 ([#3133](https://github.com/Tencent/tdesign-vue-next/pull/3133))
- `InputNumber`: `decimalPlaces` 存在时，数值满足要求，用户未操作，就已经触发 `onChange` 事件问题 @chaishi ([#3145](https://github.com/Tencent/tdesign-vue-next/pull/3145))
- `Menu`: 修复 `MenuItem` 的 `click` 点击事件未传递 `event` 参数的问题 @xiaosansiji ([#3140](https://github.com/Tencent/tdesign-vue-next/pull/3140))

## 🌈 1.3.12 `2023-07-19`

### 🚀 Features

- `Checkbox`: @chaishi ([#3103](https://github.com/Tencent/tdesign-vue-next/pull/3103))
  - 新增支持键盘控制选项选中或取消选中
  - 新增支持 `lazyLoad`，用于需要渲染大量数据，或懒加载复杂内容/图片场景

### 🐞 Bug Fixes

- `Input`:
  - 输入框的 `value` 类型移除 `Number` @liweijie0812 ([#3100](https://github.com/Tencent/tdesign-vue-next/pull/3100))
  - 恢复部分属性默认值数据类型定义 @chaishi ([#3102](https://github.com/Tencent/tdesign-vue-next/pull/3102))
  - 修复 `prefixIcon` 的 `padding` 样式问题 @uyarn ([#3113](https://github.com/Tencent/tdesign-vue-next/pull/3113))
- `Rate`: 修复 `rate` 在开启文字显示与半星时，`tooltip` 显示异常的问题 @xixileng ([#3097](https://github.com/Tencent/tdesign-vue-next/pull/3097))
- `InputNumber`: 修复 `input-number` 内容为空时，值为 `undefined` 的问题，应当为 `null` @xixileng ([#3098](https://github.com/Tencent/tdesign-vue-next/pull/3098))
- `Checkbox`: 修复 `Form.disabled` 表单无法统一控制 `Checkbox` 组件禁用状态问题 @chaishi ([#3103](https://github.com/Tencent/tdesign-vue-next/pull/3103))
- `Select`: 修复 `autofocus` 不生效的问题 @xixileng ([#3112](https://github.com/Tencent/tdesign-vue-next/pull/3112))
- `Radio`: 优化选项组换行情况 @ontheroad1992 ([#3081](https://github.com/Tencent/tdesign-vue-next/pull/3081))
- `Icon`: 修复 `manifest` 字段影响开发阶段请求的问题 @uyarn ([#3113](https://github.com/Tencent/tdesign-vue-next/pull/3113))
- `TagInput`: 修复 `tag-input` 前缀不居中且会发生抖动的问题 @xixileng @uyarn ([#3113](https://github.com/Tencent/tdesign-vue-next/pull/3113))
- `Transfer`: 修复 `t-transfer__list-item` 与 `t-checkbox` 优先级问题 @uyarn ([#3113](https://github.com/Tencent/tdesign-vue-next/pull/3113))
- `Select`: 修复使用 `tab` 键聚焦时无法输入内容的问题 @xixileng ([#3119](https://github.com/Tencent/tdesign-vue-next/pull/3119))
- `Stickytool`: 修复 `sticky-item` 组件内部无法更新数据的问题 @uyarn ([#3118](https://github.com/Tencent/tdesign-vue-next/pull/3118))
- `Dialog`: `dialog plugin` 执行 `destroy` 方法时，销毁组件实例 @xixileng ([#3095](https://github.com/Tencent/tdesign-vue-next/pull/3095))
- `DatePicker`: 优化关闭浮层后重置默认选中区域 @honkinglin ([#3107](https://github.com/Tencent/tdesign-vue-next/pull/3107))
- `Grid`: `Row` 的参数 `gutter` 类型补充 `lg,xl,xxl` @liweijie0812 ([#3105](https://github.com/Tencent/tdesign-vue-next/pull/3105))

### 🚧 Others

- `Form`: 示例代码中 `email` 使用 `t-auto-complete` 组件替换 @liweijie0812 ([#3101](https://github.com/Tencent/tdesign-vue-next/pull/3101))

## 🌈 1.3.11 `2023-07-12`

### 🚀 Features

- `Upload`: @chaishi ([#3074](https://github.com/Tencent/tdesign-vue-next/pull/3074))
  - 新增组件实例方法，`uploadFilePercent` 用于更新文件上传进度
  - `theme=image`，支持使用 `fileListDisplay` 自定义 UI 内容
  - `theme=image`，支持点击名称打开新窗口访问图片
  - 拖拽上传场景，支持 `accept` 文件类型限制
  - 去除图片文件名颜色，使用 Link 组件统一颜色
  - 添加文件类型过滤方法 getFileList
- `Textarea`: 支持动态更改 `autosize` 属性 @Zz-ZzzZ ([#3077](https://github.com/Tencent/tdesign-vue-next/pull/3077))
- `MenuItem`: 新增 `API: routerLink`，可指定菜单项渲染为 `Router` 控制跳转的 `a` 标签 @boogie-ben ([#3057](https://github.com/Tencent/tdesign-vue-next/pull/3057))

### 🐞 Bug Fixes

- `Menu`: @boogie-ben ([#3057](https://github.com/Tencent/tdesign-vue-next/pull/3057))
  - 修复 `MenuItem` 渲染为 `a` 标签时，`a` 标签覆盖范围扩大至整个菜单项，而不是只有文本部分
  - 修复菜单项渲染 `a` 标签并且 `menu` 在 `collapsed` 状态时，菜单项内容区隐藏导致无法点击跳转的问题
  - 修复渲染为 `a` 标签时并在 `popup` 出现时，文本对齐与正常菜单项的位置不一致的问题
- `Table`: 修复主动触发页码更新时表格序号列没有重新计算 @tanhh326 ([#3071](https://github.com/Tencent/tdesign-vue-next/pull/3071))
- `Upload`: 自定义上传方法，修复未能正确返回上传成功或失败后的文件问题 @chaishi ([#3074](https://github.com/Tencent/tdesign-vue-next/pull/3074))
- `SelectInput`: 修复使用回退键删除 `input` 中内容时，会删除 `tag` @tanhh326 ([#3072](https://github.com/Tencent/tdesign-vue-next/pull/3072))
- `DateRangePicker`: 修复 `suffix`、`prefix` 无法响应数据变化渲染的问题 @uyarn ([#3085](https://github.com/Tencent/tdesign-vue-next/pull/3085))

### 🚧 Others

- `Upload`: API 添加更多英文描述 @chaishi ([#3074](https://github.com/Tencent/tdesign-vue-next/pull/3074))

## 🌈 1.3.10 `2023-07-05`

### 🚀 Features

- `Table`: 树形结构，添加行层级类名，方便业务设置不同层级的样式 @chaishi ([#3037](https://github.com/Tencent/tdesign-vue-next/pull/3037))
- `Form`: FormRules，添加默认泛型类型 ，如此可以不再强制定义定义类型，直接写 `FormRule` 即可 @chaishi ([#3040](https://github.com/Tencent/tdesign-vue-next/pull/3040))
- `DatePicker`: 新增 `onConfirm` 事件 @liweijie0812 ([#3033](https://github.com/Tencent/tdesign-vue-next/pull/3033))

### 🐞 Bug Fixes

- `Input`: 修复 `limitNumber` 部分在 `disabled` 状态下的样式问题 @uyarn ([#3034](https://github.com/Tencent/tdesign-vue-next/pull/3034))
- `Tree`: 修复单独设置 `checkable` 属性的功能 @TabSpace @uyarn ([#3034](https://github.com/Tencent/tdesign-vue-next/pull/3034))
- `Table`: 修复启用 `multipleSort`，非受控用法不工作 @ngyyuusora ([#3024](https://github.com/Tencent/tdesign-vue-next/pull/3024))
- `Select`: 修复在多选时候的禁用状态 @uyarn ([#3054](https://github.com/Tencent/tdesign-vue-next/pull/3054))
- `Calendar`: 修复自定义日期的实际选择范围与定义不符 @imp2002 ([#3049](https://github.com/Tencent/tdesign-vue-next/pull/3049))
- `TagInput`: 修复前置图标的样式缺陷 @uyarn ([#3058](https://github.com/Tencent/tdesign-vue-next/pull/3058))
- `SelectInput`: 修复失焦时未清空输入内容的缺陷 @uyarn ([#3058](https://github.com/Tencent/tdesign-vue-next/pull/3058))
- `Submenu`: 修复 `popup-props` 透传问题 @Kafuu-Chinocya ([#3061](https://github.com/Tencent/tdesign-vue-next/pull/3061))
- `DatePicker`: 修复 `value` 为 `null` 时的报错 @liweijie0812 ([#3053](https://github.com/Tencent/tdesign-vue-next/pull/3053))
- `InputNumber`: 修复输入值为 `0` 时，不执行纠正 @imp2002 ([#3048](https://github.com/Tencent/tdesign-vue-next/pull/3048))

## 🌈 1.3.9 `2023-06-29`

### 🚀 Features

- `Table`: 列宽调整场景，新增事件 `onColumnResizeChange`，在列宽调整后触发 @chaishi ([#3007](https://github.com/Tencent/tdesign-vue-next/pull/3007))
- `Image`: 支持 `referrerpolicy` @btea ([#3014](https://github.com/Tencent/tdesign-vue-next/pull/3014))

### 🐞 Bug Fixes

- `Checkbox`:
  - 复选框列表渲染性能优化，选择或取消某一个选项时，不再重复渲染全部复选框 @chaishi ([#3011](https://github.com/Tencent/tdesign-vue-next/pull/3011))
  - 复选框禁用逻辑优先级顺序修复，应当为：`Form.disabled < CheckboxGroup.disabled < Checkbox.disabled` @chaishi ([#3011](https://github.com/Tencent/tdesign-vue-next/pull/3011))
  - 修复带禁用按钮的全选逻辑问题。 @chaishi ([#3011](https://github.com/Tencent/tdesign-vue-next/pull/3011))
- `Table`: 列配置和列宽调整场景，修复列数量由多变少时未能更新宽度问题 @chaishi ([#3007](https://github.com/Tencent/tdesign-vue-next/pull/3007))
- `Tabs`: 移除文档中 `onChange` 不存在的参数 @Zz-ZzzZ ([#2974](https://github.com/Tencent/tdesign-vue-next/pull/2974))
- `Dropdown`: 修复通过组合 `v-for` 和单个 item 渲染组件丢失节点的缺陷 @uyarn ([#3026](https://github.com/Tencent/tdesign-vue-next/pull/3026))
- `Pagination`: `onchage` 触发获取 `current` 是旧值 @liweijie0812 ([#3030](https://github.com/Tencent/tdesign-vue-next/pull/3030))

### 🚧 Others

- `Docs`: 增加英文文档站点
- `Dropdown`: 调整 `dropdown` 示例 增加 `trigger click` 用法 @uyarn ([#3026](https://github.com/Tencent/tdesign-vue-next/pull/3026))

## 🌈 1.3.8 `2023-06-20`

### 🐞 Bug Fixes

- `ColorPicker`: @uyarn ([#2996](https://github.com/Tencent/tdesign-vue-next/pull/2996))
  - 初始化为渐变模式时，支持空字符串作为初始值
  - 修复 `recentColors` 等字段的类型问题
  - 修复内部下拉选项未透传 `popupProps` 的缺陷
- `Select`: 修复使用 `tagName` 作为 key 时控制台出现告警的问题 @uyarn ([#2980](https://github.com/Tencent/tdesign-vue-next/pull/2980))
- `Upload`: `ts` 类型修复 @kaishuige ([#2990](https://github.com/Tencent/tdesign-vue-next/pull/2990))
- `Table`: 本地数据排序，修复初始排序无效问题 @chaishi ([#2999](https://github.com/Tencent/tdesign-vue-next/pull/2999))
- `TextArea`: 修复不能响应设置 `value` 值后 autosize 自适应失效的问题 @xiaosansiji ([#3002](https://github.com/Tencent/tdesign-vue-next/pull/3002))
- `Guide`: 切换时按钮出现动画 @zhangpaopao0609 ([#2997](https://github.com/Tencent/tdesign-vue-next/pull/2997))
- `Swiper`: 修复 `navigation` 插槽失效的问题 @uyarn ([#3003](https://github.com/Tencent/tdesign-vue-next/pull/3003))

### 🚧 Others

- `Dropdown`: 新增带图标的下拉菜单示例 @aomnisz ([#2995](https://github.com/Tencent/tdesign-vue-next/pull/2995))
- `Table`: 修复文档缺失吸顶表头示例代码问题 @chaishi ([#2999](https://github.com/Tencent/tdesign-vue-next/pull/2999))

## 🌈 1.3.7 `2023-06-14`

### 🚀 Features

- `Menu`: `Submenu` 新增 `popupProps` 属性，允许透传设置底层 `Popup` 弹窗属性 @xiaosansiji ([#2963](https://github.com/Tencent/tdesign-vue-next/pull/2963))
- `Input`: 回车事件不再阻止事件冒泡 @uyarn ([#2968](https://github.com/Tencent/tdesign-vue-next/pull/2968))

### 🐞 Bug Fixes

- `Select`:
  - 修复空字符串无法作为可选值的缺陷 @kaishuige ([#2950](https://github.com/Tencent/tdesign-vue-next/pull/2950))
  - 修复无法通过键盘回车操作选中选项及忽略已过滤选项的缺陷 @uyarn ([#2968](https://github.com/Tencent/tdesign-vue-next/pull/2968))
- `InputNumber`: 初始值为 `undefined/null`，且存在 `decimalPlaces` 时，不再进行小数点纠正 @chaishi ([#2948](https://github.com/Tencent/tdesign-vue-next/pull/2948))
- `Menu`: 修复弹出类菜单内容未对齐的问题 @xiaosansiji ([#2957](https://github.com/Tencent/tdesign-vue-next/pull/2957))
- `Drawer`: 打开抽屉后，无法直接摁 `ESC` 退出，必须先点击抽屉，才可关闭 @kaishuige ([#2958](https://github.com/Tencent/tdesign-vue-next/pull/2958))
- `Timeline`: 修复 `timeline-item` 内容不支持热更新的缺陷 @uyarn ([#2965](https://github.com/Tencent/tdesign-vue-next/pull/2965))
- `Table`: 修复在多级表头中使用筛选功能，显示异常问题 @youlvlv ([#2966](https://github.com/Tencent/tdesign-vue-next/pull/2966))

### 🚧 Others

- `Menu`: 去除子菜单 `inline` 样式，改为样式类实现，方便通过全局 `Design Token` 方式调整尺寸和间距等 @xiaosansiji ([#2957](https://github.com/Tencent/tdesign-vue-next/pull/2957))
- `Table`: 修复可筛选表格，自定义筛选筛选器的 `type` 的类型错误问题 @youlvlv ([#2964](https://github.com/Tencent/tdesign-vue-next/pull/2964))

## 🌈 1.3.6 `2023-06-07`

### 🚀 Features

- `Menu`: 侧边导航菜单收起时，`Tooltip` 展示菜单内容 @xiaosansiji ([#2921](https://github.com/Tencent/tdesign-vue-next/pull/2921))

### 🐞 Bug Fixes

- `Menu`:
  - 修复顶部导航菜单位置有误的问题 @xiaosansiji ([#2927](https://github.com/Tencent/tdesign-vue-next/pull/2927))
  - 修复 `theme = dark` 模式下弹窗菜单缺少边框样式的问题 @xiaosansiji ([#2927](https://github.com/Tencent/tdesign-vue-next/pull/2927))
- `InputNumber`:
  - 修复部分小数点数字无法输入问题 @chaishi ([#2918](https://github.com/Tencent/tdesign-vue-next/pull/2918))
  - 支持默认数字格式化小数点 @chaishi ([#2942](https://github.com/Tencent/tdesign-vue-next/pull/2942))
- `Radio`: 修复 `label` 无效问题 @Aicmortal ([#2919](https://github.com/Tencent/tdesign-vue-next/pull/2919))
- `Select`: 修正当 `options` 数据存在 `className` 而导致选项样式会被意外污染的问题 @PDieE ([#2920](https://github.com/Tencent/tdesign-vue-next/pull/2920))
- `ImageViewer`: 修复图片链接带有参数时，下载时文件扩展名丢失 @nined9 ([#2936](https://github.com/Tencent/tdesign-vue-next/pull/2936))
- `InputAdornment`: 修复`1.3.5`中修复空字符串导致插槽没有正常渲染的问题 @uyarn ([#2944](https://github.com/Tencent/tdesign-vue-next/pull/2944))
- `Table`: 在多级表头中使用筛选功能，无法正常反显@youlvlv ([#2943](https://github.com/Tencent/tdesign-vue-next/pull/2943))

### 🚧 Others

- `Test`: `vitest config` 分离和 `cypress` 升级 @PengYYYYY ([#2913](https://github.com/Tencent/tdesign-vue-next/pull/2913))

## 🌈 1.3.5 `2023-05-30`

### 🚀 Features

- `TagInput`: 增加 `focus` 方法的导出 @coderbaozi ([#2893](https://github.com/Tencent/tdesign-vue-next/pull/2893))
- `TimePicker`: 没有选中值时不允许点击确认按钮 @uyarn ([#2898](https://github.com/Tencent/tdesign-vue-next/pull/2898))
- `Cascader`: 选项支持自定义样式 @ZekunWu ([#2878](https://github.com/Tencent/tdesign-vue-next/pull/2878))

### 🐞 Bug Fixes

- `Pagination`: 修复表格内容为空时，页码值不正常问题 @yanxugong ([#2886](https://github.com/Tencent/tdesign-vue-next/pull/2886))
- `Table`: 修复在多级表头中使用筛选功能，显示异常问题 @yanxugong ([#2892](https://github.com/Tencent/tdesign-vue-next/pull/2892))
- `Dialog`: 全屏状态下关闭 `footer`,仍然占据 `body` 高度 @ccccpj ([#2897](https://github.com/Tencent/tdesign-vue-next/pull/2897))
- `Backtop`: 修复 `visibleHeight` 只作用一次的问题 @uyarn ([#2898](https://github.com/Tencent/tdesign-vue-next/pull/2898))
- `Tooltip`: 修复 `1.3.4` 版本的箭头位置异常的样式问题 @uyarn ([#2898](https://github.com/Tencent/tdesign-vue-next/pull/2898))
- `AutoComplete`: 修正当 `options` 在空数组和非空数组之间来回切换时会导致 `triggerElement` 失去焦点的问题 @PDieE ([#2901](https://github.com/Tencent/tdesign-vue-next/pull/2901))
- `Tree`: 修正由于 `Tree` 组件错误过滤了 `allowFoldNodeOnFilter` 而导致该参数无效的问题 @PDieE ([#2906](https://github.com/Tencent/tdesign-vue-next/pull/2906))
- `InputAdornment`: 修复 `prepend` 或 `append` 为空字符串时仍然渲染节点的问题 @uyarn ([#2910](https://github.com/Tencent/tdesign-vue-next/pull/2910))
- `ImageViewer`: `closeBtn` 渲染异常 @sinbadmaster ([#2875](https://github.com/Tencent/tdesign-vue-next/pull/2875))
- `Test`: 修复单元测试 `log` 抛出大量异常 @PengYYYYY ([#2896](https://github.com/Tencent/tdesign-vue-next/pull/2896))

## 🌈 1.3.4 `2023-05-19`

### 🐞 Bug Fixes

- `Watermark`: 修复 `watermark-content` 参数响应式丢失@Lmmmmmm-bb ([#2852](https://github.com/Tencent/tdesign-vue-next/pull/2852))
- `RadioGroup`: 修复父元素 `width` 设置为 `100%`, 滑动块样式不会自动重新计算位置和偏移 @Julone ([#2854](https://github.com/Tencent/tdesign-vue-next/pull/2854))
- `Message`: 修复同时显示多个 `Message` 时，会关闭错误的缺陷 @qweasdzxcpkh ([#2861](https://github.com/Tencent/tdesign-vue-next/pull/2861))
- `DatePicker`: 修复单独使用面板时 `TimePicker` 无法更改问题 @coderbaozi ([#2842](https://github.com/Tencent/tdesign-vue-next/pull/2842))
- `TagInput`: 修复组件初始值异常的问题 @uyarn ([#2864](https://github.com/Tencent/tdesign-vue-next/pull/2864))
- `Textarea`: 修复 `autosize` 为 `null` 报错的问题 @uyarn ([#2864](https://github.com/Tencent/tdesign-vue-next/pull/2864))

### 🚧 Others

- `Image`: 交互示例 @liweijie0812 ([#2845](https://github.com/Tencent/tdesign-vue-next/pull/2845))
- `DatePicker`: 更新提示文案 @nined9 ([#2844](https://github.com/Tencent/tdesign-vue-next/pull/2844))

## 🌈 1.3.3 `2023-05-12`

### 🚀 Features

- `ColorPicker`: 新增 `size` 和 `enableMultipleGradient` API @uyarn ([#2803](https://github.com/Tencent/tdesign-vue-next/pull/2803))
- `Upload`: 组件支持 `uploadPastedFiles` 配置 @yanxugong ([#2814](https://github.com/Tencent/tdesign-vue-next/pull/2814))
- `Select`: `onChange` 事件 `context` 新增`option`参数 用于获取选中项完整内容 @uyarn ([#2831](https://github.com/Tencent/tdesign-vue-next/pull/2831))
- `Tree`: `TreeItem` 新增 `draggable` 属性，允许某些节点不可拖拽 @decadef20 ([#2815](https://github.com/Tencent/tdesign-vue-next/pull/2815))

### 🐞 Bug Fixes

- `Select`:
  - 修复 `1.3.2` 版本 控制台 warning 的异常 @uyarn ([#2809](https://github.com/Tencent/tdesign-vue-next/pull/2809))
  - 限制可选数目无效 @AuYuHui ([#2828](https://github.com/Tencent/tdesign-vue-next/pull/2828))
  - 超出最大限制后选项可点击 @Zz-ZzzZ ([#2829](https://github.com/Tencent/tdesign-vue-next/pull/2829))
  - `clearable` 时 `value` 为 `undefined` 问题 @wangyang0210 ([#2678](https://github.com/Tencent/tdesign-vue-next/pull/2678))
- `Popup`:
  - 修复 `onScrollToBottom` 在部分 windows 环境下无法触发的问题 @uyarn ([#2834](https://github.com/Tencent/tdesign-vue-next/pull/2834))
  - 修复调用组件暴露的`close()`时报错 @Zz-ZzzZ ([#2838](https://github.com/Tencent/tdesign-vue-next/pull/2838))
- `Table`: 开启省略号 `ellipsis` 和虚拟滚动后，快速滚动控制台报读取 `null` 的属性异常 @nined9 ([#2799](https://github.com/Tencent/tdesign-vue-next/pull/2799))
- `Image`: 修复 `nuxt3` 环境下 `onload` 无效 @liweijie0812 ([#2840](https://github.com/Tencent/tdesign-vue-next/pull/2840))

### 🚧 Others

- `Tree`: 修复展开操作的 `demo` 中无法切换数据的问题 @palmcivet ([#2806](https://github.com/Tencent/tdesign-vue-next/pull/2806))

## 🌈 1.3.2 `2023-04-28`

### 🚀 Features

- `Select`: 支持`panelTopContent`在虚拟滚动等需要滚动下拉框场景的使用 具体使用方式请看示例 @uyarn ([#2777](https://github.com/Tencent/tdesign-vue-next/pull/2777))

### 🐞 Bug Fixes

- `DatePicker`:
  - 修复第二次点击面板关闭异常问题 @honkinglin ([#2781](https://github.com/Tencent/tdesign-vue-next/pull/2781))
  - 修复 `valueType` 的 `validator` 校验错误 @nined9 ([#2757](https://github.com/Tencent/tdesign-vue-next/pull/2757))
- `Select`: @uyarn ([#2777](https://github.com/Tencent/tdesign-vue-next/pull/2777))
  - 修复 `defaultValue` 默认值异常的问题
  - 修复单选模式 `inputClass` 未生效的问题
- `Table`:
  - 修复取消表尾吸底时 `requestAnimationFrame` 在 `Unmounted` 之后仍执行了一次导致的异常问题 @nined9 ([#2745](https://github.com/Tencent/tdesign-vue-next/pull/2745))
  - 修复设置固定行位置信息时出现 tr 不存在情况时导致的异常报错 @nined9 ([#2760](https://github.com/Tencent/tdesign-vue-next/pull/2760))
- `Pagination`: 修复切换语言时未重新渲染内容的缺陷 @uyarn ([#2775](https://github.com/Tencent/tdesign-vue-next/pull/2775))
- `Link`: 表单设置禁用不生效 @liweijie0812 ([#2783](https://github.com/Tencent/tdesign-vue-next/pull/2783))
- `Input`: 修复 `input` 组件 `type = hidden` 时，组件边框依然被显示的问题 @PengYYYYY ([#2776](https://github.com/Tencent/tdesign-vue-next/pull/2776))

### 🚧 Others

- `Datepicker`: 修复示例代码报错 @honkinglin ([#2761](https://github.com/Tencent/tdesign-vue-next/pull/2761))

## 🌈 1.3.1 `2023-04-21`

### 🚀 Features

- `Theme`: 主题生成器升级到 `v1` 版本 @uyarn ([#2747](https://github.com/Tencent/tdesign-vue-next/pull/2747))

### 🐞 Bug Fixes

- `Popup`: 修复触发元素隐藏时，`popper` 仍显示到页面左上角的问题() @nined9 ([#2713](https://github.com/Tencent/tdesign-vue-next/pull/2713))
- `Select`: 修复多选选项点击触发多次导致虚拟滚动切换普通模式时无法选中的问题 @uyarn ([#2734](https://github.com/Tencent/tdesign-vue-next/pull/2734))
- `Image`: 修复 `SSR` 环境下的 `loading` 问题 @liweijie0812 ([#2738](https://github.com/Tencent/tdesign-vue-next/pull/2738))
- `DatePicker`: 支持 `onPresetClick` 事件 @honkinglin ([#2743](https://github.com/Tencent/tdesign-vue-next/pull/2743))
- `StickyTool`: 修复单独引入 `StickyItem` 没有正常渲染的问题 @uyarn ([#2751](https://github.com/Tencent/tdesign-vue-next/pull/2751))
- `ColorPicker`: 修复渐变模式下 `hex` 和 `rgb` 模式下输入无法修改渐变点颜色的缺陷 @uyarn ([#2751](https://github.com/Tencent/tdesign-vue-next/pull/2751))
- `DatePicker`: 修复 `valueType` 参数校验错误
- `Icon`: 修复 `manifest` 统一入口导出 `esm` 模块，文档为及时更新的问题 @Layouwen ([#2739](https://github.com/Tencent/tdesign-vue-next/pull/2739))

### 🚧 Others

- `Select`: `usage  bordered` 属性废弃移除 @liweijie0812 ([#2723](https://github.com/Tencent/tdesign-vue-next/pull/2723))
- `Nuxt3`: 增加 `nuxt3` 使用文档 @liweijie0812 ([#2726](https://github.com/Tencent/tdesign-vue-next/pull/2726))

## 🌈 1.3.0 `2023-04-13`

### 🚀 Features

- `BackTop`: 新增 `BackTop` 组件 @shinyina ([#2665](https://github.com/Tencent/tdesign-vue-next/pull/2665))
- `StickyTool`: 新增 `StickyTool` 组件 @ZekunWu ([#2517](https://github.com/Tencent/tdesign-vue-next/pull/2517))
- `RadioGroup`: `options.value` 支持 `boolean` @liweijie0812 ([#2659](https://github.com/Tencent/tdesign-vue-next/pull/2659))
- `Local`: 增加繁体字配置包 @chaishi ([#2685](https://github.com/Tencent/tdesign-vue-next/pull/2685))
- `Select`: `value` 支持 `boolean` @liweijie0812 ([#2694](https://github.com/Tencent/tdesign-vue-next/pull/2694))

### 🐞 Bug Fixes

- `Table`:
  - 列宽调整功能，修复即使 `resizable=false` 时，也会显示拖拽调整列宽图标和辅助线问题 @chaishi ([#2715](https://github.com/Tencent/tdesign-vue-next/pull/2715))
  - 列宽调整功能，修复在拖拽任意列宽使表格横向滚动条消失之后列宽无法正常调整的问题，即支持 `resize.minWidth` @chaishi ([#2715](https://github.com/Tencent/tdesign-vue-next/pull/2715))
  - 列宽调整功能，修复开启多级表头时点击子表头后控制台报错的问题 @chaishi ([#2715](https://github.com/Tencent/tdesign-vue-next/pull/2715))
- `Select`:
  - 修复存在重复 `value` 的 `option` 变化时没有更新 label 的问题 @uyarn ([#2687](https://github.com/Tencent/tdesign-vue-next/pull/2687))
  - 修复多选选项边缘区域点击不触发选中的缺陷 @uyarn ([#2687](https://github.com/Tencent/tdesign-vue-next/pull/2687))
- `RadioGroup`: 选项宽度不能动态更新，导致样式错误，文字溢出 @ZTH520 ([#2681](https://github.com/Tencent/tdesign-vue-next/pull/2681))
- `Tooltip`: 修复当 `content` 是空字符或空插槽时，不显示提示 @PengYYYYY ([#2653](https://github.com/Tencent/tdesign-vue-next/pull/2653))
- `Tree`: 修复懒加载子节点时点击 `label` 会触发选中的问题 @uyarn ([#2663](https://github.com/Tencent/tdesign-vue-next/pull/2663))
- `InputAdornment`: 修复 `slot` 方式 `class` 名缺失问题 @ccccpj ([#2656](https://github.com/Tencent/tdesign-vue-next/pull/2656))
- `InputNumber`: 修复小数位操作以 `0` 结尾时部分边界场景异常的问题 @uyarn ([#2668](https://github.com/Tencent/tdesign-vue-next/pull/2668))
- `TreeSelect`: 修复绑定的 `data` 数据更新后,组件不会重新渲染 @algerkong ([#2683](https://github.com/Tencent/tdesign-vue-next/pull/2683))
- `DatePicker`: 修复 `DatePicker` 的 `prefixIcon` 未传递时仍透传了 `prefixIcon` 函数导致产生非预期渲染 @dexterBo ([#2658](https://github.com/Tencent/tdesign-vue-next/pull/2658))
- `Dropdown`: 修复下拉菜单配置 `template` 的 `content` 或 `prefixIcon` 插槽时未进行渲染的问题() @nined9 ([#2696](https://github.com/Tencent/tdesign-vue-next/pull/2696))

### 🚧 Others

- `Docs`: 优化贡献指南和测试指南 @wangyang0210 ([#2706](https://github.com/Tencent/tdesign-vue-next/pull/2706))
- `Loading`: 增加 `v-loading` 示例代码 @uyarn ([#2714](https://github.com/Tencent/tdesign-vue-next/pull/2714))
- `Dialog`: 添加 `slot` 相关的说明及示例代码 @Layouwen ([#2708](https://github.com/Tencent/tdesign-vue-next/pull/2708))

## 🌈 1.2.3 `2023-03-30`

### 🚀 Features

- `Table`:
  - 过滤功能，支持透传属性 `column.filter.props.onChange` @chaishi ([#2623](https://github.com/Tencent/tdesign-vue-next/pull/2623))
  - 支持设置 `filterRow=null` 隐藏过滤结果行 @chaishi ([#2623](https://github.com/Tencent/tdesign-vue-next/pull/2623))
- `Popup`: 增加 `close()` 实例方法 @ikeq ([#2617](https://github.com/Tencent/tdesign-vue-next/pull/2617))

### 🐞 Bug Fixes

- `Table`: @chaishi ([#2636](https://github.com/Tencent/tdesign-vue-next/pull/2636))
  - 修复 `SSR` 环境 `document` 报错问题
  - 修复组件实例方法类型问题
- `Guide`: 解决 `popup` 提示在重叠情形下不更新 @zhangpaopao0609 ([#2605](https://github.com/Tencent/tdesign-vue-next/pull/2605))
- `Swiper`: 修改轮播切换问题 @btea ([#2614](https://github.com/Tencent/tdesign-vue-next/pull/2614))
- `Popup`: 修复叠加使用报错 @ikeq ([#2617](https://github.com/Tencent/tdesign-vue-next/pull/2617))
- `Select`: 修复使用 `filterable` 和自定义下拉选项时，下拉列表展示异常 @Lmmmmmm-bb ([#2619](https://github.com/Tencent/tdesign-vue-next/pull/2619))
- `TimePicker`: 修复使用`px to rem`插件时滚动逐渐错位的问题 @SadWood ([#2627](https://github.com/Tencent/tdesign-vue-next/pull/2627))
- `Loading`: 修复使用 `loadingplugin`，会没有 `loading` 效果的问题 @beerui ([#2628](https://github.com/Tencent/tdesign-vue-next/pull/2628))
- `TagInput`: 修复删除事件和中文输入事件问题 @chiyu1996 ([#2631](https://github.com/Tencent/tdesign-vue-next/pull/2631))
- `DatePicker`: 修复 `format` 为 `12` 小时制时功能异常的问题 @uyarn ([#2632](https://github.com/Tencent/tdesign-vue-next/pull/2632))
- `Alert`: 修复关闭按钮为文字时的居中和字体大小问题 @Wen1kang @uyarn ([#2632](https://github.com/Tencent/tdesign-vue-next/pull/2632))
- `InputNumber`: 修复有 `max` 值时，清空数值，`blur` 会自动填充 `max` 的值 @Lmmmmmm-bb ([#2620](https://github.com/Tencent/tdesign-vue-next/pull/2620))
- `Menu`: 修复多级菜单折叠菜单后，第一次顺着展开悬浮多级子菜单时会全部消失 @Ericleungs ([#2634](https://github.com/Tencent/tdesign-vue-next/pull/2634))

### 🚧 Others

- `Form`: 更新 `Form` 文档，修正 ` telnumber rule` 描述 @xiaosansiji ([#2606](https://github.com/Tencent/tdesign-vue-next/pull/2606))
- `Table`: 更新组件实例方法文档 @chaishi ([#2623](https://github.com/Tencent/tdesign-vue-next/pull/2623))

## 🌈 1.2.2 `2023-03-22`

### 🚀 Features

- `Table`: @chaishi ([#2590](https://github.com/Tencent/tdesign-vue-next/pull/2590))
  - 支持使用 `filterIcon` 支持不同列显示不同的筛选图标
  - 支持横向滚动到固定列
- `Tabs`: 标签页选项卡可配置禁止拖拽 @liweijie0812 ([#2457](https://github.com/Tencent/tdesign-vue-next/pull/2457))
- `TimePicker`: 支持`size`属性 @uyarn ([#2597](https://github.com/Tencent/tdesign-vue-next/pull/2597))

### 🐞 Bug Fixes

- `Table`:
  - 单行选中功能，修复 `allowUncheck: false` 无效问题 @chaishi ([#2590](https://github.com/Tencent/tdesign-vue-next/pull/2590))
  - 修复 `lazyload` 重置 `bug` @yanxugong ([#2580](https://github.com/Tencent/tdesign-vue-next/pull/2580))
  - 修复 `getSortIcon is not a function` 在 webpack 中的报错 @chaishi ([#2592](https://github.com/Tencent/tdesign-vue-next/pull/2592))
- `TreeSelect`:
  - 修复树选择组件，在表格组件里面时，显示两个 `Tips` 问题 @chaishi ([#2590](https://github.com/Tencent/tdesign-vue-next/pull/2590))
  - 修复`1.2.0`版本后初始值为空时报错的问题 @uyarn ([#2597](https://github.com/Tencent/tdesign-vue-next/pull/2597))
- `Dropdown`: 支持`v-for`渲染下拉选项，支持`v-for`与普通插槽混用 @uyarn ([#2594](https://github.com/Tencent/tdesign-vue-next/pull/2594))
- `Menu`: 修复重新展开后，`normal` 模式的子菜单就是空的。 @Ericleungs ([#2589](https://github.com/Tencent/tdesign-vue-next/pull/2589))

## 🌈 1.2.1 `2023-03-17`

### 🐞 Bug Fixes

- `Form`: 修复复杂数据结构中使用 `scrollToFirstError` 属性无法提交问题 @k1nz ([#2572](https://github.com/Tencent/tdesign-vue-next/pull/2572))
- `Dropdown`: 修复事件回调未定义导致控制台报错的问题 @uyarn ([#2570](https://github.com/Tencent/tdesign-vue-next/pull/2570))
- `Nuxt`: 修复在 `tooltip` 和 `pagination` 组件在 `Nuxt3` 报错 @PengYYYYY ([#2575](https://github.com/Tencent/tdesign-vue-next/pull/2575))
- `ConfigProvider`: 修复组件会在最外层增加一的空的 `div` 标签 ([#2573](https://github.com/Tencent/tdesign-vue-next/pull/2573))
- `Popup`: 优化 `popup` 嵌套逻辑 @ikeq ([#2514](https://github.com/Tencent/tdesign-vue-next/pull/2514))

## 🌈 1.2.0 `2023-03-15`

### 🚀 Features

- `Table`: @chaishi ([#2515](https://github.com/Tencent/tdesign-vue-next/pull/2515))
  - 列宽调整功能，更新列宽调整规则为：列宽较小没有超出时，列宽调整表现为当前列和相邻列的变化；列宽超出存在横向滚动条时，列宽调整仅影响当前列和列总宽
  - 可编辑单元格(行)功能，支持编辑模式下，数据变化时实时校验，`col.edit.validateTrigger`
  - 只有固定列存在时，才会出现类名 `.t-table__content--scrollable-to-left` 和 `.t-table__content--scrollable-to-right`
  - 拖拽功能，支持禁用固定列不可拖拽调整顺序
- `DatePicker`:
  - 支持 `size` 属性 @honkinglin ([#2553](https://github.com/Tencent/tdesign-vue-next/pull/2553))
  - 支持 `defaultTime` @honkinglin ([#2525](https://github.com/Tencent/tdesign-vue-next/pull/2525))
- `InputNumber`: 支持千分位粘贴 @uyarn ([#2563](https://github.com/Tencent/tdesign-vue-next/pull/2563))
- `Upload`: `theme=file-input` 文件为空时，悬浮时不显示清除按钮 @chaishi ([#2515](https://github.com/Tencent/tdesign-vue-next/pull/2515))

### 🐞 Bug Fixes

- `Table`:
  - 列宽调整功能，修复 `Dialog` 中列宽调整问题， @chaishi ([#2515](https://github.com/Tencent/tdesign-vue-next/pull/2515))
  - `EnhancedTable` 筛选功能，修复 `shallowRef` 告警问题， @chaishi ([#2515](https://github.com/Tencent/tdesign-vue-next/pull/2515))
  - 可编辑单元格(行)功能，修复输入框回车会触发 Form 表单的 submit 事件问题， @chaishi ([#2515](https://github.com/Tencent/tdesign-vue-next/pull/2515))
  - 可编辑单元格，修复下拉选择类组件 `abortEditOnEvent` 没有包含 `onChange` 时，依然会在数据变化时触发退出编辑态问题 @chaishi ([#2515](https://github.com/Tencent/tdesign-vue-next/pull/2515))
- `Dialog`:
  - 修复在 `modeless` 下，同时设置 `draggable` 和 `destroyOnClose` 在关闭弹窗时会报错 @PengYYYYY ([#2550](https://github.com/Tencent/tdesign-vue-next/pull/2550))
  - 修复弹窗 `confirm-on-enter` 事件在输入法呼出输入时依旧会触发 @PengYYYYY ([#2550](https://github.com/Tencent/tdesign-vue-next/pull/2550))
- `Textarea`:
  - 修复设置最大长度后，无法调整高度问题 @chaishi ([#2515](https://github.com/Tencent/tdesign-vue-next/pull/2515))
  - 修复获取焦点后的样式问题 @tiny-dust ([#1176](https://github.com/Tencenttdesign-common/pull/1176))
- `Select`: 修复切换虚拟滚动时没有触发滚动监听导致滚动未更新数据的缺陷 @uyarn ([#2506](https://github.com/Tencent/tdesign-vue-next/pull/2506))
- `Badge`: 修复徽标错误行为 @Aicmortal ([#2504](https://github.com/Tencent/tdesign-vue-next/pull/2504))
- `DatePicker`: 修复月份为 `0` 时展示当前月份问题 @honkinglin ([#2503](https://github.com/Tencent/tdesign-vue-next/pull/2503))
- `Upload`: 修复 `method` 无效问题 @chaishi ([#2515](https://github.com/Tencent/tdesign-vue-next/pull/2515))
- `Dropdown`: 修复使用`popupProps.on-visible-change`写法导致组件异常的问题 @uyarn ([#2545](https://github.com/Tencent/tdesign-vue-next/pull/2545))
- `Progress`: 修复 `trackColor` 配置色值没有效果 @PengYYYYY ([#2550](https://github.com/Tencent/tdesign-vue-next/pull/2550))
- `SelectInput`: 修复 SelectInput `valueDisplay` 和 `label` 插槽位置错误的问题 @uyarn ([#2549](https://github.com/Tencent/tdesign-vue-next/pull/2549))
- `DateRangePickerPanel`: 组件在处理年份的时候没有实际取到值，导致无论是不是在同一年，都会去找到两个日期项目中最小的/最大的 @Ericleungs ([#2555](https://github.com/Tencent/tdesign-vue-next/pull/2555))
- `Popconfirm`: 修复 `visible-change` 事件中的的 `context.trigger` 在 `confirm` 事件中不携带标识 @PengYYYYY ([#2560](https://github.com/Tencent/tdesign-vue-next/pull/2560))

### 🚧 Others

- `Table`: 修复文档 `rowClassName` 描述问题 @chaishi ([#2515](https://github.com/Tencent/tdesign-vue-next/pull/2515))
- `Watermark`: 修复 `live demo` @uyarn ([#2520](https://github.com/Tencent/tdesign-vue-next/pull/2520))

## 🌈 1.1.1 `2023-03-02`

### 🐞 Bug Fixes

- `Popup`: 修复 `popup` 的 `trigger` 为空错误 @Aicmortal ([#2499](https://github.com/Tencent/tdesign-vue-next/pull/2499))
- `Select`: 修复远程搜索切换正常渲染与虚拟滚动的问题 @uyarn ([#2496](https://github.com/Tencent/tdesign-vue-next/pull/2496))
- `Textarea`: 修复 `1.1.0` 版本的 `textarea` 样式问题 @uyarn ([#2496](https://github.com/Tencent/tdesign-vue-next/pull/2496))

## 🌈 1.1.0 `2023-03-02`

### 🚀 Features

- `Image`: 图片组件支持特殊格式的地址 `.avif` 和 `.webp` @chaishi ([#2463](https://github.com/Tencent/tdesign-vue-next/pull/2463))
- `ConfigProvider`: 新增 `Image` 全局配置 `globalConfig.image.replaceImageSrc`，用于统一替换图片地址 @chaishi ([#2463](https://github.com/Tencent/tdesign-vue-next/pull/2463))
- `SelectInput`: `collapsedItems.count` 含义修正为折叠的标签数量 @chaishi ([#2447](https://github.com/Tencent/tdesign-vue-next/pull/2447))
- `Types`: 新增公共 `types` 文件的导出 @PengYYYYY ([#2490](https://github.com/Tencent/tdesign-vue-next/pull/2490))

### 🐞 Bug Fixes

- `Dialog`:
  - 修复 `config-provider` 下配置的 `confirmBtnTheme` 失效的问题 @uyarn ([#2474](https://github.com/Tencent/tdesign-vue-next/pull/2474))
  - 修复 `dialog` 打开后的焦点获取问题 @PengYYYYY ([#2491](https://github.com/Tencent/tdesign-vue-next/pull/2491))
- `Loading`: 修复属性透传问题 @Aicmortal ([#2442](https://github.com/Tencent/tdesign-vue-next/pull/2442))
- `Upload`: 修复禁用态的表单对 `upload` 组件无效问题 @yusongh ([#2472](https://github.com/Tencent/tdesign-vue-next/pull/2472))
- `Textarea`: 解决 `textarea` 字符限制文案遮挡文本内容的问题 @duanbaosheng ([#2462](https://github.com/Tencent/tdesign-vue-next/pull/2462))
- `Menu`: `menu-item` 设置 href 属性后的样式问题 @tiny-dust ([#2458](https://github.com/Tencent/tdesign-vue-next/pull/2458))
- `Teleport`: 修复使用了 `Teleport` 的组件无法挂载到当前组件内元素节点

### 🚧 Others

- `Space`: 输出完整的测试用例 @chaishi ([#2446](https://github.com/Tencent/tdesign-vue-next/pull/2446))
- `Site`: 修复测试徽章无数据展示 @PengYYYYY ([#2490](https://github.com/Tencent/tdesign-vue-next/pull/2490))

## 🌈 1.0.9 `2023-02-21`

### 🚀 Features

- `Upload`: @chaishi ([#2418](https://github.com/Tencent/tdesign-vue-next/pull/2418))
  - 可拖拽的单图片/单文件上传，支持使用 `fileListDisplay` 自定义文件信息内容
  - 一个请求上传多个文件时，去除重复参数 `file`，保留 `file[0]` `file[1]` 即可，同时新增参数 `length` 表示本次上传文件的数量
  - `onError/onSuccess/onProgress` 添加关键事件参数 `XMLHttpRequest`，用于获取上传请求更详细的信息
  - `tips` 支持插槽，支持函数
  - 新增上传请求超时也会执行 `onError`
  - 支持事件 `onCancelUpload`
  - 支持 `mockProgressDuration`，用于设置模拟上传进度间隔时间，大文件大一点，小文件小一点
- `Dialog`: 确认按钮主题不再跟随主题变动 @xiaosansiji ([#2434](https://github.com/Tencent/tdesign-vue-next/pull/2434))

### 🐞 Bug Fixes

- `Upload`: @chaishi ([#2418](https://github.com/Tencent/tdesign-vue-next/pull/2418))
  - 修复 `onSelectChange` 事件第二个参数 `currentSelectedFiles` 不正确问题
  - 修复 `autoUpload=false` 场景下，即使 `beforeUpload` 函数全部返回 `false` 依然会触发 `onChange` 事件问题
  - 修复 `data` 为函数时，参数为空问题，补充参数 `files`
  - 修复 `theme=image-flow` 时，无法使用 `fileListDisplay` 自定义图片列表问题
  - 修复文件数量超出 `max` 时，且没有可继续上传的文件，依然触发 change 事件问题
  - 修复 `theme=file` 或者 `theme=image-flow` 时，`abridgeName` 无效问题
  - 修复 `theme=image-flow` 且 `autoUpload=false` 时，change 事件第一个参数丢失 file.url 问题
  - 修复非自动上传场景 `change` 事件第二个参数 `file` 值并非当前文件问题
  - 修复各类插槽无效和事件无效问题
- `Nuxt`: 修复 `nuxt` 下的编译报错 @PengYYYYY ([#2417](https://github.com/Tencent/tdesign-vue-next/pull/2417))
- `Dialog`: 修复 `class` 属性出现警告 @Aicmortal ([#2424](https://github.com/Tencent/tdesign-vue-next/pull/2424))
- `Swiper`: 修复 `swiper` 组件 `v-model:current`, `current` 的值不随着轮播变化 @Zzongke ([#2427](https://github.com/Tencent/tdesign-vue-next/pull/2427))
- `SelectInput`: 修复 `SelectInput` 及基于其的输入类组件(`Select` / `Cascader` / `TreeSelect`) 单选可输入模式下回删无法完全清空及其导致的一系列问题 @uyarn ([#2429](https://github.com/Tencent/tdesign-vue-next/pull/2429))
- `Drawer`: 修复滚动条检测问题 @honkinglin ([#2438](https://github.com/Tencent/tdesign-vue-next/pull/2438))

### 🚧 Others

- `Upload`: 输出完整的测试用例（135 个），平均覆盖率达 `95%+` @chaishi ([#2418](https://github.com/Tencent/tdesign-vue-next/pull/2418))

## 🌈 1.0.8 `2023-02-17`

### 🚀 Features

- `Timeline`: @chaishi ([#2395](https://github.com/Tencent/tdesign-vue-next/pull/2395))
  - 始终保持结构 `t-timeline-item__dot-content` 存在
  - 支持使用插槽和属性函数 `label` 自定义时间文本
- `Avatar`: @chaishi ([#2404](https://github.com/Tencent/tdesign-vue-next/pull/2404))
  - 加载失败事件新增参数 `({ e: Event })`，用于获取细节信息
  - 新增 `content/default`，以便通过 `JSX` 函数自定义内容
  - 新增 `imageProps`，用于透传全部 `Image` 组件属性
- `AvatarGroup`: 超出省略的最后一个 `Avatar` 添加类名 `t-avatar__collapse`，用于区分其他元素 @chaishi ([#2404](https://github.com/Tencent/tdesign-vue-next/pull/2404))

### 🐞 Bug Fixes

- `Dialog`: 修复 `Plugin` 方式调时,更新 `className` 会删除组件自身类名 @Aicmortal ([#2386](https://github.com/Tencent/tdesign-vue-next/pull/2386))
- `Timeline`: 修复 `TimelineItem.labelAlign` 优先级没有高于 `Timeline.labelAlign` 问题 @chaishi ([#2395](https://github.com/Tencent/tdesign-vue-next/pull/2395))
- `Cascader`: 修复 `options` 变化时未重新渲染 @PengYYYYY ([#2399](https://github.com/Tencent/tdesign-vue-next/pull/2399))
- `Input`: 修复值为 `null` 时，长度计算不正确问题 @chaishi ([#2402](https://github.com/Tencent/tdesign-vue-next/pull/2402))
- `RangeInput`: 修复图标大小展示问题 @honkinglin ([#2406](https://github.com/Tencent/tdesign-vue-next/pull/2406))
- `TagInput`: 修复组件增加 `blur` 行为导致 `Select` / `Cascader` / `TreeSelect` 无法过滤多选的问题 @uyarn ([#2407](https://github.com/Tencent/tdesign-vue-next/pull/2407))
- `Slider`: 修复快速滑动滑块时 `tooltip` 不跟手 @AuYuHui ([#2408](https://github.com/Tencent/tdesign-vue-next/pull/2408))
- `Guide`: 引导框内容支持字符串 @zhangpaopao0609 ([#2414](https://github.com/Tencent/tdesign-vue-next/pull/2414))

### 🚧 Others

- `Code`: 使用 `lodash` 工具函数替换原生方法 @Simon-He95 ([#2380](https://github.com/Tencent/tdesign-vue-next/pull/2380))
- `Drawer`: 修复 `drawer` 示例中的事件错误 @Aicmortal ([#2386](https://github.com/Tencent/tdesign-vue-next/pull/2386))
- `Affix`: 优化样式设置性能 @Simon-He95 ([#2394](https://github.com/Tencent/tdesign-vue-next/pull/2394))
- `Timeline`: 输出完整的测试用例 @chaishi ([#2395](https://github.com/Tencent/tdesign-vue-next/pull/2395))
- `Calendar`: 优化命名规范 @Simon-He95 ([#2398](https://github.com/Tencent/tdesign-vue-next/pull/2398))
- `Checkbox`: 代码结构优化 @Simon-He95 ([#2403](https://github.com/Tencent/tdesign-vue-next/pull/2403))

## 🌈 1.0.7 `2023-02-15`

### 🚀 Features

- `TagInput`: @chaishi ([#2357](https://github.com/Tencent/tdesign-vue-next/pull/2357))
  - 失去焦点时，清空没有成为标签的文本内容，且 `onBlur` 的事件参数 `inputValue` 更为 `''`
  - 支持插槽 `suffix`
  - 删除标签时机变化，由 `onKeyup` 更为 `onKeydown`，以便更快速地响应
  - 支持 `onClick` 事件
- `Guide`: @chaishi ([#2363](https://github.com/Tencent/tdesign-vue-next/pull/2363))
  - 支持 `title/content/body/highlightContent` 等内容通过插槽自定义，同时支持属性函数
  - 支持 `popupProps.overlayInnerClassName` 定义步骤浮层内容
- `Select`: @uyarn ([#2388](https://github.com/Tencent/tdesign-vue-next/pull/2388))
  - 新增 `suffix`、`suffixIcon`、`autofocus` 等 API
  - `Option` 新增 `title` 支持自定义 `hover` 展示内容
- `Dropdown`: `submenu` 层级结构调整，增加一层`t-dropdown__submenu-wrapper` @uyarn ([#2370](https://github.com/Tencent/tdesign-vue-next/pull/2370))
- `Form`: 支持导出 `FormRules` 数据类型 @chaishi ([#2378](https://github.com/Tencent/tdesign-vue-next/pull/2378))
- `Popup`: 新增 `popperOptions` 及 `onScrollToBottom` 事件 @uyarn ([#2388](https://github.com/Tencent/tdesign-vue-next/pull/2388))

### 🐞 Bug Fixes

- `TagInput`: 修复输入内容为空时，未能触发 onEnter 事件问题 @chaishi ([#2357](https://github.com/Tencent/tdesign-vue-next/pull/2357))
- `Dropdown`: 修复多层超长菜单的位置异常问题 @uyarn ([#2370](https://github.com/Tencent/tdesign-vue-next/pull/2370))
- `SelectInput`: 修复 `defaultInputValue` 无效问题 @chaishi ([#2373](https://github.com/Tencent/tdesign-vue-next/pull/2373))
- `Table`: 修复 `column.edit.on.onChange` 无效报错问题 @chaishi ([#2374](https://github.com/Tencent/tdesign-vue-next/pull/2374))
- `Guide`: 优化自定义消息框时容器的样式 @zhangpaopao0609 ([#2371](https://github.com/Tencent/tdesign-vue-next/pull/2371))
- `Anchor`: 修复在组件卸载时候的意外事件注册 @tjstyx ([#2387](https://github.com/Tencent/tdesign-vue-next/pull/2387))
- `Tree`: 修复树拖拽时候鼠标预期行为样式 @PengYYYYY ([#2390](https://github.com/Tencent/tdesign-vue-next/pull/2390))

### 🚧 Others

- `TagInput`: 输出完整的测试用例 @chaishi ([#2357](https://github.com/Tencent/tdesign-vue-next/pull/2357))
- `Guide`: 输出完整的测试用例 @chaishi ([#2363](https://github.com/Tencent/tdesign-vue-next/pull/2363))
- `Select`: 新增滚动加载选项示例代码 @uyarn ([#2388](https://github.com/Tencent/tdesign-vue-next/pull/2388))
- `Lint`: 增加 `lint` 缓存 @Simon-He95 ([#2376](https://github.com/Tencent/tdesign-vue-next/pull/2376))

## 🌈 1.0.6 `2023-02-07`

### 🚀 Features

- `Image`: @chaishi ([#2342](https://github.com/Tencent/tdesign-vue-next/pull/2342))
  - 组件内部的中文支持全局语言配置，可以配置为英文、日文、任意文字
  - `onLoad/onError` 等事件新增事件参数 `{ e: Event }`
  - 支持 `placeholder` 使用插槽或函数自定义图片占位内容
  - 支持 `loading`使用插槽或函数自定义图片加载中状态内容
  - 支持 `error` 使用插槽或函数自定义图片加载失败内容

### 🐞 Bug Fixes

- `Tag`: @chaishi ([#2349](https://github.com/Tencent/tdesign-vue-next/pull/2349))
  - 修复禁用状态依然显示的关闭图标问题
  - 修复超出省略功能缺少 `title` 属性问题
  - 修复 `maxWidth` 不支持带单位的宽度问题
  - 去除 Tag 组件 `.t-tag--text` 元素的多余类名，以及非必要类名 `.t-size-m`
- `Table`:
  - 修复插槽 `cell-empty-content` 无效问题（`cellEmptyContent` 一直有效） @chaishi ([#2319](https://github.com/Tencent/tdesign-vue-next/pull/2319))
  - 修复`headerAffixedTop`、`footerAffixedBottom`、`filterValue`的类型错误 @uyarn ([#2352](https://github.com/Tencent/tdesign-vue-next/pull/2352))
- `Form`:
  - 修复 `FormItem.name` 和 `FormItem.rules` 变化时无法触发校验问题 @chaishi ([#2346](https://github.com/Tencent/tdesign-vue-next/pull/2346))
  - 修复表单类组件 value 语法糖可能存在的类型问题 @uyarn ([#2352](https://github.com/Tencent/tdesign-vue-next/pull/2352))
- `Image`:
  - 修复组件 `error`，`overlayContent` 字段类型错误 @PengYYYYY ([#2328](https://github.com/Tencent/tdesign-vue-next/pull/2328))
  - 修复图片加载中和图片加载失败缺少必要图标问题 @chaishi ([#2342](https://github.com/Tencent/tdesign-vue-next/pull/2342))
- `Dialog`: 修复确认按钮 `theme` 取值问题，修复单元测试告警 @PengYYYYY ([#2320](https://github.com/Tencent/tdesign-vue-next/pull/2320))
- `Watermark`: 修复`unplugin`方式使用`watermark`组件报错的问题 @uyarn ([#2329](https://github.com/Tencent/tdesign-vue-next/pull/2329))
- `Loading`: 当属性 `loading=false` 时，不允许存在任何加载组件相关元素 @chaishi ([#2319](https://github.com/Tencent/tdesign-vue-next/pull/2319))
- `Steps`: 修复示例样式问题 @Wen1kang ([#2330](https://github.com/Tencent/tdesign-vue-next/pull/2330))
- `Affix`: 修复在 `nuxt` 下运行报错的问题 @uyarn ([#2341](https://github.com/Tencent/tdesign-vue-next/pull/2341))
- `Pagination`: 修复在 `nuxt` 下运行报错的问题 @uyarn ([#2341](https://github.com/Tencent/tdesign-vue-next/pull/2341))
- `InputNumber`: 修复小数点后第二个数字若为 `0` 无法输入问题 @chaishi ([#2344](https://github.com/Tencent/tdesign-vue-next/pull/2344))
- `Avatar`: 修复 `size` 动态变化无效问题 @PengYYYYY ([#2340](https://github.com/Tencent/tdesign-vue-next/pull/2340))
- `Calendar`: 修复`controllerConfig`的产物类型问题 @uyarn ([#2352](https://github.com/Tencent/tdesign-vue-next/pull/2352))
- `Drawer`: 修复`cancelBtn`、`confirmBtn`的类型问题 @uyarn ([#2352](https://github.com/Tencent/tdesign-vue-next/pull/2352))
- `Popconfirm`: 修复`cancelBtn`、`confirmBtn`的类型问题 @uyarn ([#2352](https://github.com/Tencent/tdesign-vue-next/pull/2352))
- `Slider`: 修复`InputNumberProps`的类型问题 @uyarn ([#2352](https://github.com/Tencent/tdesign-vue-next/pull/2352))
- `Textarea`: 修复`autosize`的类型问题 @uyarn ([#2352](https://github.com/Tencent/tdesign-vue-next/pull/2352))
- `Select`: 修复`options`的类型问题 @uyarn ([#2352](https://github.com/Tencent/tdesign-vue-next/pull/2352))
- `BreadCrumb`: 修复 `BreadCrumbItem` 中 `to`的类型问题 @uyarn ([#2352](https://github.com/Tencent/tdesign-vue-next/pull/2352))
- `Dropdown`: 修复 `dropdown content` 支持 `function` 类型 @hkaikai ([#2354](https://github.com/Tencent/tdesign-vue-next/pull/2354))

### 🚧 Others

- `Image`:
  - 修复单元测试告警 @PengYYYYY ([#2320](https://github.com/Tencent/tdesign-vue-next/pull/2320))
  - 输出完整的测试用例 @chaishi ([#2342](https://github.com/Tencent/tdesign-vue-next/pull/2342))
- `Calendar`: 修复单元测试告警 @PengYYYYY ([#2320](https://github.com/Tencent/tdesign-vue-next/pull/2320))
- `SelectInput`: 修复单元测试告警 @PengYYYYY ([#2320](https://github.com/Tencent/tdesign-vue-next/pull/2320))
- `Popup`: 修复单元测试告警 @PengYYYYY ([#2320](https://github.com/Tencent/tdesign-vue-next/pull/2320))
- `Rate`: 补充 `rate` 单元测试 @whitexie ([#2336](https://github.com/Tencent/tdesign-vue-next/pull/2336))
- `Tag`: 添加更多测试用例 @chaishi ([#2349](https://github.com/Tencent/tdesign-vue-next/pull/2349))

## 🌈 1.0.5 `2023-01-31`

### 🚀 Features

- `ColorPicker`: 切换单色-渐变模式时触发色值及 `onChange` 变化 @uyarn ([#2305](https://github.com/Tencent/tdesign-vue-next/pull/2305))

### 🐞 Bug Fixes

- `Input`: 修复使用 `format` 属性时，光标出现跳动 @Lmmmmmm-bb ([#2289](https://github.com/Tencent/tdesign-vue-next/pull/2289))
- `Table`:
  - 可编辑单元格，修复无法退出编辑态问题 @chaishi ([#2303](https://github.com/Tencent/tdesign-vue-next/pull/2303))
  - 修复因 `useResizeObserver` 被重写导致的全部场景出现告警的问题 @chaishi ([#2303](https://github.com/Tencent/tdesign-vue-next/pull/2303))
- `Tooltip`: 修复 `Props` 覆盖插槽问题 @Aicmortal ([#2308](https://github.com/Tencent/tdesign-vue-next/pull/2308))
- `DatePicker`: 修复 `dayjs` 国际化设置问题 @honkinglin ([#2314](https://github.com/Tencent/tdesign-vue-next/pull/2314))
- `Notification`: 修复单独引入 `NotifyPlugin` 时没有带入 `css` 样式 @pengYYYYY ([#2316](https://github.com/Tencent/tdesign-vue-next/pull/2316))

### 🚧 Others

- `Transfer`: 修复 `tree` 的代码示例 @Lmmmmmm-bb ([#2300](https://github.com/Tencent/tdesign-vue-next/pull/2300))
- `SelectInput`: 补充单元测试 @whitexie ([#2291](https://github.com/Tencent/tdesign-vue-next/pull/2291))

## 🌈 1.0.4 `2023-01-18`

### 🚀 Features

- `Input`: @chaishi ([#2275](https://github.com/Tencent/tdesign-vue-next/pull/2275))
  - `change` 事件新增 `trigger` 参数，用于表示触发本次数据变化的场景
  - 去除非必要的类名 `t-is-default`
  - 新增 `click` 点击事件

### 🐞 Bug Fixes

- `Cascader`: 修复无法使用 `0` 作为 `value` @AuYuHui ([#2273](https://github.com/Tencent/tdesign-vue-next/pull/2273))
- `Input`: 修复初始值长度超过 `maxlength` 时无法删除问题 @chaishi ([#2275](https://github.com/Tencent/tdesign-vue-next/pull/2275))
- `AutoComplete`: 修复初次聚焦，键盘事件无法上下选中问题 @chaishi ([#2275](https://github.com/Tencent/tdesign-vue-next/pull/2275))
- `Select`: `valueType` 或 `multiple` 动态切换导致组件失效 @zybzzc ([#2276](https://github.com/Tencent/tdesign-vue-next/pull/2276))
- `Popup`: 修复 `trigger` 元素变化时 `popper` 位置错误 @zybzzc ([#2277](https://github.com/Tencent/tdesign-vue-next/pull/2277))
- `TimePicker`: 修复`TimePickerPanel`没有自动注册的问题 @uyarn ([#2283](https://github.com/Tencent/tdesign-vue-next/pull/2283))
- `Loading`: 修复部分浏览器下 `loading` 晃动问题 @yusongh ([#2244](https://github.com/Tencent/tdesign-vue-next/pull/2244))
- `SelectInput`: 修复下拉弹窗状态未改变时，重复触发 `onPopupVisibleChange` 事件的问题 @xiaosansiji ([#2284](https://github.com/Tencent/tdesign-vue-next/pull/2284))
- `Tree`: 修复节点的 `checkable: false` 不生效 @pengYYYYY ([#2286](https://github.com/Tencent/tdesign-vue-next/pull/2286))

### 🚧 Others

- `Input`: 更新文档，输出完整的测试用例，覆盖率达到 `98.11%` @chaishi ([#2275](https://github.com/Tencent/tdesign-vue-next/pull/2275))
- `Card`: 修改示例部分带操作代码无法点击情况 @AuYuHui ([#2273](https://github.com/Tencent/tdesign-vue-next/pull/2273))
- `AutoComplete`: 新增键盘事件测试用例检测，测试覆盖率达到 `98.47%` @chaishi ([#2275](https://github.com/Tencent/tdesign-vue-next/pull/2275))
- `Select`: 补充单元测试 @zybzzc ([#2276](https://github.com/Tencent/tdesign-vue-next/pull/2276))
- `Card`: 修改示例部分带操作代码无法点击情况 @AuYuHui ([#2273](https://github.com/Tencent/tdesign-vue-next/pull/2273))
- `Select`: 补充单元测试 @zybzzc ([#2276](https://github.com/Tencent/tdesign-vue-next/pull/2276))

## 🌈 1.0.3 `2023-01-12`

### 🚀 Features

- `Table`: @chaishi ([#2256](https://github.com/Tencent/tdesign-vue-next/pull/2256))
  - 可编辑单元格，支持使用 `col.edit.on` 透传组件事件
  - 可编辑单元格，支持使用 `validateTableData` 校验处于编辑态的单元格
  - 可编辑单元格，单元格的值 cellValue 不再进行解构处理
  - 新增 `attach`，用于统一设置超出省略浮层、筛选过滤下拉框等元素的挂载元素。如：`attach={() => document.body}`
- `Radio`: 支持键盘事件（`tab` 键切换选项，`enter` 键选中）@chaishi ([#2241](https://github.com/Tencent/tdesign-vue-next/pull/2241))
- `RadioGroup`: 支持 `allowUncheck` @chaishi ([#2241](https://github.com/Tencent/tdesign-vue-next/pull/2241))
- `Select`: `valueDisplay`回调新增`displayValue`参数，用于设置`minCollapsedNum`的场景 @uyarn ([#2243](https://github.com/Tencent/tdesign-vue-next/pull/2243))
- `Local`: 增加阿拉伯语言包 @pengYYYYY ([#2240](https://github.com/Tencent/tdesign-vue-next/pull/2240))

### 🐞 Bug Fixes

- `Dialog`:
  - 组件销毁前立即移除当前节点，不需要 `setTimeout` 等待时间 @chaishi ([#2242](https://github.com/Tencent/tdesign-vue-next/pull/2242))
  - 修复类型错误 @yaogengzhu ([#2247](https://github.com/Tencent/tdesign-vue-next/pull/2247))
- `Dropdown`: 修复三级及以上子菜单超出问题计算部分场景异常的问题 @uyarn ([#2252](https://github.com/Tencent/tdesign-vue-next/pull/2252))
- `TreeSelect`: 修复选项文案过程样式的异常 @uyarn ([#2252](https://github.com/Tencent/tdesign-vue-next/pull/2252))
- `Tooltip`:
  - 修改触发元素传递方式 @Aicmortal ([#2253](https://github.com/Tencent/tdesign-vue-next/pull/2253))
  - 修复在 `duration` 时间结束后无法自动关闭的问题 @FliPPeDround ([#2255](https://github.com/Tencent/tdesign-vue-next/pull/2255))
- `Table`: 处理单击和双击事件冲突问题，避免双击的时候触发行选中或行展开 @chaishi ([#2256](https://github.com/Tencent/tdesign-vue-next/pull/2256))
- `Image`: 修复首次设置图片显示错误后动态修改 `src` 值图片无法显示问题 @sechi747 ([#2259](https://github.com/Tencent/tdesign-vue-next/pull/2259))
- `Swiper`: 循环播放导航指示标显示问题 @wenkeming ([#2257](https://github.com/Tencent/tdesign-vue-next/pull/2257))
- `Volar`: 完善 `volar` 代码提示文件 @code2933 ([#2262](https://github.com/Tencent/tdesign-vue-next/pull/2262))
- `Select`: 修复 `value` 不在 `options` 时不显示值 @Aicmortal ([#2267](https://github.com/Tencent/tdesign-vue-next/pull/2267))

### 🚧 Others

- `Radio`: 输出完整的测试用例 @chaishi ([#2241](https://github.com/Tencent/tdesign-vue-next/pull/2241))
- `docs`: 优化最后更新日期展示 @honkinglin ([#2261](https://github.com/Tencent/tdesign-vue-next/pull/2261))

## 🌈 1.0.2 `2023-01-05`

### 🚀 Features

- `AutoComplete`: @chaishi ([#2219](https://github.com/Tencent/tdesign-vue-next/pull/2219))
  - 新增清空功能 `clearable`
  - 新增自动聚焦功能 `autofocus`
  - 新增 `enter/blur/compositionend/compositionstart` 等事件，及相关参数和文档保持一致
- `Input`: 更新 API 之后，默认会给组件添加类名 `t-is-default` @chaishi ([#2219](https://github.com/Tencent/tdesign-vue-next/pull/2219))

### 🐞 Bug Fixes

- `DatePicker`:
  - 修复默认值不显示问题 @Aicmortal ([#2229](https://github.com/Tencent/tdesign-vue-next/pull/2229))
  - 修复输入框变化面板未响应问题 & 月份切换错误响应问题 @honkinglin ([#2238](https://github.com/Tencent/tdesign-vue-next/pull/2238))
- `Input`:
  - 修复 `enter` 事件判断，支持 code 为 `Enter` 或 `enter` @chaishi ([#2219](https://github.com/Tencent/tdesign-vue-next/pull/2219))
  - 处理在 `clear` 事件中无法获取到最新 `value` 问题 @chaishi ([#2231](https://github.com/Tencent/tdesign-vue-next/pull/2231))
- `AutoComplete`: 修复 `options` 不存在时，组件因缺少判空报错问题 @chaishi ([#2219](https://github.com/Tencent/tdesign-vue-next/pull/2219))
- `Checkbox`: 修复 `max` 属性无效 @FliPPeDround ([#2233](https://github.com/Tencent/tdesign-vue-next/pull/2233))

### 🚧 Others

- `AutoComplete`: 补充完整的测试用例（35 个） @chaishi ([#2219](https://github.com/Tencent/tdesign-vue-next/pull/2219))
- `Link`: 补充完整的测试用例（25 个） @chaishi ([#2219](https://github.com/Tencent/tdesign-vue-next/pull/2219))
- `Link`: 去掉非必要的类名 `t-size-m` @chaishi ([#2219](https://github.com/Tencent/tdesign-vue-next/pull/2219))
- `Button`: 去掉非必要的类名 `t-size-m` @chaishi ([#2219](https://github.com/Tencent/tdesign-vue-next/pull/2219))
- `Divider`: 输出完整的测试用例 @chaishi ([#2225](https://github.com/Tencent/tdesign-vue-next/pull/2225))

## 🌈 1.0.1 `2022-12-30`

### 🚀 Features

- `Table`: 支持透传分页组件 `Pagination` 插槽 `totalContent` @chaishi ([#2208](https://github.com/Tencent/tdesign-vue-next/pull/2208))

### 🐞 Bug Fixes

- `Avatar`: 修复超出最大配置数量时出现重复的省略图标 @pengYYYYY ([#2203](https://github.com/Tencent/tdesign-vue-next/pull/2203))
- `DatePicker`: 修复年份选择器区间展示错误 @honkinglin ([#2204](https://github.com/Tencent/tdesign-vue-next/pull/2204))
- `Table`: 修复本地数据分页功能中，`onPageChange` 参数 `newData` 数值不正确问题 @chaishi ([#2208](https://github.com/Tencent/tdesign-vue-next/pull/2208))
- `Space`: 修复 `size` 参数缺少 `Array` 导致的告警 @pengYYYYY ([#2203](https://github.com/Tencent/tdesign-vue-next/pull/2203))

### 🚧 Others

- `Dialog`: 恢复插件类型的示例代码 @pengYYYYY ([#2203](https://github.com/Tencent/tdesign-vue-next/pull/2203))
- `Link`: 修复后置 `icon` 示例代码 @pengYYYYY ([#2203](https://github.com/Tencent/tdesign-vue-next/pull/2203))

## 🌈 1.0.0 `2022-12-22`

### 🚀 Features

- `Table`: @chaishi ([#2183](https://github.com/Tencent/tdesign-vue-next/pull/2183))
  - 列配置支持 `stopPropagation: true`，用于设置某一列单元格阻止事件冒泡
  - 虚拟滚动支持行高动态变化
- `Menu`: 样式优化 @xiaosansiji ([#2172](https://github.com/Tencent/tdesign-vue-next/pull/2172))
- `TreeSelect`: `onVisibleChange` 事件增加回调参数 @uyarn ([#2184](https://github.com/Tencent/tdesign-vue-next/pull/2184))

### 🐞 Bug Fixes

- `Table`: @chaishi ([#2183](https://github.com/Tencent/tdesign-vue-next/pull/2183))
  - 修复表格宽度过小时抖动问题
  - 固定表头背景色始终保持为灰色底，无论内容是否溢出
- `Dropdown`: 修复多级菜单长度超长时，无法选择子菜单及位置异常的问题 @uyarn ([#2171](https://github.com/Tencent/tdesign-vue-next/pull/2171))
- `Slider`: 修复 `tooltip` 属性自定义 `content` 不生效问题 @ChrisLee0211 ([#2181](https://github.com/Tencent/tdesign-vue-next/pull/2181))
- `DatePicker`: 兼容传入空字符串 @honkinglin ([#2169](https://github.com/Tencent/tdesign-vue-next/pull/2169))

## 🌈 0.x `2021-05-19 - 2022-12-14`

前往 [GitHub](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/tdesign-vue-next/CHANGELOG-0.x.md) 查看 `0.x` 更新日志
