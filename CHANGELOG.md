---
title: 更新日志
spline: explain
toc: false
docClass: timeline
---

## 🌈 1.9.0 `2024-03-07` 
### 🚀 Features
- `Description`:
  -  `layout` 类型定义调整为字符串多类型 @chaishi ([#3939](https://github.com/Tencent/tdesign-vue-next/pull/3939))
  - 支持嵌套的描述组件([issue #3952](https://github.com/Tencent/tdesign-vue-next/issues/3952)) @zhangpaopao0609 ([#3970](https://github.com/Tencent/tdesign-vue-next/pull/3970))
- `Form`: `trigger` 支持 `submit` @liweijie0812 ([#3910](https://github.com/Tencent/tdesign-vue-next/pull/3910))
-  `Demo`: 支持 `Typescript` 代码示例 @chaishi @uyarn @RSS1102 @HaixingOoO  ([#3929](https://github.com/Tencent/tdesign-vue-next/pull/3929))
- `Statistic`:  `color`黑色风格适配深色模式 [(common#1721)](https://github.com/Tencent/tdesign-common/pull/1721) @liweijie0812 ([#3910](https://github.com/Tencent/tdesign-vue-next/pull/3910))
- `Slider`: 支持通过 `label=null` 或 `label=false` 隐藏滑块数字浮层 @chaishi ([#3997](https://github.com/Tencent/tdesign-vue-next/pull/3997))
- `Table`: 支持全局配置 `size` @Lyan-u ([#3993](https://github.com/Tencent/tdesign-vue-next/pull/3993))
- `Nuxt`: 移除产物中的nuxt module，调整为安装`@tdesign-vue-next/nuxt`使用，解决使用`es/nuxt`的功能异常的问题，详细使用方式请参考快速开始中的介绍 @uyarn @liweijie0812 ([#4001](https://github.com/Tencent/tdesign-vue-next/pull/4001))
### 🐞 Bug Fixes
- `Table`: 
  - 修正虚拟滚动下 `footer` 的实现 @Cat1007 ([#3965](https://github.com/Tencent/tdesign-vue-next/pull/3965))
  - 树形结构表格，修复同时异步设置 `data` 和 `expandedTreeNodes` 时，展开节点无效问题（延迟设置有效），[issue#3873](https://github.com/Tencent/tdesign-vue-next/issues/3873) @chaishi ([#3967](https://github.com/Tencent/tdesign-vue-next/pull/3967))
  - 固定列表格，在 `Dialog` 中固定列宽度被挤压问题，[issue#3844](https://github.com/Tencent/tdesign-vue-next/issues/3844) @chaishi ([#3967](https://github.com/Tencent/tdesign-vue-next/pull/3967))
  - 完善 `Table` 组件 `Typescript` 类型定义 @chaishi ([#3936](https://github.com/Tencent/tdesign-vue-next/pull/3936))
  - 修复列拖拽排序问题 @chaishi ([#3968](https://github.com/Tencent/tdesign-vue-next/pull/3968))
  - 修正在 `footer` 高度更新的场景下, `footer` 没有被正常刷新的问题 @Cat1007 ([#3975](https://github.com/Tencent/tdesign-vue-next/pull/3975))
- `Drawer`: 修复 `closeBtn` 属性 `Boolean` 类型转换未生效的问题 @trojanyao ([#3427](https://github.com/Tencent/tdesign-vue-next/pull/3427))
- `Form`: 校验判断不严谨的问题 @betavs ([#3960](https://github.com/Tencent/tdesign-vue-next/pull/3960))
- `Select`: 修复select createAble 选中没有触发change事件问题 @hkaikai ([#3962](https://github.com/Tencent/tdesign-vue-next/pull/3962))
- `Nuxt`: 修复在`nuxt`中使用 `Form` 组件无法正常构建的问题 @richardji202 ([#3977](https://github.com/Tencent/tdesign-vue-next/pull/3977))
- `ColorPicker`: `color` 值未同步更新 @betavs ([#4005](https://github.com/Tencent/tdesign-vue-next/pull/4005))
- `Drawer`: 修复 `closeBtn` 属性 `Boolean` 类型转换未生效的问题 @trojanyao ([#3427](https://github.com/Tencent/tdesign-vue-next/pull/3427))
- `Affix`: 修正 `margin` 计算,避免出现 `error` @Cat1007 ([#3972](https://github.com/Tencent/tdesign-vue-next/pull/3972))

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
- `VirtualScroll`: 修改 `virtual` 中的 `buffer` 实现,修正错位的translateY的计算逻辑 @Cat1007 ([#3776](https://github.com/Tencent/tdesign-vue-next/pull/3776))
- `Slider`: @uyarn 
   - 修复 `step` 设置小于 `1` 时的使用异常问题 ([#3883](https://github.com/Tencent/tdesign-vue-next/pull/3883))
   -  修复inputProps的onChange事件无法正常触发的问题 (https://github.com/Tencent/tdesign-vue-next/pull/3906)
- `Loading`: 修复未设置 `z-index` 默认值的问题 @betavs ([#3881](https://github.com/Tencent/tdesign-vue-next/pull/3881))
- `DatePicker`: 修复单独配置 `popupProps` 的 `on-visible-change` 功能异常的问题 @uyarn ([#3908](https://github.com/Tencent/tdesign-vue-next/pull/3908))
- `TagInput`: 修复 `taginput` 中 `size` 对默认 `collapsedItems` 不生效的问题 @SadWood ([#3847](https://github.com/Tencent/tdesign-vue-next/pull/3847))
- `Radio`: 修复回车时控制台报错的问题 @liweijie0812 ([#3896](https://github.com/Tencent/tdesign-vue-next/pull/3896))

### 🚧 Others
- `Form`:  `trigger api` 文档更新 @liweijie0812 ([#3882](https://github.com/Tencent/tdesign-vue-next/pull/3882))
- `Tree`: 示例代码由 `OptionsAPI` 更为 `CompositionAPI` @chaishi ([#3899](https://github.com/Tencent/tdesign-vue-next/pull/3899))
- `Descriptions`: 展示冒号示例文字错误 @czq297297 ([#3841](https://github.com/Tencent/tdesign-vue-next/pull/3841))



## 🌈 1.8.0 `2024-01-09` 
### 🚀 Features
- `Descriptions`: 新增 `Descriptions` 描述组件 @zhangpaopao0609 ([#3787](https://github.com/Tencent/tdesign-vue-next/pull/3787))
- `Slider`: 实现 `changeEnd` 事件 ([issue #3772](https://github.com/Tencent/tdesign-vue-next/issues/3772)) @Lyan-u ([#3780](https://github.com/Tencent/tdesign-vue-next/pull/3780))
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
- `DatePicker`: 国际化切换无效([issue#3807](https://github.com/Tencent/tdesign-vue-next/issues/3807)) @liweijie0812 ([#3818](https://github.com/Tencent/tdesign-vue-next/pull/3818))
- `TagInput`: 解决 `disabled` 为真时，可以点击的问题([issue #3829](https://github.com/Tencent/tdesign-vue-next/issues/3829)) @betavs ([#3831](https://github.com/Tencent/tdesign-vue-next/pull/3831))
- `Radio`: 处理选中状态也会触发 `change` 事件的问题 @betavs ([#3782](https://github.com/Tencent/tdesign-vue-next/pull/3782))

## 🌈 1.7.2 `2023-12-22` 
### 🚀 Features
- `Upload`: 
  - 设置 `uploadPastedFiles` 默认值为 `true` @chaishi ([#3754](https://github.com/Tencent/tdesign-vue-next/pull/3754))
  - 输入框类型的上传组件，新增类名 `t-upload--theme-file-input` @chaishi ([#3754](https://github.com/Tencent/tdesign-vue-next/pull/3754))
- `Table`: 
  - 行选中功能，新增 `rowSelectionType` 用于定义是单选/多选，用于支持即使没有配置 `columns: [{ rowKey: "row-select", type: 'single' }]` 的情况下，也能通过 `selectOnRowClick` 进行行选中的控制 @chaishi ([#3758](https://github.com/Tencent/tdesign-vue-next/pull/3758))
  - 行选中功能，新增 `rowSelectionAllowUncheck` ，用于控制单选场景，是否允许取消选中 @chaishi ([#3758](https://github.com/Tencent/tdesign-vue-next/pull/3758))
- `ImageViewer`: 图片预览，加载失败时，不显示错误文本，只显示图标 @chaishi ([#3754](https://github.com/Tencent/tdesign-vue-next/pull/3754))
- `Menu`: 选中后关闭菜单，与其他组件保持交互行为一致([issue #2940](https://github.com/Tencent/tdesign-vue/issues/2940)) @uyarn ([#3764](https://github.com/Tencent/tdesign-vue-next/pull/3764))
- `RadioGroup`:  优化组件样式体验，`variant`为`default-filled`时初始状态不执行动画 @loganylwu ([#3765](https://github.com/Tencent/tdesign-vue-next/pull/3765))
- `Card`: `card` 组件支持传入 `loadingProps` 参数 @iiimix ([#3731](https://github.com/Tencent/tdesign-vue-next/pull/3731))
- `DatePicker`:  支持 `cancelRangeSelectLimit` `API` @githubid0719 ([#3718](https://github.com/Tencent/tdesign-vue-next/pull/3718))
- `Dropdown`: 移除对 `left` 的 `item` 样式特殊处理 @uyarn ([#3752](https://github.com/Tencent/tdesign-vue-next/pull/3752))

### 🐞 Bug Fixes

- `ImageViewer`: 
  - 去除默认值设置以使用 `globalConfig` 中的默认值,避免在不同语言环境中出现异常 @sinbadmaster ([#3709](https://github.com/Tencent/tdesign-vue-next/pull/3709))
  - 修改键盘事件绑定对象,避免影响全局键盘事件 @sinbadmaster ([#3712](https://github.com/Tencent/tdesign-vue-next/pull/3712))
- `Table`: 
  - 修复 `column-controller-visible-change` 事件参数 `trigger` 值不正确问题，[issue#3706](https://github.com/Tencent/tdesign-vue-next/issues/3706) @chaishi ([#3716](https://github.com/Tencent/tdesign-vue-next/pull/3716))
  - 虚拟滚动场景，修复吸顶 `Affix` 表头无法滚动同步问题 @Cat1007 ([#3746](https://github.com/Tencent/tdesign-vue-next/pull/3746))
  - 横向滚动场景，修复在 `Windows` 场景中，按下鼠标（不松开鼠标）横向滚动时，表头没有跟随滚动问题 @chaishi ([#3753](https://github.com/Tencent/tdesign-vue-next/pull/3753))
  - 可筛选表格，修复筛选值为 `0` 时，筛选图表没有高亮问题，[tdesign-vue#2987](https://github.com/Tencent/tdesign-vue/issues/2987) @chaishi ([#3753](https://github.com/Tencent/tdesign-vue-next/pull/3753))
  - `fixedRowHeight` 场景下初始化失败，导致虚拟滚动不生效 @Cat1007 ([#3739](https://github.com/Tencent/tdesign-vue-next/pull/3739))
  -  修正表格精度,避免表头和表格出现精度误差因此预期外的滚动条 @Cat1007 ([#3747](https://github.com/Tencent/tdesign-vue-next/pull/3747))
- `Tree`: 
  - 处理 `height` 属性无效的问题 ([issue #3713](https://github.com/Tencent/tdesign-vue-next/issues/3713)) @betavs ([#3717](https://github.com/Tencent/tdesign-vue-next/pull/3717))
  - 解决选中态初始化异常的问题 @TabSpace ([#3742](https://github.com/Tencent/tdesign-vue-next/pull/3742))
- `ImageViewer`: 滚轮缩放符合操作直觉 @sinbadmaster ([#3738](https://github.com/Tencent/tdesign-vue-next/pull/3738))
- `DateRangePicker`: 修复 `12` 月时选择同一个月内的日期后，第一次打开面板左右月份一样的问题([issue #3683](https://github.com/Tencent/tdesign-vue-next/issues/3683)) @Lyan-u ([#3727](https://github.com/Tencent/tdesign-vue-next/pull/3727))
- `DialogPlugin`: 修正获取元素操作 `className` 的时机 @Cat1007 ([#3732](https://github.com/Tencent/tdesign-vue-next/pull/3732))
- `DatePicker`: 修复日期选择禁用后，后缀图标颜色改变的问题 @HaixingOoO  @uyarn ([#3752](https://github.com/Tencent/tdesign-vue-next/pull/3752))
- `Table`: 修复 `1.7.1` 中，`Shift` 连续选中失效问题，[#3751](https://github.com/Tencent/tdesign-vue-next/issues/3751) @chaishi ([#3753](https://github.com/Tencent/tdesign-vue-next/pull/3753))
- `Select`: 修复 `1.6.0` 版本后 可过滤下 重新打开没有正常清除过滤输入内容的问题 @uyarn ([#3762](https://github.com/Tencent/tdesign-vue-next/pull/3762))
- `TreeSelect`: 修复可过滤下，重新打开没有清除过滤输入内容的问题 @uyarn ([#3762](https://github.com/Tencent/tdesign-vue-next/pull/3762))
- `Upload`: 修复取消拖拽上传后，状态无法回到组件初始状态问题，[#3646](https://github.com/Tencent/tdesign-vue-next/issues/3646) @chaishi ([#3754](https://github.com/Tencent/tdesign-vue-next/pull/3754))
- `InputNumber`: `allowInputOverLimit` 为 `false` 时，数字超过最大值 `onBlur` 不触发 @zhaodesen ([#3722](https://github.com/Tencent/tdesign-vue-next/pull/3722))
- `Pagination`: 将总数单位 `项` 改为 `条` , 保持内容一致性 @dinghuihua ([common#1687](https://github.com/Tencent/tdesign-common/pull/1687))
### 🚧 Others
-  `Dialog`:  增加统一管理弹窗 hooks @AuYuHui ([#3635](https://github.com/Tencent/tdesign-vue-next/pull/3635))


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
  - 远程搜索不再进行本地过滤，支持远程对选项 `trim` 或者额外处理的场景([issue #3605](https://github.com/Tencent/tdesign-vue-next/issues/3605))([issue #2801](https://github.com/Tencent/tdesign-vue-next/issues/2801)) @uyarn ([#3707](https://github.com/Tencent/tdesign-vue-next/pull/3707))
   - 修复非虚拟滚动场景下，无法键盘回车键直接选中过滤后的选项的缺陷 @uyarn ([#3707](https://github.com/Tencent/tdesign-vue-next/pull/3707))
- `Loading`: `ts` 类型丢失, `volar` 提示无效 @liweijie0812 ([#3684](https://github.com/Tencent/tdesign-vue-next/pull/3684))
- `AutoComplete`: 使用 `lodash/escapeRegExp` 转换关键字文本 @ZWkang ([#3661](https://github.com/Tencent/tdesign-vue-next/pull/3661))
- `Table`:  本地数据分页场景，修复行选中无效问题，[#3669](https://github.com/Tencent/tdesign-vue-next/pull/3669) @chaishi ([#3669](https://github.com/Tencent/tdesign-vue-next/pull/3669))
- `DropdownItem`: 处理禁用状态可点击的问题([issue #3693](https://github.com/Tencent/tdesign-vue-next/issues/3693)) @betavs ([#3696](https://github.com/Tencent/tdesign-vue-next/pull/3696))
- `Tabs`: 优化初始化滚动的场景，对处于中间的部分场景进行进一步优化([issue #3632](https://github.com/Tencent/tdesign-vue-next/issues/3632)) @uyarn ([#3699](https://github.com/Tencent/tdesign-vue-next/pull/3699))
- `Popup`:  修复控制台报错 @liweijie0812 ([#3705](https://github.com/Tencent/tdesign-vue-next/pull/3705))
- `Pagination`: 分页组件 `foldedMaxPageBtn` 优化([issue #3703](https://github.com/Tencent/tdesign-vue-next/issues/3703)) @DYS1230 ([#3704](https://github.com/Tencent/tdesign-vue-next/pull/3704))
- `BreadcrumbItem`: 修复 `breadcrumb-item` 组件 `target` 属性为 `_blank` 时没有在新标签页打开([#3634](https://github.com/Tencent/tdesign-vue-next/issues/3634)) @selicens ([#3637](https://github.com/Tencent/tdesign-vue-next/pull/3637))
- `AutoComplete`: 没选中项回车不触发选中事件([issue #3649](https://github.com/Tencent/tdesign-vue-next/issues/3649)) @liweijie0812 ([#3700](https://github.com/Tencent/tdesign-vue-next/pull/3700))
### 🚧 Others
- `BaseUsage`: 基础示例部分的代码格式化 @coderYangLiu ([#3654](https://github.com/Tencent/tdesign-vue-next/pull/3654))
- `Doc`: 更新 `CONTRIBUTING.md` @uyarn ([#3681](https://github.com/Tencent/tdesign-vue-next/pull/3681))

## 🌈 1.7.0 `2023-11-22` 
### 🚀 Features
- `Statistic`: 新增 `Statistic` 统计数值组件 @liweijie0812 ([#3329](https://github.com/Tencent/tdesign-vue-next/pull/3329))
- `Loading`: 当使用 `Plugin` 或指令调用时，隐藏 `Loading` 将会移除 `app` 实例([issue #3540](https://github.com/Tencent/tdesign-vue-next/issues/3540)) @Zz-ZzzZ ([#3576](https://github.com/Tencent/tdesign-vue-next/pull/3576))
- `Space`: 支持老旧浏览器也能正常显示子元素之间的间距，([tdesign-vue#1901](https://github.com/Tencent/tdesign-vue/issues/1901)) @chaishi ([#3565](https://github.com/Tencent/tdesign-vue-next/pull/3565))
- `Input`: `value` 支持数据类型 `number` @chaishi ([#3600](https://github.com/Tencent/tdesign-vue-next/pull/3600))
- `Tabs`: 新增滚动后对超长场景计算滚动距离的逻辑([issue #3543](https://github.com/Tencent/tdesign-vue-next/issues/3543)) @uyarn ([#3624](https://github.com/Tencent/tdesign-vue-next/pull/3624))
- `Tabs`: 支持`action`的使用 @uyarn ([#3624](https://github.com/Tencent/tdesign-vue-next/pull/3624))
### 🐞 Bug Fixes
- `Affix`: 新增元素判空，避免出现元素不存在报错 @chaishi ([#3584](https://github.com/Tencent/tdesign-vue-next/pull/3584))
- `Radio`: `useKeyboard` 通过正则匹配 `space`, 修复误判断删除键(`backspace`)是空格键(`space`) @liweijie0812 ([#3599](https://github.com/Tencent/tdesign-vue-next/pull/3599))
- `Checkbox`: `useKeyboardEvent ` 通过正则匹配 `space`, 修复误判断删除键(`backspace`)是空格键(`space`) @liweijie0812 ([#3599](https://github.com/Tencent/tdesign-vue-next/pull/3599))
- `Collapse`: 自定义右侧操作点击触发了折叠事件  ([issue#3579](https://github.com/Tencent/tdesign-vue-next/issues/3579)) @liweijie0812 ([#3581](https://github.com/Tencent/tdesign-vue-next/pull/3581))
- `Hooks`: 修复在使用 `dragSort` 时不使用回调 `Props` 函数出现的报错 @SuperManito ([#3592](https://github.com/Tencent/tdesign-vue-next/pull/3592))
- `Select`: 修复`1.6.6`版本后，多选模式下，无法通过enter键选中选项问题 @wilonjiang ([#3608](https://github.com/Tencent/tdesign-vue-next/pull/3608))
- `Cascader`: 修复默认值在选项中不存在时的报错([issue #3595](https://github.com/Tencent/tdesign-vue-next/issues/3595)) @PengYYYYY ([#3611](https://github.com/Tencent/tdesign-vue-next/pull/3611))
- `Dialog`: 修复 `attach="body"` `destroyOnClose` 嵌套超过三层关闭报错 @AuYuHui ([#3619](https://github.com/Tencent/tdesign-vue-next/pull/3619))
- `Table`: 修复多级表头场景，列配置功能失效问题 @chaishi ([#3622](https://github.com/Tencent/tdesign-vue-next/pull/3622))
### 🚧 Others
- `Table`: 优化示例代码 @chaishi ([#3584](https://github.com/Tencent/tdesign-vue-next/pull/3584))

## 🌈 1.6.8 `2023-11-07` 
### 🚀 Features
- `ImageViewer`: 新增支持 `closeOnEscKeydown`，用于控制是否允许 ESC 退出预览，[#2928](https://github.com/Tencent/tdesign-vue-next/issues/2928) @chaishi ([#3566](https://github.com/Tencent/tdesign-vue-next/pull/3566))
- `Upload`:  @chaishi
   - 图片预览功能，新增支持透传图片预览全部属性 `imageViewerProps`，[#2928](https://github.com/Tencent/tdesign-vue-next/issues/2928) ([#3566](https://github.com/Tencent/tdesign-vue-next/pull/3566))
   - ⚠️新增图片上传大小超出限制提醒，有额外单独实现此功能的业务需注意是否存在重复显示大小限制提醒问题，[#2736](https://github.com/Tencent/tdesign-vue-next/issues/2736) ([#3566](https://github.com/Tencent/tdesign-vue-next/pull/3566))
   - 多文件/图片上传场景下，`autoUpload=false` 时，支持使用 Props 属性/函数/插槽等方法自定义上传按钮和取消上传按钮，[#2469](https://github.com/Tencent/tdesign-vue-next/issues/2469) ([#3566](https://github.com/Tencent/tdesign-vue-next/pull/3566))
   - 多文件/图片上传场景下，`autoUpload=false` 时，区分已上传状态和待上传状态，[#2518](https://github.com/Tencent/tdesign-vue-next/issues/2518) ([#3566](https://github.com/Tencent/tdesign-vue-next/pull/3566))
   -  批量文件上传支持在列表中显示上传失败的原因，[#2518](https://github.com/Tencent/tdesign-vue-next/issues/2518) ([#3566](https://github.com/Tencent/tdesign-vue-next/pull/3566))
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
   -  修复 `max=1 multiple=false` 情况下，无法替换上传文件问题，[#2909](https://github.com/Tencent/tdesign-vue-next/issues/2909) ([#3566](https://github.com/Tencent/tdesign-vue-next/pull/3566))
   - 图片上传场景，修复禁用态卡片无法显示问题 ([#3573](https://github.com/Tencent/tdesign-vue-next/pull/3573))
- `Tree`: 提供获取树结构数据的 api: getTreeData @TabSpace ([#3571](https://github.com/Tencent/tdesign-vue-next/pull/3571))
- `Dialog`: 修复以Plugin的方式调用时，更新className会报错并且会覆盖组件的原className。 @Zz-ZzzZ ([#3570](https://github.com/Tencent/tdesign-vue-next/pull/3570))


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
  - 修复当 `upload` 为手动上传时，进度无法显示的问题([issue #3279](https://github.com/Tencent/tdesign-vue-next/issues/3279)) @ziyi99 ([#3531](https://github.com/Tencent/tdesign-vue-next/pull/3531))
  - 修复拖拽的文件不符合 `accept` 配置时，拖拽结束后不会触发 `Drop` 事件的问题 @ziyi99 ([#3532](https://github.com/Tencent/tdesign-vue-next/pull/3532))
- `TabNav`: 动态修改选项卡数量导致滑动按钮不符合预期 @betavs ([#3517](https://github.com/Tencent/tdesign-vue-next/pull/3517))
- `Timeline`:  修复 `TimelineItem` 的 `dotColor` 默认值错误 @liweijie0812 ([#3512](https://github.com/Tencent/tdesign-vue-next/pull/3512))
- `Pagination`: 修复当前页在被动更改时触发 `onCurrentChange` 事件([issue #3483](https://github.com/Tencent/tdesign-vue-next/issues/3483)) @Zz-ZzzZ ([#3511](https://github.com/Tencent/tdesign-vue-next/pull/3511))
- `Menu`: 修复菜单收起时的样式问题 by @RayJason ([#3542](https://github.com/Tencent/tdesign-vue-next/pull/3542))
- `Radio`: 修复只有一个选项的边角样式缺陷  @uyarn ([#3542](https://github.com/Tencent/tdesign-vue-next/pull/3542))
- `ColorPicker`: 修复最近使用颜色异常问题 @liect ([#3515](https://github.com/Tencent/tdesign-vue-next/pull/3515))
- `TreeSelect`: 修复未使用 `keys` 别名 @liect ([#3520](https://github.com/Tencent/tdesign-vue-next/pull/3520))

## 🌈 1.6.5 `2023-10-20` 
### 🚀 Features
- `TagInput`: 支持在超长滚动模式下进行滚动，对选项进行增删操作 @liweijie0812 ([#3501](https://github.com/Tencent/tdesign-vue-next/pull/3501))
- `Tabs`: `destroyOnHide` 默认值回退为true，懒加载使用请配合`destroyOnHide`设置为false使用，详情请看示例 @liweijie0812 ([#3504](https://github.com/Tencent/tdesign-vue-next/pull/3504))
### 🐞 Bug Fixes
- `Tree`: 修复当 `node` 的 `value` 为 `0` 时不会渲染的问题([issue #3474](https://github.com/Tencent/tdesign-vue-next/issues/3474)) @Zz-ZzzZ ([#3500](https://github.com/Tencent/tdesign-vue-next/pull/3500))
- `SelectInput`: 修复`1.6.2`之后非多选场景下基于`SelectInput`的组件如`Select`等，自动聚焦输入框的问题 @uyarn ([#3506](https://github.com/Tencent/tdesign-vue-next/pull/3506))
- `DatePicker`: 修复`1.6.2`之后选中控制台报错的问题 @uyarn ([#3506](https://github.com/Tencent/tdesign-vue-next/pull/3506))
### 🚧 Others
- `Select`: 修复示例的错误 @liect ([#3503](https://github.com/Tencent/tdesign-vue-next/pull/3503))



## 🌈 1.6.4 `2023-10-19` 
### 🚀 Features
- `Table`: 可筛选表格，支持设置 `confirmEvents: ['onChange']` 后，单选筛选器(`Radio`) 选择完成后自动关闭筛选器浮层 @chaishi ([#3478](https://github.com/Tencent/tdesign-vue-next/pull/3478))
- `Tabs`: `destroyOnHide` 默认值改 `false` @liweijie0812 ([#3467](https://github.com/Tencent/tdesign-vue-next/pull/3467))
- `Tabs`: 新增`lazy` 支持选项卡懒加载 @liweijie0812 ([#3467](https://github.com/Tencent/tdesign-vue-next/pull/3467))
### 🐞 Bug Fixes
- `Cascader`: 
  - 修复顶层 `class` 使用了 `proxy` 值，导致样式表现异常 @PengYYYYY ([#3488](https://github.com/Tencent/tdesign-vue-next/pull/3488))
  - 多选场景，未开启搜索功能，宽度自适应模式，修复鼠标悬浮时宽度会发生变化问题 ([#1623](https://github.com/Tencent/tdesign-common/pull/1623))
- `SelectInput`: 
  - `renderPrefixContent` 返回 `[null,undefined]` 或 `[undefined,undefined]` ,传递给 `input props.label`, 导致 `input` 渲染空的 `t-input__prefix` 节点 ([issue #2658](https://github.com/Tencent/tdesign-vue-next/pull/2658)) @liweijie0812 ([#3479](https://github.com/Tencent/tdesign-vue-next/pull/3479))
  - 修复下拉框内无法输入或聚焦“输入框”、“数字输入框”等可聚焦元素 @chaishi ([#3492](https://github.com/Tencent/tdesign-vue-next/pull/3492))
- `ImageViewer`: 控制栏控件中部数据，在步长值不为 `0.5` 时，精度丢失的问题 @xiaojueshi ([#3476](https://github.com/Tencent/tdesign-vue-next/pull/3476))
- `DatePicker`: `prefixIcon`  插槽不生效([issue #3475](https://github.com/Tencent/tdesign-vue-next/pull/3475)) @liweijie0812 ([#3479](https://github.com/Tencent/tdesign-vue-next/pull/3479))
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
- `Badge`: `content`,`count` 插槽支持([issue #3447](https://github.com/Tencent/tdesign-vue-next/issues/3447)) @liweijie0812 ([#3454](https://github.com/Tencent/tdesign-vue-next/pull/3454))

### 🐞 Bug Fixes
- `Input`: 聚焦和失焦事件纠正，当组件已经处于聚焦状态时，点击 `label/suffix/prefix/icon` 等元素，不再重复触发一次失焦和聚焦事件 @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
- `TagInput`: 聚焦和失焦事件纠正，当组件已经处于聚焦状态时，点击标签，不再重复触发一次失焦和聚焦事件 @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
- `Select`: 
  - 聚焦和失焦事件纠正，下拉选项选中时不再自动失焦，以便继续切换选项 @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
  - 筛选后使用键盘上下键选择功能异常([isssue #3392](https://github.com/Tencent/tdesign-vue-next/issues/3392)) @liweijie0812 ([#3420](https://github.com/Tencent/tdesign-vue-next/pull/3420))
 - 修复下拉选项闪现([issue #3416](https://github.com/Tencent/tdesign-vue-next/issues/3416)) @betavs ([#3418](https://github.com/Tencent/tdesign-vue-next/pull/3418))
- `Cascader`: 
  - 聚焦和失焦事件纠正，下拉选项选中时不再自动失焦，以便继续切换选项 @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
   - 修复 `cascader` 渲染多余的 `tag-input__prefix` 元素导致表现异常 @PengYYYYY ([#3446](https://github.com/Tencent/tdesign-vue-next/pull/3446))
  - `change` 事件中 `source` 异常问题([issue #2835](https://github.com/Tencent/tdesign-vue/issues/2835)) @PengYYYYY ([#3456](https://github.com/Tencent/tdesign-vue-next/pull/3456))
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
  - 修复 `Dialog plugin` 事件销毁 `Dialog` 未销毁 `wrapper`，导致多个 `wrapper` 在页面([issue #3381](https://github.com/Tencent/tdesign-vue-next/issues/3381)) @Zzongke ([#3383](https://github.com/Tencent/tdesign-vue-next/pull/3383))
  - 修复没有定义确认按钮属性场景时（即没有设置 `confirmBtn`），`confirmLoading` 无效问题 @chaishi ([#3393](https://github.com/Tencent/tdesign-vue-next/pull/3393))
- `Table`: 列配置弹框，关闭时默认不销毁 @chaishi ([#3380](https://github.com/Tencent/tdesign-vue-next/pull/3380))
- `Checkbox`: 修复 `checkbox-group` 的 `innerValue.value` 为 `undefined` 导致异常 @Nice-PLQ ([#3405](https://github.com/Tencent/tdesign-vue-next/pull/3405))
- `List`: 修复 `1.5.6` 版本 `list-item` 丢失 `props` 的异常 @uyarn ([#3376](https://github.com/Tencent/tdesign-vue-next/pull/3376))
## 🌈 1.5.6 `2023-09-14` 
### 🚀 Features
- `Table`: 
  - 可编辑单元格，支持透传编辑组件事件属性 `edit.props.onChange`，[issue#2843](https://github.com/Tencent/tdesign-vue-next/issues/2843) @chaishi ([#3353](https://github.com/Tencent/tdesign-vue-next/pull/3353))
  - 可高亮行表格，支持鼠标点击高亮表格行，支持键盘操作高亮行（ArrowDown/ArrowUp/Space/ESC/Shift），支持连续高亮行区域，[issue#2217](https://github.com/Tencent/tdesign-vue-next/issues/2217) @chaishi ([#3353](https://github.com/Tencent/tdesign-vue-next/pull/3353))
  - 可悬浮表格，除鼠标悬浮表格行之外，本次新增支持键盘操作悬浮表格行 @chaishi ([#3353](https://github.com/Tencent/tdesign-vue-next/pull/3353))
  - 可选中行表格，支持键盘操作（ArrowDown/ArrowUp/Space/ESC/Shift） @chaishi ([#3353](https://github.com/Tencent/tdesign-vue-next/pull/3353))
  - 除全局配置支持语言配置外，本次新增通过属性 `local` 进行单个组件进行语言配置 @chaishi ([#3362](https://github.com/Tencent/tdesign-vue-next/pull/3362))
  - 列配置功能，支持定义 `columnControllerTopContent` 和 `columnControllerBottomContent` 定义列配置弹框顶部或底部内容 @chaishi ([#3362](https://github.com/Tencent/tdesign-vue-next/pull/3362))
  - 列配置功能，支持分组显示列配置信息，一般用于表格列数量特别多，需要分类显示场景 @chaishi ([#3362](https://github.com/Tencent/tdesign-vue-next/pull/3362))
- `SelectInput`: 新增 `valueDisplayOptions`，可配置在使用 `valueDisplay` 时也使用自带的占位符与输入回显实现([issue #3339](https://github.com/Tencent/tdesign-vue-next/issues/3339)) @ngyyuusora ([#3342](https://github.com/Tencent/tdesign-vue-next/pull/3342))
- `List`: 支持虚拟滚动的支持 @uyarn ([#3360](https://github.com/Tencent/tdesign-vue-next/pull/3360))
- `TreeSelect`: 支持`panelTopContent`和 `panelBottomContent` 的使用 @uyarn ([#3355](https://github.com/Tencent/tdesign-vue-next/pull/3355))

### 🐞 Bug Fixes
- `Table`: 
  - 修复 Dialog 弹框中打开表格，表格中分页组件信息出现超出省略问题，[issue#3266](https://github.com/Tencent/tdesign-vue-next/issues/3266)，[issue#3092](https://github.com/Tencent/tdesign-vue-next/issues/3092) @chaishi ([#3352](https://github.com/Tencent/tdesign-vue-next/pull/3352))
  - 列配置功能，修复每次打开自定义列配置弹框，都会创建一个新的弹框而旧弹框没有消除问题 @chaishi ([#3362](https://github.com/Tencent/tdesign-vue-next/pull/3362))
- `Dialog`: 
  - 修复 Dialog 弹框中打开表格，分页组件信息出现超出省略问题，[issue#3266](https://github.com/Tencent/tdesign-vue-next/issues/3266)，[issue#3092](https://github.com/Tencent/tdesign-vue-next/issues/3092) @chaishi ([#3352](https://github.com/Tencent/tdesign-vue-next/pull/3352))
  - 类型问题，修复 DialogPlugin({ cancenBtn: '取消' }) 提醒类型缺失问题， [issues#2635](https://github.com/Tencent/tdesign-vue-next/issues/2635) @chaishi ([#3352](https://github.com/Tencent/tdesign-vue-next/pull/3352))
- `Cascader`: 修复 `borderless` 无效 @PengYYYYY ([#3359](https://github.com/Tencent/tdesign-vue-next/pull/3359))
- `Pagination`: 修复 Dialog 弹框中打开表格，分页组件信息出现超出省略问题，[issue#3266](https://github.com/Tencent/tdesign-vue-next/issues/3266)，[issue#3092](https://github.com/Tencent/tdesign-vue-next/issues/3092) @chaishi ([#3352](https://github.com/Tencent/tdesign-vue-next/pull/3352))
- `Input`: 修复默认不显示，满足某种条件后才显示的场景下，自动宽度计算错误问题，[issue#3266](https://github.com/Tencent/tdesign-vue-next/issues/3266)，[issue#3092](https://github.com/Tencent/tdesign-vue-next/issues/3092) @chaishi ([#3352](https://github.com/Tencent/tdesign-vue-next/pull/3352))
- `useResizeObserver`: 修复缺少容器元素判空问题 @chaishi ([#3372](https://github.com/Tencent/tdesign-vue-next/pull/3372))
### 🚧 Others
- docs(tree): example filter update @liweijie0812 ([#3326](https://github.com/Tencent/tdesign-vue-next/pull/3326))
## 🌈 1.5.4 `2023-09-07` 
### 🚀 Features
- `Table`: @chaishi
  - 可筛选表格，`onFilterChange` 事件新增参数 `trigger: 'filter-change' | 'confirm' | 'reset' | 'clear'`，表示触发筛选条件变化的来源 ([#3316](https://github.com/Tencent/tdesign-vue-next/pull/3316))
  - 可筛选表格，支持使用 `filter.label` 单独定义晒选项别名，可以和 `title` 标题不一样 ([#3321](https://github.com/Tencent/tdesign-vue-next/pull/3321))
- `Watermark`: 文字新增`fontFamily`属性 @LadyChatterleyLover ([#3314](https://github.com/Tencent/tdesign-vue-next/pull/3314))
- `Dialog`: @chaishi
   - 支持使用 `confirmLoading` 控制确认按钮加载状态  ([#3343](https://github.com/Tencent/tdesign-vue-next/pull/3343))
   - 组件实例函数新增 `confirmDialog.setConfirmLoading(true)` 和 `confirmDialog.update({ confirmLoading: true })`，用于设置确认按钮加载状态 ([#3343](https://github.com/Tencent/tdesign-vue-next/pull/3343))
- `TreeSelect`: 树选择支持suffix和suffixIcon @ngyyuusora ([#3290](https://github.com/Tencent/tdesign-vue-next/pull/3290))
### 🐞 Bug Fixes

- `Form`: 修复 form 组件 scrollToFirstError 无效的问题 @dreamlords ([#3294](https://github.com/Tencent/tdesign-vue-next/pull/3294))
- `Table`:  @chaishi
   - 可筛选表格，修复 `resetValue` 在清空筛选时，未能重置到指定 `resetValue` 值的问题 ([#3316](https://github.com/Tencent/tdesign-vue-next/pull/3316))
   - 可筛选表格，修复晒选项的值为 `false` 时，筛选图标未能高亮问题 ([#3321](https://github.com/Tencent/tdesign-vue-next/pull/3321))
   -  树形结构，可拖拽调整行顺序，修复最后一个节点展开的子节点位置不正确问题 ([#3296](https://github.com/Tencent/tdesign-vue-next/pull/3296))
   -  树形结构，修复 `v1.5.3` 中 `tree.defaultExpandAll` 失效问题 ([#3296](https://github.com/Tencent/tdesign-vue-next/pull/3296))
   - 树形结构表格，修复 expandedTreeNodes.sync 和 @expanded-tree-nodes-change 使用 expandTreeNodeOnClick  时无效问题
   -  支持不使用columnController时也可以使用列配置 @ngyyuusora ([#3301](https://github.com/Tencent/tdesign-vue-next/pull/3301))
   - 可筛选表格，解决 `title` 使用函数或插槽定义时，过滤结果行文本显示问题，[issue#3303](https://github.com/Tencent/tdesign-vue-next/issues/3303) ([#3321](https://github.com/Tencent/tdesign-vue-next/pull/3321))
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
- `Input`: 添加 `maxlength` 属性 `String` 类型 ([issue #3265](https://github.com/Tencent/tdesign-vue-next/issues/3265)) @Zz-ZzzZ ([#3271](https://github.com/Tencent/tdesign-vue-next/pull/3271))
- `Textarea`: 添加 `maxlength` 属性 `String` 类型 ([issue #3265](https://github.com/Tencent/tdesign-vue-next/issues/3265)) @Zz-ZzzZ ([#3271](https://github.com/Tencent/tdesign-vue-next/pull/3271))
- `Table`: 树形结构，没有设置 `expandedTreeNodes` 情况下，`data` 数据发生变化时，自动重置收起所有展开节点。如果希望保持展开节点，请使用属性 `expandedTreeNodes` 控制变化后的数据展开节点。原因：表格数据变化前后的节点可能会有不同，`expandedTreeNodes`自然也会不同，组件内部无法预判新数据中展开哪些节点。[tdesign-vue#2735](https://github.com/Tencent/tdesign-vue/issues/2735) @chaishi ([#3283](https://github.com/Tencent/tdesign-vue-next/pull/3283))

### 🐞 Bug Fixes
- `Table`: 
  - 拖拽排序 + 本地数据分页场景，修复拖拽排序事件参数 `currentIndex/targetIndex/current/target` 等不正确问题 @chaishi ([#3283](https://github.com/Tencent/tdesign-vue-next/pull/3283))
  - 拖拽排序 + 本地数据分页场景，修复在第二页以后的分页数据中拖拽调整顺序后，会自动跳转到第一页问题 @chaishi ([#3283](https://github.com/Tencent/tdesign-vue-next/pull/3283))
  - 支持分页非受控用法的拖拽排序场景 @chaishi ([#3283](https://github.com/Tencent/tdesign-vue-next/pull/3283))
- `Button`: 修复了 `button` 在 `loading` 状态下依然可以触发点击事件的问题 @yuzunyue ([#3269](https://github.com/Tencent/tdesign-vue-next/pull/3269))
- `Upload`: 修复非自动上传时图片缩略图不显示 @imp2002 ([#3276](https://github.com/Tencent/tdesign-vue-next/pull/3276))
- `Menu`: 修复通过 `v-for` 渲染双层菜单时部分属性失效的问题 @uyarn ([#3289](https://github.com/Tencent/tdesign-vue-next/pull/3289))
- `Tabs`: 修复在封装`tabs`组件时内部定义了`slot`后使用`v-for`不渲染的问题([issue #3281](https://github.com/Tencent/tdesign-vue-next/issues/3281)) @Zz-ZzzZ ([#3288](https://github.com/Tencent/tdesign-vue-next/pull/3288))
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
- `Menu`: 
  - 修复普通双层菜单模式路由跳转功能失效的问题([issue #3261](https://github.com/Tencent/tdesign-vue-next/issues/3261)) @uyarn ([#3263](https://github.com/Tencent/tdesign-vue-next/pull/3263))
  - 修复普通双层菜单 `click` 事件丢失的问题([issue #3256](https://github.com/Tencent/tdesign-vue-next/issues/3256)) @uyarn ([#3263](https://github.com/Tencent/tdesign-vue-next/pull/3263))
- `Table`: 
  - 树形结构，修复组件实例方法 展开全部 `expandAll` 问题 @chaishi ([#3260](https://github.com/Tencent/tdesign-vue-next/pull/3260))
  - 点击行展开/点击行选中，修复 `expandOnRowClick`和 `selectOnRowClick` 无法独立控制行点击执行交互问题 [issue#3254](https://github.com/Tencent/tdesign-vue-next/issues/3254) @chaishi ([#3260](https://github.com/Tencent/tdesign-vue-next/pull/3260))
- `Upload`: 修复`Upload`组件`showUploadProgress`属性不生效([issue #3239](https://github.com/Tencent/tdesign-vue-next/issues/3239)) @imp2002 ([#3245](https://github.com/Tencent/tdesign-vue-next/pull/3245))
- `Switch`:  调整 `disabled` 禁用优先级，`Switch.disabled > Form.disabled` @liweijie0812 ([#3247](https://github.com/Tencent/tdesign-vue-next/pull/3247))
- `Link`: 调整 `disabled` 禁用优先级，`Link.disabled > Form.disabled` @liweijie0812 ([#3252](https://github.com/Tencent/tdesign-vue-next/pull/3252))
### 🚧 Others
- `Transfer`: 树形示例增加 `keys` 配置，方便了解使用方式 @uyarn ([#3267](https://github.com/Tencent/tdesign-vue-next/pull/3267))
## 🌈 1.5.1 `2023-08-15`

### ❗ Breaking Changes
- `Icon`: 新增 960 个图标；调整图标命名 `photo` 为 `camera`，`books` 为 `bookmark`, `stop-cirle-1` 为 `stop-circle-stroke`；移除 `money-circle` 图标，具体请查看图标页面  @uyarn ([#3174](https://github.com/Tencent/tdesign-vue-next/pull/3174))

### 🚀 Features
- `Select`: 
  - 支持透传 `label` 属性，定义内部标签名称 @chaishi ([#3212](https://github.com/Tencent/tdesign-vue-next/pull/3212))
  - 增加 `keys.disabled` 用于定制字段控制选项的禁用 @PengYYYYY ([#3202](https://github.com/Tencent/tdesign-vue-next/pull/3202))
- `Table`: 可编辑单元格场景，新增 `edit.keepEditMode` ，用于保持单元格始终为编辑模式 @chaishi ([#3199](https://github.com/Tencent/tdesign-vue-next/pull/3199))
- `Link`: 新增透传 `download` 属性，支持浏览器直接下载 ([issue #2628](https://github.com/Tencent/tdesign-vue/issues/2628)) @xiaosansiji ([#3201](https://github.com/Tencent/tdesign-vue-next/pull/3201))
- `Guide`: 完整支持自定义高亮框 @zhangpaopao0609 ([#3111](https://github.com/Tencent/tdesign-vue-next/pull/3111))
- `Button`: 支持使用  `Tab` 键聚焦 @chaishi ([#3218](https://github.com/Tencent/tdesign-vue-next/pull/3218))
- `Checkbox`: 支持使用空格键选中或取消选中 @chaishi ([#3218](https://github.com/Tencent/tdesign-vue-next/pull/3218))
- `Radio`: 支持使用空格键选中或取消选中 @chaishi ([#3218](https://github.com/Tencent/tdesign-vue-next/pull/3218))
- `Form`: `FormItem` 组件支持遗漏的属性 `status` 和 `tips`，用于定义不同状态的提升文本；其中 `tips` 支持插槽形式 @chaishi ([#3225](https://github.com/Tencent/tdesign-vue-next/pull/3225))
- `InputNumber`: `tips` 支持使用插槽自定义 @chaishi ([#3225](https://github.com/Tencent/tdesign-vue-next/pull/3225))
- `TreeSelect`: 增加 `keys` 字段用于定制数据中对应的字段别名 @PengYYYYY ([#3202](https://github.com/Tencent/tdesign-vue-next/pull/3202))
- `Cascader`: 增加 `keys.disabled` 用于定制字段控制节点的禁用([issue #3193](https://github.com/Tencent/tdesign-vue-next/issues/3193)) @PengYYYYY ([#3202](https://github.com/Tencent/tdesign-vue-next/pull/3202))
- `Tree`: 增加 `keys.disabled` 用于定制字段控制节点的禁用 @PengYYYYY ([#3202](https://github.com/Tencent/tdesign-vue-next/pull/3202))
- `Transfer`: 增加 `keys.disabled` 用于定制字段控制选项的禁用 @PengYYYYY ([#3202](https://github.com/Tencent/tdesign-vue-next/pull/3202))
- `ImageViewer`: 修复图片浏览的全局配置无效([issue #3171](https://github.com/Tencent/tdesign-vue-next/issues/3171)) @sinbadmaster ([#3236](https://github.com/Tencent/tdesign-vue-next/pull/3236))
- `MenuItem`: 修复点击后的回调函数报错 @PengYYYYY ([#3237](https://github.com/Tencent/tdesign-vue-next/pull/3237))
### 🐞 Bug Fixes
- `Table`: 
  - 修复 `dragSort` 配置为 `row-handler-col` 时拖拽排序不生效的问题([issue #2718](https://github.com/Tencent/tdesign-vue-next/issues/2718)) @nined9 ([#2717](https://github.com/Tencent/tdesign-vue-next/pull/2717)) 
  - 虚拟滚动场景，修复默认的滚动条长度（位置）和滚动后的不一致问题 @chaishi ([#3199](https://github.com/Tencent/tdesign-vue-next/pull/3199))
- `Popup`: `overlayEl` 未绑定，第一次点开无法定位到选中项 @AuYuHui ([#3189](https://github.com/Tencent/tdesign-vue-next/pull/3189))
- `Menu`: 修复同一个 `MenuItem` 多次触发 `onChange` 的问题 @leezng ([#3187](https://github.com/Tencent/tdesign-vue-next/pull/3187))
- `SelectInput`: 修复宽度自适应模式 `autoWidth` 下拉框宽度过窄问题 @chaishi ([#3212](https://github.com/Tencent/tdesign-vue-next/pull/3212))
- `Select`: 修复宽度自适应模式 `autoWidth` 下拉框宽度过窄问题 @chaishi ([#3212](https://github.com/Tencent/tdesign-vue-next/pull/3212))
- `Link`: 修复 `target` 属性未传时，实际渲染 `<a />` 标签会显示 `target` 空属性的问题 @xiaosansiji ([#3201](https://github.com/Tencent/tdesign-vue-next/pull/3201))
- `TreeSelect`: 自定义显示 `tag` 关闭异常 ([issue #3216](https://github.com/Tencent/tdesign-vue-next/issues/3216)) @sinbadmaster ([#3217](https://github.com/Tencent/tdesign-vue-next/pull/3217))
- `Form`: 修复 `scrollToFirstError` 无法滚动到 `<form-item :name="list[${index}].name"` 这样的列表元素问题 @chaishi ([#3225](https://github.com/Tencent/tdesign-vue-next/pull/3225))
- `ImageViewer`:  清除图片查看状态 @sinbadmaster ([#3224](https://github.com/Tencent/tdesign-vue-next/pull/3224))
- `MenuItem`:  `onClick` 事件参数调整 @dexterBo ([#3228](https://github.com/Tencent/tdesign-vue-next/pull/3228))
- `Tree`:  修复 `tree` 组件深度监听问题([issue #3227](https://github.com/Tencent/tdesign-vue-next/issues/3227)) @PengYYYYY ([#3232](https://github.com/Tencent/tdesign-vue-next/pull/3232))
### 🚧 Others
- `Demo`: 修复 `form` 的 `custom-validator` 示例代码 @PengYYYYY ([#3205](https://github.com/Tencent/tdesign-vue-next/pull/3205))
- `Icon`: 新增分类展示全部图标的UI  @uyarn ([#3174](https://github.com/Tencent/tdesign-vue-next/pull/3174))
- `InputNumber`: `tips` 使用统一的类名 `.t-tips` 和 `t-is-xxx` @chaishi ([#3225](https://github.com/Tencent/tdesign-vue-next/pull/3225))
- `Cascader`: 补充 `borderless` 文档 @PengYYYYY ([#3202](https://github.com/Tencent/tdesign-vue-next/pull/3202))
- `Test`: 修复测试告警 @PengYYYYY ([#3229](https://github.com/Tencent/tdesign-vue-next/pull/3229))
- `Affix`: 修复 `offsetBottom/offsetTop` 文档描述 @xiaosansiji ([#3233](https://github.com/Tencent/tdesign-vue-next/pull/3233))
- `Treeselect`: 修复 `keys` 文档描述 @xiaosansiji ([#3233](https://github.com/Tencent/tdesign-vue-next/pull/3233))
## 🌈 1.4.2 `2023-08-02` 
### 🚀 Features
- `Table`: 可筛选表格，当前 `filterValue` 未设置过滤值的默认值时，不再透传 `undefined` 到筛选器组件，某些组件的默认值必须为数组，不允许是 `undefined` @chaishi ([#3164](https://github.com/Tencent/tdesign-vue-next/pull/3164))
- `Table`: 可筛选表格，支持透传 `attrs/style/classNames` 属性、样式、类名等信息到自定义组件，[tdesign-vue#2627](https://github.com/Tencent/tdesign-vue/issues/2627) @chaishi ([#3164](https://github.com/Tencent/tdesign-vue-next/pull/3164))
### 🐞 Bug Fixes
- `Table`: 固定表头固定列空数据场景，“暂无数据”错位显示问题，[issue#3166](https://github.com/Tencent/tdesign-vue-next/issues/3166) @chaishi ([#3167](https://github.com/Tencent/tdesign-vue-next/pull/3167))
- `table`: 远程分页使用非受控用法时，切换超过 `defaultPageSize` 的页面大小数据展示不全 @ngyyuusora ([#3173](https://github.com/Tencent/tdesign-vue-next/pull/3173))
### 🚧 Others
- `Image`: 代码整理 @chaishi ([#3167](https://github.com/Tencent/tdesign-vue-next/pull/3167))
## 🌈 1.4.1 `2023-07-27` 
### 🐞 Bug Fixes
- `Table`: 可编辑表格校验错误信息样式不对齐，([issue#3154](https://github.com/Tencent/tdesign-vue-next/issues/3154)) @chaishi ([#3155](https://github.com/Tencent/tdesign-vue-next/pull/3155))
- `Tree`: 修复 ([pr #3154](https://github.com/Tencent/tdesign-vue-next/pull/3154)) 导致的树选择器单选无法选中([issue#3158](https://github.com/Tencent/tdesign-vue-next/issues/3158)) ([issue#3154](https://github.com/Tencent/tdesign-vue-next/issues/3154))  @uyarn ([#3159](https://github.com/Tencent/tdesign-vue-next/pull/3159))
### 🚧 Others
- `Common`: 输入框类组件的 `tips` 使用统一的文本提示样式，注意 `tips` 类名变更 @chaishi ([#3155](https://github.com/Tencent/tdesign-vue-next/pull/3155)) 
## 🌈 1.4.0 `2023-07-26` 
### 🚀 Features
- `TimePicker`: 
  - `disableTime` 回调新增毫秒参数 @uyarn ([#3151](https://github.com/Tencent/tdesign-vue-next/pull/3151))
  -  优化展示不可选时间选项时滚动到不可选选项的体验 @uyarn ([#3151](https://github.com/Tencent/tdesign-vue-next/pull/3151))
- `Menu`: 重构侧边栏导航子菜单展开/收起动画实现，修复 `SubMenu` 菜单项过多时无法完整展示的问题 ([issues #2262](https://github.com/Tencent/tdesign-vue/issues/2262)) @xiaosansiji ([#3140](https://github.com/Tencent/tdesign-vue-next/pull/3140))
- `Image`: 属性 `src` 支持传入 `File` 文件类型显示图片 @chaishi ([#3136](https://github.com/Tencent/tdesign-vue-next/pull/3136))
- `ImageViewer`: 属性 `images` 支持传入 `File` 文件类型预览图片 @chaishi ([#3136](https://github.com/Tencent/tdesign-vue-next/pull/3136))
- `Upload`: 文件上传列表支持显示缩略图，通过 `showThumbnail` 属性控制 @chaishi ([#3136](https://github.com/Tencent/tdesign-vue-next/pull/3136))

### 🐞 Bug Fixes
- `Table`: 
  - 可编辑表格场景，支持设置 `colKey` 值为链式属性，如：`a.b.c` @chaishi ([#3137](https://github.com/Tencent/tdesign-vue-next/pull/3137))
  - 可编辑表格场景，行编辑，`edit.props` 和 `edit.on` 为函数时，新增参数 `updateEditedCellValue` 用于更新编辑状态的表格数据，[tdesign-vue#2577](https://github.com/Tencent/tdesign-vue/issues/2577) @chaishi ([#3137](https://github.com/Tencent/tdesign-vue-next/pull/3137))
  - 列宽调整 + 表头吸顶 + 列配置自定义综合场景下，列宽变少时，表格宽度无法恢复原来的宽度，([tdesign-vue#2363](https://github.com/Tencent/tdesign-vue/issues/2363)) @chaishi ([#3137](https://github.com/Tencent/tdesign-vue-next/pull/3137))
  - 修复可编辑单元格场景，执行 `validateTableData` 函数后，没有触发事件 `onValidate` 问题 @chaishi ([#3143](https://github.com/Tencent/tdesign-vue-next/pull/3143))
- `Tree`: 修复 `active` 事件中，参数 `context` 中 `actived` 值和实际状态相反 @gaoachao ([#3134](https://github.com/Tencent/tdesign-vue-next/pull/3134))
- `Button`: 禁用优先级, `Button.disabled > Form.disabled` @liweijie0812 ([#3133](https://github.com/Tencent/tdesign-vue-next/pull/3133))
- `InputNumber`: `decimalPlaces` 存在时，数值满足要求，用户未操作，就已经触发 `onChange` 事件问题，([tdesign-vue#2616](https://github.com/Tencent/tdesign-vue/issues/2616)) @chaishi ([#3145](https://github.com/Tencent/tdesign-vue-next/pull/3145))
- `Menu`: 修复 `MenuItem` `click` 点击事件未传递 `event` 参数的问题 @xiaosansiji ([#3140](https://github.com/Tencent/tdesign-vue-next/pull/3140)) 
 ## 🌈 1.3.12 `2023-07-19` 
### 🚀 Features
- `Checkbox`: 
  - 新增支持键盘控制选项选中或取消选中 @chaishi ([#3103](https://github.com/Tencent/tdesign-vue-next/pull/3103))
  - 新增支持 `lazyLoad`，用于需要渲染大量数据，或懒加载复杂内容/图片场景 @chaishi ([#3103](https://github.com/Tencent/tdesign-vue-next/pull/3103))
### 🐞 Bug Fixes
- `Input`: 
  - 输入框的值 类型移除 `Number` @liweijie0812 ([#3100](https://github.com/Tencent/tdesign-vue-next/pull/3100))
  - 恢复部分属性默认值数据类型定义 @chaishi ([#3102](https://github.com/Tencent/tdesign-vue-next/pull/3102))
  - 修复 `prefixIcon` 的 `padding` 样式问题 @uyarn ([#3113](https://github.com/Tencent/tdesign-vue-next/pull/3113))
- `Rate`: 修复 `rate` 在开启文字显示与半星时，`tooltip` 显示异常的问题([issue #2891](https://github.com/Tencent/tdesign-vue-next/issues/2891)) @xixileng ([#3097](https://github.com/Tencent/tdesign-vue-next/pull/3097))
- `InputNumber`: 修复 `input-number` 内容为空时，值为 `undefined` 的问题，应当为 `null` ([issue #2900](https://github.com/Tencent/tdesign-vue-next/issues/2900)) @xixileng ([#3098](https://github.com/Tencent/tdesign-vue-next/pull/3098))
- `Checkbox`: 修复 `Form.disabled` 表单无法统一控制 `Checkbox` 组件禁用状态问题 @chaishi ([#3103](https://github.com/Tencent/tdesign-vue-next/pull/3103))
- `Select`: 修复 `autofocus` 不生效的问题([issue #2970](https://github.com/Tencent/tdesign-vue-next/issues/2970)) @xixileng ([#3112](https://github.com/Tencent/tdesign-vue-next/pull/3112))
- `Radio`:  优化选项组换行情况 @ontheroad1992 ([#3081](https://github.com/Tencent/tdesign-vue-next/pull/3081))
- `Icon`: 修复 `manifest` 字段影响开发阶段请求的问题 @uyarn ([#3113](https://github.com/Tencent/tdesign-vue-next/pull/3113))
- `TagInput`: 修复 `tag-input` 前缀不居中且会发生抖动的问题 @xixileng  @uyarn ([#3113](https://github.com/Tencent/tdesign-vue-next/pull/3113))
- `Transfer`: 修复 `t-transfer__list-item` 与 `t-checkbox` 优先级问题 @uyarn ([#3113](https://github.com/Tencent/tdesign-vue-next/pull/3113))
- `Select`: 修复使用 `tab` 键聚焦时无法输入内容的问题 ([issue #2960](https://github.com/Tencent/tdesign-vue-next/issues/2960)) @xixileng ([#3119](https://github.com/Tencent/tdesign-vue-next/pull/3119))
- `Stickytool`: 修复 `sticky-item` 组件内部无法更新数据的问题 @uyarn ([#3118](https://github.com/Tencent/tdesign-vue-next/pull/3118))
- `Dialog`: `dialog plugin` 执行 `destroy` 方法时，销毁组件实例 @xixileng ([#3095](https://github.com/Tencent/tdesign-vue-next/pull/3095))
- `DatePicker`: 优化关闭浮层后重置默认选中区域 @honkinglin ([#3107](https://github.com/Tencent/tdesign-vue-next/pull/3107))
- `Grid`: `row Props.gutter` 类型补充 `lg,xl,xxl` @liweijie0812 ([#3105](https://github.com/Tencent/tdesign-vue-next/pull/3105))
### 🚧 Others
- `Form`: 示例代码中 `email`  使用 `t-auto-complete` 组件替换 @liweijie0812 ([#3101](https://github.com/Tencent/tdesign-vue-next/pull/3101))
 
## 🌈 1.3.11 `2023-07-12` 
### 🚀 Features
- `Upload`: 
  - 新增组件实例方法，`uploadFilePercent` 用于更新文件上传进度 @chaishi ([#3074](https://github.com/Tencent/tdesign-vue-next/pull/3074))
  - `theme=image`，支持使用 `fileListDisplay` 自定义 UI 内容 @chaishi ([#3074](https://github.com/Tencent/tdesign-vue-next/pull/3074))
  - `theme=image`，支持点击名称打开新窗口访问图片，[tdesign-vue#2338](https://github.com/Tencent/tdesign-vue/issues/2338) @chaishi ([#3074](https://github.com/Tencent/tdesign-vue-next/pull/3074))
  - 拖拽上传场景，支持 `accept` 文件类型限制，[issue#3075](https://github.com/Tencent/tdesign-vue-next/issues/3075) @chaishi ([#3074](https://github.com/Tencent/tdesign-vue-next/pull/3074))
  -  去除图片文件名颜色，使用 Link 组件统一颜色 @chaishi ([#3074](https://github.com/Tencent/tdesign-vue-next/pull/3074))
  - 添加文件类型过滤方法 getFileList @chaishi ([#3074](https://github.com/Tencent/tdesign-vue-next/pull/3074))
- `Textarea`: 支持动态更改 `autosize` 属性 ([issue #3068](https://github.com/Tencent/tdesign-vue-next/issues/3068)) @Zz-ZzzZ ([#3077](https://github.com/Tencent/tdesign-vue-next/pull/3077))
- `MenuItem`: 新增 `API: routerLink`，可指定菜单项渲染为 `Router` 控制跳转的 `a` 标签 @boogie-ben ([#3057](https://github.com/Tencent/tdesign-vue-next/pull/3057))
### 🐞 Bug Fixes
- `MenuItem`: 
  - 渲染为 `a` 标签时，`a` 标签覆盖范围扩大至整个菜单项，而不是只有文本部分 @boogie-ben ([#3057](https://github.com/Tencent/tdesign-vue-next/pull/3057))
  - 修复当菜单项渲染 `a` 标签并且 `menu` 在 `collapsed` 状态时，菜单项内容区隐藏导致无法点击跳转的问题 @boogie-ben ([#3057](https://github.com/Tencent/tdesign-vue-next/pull/3057))
  - 修复渲染为 `a` 标签时并在 `popup` 出现时，文本对齐与正常菜单项的位置不一致的问题 @boogie-ben ([#3057](https://github.com/Tencent/tdesign-vue-next/pull/3057))
- `Table`: 修复主动触发页码更新时表格序号列没有重新计算([issue #3038](https://github.com/Tencent/tdesign-vue-next/issues/3038)) @tanhh326 ([#3071](https://github.com/Tencent/tdesign-vue-next/pull/3071))
 - `Upload`: 自定义上传方法，修复未能正确返回上传成功或失败后的文件问题 @chaishi ([#3074](https://github.com/Tencent/tdesign-vue-next/pull/3074))
 - `SelectInput`: 修复使用回退键删除 `input` 中内容时，会删除 `tag` ([issue #2939](https://github.com/Tencent/tdesign-vue-next/issues/2939)) @tanhh326 ([#3072](https://github.com/Tencent/tdesign-vue-next/pull/3072))
 - `DateRangePicker`: 修复`suffix` `prefix` 无法响应数据变化渲染的问题 @uyarn ([#3085](https://github.com/Tencent/tdesign-vue-next/pull/3085))
### 🚧 Others
- `Upload`: API 添加更多英文描述 @chaishi ([#3074](https://github.com/Tencent/tdesign-vue-next/pull/3074))

## 🌈 1.3.10 `2023-07-05` 
### 🚀 Features
- `Table`: 树形结构，添加行层级类名，方便业务设置不同层级的样式 @chaishi ([#3037](https://github.com/Tencent/tdesign-vue-next/pull/3037))
- `Form`: FormRules，添加默认泛型类型 ，如此可以不再强制定义定义类型，直接写 `FormRule` 即可 @chaishi ([#3040](https://github.com/Tencent/tdesign-vue-next/pull/3040))
- `DatePicker`:  新增 `onConfirm` 事件 @liweijie0812 ([#3033](https://github.com/Tencent/tdesign-vue-next/pull/3033))

### 🐞 Bug Fixes
- `Input`: 修复 `limitNumber` 部分在 `disabled` 状态下的样式问题 @uyarn ([#3034](https://github.com/Tencent/tdesign-vue-next/pull/3034))
- `Tree`: 修复单独设置 `checkable` 属性的功能 @TabSpace  @uyarn ([#3034](https://github.com/Tencent/tdesign-vue-next/pull/3034))
- `Table`: 修复启用 `multipleSort`，非受控用法不工作([issue #3021](https://github.com/Tencent/tdesign-vue-next/issues/3021)) @ngyyuusora ([#3024](https://github.com/Tencent/tdesign-vue-next/pull/3024))
- `Select`: 修复在多选时候的禁用状态 @uyarn ([#3054](https://github.com/Tencent/tdesign-vue-next/pull/3054))
- `Calendar`: 修复自定义日期的实际选择范围与定义不符([issue #3035](https://github.com/Tencent/tdesign-vue-next/issues/3035)) @imp2002 ([#3049](https://github.com/Tencent/tdesign-vue-next/pull/3049))
- `TagInput`: 修复前置图标的样式缺陷 @uyarn ([#3058](https://github.com/Tencent/tdesign-vue-next/pull/3058))
- `SelectInput`: 修复失焦时未清空输入内容的缺陷 @uyarn ([#3058](https://github.com/Tencent/tdesign-vue-next/pull/3058))
- `Submenu`: 修复 `popup-props` 透传问题 @Kafuu-Chinocya ([#3061](https://github.com/Tencent/tdesign-vue-next/pull/3061))
- `DatePicker`:  修复 `value` 为 `null` 时的报错 @liweijie0812 ([#3053](https://github.com/Tencent/tdesign-vue-next/pull/3053))
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
- `Table`: 列配置和列宽调整场景，修复列数量由多变少时未能更新宽度问题；[issue#2951](https://github.com/Tencent/tdesign-vue-next/issues/2951) @chaishi ([#3007](https://github.com/Tencent/tdesign-vue-next/pull/3007))
- `Tabs`: 移除文档中 `onChange` 不存在的参数 @Zz-ZzzZ ([#2974](https://github.com/Tencent/tdesign-vue-next/pull/2974))
- `Dropdown`: 修复通过组合 `v-for` 和单个 item 渲染组件丢失节点的缺陷 @uyarn ([#3026](https://github.com/Tencent/tdesign-vue-next/pull/3026))
- `Pagination`: `onchage` 触发获取 `current` 是旧值 @liweijie0812 ([#3030](https://github.com/Tencent/tdesign-vue-next/pull/3030))
 
### 🚧 Others
- `Docs`: 增加英文文档站点
- `Dropdown`: 调整 `dropdown` 示例 增加 `trigger click` 用法 @uyarn ([#3026](https://github.com/Tencent/tdesign-vue-next/pull/3026))

## 🌈 1.3.8 `2023-06-20` 
### 🐞 Bug Fixes
- `ColorPicker`: 
  - 初始化为渐变模式时 支持空字符串作为初始值 @uyarn ([#2996](https://github.com/Tencent/tdesign-vue-next/pull/2996))
  - 修复 `recentColors` 等字段的类型问题 @uyarn ([#2996](https://github.com/Tencent/tdesign-vue-next/pull/2996))
  - 修复内部下拉选项未透传 `popupProps` 的缺陷 @uyarn ([#2996](https://github.com/Tencent/tdesign-vue-next/pull/2996))
- `Select`: 修复使用`tagName`作为key时控制台出现告警的问题 @uyarn ([#2980](https://github.com/Tencent/tdesign-vue-next/pull/2980))
- `Upload`: `ts` 类型修复 @kaishuige ([#2990](https://github.com/Tencent/tdesign-vue-next/pull/2990))
- `Table`: 本地数据排序，修复初始排序无效问题 @chaishi ([#2999](https://github.com/Tencent/tdesign-vue-next/pull/2999))
- `TextArea`: 修复不能响应设置 `value` 值后 autosize 自适应失效的问题 @xiaosansiji ([#3002](https://github.com/Tencent/tdesign-vue-next/pull/3002))
- `Guide`: 切换时按钮出现动画 @zhangpaopao0609 ([#2997](https://github.com/Tencent/tdesign-vue-next/pull/2997))
- `Swiper`: 修复 `navigation` 插槽失效的问题 @uyarn ([#3003](https://github.com/Tencent/tdesign-vue-next/pull/3003))
### 🚧 Others
- `Dropdown`: 新增带图标的下拉菜单示例 @aomnisz ([#2995](https://github.com/Tencent/tdesign-vue-next/pull/2995))
- `Table`: 修复文档缺失吸顶表头示例代码问题，[issue#2764](https://github.com/Tencent/tdesign-vue-next/issues/2764) @chaishi ([#2999](https://github.com/Tencent/tdesign-vue-next/pull/2999))

## 🌈 1.3.7 `2023-06-14` 
### 🚀 Features
- `Menu`: `Submenu` 新增 `popupProps` 属性，允许透传设置底层 `Popup` 弹窗属性 ([issues #347](https://github.com/Tencent/tdesign/issues/347)) @xiaosansiji ([#2963](https://github.com/Tencent/tdesign-vue-next/pull/2963))
- `Input`: 回车事件不再阻止事件冒泡 @uyarn ([#2968](https://github.com/Tencent/tdesign-vue-next/pull/2968))
### 🐞 Bug Fixes
- `Select`: 
  - 修复空字符串无法作为可选值的缺陷 @kaishuige ([#2950](https://github.com/Tencent/tdesign-vue-next/pull/2950))
  - 修复无法通过键盘回车操作选中选项及忽略已过滤选项的缺陷 @uyarn ([#2968](https://github.com/Tencent/tdesign-vue-next/pull/2968))
- `InputNumber`: 初始值为 `undefined/null`，且存在 `decimalPlaces` 时，不再进行小数点纠正  @chaishi ([#2948](https://github.com/Tencent/tdesign-vue-next/pull/2948))
- `Menu`: 修复弹出类菜单内容未对齐的问题 @xiaosansiji ([#2957](https://github.com/Tencent/tdesign-vue-next/pull/2957))
- `Drawer`: 打开抽屉后，无法直接摁 `ESC` 退出，必须先点击抽屉，才可关闭 ([issue #2947](https://github.com/Tencent/tdesign-vue-next/issues/2947)) @kaishuige ([#2958](https://github.com/Tencent/tdesign-vue-next/pull/2958))
- `Timeline`: 修复 `timeline-item` 内容不支持热更新的缺陷 ([issue #2954](https://github.com/Tencent/tdesign-vue-next/issues/2954)) @uyarn ([#2965](https://github.com/Tencent/tdesign-vue-next/pull/2965))
- `Table`: 修复在多级表头中使用筛选功能，显示异常问题([issue #2867](https://github.com/Tencent/tdesign-vue-next/issues/2867)) @youlvlv ([#2966](https://github.com/Tencent/tdesign-vue-next/pull/2966))
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
- `Radio`: 修复 `label` 无效问题 ([issue #2873](https://github.com/Tencent/tdesign-vue-next/issues/2873)) @Aicmortal ([#2919](https://github.com/Tencent/tdesign-vue-next/pull/2919))
- `Select`: 修正当 `options` 数据存在 `className` 而导致选项样式会被意外污染的问题 @PDieE ([#2920](https://github.com/Tencent/tdesign-vue-next/pull/2920))
- `ImageViewer`: 修复图片链接带有参数时，下载时文件扩展名丢失 ([issue #2935](https://github.com/Tencent/tdesign-vue-next/issues/2935)) @nined9 ([#2936](https://github.com/Tencent/tdesign-vue-next/pull/2936))
- `InputAdornment`: 修复`1.3.5`中修复空字符串导致插槽没有正常渲染的问题 @uyarn ([#2944](https://github.com/Tencent/tdesign-vue-next/pull/2944))
- `Table`: 在多级表头中使用筛选功能，无法正常反显@youlvlv ([#2943](https://github.com/Tencent/tdesign-vue-next/pull/2943))
### 🚧 Others
- `Test`: `vitest config` 分离和 `cypress` 升级 @PengYYYYY ([#2913](https://github.com/Tencent/tdesign-vue-next/pull/2913))

## 🌈 1.3.5 `2023-05-30` 
### 🚀 Features
- `TagInput`: 增加 `focus` 方法的导出([issue #2887](https://github.com/Tencent/tdesign-vue-next/issues/2887)) @coderbaozi ([#2893](https://github.com/Tencent/tdesign-vue-next/pull/2893))
- `TimePicker`: 没有选中值时不允许点击确认按钮 @uyarn ([#2898](https://github.com/Tencent/tdesign-vue-next/pull/2898))
- `Cascader`: 选项支持自定义样式 @ZekunWu ([#2878](https://github.com/Tencent/tdesign-vue-next/pull/2878))
### 🐞 Bug Fixes
- `Pagination`: 修复表格内容为空时，页码值不正常问题([issue #2882](https://github.com/Tencent/tdesign-vue-next/issues/2882)) @yanxugong ([#2886](https://github.com/Tencent/tdesign-vue-next/pull/2886))
- `Table`: 修复在多级表头中使用筛选功能，显示异常问题([issue #2867](https://github.com/Tencent/tdesign-vue-next/issues/2867)) @yanxugong ([#2892](https://github.com/Tencent/tdesign-vue-next/pull/2892))
- `Dialog`: 全屏状态下关闭 `footer`,仍然占据 `body` 高度([issue #2644](https://github.com/Tencent/tdesign-vue-next/issues/2644)) @ccccpj ([#2897](https://github.com/Tencent/tdesign-vue-next/pull/2897))
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
- `Message`: 修复同时显示多个 `Message` 时，会导致调用错误的关闭方法导致关闭错误的Message的缺陷 @qweasdzxcpkh ([#2861](https://github.com/Tencent/tdesign-vue-next/pull/2861))
- `DatePicker`: 修复单独使用面板时 `TimePicker` 无法更改问题 @coderbaozi ([#2842](https://github.com/Tencent/tdesign-vue-next/pull/2842))
- `TagInput`: 修复组件初始值异常的问题 @uyarn ([#2864](https://github.com/Tencent/tdesign-vue-next/pull/2864))
- `Textarea`: 修复 `autosize` 为 `null` 报错的问题 @uyarn ([#2864](https://github.com/Tencent/tdesign-vue-next/pull/2864))
- `RadioGroup`: 修复父元素 `width` 设置为 `100%`, 滑动块样式不会自动重新计算位置和偏移 @Julone ([#2854](https://github.com/Tencent/tdesign-vue-next/pull/2854))
### 🚧 Others
- `Image`: 交互示例 @liweijie0812 ([#2845](https://github.com/Tencent/tdesign-vue-next/pull/2845))
- `DatePicker`: 更新提示文案 @nined9 ([#2844](https://github.com/Tencent/tdesign-vue-next/pull/2844))

## 🌈 1.3.3 `2023-05-12` 
### 🚀 Features
- `ColorPicker`: 新增`size` 和 `enableMultipleGradient` API @uyarn ([#2803](https://github.com/Tencent/tdesign-vue-next/pull/2803))
- `Upload`: 组件支持 `uploadPastedFiles` 配置 ([issue #2686](https://github.com/Tencent/tdesign-vue-next/issues/2686)) @yanxugong ([#2814](https://github.com/Tencent/tdesign-vue-next/pull/2814))
- `Select`: `onChange` 事件 `context` 新增`option`参数 用于获取选中项完整内容 @uyarn ([#2831](https://github.com/Tencent/tdesign-vue-next/pull/2831))
- `Tree`:  `TreeItem` 新增`draggable`属性，允许某些节点不可拖拽 @decadef20 ([#2815](https://github.com/Tencent/tdesign-vue-next/pull/2815))
### 🐞 Bug Fixes
- `Select`: 
  - 修复 `1.3.2` 版本 控制台 warning 的异常 @uyarn ([#2809](https://github.com/Tencent/tdesign-vue-next/pull/2809))
  - 限制可选数目无效 @AuYuHui ([#2828](https://github.com/Tencent/tdesign-vue-next/pull/2828))
  - 超出最大限制后选项可点击 @Zz-ZzzZ ([#2829](https://github.com/Tencent/tdesign-vue-next/pull/2829))
  - `clearable` 时 `value` 为 `undefined` 问题 @wangyang0210 ([#2678](https://github.com/Tencent/tdesign-vue-next/pull/2678))
- `Popup`: 
  - 修复`onScrollToBottom` 在部分windows环境下无法触发的问题 @uyarn ([#2834](https://github.com/Tencent/tdesign-vue-next/pull/2834))
  - 修复调用 `popup` 组件暴露的`close()`时报错([issue #2835](https://github.com/Tencent/tdesign-vue-next/issues/2835)) @Zz-ZzzZ ([#2838](https://github.com/Tencent/tdesign-vue-next/pull/2838))
- `Table`: 开启省略号 `ellipsis` 和虚拟滚动后，快速滚动控制台报读取 `null` 的属性异常 ([issue #2796](https://github.com/Tencent/tdesign-vue-next/issues/2796)) @nined9 ([#2799](https://github.com/Tencent/tdesign-vue-next/pull/2799))
- `Image`:  修复 `nuxt3` 环境下 `onload` 无效 @liweijie0812 ([#2840](https://github.com/Tencent/tdesign-vue-next/pull/2840))
- `Tree`: 修复展开操作的 `demo` 中无法切换数据的问题 @palmcivet ([#2806](https://github.com/Tencent/tdesign-vue-next/pull/2806))

## 🌈 1.3.2 `2023-04-28` 
### 🚀 Features
- `Select`: 支持`panelTopContent`在虚拟滚动等需要滚动下拉框场景的使用 具体使用方式请看示例 @uyarn ([#2777](https://github.com/Tencent/tdesign-vue-next/pull/2777))
### 🐞 Bug Fixes

- `DatePicker`: 
  - 修复第二次点击面板关闭异常问题 @honkinglin ([#2781](https://github.com/Tencent/tdesign-vue-next/pull/2781))
  - 修复 `valueType` 的 `validator` 校验错误([issue #2755](https://github.com/Tencent/tdesign-vue-next/issues/2755)) @nined9 ([#2757](https://github.com/Tencent/tdesign-vue-next/pull/2757))
- `Select`:
  -  修复 `defaultValue` 默认值异常的问题 @uyarn ([#2777](https://github.com/Tencent/tdesign-vue-next/pull/2777))
  - 修复单选模式 `inputClass` 未生效的问题 @uyarn ([#2777](https://github.com/Tencent/tdesign-vue-next/pull/2777))
- `Table`: 
  - 修复取消表尾吸底时 `requestAnimationFrame` 在 `Unmounted` 之后仍执行了一次导致的异常问题([issue #2744](https://github.com/Tencent/tdesign-vue-next/issues/2744)) @nined9 ([#2745](https://github.com/Tencent/tdesign-vue-next/pull/2745))
  -  修复设置固定行位置信息时出现tr不存在情况时导致的异常报错([issue #2759](https://github.com/Tencent/tdesign-vue-next/issues/2759)) @nined9 ([#2760](https://github.com/Tencent/tdesign-vue-next/pull/2760))
- `Pagination`: 修复切换语言时未重新渲染内容的缺陷 @uyarn ([#2775](https://github.com/Tencent/tdesign-vue-next/pull/2775))
- `Link`: 表单设置禁用不生效 @liweijie0812 ([#2783](https://github.com/Tencent/tdesign-vue-next/pull/2783))
- `Input`: 修复 `input` 组件 `type = hidden` 时，组件边框依然被显示的问题  @PengYYYYY ([#2776](https://github.com/Tencent/tdesign-vue-next/pull/2776))

### 🚧 Others
- `Datepicker`: 修复示例代码报错 @honkinglin ([#2761](https://github.com/Tencent/tdesign-vue-next/pull/2761))
## 🌈 1.3.1 `2023-04-21` 

### 🚀 Features

- `Theme`:  主题生成器升级到 `v1` 版本 @uyarn ([#2747](https://github.com/Tencent/tdesign-vue-next/pull/2747))

### 🐞 Bug Fixes
- `Popup`: 修复触发元素隐藏时，`popper` 仍显示到页面左上角的问题([#2697](https://github.com/Tencent/tdesign-vue-next/issues/2697)) @nined9 ([#2713](https://github.com/Tencent/tdesign-vue-next/pull/2713))
- `Select`: 修复多选选项点击触发多次导致虚拟滚动切换普通模式时无法选中的问题 @uyarn ([#2734](https://github.com/Tencent/tdesign-vue-next/pull/2734))
- `image`: 修复 `SSR` 环境下的 `loading` 问题 @liweijie0812 ([#2738](https://github.com/Tencent/tdesign-vue-next/pull/2738))
- `Datepicker`: 支持 `onPresetClick` 事件 @honkinglin ([#2743](https://github.com/Tencent/tdesign-vue-next/pull/2743))
- `StickyTool`: 修复单独引入 `StickyItem` 没有正常渲染的问题 @uyarn ([#2751](https://github.com/Tencent/tdesign-vue-next/pull/2751))
- `ColorPicker`: 修复渐变模式下 `hex` 和 `rgb` 模式下输入无法修改渐变点颜色的缺陷 @uyarn ([#2751](https://github.com/Tencent/tdesign-vue-next/pull/2751))
- `DatePicker`: 修复 `valueType` 参数校验错误([issue #2719](https://github.com/Tencent/tdesign-vue-next/issues/2719))
- `icon`: 修复 `manifest` 统一入口导出 `esm` 模块，文档为及时更新的问题 @Layouwen ([#2739](https://github.com/Tencent/tdesign-vue-next/pull/2739))

### 🚧 Others
- `Select`:  `usage  bordered` 属性废弃移除 @liweijie0812 ([#2723](https://github.com/Tencent/tdesign-vue-next/pull/2723))
- `Readme`: 修复贡献文档链接 @wangyang0210 ([#2729](https://github.com/Tencent/tdesign-vue-next/pull/2729))
- `Nuxt3`: 增加 `nuxt3` 使用文档 @liweijie0812 ([#2726](https://github.com/Tencent/tdesign-vue-next/pull/2726))

## 🌈 1.3.0 `2023-04-13` 
### 🚀 Features
- `BackTop`: 新增 `BackTop` 组件 @shinyina ([#2665](https://github.com/Tencent/tdesign-vue-next/pull/2665))
- `StickyTool`:  新增 `StickyTool` 组件 @ZekunWu ([#2517](https://github.com/Tencent/tdesign-vue-next/pull/2517))
- `RadioGroup`: `options.value` 支持 `boolean` @liweijie0812 ([#2659](https://github.com/Tencent/tdesign-vue-next/pull/2659))
- `Local`: 增加繁体字配置包 @chaishi ([#2685](https://github.com/Tencent/tdesign-vue-next/pull/2685))
- `Select`:  `value` 支持 `boolean` @liweijie0812 ([#2694](https://github.com/Tencent/tdesign-vue-next/pull/2694))

### 🐞 Bug Fixes
- `Table`: 
  - 列宽调整功能，修复即使 `resizable=false` 时，也会显示拖拽调整列宽图标和辅助线问题，[issue#2699](https://github.com/Tencent/tdesign-vue-next/issues/2699) @chaishi ([#2715](https://github.com/Tencent/tdesign-vue-next/pull/2715))
  - 列宽调整功能，修复在拖拽任意列宽使表格横向滚动条消失之后列宽无法正常调整的问题，即支持 `resize.minWidth` @chaishi ([#2715](https://github.com/Tencent/tdesign-vue-next/pull/2715))
  - : 列宽调整功能，修复开启多级表头时点击子表头后控制台报错的问题 @chaishi ([#2715](https://github.com/Tencent/tdesign-vue-next/pull/2715))
- `Select`: 
  - 修复存在重复 `value` 的 `option` 变化时没有更新label的问题 @uyarn ([#2687](https://github.com/Tencent/tdesign-vue-next/pull/2687))
  - 修复多选选项边缘区域点击不触发选中的缺陷 @uyarn ([#2687](https://github.com/Tencent/tdesign-vue-next/pull/2687))
  - `RadioGroup`: 选项宽度不能动态更新，导致样式错误，文字溢出 @ZTH520 ([#2681](https://github.com/Tencent/tdesign-vue-next/pull/2681))
- `Tooltip`: 修复当 `content` 是空字符或空插槽时，不显示提示([issue #2642](https://github.com/Tencent/tdesign-vue-next/issues/2642)) @PengYYYYY ([#2653](https://github.com/Tencent/tdesign-vue-next/pull/2653))
- `Tree`: 修复懒加载子节点时点击 `label` 会触发选中的问题 @uyarn ([#2663](https://github.com/Tencent/tdesign-vue-next/pull/2663))
- `InputAdornment`: 修复 `slot` 方式 `class` 名 缺失问题 @ccccpj ([#2656](https://github.com/Tencent/tdesign-vue-next/pull/2656))
- `InputNumber`: 修复小数位操作以 `0` 结尾时部分边界场景异常的问题 @uyarn ([#2668](https://github.com/Tencent/tdesign-vue-next/pull/2668))
- `TreeSelect`: 修复绑定的 `data` 数据更新后,组件不会重新渲染([issue #2682](https://github.com/Tencent/tdesign-vue-next/issues/2682)) @algerkong ([#2683](https://github.com/Tencent/tdesign-vue-next/pull/2683))
- `DatePicker`: 修复 `DatePicker` 的 `prefixIcon` 未传递时仍透传了 `prefixIcon` 函数导致产生非预期渲染 @dexterBo ([#2658](https://github.com/Tencent/tdesign-vue-next/pull/2658))
- `Dropdown`: 修复下拉菜单配置 `template` 的 `content` 或 `prefixIcon` 插槽时未进行渲染的问题([issues #2688](https://github.com/Tencent/tdesign-vue-next/issues/2688)) @nined9 ([#2696](https://github.com/Tencent/tdesign-vue-next/pull/2696))
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
- `Table`: 
  - 修复 `SSR` 环境 `document` 报错问题 @chaishi ([#2623](https://github.com/Tencent/tdesign-vue-next/pull/2623))
  - 修复组件实例方法类型问题 @chaishi ([#2636](https://github.com/Tencent/tdesign-vue-next/pull/2636))
- `Guide`:  解决 `guide popup` 提示在重叠情形下不更新 ([issue #2536 ](https://github.com/Tencent/tdesign-vue-next/issues/2536)) @zhangpaopao0609 ([#2605](https://github.com/Tencent/tdesign-vue-next/pull/2605))
- `Swiper`: 修改轮播切换问题 @btea ([#2614](https://github.com/Tencent/tdesign-vue-next/pull/2614))
- `Popup`: 修复叠加使用报错 @ikeq ([#2617](https://github.com/Tencent/tdesign-vue-next/pull/2617))
- `Select`: 修复使用 `filterable` 和自定义下拉选项时，下拉列表展示异常 ([issue #2593](https://github.com/Tencent/tdesign-vue-next/issues/2593)) @Lmmmmmm-bb ([#2619](https://github.com/Tencent/tdesign-vue-next/pull/2619))
- `TimePicker`: 修复使用`px to rem`插件时滚动逐渐错位的问题 @SadWood ([#2627](https://github.com/Tencent/tdesign-vue-next/pull/2627))
- `Loading`:  修复使用 `loadingplugin`，会没有 `loading` 效果的问题 @beerui ([#2628](https://github.com/Tencent/tdesign-vue-next/pull/2628))
- `TagInput`: 修复删除事件和中文输入事件问题 @chiyu1996 ([#2631](https://github.com/Tencent/tdesign-vue-next/pull/2631))
- `DatePicker`: 修复 `format` 为 `12` 小时制时功能异常的问题 @uyarn ([#2632](https://github.com/Tencent/tdesign-vue-next/pull/2632))
- `Alert`: 修复关闭按钮为文字时的居中和字体大小问题 @Wen1kang  @uyarn ([#2632](https://github.com/Tencent/tdesign-vue-next/pull/2632))
- `InputNumber`: 修复有 `max` 值时，清空数值，`blur` 会自动填充 `max` 的值 @Lmmmmmm-bb ([#2620](https://github.com/Tencent/tdesign-vue-next/pull/2620))
- `Menu`: 修复多级菜单折叠菜单后，第一次顺着展开悬浮多级子菜单时会全部消失  @Ericleungs ([#2634](https://github.com/Tencent/tdesign-vue-next/pull/2634))

### 🚧 Others
- `Form`: 更新 `Form` 文档，修正 ` telnumber rule`  描述 @xiaosansiji ([#2606](https://github.com/Tencent/tdesign-vue-next/pull/2606))
- `Table`: 更新组件实例方法文档 @chaishi ([#2623](https://github.com/Tencent/tdesign-vue-next/pull/2623))

## 🌈 1.2.2 `2023-03-22` 
### 🚀 Features
- `Table`: 
  - 支持使用 `filterIcon` 支持不同列显示不同的筛选图标，[tdesign-vue#2088](https://github.com/Tencent/tdesign-vue/issues/2088) @chaishi ([#2590](https://github.com/Tencent/tdesign-vue-next/pull/2590))
  - 支持横向滚动到固定列，[tdesign-vue#1992](https://github.com/Tencent/tdesign-vue/issues/1992) @chaishi ([#2590](https://github.com/Tencent/tdesign-vue-next/pull/2590))
- `Tabs`: 标签页选项卡可配置禁止拖拽 @liweijie0812 ([#2457](https://github.com/Tencent/tdesign-vue-next/pull/2457))
- `TimePicker`: 支持`size`属性 @uyarn ([#2597](https://github.com/Tencent/tdesign-vue-next/pull/2597))
### 🐞 Bug Fixes
- `Table`: 
  - 单行选中功能，修复 `allowUncheck: false` 无效问题，[issue#2561](https://github.com/Tencent/tdesign-vue-next/issues/2561) @chaishi ([#2590](https://github.com/Tencent/tdesign-vue-next/pull/2590))
  - 修复 `lazyload` 重置 `bug` @yanxugong ([#2580](https://github.com/Tencent/tdesign-vue-next/pull/2580))
  -  修复 `getSortIcon is not a function` 在webpack中的报错 ([issue#2538](https://github.com/Tencent/tdesign-vue-next/issues/2538)) @chaishi ([#2592](https://github.com/Tencent/tdesign-vue-next/pull/2592))
- `TreeSelect`: 
  - 修复树选择组件，在表格组件里面时，显示两个 `Tips` 问题 @chaishi ([#2590](https://github.com/Tencent/tdesign-vue-next/pull/2590))
  - 修复`1.2.0`版本后初始值为空时报错的问题 @uyarn ([#2597](https://github.com/Tencent/tdesign-vue-next/pull/2597))
- `Dropdown`: 支持`v-for`渲染下拉选项，支持`v-for`与普通插槽混用 @uyarn ([#2594](https://github.com/Tencent/tdesign-vue-next/pull/2594))
- `Menu`: 修复重新展开后，`normal` 模式的子菜单就是空的。([issue #2557](https://github.com/Tencent/tdesign-vue-next/issues/2557)) @Ericleungs ([#2589](https://github.com/Tencent/tdesign-vue-next/pull/2589))

## 🌈 1.2.1 `2023-03-17` 
### 🐞 Bug Fixes
- `Form`: 修复复杂数据结构中使用 `scrollToFirstError` 属性无法提交问题([issue #2562](https://github.com/Tencent/tdesign-vue-next/issues/2562)) @k1nz ([#2572](https://github.com/Tencent/tdesign-vue-next/pull/2572))
- `Dropdown`: 修复事件回调未定义导致控制台报错的问题 @uyarn ([#2570](https://github.com/Tencent/tdesign-vue-next/pull/2570))
- `Nuxt`: 修复在 `tooltip` 和 `pagination` 组件在 `Nuxt3` 报错([issue #2568](https://github.com/Tencent/tdesign-vue-next/issues/2568)) @PengYYYYY ([#2575](https://github.com/Tencent/tdesign-vue-next/pull/2575))
- `ConfigProvider`:  修复组件会在最外层增加一的空的 `div` 标签([issue #2558](https://github.com/Tencent/tdesign-vue-next/issues/2558)) ([#2573](https://github.com/Tencent/tdesign-vue-next/pull/2573))
- `Popup`: 优化 `popup` 嵌套逻辑 @ikeq ([#2514](https://github.com/Tencent/tdesign-vue-next/pull/2514))
## 🌈 1.2.0 `2023-03-15` 
### 🚀 Features
- `Table`: 
  - 列宽调整功能，更新列宽调整规则为：列宽较小没有超出时，列宽调整表现为当前列和相邻列的变化；列宽超出存在横向滚动条时，列宽调整仅影响当前列和列总宽。[issue#2511](https://github.com/Tencent/tdesign-vue-next/issues/2511) @chaishi ([#2515](https://github.com/Tencent/tdesign-vue-next/pull/2515))
  - 可编辑单元格(行)功能，支持编辑模式下，数据变化时实时校验，`col.edit.validateTrigger`， [issue#2445](https://github.com/Tencent/tdesign-vue-next/issues/2445) @chaishi ([#2515](https://github.com/Tencent/tdesign-vue-next/pull/2515))
  - 只有固定列存在时，才会出现类名 `.t-table__content--scrollable-to-left` 和 `.t-table__content--scrollable-to-right` @chaishi ([#2515](https://github.com/Tencent/tdesign-vue-next/pull/2515))
  - 拖拽功能，支持禁用固定列不可拖拽调整顺序，[issue#2333](https://github.com/Tencent/tdesign-vue-next/issues/2333) @chaishi ([#2515](https://github.com/Tencent/tdesign-vue-next/pull/2515))
- `DatePicker`: 
  - 支持 `size` 属性 ([issue #2192](https://github.com/Tencent/tdesign-vue-next/issues/2192)) @honkinglin ([#2553](https://github.com/Tencent/tdesign-vue-next/pull/2553))
  - 支持 `defaultTime` @honkinglin ([#2525](https://github.com/Tencent/tdesign-vue-next/pull/2525))
- `InputNumber`: 支持千分位粘贴 @uyarn ([#2563](https://github.com/Tencent/tdesign-vue-next/pull/2563))
- `Upload`: `theme=file-input` 文件为空时，悬浮时不显示清除按钮 @chaishi ([#2515](https://github.com/Tencent/tdesign-vue-next/pull/2515))

### 🐞 Bug Fixes
- `Table`: 
  - 列宽调整功能，修复 `Dialog` 中列宽调整问题，[issue#2359](https://github.com/Tencent/tdesign-vue-next/issues/2359) @chaishi ([#2515](https://github.com/Tencent/tdesign-vue-next/pull/2515))
  -  `EnhancedTable` 筛选功能，修复 `shallowRef` 告警问题，[#issues](https://github.com/Tencent/tdesign-vue-next/issues/2232) @chaishi ([#2515](https://github.com/Tencent/tdesign-vue-next/pull/2515))
  - 可编辑单元格(行)功能，修复输入框回车会触发 Form 表单的 submit 事件问题，[issue#2445](https://github.com/Tencent/tdesign-vue-next/issues/2445) @chaishi ([#2515](https://github.com/Tencent/tdesign-vue-next/pull/2515))
  - 可编辑单元格，修复下拉选择类组件 `abortEditOnEvent` 没有包含 `onChange` 时，依然会在数据变化时触发退出编辑态问题 @chaishi ([#2515](https://github.com/Tencent/tdesign-vue-next/pull/2515))
- `Dialog`: 
  - 修复在 `modeless` 下，同时设置 `draggable` 和 `destroyOnClose` 在关闭弹窗时会报错([issue #2521](https://github.com/Tencent/tdesign-vue-next/issues/2521)) @PengYYYYY ([#2550](https://github.com/Tencent/tdesign-vue-next/pull/2550))
  - 修复弹窗 `confirm-on-enter` 事件在输入法呼出输入时依旧会触发([issue #2412](https://github.com/Tencent/tdesign-vue-next/issues/2412)) @PengYYYYY ([#2550](https://github.com/Tencent/tdesign-vue-next/pull/2550))
- `Textarea`: 
  - 修复设置最大长度后，无法调整高度问题，[issue#2540](https://github.com/Tencent/tdesign-vue-next/issues/2540) @chaishi ([#2515](https://github.com/Tencent/tdesign-vue-next/pull/2515))
  - 修复获取焦点后的样式问题[issue#2509](https://github.com/Tencent/tdesign-vue-next/issues/2509) @tiny-dust ([#1176](https://github.com/Tencenttdesign-common/pull/1176))
- `Select`: 修复切换虚拟滚动时没有触发滚动监听导致滚动未更新数据的缺陷 @uyarn ([#2506](https://github.com/Tencent/tdesign-vue-next/pull/2506))
- `Badge`: 修复徽标错误行为 @Aicmortal ([#2504](https://github.com/Tencent/tdesign-vue-next/pull/2504))
- `DatePicker`: 修复月份为 `0` 时展示当前月份问题 @honkinglin ([#2503](https://github.com/Tencent/tdesign-vue-next/pull/2503))
- `Upload`: 修复 `method` 无效问题 @chaishi ([#2515](https://github.com/Tencent/tdesign-vue-next/pull/2515))
- `Dropdown`: 修复使用`popupProps.on-visible-change`写法导致组件异常的问题 @uyarn ([#2545](https://github.com/Tencent/tdesign-vue-next/pull/2545))
- `Progress`: 修复 `trackColor` 配置色值没有效果([issue #2537](https://github.com/Tencent/tdesign-vue-next/issues/2537)) @PengYYYYY ([#2550](https://github.com/Tencent/tdesign-vue-next/pull/2550))
- `SelectInput`: 修复 SelectInput `valueDisplay` 和 `label` 插槽位置错误的问题 @uyarn ([#2549](https://github.com/Tencent/tdesign-vue-next/pull/2549))
- `DateRangePickerPanel`: 组件在处理年份的时候没有实际取到值，导致无论是不是在同一年，都会去找到两个日期项目中最小的/最大的 @Ericleungs ([#2555](https://github.com/Tencent/tdesign-vue-next/pull/2555))
- `Popconfirm`: 修复 `visible-change` 事件中的的 `context.trigger` 在 `confirm` 事件中不携带标识 ([issue #2516](https://github.com/Tencent/tdesign-vue-next/issues/2516)) @PengYYYYY ([#2560](https://github.com/Tencent/tdesign-vue-next/pull/2560))
### 🚧 Others
- `Table`: 修复文档 `rowClassName` 描述问题，[issue#2337](https://github.com/Tencent/tdesign-vue-next/issues/2337) @chaishi ([#2515](https://github.com/Tencent/tdesign-vue-next/pull/2515))
- `Watermark`: 修复 `live demo` @uyarn ([#2520](https://github.com/Tencent/tdesign-vue-next/pull/2520))

## 🌈 1.1.1 `2023-03-02` 
### 🐞 Bug Fixes
- `Popup`: 修复 `popup` 的 `trigger` 为空错误 @Aicmortal ([#2499](https://github.com/Tencent/tdesign-vue-next/pull/2499))
- `Select`: 修复远程搜索切换正常渲染与虚拟滚动的问题 @uyarn ([#2496](https://github.com/Tencent/tdesign-vue-next/pull/2496))
- `Textarea`: 修复 `1.1.0` 版本的 `textarea` 样式问题 @uyarn ([#2496](https://github.com/Tencent/tdesign-vue-next/pull/2496))
## 🌈 1.1.0 `2023-03-02` 
### 🚀 Features
- `Image`: 
  - 图片组件支持特殊格式的地址 `.avif` 和 `.webp` @chaishi ([#2463](https://github.com/Tencent/tdesign-vue-next/pull/2463))
  - 新增图片全局配置 `globalConfig.image.replaceImageSrc`，用于统一替换图片地址 @chaishi ([#2463](https://github.com/Tencent/tdesign-vue-next/pull/2463))
- `SelectInput`: `collapsedItems.count`  含义修正为折叠的标签数量 @chaishi ([#2447](https://github.com/Tencent/tdesign-vue-next/pull/2447))
- `Types`: 新增公共 `types` 文件的导出 @PengYYYYY ([#2490](https://github.com/Tencent/tdesign-vue-next/pull/2490))
### 🐞 Bug Fixes
- `Dialog`: 
  - 修复 `config-provider` 下配置的 `confirmBtnTheme` 失效的问题 @uyarn ([#2474](https://github.com/Tencent/tdesign-vue-next/pull/2474))
  - 修复 `dialog` 打开后的焦点获取问题([issue #2466](https://github.com/Tencent/tdesign-vue-next/issues/2466)) @PengYYYYY ([#2491](https://github.com/Tencent/tdesign-vue-next/pull/2491))
- `Loading`: 修复属性透传问题 @Aicmortal ([#2442](https://github.com/Tencent/tdesign-vue-next/pull/2442))
- `Upload`: 修复禁用态的表单对 `upload` 组件无效问题 @yusongh ([#2472](https://github.com/Tencent/tdesign-vue-next/pull/2472))
- `Textarea`: 解决 `textarea` 字符限制文案遮挡文本内容的问题 @duanbaosheng ([#2462](https://github.com/Tencent/tdesign-vue-next/pull/2462))
- `Menu`: `menu-item` 设置href属性后的样式问题 @tiny-dust ([#2458](https://github.com/Tencent/tdesign-vue-next/pull/2458))
- `Teleport`: 修复使用了 `Teleport` 的组件无法挂载到当前组件内元素节点

### 🚧 Others
- `Space`: 输出完整的测试用例 @chaishi ([#2446](https://github.com/Tencent/tdesign-vue-next/pull/2446))
- `Site`: 修复测试徽章无数据展示 @PengYYYYY ([#2490](https://github.com/Tencent/tdesign-vue-next/pull/2490))
## 🌈 1.0.9 `2023-02-21` 
### 🚀 Features
- `Upload`: 
  - 可拖拽的单图片/单文件上传，支持使用 `fileListDisplay` 自定义文件信息内容 @chaishi ([#2418](https://github.com/Tencent/tdesign-vue-next/pull/2418))
  - 一个请求上传多个文件时，去除重复参数 `file`，保留 `file[0]` `file[1]` 即可，同时新增参数 `length` 表示本次上传文件的数量 @chaishi ([#2418](https://github.com/Tencent/tdesign-vue-next/pull/2418))
  - `onError/onSuccess/onProgress` 添加关键事件参数 `XMLHttpRequest`，用于获取上传请求更详细的信息 @chaishi ([#2418](https://github.com/Tencent/tdesign-vue-next/pull/2418))
  - `tips` 支持插槽，支持函数 @chaishi ([#2418](https://github.com/Tencent/tdesign-vue-next/pull/2418))
  - 新增上传请求超时也会执行 `onError` @chaishi ([#2418](https://github.com/Tencent/tdesign-vue-next/pull/2418))
  - 支持事件 `onCancelUpload` @chaishi ([#2418](https://github.com/Tencent/tdesign-vue-next/pull/2418))
  - 支持 `mockProgressDuration`，用于设置模拟上传进度间隔时间，大文件大一点，小文件小一点 @chaishi ([#2418](https://github.com/Tencent/tdesign-vue-next/pull/2418))
- `Dialog`: 确认按钮主题不再跟随 `Dialog` 主题变动 @xiaosansiji ([#2434](https://github.com/Tencent/tdesign-vue-next/pull/2434))

### 🐞 Bug Fixes
- `Upload`: 
  - 修复 `onSelectChange` 事件第二个参数 `currentSelectedFiles` 不正确问题 @chaishi ([#2418](https://github.com/Tencent/tdesign-vue-next/pull/2418))
  - 修复 `autoUpload=false` 场景下，即使 `beforeUpload` 函数全部返回 `false` 依然会触发 `onChange` 事件问题 @chaishi ([#2418](https://github.com/Tencent/tdesign-vue-next/pull/2418))
  - 修复 `data` 为函数时，参数为空问题，补充参数 `files` @chaishi ([#2418](https://github.com/Tencent/tdesign-vue-next/pull/2418))
  - 修复 `theme=image-flow` 时，无法使用 `fileListDisplay` 自定义图片列表问题 @chaishi ([#2418](https://github.com/Tencent/tdesign-vue-next/pull/2418))
  - 修复文件数量超出 `max` 时，且没有可继续上传的文件，依然触发 change 事件问题 @chaishi ([#2418](https://github.com/Tencent/tdesign-vue-next/pull/2418))
  - 修复 `theme=file` 或者 `theme=image-flow` 时，`abridgeName` 无效问题 @chaishi ([#2418](https://github.com/Tencent/tdesign-vue-next/pull/2418))
  - 修复 `theme=image-flow` 且 `autoUpload=false` 时，change 事件第一个参数丢失 file.url 问题 @chaishi ([#2418](https://github.com/Tencent/tdesign-vue-next/pull/2418))
  - 修复非自动上传场景 `change` 事件第二个参数 `file` 值并非当前文件问题 @chaishi ([#2418](https://github.com/Tencent/tdesign-vue-next/pull/2418))
  - 修复各类插槽无效和事件无效问题 @chaishi ([#2418](https://github.com/Tencent/tdesign-vue-next/pull/2418))
- `Nuxt`: 修复 `nuxt` 下的编译报错 @PengYYYYY ([#2417](https://github.com/Tencent/tdesign-vue-next/pull/2417))
- `Dialog`:  修复 `class` 属性出现警告 @Aicmortal ([#2424](https://github.com/Tencent/tdesign-vue-next/pull/2424))
- `Swiper`: 修复 `swiper` 组件 `v-model:current`, `current` 的值不随着轮播变化。([issue #2416](https://github.com/Tencent/tdesign-vue-next/issues/2416)) @Zzongke ([#2427](https://github.com/Tencent/tdesign-vue-next/pull/2427))
- `SelectInput`: 修复 `SelectInput` 及基于 `SelectInput` 的输入类组件( `Select/Cascader/TreeSelect` ) 单选可输入模式下回删无法完全清空及其导致的一系列问题 @uyarn ([#2429](https://github.com/Tencent/tdesign-vue-next/pull/2429))
- `Drawer`: 修复 `drawer` 滚动条检测问题 @honkinglin ([#2438](https://github.com/Tencent/tdesign-vue-next/pull/2438))
- `Dialog`: 修复 `dialog` 滚动条检测问题 @honkinglin ([#2438](https://github.com/Tencent/tdesign-vue-next/pull/2438))

### 🚧 Others
- `Upload`: 输出完整的测试用例（135 个），平均覆盖率达 `95%+` @chaishi ([#2418](https://github.com/Tencent/tdesign-vue-next/pull/2418))
## 🌈 1.0.8 `2023-02-17` 
### 🚀 Features
- `Timeline`: 
  - 始终保持结构 `t-timeline-item__dot-content` 存在 @chaishi ([#2395](https://github.com/Tencent/tdesign-vue-next/pull/2395))
  - 支持使用插槽和属性函数 `label` 自定义时间文本 @chaishi ([#2395](https://github.com/Tencent/tdesign-vue-next/pull/2395))
- `Avatar`: 
  - `Avatar` 头像加载失败事件新增参数 `({ e: Event })`，用于获取细节信息 @chaishi ([#2404](https://github.com/Tencent/tdesign-vue-next/pull/2404))
  - `Avatar` 新增 `content/default`，以便通过 `JSX` 函数自定义内容 @chaishi ([#2404](https://github.com/Tencent/tdesign-vue-next/pull/2404))
  - `Avatar` 新增 `imageProps`，用于透传全部 `Image` 组件属性 @chaishi ([#2404](https://github.com/Tencent/tdesign-vue-next/pull/2404))
  -  `AvatarGroup` 超出省略的最后一个 `Avatar` 添加类名 `.t-avatar__collapse`，用于区分其他元素 @chaishi ([#2404](https://github.com/Tencent/tdesign-vue-next/pull/2404))

### 🐞 Bug Fixes
- `Drawer`: 修复 `Plugin` 方式调用 `Dialog` 时,更新 `className` 会删除组件自身类名 @Aicmortal ([#2386](https://github.com/Tencent/tdesign-vue-next/pull/2386))
- `Timeline`: 修复 `TimelineItem.labelAlign` 优先级没有高于 `Timeline.labelAlign` 问题 @chaishi ([#2395](https://github.com/Tencent/tdesign-vue-next/pull/2395))
- `Cascader`: 修复 `options` 变化时未重新渲染 ([issue #2248](https://github.com/Tencent/tdesign-vue-next/issues/2248))([issue #2063](https://github.com/Tencent/tdesign-vue-next/issues/2063)) @PengYYYYY ([#2399](https://github.com/Tencent/tdesign-vue-next/pull/2399))
- `Input`: 修复值为 `null` 时，长度计算不正确问题，[issue#2401](https://github.com/Tencent/tdesign-vue-next/issues/2401) @chaishi ([#2402](https://github.com/Tencent/tdesign-vue-next/pull/2402))
- `RangeInput`: 修复图标大小展示问题 ([issue #2186](https://github.com/Tencent/tdesign-vue-next/issues/2186)) @honkinglin ([#2406](https://github.com/Tencent/tdesign-vue-next/pull/2406))
- `TagInput`: 修复 `TagInput` 增加 `blur` 行为导致 `Select/Cascader/TreeSelect` 无法过滤多选的问题 @uyarn ([#2407](https://github.com/Tencent/tdesign-vue-next/pull/2407))
- `Slider`: 修复快速滑动滑块时 `tooltip` 不跟手 ([issue #2369](https://github.com/Tencent/tdesign-vue-next/issues/2369)) @AuYuHui ([#2408](https://github.com/Tencent/tdesign-vue-next/pull/2408))
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
- `TagInput`: 
  - 失去焦点时，清空没有成为标签的文本内容，且 `onBlur` 的事件参数 `inputValue` 更为 `` @chaishi ([#2357](https://github.com/Tencent/tdesign-vue-next/pull/2357))
  - 支持插槽 `suffix` @chaishi ([#2357](https://github.com/Tencent/tdesign-vue-next/pull/2357))
  - 删除标签时机变化，由 `onKeyup` 更为 `onKeydown`，以便更快速地响应 @chaishi ([#2357](https://github.com/Tencent/tdesign-vue-next/pull/2357))
  - 支持 `onClick` 事件 @chaishi ([#2357](https://github.com/Tencent/tdesign-vue-next/pull/2357))
- `Guide`: 
  - 支持 `title/content/body/highlightContent` 等内容通过插槽自定义，同时支持属性函数 @chaishi ([#2363](https://github.com/Tencent/tdesign-vue-next/pull/2363))
  - 支持 `popupProps.overlayInnerClassName` 定义步骤浮层内容 @chaishi ([#2363](https://github.com/Tencent/tdesign-vue-next/pull/2363))
- `Select`: 
  - 新增 `suffix`、`suffixIcon`、`autofocus` 等API @uyarn ([#2388](https://github.com/Tencent/tdesign-vue-next/pull/2388))
  - `Option` 新增 `title` 支持自定义 `hover` 展示内容 @uyarn ([#2388](https://github.com/Tencent/tdesign-vue-next/pull/2388))
- `Dropdown`: `submenu` 层级结构调整，增加一层`t-dropdown__submenu-wrapper` @uyarn ([#2370](https://github.com/Tencent/tdesign-vue-next/pull/2370))
- `Form`: 支持导出 `FormRules` 数据类型 @chaishi ([#2378](https://github.com/Tencent/tdesign-vue-next/pull/2378))
- `Popup`: 新增 `popperOptions` 及 `onScrollToBottom` 事件 @uyarn ([#2388](https://github.com/Tencent/tdesign-vue-next/pull/2388))
### 🐞 Bug Fixes
- `TagInput`: 修复输入内容为空时，未能触发 onEnter 事件问题 @chaishi ([#2357](https://github.com/Tencent/tdesign-vue-next/pull/2357))
- `Dropdown`: 修复多层超长菜单的位置异常问题 @uyarn ([#2370](https://github.com/Tencent/tdesign-vue-next/pull/2370))
- `SelectInput`: 修复 `defaultInputValue` 无效问题，[issue#2372](https://github.com/Tencent/tdesign-vue-next/issues/2372) @chaishi ([#2373](https://github.com/Tencent/tdesign-vue-next/pull/2373))
- `Table`: 修复 `column.edit.on.onChange` 无效报错问题，[issue#2362](https://github.com/Tencent/tdesign-vue-next/issues/2362) @chaishi ([#2374](https://github.com/Tencent/tdesign-vue-next/pull/2374))
- `Guide`: 优化自定义消息框时容器的样式 @zhangpaopao0609 ([#2371](https://github.com/Tencent/tdesign-vue-next/pull/2371))
- `Anchor`: 修复在组件卸载时候的意外事件注册 @tjstyx ([#2387](https://github.com/Tencent/tdesign-vue-next/pull/2387))
- `Tree`: 修复树拖拽时候鼠标预期行为样式([issue #1864](https://github.com/Tencent/tdesign-vue-next/issues/1864)) @PengYYYYY ([#2390](https://github.com/Tencent/tdesign-vue-next/pull/2390))
### 🚧 Others
- `TagInput`: 输出完整的测试用例 @chaishi ([#2357](https://github.com/Tencent/tdesign-vue-next/pull/2357))
- `Guide`: 输出完整的测试用例 @chaishi ([#2363](https://github.com/Tencent/tdesign-vue-next/pull/2363))
- `Select`: 新增滚动加载选项示例代码 @uyarn ([#2388](https://github.com/Tencent/tdesign-vue-next/pull/2388))
- `Lint`: 增加 `lint` 缓存 @Simon-He95 ([#2376](https://github.com/Tencent/tdesign-vue-next/pull/2376))
## 🌈 1.0.6 `2023-02-07` 
### 🚀 Features
- `Image`: 
  - 组件内部的中文支持全局语言配置，可以配置为英文、日文、任意文字 @chaishi ([#2342](https://github.com/Tencent/tdesign-vue-next/pull/2342))
  - `onLoad/onError` 等事件新增事件参数 `{ e: Event }` @chaishi ([#2342](https://github.com/Tencent/tdesign-vue-next/pull/2342))
  - 支持 `placeholder` 使用插槽或函数自定义图片占位内容 @chaishi ([#2342](https://github.com/Tencent/tdesign-vue-next/pull/2342))
  - 支持 `loading`使用插槽或函数自定义图片加载中状态内容 @chaishi ([#2342](https://github.com/Tencent/tdesign-vue-next/pull/2342))
  - 支持 `error` 使用插槽或函数自定义图片加载失败内容 @chaishi ([#2342](https://github.com/Tencent/tdesign-vue-next/pull/2342))
### 🐞 Bug Fixes
- `Tag`: 
  - 修复禁用状态依然显示的关闭图标问题 @chaishi ([#2349](https://github.com/Tencent/tdesign-vue-next/pull/2349))
  - 修复超出省略功能缺少 `title` 属性问题 @chaishi ([#2349](https://github.com/Tencent/tdesign-vue-next/pull/2349))
  - 修复 `maxWidth` 不支持带单位的宽度问题 @chaishi ([#2349](https://github.com/Tencent/tdesign-vue-next/pull/2349))
  - 去除 Tag 组件 `.t-tag--text` 元素的多余类名，以及非必要类名 `.t-size-m` @chaishi ([#2349](https://github.com/Tencent/tdesign-vue-next/pull/2349))
- `Table`: 
  - 修复插槽 `cell-empty-content` 无效问题（`cellEmptyContent` 一直有效） @chaishi ([#2319](https://github.com/Tencent/tdesign-vue-next/pull/2319))
  - 修复`headerAffixedTop`、`footerAffixedBottom`、`filterValue`的类型错误 @uyarn ([#2352](https://github.com/Tencent/tdesign-vue-next/pull/2352))
 - `Form`: 
    - 修复 `FormItem.name` 和 `FormItem.rules` 变化时无法触发校验问题 @chaishi ([#2346](https://github.com/Tencent/tdesign-vue-next/pull/2346))
    -  修复表单类组件value语法糖可能存在的类型问题 @uyarn ([#2352](https://github.com/Tencent/tdesign-vue-next/pull/2352))
- `Image`: 
  - 修复 `image` 组件 `error` ，`overlayContent ` 字段类型错误 @PengYYYYY ([#2328](https://github.com/Tencent/tdesign-vue-next/pull/2328))
  - 修复图片加载中和图片加载失败缺少必要图标问题 @chaishi ([#2342](https://github.com/Tencent/tdesign-vue-next/pull/2342))
- `Dialog`: 修复 `dialog` 确认按钮 `theme` 取值问题，修复单元测试告警 @PengYYYYY ([#2320](https://github.com/Tencent/tdesign-vue-next/pull/2320))
- `Watermark`: 修复`unplugin`方式使用`watermark`组件报错的问题 ([issue #2325]( https://github.com/Tencent/tdesign-vue-next/issues/2325)) @uyarn ([#2329](https://github.com/Tencent/tdesign-vue-next/pull/2329))
- `Loading`: 当属性 `loading=false` 时，不允许存在任何加载组件相关元素 @chaishi ([#2319](https://github.com/Tencent/tdesign-vue-next/pull/2319))
- `Steps`: 修复示例样式问题 @Wen1kang ([#2330](https://github.com/Tencent/tdesign-vue-next/pull/2330))
- `Affix`: 修复在 `nuxt` 下运行报错的问题 ([issue #2279](https://github.com/Tencent/tdesign-vue-next/issues/2279)) @uyarn ([#2341](https://github.com/Tencent/tdesign-vue-next/pull/2341))
- `Pagination`: 修复在 `nuxt` 下运行报错的问题 ([issue #2279](https://github.com/Tencent/tdesign-vue-next/issues/2280)) @uyarn ([#2341](https://github.com/Tencent/tdesign-vue-next/pull/2341))
- `InputNumber`: 修复小数点后第二个数字若为 `0` 无法输入问题 ([issue #2304](https://github.com/Tencent/tdesign-vue-next/issues/2304)) @chaishi ([#2344](https://github.com/Tencent/tdesign-vue-next/pull/2344))
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
- `ColorPicker`: 切换单色-渐变模式时触发色值及onChange变化 @uyarn ([#2305](https://github.com/Tencent/tdesign-vue-next/pull/2305))
### 🐞 Bug Fixes
- `Input`: 修复使用 `format` 属性时，光标出现跳动 ([issue #2200](https://github.com/Tencent/tdesign-vue-next/issues/2200)) @Lmmmmmm-bb ([#2289](https://github.com/Tencent/tdesign-vue-next/pull/2289))
- `Table`: 
  - 可编辑单元格，修复无法退出编辑态问题，[issue#2302](https://github.com/Tencent/tdesign-vue-next/issues/2302) @chaishi ([#2303](https://github.com/Tencent/tdesign-vue-next/pull/2303))
  - 修复因 `useResizeObserver` 被重写导致的全部场景出现告警的问题 @chaishi ([#2303](https://github.com/Tencent/tdesign-vue-next/pull/2303))
- `Tooltip`: 修复 `Props` 覆盖插槽问题 ([issue #2250](https://github.com/Tencent/tdesign-vue-next/issues/2250)) @Aicmortal ([#2308](https://github.com/Tencent/tdesign-vue-next/pull/2308))
- `DatePicker`:  修复 `dayjs` 国际化设置问题 @honkinglin ([#2314](https://github.com/Tencent/tdesign-vue-next/pull/2314))
- `Notification`: 修复单独引入 `NotifyPlugin` 时没有带入 `css` 样式 ([issue #2312](https://github.com/Tencent/tdesign-vue-next/issues/2312)) @pengYYYYY ([#2316](https://github.com/Tencent/tdesign-vue-next/pull/2316))
### 🚧 Others
- `Transfer`:  修复 `tree` 的代码示例 @Lmmmmmm-bb ([#2300](https://github.com/Tencent/tdesign-vue-next/pull/2300))
- `SelectInput`: 补充单元测试 @whitexie ([#2291](https://github.com/Tencent/tdesign-vue-next/pull/2291))
## 🌈 1.0.4 `2023-01-18` 
### 🚀 Features
- `Input`: 
  - `change` 事件新增 `trigger` 参数，用于表示触发本次数据变化的场景 @chaishi ([#2275](https://github.com/Tencent/tdesign-vue-next/pull/2275))
  - 去除非必要的类名 `t-is-default` @chaishi ([#2275](https://github.com/Tencent/tdesign-vue-next/pull/2275))
  -  新增 `click` 点击事件 @chaishi ([#2275](https://github.com/Tencent/tdesign-vue-next/pull/2275))
### 🐞 Bug Fixes
- `Cascader`: 修复无法使用 `0` 作为 `value` ([issue #2278](https://github.com/Tencent/tdesign-vue-next/issues/2278)) @AuYuHui ([#2273](https://github.com/Tencent/tdesign-vue-next/pull/2273))
- `Input`: 修复初始值长度超过 `maxlength` 时无法删除问题 @chaishi ([#2275](https://github.com/Tencent/tdesign-vue-next/pull/2275))
- `AutoComplete`: 修复初次聚焦，键盘事件无法上下选中问题 @chaishi ([#2275](https://github.com/Tencent/tdesign-vue-next/pull/2275))
- `Select`: `valueType` 或 `multiple` 动态切换导致组件失效 ([issue #2206](https://github.com/Tencent/tdesign-vue-next/issues/2206)) @zybzzc ([#2276](https://github.com/Tencent/tdesign-vue-next/pull/2276))
- `Popup`: 修复 `trigger` 元素变化时 `popper` 位置错误 ([issue #2206](https://github.com/Tencent/tdesign-vue-next/issues/2206)) @zybzzc ([#2277](https://github.com/Tencent/tdesign-vue-next/pull/2277))
- `TimePicker`: 修复`TimePickerPanel`没有自动注册的问题 @uyarn ([#2283](https://github.com/Tencent/tdesign-vue-next/pull/2283))
- `Loading`: 修复部分浏览器下 `loading` 晃动问题 @yusongh ([#2244](https://github.com/Tencent/tdesign-vue-next/pull/2244))
- `SelectInput`: 修复下拉弹窗状态未改变时，重复触发 `onPopupVisibleChange` 事件的问题 @xiaosansiji ([#2284](https://github.com/Tencent/tdesign-vue-next/pull/2284))
- `Tree`: 修复节点的 `checkable: false` 不生效 ([issue #1987](https://github.com/Tencent/tdesign-vue-next/issues/1987)) @pengYYYYY ([#2286](https://github.com/Tencent/tdesign-vue-next/pull/2286))
### 🚧 Others
- `Input`: 
  - 更新文档 @chaishi ([#2275](https://github.com/Tencent/tdesign-vue-next/pull/2275))
  -  输出完整的测试用例，覆盖率达到 `98.11%` @chaishi ([#2275](https://github.com/Tencent/tdesign-vue-next/pull/2275))
- `Card`: 修改示例部分带操作代码无法点击情况 @AuYuHui ([#2273](https://github.com/Tencent/tdesign-vue-next/pull/2273))
- `AutoComplete`: 新增键盘事件测试用例检测，测试覆盖率达到 `98.47%` @chaishi ([#2275](https://github.com/Tencent/tdesign-vue-next/pull/2275))
- `Select`: 补充单元测试 @zybzzc ([#2276](https://github.com/Tencent/tdesign-vue-next/pull/2276))
- `Card`: 修改示例部分带操作代码无法点击情况 @AuYuHui ([#2273](https://github.com/Tencent/tdesign-vue-next/pull/2273))
- `Select`: 补充单元测试 @zybzzc ([#2276](https://github.com/Tencent/tdesign-vue-next/pull/2276))
## 🌈 1.0.3 `2023-01-12` 
### 🚀 Features
- `Table`: 
  - 可编辑单元格，支持使用  `col.edit.on` 透传组件事件 @chaishi ([#2256](https://github.com/Tencent/tdesign-vue-next/pull/2256))
  - 可编辑单元格，支持使用 `validateTableData` 校验处于编辑态的单元格 @chaishi ([#2256](https://github.com/Tencent/tdesign-vue-next/pull/2256))
  - 可编辑单元格，单元格的值 cellValue 不再进行解构处理，[#2236](https://github.com/Tencent/tdesign-vue-next/issues/2236) @chaishi ([#2256](https://github.com/Tencent/tdesign-vue-next/pull/2256))
  - 新增 `attach`，用于统一设置超出省略浮层、筛选过滤下拉框等元素的挂载元素。如：`attach={() => document.body}` @chaishi ([#2256](https://github.com/Tencent/tdesign-vue-next/pull/2256))
- `Radio`:
  - 支持键盘事件：`tab` 键切换选项，`enter` 键选中 @chaishi ([#2241](https://github.com/Tencent/tdesign-vue-next/pull/2241))
  - `RadioGroup` 支持 `allowUncheck`，[tdesign-vue#1693](https://github.com/Tencent/tdesign-vue/issues/1693) @chaishi ([#2241](https://github.com/Tencent/tdesign-vue-next/pull/2241))
- `Select`:  `valueDisplay`回调新增`displayValue`参数，用于设置`minCollapsedNum`的场景 @uyarn ([#2243](https://github.com/Tencent/tdesign-vue-next/pull/2243))
- `Local`: 增加阿拉伯语言包 @pengYYYYY ([#2240](https://github.com/Tencent/tdesign-vue-next/pull/2240))

### 🐞 Bug Fixes
- `Dialog`: 
  - 组件销毁前立即移除当前节点，不需要 `setTimeout` 等待时间 @chaishi ([#2242](https://github.com/Tencent/tdesign-vue-next/pull/2242))
  - 修复类型错误 ([issue #2227](https://github.com/Tencent/tdesign-vue-next/issues/2227)) @yaogengzhu ([#2247](https://github.com/Tencent/tdesign-vue-next/pull/2247))
- `Dropdown`: 修复三级及以上子菜单超出问题计算部分场景异常的问题 @uyarn ([#2252](https://github.com/Tencent/tdesign-vue-next/pull/2252))
- `TreeSelect`: 修复选项文案过程样式的异常 @uyarn ([#2252](https://github.com/Tencent/tdesign-vue-next/pull/2252))
- `Tooltip`: 
  - 修改触发元素传递方式 ([issue #2250](https://github.com/Tencent/tdesign-vue-next/issues/2250)) @Aicmortal ([#2253](https://github.com/Tencent/tdesign-vue-next/pull/2253))
  - 修复 `tooltip` 在 `duration` 时间结束后无法自动关闭的问题 @FliPPeDround ([#2255](https://github.com/Tencent/tdesign-vue-next/pull/2255))
- `Table`: 处理单击和双击事件冲突问题，避免双击的时候触发行选中或行展开，[#2218](https://github.com/Tencent/tdesign-vue-next/issues/2218) @chaishi ([#2256](https://github.com/Tencent/tdesign-vue-next/pull/2256))
- `Image`: 修复首次设置图片显示错误后动态修改 `src` 值图片无法显示问题 @sechi747 ([#2259](https://github.com/Tencent/tdesign-vue-next/pull/2259))
- `Swiper`: 循环播放导航指示标显示问题 ([issue #2245](https://github.com/Tencent/tdesign-vue-next/issues/2245)) @wenkeming ([#2257](https://github.com/Tencent/tdesign-vue-next/pull/2257))
- `Volar`: 完善 `volar` 代码提示文件 @code2933 ([#2262](https://github.com/Tencent/tdesign-vue-next/pull/2262))
- `Select`: 修复 `value` 不在 `options` 时不显示值 ([issue #2266](https://github.com/Tencent/tdesign-vue-next/issues/2266)) @Aicmortal ([#2267](https://github.com/Tencent/tdesign-vue-next/pull/2267))
### 🚧 Others
- `Radio`: 输出完整的测试用例 @chaishi ([#2241](https://github.com/Tencent/tdesign-vue-next/pull/2241))
- `docs`: 优化最后更新日期展示 @honkinglin ([#2261](https://github.com/Tencent/tdesign-vue-next/pull/2261))
## 🌈 1.0.2 `2023-01-05` 
### 🚀 Features
- `AutoComplete`:
  -  新增清空功能 `clearable` @chaishi ([#2219](https://github.com/Tencent/tdesign-vue-next/pull/2219))
  - 新增自动聚焦功能 `autofocus` @chaishi ([#2219](https://github.com/Tencent/tdesign-vue-next/pull/2219))
  - 新增 `enter/blur/compositionend/compositionstart` 等事件，及相关参数和文档保持一致 @chaishi ([#2219](https://github.com/Tencent/tdesign-vue-next/pull/2219))
- `Input`: 更新 API 之后，默认会给组件添加类名 `t-is-default` @chaishi ([#2219](https://github.com/Tencent/tdesign-vue-next/pull/2219))
### 🐞 Bug Fixes
- `DatePicker`: 
  - 修复默认值不显示问题 @Aicmortal ([#2229](https://github.com/Tencent/tdesign-vue-next/pull/2229))
  - 修复 `datepicker` 输入框变化面板未响应问题 & 月份切换错误响应问题 @honkinglin ([#2238](https://github.com/Tencent/tdesign-vue-next/pull/2238))
  - 修复默认值不显示问题 @Aicmortal ([#2229](https://github.com/Tencent/tdesign-vue-next/pull/2229))
- `Input`: 
  - 修复 `enter` 事件判断，支持 code 为 `Enter` 或 `enter` @chaishi ([#2219](https://github.com/Tencent/tdesign-vue-next/pull/2219))
  - 处理在 `clear` 事件中无法获取到最新 `value` 问题 @chaishi ([#2231](https://github.com/Tencent/tdesign-vue-next/pull/2231))
- `AutoComplete`: 修复 `options` 不存在时，组件因缺少判空报错问题 @chaishi ([#2219](https://github.com/Tencent/tdesign-vue-next/pull/2219))
- `Checkbox`: 修复 `max` 属性无效 [issue #2230](https://github.com/Tencent/tdesign-vue-next/issues/2230) @FliPPeDround ([#2233](https://github.com/Tencent/tdesign-vue-next/pull/2233))
### 🚧 Others
- `AutoComplete`: 补充完整的测试用例（35 个） @chaishi ([#2219](https://github.com/Tencent/tdesign-vue-next/pull/2219))
- `Link`: 补充完整的测试用例（25 个） @chaishi ([#2219](https://github.com/Tencent/tdesign-vue-next/pull/2219))
- `Link`: 去掉非必要的类名 `t-size-m` @chaishi ([#2219](https://github.com/Tencent/tdesign-vue-next/pull/2219))
- `Button`: 去掉非必要的类名 `t-size-m` @chaishi ([#2219](https://github.com/Tencent/tdesign-vue-next/pull/2219))
- `Divider`: 输出完整的测试用例 @chaishi ([#2225](https://github.com/Tencent/tdesign-vue-next/pull/2225))
## 🌈 1.0.1 `2022-12-30` 
### 🚀 Features
- `Table`: 支持透传分页组件 `Pagination` 插槽 `totalContent`，[issue#2152](https://github.com/Tencent/tdesign-vue-next/issues/2152) @chaishi ([#2208](https://github.com/Tencent/tdesign-vue-next/pull/2208))
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
- `Table`: 
  - 列配置支持 `stopPropagation: true`，用于设置某一列单元格阻止事件冒泡 @chaishi ([#2183](https://github.com/Tencent/tdesign-vue-next/pull/2183))
  - 虚拟滚动支持行高动态变化 @chaishi ([#2183](https://github.com/Tencent/tdesign-vue-next/pull/2183))
- `Menu`: 样式优化，https://github.com/Tencent/tdesign-common/pull/1073 @xiaosansiji ([#2172](https://github.com/Tencent/tdesign-vue-next/pull/2172))
- `TreeSelect`: `onVisibleChange`事件增加回调参数 @uyarn ([#2184](https://github.com/Tencent/tdesign-vue-next/pull/2184))
### 🐞 Bug Fixes
- `Table`: 
  - 修复表格宽度过小时抖动问题 @chaishi ([#2183](https://github.com/Tencent/tdesign-vue-next/pull/2183))
  - 固定表头背景色始终保持为灰色底，无论内容是否溢出 @chaishi ([#2183](https://github.com/Tencent/tdesign-vue-next/pull/2183))
- `Dropdown`: 修复多级菜单长度超长时 无法选择子菜单及位置异常的问题 @uyarn ([#2171](https://github.com/Tencent/tdesign-vue-next/pull/2171))
- `Slider`: 修复 `tooltip` 属性自定义 `content` 不生效问题 ([issue #2180](https://github.com/Tencent/tdesign-vue-next/issues/2180)) @ChrisLee0211 ([#2181](https://github.com/Tencent/tdesign-vue-next/pull/2181))
- `Datepicker`: 兼容传入空字符串 @honkinglin ([#2169](https://github.com/Tencent/tdesign-vue-next/pull/2169))

## 🌈 0.26.2 `2022-12-14` 
### 🚀 Features
- `Table`: 
  - 树形结构，支持点击行展开树节点，[tdesign-vue#1847](https://github.com/Tencent/tdesign-vue/issues/1847) @chaishi ([#2147](https://github.com/Tencent/tdesign-vue-next/pull/2147))
  - 树形结构，点击树节点展开图标时，不触发 `onRowClick` 行点击事件，[issue#1847](https://github.com/Tencent/tdesign-vue/issues/1847) @chaishi ([#2147](https://github.com/Tencent/tdesign-vue-next/pull/2147))
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
- `Table`: 虚拟滚动支持表格高度变化，[issue#1374](https://github.com/Tencent/tdesign-vue-next/issues/1374) @chaishi ([#2112](https://github.com/Tencent/tdesign-vue-next/pull/2112))
- `DatePicker`: 
  - 修复右侧面板月份展示错误问题  @honkinglin ([#2157](https://github.com/Tencent/tdesign-vue-next/pull/2157))
  - 修复 `tips` 样式问题 @honkinglin ([#2159](https://github.com/Tencent/tdesign-vue-next/pull/2159))
- `Popconfirm`: 修复 `confirmBtn` 等属性存在类型错误 ([issue #1642](https://github.com/Tencent/tdesign-vue-next/issues/1642)) @pengYYYYY ([#2158](https://github.com/Tencent/tdesign-vue-next/pull/2158))
- `Dropdown`: 修复 `hover` 有时候不能触发打开下拉菜单 ([issue #1642](https://github.com/Tencent/tdesign-vue-next/issues/1648)) @pengYYYYY ([#2158](https://github.com/Tencent/tdesign-vue-next/pull/2158))

## 🌈 0.26.1 `2022-12-09` 
### 🐞 Bug Fixes
- `Guide`: 相对元素位置不正确 @zhangpaopao0609 ([#2130](https://github.com/Tencent/tdesign-vue-next/pull/2130))
- `Dialog`: 修复滚动条判断问题  @honkinglin ([#2134](https://github.com/Tencent/tdesign-vue-next/pull/2134))
- `Table`: `demo` 样式优化 @pengYYYYY ([#2115](https://github.com/Tencent/tdesign-vue-next/pull/2115))
- `SelectInput`: 修复 `selectInput` 出现异常的`tips` 节点 @pengYYYYY ([#2115](https://github.com/Tencent/tdesign-vue-next/pull/2115))
- `Select`: 修复虚拟滚动失效的问题 @uyarn ([#2142](https://github.com/Tencent/tdesign-vue-next/pull/2142))
- `TagInput`: 修复拼音输入时按下删除键触发标签删除问题 @dianjie ([#2140](https://github.com/Tencent/tdesign-vue-next/pull/2140))
- `Table`: 修复点击行展开报错问题 @chaishi ([#2144](https://github.com/Tencent/tdesign-vue-next/pull/2144))
- `Textarea`: 修复中文拼硬输入时触发高度计算但不触发 `onChange` ([issue #1852 ](https://github.com/Tencent/tdesign-vue/issues/1852)) @zhangpaopao0609 ([#2145](https://github.com/Tencent/tdesign-vue-next/pull/2145))
## 🌈 0.26.0 `2022-12-08` 

### ❗ Breaking Changes
- `SelectInput`: 
  - `selectInputWrapRef` 更名为 `selectInputRef ` @chaishi ([#2125](https://github.com/Tencent/tdesign-vue-next/pull/2125))
  - 涉及 `DOM` 类名变更，和 `React` 保持一致，方便全部框架复用一份 CSS @chaishi ([#2125](https://github.com/Tencent/tdesign-vue-next/pull/2125))

### 🚀 Features
- `Table`: 
  - 可筛选表格，新增 `filter.popupProps` ，支持透传 Popup 组件全部属性，[issue#2088](https://github.com/Tencent/tdesign-vue-next/issues/2088) @chaishi ([#2105](https://github.com/Tencent/tdesign-vue-next/pull/2105))
  - 选中行表格，新增 `selectOnRowClick`，支持点击行选中，[issue#1954](https://github.com/Tencent/tdesign-vue-next/issues/1954) @chaishi ([#2105](https://github.com/Tencent/tdesign-vue-next/pull/2105))
- `ColorPicker`: 新增`clearable`及`showPrimaryColorPreview`API，控制是否展示颜色选择条右侧预览区域 @uyarn ([#2096](https://github.com/Tencent/tdesign-vue-next/pull/2096))
- `Upload`:  `onProgress` 事件新增参数 `XMLHttpRequest`，用于获取 http status 等信息 @chaishi ([#2106](https://github.com/Tencent/tdesign-vue-next/pull/2106))
- `TimePicker`: 新增`tips`和`status` API，onPick新增context参数回调 @uyarn ([#2124](https://github.com/Tencent/tdesign-vue-next/pull/2124))
### 🐞 Bug Fixes
- `Table`: 
  - 修复拖拽排序问题，[issue#1706](https://github.com/Tencent/tdesign-vue-next/issues/1706)，[issue#1250](https://github.com/Tencent/tdesign-vue-next/issues/1250)，[issue#895](https://github.com/Tencent/tdesign-vue-next/issues/895)，[issue#893](https://github.com/Tencent/tdesign-vue-next/issues/893) @chaishi ([#2105](https://github.com/Tencent/tdesign-vue-next/pull/2105))
  - 修复表头超出省略报错问题 @chaishi ([#2131](https://github.com/Tencent/tdesign-vue-next/pull/2131))
  - 本地数据排序，支持默认对排序字段进行数据排序，[issue#2129](https://github.com/Tencent/tdesign-vue-next/issues/2129) @chaishi ([#2131](https://github.com/Tencent/tdesign-vue-next/pull/2131))
- `ColorPicker`: 修复无法删除颜色值的问题 @uyarn ([#2096](https://github.com/Tencent/tdesign-vue-next/pull/2096))
- `ConfigProvider`: 修复 `v-loading` 方式使用时会发出警告问题 ([issue #2025](https://github.com/Tencent/tdesign-vue-next/issues/2025)) @yusongh ([#2054](https://github.com/Tencent/tdesign-vue-next/pull/2054))
- `InputNumber`: 无法输入小数点后面的第一位数字 `0`，[issue#2103](https://github.com/Tencent/tdesign-vue-next/issues/2103) @chaishi ([#2107](https://github.com/Tencent/tdesign-vue-next/pull/2107))
- `Radio`: 修复 `click` 事件没有绑定在最外层，导致无法正确获取点击事件问题 @chaishi ([#2105](https://github.com/Tencent/tdesign-vue-next/pull/2105))
- `TimePicker`: 修复面板开启时无法点击清空按钮清空数值的问题 @uyarn ([#2124](https://github.com/Tencent/tdesign-vue-next/pull/2124))
- `SelectInput`: 修复宽度自适应场景，宽度问题，[issue#2122](https://github.com/Tencent/tdesign-vue-next/issues/2122) @chaishi ([#2125](https://github.com/Tencent/tdesign-vue-next/pull/2125))
- `InputAdornment`: 修复 inputAdornment 样式 @honkinglin ([#2127](https://github.com/Tencent/tdesign-vue-next/pull/2127))
- `ImageViewer `: 修复 `image-viewer` 移除动画缺失问题 @honkinglin ([#2118](https://github.com/Tencent/tdesign-vue-next/pull/2118))
- `RangeInput`: 修复 `status` 无效问题 @honkinglin ([#2123](https://github.com/Tencent/tdesign-vue-next/pull/2123))
## 🌈 0.25.0 `2022-12-01` 
### ❗ Breaking Changes
- `Jumper`: `Jumper` 更名为 `PaginationMini` 组件，正在使用 `Jumper` 组件的同学请从 `Pagination` 中导出替换 @honkinglin ([#2066](https://github.com/Tencent/tdesign-vue-next/pull/2066))

### 🚀 Features
- `Table`: 选中行功能，新增 `reserveSelectedRowOnPaginate`，用于支持在分页场景中，仅选中当前页数据，切换分页时清空选中结果，全选仅选中当前页数据 @chaishi ([#2074](https://github.com/Tencent/tdesign-vue-next/pull/2074))
- `Calendar`: 日历组件支持多个高亮单元格； @PsTiu ([#2075](https://github.com/Tencent/tdesign-vue-next/pull/2075))
### 🐞 Bug Fixes
- `Table`: 
  - 修复本地数据分页场景中，切换分页大小，`onPageChange` 事件参数返回的数据不正确问题 @chaishi ([#2074](https://github.com/Tencent/tdesign-vue-next/pull/2074))
  - 序号列支持跨分页显示([issue#2072](https://github.com/Tencent/tdesign-vue-next/issues/2072)) @chaishi ([#2074](https://github.com/Tencent/tdesign-vue-next/pull/2074))
  - 修复分页场景下，设置 max-height 和 bordered 之后，边框线位置不正确 ([issue#2062](https://github.com/Tencent/tdesign-vue-next/issues/2062)) @chaishi ([#2074](https://github.com/Tencent/tdesign-vue-next/pull/2074))
  - 行选中事件参数选中数据支持 `data.push`([tdesign-vue#1747](https://github.com/Tencent/tdesign-vue/issues/1747)) @chaishi ([#2074](https://github.com/Tencent/tdesign-vue-next/pull/2074))
- `TagInput`: 
  - 不同尺寸的间距和高度问题修复 ([issue#1843](https://github.com/Tencent/tdesign-vue/issues/1843)) @chaishi ([#2087](https://github.com/Tencent/tdesign-vue-next/pull/2087))
  - 右侧图标会和标签重合问题 @chaishi ([#2087](https://github.com/Tencent/tdesign-vue-next/pull/2087))
  - 修复 `onRemove` 事件参数未能返回最新 `value` 问题 @chaishi ([#2087](https://github.com/Tencent/tdesign-vue-next/pull/2087))
  - 修复拼音输入时按下 `Enter` 触发标签确认问题 @chaishi ([#2087](https://github.com/Tencent/tdesign-vue-next/pull/2087))
  - 修复拼音输入时按下删除键触发标签删除问题，当在拼音输入完成后允许删除标签([issue#1857](https://github.com/Tencent/tdesign-vue-next/issues/1857)) @chaishi ([#2087](https://github.com/Tencent/tdesign-vue-next/pull/2087))
- `Image`: 
  - 修复  `placeholder` 接收类型警告 ([issue #2093](https://github.com/Tencent/tdesign-vue-next/issues/2093)) @pengYYYYY ([#2094](https://github.com/Tencent/tdesign-vue-next/pull/2094))
  -  修复图片组件的 `overlayContent` 无效 ([issue #1996](https://github.com/Tencent/tdesign-vue-next/issues/1996)) @pengYYYYY ([#2094](https://github.com/Tencent/tdesign-vue-next/pull/2094))
- `AutoComplete`: 支持使用 `triggerElement` 自定义 `AutoComplete` 的触发元素 @chaishi ([#2070](https://github.com/Tencent/tdesign-vue-next/pull/2070))
- `Tooltip`: 修复继承 `Popup` 组件 `disabled` 属性失效 ([issue #1962](https://github.com/Tencent/tdesign-vue-next/issues/1962)) @Zzongke ([#2069](https://github.com/Tencent/tdesign-vue-next/pull/2069))
- `Calendar`: 修复日历组件在月历模式下高亮显示的 `bug`。 @PsTiu ([#2075](https://github.com/Tencent/tdesign-vue-next/pull/2075))
- `Menu`: 修复多层收纳导航 `head-menu` 默认未激活([issue 1810](https://github.com/Tencent/tdesign-vue-next/issues/1810)) @sinbadmaster ([#2073](https://github.com/Tencent/tdesign-vue-next/pull/2073))
- `Dialog`: 调整 `body` 锁定逻辑 @honkinglin ([#2083](https://github.com/Tencent/tdesign-vue-next/pull/2083))
- `Drawer`: 修复 `drawer` 动画效果 @honkinglin ([#2089](https://github.com/Tencent/tdesign-vue-next/pull/2089))
- `Textarea`: 修复 `status` 类型为 `default` 无效 ([issue #2023](https://github.com/Tencent/tdesign-vue-next/issues/2023)) @pengYYYYY ([#2094](https://github.com/Tencent/tdesign-vue-next/pull/2094))
- `ImageViewer`: 提升 `ImageViewer` 默认 `zIndex` ([issue #2068](https://github.com/Tencent/tdesign-vue-next/issues/2068)) @sinbadmaster ([#2071](https://github.com/Tencent/tdesign-vue-next/pull/2071))
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
- `Table`: 可编辑行，修复因没有监听数据变化，出现的校验不通过问题，[tdesign-vue#1822](https://github.com/Tencent/tdesign-vue/issues/1822) @chaishi ([#2053](https://github.com/Tencent/tdesign-vue-next/pull/2053))
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
- `Slider`: 修复 `slider` 样式问题 ([issue #237](https://github.com/Tencent/tdesign/issues/237)) @HQ-Lin ([#2011](https://github.com/Tencent/tdesign-vue-next/pull/2011))
- `Button`: 新增`suffix` API，支持需要为按钮配置文字后置图标的场景 @uyarn ([#2018](https://github.com/Tencent/tdesign-vue-next/pull/2018))
- `CodeTip`: 增加编辑器代码提示 @chaishi ([#2005](https://github.com/Tencent/tdesign-vue-next/pull/2005))

### 🐞 Bug Fixes
- `ImageViewer`: 
  - 调整`ImageViewer`顶部按钮的大小 @Wen1kang ([#2010](https://github.com/Tencent/tdesign-vue-next/pull/2010))
  - 修复样式问题 @HQ-Lin ([#2015](https://github.com/Tencent/tdesign-vue-next/pull/2015))
- `Breadcrumb`: 修复文字省略样式失效的问题 @uyarn ([#1998](https://github.com/Tencent/tdesign-vue-next/pull/1998))
- `InputNumber`: `value` 支持受控 @chaishi ([#2002](https://github.com/Tencent/tdesign-vue-next/pull/2002))
- `Alert`: 修复内嵌 `link` 时，`hover` 会导致 `alert` 消失 @Lmmmmmm-bb ([#2000](https://github.com/Tencent/tdesign-vue-next/pull/2000))
- `Table`: 修复 `EnhancedTable` 树形结构，在编译后的运行过程中缺少实例方法（开发环境正常）问题 ([issue#1999](https://github.com/Tencent/tdesign-vue-next/issues/1999)) @chaishi ([#2004](https://github.com/Tencent/tdesign-vue-next/pull/2004))
- `Comment`: 修复 `comment` 样式问题 @HQ-Lin ([#2007](https://github.com/Tencent/tdesign-vue-next/pull/2007))
- `Select`: 修复筛选默认模糊大小写的功能([Tencent/tdeisng-vue#1787](https://github.com/Tencent/tdesign-vue/pull/1787)) @skytt ([#2009](https://github.com/Tencent/tdesign-vue-next/pull/2009))
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
- `Upload`: 多上传文件模式支持使用 `fileListDisplay` 自定义文件列表，插槽和属性均可 ([issue #1976](https://github.com/Tencent/tdesign-vue-next/issues/1976)) @chaishi ([#1978](https://github.com/Tencent/tdesign-vue-next/pull/1978))
- `Demo`: `stackblitz` 默认打开 `.vue` 文件 ([issue #1974](https://github.com/Tencent/tdesign-vue-next/issues/1974)) @pengYYYYY ([#1977](https://github.com/Tencent/tdesign-vue-next/pull/1977))
- `Timeline`: 增加 `timeline` 组件 @pengYYYYY ([#1980](https://github.com/Tencent/tdesign-vue-next/pull/1980))
- `TagInput`: 修复空引用错误 ([issue #1983](https://github.com/Tencent/tdesign-vue-next/issues/1983)) @pengYYYYY ([#1980](https://github.com/Tencent/tdesign-vue-next/pull/1980))
### 🐞 Bug Fixes
- `Input`: 
  - 默认值 `format` 失效问题，[issue#1964](https://github.com/Tencent/tdesign-vue-next/issues/1964) @chaishi ([#1968](https://github.com/Tencent/tdesign-vue-next/pull/1968))
  - 修复在输入框进行预渲染处于 `display: none` 状态时，宽度计算不正确问题，[tdesign-vue#1678](https://github.com/Tencent/tdesign-vue/issues/1678) @chaishi ([#1968](https://github.com/Tencent/tdesign-vue-next/pull/1968))
  - 元素判空 @chaishi ([#1969](https://github.com/Tencent/tdesign-vue-next/pull/1969))
- `Calendar`: 
  - 修复了年份选择下拉框刷新的问题 @PsTiu ([#1972](https://github.com/Tencent/tdesign-vue-next/pull/1972))
  - 修复日历组件 `cellAppend` 属性作为 `Function` 时参数错误的问题 @PsTiu ([#1972](https://github.com/Tencent/tdesign-vue-next/pull/1972))
- `Table`: 当禁用resizable时，表格默认使用用户定义的列宽 @ZTao-z ([#1935](https://github.com/Tencent/tdesign-vue-next/pull/1935))
- `TimePicker`: 修复12小时制时分列首位的异常 @uyarn ([#1975](https://github.com/Tencent/tdesign-vue-next/pull/1975))
- `Popup`: 使用 `overlayInnerStyle` 定义定宽 ([issue #1970](https://github.com/Tencent/tdesign-vue-next/issues/1970)) @pengYYYYY ([#1977](https://github.com/Tencent/tdesign-vue-next/pull/1977))
- `Image`: 修复 `error slot` 无效 ([issue #1961](https://github.com/Tencent/tdesign-vue-next/issues/1961)) @pengYYYYY ([#1977](https://github.com/Tencent/tdesign-vue-next/pull/1977))
### 🚧 Others
- `docs`:  增加英文文档 @uyarn ([#1963](https://github.com/Tencent/tdesign-vue-next/pull/1963))
- `InputNumber`: 文档问题 @chaishi ([#1969](https://github.com/Tencent/tdesign-vue-next/pull/1969))
- `Calendar`: 补充日历组件单元测试 @PsTiu ([#1972](https://github.com/Tencent/tdesign-vue-next/pull/1972))
- `TimePicker`: 补充 `time-picker` 单元测试用例 @uyarn ([#1979](https://github.com/Tencent/tdesign-vue-next/pull/1979))
- `Popup`: 补充 `popup`  单元测试用例 @byq1213 ([#1966](https://github.com/Tencent/tdesign-vue-next/pull/1966))
## 🌈 0.24.5 `2022-11-01` 
### 🚀 Features
- `Pagination`: 透传`selectProps` 和 `selectProps.popupProps` 到组件 `Pagination`，以便实现挂载节点等复杂场景需求， ([tdesign-react#1611](https://github.com/Tencent/tdesign-react/issues/1611)) @chaishi ([#1931](https://github.com/Tencent/tdesign-vue-next/pull/1931))
- `Input`: 支持对 `unicode` 字符长度的判定 @chaishi ([#1927](https://github.com/Tencent/tdesign-vue-next/pull/1927))

### 🐞 Bug Fixes

- `Table`: 
  - 修复吸顶表头超出省略问题，[tdesign-vue#1639](https://github.com/Tencent/tdesign-vue/issues/1639) @chaishi ([#1931](https://github.com/Tencent/tdesign-vue-next/pull/1931))
  - 提高 `dragSortOptions` 优先级，以便父组件自定义全部参数，[tdesign-react#1556](https://github.com/Tencent/tdesign-react/issues/1556) @chaishi ([#1931](https://github.com/Tencent/tdesign-vue-next/pull/1931))
  - 本地分页表格中，使用拖拽排序，数据交换结果不正确，[tdesign-vue#1342](https://github.com/Tencent/tdesign-vue/issues/1342) @chaishi ([#1931](https://github.com/Tencent/tdesign-vue-next/pull/1931))
- `Dropdown`: 
  - 修复无法使用 `v-for` 渲染 `item` 的异常 @uyarn ([#1936](https://github.com/Tencent/tdesign-vue-next/pull/1936))
  - 修复在 `JSX` 中使用有告警的异常 @uyarn ([#1936](https://github.com/Tencent/tdesign-vue-next/pull/1936))
- `Form`: 
   - 修复 `onBlur` 会清空校验状态的问题 @k1nz ([#1933](https://github.com/Tencent/tdesign-vue-next/pull/1933))
   - 修正 `date` 规则中 `delimiters` 属性值 @k1nz ([#1933](https://github.com/Tencent/tdesign-vue-next/pull/1933))
- `Slider`: 修复 `vertical` 示例展示异常 ([issue #1904](https://github.com/Tencent/tdesign-vue-next/issues/1904)) @pengYYYYY ([#1918](https://github.com/Tencent/tdesign-vue-next/pull/1918))
- `CheckBox`: 修复 `readonly` 属性没效果 ([issue #1928](https://github.com/Tencent/tdesign-vue-next/issues/1919)) @pengYYYYY ([#1930](https://github.com/Tencent/tdesign-vue-next/pull/1930))
- `Loading`: 修复部分场景 `v-loading` 异常的问题 ([issue #1917](https://github.com/Tencent/tdesign-vue-next/issues/1917)) @uyarn ([#1937](https://github.com/Tencent/tdesign-vue-next/pull/1937))
- `Datepicker`: 修复 `popupProps.onVisibleChange` 方法不能正常触发的问题 @xiaosansiji ([#1939](https://github.com/Tencent/tdesign-vue-next/pull/1939))
- `Select`: 修复无法使用 `0` 作为 `value` ([issue #1928](https://github.com/Tencent/tdesign-vue-next/issues/1928)) @pengYYYYY ([#1940](https://github.com/Tencent/tdesign-vue-next/pull/1940))
- `Collapse`: 修复 `ExpandIcon` 未按照 `API` 文档实现 ([issue #1894](https://github.com/Tencent/tdesign-vue-next/issues/1894)) @asbstty ([#1941](https://github.com/Tencent/tdesign-vue-next/pull/1941))
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
  - 修复 `theme=file` `draggable=true` 时，拖拽无效问题，[issue#1559](https://github.com/Tencent/tdesign-react/issues/1559) @chaishi ([#1899](https://github.com/Tencent/tdesign-vue-next/pull/1899))
- `Select`: 
  - 修复远程搜索带过滤时，已选择内容 `label` 丢失问题([issue #1466](https://github.com/Tencent/tdesign-vue-next/issues/1466)) @pengYYYYY ([#1908](https://github.com/Tencent/tdesign-vue-next/pull/1908))
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
- `Table`: 增强型表格，支持列配置，支持不传 `displayColumns` 时默认显示全部列，([issue #1784](https://github.com/Tencent/tdesign-vue-next/issues/1784)) @chaishi ([#1869](https://github.com/Tencent/tdesign-vue-next/pull/1869))
- `DatePicker`: 调整 `requiredMark api` 可独立控制星号展示 @HQ-Lin ([#1832](https://github.com/Tencent/tdesign-vue-next/pull/1832))
### 🐞 Bug Fixes
- `Dropdown`: 
  - 修复插槽下 `item` 使用 `v-if` 异常的问题 @uyarn ([#1851](https://github.com/Tencent/tdesign-vue-next/pull/1851))
  - 修复`trigger`部分响应式丢失的问题 @uyarn ([#1858](https://github.com/Tencent/tdesign-vue-next/pull/1858))
  - 修复插槽平铺内容为子节点内容渲染丢失部分元素的问题 @uyarn ([#1870](https://github.com/Tencent/tdesign-vue-next/pull/1870))
- `Table`: 
  - 筛选功能，`resetValue` 无效，([issue #1611](https://github.com/Tencent/tdesign-vue/issues/1611)) @chaishi ([#1869](https://github.com/Tencent/tdesign-vue-next/pull/1869))
  - 表头吸顶功能，数据变化更新吸顶位置，([issue #1585](https://github.com/Tencent/tdesign-vue/issues/1585)) @chaishi ([#1869](https://github.com/Tencent/tdesign-vue-next/pull/1869))
  - 组件类型未导出 ([issue #1815](https://github.com/Tencent/tdesign-vue-next/issues/1815)) @pengYYYYY ([#1871](https://github.com/Tencent/tdesign-vue-next/pull/1871))
  - 移除demo中对吸顶表格的最大宽度限制 @ZTao-z ([#1854](https://github.com/Tencent/tdesign-vue-next/pull/1854))
- `Tooltip`: 修复 `tooltip` 无法显示问题([issue #1834](https://github.com/Tencent/tdesign-vue-next/issues/1834)) @ChrisLee0211 ([#1842](https://github.com/Tencent/tdesign-vue-next/pull/1842))
- `DatePicker`: 修复 `range` 数据格式化异常问题 @HQ-Lin ([#1845](https://github.com/Tencent/tdesign-vue-next/pull/1845))
- `Tree`: `watch` 联动判断找不到父节点 ([issue #1754](https://github.com/Tencent/tdesign-vue-next/issues/1754)) @Reg1350 ([#1848](https://github.com/Tencent/tdesign-vue-next/pull/1848))
- `Card`: 修复 `demo` 样式 @yilaierwang ([#1861](https://github.com/Tencent/tdesign-vue-next/pull/1861))
- `Avatar`: `demo` 中头像类型展示，删除重复头像并调整展示顺序 @tutaizi ([#1838](https://github.com/Tencent/tdesign-vue-next/pull/1838))
- `Tree`: `watch` 联动判断找不到父节点 ([issue #1754](https://github.com/Tencent/tdesign-vue-next/issues/1754)) @Reg1350 ([#1848](https://github.com/Tencent/tdesign-vue-next/pull/1848))
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
- `Dropdown`: 修复插槽用法的使用缺陷 ([issue #1825](https://github.com/Tencent/tdesign-vue-next/issues/1825)) @uyarn ([#1827](https://github.com/Tencent/tdesign-vue-next/pull/1827))
- `Hooks`: 修复受控属性 `modelValue` 和其他受控属性处理逻辑不一致的问题 @jxwanglong ([#1828](https://github.com/Tencent/tdesign-vue-next/pull/1828))
### 🚧 Others
- `Message`: 补充 `message` 单元测试 @LadyChatterleyLover ([#1824](https://github.com/Tencent/tdesign-vue-next/pull/1824))


## 🌈 0.24.0 `2022-10-09` 
### ❗ Breaking Changes
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
  - 添加参数 `response` 到事件 `onSuccess`，单文件是对象，多文件是数组，[issue#1774](https://github.com/Tencent/tdesign-vue-next/issues/1774) @chaishi ([#1776](https://github.com/Tencent/tdesign-vue-next/pull/1776))
- `Tree`:
  -  修复`expandOnClickNode`与`checkable`冲突的问题 @uyarn ([#1812](https://github.com/Tencent/tdesign-vue-next/pull/1812))
  - 修复`disabled`状态下无法展开子选项的错误 @uyarn ([#1812](https://github.com/Tencent/tdesign-vue-next/pull/1812))
- `TreeSelect`: 
  - 修复节点选中状态变化时 `change` 事件触发两次([issue #1787](https://github.com/Tencent/tdesign-vue-next/issues/1787)) @Lmmmmmm-bb ([#1797](https://github.com/Tencent/tdesign-vue-next/pull/1797))
  - 修复多选状态下点击选项直接关闭面板的问题 @uyarn ([#1812](https://github.com/Tencent/tdesign-vue-next/pull/1812))
- `Swiper`: 修复卡片模式时，切换空白的问题([issue #1763](https://github.com/Tencent/tdesign-vue-next/issues/1763)) @btea ([#1796](https://github.com/Tencent/tdesign-vue-next/pull/1796))
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
  -  `withCredentials` ([issue #1765](https://github.com/Tencent/tdesign-vue-next/issues/1765)) @chaishi ([#1768](https://github.com/Tencent/tdesign-vue-next/pull/1768))
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
### ❗ Breaking Changes
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
  - 新增 `column.colKey = serial-number`，支持序号列功能，([#1517](https://github.com/Tencent/tdesign-vue-next/issues/1517)( @chaishi ([#1740](https://github.com/Tencent/tdesign-vue-next/pull/1740))
  - 新增 `showSortColumnBgColor`，用于控制是否显示排序列背景色 @chaishi ([#1740](https://github.com/Tencent/tdesign-vue-next/pull/1740))
  - 支持属性 `tree.treeNodeColumnIndex` 动态修改， ([#1487](https://github.com/Tencent/tdesign-vue-next/issues/1487)) @chaishi ([#1740](https://github.com/Tencent/tdesign-vue-next/pull/1740))
- `Menu`: 如果存在链接参数，默认使用标签 `<a>` ([issue #1671](https://github.com/Tencent/tdesign-vue-next/issues/1671)) @Lmmmmmm-bb ([#1728](https://github.com/Tencent/tdesign-vue-next/pull/1728)) 
- `Image`: 增加 `image` 组件 @pengYYYYY ([#1735](https://github.com/Tencent/tdesign-vue-next/pull/1735))

### 🐞 Bug Fixes
- `Table`: 
  -  树形结构，叶子节点缩进距离修正 @chaishi ([#1740](https://github.com/Tencent/tdesign-vue-next/pull/1740))
  - 超出省略功能，`ellipsisTitle`优先级应当高于 `ellipsis`， [tdesign-vue#1404](https://github.com/Tencent/tdesign-vue/issues/1404) @chaishi ([#1740](https://github.com/Tencent/tdesign-vue-next/pull/1740))
  - 修复不提供 `expandedRowKeys` 的绑定会报错 @MyZhouGit ([#1705](https://github.com/Tencent/tdesign-vue-next/pull/1705))
  - 行选中功能，修复 `column.type=single` 时，`column.title` 无效问题，[issue#1372](https://github.com/Tencent/tdesign-vue/issues/1372) @chaishi ([#1740](https://github.com/Tencent/tdesign-vue-next/pull/1740))
  - 过滤功能，`list.value` 值为 `number` 无法高亮过滤图标问题 @chaishi ([#1740](https://github.com/Tencent/tdesign-vue-next/pull/1740))
  - 行选中功能，数据变化时，选中的数据依旧是变化前的数据，[#1722](https://github.com/Tencent/tdesign-vue-next/issues/1722) @chaishi ([#1740](https://github.com/Tencent/tdesign-vue-next/pull/1740))
- `Swiper`:
  -  修复鼠标悬停移出后没有重新轮播问题  @yusongH ([#1717](https://github.com/Tencent/tdesign-vue-next/pull/1717))
  - 修复 `trriger` 属性不生效问题  @yusongH ([#1717](https://github.com/Tencent/tdesign-vue-next/pull/1717))
  - 修复鼠标悬停移出后没有重新轮播问题 @yusongH ([#1717](https://github.com/Tencent/tdesign-vue-next/pull/1717))
  -  修复 `swiper` 组件的 `demo` 显示不正确 @yusongH ([#1725](https://github.com/Tencent/tdesign-vue-next/pull/1725))
- `ImageViewer`: 
  - 按 `class` 命名规范修复组件 `class` 命名 @sinbadmaster ([#1731](https://github.com/Tencent/tdesign-vue-next/pull/1731))
 - 修复 `demo` 中弹出窗样式异常 @sinbadmaster ([#1731](https://github.com/Tencent/tdesign-vue-next/pull/1731))
- `DatePicker`: 
  - 修复 `prefixIcon` `suffixIcon` 失效问题 ([issue #1673](https://github.com/Tencent/tdesign-vue-next/issues/1673)) @HQ-Lin ([#1724](https://github.com/Tencent/tdesign-vue-next/pull/1724))
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
- `Collapse`: 修复 `content api` 不支持 ([issue #1703](https://github.com/Tencent/tdesign-vue-next/issues/1703)) @isanxia ([#1707](https://github.com/Tencent/tdesign-vue-next/pull/1707))
- `TimePicker`: 修复部分场景滚动异常无法选中 `23:59:59` 的问题 ([issue #1693]( https://github.com/Tencent/tdesign-vue-next/issues/1693)) @uyarn ([#1711](https://github.com/Tencent/tdesign-vue-next/pull/1711))
- `Steps`: 修复 `StepItem` 使用插槽渲染 `value` 属性无效的问题 @k1nz ([#1712](https://github.com/Tencent/tdesign-vue-next/pull/1712))
- `Steps`: 修复使用反转顺序 `sequence=reverse` 显示错误的问题 @k1nz ([#1712](https://github.com/Tencent/tdesign-vue-next/pull/1712))
- `Tag`: 修复 `tag` 中 `close` 事件冒泡([issue #1710](https://github.com/Tencent/tdesign-vue-next/issues/1710)) @itzj86 ([#1713](https://github.com/Tencent/tdesign-vue-next/pull/1713))
- `InputNumber`: 处理 `0` 比较的异常 ([issue #1709](https://github.com/Tencent/tdesign-vue-next/issues/1709)) @uyarn([#common850](https://github.com/Tencent/tdesign-common/pull/850)) 
### 🚧 Others
- `Collapse`: 增加单元测试用例 @isanxia ([#1707](https://github.com/Tencent/tdesign-vue-next/pull/1707))


## 🌈 0.22.0 `2022-09-19` 
### ❗ Breaking Changes
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
- `Demos`: 修复 `select-input` 示例展示 ([issue #1640](https://github.com/Tencent/tdesign-vue-next/issues/1640)) ([issue #1641](https://github.com/Tencent/tdesign-vue-next/issues/1641)) @pengYYYYY ([#1670](https://github.com/Tencent/tdesign-vue-next/pull/1670))
- `Tooltip`:  修复无法正常展示([issue #1674](https://github.com/Tencent/tdesign-vue-next/issues/1674)) @zhangpaopao0609 ([#1675](https://github.com/Tencent/tdesign-vue-next/pull/1675))
- `LiveDemo`: 修复 `Select` `LiveDemo` 问题 ([issue #1679](https://github.com/Tencent/tdesign-vue-next/issues/1679)) @k1nz ([#1684](https://github.com/Tencent/tdesign-vue-next/pull/1684))
- `table`: 延迟更新表头时使用当前表宽重新计算各列宽度 @ZTao-z ([#1691](https://github.com/Tencent/tdesign-vue-next/pull/1691))
- `Select`: 修复 `clear` 清除操作，当前会设置 `value` 为空字符串 ([issue #1678](https://github.com/Tencent/tdesign-vue-next/issues/1678)) @pengYYYYY ([#1681](https://github.com/Tencent/tdesign-vue-next/pull/1681))
- `Steps`: 修复 `Steps` 使用插槽报错不渲染的问题(issue[#802](https://github.com/Tencent/tdesign-vue-next/issues/802#issuecomment-1216272011)) @k1nz ([#1697](https://github.com/Tencent/tdesign-vue-next/pull/1697))
- `Steps`: 修复 `Steps` 生产环境 `extra` 插槽显示异常问题 @k1nz ([#1697](https://github.com/Tencent/tdesign-vue-next/pull/1697))
- `ImageViewer`: 修复键盘事件监听时机 @sinbadmaster ([#1686](https://github.com/Tencent/tdesign-vue-next/pull/1686))
- `Menu`: 修复 `menuItem` 过多时超出显示滚动条 ([issue #1249](https://github.com/Tencent/tdesign-vue-next/issues/1249)) @sinbadmaster ([#1381](https://github.com/Tencent/tdesign-vue-next/pull/1381))
- `Menu`: 平铺式侧边导航，收起菜单，三级目录不展示 ([issue #1692](https://github.com/Tencent/tdesign-vue-next/issues/1692))([issue #1571](https://github.com/Tencent/tdesign-vue-next/issues/1571)) @sinbadmaster ([#1381](https://github.com/Tencent/tdesign-vue-next/pull/1381))
- `Pagination`: `hover` 增加过渡效果 `https://github.com/Tencent/tdesign/issues/231` @zhangpaopao0609 ([#1689](https://github.com/Tencent/tdesign-vue-next/pull/1689))

### 🚧 Others
- `Build`: 修复默认导入引用文件缺失问题 @HQ-Lin ([#1685](https://github.com/Tencent/tdesign-vue-next/pull/1685))
- `Pagination`: 补充单元测试 @HelKyle ([#1690](https://github.com/Tencent/tdesign-vue-next/pull/1690))

## 🌈 0.21.1 `2022-09-15`
### 🐞 Bug Fixes
- `ToolTip`: 修复ToolTip无法正常展示的问题 @zhangpaopao0609 ([#1675](https://github.com/Tencent/tdesign-vue-next/pull/1675))

## 🌈 0.21.0 `2022-09-14` 
### ❗ Breaking Changes
- 支持 `es module` 导出不带样式产物，调整 `lib` 包内容，新增 `cjs` 产物支持 `commonjs` 导出不带样式产物 @HQ-Lin ([#1646](https://github.com/Tencent/tdesign-vue-next/pull/1646))

### 🚀 Features
- `hooks`:  优化受控与非受控 `hooks` @zhangpaopao0609 ([#1582](https://github.com/Tencent/tdesign-vue-next/pull/1582))
- `Guide`: 新增 `Guide` 引导组件 @zhangpaopao0609 ([#1540](https://github.com/Tencent/tdesign-vue-next/pull/1540))

### 🐞 Bug Fixes
- `LiveDemo`: 修复 `tree` ` live demo` 问题 @HQ-Lin ([#1628](https://github.com/Tencent/tdesign-vue-next/pull/1628))
- `Dropdown`: 修复树形结构下的 `onclick` 调用错误 @pengYYYYY ([#1647](https://github.com/Tencent/tdesign-vue-next/pull/1647))
- `Table`: 修复 `columns type` 为 `multiple` 时，设置 `className` 无效的问题 ([issue #1632](https://github.com/Tencent/tdesign-vue-next/issues/1632)) @ojhaywood ([#1633](https://github.com/Tencent/tdesign-vue-next/pull/1633))
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
  - 支持基础功能「全选」([issue #1503](https://github.com/Tencent/tdesign-vue-next/issues/1503)) @RayJason ([#1566](https://github.com/Tencent/tdesign-vue-next/pull/1566))
  - `change` 事件回掉函数增加选中 `option` 参数 ([issue #1577](https://github.com/Tencent/tdesign-vue-next/issues/1577)) @RayJason ([#1566](https://github.com/Tencent/tdesign-vue-next/pull/1566))
- `Table`: 
  - 树形结构，新增 `getTreeExpandedRow`，用于获取展开的树形节点 @chaishi ([#1591](https://github.com/Tencent/tdesign-vue-next/pull/1591))
  -  可编辑单元格，`edit.rules` 新增数据类型 `function`，用于动态设置校验规则，[#1472](https://github.com/Tencent/tdesign-vue-next/issues/1472) @chaishi ([#1591](https://github.com/Tencent/tdesign-vue-next/pull/1591))
- `Popup`: 增加 `delay` prop @ikeq ([#1568](https://github.com/Tencent/tdesign-vue-next/pull/1568))
- `Loading`: 实现自定义指令 `v-loading`，支持 `fullscreen` `inheritColor` 修饰符 ([issue #1486](https://github.com/Tencent/tdesign-vue-next/issues/1486)) @zhangpaopao0609 ([#1579](https://github.com/Tencent/tdesign-vue-next/pull/1579))
- `ImageViewer`: 增加 `ImageViewer` 组件 ([issue 1402](https://github.com/Tencent/tdesign-vue-next/issues/1402)) @sinbadmaster ([#1516](https://github.com/Tencent/tdesign-vue-next/pull/1516))
- `GlobalConfig`: 主题配置新增圆角面板 支持圆角配置 @mingrutough1 @uyarn  @uyarn ([#1606](https://github.com/Tencent/tdesign-vue-next/pull/1606))
- `Button`: 增加 `tag` 和 `herf` 属性 @pengYYYYY ([#1597](https://github.com/Tencent/tdesign-vue-next/pull/1597))
- `Form`: 添加 `whitespace` 校验默认错误信息 @k1nz ([#1567](https://github.com/Tencent/tdesign-vue-next/pull/1567))

### 🐞 Bug Fixes
- `Cascader`: 
  - 修复 `value` 为 `number` 类型时有告警 ([issue #1570](https://github.com/Tencent/tdesign-vue-next/issues/1570)) @Lmmmmmm-bb ([#1593](https://github.com/Tencent/tdesign-vue-next/pull/1593))
  - 修复 `loadingText` 无效 ([issue #1555](https://github.com/Tencent/tdesign-vue-next/issues/1555)) @pengYYYYY ([#1601](https://github.com/Tencent/tdesign-vue-next/pull/1601))
  - 修复多选状态下点击 `label` 展开子级表现异常 @pengYYYYY ([#1601](https://github.com/Tencent/tdesign-vue-next/pull/1601))
- `DatePicker`: 
  - 修复 `cell-click` 事件失效问题 @HQ-Lin ([#1544](https://github.com/Tencent/tdesign-vue-next/pull/1544))
  - 修复空字符串页面崩溃问题 @HQ-Lin ([#1590](https://github.com/Tencent/tdesign-vue-next/pull/1590))
- `Tabs`: 修复 `addable` 添加按钮定位错误 @HelKyle ([#1553](https://github.com/Tencent/tdesign-vue-next/pull/1553))
- `Select`: 修复 `creatable` 模式下的 `filter` 能力 @skytt ([#1550](https://github.com/Tencent/tdesign-vue-next/pull/1550))
- `InputNumber`: 修复 `number` 类型校验 `bug` @Lmmmmmm-bb ([#1548](https://github.com/Tencent/tdesign-vue-next/pull/1548))
- `Checkbox`: 修复全选时可以选中已禁用选项的问题 @RayJason ([#1554](https://github.com/Tencent/tdesign-vue-next/pull/1554))
- `Tree`: `setData` 支持 `keys` 别名 ([issue #1513](https://github.com/Tencent/tdesign-vue-next/issues/1513)) @zhangpaopao0609 ([#1559](https://github.com/Tencent/tdesign-vue-next/pull/1559))
- `Popup`: 修复子 `popup` 销毁时父级意外关闭 @ikeq ([#1568](https://github.com/Tencent/tdesign-vue-next/pull/1568))
- `Swiper`:  修复动态渲染问题 ([issue #1558](https://github.com/Tencent/tdesign-vue-next/issues/1558)) @btea ([#1580](https://github.com/Tencent/tdesign-vue-next/pull/1580))
- `Table`: 修复表格部分元素无法随 table 变化而变化，如：空数据，[tdesign-react#1319](https://github.com/Tencent/tdesign-react/issues/1319) @chaishi ([#1591](https://github.com/Tencent/tdesign-vue-next/pull/1591))
- `Button`: 修复 `button` `loading` 状态的样式问题 @uyarn ([#1610](https://github.com/Tencent/tdesign-vue-next/pull/1610))
- `TimePicker`: 修复部分设备滚动边界的跳动异常 ([issue #1012](https://github.com/Tencent/tdesign-vue-next/issues/1012)) @uyarn ([#1618](https://github.com/Tencent/tdesign-vue-next/pull/1618))
- `Tabs`: 修复 `addable` 添加按钮定位错误 @HelKyle ([#1553](https://github.com/Tencent/tdesign-vue-next/pull/1553))
- `LiveDemo`: 修复`slider` 垂直布局预览问题 (issue 1600[](https://github.com/Tencent/tdesign-vue-next/issues/1600)) @wbxl2000 ([#1603](https://github.com/Tencent/tdesign-vue-next/pull/1603))
### 🚧 Others
- `Jumper`: 增加单元测试 @Lmmmmmm-bb ([#1569](https://github.com/Tencent/tdesign-vue-next/pull/1569))


## 🌈 0.20.3 `2022-08-30` 
### 🚀 Features
- `DatePicker`: 优化不设置 `valueType` 场景下与 `format` 一致 @HQ-Lin ([#1525](https://github.com/Tencent/tdesign-vue-next/pull/1525))
- `Table`: 文本超出提示由 `Popup` 更为 `Tooltip`，以便于定制各种提示文本主题色 @PDieE ([#1497](https://github.com/Tencent/tdesign-vue-next/pull/1497))
- `Swiper`: 增加 `dots` 和 `dots-bar` 样式 ([issue #1162](https://github.com/Tencent/tdesign-vue-next/issues/1162)) @LeoEatle ([#1498](https://github.com/Tencent/tdesign-vue-next/pull/1498))
- `Grid`：`align` 可选值新增 `start/end/center` 等 @Micro-sun ([#1532](https://github.com/Tencent/tdesign-vue-next/pull/1532))

### 🐞 Bug Fixes
- `Table`: 
  - 修复了`editableCellState` 表现与预期相反的问题 @sechi747 ([#1489](https://github.com/Tencent/tdesign-vue-next/pull/1489))
  - 允许在表头分割线一定范围内触发列宽调整逻辑 @ZTao-z ([#1522](https://github.com/Tencent/tdesign-vue-next/pull/1522))
- `Cascader`:  
  - 修复单选模式下 `clearIcon`无法删除 @Lmmmmmm-bb ([#1524](https://github.com/Tencent/tdesign-vue-next/pull/1524))
  - 修复在输入时 `entry` 键会默认全选第一个选项的全部内容 ([issue #1529](https://github.com/Tencent/tdesign-vue-next/issues/1529)) @pengYYYYY ([#1534](https://github.com/Tencent/tdesign-vue-next/pull/1534))
  - 修复通过 `SelectInputProps ` 透传方法属性导致传入 `SelectInput` 的数据变成的数组 ([issue #1502](https://github.com/Tencent/tdesign-vue-next/issues/1502)) @pengYYYYY ([#1534](https://github.com/Tencent/tdesign-vue-next/pull/1534))
- `RangeInput`: 修正`RangeInput`右侧图标没有居中对齐的问题([issue #1506](https://github.com/Tencent/tdesign-vue-next/issues/1506)) @PDieE ([#1509](https://github.com/Tencent/tdesign-vue-next/pull/1509))
- `DatePicker`: 修复了 `TExtraContent` 组件中的 `selectedValue Props` 定义不正确的问题 ([#1508 ](https://github.com/Tencent/tdesign-vue-next/issues/1508)) @sechi747 ([#1511](https://github.com/Tencent/tdesign-vue-next/pull/1511))
- `Dialog`: 非模态对话框优化拖拽事件鼠标表现 ([#1452](https://github.com/Tencent/tdesign-vue-next/issues/1452)) @huoyuhao ([#1474](https://github.com/Tencent/tdesign-vue-next/pull/1474))

- `Popup`: 修复 `overlayInnerStyle ` 未监听变化，增强 `container` 健壮性 ([issue #1442](https://github.com/Tencent/tdesign-vue-next/issues/1442)) @pengYYYYY ([#1534](https://github.com/Tencent/tdesign-vue-next/pull/1534))
- `InputNumber`: 修复 `string` 与 `number` 比较错误及其导致的分页组件样式异常的问题 ([common#784](https://github.com/Tencent/tdesign-common/pull/784)) @uyarn ([#1537](https://github.com/Tencent/tdesign-vue-next/pull/1537))
- `Popconfirm`: `Popconfirm` 样式优化 @zhangpaopao0609 ([#1519](https://github.com/Tencent/tdesign-vue-next/pull/1519))
- `Input`: 修正 `clearable` 和 `password` 模式的预览按钮无法同时存在的问题 @PDieE ([#1518](https://github.com/Tencent/tdesign-vue-next/pull/1518))

## 🌈 0.20.2 `2022-08-23` 
### 🚀 Features
- `Table`: 
   - 支持行拖拽排序和列拖拽排序同时存在，([issue#1290](https://github.com/Tencent/tdesign-vue/issues/1290)) @chaishi ([#1467](https://github.com/Tencent/tdesign-vue-next/pull/1467))
   - 行展开功能，新增事件参数 `currentRowData`，表示当前展开行 @chaishi ([#1467](https://github.com/Tencent/tdesign-vue-next/pull/1467))
   - 可编辑单元格/行功能，新增 `editableCellState` 用于控制单元格是否可编辑，([issue#1387](https://github.com/Tencent/tdesign-vue-next/issues/1387)) @chaishi ([#1467](https://github.com/Tencent/tdesign-vue-next/pull/1467))
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
   - 修复窗口变化时，固定列阴影未更新问题 ([issue #1289](https://github.com/Tencent/tdesign-vue/issues/1289)) @chaishi ([#1439](https://github.com/Tencent/tdesign-vue-next/pull/1439))
   - 修复行选中功能，多选，分页数据异步加载，`onSelectChange` 参数 `selectedRowData` 数据不完整问题，表示当前展开行，([issue#1364](https://github.com/Tencent/tdesign-vue-next/issues/1364)) @chaishi ([#1467](https://github.com/Tencent/tdesign-vue-next/pull/1467))
   - 修复可编辑行，联动数据校验问题，([issue#1444](https://github.com/Tencent/tdesign-vue-next/issues/1444)) @chaishi ([#1467](https://github.com/Tencent/tdesign-vue-next/pull/1467))
- `Tree`: 
   - `tree` 可选时 `onActive` 失效 ([issue #1409](https://github.com/Tencent/tdesign-vue-next/issues/1409)) @zhangpaopao0609 ([#1453](https://github.com/Tencent/tdesign-vue-next/pull/1453))
   - 修正 `setItem` 无法正确 展开，高亮，选中节点 ([issue #1428](https://github.com/Tencent/tdesign-vue-next/issues/1428)) @PDieE ([#1465](https://github.com/Tencent/tdesign-vue-next/pull/1465))
- `Cascader`: 
   - 修复异步获取 `options` 后的懒加载无效 ([issue #1448](https://github.com/Tencent/tdesign-vue-next/issues/1448)) ([issue #1223](https://github.com/Tencent/tdesign-vue/issues/1223)) @pengYYYYY ([#1471](https://github.com/Tencent/tdesign-vue-next/pull/1471))
   - 修复 `value` 不是 `options` 的健值会报错 ([issue #1293](https://github.com/Tencent/tdesign-react/issues/1293)) @pengYYYYY ([#1471](https://github.com/Tencent/tdesign-vue-next/pull/1471))
- `InputNumber`: 修复数字精度问题 @chaishi ([#1412](https://github.com/Tencent/tdesign-vue-next/pull/1412))
- `Transfer`: `Transfer` 与 `Tree` 结合使用时，当 children 为空数组时，应当展示父节点 ([issue #1366](https://github.com/Tencent/tdesign-vue-next/issues/1366)) @zhangpaopao0609 ([#1438](https://github.com/Tencent/tdesign-vue-next/pull/1438))
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
- `Menu`: 修复下拉样式问题 ([issue #1429](https://github.com/Tencent/tdesign-vue-next/issues/1429)) @HQ-Lin ([#1431](https://github.com/Tencent/tdesign-vue-next/pull/1431))
- `DatePicker`: 修复有值时面板切换失效问题 @HQ-Lin ([#1425](https://github.com/Tencent/tdesign-vue-next/pull/1425))

## 🌈 0.20.0 `2022-08-15` 
### ❗️ BREAKING CHANGES
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
  - 可编辑单元格，多选和日期选择，点击下拉浮层中的内容会导致退出编辑，[tdesign-vue-next#issue1384](https://github.com/Tencent/tdesign-vue-next/issues/1384) @chaishi ([#1392](https://github.com/Tencent/tdesign-vue-next/pull/1392))
  - 列宽度和小于表宽的情况下，调整列宽的结果与预期不符 @ZTao-z ([#1406](https://github.com/Tencent/tdesign-vue-next/pull/1406))
  - 宽度计算函数添加注释 @ZTao-z ([#1413](https://github.com/Tencent/tdesign-vue-next/pull/1413))
  - 列宽度和小于表宽的情况下，调整列宽的结果与预期不符 @ZTao-z ([#1406](https://github.com/Tencent/tdesign-vue-next/pull/1406))
- `Menu`:
  - 修复在 `nuxt3` 里面鼠标悬浮或者点击子菜单不出现 元素代码里面出现一瞬间就消失了 ([issue #937](https://github.com/Tencent/tdesign-vue-next/issues/937)) @zhangpaopao0609 ([#1400](https://github.com/Tencent/tdesign-vue-next/pull/1400))
  - `t-menu-item` 大于 `8` 个将会溢出 @zhangpaopao0609 ([#1377](https://github.com/Tencent/tdesign-vue-next/pull/1377))
- `Tabs`: 修复 `Tabs` 选项卡在 `nuxt3 ssr` 应用中报错 `window is not defined` ([issue #1262](https://github.com/Tencent/tdesign-vue-next/issues/1262)) @zhangpaopao0609 ([#1398](https://github.com/Tencent/tdesign-vue-next/pull/1398))
- `SelectInput`:
  - 修复属性 `props.readonly = true` 或 `props.allowInput = false` 时，仍会调用 `onBlur` 的问题 @k1nz ([#1351](https://github.com/Tencent/tdesign-vue-next/pull/1351))
  -修复当 `readonly` 或 `disabled` 属性为  `true` 、表单禁用时， `clearable` 按钮可以点击的问题 ([issue#1365](https://github.com/Tencent/tdesign-vue-next/issues/1365)) @k1nz ([#1351](https://github.com/Tencent/tdesign-vue-next/pull/1351))
  - 修复同时开启 `readonly` 和 `allowInput` 属性时，可以输入的问题 @k1nz ([#1351](https://github.com/Tencent/tdesign-vue-next/pull/1351))
  - 修复在 `Form` 组件中使用禁用态表单不生效的问题 @k1nz ([#1351](https://github.com/Tencent/tdesign-vue-next/pull/1351))
  - 修复外部传入 `style` 无法透传到 `Input` ([issue #1385](https://github.com/Tencent/tdesign-vue-next/issues/1385)) @pengYYYYY ([#1416](https://github.com/Tencent/tdesign-vue-next/pull/1416))
- `Select`:
  - 修复属性 `props.readonly = true` 或 `props.filterable = false` 时，仍会调用 `onBlur` 的问题 @k1nz ([#1351](https://github.com/Tencent/tdesign-vue-next/pull/1351))
  - 修复当 `readonly` 或 `disabled` 属性为 `true` 、表单禁用时， `clearable` 按钮可以点击的问题 ([issue#1365](https://github.com/Tencent/tdesign-vue-next/issues/1365)) @k1nz ([#1351](https://github.com/Tencent/tdesign-vue-next/pull/1351))
  - 修复同时开启 `readonly` 和 `filterable` 属性时，可以输入的问题 @k1nz ([#1351](https://github.com/Tencent/tdesign-vue-next/pull/1351))
- `DatePicker`: 修复下拉样式问题  @HQ-Lin ([#1397](https://github.com/Tencent/tdesign-vue-next/pull/1397))
- `Input`: 修复在表单禁用时， `clearable` 按钮可以点击的问题 ([issue#1365](https://github.com/Tencent/tdesign-vue-next/issues/1365)) @k1nz ([#1351](https://github.com/Tencent/tdesign-vue-next/pull/1351))
- `Cascader`: 修复在表单禁用时， `clearable` 按钮可以点击的问题 ([issue#1365](https://github.com/Tencent/tdesign-vue-next/issues/1365)) @k1nz ([#1351](https://github.com/Tencent/tdesign-vue-next/pull/1351))
- `Popup`: 修复嵌套使用点击 `trigger` 元素时异常关闭 ([issue #1227](https://github.com/Tencent/tdesign-vue-next/issues/1227)) @ikeq ([#1419](https://github.com/Tencent/tdesign-vue-next/pull/1419))
- `Transfer`: 穿梭框 `checked` 和 `value` 的值不在 `data` 时会报错 ([issue #1404](https://github.com/Tencent/tdesign-vue-next/issues/1404)) @pengYYYYY ([#1416](https://github.com/Tencent/tdesign-vue-next/pull/1416))
- `Upload`: `size-limit ` 使用 `MB` 以上单位时校验错误 ([issue #1386](https://github.com/Tencent/tdesign-vue-next/issues/1386)) @pengYYYYY ([#1416](https://github.com/Tencent/tdesign-vue-next/pull/1416))
- `Dialog`: 对话框 `footer` 不显示情况下，`body padding` 与 `dialog padding` 冲突 ([issue #1380](https://github.com/Tencent/tdesign-vue-next/issues/1380)) @pengYYYYY ([#1416](https://github.com/Tencent/tdesign-vue-next/pull/1416))
- `Tree`: 组件实例方法 `setItem` 参数错误 ([issue #1410](https://github.com/Tencent/tdesign-vue-next/issues/1410)) @pengYYYYY ([#1416](https://github.com/Tencent/tdesign-vue-next/pull/1416))
- `InputNumber`: 修复无法触发 `onEnter` 方法 ([issue #1396](https://github.com/Tencent/tdesign-vue-next/issues/1396)) ([issue #1352](https://github.com/Tencent/tdesign-vue-next/issues/1352)) @pengYYYYY ([#1416](https://github.com/Tencent/tdesign-vue-next/pull/1416))
- `Nuxt3`: 修复因 `nuxt3` 将 `global `作为关键词，编译为 `globalThis` 导致的组件运行错误 ([issue #1388](https://github.com/Tencent/tdesign-vue-next/issues/1388)) ([issue #1361](https://github.com/Tencent/tdesign-vue-next/issues/1361))([issue #988](https://github.com/Tencent/tdesign-vue-next/issues/988)) @zhangpaopao0609 ([#1401](https://github.com/Tencent/tdesign-vue-next/pull/1401))

## 🌈 0.19.1 `2022-08-09` 
### 🚀 Features
- `DatePicker`: 支持周、季度选择器 @HQ-Lin ([#1336](https://github.com/Tencent/tdesign-vue-next/pull/1336))
- `Pagination`: 极简模式下合并快速跳转与页码跳转控制器 @HQ-Lin ([#1359](https://github.com/Tencent/tdesign-vue-next/pull/1359))
- `Style`: 新增字体相关 `CSS Token`，支持通过 `CSS Token` 修改字体相关配置 具体请参考 [font tokens](https://github.com/Tencent/tdesign-common/blob/develop/style/web/theme/_font.less) @uyarn ([#1358](https://github.com/Tencent/tdesign-vue-next/pull/1358))
- `Textarea`: 增加 `focus` 和 `blur` 实例方法 @timi137137 ([#1349](https://github.com/Tencent/tdesign-vue-next/pull/1349))
- `Input`: 增加 `focus` 和 `blur` 实例方法 @timi137137 ([#1349](https://github.com/Tencent/tdesign-vue-next/pull/1349))
- `Table`: 
  - 支持使用插槽 `footer-summary` 定义通栏表尾，同时支持同名属性 Props `footer-summary` 渲染通栏表尾 @chaishi ([#1357](https://github.com/Tencent/tdesign-vue-next/pull/1357))
  - 由于表格支持定义多行表尾，因而本次支持使用 `rowspanAndColspanInFooter` 定义表尾行数据合并单元格，使用方法同 `rowspanAndColspan`，[issue#1047](https://github.com/Tencent/tdesign-vue-next/issues/1047) @chaishi ([#1357](https://github.com/Tencent/tdesign-vue-next/pull/1357))  
  - 支持 `min-width` 透传到元素 `<col>`，[issues#708](https://github.com/Tencent/tdesign-vue/issues/708) @chaishi ([#1357](https://github.com/Tencent/tdesign-vue-next/pull/1357))
  - 新增 `cellEmptyContent`，当列数据为空时显示指定值，[issues#1320](https://github.com/Tencent/tdesign-vue-next/issues/1320) @chaishi ([#1357](https://github.com/Tencent/tdesign-vue-next/pull/1357))
  - 可编辑行功能，新增实例方法 `validate`，支持校验表格内的全部数据，[issue#1341](https://github.com/Tencent/tdesign-vue-next/issues/1341) @chaishi ([#1357](https://github.com/Tencent/tdesign-vue-next/pull/1357))
### 🐞 Bug Fixes
- `Table`: 
  - 修复深色模式下垂直和水平方向滚动条交汇处出现白点的样式问题 by @RayJason @uyarn ([#1358](https://github.com/Tencent/tdesign-vue-next/pull/1358))
  - 行选中会触发重置列宽调整的结果 @chaishi ([#1357](https://github.com/Tencent/tdesign-vue-next/pull/1357))
  - 可编辑行功能，提交校验时只校验了第一列，[issue#1339](https://github.com/Tencent/tdesign-vue-next/issues/1339) @chaishi ([#1357](https://github.com/Tencent/tdesign-vue-next/pull/1357))
  - 列配置功能，带边框模式，移除分页组件边框下方多余的边框 @chaishi ([#1357](https://github.com/Tencent/tdesign-vue-next/pull/1357))
- `Menu`:  使用 `relatedTarget` 标准属性兼容浏览器差异，修复在火狐浏览器无法收起的问题 ([issue #1312](https://github.com/Tencent/tdesign-vue-next/issues/1312)), ([issue #1243](https://github.com/Tencent/tdesign-vue-next/issues/1243)) ([issue #1198](https://github.com/Tencent/tdesign-vue-next/issues/1198)) @sinbadmaster ([#1345](https://github.com/Tencent/tdesign-vue-next/pull/1345))
- `ColorPicker`: 优化更新 `color-picker` 组件样式 @S-mohan ([#1346](https://github.com/Tencent/tdesign-vue-next/pull/1346))
- `Dialog`: 修复 `confirm-btn` 类型问题 ([issue #1347](https://github.com/Tencent/tdesign-vue-next/issues/1347)) @pengYYYYY ([#1363](https://github.com/Tencent/tdesign-vue-next/pull/1363))
- `Dropdown`: 修复 `popupElem` 为空时的组件内部报错 ([issue #1344](https://github.com/Tencent/tdesign-vue-next/issues/1344)) @pengYYYYY ([#1363](https://github.com/Tencent/tdesign-vue-next/pull/1363))
- `TagInput`: 修复 `taginput` 空值时缺失 `padding` 的问题 @uyarn  @pengYYYYY ([#1363](https://github.com/Tencent/tdesign-vue-next/pull/1363))

## 🌈 0.19.0 `2022-08-03` 

### ❗️ BREAKING CHANGES
- 调整全局 `border-radius` 样式 token，`@border-radius` 改名为 `@border-radius-default`，支持更多圆角 `token`。 使用 `esm` 包修改 `less token` 的业务需要注意 @mingrutough1 [common #666](https://github.com/Tencent/tdesign-common/pull/666)，组件库中各组件实现圆角也做了统一调整，详情参见 https://github.com/Tencent/tdesign/discussions/158

### 🚀 Features
- `SelectInput`: `SelectInput` 及相关的 `Select/Cascader/TreeSelect` 组件交互调整，再次点击输入框时也可以收起下拉框。 @xiaosansiji ([#1299](https://github.com/Tencent/tdesign-vue-next/pull/1299))
- `Upload`: 增加 `setPercent ` 实例方法用于满足自定义上传方法时设置上传进度([issue #1266](https://github.com/Tencent/tdesign-vue-next/issues/1266)) @pengYYYYY ([#1331](https://github.com/Tencent/tdesign-vue-next/pull/1331))
### 🐞 Bug Fixes
- `Table`:
  - 树形结构，展开全部功能，默认不应该展开懒加载节点 @chaishi ([#1307](https://github.com/Tencent/tdesign-vue-next/pull/1307))
  - 多级表头，表尾列显示异常 @chaishi ([#1307](https://github.com/Tencent/tdesign-vue-next/pull/1307))
  - 吸顶的多级表头，左侧边线缺失问题 @chaishi ([#1307](https://github.com/Tencent/tdesign-vue-next/pull/1307))
- `Dialog`: 删除冗余的样式 @huoyuhao ([#1305](https://github.com/Tencent/tdesign-vue-next/pull/1305))
- `Cascader`: 修复在异步获取 `option` 的情况下，参数校验导致用户行为异常 @pengYYYYY ([#1317](https://github.com/Tencent/tdesign-vue-next/pull/1317))
- `Popup`: 修复 `content` 为纯英文时无法自动换行  ([issue #1318](https://github.com/Tencent/tdesign-vue-next/issues/1318)) @pengYYYYY ([#1317](https://github.com/Tencent/tdesign-vue-next/pull/1317))
- `Tree`: 修复 `setData` 组件存在 `children` 后的导致组件崩溃 @ardor-zhang ([#657](https://github.com/Tencent/tdesign-common/pull/657))
- `Tabs`:
  - 修复 `tabpanel` 组件的 `label` 不能根据函数进行自定义展示 ([issue #1311](https://github.com/Tencent/tdesign-vue-next/issues/1311)) @pengYYYYY ([#1331](https://github.com/Tencent/tdesign-vue-next/pull/1331))
  - 修复组合场景下的示例 @LAWTED ([#1334](https://github.com/Tencent/tdesign-vue-next/pull/1334))
- `Upload`: 修复 ` draggable` 和 `multiple` 组合使用时组件无输出([issue #1326](https://github.com/Tencent/tdesign-vue-next/issues/1326)) @pengYYYYY ([#1331](https://github.com/Tencent/tdesign-vue-next/pull/1331))
- `ClassPrefix`：替换遗漏的 `classprefix` @uyarn ([#1300](https://github.com/Tencent/tdesign-vue-next/pull/1300))
### 🚧 Others
- `Table`: 修复 `validateRowDate` 拼写错误到 `validateRowData`  ([issue #1321](https://github.com/Tencent/tdesign-vue-next/issues/1321)) @pengYYYYY ([#1317](https://github.com/Tencent/tdesign-vue-next/pull/1317))

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
- `Form`: 修复 `help` 插槽不生效的问题([issue #1267](https://github.com/Tencent/tdesign-vue-next/issues/1267)) @k1nz ([#1272](https://github.com/Tencent/tdesign-vue-next/pull/1272))
- `Dialog`: 修复 `preventScrollThrough` 为 `false` 情况下，`body` 间去了滚动条宽度 @huoyuhao ([#1261](https://github.com/Tencent/tdesign-vue-next/pull/1261))
- `Table`: 树形结构，懒加载节点重置时（即调用 `setData`）没有清空子节点信息问题 @chaishi ([#1278](https://github.com/Tencent/tdesign-vue-next/pull/1278))
- `Card`: 修复 `loading` 状态无效 ([issue #1259](https://github.com/Tencent/tdesign-vue-next/issues/1259)) @pengYYYYY ([#1275](https://github.com/Tencent/tdesign-vue-next/pull/1275))
- `Space`: 组件中若存在 `v-if`，则不渲染的组件间距依然存在 ([issue #1259](https://github.com/Tencent/tdesign-vue-next/issues/1255)) @pengYYYYY ([#1275](https://github.com/Tencent/tdesign-vue-next/pull/1275))
- `InputNumber`: 修复初始化为 `undefined` 情况下操作按钮 `disabled` 的校验问题  ([issue #1291](https://github.com/Tencent/tdesign-vue-next/issues/1291)) @pengYYYYY ([#1275](https://github.com/Tencent/tdesign-vue-next/pull/1275))
- `Radio`: 修复点击选择父盒子点击事件触发两次 ([issue #1259](https://github.com/Tencent/tdesign-vue-next/issues/1240)) @pengYYYYY ([#1275](https://github.com/Tencent/tdesign-vue-next/pull/1275))
- `Select`: 修复`autowidth` 无效 ([issue #1226](https://github.com/Tencent/tdesign-vue-next/issues/1226)) @pengYYYYY ([#1280](https://github.com/Tencent/tdesign-vue-next/pull/1280))
## 🌈 0.18.0 `2022-07-18` 
### ❗ Breaking Changes
- `Table`:  
  - 可编辑表格行，行校验函数由 `validateRowDate` 更名为 `validateRowData` @chaishi ([#1219](https://github.com/Tencent/tdesign-vue-next/pull/1219))
### 🚀 Features
- `Table`:
  - 树形结构，支持同时添加多个根节点 @chaishi ([#1219](https://github.com/Tencent/tdesign-vue-next/pull/1219))
  - 可选中行，扩大选择组件的点击范围 @chaishi ([#1232](https://github.com/Tencent/tdesign-vue-next/pull/1232))
  - 拖拽调整宽度，非边框模式，悬浮到表头时，显示表头边框 @chaishi ([#1232](https://github.com/Tencent/tdesign-vue-next/pull/1232))
### 🐞 Bug Fixes
- `Table`: 
  - 修复可编辑单元格，校验失败的信息无法清除问题，([issue #1228](https://github.com/Tencent/tdesign-vue-next/issues/1228)) @chaishi ([#1219](https://github.com/Tencent/tdesign-vue-next/pull/1219))
  - 树形结构，修复树形结构懒加载顺序问题，([issue #1122](https://github.com/Tencent/tdesign-vue-next/issues/1122)) @chaishi ([#1219](https://github.com/Tencent/tdesign-vue-next/pull/1219))
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
  - 修复 `autowidth` 表现异常 ([issue #1212](https://github.com/Tencent/tdesign-vue-next/issues/1212)) @pengYYYYY ([#1216](https://github.com/Tencent/tdesign-vue-next/pull/1216))
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
  - 修复打开对话框，出现滚动条([#1163](https://github.com/Tencent/tdesign-vue-next/issues/1163)) @pengYYYYY ([#1161](https://github.com/Tencent/tdesign-vue-next/pull/1161))
  - 内部样式未使用 `prefix` 导致替换前缀方式的样式丢失 @uyarn ([#1191](https://github.com/Tencent/tdesign-vue-next/pull/1191))
- `Slider`:
  - 修复 `label` 属性不生效 `bug` @ChrisLee0211 ([#1184](https://github.com/Tencent/tdesign-vue-next/pull/1184))
  - 修复 `tooltipProps` 为布尔值时丢失响应性问题 @ChrisLee0211 ([#1184](https://github.com/Tencent/tdesign-vue-next/pull/1184))
- `Space`: 通过FOR循环的内容 没有实现间隔效果 ([issue #1084](https://github.com/Tencent/tdesign-vue-next/issues/1084)) @pengYYYYY ([#1156](https://github.com/Tencent/tdesign-vue-next/pull/1156))
- `DatePicker`: 修复日期格式化问题 @HQ-Lin ([#1164](https://github.com/Tencent/tdesign-vue-next/pull/1164))
- `TimePicker`: 优化可输入模式的使用体验 避免高频输入场景与滚动事件重复更新 `value` 的异常 @uyarn ([#1169](https://github.com/Tencent/tdesign-vue-next/pull/1169))
- `Tree`: 取消修改 `value` 类型, 将传入 `TCheckBox` 组件的 `name` 转为 `string` 类型 @sufuwang ([#1172](https://github.com/Tencent/tdesign-vue-next/pull/1172))
- `Cascader`: 修复筛选无法输入问题 @pengYYYYY ([#1161](https://github.com/Tencent/tdesign-vue-next/pull/1161))
- `DatePicker`: 优化面板月份展示 @HQ-Lin ([#1180](https://github.com/Tencent/tdesign-vue-next/pull/1180))
- `Transfer`: 全选应该只选择搜索后的结果 @btea ([#1177](https://github.com/Tencent/tdesign-vue-next/pull/1177))
- `Select`: 多选下 `hover` 出现换行的异常 @uyarn ([#1191](https://github.com/Tencent/tdesign-vue-next/pull/1191))
- `Input`: `autoWidth` 在部分场景下失效导致组件样式异常 @uyarn ([#1191](https://github.com/Tencent/tdesign-vue-next/pull/1191))
- `Drawer`: 修复开启 `destroyOnClose` 之后，没了动画效果 ([issue #1176](https://github.com/Tencent/tdesign-vue-next/issues/1176)) @pengYYYYY ([#1185](https://github.com/Tencent/tdesign-vue-next/pull/1185))
- `TreeSelect`: 修复异步加载回显展示问题 @Godlike-meteor ([#1194](https://github.com/Tencent/tdesign-vue-next/pull/1194))
- `Textarea`: 修复无法传入 `attrs` 中的 `style` @sinbadmaster ([#1179](https://github.com/Tencent/tdesign-vue-next/pull/1179))

## 🌈 0.17.3 `2022-07-04` 
### 🚀 Features
- `Table`:
  - 可编辑单元格，支持编辑组件联动， [issue#995](https://github.com/Tencent/tdesign-react/issues/995) @chaishi ([#1137](https://github.com/Tencent/tdesign-vue-next/pull/1137))
  - 形结构支持半选状态 @chaishi ([#1142](https://github.com/Tencent/tdesign-vue-next/pull/1142))
- `Form`: 添加内置校验方法 `whitespace` @timi137137 ([#1110](https://github.com/Tencent/tdesign-vue-next/pull/1110))
- `Jumper`: 新增 `jumper` 组件 @HQ-Lin ([#1104](https://github.com/Tencent/tdesign-vue-next/pull/1104))
### 🐞 Bug Fixes
- `Table`:
  - 表头吸顶显示问题 @chaishi ([#1102](https://github.com/Tencent/tdesign-vue-next/pull/1102))
  - `paginationAffixedBottom` 支持配置 Affix 组件全部特性 @chaishi ([#1102](https://github.com/Tencent/tdesign-vue-next/pull/1102))
  - 修复动态数据合并元格问题，[issue#1070](https://github.com/Tencent/tdesign-vue-next/issues/1070) @chaishi ([#1135](https://github.com/Tencent/tdesign-vue-next/pull/1135))
  - 修复树形结构设置 `indent = 0` 无效问题，[issue#909](https://github.com/Tencent/tdesign-vue-next/issues/909) @chaishi ([#1135](https://github.com/Tencent/tdesign-vue-next/pull/1135))
- `DatePicker`:
  - 修复 `Jumper` 组件类名错误 @HQ-Lin ([#1085](https://github.com/Tencent/tdesign-vue-next/pull/1085))
  - 修复日期选择器在表单禁用后还能点击的问题 @timi137137 ([#1117](https://github.com/Tencent/tdesign-vue-next/pull/1117))
- `Dialog`:
  - 修复 `closeOnOverlayClick` `closeOnEscKeydown` 默认值导致的无法设置的问题 ([#1096 ](https://github.com/Tencent/tdesign-vue-next/issues/1100)) @pengYYYYY ([#1101](https://github.com/Tencent/tdesign-vue-next/pull/1101))
  - 修复滚动失效问题  @HQ-Lin ([#1130](https://github.com/Tencent/tdesign-vue-next/pull/1130))
- `Select`:
  - 修复多选下换行提前占满一行的问题 @uyarn ([#1143](https://github.com/Tencent/tdesign-vue-next/pull/1143))
  - 修复 `input` 高度 `height 100%` 导致换行高度异常的问题 @uyarn ([#1143](https://github.com/Tencent/tdesign-vue-next/pull/1143))
- `Upload`: 在每次上传前将错误提示数据重置 @sinbadmaster ([#1103](https://github.com/Tencent/tdesign-vue-next/pull/1103))
- `RadioGroup`: 修复 `RadioGroup` 多次赋予不存在的值时文字不能正常显示 @timi137137 ([#1109](https://github.com/Tencent/tdesign-vue-next/pull/1109))
- `Drawer`: 修复 `closeOnOverlayClick` `closeOnEscKeydown` 默认值导致的无法设置的问题 ([#1097 ](https://github.com/Tencent/tdesign-vue-next/issues/1100)) @pengYYYYY ([#1101](https://github.com/Tencent/tdesign-vue-next/pull/1101))
- `Tree`: `getRightData` 方法兼容 `value` 的 `alias`  @sufuwang ([#1118](https://github.com/Tencent/tdesign-vue-next/pull/1118))
- `Form`: 修复不传 `form.onSubmit` 回调函数导致的 `scrollToFirstError` 参数失效的问题 @k1nz ([#1120](https://github.com/Tencent/tdesign-vue-next/pull/1120))
- `DatePicker`: 修复 `clearble` 响应式问题 @HQ-Lin ([#1124](https://github.com/Tencent/tdesign-vue-next/pull/1124))
- `Slider`: 使用 `InputNumber` 时在使用 `range` 属性情况下传入 `min` 或 `max` 会导致手动输入显示 `NaN` 问题 @ChrisLee0211 ([#1136](https://github.com/Tencent/tdesign-vue-next/pull/1136))
- `Pagination`: 修复如果页面总数变更后当前页数不变的问题 @timi137137 ([#1147](https://github.com/Tencent/tdesign-vue-next/pull/1147))
- `RangeInput`: 修复 `rangeinput` 样式问题 @HQ-Lin ([#1123](https://github.com/Tencent/tdesign-vue-next/pull/1123))


## 🌈 0.17.2 `2022-06-28` 
### 🐞 Bug Fixes
- `ClassPrefix`: 未使用 `classPrefix` 的节点修复 ([#1091](https://github.com/Tencent/tdesign-vue-next/issues/1091)) @pengYYYYY ([#1092](https://github.com/Tencent/tdesign-vue-next/pull/1092))
- `Input`: `type=number` 支持 `maxlength` 限制输入长度 @sinbadmaster ([#1088](https://github.com/Tencent/tdesign-vue-next/pull/1088))
- `Select`: 修复 `options` 属性 `disabled` 禁用选项不起作用 ([#1093](https://github.com/Tencent/tdesign-vue-next/issues/1093)) @pengYYYYY ([#1094](https://github.com/Tencent/tdesign-vue-next/pull/1094))

## 🌈 0.17.1 `2022-06-27` 
### 🐞 Bug Fixes
- `Select`: 修复分组插槽使用在列表尾部会产生多余渲染，修复筛选状态交互。([issue #1048](https://github.com/Tencent/tdesign-vue-next/issues/1048)) @pengYYYYY ([#1082](https://github.com/Tencent/tdesign-vue-next/pull/1082))

## 🌈 0.17.0 `2022-06-27` 
### ❗ Breaking Changes
- `reset`: 默认移除全局 `reset` 样式引入，可从 `tdesign-vue-next/dist/reset.css` 中单独引入
### 🚀 Features
- `Select`:
  - 增加列表展开时定位置选中项 @huoyuhao ([#1068](https://github.com/Tencent/tdesign-vue-next/pull/1068))
  - 修复 `options content`  属性向下透传问题 @pengYYYYY ([#1020](https://github.com/Tencent/tdesign-vue-next/pull/1020))
- `Form`: 现在 `FormItem.label` 为 `string` 类型时， `Form.errorMessage` 模板中的 `${name}` 会被替换为 `FormItem.label` 属性；当 `label` 属性为 `slot/function` 时，`${name}` 会被替换为 `FormItem.name` 属性 @k1nz ([#1022](https://github.com/Tencent/tdesign-vue-next/pull/1022))
- `Space`: 新增 `Space` 组件 @HQ-Lin ([#1035](https://github.com/Tencent/tdesign-vue-next/pull/1035))
- `Watermark`: 新增 `Watermark` 组件 @samhou1988 ([#921](https://github.com/Tencent/tdesign-vue-next/pull/921))
- `ConfigProvider`: 增加 `input` 组件 `autocomplete` 配置，增加 `dialog` 组件  `closeOnEscKeydown`, `closeOnOverlayClick` 配置,  增加 `select` 组件 `filterable`  配置，增加 `drawer` 组件  `closeOnEscKeydown`, `closeOnOverlayClick` 配置 ([issue #848](https://github.com/Tencent/tdesign-vue-next/issues/848)) @pengYYYYY ([#1074](https://github.com/Tencent/tdesign-vue-next/pull/1074))
- `Local`: 增加日语和韩语语言包 @pengYYYYY ([#1074](https://github.com/Tencent/tdesign-vue-next/pull/1074))
- `Table`: `fullRow` 不参与排序 @uyarn ([#1080](https://github.com/Tencent/tdesign-vue-next/pull/1080))
- `Watermark`: 新增 `Watermark` 组件 @samhou1988 ([#921](https://github.com/Tencent/tdesign-vue-next/pull/921))
- `Tree`:  `tree-checkbox` 支持 `number` 类型 @sufuwang ([#1032](https://github.com/Tencent/tdesign-vue-next/pull/1032))
### 🐞 Bug Fixes
- `DatePicker`:
  - 修复响应式问题 @HQ-Lin ([#1050](https://github.com/Tencent/tdesign-vue-next/pull/1050))
  - 修复 `clearable` 失效问题 @HQ-Lin ([#1055](https://github.com/Tencent/tdesign-vue-next/pull/1055))
- `Dialog`:
  - 修复 `update` 方法未正确更新  ([issue #1039](https://github.com/Tencent/tdesign-vue-next/issues/1039)) @pengYYYYY ([#1052](https://github.com/Tencent/tdesign-vue-next/pull/1052))
  - 修复 `destroy` 方法只是隐藏，没有销毁节点 ([issue #1038](https://github.com/Tencent/tdesign-vue-next/issues/1038)) @pengYYYYY ([#1052](https://github.com/Tencent/tdesign-vue-next/pull/1052))
- `TreeSelect`: 修改因传入 `treeProps.keys.children` 不生效的问题 @Godlike-meteor ([#1025](https://github.com/Tencent/tdesign-vue-next/pull/1025))
- `DatePicker`: 处理`disabled`无法生效的问题 @kerwin612 ([#1036](https://github.com/Tencent/tdesign-vue-next/pull/1036))
- `Slider`: 修复 `Slider` 组件使用 `inputNumberProp` 时，点击滑动条无法把值同步到 `InputNumber` 组件问题 @ChrisLee0211 ([#1034](https://github.com/Tencent/tdesign-vue-next/pull/1034))
- `Select`:
  - 修复 `group` 模式下的无法筛选 @pengYYYYY ([#1026](https://github.com/Tencent/tdesign-vue-next/pull/1026))
  - 修复设置可输入后移动端没有弹出输入法 ([issue #1066](https://github.com/Tencent/tdesign-vue-next/issues/1066)) @pengYYYYY ([#1072](https://github.com/Tencent/tdesign-vue-next/pull/1072))
- `Upload`:
  - 修复 `onSelectChange` 未实现 @pengYYYYY ([#1052](https://github.com/Tencent/tdesign-vue-next/pull/1052))
  - 修复 `progress` 进度展示误差问题 ([issue #1062](https://github.com/Tencent/tdesign-vue-next/issues/1062)) @pengYYYYY ([#1072](https://github.com/Tencent/tdesign-vue-next/pull/1072))
- `Cascader`:
  - 修复设置 `placeholder ` 无效, 优化 `filterable` 判断逻辑 ([issue #1063](https://github.com/Tencent/tdesign-vue-next/issues/1063)) @pengYYYYY ([#1072](https://github.com/Tencent/tdesign-vue-next/pull/1072))
  - 修复 `loading` 错位问题, 修复 `onBlur`, `onFocus` 事件实现 @pengYYYYY ([#1075](https://github.com/Tencent/tdesign-vue-next/pull/1075))
- `Radio`: 修复 `value` 为  `0` 时走入空值逻辑分支 @pengYYYYY ([#1026](https://github.com/Tencent/tdesign-vue-next/pull/1026))
- `TagInput`: 默认超出的换行为 `break-line` @skytt ([#1057](https://github.com/Tencent/tdesign-vue-next/pull/1057))
- `Form`: 修复校验规则为空时，校验信息不清空的问题 @k1nz ([#1071](https://github.com/Tencent/tdesign-vue-next/pull/1071))
- `Tree`: 修复 `setData` 方法未正确更新 [#1004](https://github.com/Tencent/tdesign-vue-next/issues/1004) @sufuwang ([#1059](https://github.com/Tencent/tdesign-vue-next/pull/1059))
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
- `Cascader`: 支持 `filter API` 用于自定义搜索方法 ([issue #971](https://github.com/Tencent/tdesign-vue-next/issues/971)) @pengYYYYY ([#1000](https://github.com/Tencent/tdesign-vue-next/pull/1000))
- `Dialog`: 新增 `preventScrollThrough` @uyarn ([#1009](https://github.com/Tencent/tdesign-vue-next/pull/1009))
### 🐞 Bug Fixes
- `Table`: 
  - 支持动态数据合并单元格 @chaishi ([#1011](https://github.com/Tencent/tdesign-vue-next/pull/1011))
  - 吸顶表头和自定义显示列场景，支持列拖拽调整顺序 @chaishi ([#1011](https://github.com/Tencent/tdesign-vue-next/pull/1011))
  - 修复 `firstFullRow` 存在时，拖拽排序的顺序不正确问题 @chaishi ([#1011](https://github.com/Tencent/tdesign-vue-next/pull/1011))
  - 修复加载更多的加载组件尺寸异常问题 @uyarn ([#1014](https://github.com/Tencent/tdesign-vue-next/pull/1014))
- `DatePicker`:
  - 修复 `datepicker format` 导致的高亮问题 @HQ-Lin ([#987](https://github.com/Tencent/tdesign-vue-next/pull/987))
  - 修复通过过快捷方式设置的时间区间高亮数据异常 ([issue #990](https://github.com/Tencent/tdesign-vue-next/issues/990)) @HQ-Lin ([#995](https://github.com/Tencent/tdesign-vue-next/pull/995))
  - 修复栅格的情况下组件宽度 超过父级容器的限制 组件显示不完整 ([issue #991](https://github.com/Tencent/tdesign-vue-next/issues/991)) @HQ-Lin ([#995](https://github.com/Tencent/tdesign-vue-next/pull/995))
- `TimePicker`:
  - 修复在 `datepicker` 中混用 不保留修改结果二次打开的异常 @uyarn ([#986](https://github.com/Tencent/tdesign-vue-next/pull/986))
  - 修复部分情况下由于 `allowInput ref` 问题导致保留改动结果的错误 @uyarn ([#986](https://github.com/Tencent/tdesign-vue-next/pull/986))
  - `range` 组件最外层使用 `range-picker` 命名与单时间选项区分 @uyarn ([#986](https://github.com/Tencent/tdesign-vue-next/pull/986))
- `Select`:
  - 修复使用 `onEnter` 事件报错 ([issue #997](https://github.com/Tencent/tdesign-vue-next/issues/997)) @pengYYYYY ([#1000](https://github.com/Tencent/tdesign-vue-next/pull/1000))
  - 修复远程搜索功能失效了 ([issue #992](https://github.com/Tencent/tdesign-vue-next/issues/992)) @pengYYYYY ([#1000](https://github.com/Tencent/tdesign-vue-next/pull/1000))
- `Form`:
  - `submit` 和 `reset` 现在不会触发 `submit` 和 `reset` 事件 @k1nz ([#998](https://github.com/Tencent/tdesign-vue-next/pull/998))
  - `submit` 实例方法兼容 `safari` 浏览器 (https://github.com/Tencent/tdesign-vue-next/pull/964#issuecomment-1158322318) @k1nz ([#998](https://github.com/Tencent/tdesign-vue-next/pull/998))
- `Dialog`: 修复 `dialog` 蒙层点击事件失效 @HQ-Lin ([#1001](https://github.com/Tencent/tdesign-vue-next/pull/1001))
- `Cascader`: 修复可过滤情况下，结果为空时候的 `popup` 宽度问题 ([issue #992](https://github.com/Tencent/tdesign-vue-next/issues/992)) @pengYYYYY ([#1000](https://github.com/Tencent/tdesign-vue-next/pull/1000))
- `Input`: 修复 `type` 为 `password` 时 `clearable` 属性不生效 ([issue #1002](https://github.com/Tencent/tdesign-vue-next/issues/1002)) @pengYYYYY ([#1000](https://github.com/Tencent/tdesign-vue-next/pull/1000))
- `ConfigProvider`: 修复 `inject` 在 `computed` 中意外出现, 优化配置文件 `merge` 性能 @pengYYYYY ([#1003](https://github.com/Tencent/tdesign-vue-next/pull/1003))
- `Tabs`: 修复 `panels` 变化时，往右按钮不出现的问题 @LeeJim ([#1008](https://github.com/Tencent/tdesign-vue-next/pull/1008))

## 🌈 0.16.0 `2022-06-14` 
### ❗ Breaking Changes
- `Select`: 基于 `selectInput` 重构组件 , 并使用 `CompositionAPI` 重构组件逻辑, 增加相关 `API` @pengYYYYY ([#965](https://github.com/Tencent/tdesign-vue-next/pull/965))
- `DatePicker`: 重构 `DatePicker` 为 `compositionAPI`，全新的UI样式及交互，移除 `range api`，分别导出 `Datepicker` 与 `DateRangePicker` @HQ-Lin ([#943](https://github.com/Tencent/tdesign-vue-next/pull/943))
- `TimePicker`: 重构`TimePicker`为 `compositionAPI`，全新的UI样式及交互，`disableTime API` 有所调整, 调整交互为点击确认按钮保留改动, 直接关闭弹窗不保留改动恢复初始值。 @uyarn ([#943](https://github.com/Tencent/tdesign-vue-next/pull/943))

### 🚀 Features
- `Table`:  
  - 筛选对话框输入筛选内容之后按回车应该和按确定按钮一样，([issue#802](https://github.com/Tencent/tdesign-vue/issues/802)) @chaishi ([#935](https://github.com/Tencent/tdesign-vue-next/pull/935))
  - 筛选功能支持自定义组件方式，示例：`columns: [{ filter: { component: DatePicker, props: {} } }]` @chaishi ([#935](https://github.com/Tencent/tdesign-vue-next/pull/935))
  - 拖拽排序事件，新增参数 `data` 和 `newData`，分别表示变更前后的数据 @chaishi ([#935](https://github.com/Tencent/tdesign-vue-next/pull/935))
- `popup`: 支持动态设置 `trigger` & `placement` @ikeq ([#932](https://github.com/Tencent/tdesign-vue-next/pull/932))
- `InputAdornment`: 新增 `input-adornment` 组件 @HQ-Lin ([#949](https://github.com/Tencent/tdesign-vue-next/pull/949))
- `TreeSelect`: 增加 `autoWidth` `borderless` API @pengYYYYY ([#939](https://github.com/Tencent/tdesign-vue-next/pull/939))
- `Select`: 增加 `select` 的键盘选中交互 @pengYYYYY ([#979](https://github.com/Tencent/tdesign-vue-next/pull/979))
- `Pagination`: 增加`pageEllipsisMode API`, 用于配置页码数量超出时，首尾省略模式  ([issue #911](https://github.com/Tencent/tdesign-vue-next/issues/911)) @pengYYYYY ([#979](https://github.com/Tencent/tdesign-vue-next/pull/979))
- `Skeleton`: 增加 ` delay API` 用于延迟加载 ([issue #892](https://github.com/Tencent/tdesign-vue-next/issues/892)) @pengYYYYY ([#979](https://github.com/Tencent/tdesign-vue-next/pull/979))
- `TimePickerPanel` ：新增 `TimePickerPanel` 组件用于单独使用面板的场景, 新增 `disableTime`、`onFocus`、`onBlur`、`onInput` 等API  @uyarn ([#943](https://github.com/Tencent/tdesign-vue-next/pull/943))
- `Datepicker`: 增加 `allowInput api`, 新增 `DatePickerPanel` 与 `DateRangePickerPanel` 单独使用支持年份、月份区间选择 @HQ-Lin  ([#943](https://github.com/Tencent/tdesign-vue-next/pull/943))

### 🐞 Bug Fixes
- `DatePicker`:
  - `enable-time-picker` 状态下，`prefixIcon` 不起作用 @chiyu1996 ([#953](https://github.com/Tencent/tdesign-vue-next/pull/953))
  - 修复 `datepicker separator` 日期分隔符属性失效问题 @chiyu1996 ([#954](https://github.com/Tencent/tdesign-vue-next/pull/954))
- `Table`:
  - 合并单元格支持动态数据，[issue#973](https://github.com/Tencent/tdesign-vue/issues/973) @chaishi ([#969](https://github.com/Tencent/tdesign-vue-next/pull/969))
  - 修复 `Table` 透传 `loading size` 为枚举无效的问题 @uyarn ([#970](https://github.com/Tencent/tdesign-vue-next/pull/970))
- `Form`:
  - 修复调用实例方法 `reset` 添加参数无效 @k1nz ([#964](https://github.com/Tencent/tdesign-vue-next/pull/964))
  - 修复调用实例方法 `submit` 后 `onSubmit` 回调函数参数 `e` 为 `undefined` 的问题 @k1nz ([#964](https://github.com/Tencent/tdesign-vue-next/pull/964))
- `Slider`:
  - 修复 `inputNumberProps` 无法支持 `readonly`、`tips` 等 `api` 配置问题 @ChrisLee0211 ([#941](https://github.com/Tencent/tdesign-vue-next/pull/941))
  - 修复 `slider` 数字输入框初始化重复渲染问题 @ChrisLee0211 ([#982](https://github.com/Tencent/tdesign-vue-next/pull/982))
- `Popup`: 修复初始化 `visible` 为 `true` 时的定位抖动 @ikeq ([#932](https://github.com/Tencent/tdesign-vue-next/pull/932))
- `Select`: 修复透传 `inputProps` 参数无效 ([#issue 872](https://github.com/Tencent/tdesign-vue-next/issues/872)) @pengYYYYY ([#965](https://github.com/Tencent/tdesign-vue-next/pull/965))
- `Switch`:  修复 `slots.label` 参数无效 @webfansplz ([#978](https://github.com/Tencent/tdesign-vue-next/pull/978))
- `TreeSelect`: 优化过滤状态下的输入框交互，修复 `selectInput` 参数透传数据响应问题 @pengYYYYY ([#939](https://github.com/Tencent/tdesign-vue-next/pull/939))
- `Cascader`: 修复下拉面板宽度问题 @pengYYYYY ([#939](https://github.com/Tencent/tdesign-vue-next/pull/939))
- `CheckBox`: 修复二次封装多选框组件插槽定义选项失效  ([issue #940](https://github.com/Tencent/tdesign-vue-next/issues/940)) @pengYYYYY ([#979](https://github.com/Tencent/tdesign-vue-next/pull/979))
- `Upload`: 修复图片列表模式存在图片列表的情况下，拖拽图片会触发浏览器默认打开图片行为 @pengYYYYY ([#979](https://github.com/Tencent/tdesign-vue-next/pull/979))
## 🌈 0.15.4 `2022-06-01` 
### 🚀 Features
- `Tree`: 使用 `compositionAPI` 重构 `tree` 组件 @pengYYYYY ([#857](https://github.com/Tencent/tdesign-vue-next/pull/857))
- `Cascader`:
  - 增加属性透传  `selectInputProps`  @pengYYYYY ([#857](https://github.com/Tencent/tdesign-vue-next/pull/857))
  - 修复 `options` 异步获取无法选择任意级的选项 ([issue #903](https://github.com/Tencent/tdesign-vue-next/issues/903)) @pengYYYYY ([#910](https://github.com/Tencent/tdesign-vue-next/pull/910))
  - 修复无法透传属性 `popupProps`  @pengYYYYY ([#857](https://github.com/Tencent/tdesign-vue-next/pull/857))
-  `Site` 增加主题配置器 @uyarn ([#766](https://github.com/Tencent/tdesign-vue-next/pull/766))
### 🐞 Bug Fixes
- `Menu`:
  - 修复暗黑模式下 popup 样式问题 @LeeJim ([#916](https://github.com/Tencent/tdesign-vue-next/pull/916))
  - 修复箭头方向错误的问题 @LeeJim ([#916](https://github.com/Tencent/tdesign-vue-next/pull/916))
- `Steps`: 修复插槽渲染逻辑问题  ([issue #802](https://github.com/Tencent/tdesign-vue-next/issues/802)) @pengYYYYY ([#910](https://github.com/Tencent/tdesign-vue-next/pull/910))
- `Dropdown`: 修复通过插槽方式渲染点击事件 `data` 参数不正确  ([issue #814](https://github.com/Tencent/tdesign-vue-next/issues/814)) @pengYYYYY ([#910](https://github.com/Tencent/tdesign-vue-next/pull/910))
- `Radio`: 修复 `Group` 模式下 `allowUncheck` 显示错误  ([issue #904](https://github.com/Tencent/tdesign-vue-next/issues/904)) @pengYYYYY ([#910](https://github.com/Tencent/tdesign-vue-next/pull/910))
- `InputNumber`: 修复 `v-model` 值不为 `number` 类型时的报错，增加类型判断组件表现 ([issue #912](https://github.com/Tencent/tdesign-vue-next/issues/912)) @pengYYYYY ([#910](https://github.com/Tencent/tdesign-vue-next/pull/910))
- `Form`: 修复 `reset` 方法报错 ([issue #918](https://github.com/Tencent/tdesign-vue-next/issues/918)) @pengYYYYY ([#910](https://github.com/Tencent/tdesign-vue-next/pull/910))
- `Tree`: 修复存在keys属性时，严重闪烁 ([issue #445](https://github.com/Tencent/tdesign-vue-next/issues/445)) @pengYYYYY ([#857](https://github.com/Tencent/tdesign-vue-next/pull/857))
- `Transfer`: 修复当与tree结合的全选判断问题  ([issue #891](https://github.com/Tencent/tdesign-vue-next/issues/891)) @pengYYYYY ([#857](https://github.com/Tencent/tdesign-vue-next/pull/857))

## 🌈 0.15.3 `2022-05-30` 
### 🚀 Features
- `Table`: 
  - `appendTo` 支持添加新节点到根节点，[issue#849](https://github.com/Tencent/tdesign-vue-next/issues/849) @chaishi ([#896](https://github.com/Tencent/tdesign-vue-next/pull/896))
  - 新增 `getTreeNode`，用于获取整个树形结构，[issue#849](https://github.com/Tencent/tdesign-vue-next/issues/849) @chaishi ([#896](https://github.com/Tencent/tdesign-vue-next/pull/896))
  - 添加 `onDragSort` 事件到 EnhancedTable @chaishi ([#896](https://github.com/Tencent/tdesign-vue-next/pull/896))
- `InputNumber`: 透传 Input 组件全部特性 @jchalex ([#900](https://github.com/Tencent/tdesign-vue-next/pull/900))
### 🐞 Bug Fixes
- `transfer`: 修改 `v-model`，页面没有同步更新 ([issue #883](https://github.com/Tencent/tdesign-vue-next/issues/883) ) @btea ([#890](https://github.com/Tencent/tdesign-vue-next/pull/890))
- `InputNumber`: 修复必填问题 @youuss ([#897](https://github.com/Tencent/tdesign-vue-next/pull/897))
- `Button`: 修复ref应用错误的问题 @btea ([#898](https://github.com/Tencent/tdesign-vue-next/pull/898))
- `Swiper`: 动态列表渲染问题 @btea ([#902](https://github.com/Tencent/tdesign-vue-next/pull/902))
- `Table`: 可编辑单元格，使用日期选择器时，切换月份也会导致退出编辑模式 @chaishi ([#901](https://github.com/Tencent/tdesign-vue-next/pull/901))
- `Form`: 修复 `form` 实例方法 `submit` 调用后的刷新问题 ([issue #894](https://github.com/Tencent/tdesign-vue-next/issues/894)) @pengYYYYY ([#899](https://github.com/Tencent/tdesign-vue-next/pull/899))


## 🌈 0.15.2 `2022-05-27` 
### 🐞 Bug Fixes
- `Form`:
  - 修复表单重置 `onReset` 不传会报错 ([issue #860](https://github.com/Tencent/tdesign-vue-next/issues/860)), ([issue #856](https://github.com/Tencent/tdesign-vue-next/issues/856)) @pengYYYYY ([#861](https://github.com/Tencent/tdesign-vue-next/pull/861))
  - 修复实例方法 `reset` 参数不生效的问题 @k1nz ([#868](https://github.com/Tencent/tdesign-vue-next/pull/868))
  - `reset` 和 `submit` 现在会调用原生 `form` 中的方法 @k1nz ([#868](https://github.com/Tencent/tdesign-vue-next/pull/868))- `ColorPicker`:
  - 点击panel会关闭的问题 ([issue#878](https://github.com/Tencent/tdesign-vue-next/issues/878)) @S-mohan ([#885](https://github.com/Tencent/tdesign-vue-next/pull/885))
  - 修复 `color-picker-panel` 使用 `v-model` 值没有正确更新 @pengYYYYY ([#843](https://github.com/Tencent/tdesign-vue-next/pull/843))
- `Select`: 修复 `option` 显示问题 ([issue #799](https://github.com/Tencent/tdesign-vue-next/issues/799)) @pengYYYYY ([#887](https://github.com/Tencent/tdesign-vue-next/pull/887))
- `Affix`: 兼容`<keep-alive/>`场景 @kerwin612 ([#870](https://github.com/Tencent/tdesign-vue-next/pull/870))
- `Upload`: 修复 `placeholder` 在 `image` 模式下不生效 ([issue #853](https://github.com/Tencent/tdesign-vue-next/issues/853)) @pengYYYYY ([#861](https://github.com/Tencent/tdesign-vue-next/pull/861))
- `Transfer`: 修复列表数量变化时的页码展示问题 @BigLiao ([#864](https://github.com/Tencent/tdesign-vue-next/pull/864))
- `Tabs`: 修复选项卡新增和删除在normal风格下无效 ([issue #865](https://github.com/Tencent/tdesign-vue/issues/865)) @pengYYYYY ([#880](https://github.com/Tencent/tdesign-vue-next/pull/880))


## 🌈 0.15.1 `2022-05-23` 
### 🚀 Features
- `Table`: 支持可编辑单元格的表格 ([issue#614](https://github.com/Tencent/tdesign-vue-next/issues/614)) @chaishi ([#846](https://github.com/Tencent/tdesign-vue-next/pull/846))
- `Select`: 新增事件 `onPopupVisibleChange` @chaishi ([#846](https://github.com/Tencent/tdesign-vue-next/pull/846))
- `Select`: 新增 `onChange` 事件参数，`trigger`，用于表示当次变化的触发来源 @chaishi ([#846](https://github.com/Tencent/tdesign-vue-next/pull/846))
### 🐞 Bug Fixes
- `Table`: `EnhancedTable`，树形结构中，可选中表格禁用行勾选问题：动态设置选中列时，禁用失效 ([issue#822](https://github.com/Tencent/tdesign-vue-next/issues/822)) @chaishi ([#842](https://github.com/Tencent/tdesign-vue-next/pull/842))
- `Table`: `EnhancedTable`，树形结构中，`toggleExpandData` 和 `expandAll/FoldAll` 混合使用时，树形结构展开有误 ([issue#839](https://github.com/Tencent/tdesign-vue-next/issues/839)) @chaishi ([#842](https://github.com/Tencent/tdesign-vue-next/pull/842))
- `Slider`: 修复slider部分tooltip属性设置无法生效问题 @ChrisLee0211 ([#844](https://github.com/Tencent/tdesign-vue-next/pull/844))
- `Input`: 清除操作触发了非必要事件 `onBlur`，移除  ([issue#845](https://github.com/Tencent/tdesign-vue-next/issues/845)) @chaishi ([#846](https://github.com/Tencent/tdesign-vue-next/pull/846))
- `Drawer`: 修复按键 `ESC` 关闭无法触发 ([issue #834](https://github.com/Tencent/tdesign-vue-next/issues/834)) @pengYYYYY ([#840](https://github.com/Tencent/tdesign-vue-next/pull/840))
- `Select`: 修复使用 `creatable` 创建新条目时，会出现额外空选项  ([issue #835](https://github.com/Tencent/tdesign-vue-next/issues/835)) @pengYYYYY ([#840](https://github.com/Tencent/tdesign-vue-next/pull/840))
- `Select`: 修复 `showArrow` 属性设置为  `false`，右侧箭头依然显示 ([issue #706](https://github.com/Tencent/tdesign-vue-next/issues/706)) @pengYYYYY ([#840](https://github.com/Tencent/tdesign-vue-next/pull/840))
- `Progress`: 修复 `theme` 动态变化错误  ([issue #820](https://github.com/Tencent/tdesign-vue-next/issues/820)) @pengYYYYY ([#840](https://github.com/Tencent/tdesign-vue-next/pull/840))
- `Transfer`: 修复 `transfer` 选中态无法点击 @pengYYYYY ([#840](https://github.com/Tencent/tdesign-vue-next/pull/840))

## 🌈 0.15.0 `2022-05-20` 
### ❗ Breaking Changes
- `Cascader`:  基于`select-input`组件重构，文本过长省略使用原生 `title` 展示全文本，不再使用 `tooltip` @pengYYYYY ([#585](https://github.com/Tencent/tdesign-vue-next/pull/585))
### 🚀 Features
- `Table`: 
  - 树形结构，支持默认展开全部，`tree.defaultExpandAll`，[issue#776](https://github.com/Tencent/tdesign-vue-next/issues/776) @chaishi ([#779](https://github.com/Tencent/tdesign-vue-next/pull/779))
  - 树形结构，支持自由控制展开全部，或收起全部 `expandAll()` `foldAll()` @chaishi ([#779](https://github.com/Tencent/tdesign-vue-next/pull/779))
  - 树形结构，支持拖拽排序，调整同层级顺序 @chaishi ([#779](https://github.com/Tencent/tdesign-vue-next/pull/779))
  - 树形结构，支持在当后节点之后插入新节点 `insertAfter` @chaishi ([#779](https://github.com/Tencent/tdesign-vue-next/pull/779))
- `Form`: 
  - 支持 `help` 配置的表单项说明内容与错误提示同时展示，未配置 `help` 时不再默认占位 @HQ-Lin ([#792](https://github.com/Tencent/tdesign-vue-next/pull/792))
  - 使用 `CompositionAPI` 重构 `Form` 组件 ([issue #58](https://github.com/Tencent/tdesign-vue-next/issues/58)) @k1nz ([#782](https://github.com/Tencent/tdesign-vue-next/pull/782))
- `Cascader`: 增加 `popupVisible`, `readonly`, `selectInputProps`, `onPopupVisibleChange` 属性，具体描述查看文档 @pengYYYYY ([#585](https://github.com/Tencent/tdesign-vue-next/pull/585))
- `nuxt`: 修复在 `nuxt3` 中的适配问题，可参考案例 [tdesign-vue-next-nuxt-starter](https://github.com/yixiaco/tdesign-vue-next-nuxt-starter) @yixiaco ([#726](https://github.com/Tencent/tdesign-vue-next/pull/726))
- `Tabs`: 添加拖拽功能 @GitHub-Mr-Chen ([#744](https://github.com/Tencent/tdesign-vue-next/pull/744))
- `Anchor`: 增加 demo 演示功能 @ontheroad1992 ([#804](https://github.com/Tencent/tdesign-vue-next/pull/804))

### 🐞 Bug Fixes
- `Form`:
  - 修复 `number` 规则校验不生效的问题 ([issue #670](https://github.com/Tencent/tdesign-vue-next/issues/670)) @k1nz ([#782](https://github.com/Tencent/tdesign-vue-next/pull/782))
  - 修复组件实例方法 `setValidateMessage` 缺失的问题 ([issue #739](https://github.com/Tencent/tdesign-vue-next/issues/739)) @k1nz ([#782](https://github.com/Tencent/tdesign-vue-next/pull/782))
  - 修复 `FormItem` 的 `showErrorMessage` 属性失效的问题 ([issue #751](https://github.com/Tencent/tdesign-vue-next/issues/751)) @k1nz ([#782](https://github.com/Tencent/tdesign-vue-next/pull/782))
  - 修复触发方式 `blur` 不生效的问题 ([issue #573](https://github.com/Tencent/tdesign-vue-next/issues/573)) @k1nz ([#782](https://github.com/Tencent/tdesign-vue-next/pull/782))
  - 修复传入的字段值为 `undefined` 的时候不会更新双向绑定值 ([issue #801](https://github.com/Tencent/tdesign-vue-next/issues/801)), ([#784](https://github.com/Tencent/tdesign-vue-next/issues/784)) @k1nz ([#782](https://github.com/Tencent/tdesign-vue-next/pull/782))
- `Table`:
  - 修复在ssr环境中的兼容 @pengYYYYY ([#723](https://github.com/Tencent/tdesign-vue-next/pull/723))
  - 拖拽排序，修复参数为 `undefined` 问题，[issue#790](https://github.com/Tencent/tdesign-vue-next/issues/790) @chaishi ([#779](https://github.com/Tencent/tdesign-vue-next/pull/779))
  - 使用 `header-affixed-top` 时，异步下不能动态更新列 [issue#787](https://github.com/Tencent/tdesign-vue-next/issues/787) @chaishi ([#779](https://github.com/Tencent/tdesign-vue-next/pull/779))
- `Popup`:
  - 增加`zIndex` api @ikeq ([#788](https://github.com/Tencent/tdesign-vue-next/pull/788))
  - 修复设置 `destroyOnClose` 后可能出现的异常抖动 @ikeq ([#788](https://github.com/Tencent/tdesign-vue-next/pull/788))- `Menu`: 修复 expanded 不受控的问题 @LeeJim ([#794](https://github.com/Tencent/tdesign-vue-next/pull/794))
- `Cascader`:
  - 修复第二级菜单点击后无法展示第三级菜单 ([issue #725](https://github.com/Tencent/tdesign-vue-next/issues/725)) @pengYYYYY ([#585](https://github.com/Tencent/tdesign-vue-next/pull/585))
  - 修复组件可以同时打开多个 ([issue #577](https://github.com/Tencent/tdesign-vue-next/issues/577)) @pengYYYYY ([#585](https://github.com/Tencent/tdesign-vue-next/pull/585))
  - 修复 `filterable` 不支持忽略大小写, 优化过滤状态交互 ([issue #577](https://github.com/Tencent/tdesign-vue-next/issues/577)) @pengYYYYY ([#585](https://github.com/Tencent/tdesign-vue-next/pull/585))
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
  - 支持自定义树形结构图标 `treeExpandAndFoldIcon`，同时支持全局配置此图标，[issue#717](https://github.com/Tencent/tdesign-vue-next/issues/717) @chaishi ([#746](https://github.com/Tencent/tdesign-vue-next/pull/746))
  - 支持隐藏排序文本提示 `hideSortTips`，同时支持全局配置是否隐藏排序文本提示，[issue#736](https://github.com/Tencent/tdesign-vue-next/issues/736) @chaishi ([#746](https://github.com/Tencent/tdesign-vue-next/pull/746))
- `Notification`:
  - 使用项目中已有的js动画方案，替换先前的`transitionGroup`方案，完善了组件出现和回收动画效果。其中涉及到**common**子仓库的修改，删除之前transition相关的类名，添加了一个`&-list__showt`类名。 @qunbotop ([#731](https://github.com/Tencent/tdesign-vue-next/pull/731))
  - 增加`onMouseenter`和`onMouseleave`事件，保证鼠标移入移出组件时，`duration`时间的停止和重新计时。 @qunbotop ([#731](https://github.com/Tencent/tdesign-vue-next/pull/731))
- `Dropdown`: 使用 `compositionAPI` 重构 `dropdown` 组件 @qunbotop ([#749](https://github.com/Tencent/tdesign-vue-next/pull/749))
- `Popconfirm`: `visible` 属性支持 `v-model` 语法糖 @k1nz ([#710](https://github.com/Tencent/tdesign-vue-next/pull/710))
- `Swiper`: 增加新组件 swiper @btea ([#690](https://github.com/Tencent/tdesign-vue-next/pull/690))
- `Icon`: 更新图标 新增`file-icon`图标 调整`file-excel`、`file-pdf`、`file-powerpoint`、`file-unknown`、`file-word`和`star-filled`图标的绘制路径 @uyarn ([#732](https://github.com/Tencent/tdesign-vue-next/pull/732))
### 🐞 Bug Fixes
- `Form`: 
  - 修复当 `modelValue` 为外部传入的 `undefined` 时，双向绑定失效 ([issue #712](https://github.com/Tencent/tdesign-vue-next/issues/712)) @pengYYYYY ([#764](https://github.com/Tencent/tdesign-vue-next/pull/764))
  - 修复 `attrs` 注入异常 ([issue #671](https://github.com/Tencent/tdesign-vue-next/issues/671)) @pengYYYYY ([#764](https://github.com/Tencent/tdesign-vue-next/pull/764))
- `Table`: 
  - `renderExpandedRow`为非必填 @uyarn ([#724](https://github.com/Tencent/tdesign-vue-next/pull/724))
  - 修复 多级表头 + 列配置 综合示例中，列数量超出一定限制时报错，[issue#713](https://github.com/Tencent/tdesign-vue-next/issues/713) @chaishi ([#770](https://github.com/Tencent/tdesign-vue-next/pull/770))
- `InputNumber`: 修复 `input-number` 重构 `hook` 使用错误出现的问题 @youuss ([#719](https://github.com/Tencent/tdesign-vue-next/pull/719))
- `Tooltip`: support set placement by mouse @Hoofoo-WHU ([#718](https://github.com/Tencent/tdesign-vue-next/pull/718))
- `ConfigProvider`: 修复`animation`属性`exclude`和`include`在TS中都必填的问题 @uyarn ([#724](https://github.com/Tencent/tdesign-vue-next/pull/724))
- `ColorPicker`: - fix(ColorPicker): 遍历循环的时候无法监听change 事件会报错 ([issue#634](https://github.com/Tencent/tdesign-vue-next/issues/634)) @S-mohan ([#738](https://github.com/Tencent/tdesign-vue-next/pull/738))
- `TimePicker`: `time-range-picker` 中 `suffix icon` 丢失问题 @uyarn ([#740](https://github.com/Tencent/tdesign-vue-next/pull/740))
- `Message`: 修复插件式调用时，用户传入`onCloseBtnClick`事件时，无法触发回调。 @qunbotop ([#731](https://github.com/Tencent/tdesign-vue-next/pull/731))
- `Notification`: 修复插件式调用时，用户传入`onCloseBtnClick` `onDurationEnd`事件时，无法触发回调。 @qunbotop ([#731](https://github.com/Tencent/tdesign-vue-next/pull/731))
- `Menu`: 修复 `expandMutex` 属性设置无效 [issue#729](https://github.com/Tencent/tdesign-vue-next/issues/729) @pengYYYYY ([#750](https://github.com/Tencent/tdesign-vue-next/pull/750))
- `Slider`: 修复 `toolTipProps` 属性设置无效, 拼写错误 [issue#741](https://github.com/Tencent/tdesign-vue-next/issues/741) @pengYYYYY ([#750](https://github.com/Tencent/tdesign-vue-next/pull/750))
- `Popconfirm`: 修复箭头与 `trigger` 属性 @pengYYYYY ([#750](https://github.com/Tencent/tdesign-vue-next/pull/750))
- `Dialog`: 修复初始化且为显示时的 `lock` 问题 @pengYYYYY ([#750](https://github.com/Tencent/tdesign-vue-next/pull/750))
- `Breadcrumb`: 修复弹出 `tooltip` 异常 @pengYYYYY ([#750](https://github.com/Tencent/tdesign-vue-next/pull/750))
- `Input`: 修复 `autowidth` 模式计算错误 [issue#755](https://github.com/Tencent/tdesign-vue-next/issues/755) @pengYYYYY ([#750](https://github.com/Tencent/tdesign-vue-next/pull/750))- `TimePicker`: 修复当modelValue为外部传入的undefined时，clearable失效 ([issue #722](https://github.com/Tencent/tdesign-vue-next/issues/722)) @pengYYYYY ([#764](https://github.com/Tencent/tdesign-vue-next/pull/764))
- `Steps`: 支持 `separator api` & 修复响应式问题 @HQ-Lin ([#759](https://github.com/Tencent/tdesign-vue-next/pull/759))
- `progress`: 环形进度条显示比例不准确 @uyarn ([#767](https://github.com/Tencent/tdesign-vue-next/pull/767))

## 🌈 0.14.1 `2022-05-06` 
### 🚀 Features
- `Table`: 新增 API `ellipsisTitle` 用于单独控制表头的超出省略 [@chaishi](https://github.com/chaishi) ([#694](https://github.com/Tencent/tdesign-vue-next/pull/694))
### 🐞 Bug Fixes
- `Loading`: 使用 `attach` 的情况下，`loading` 设置为 `false`，无法隐藏半透明蒙层，[issue#693](https://github.com/Tencent/tdesign-vue-next/issues/693) [@chaishi](https://github.com/chaishi) ([#694](https://github.com/Tencent/tdesign-vue-next/pull/694))
- `Table`:
  - 加载状态 `loading` 会导致拖拽排序失效的问题，[issue#648](https://github.com/Tencent/tdesign-vue-next/issues/648) [@chaishi](https://github.com/chaishi) ([#694](https://github.com/Tencent/tdesign-vue-next/pull/694))
  - TS 类型 `TableColumns[0]` 在严格模式下的使用问题 [@chaishi](https://github.com/chaishi) ([#694](https://github.com/Tencent/tdesign-vue-next/pull/694))
- `Menu`:
  - 使用 `t-submenu` `template #icon` 无效的问题 [@fengxianqi](https://github.com/fengxianqi) ([#643](https://github.com/Tencent/tdesign-vue-next/pull/643))
  - 修复 `expandMutex` 无法动态更新 [@pengYYYYY](https://github.com/pengYYYYY) ([#691](https://github.com/Tencent/tdesign-vue-next/pull/691))
- `Input`: 修复 `onChange` 触发两次 [@pengYYYYY](https://github.com/pengYYYYY) ([#691](https://github.com/Tencent/tdesign-vue-next/pull/691))
- `Tabs`: 修复 `add` 方法点击报错 [@pengYYYYY](https://github.com/pengYYYYY) ([#691](https://github.com/Tencent/tdesign-vue-next/pull/691))
- `Textarea`: 修复 `autofocus` 参数更新无法聚焦 [@pengYYYYY](https://github.com/pengYYYYY) ([#691](https://github.com/Tencent/tdesign-vue-next/pull/691))
- `Select`: 修复在结合 `option` 使用下的 `render` 告警 [@pengYYYYY](https://github.com/pengYYYYY) ([#691](https://github.com/Tencent/tdesign-vue-next/pull/691))
- `Slider`: 将 `marks` 属性更改为响应性属性，并内部修复marks刻度节点点击事件无效问题 [@ChrisLee0211](https://github.com/ChrisLee0211)  ([#683](https://github.com/Tencent/tdesign-vue-next/pull/683))
- `Dropdown`: 修复下拉菜单点击后报错  [@pengYYYYY](https://github.com/pengYYYYY) ([#691](https://github.com/Tencent/tdesign-vue-next/pull/691))  ([issue #711](https://github.com/Tencent/tdesign-vue-next/issue/711)) 


## 🌈 0.14.0 `2022-04-29`
### ❗ Breaking Changes
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

### ❗ Breaking Changes

* Table: 拖拽排序，`drag=sort` 表示列拖拽排序，`drag=row` 表示行拖拽排序，`drag=row-handler` 表示行手柄列拖拽排序。如果您使用了 `drag="col"` 来实现行拖拽排序，请更为使用 `drag="row-handler"`([pr #594](https://github.com/Tencent/tdesign-vue-next/pull/594)), ([@chaishi](https://github.com/chaishi))

### 🐞 Bug Fixes

* Drawer: 修复 `header` 属性无效问题 ([#611](https://github.com/Tencent/tdesign-vue-next/issues/611))
* Textarea: 修复在设置自动高度后，赋值后不高度不改变的问题 ([#613](https://github.com/Tencent/tdesign-vue-next/issues/613)) 
* DatePicker:  修复当传入值为非日期格式的情况页面卡死的问题 [@Godlike-meteor](https://github.com/Godlike-meteor) ([#624](https://github.com/Tencent/tdesign-vue-next/pull/624)) [#512](https://github.com/Tencent/tdesign-vue-next/issues/512)
* Transfer: 修复设置 `targetSort` 后未按预期展示的问题
* TreeSelect: [@Godlike-meteor](https://github.com/Godlike-meteor)
  * 修复 `value` 渲染异常问题 ([#633](https://github.com/Tencent/tdesign-vue-next/pull/633))
  * 修复组件在多选时无 `v-model` 展示异常问题 ([#622](https://github.com/Tencent/tdesign-vue-next/pull/622)) [#616](https://github.com/Tencent/tdesign-vue-next/issues/616)
* Upload:) ([#603](https://github.com/Tencent/tdesign-vue-next/pull/603)) [@pengYYYYY](https://github.com/pengYYYYY)
  * 修复上传失败状态流转问题 [#582](https://github.com/Tencent/tdesign-vue-next/issues/582)
  * 修复上传文件尺寸限制计算问题 [#601](https://github.com/Tencent/tdesign-vue-next/issues/601)
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

### ❗ Breaking Changes

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

### ❗ Breaking Changes

* Input: 外部传入 `class` 挂载至 `t-input__wrap`, 不再挂载到 `t-input` ([pr #476](https://github.com/Tencent/tdesign-vue-next/pull/476)), ([@pengYYYYY](https://github.com/pengYYYYY))
* textarea: 去除 `t-textarea__wrap` 层 ([pr #476](https://github.com/Tencent/tdesign-vue-next/pull/476)), ([@pengYYYYY](https://github.com/pengYYYYY))

### 🐞 Bug Fixes

* Dialog: 修复 `dialog` 组件点击警告 ([pr #463](https://github.com/Tencent/tdesign-vue-next/pull/444)), ([issue #435](https://github.com/Tencent/tdesign-vue-next/issues/435))
* Steps: 修复 `readonly` 状态下依然可以点击 ([pr #465](https://github.com/Tencent/tdesign-vue-next/pull/465)
* Cascader:
  * 修复动态改 `options` 为空数组不生效 ([pr #486](https://github.com/Tencent/tdesign-vue-next/pull/486))
  * 修复可过滤状态下的下拉面板拉起闪烁  ([pr #483](https://github.com/Tencent/tdesign-vue-next/pull/444)), ([issue #477](https://github.com/Tencent/tdesign-vue-next/issues/477))
  * 修复可过滤状态下的输入内容未被正常销毁  ([pr #483](https://github.com/Tencent/tdesign-vue-next/pull/444)), ([issue #478](https://github.com/Tencent/tdesign-vue-next/issues/478))
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
* Pagination: 修复分页组件 `pageSize` 默认值不正确导致的受控问题。([pr #444](https://github.com/Tencent/tdesign-vue-next/pull/444)), ([issue #440](https://github.com/Tencent/tdesign-vue-next/issues/440)), ([issue #456](https://github.com/Tencent/tdesign-vue-next/issues/456)), ([@pengYYYYY](https://github.com/pengYYYYY))
* UseRipple: 修复 `useRipple` 的告警 ([pr #439](https://github.com/Tencent/tdesign-vue-next/pull/439)), ([issue #435](https://github.com/Tencent/tdesign-vue-next/issues/435)), ([@pengYYYYY](https://github.com/pengYYYYY))
* Menu:
  * 当菜单项超出时，正常展示 `Popup` ([pr #438](https://github.com/Tencent/tdesign-vue-next/pull/427)), ([issue #86](https://github.com/Tencent/tdesign-vue-next/issues/86)),([@LeeJim](https://github.com/LeeJim))
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

### ❗ Breaking Changes

* Input: `DOM` 结构调整，最外层调整为 `t-input__wrap`([pr #409](https://github.com/Tencent/tdesign-vue-next/pull/409)), ([@pengYYYYY](https://github.com/pengYYYYY))

### 🐞 Bug Fixes

* Select:
  * 修复单选下斜八度动画覆盖文字的错误 ([pr #421](https://github.com/Tencent/tdesign-vue-next/pull/421)), ([@uyarn](https://github.com/uyarn))
  * 修复 `filterable` 属性导致高度变化 ([pr #430](https://github.com/Tencent/tdesign-vue-next/pull/430)), ([issue #423](https://github.com/Tencent/tdesign-vue-next/issues/423)), ([@pengYYYYY](https://github.com/pengYYYYY))
  * 修复事件与双向绑定数据更新时机不一致问题 ([pr #421](https://github.com/Tencent/tdesign-vue-next/pull/421)), ([@uyarn](https://github.com/uyarn))
* cascader: ([pr #422](https://github.com/Tencent/tdesign-vue-next/pull/422)), ([@pengYYYYY](https://github.com/pengYYYYY))
  * 修复 `filterable` 属性导致 `hover` 样式异常的问题
  * 修复可选任意一级缺少高亮状  ([issue #114](https://github.com/Tencent/tdesign-vue-next/issue/114))
* DatePicker: 修复按需引入时，按钮展示问题 ([pr #425](https://github.com/Tencent/tdesign-vue-next/pull/425)), ([issue #419](https://github.com/Tencent/tdesign-vue-next/issues/419)), ([@BuptStEve](https://github.com/BuptStEve))
* Tree: 修复数据无法更新问题 ([pr #406](https://github.com/Tencent/tdesign-vue-next/pull/406)), ([@pengYYYYY](https://github.com/pengYYYYY))

### 🚀  Features

* Badge: 使用 `compositionAPI` 重构组件 ([pr #402](https://github.com/Tencent/tdesign-vue-next/pull/402)), ([issue #58](https://github.com/Tencent/tdesign-vue-next/pull/58)), ([@ChrisLee0211](https://github.com/ChrisLee0211 ))

## 🌈 0.9.4 `2022-03-04`

### 🐞 Bug Fixes

* 修复在 `typescript` 严格模式下打包出错  ([issue #384](https://github.com/Tencent/tdesign-vue-next/issues/384))


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
  * 修复 `dialog plugin` 聚焦 `button` 通过键盘频繁触发 ([pr #395](https://github.com/Tencent/tdesign-vue-next/pull/395)), ([issue #394](https://github.com/Tencent/tdesign-vue-next/issues/394))
  * 修复 `closeBtn` 为 `false` 的时候依然可以点击关闭区域关闭弹窗 ([pr #392](https://github.com/Tencent/tdesign-vue-next/pull/392)), ([issue #373](https://github.com/Tencent/tdesign-vue-next/issues/373))
* Table: 修复按需引用时，直接引用 `Table` 报错： ([pr #388](https://github.com/Tencent/tdesign-vue-next/pull/388)), ([issue #374](https://github.com/Tencent/tdesign-vue-next/issues/374))
* Select: 修复自定义创建 `option` 交互异常 ([pr #397](https://github.com/Tencent/tdesign-vue-next/pull/397)), ([issue #364](https://github.com/Tencent/tdesign-vue-next/issues/364))
* Form: 修复表单 `submit` 事件中的 `firstError` 不正确 ([pr #397](https://github.com/Tencent/tdesign-vue-next/pull/382)), ([issue #382](https://github.com/Tencent/tdesign-vue-next/issues/382))
* Cascader: 优化类名判断相关代码导致的性能问题 ([pr #397](https://github.com/Tencent/tdesign-vue-next/pull/382))
* Input: 修复 `onChange` 和 `on-change`事件 未生效 ([pr #395](https://github.com/Tencent/tdesign-vue-next/pull/395)), ([issue #393](https://github.com/Tencent/tdesign-vue-next/issues/393))
* InputNumber: 修复在增加小数点位数的状态下，v-model绑定的value与展示的值不同 ([pr #392](https://github.com/Tencent/tdesign-vue-next/pull/392)), ([issue #390](https://github.com/Tencent/tdesign-vue-next/issues/390))
* Breadcrumb: 修复 `disabled` 无效 ([pr #391](https://github.com/Tencent/tdesign-vue-next/pull/391)), ([issue #373](https://github.com/Tencent/tdesign-vue-next/issues/373))
* Checkbox：修复 `value` 重复时，导致渲染 `key` 相同的报错 ([pr #387](https://github.com/Tencent/tdesign-vue-next/pull/387)),

### 🚀  Features

* SelectInput:  新增 `SelectInput` 筛选器组件, 请参照[官网](https://tdesign.tencent.com/vue-next/components/select-input)使用,  ([pr #330](https://github.com/Tencent/tdesign-vue-next/issues/330)), ([@chaishi](https://github.com/chaishi))
* Input: 增加 `format` 属性  ([pr #387](https://github.com/Tencent/tdesign-vue-next/issues/387))
* 全局配置: 支持关闭斜八度波纹动画  ([pr #389](https://github.com/Tencent/tdesign-vue-next/issues/389)), ([issue 204](https://github.com/Tencent/tdesign-vue-next/issues/204)), ([@uyarn](https://github.com/uyarn))

## 🌈 0.9.2 `2022-02-26`

### 🐞 Bug Fixes

* SelectInput: 修复 `src/select-input/interface.d.ts` 文件被 `tsc` 编译忽略导致的组件 `import interface` 错误


## 🌈 0.9.1 `2022-02-25`

### 🐞 Bug Fixes

* 修复构建产物 `typescript` 声明文件路径错误

## 🌈 0.9.0 `2022-02-25`


### ❗ Breaking Changes

* Input: `input` 元素 `ref` 名称由 `refInputElem` 更为 `inputRef` ([pr #330](https://github.com/Tencent/tdesign-vue-next/pull/330)), ([@chaishi](https://github.com/chaishi))

### 🐞 Bug Fixes

* Slider: ([@pengYYYYY](https://github.com/pengYYYYY))
  * 修复游标定位错乱 ([pr #248](https://github.com/Tencent/tdesign-common/pull/248))
  * 修复 `marks` 属性不支持 `array` 数据结构([pr #355](https://github.com/Tencent/tdesign-vue-next/pull/355))
* Input: 去除 `autocomplete` 默认值，保持浏览器默认值 ([pr #330](https://github.com/Tencent/tdesign-vue-next/pull/330)), ([@chaishi](https://github.com/chaishi))
* Upload: 修复文件数大于等于 `max` 时，上传按钮依然可以点击 ([pr #351](https://github.com/Tencent/tdesign-vue-next/issues/349)), ([issue #349](https://github.com/Tencent/tdesign-vue-next/issues/349)), ([@pengYYYYY](https://github.com/pengYYYYY))
* Notification: 修复 `offset` 参数无效 ([pr #351](https://github.com/Tencent/tdesign-vue-next/pull/349)), ([issue #342](https://github.com/Tencent/tdesign-vue-next/issues/342)), ([@pengYYYYY](https://github.com/pengYYYYY))
* Table: 修复固定表头错位 ([pr #352](https://github.com/Tencent/tdesign-vue-next/pull/352)), ([issue #299](https://github.com/Tencent/tdesign-vue-next/issues/299)), ([issue #325](https://github.com/Tencent/tdesign-vue-next/issues/325)), ([issue #316](https://github.com/Tencent/tdesign-vue-next/issues/316)), ([@pengYYYYY](https://github.com/pengYYYYY))
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
* Textarea: 修复 `value` 未定义时字数统计展示异常的问题 ([pr #298](https://github.com/Tencent/tdesign-vue-next/pull/298)), ([issue #387](https://github.com/Tencent/tdesign-vue-next/issues/387))
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

### ❗ Breaking Changes

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
  * 修复在空状态时不显示 `placeholder`([8a44df9](https://github.com/Tencent/tdesign-vue-next/commit/8a44df9940a5705b103dfa543dd7b5f58065abee)), ([#271](https://github.com/Tencent/tdesign-vue-next/issues/271))
* Content: 修复 `Content` 内容无法响应式 ([7ebd287](https://github.com/Tencent/tdesign-vue-next/commit/7ebd28747f0cb3975b205ada5828e961b62b1d66)), ([#268](https://github.com/Tencent/tdesign-vue-next/issues/268)), ([#255](https://github.com/Tencent/tdesign-vue-next/issues/255))
* Slider: 修复双向绑定值失效 ([c554129](https://github.com/Tencent/tdesign-vue-next/commit/c5541293d9c7258208c7240018fff964faa1a760)), ([#260](https://github.com/Tencent/tdesign-vue-next/issues/260)), ([@backrunner](https://github.com/backrunner))
* Table: 修复表头单元格合并显示异常 ([a121a0d](https://github.com/Tencent/tdesign-vue-next/commit/a121a0de2b5f28702b515d49e58a7cb467263be0))
* Tabs: 修复 `remove` 事件警告 ([2beac1c](https://github.com/Tencent/tdesign-vue-next/commit/2beac1ceefe16bf55e2babed4b4e9bcf488f3094)), ([#248](https://github.com/Tencent/tdesign-vue-next/issues/248))
* Tag: 修复`click` 事件参数错误 ([e6ade96](https://github.com/Tencent/tdesign-vue-next/commit/e6ade96d0a607a57b41a13fc15694117871a9242))
* Breadcrumb: 修复面包屑 `item disabled` 状态样式, ([pr #190](https://github.com/Tencent/tdesign-common/pull/190)), ( [@samhou1988](https://github.com/samhou1988))
* Input: 修复输入框相关样式重复引入的问题 ([pr #182](https://github.com/Tencent/tdesign-common/pull/182)), ([@xiaosansiji](https://github.com/xiaosansiji))
* Select/Input/InputNumber/Switch: 背景色、边框样式等与设计不一致的, 统一修复 ([pr #194](https://github.com/Tencent/tdesign-common/pull/194)), ( [@uyarn](https://github.com/uyarn))

### 🚀  Features

* InputNumber: 增加 `align` 属性 ([961a8a5](https://github.com/Tencent/tdesign-vue-next/commit/961a8a540276c42e14b066c2413183f93cdd068f))
* Button: 统一各类型按钮边框宽度 ([pr #176](https://github.com/Tencent/tdesign-common/pull/176)), ([@BigLiao](https://github.com/BigLiao))

## 🌈 0.7.0 `2022-01-21`

### ❗ Breaking Changes

* FormRule 的 `min` 和 `len` 根据一个中文等于两个字符的计算规则进行, 和 `max` 保持一致；`min` 和 `len` 在值为 Number 时, 进行数字大小的校验而非数字长度校验 ([pr #220](https://github.com/Tencent/tdesign-vue/pull/220)), ([@pengYYYYY](https://github.com/pengYYYYY))

### 🐞 Bug Fixes

* Select: 修复下拉面板在远程搜索时的渲染出错 ([issue #235](https://github.com/Tencent/tdesign-vue-next/issues/235)), ([pr #237](https://github.com/Tencent/tdesign-vue-next/pull/237)), ([@pengYYYYY](https://github.com/pengYYYYY))
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
* Swiper: 修复循环渲染无效 ([a1dc97d](https://github.com/Tencent/tdesign-vue-next/commit/a1dc97d8bdf5420552549a5ecde8f30941290062)), ([#169](https://github.com/Tencent/tdesign-vue-next/issues/169))
* Tabs: 修复 `change` 事件触发两次 ([1a6cbb2](https://github.com/Tencent/tdesign-vue-next/commit/1a6cbb20f94fda106fdd05c88f0436cb6420392d))
* Menu: 修复菜单事件触发两次 ([f8b234c](https://github.com/Tencent/tdesign-vue-next/pull/206/commits/f8b234c441d0741fce0b5b1bcac6e14b597235ff))
* Icon: 修复修改 `name` 无法重新渲染 ([7708a56](https://github.com/Tencent/tdesign-vue-next/pull/178/commits/7708a560ed8dd9e934588188c95d9dfb2bedef2a)), ([#41](https://github.com/Tencent/tdesign-vue-next/issues/41)), ([#130](https://github.com/Tencent/tdesign-vue-next/issues/130))
* Dialog: 修复 `closeOnEscKeydown` 事件 ([72f5bcb](https://github.com/Tencent/tdesign-vue-next/pull/207/commits/72f5bcbe2173186f61481218b9e009c777e3448c)), ([@vnues](https://github.com/vnues))
* Drawer: 修复 `closeOnEscKeydown` 事件 ([433de96](https://github.com/Tencent/tdesign-vue-next/pull/207/commits/433de96d5ec7e72efe882375b81a1f9ca8a6b520)), ([@vnues](https://github.com/vnues))
* Datepicker: 修复周起始为月最后一天时, 周显示错误 ([pr 117](https://github.com/Tencent/tdesign-vue-next/pull/196)), ([@xiaosansiji](https://github.com/xiaosansiji))
* Select: 修复禁用状态下下拉 `icon` 展示样式, ([pr 113](https://github.com/Tencent/tdesign-common/pull/113)), ([@pengYYYYY](https://github.com/pengYYYYY))
* Tab: ([@vnues](https://github.com/vnues)), ([#116](https://github.com/Tencent/tdesign-vue-next/issues/116)), ([#115](https://github.com/Tencent/tdesign-vue-next/issues/115))
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
  * 修复 `menu-item` 在不使用 `icon` 插槽的时候, 在左侧收回的时候多了一个数字 ([f801349](https://github.com/Tencent/tdesign-vue-next/commit/f80134917b20ce6400b013743628299c40db2f65)),  ([#124](https://github.com/Tencent/tdesign-vue-next/issues/124)), ([@LeeJim](https://github.com/LeeJim))
  * 修复三级菜单无缩进效果([f6e6142](https://github.com/Tencent/tdesign-vue-next/commit/f6e6142ccf6eea353926c5743138cd7992aa5fff)), ([#118](https://github.com/Tencent/tdesign-vue-next/issues/118)), ([@simpleAndElegant](https://github.com/simpleAndElegant))
  * 修复禁用菜单未禁用点击 ([45db957](https://github.com/Tencent/tdesign-vue-next/commit/45db9574dc76590a1ce27e3aafdd3a040a844a7f)), ([#119](https://github.com/Tencent/tdesign-vue-next/issues/119)), ([@simpleAndElegant](https://github.com/simpleAndElegant))
  * 修复双层导航显示错误 ([99749ed](https://github.com/Tencent/tdesign-vue-next/commit/99749ed4b0eaa57ccfef05a9fa920f36ba313f03)), ([#75](https://github.com/Tencent/tdesign-vue-next/issues/75))
  * 修复 `change` 事件两次触发 ([0b65c7a](https://github.com/Tencent/tdesign-vue-next/commit/0b65c7a1852a3e03084a86226d82c7f8d5a70925))
* Popup:
  * 修复 `mousedown` 事件无效 ([a1d3303](https://github.com/Tencent/tdesign-vue-next/commit/a1d330327b27288c362bfb5d6cb4953c764426a6))
  * 修复 `destroy on close` 事件无效 ([fde46e7](https://github.com/Tencent/tdesign-vue-next/commit/fde46e73c7c439101663c2c5591ed08ab9aca854))
* Input:
  * 修复 `size` 属性无效 ([db155b3](https://github.com/Tencent/tdesign-vue-next/commit/db155b30fb009374308b2376d4a7dd7bf64338e8)), ([#112](https://github.com/Tencent/tdesign-vue-next/issues/112))
  * 修复点击清除 `icon` 后无法 `focus` ([2c34e05](https://github.com/Tencent/tdesign-vue-next/commit/2c34e05cf183985ffd734e8bf14d77cbd07a041e))
* Drawer:
  * 修复当抽屉打开时, `body` 有滚动条时可以滚动 ([8b94878](https://github.com/Tencent/tdesign-vue-next/commit/8b9487825d338a78f9e027d7e5fa64b1a7f1bf7b)), ([@caoML](https://github.com/caoML))
  * 修复上方抽屉无动画效果, 并且显示卡顿 ([52a4f37](https://github.com/Tencent/tdesign-vue-next/commit/8b9487825d338a78f9e027d7e5fa64b1a7f1bf7b)), ([#79](https://github.com/Tencent/tdesign-vue-next/issues/79))
* Table:
  * 修复 `mouseenter` 和 `mouseleave` 事件无效 ([52b6ac0](https://github.com/Tencent/tdesign-vue-next/commit/52b6ac0a67bb8dab59edf4da5a689679ab5d9c92))
  * 修复合并表格下的列宽度无效与错乱 ([02898ac](https://github.com/Tencent/tdesign-vue-next/commit/02898ac8deb67ee054e3aa7cc80ca733efb5019a))
* Textarea:
  * 修复私有类名传入无效 ([e9ad3c4](https://github.com/Tencent/tdesign-vue-next/commit/e9ad3c4003c830e8589ac41e5af3b42f4f71e305))
  * 修复在空状态下的加载无效 ([797f8a7](https://github.com/Tencent/tdesign-vue-next/commit/797f8a7076f3bb209a41ab8c1fbbdc8ed8023b8b))
* Dropdown: 修复使用 `slot` 时点击无法关闭 ([e6f7cd1](https://github.com/Tencent/tdesign-common/pull/60/commits/52a4f37af5beb21d0bfe5e7291e6a03db1863b2f))
* DatePicker: 修复 `date-picker` 样式问题和选择面板无法点击 ([06994ab](https://github.com/Tencent/tdesign-vue-next/commit/06994ab48b213f55606ed51bc87265f421011166)), ([#30](https://github.com/Tencent/tdesign-vue-next/issues/30))
* TreeSelect: 修复 `collapsedItem` 渲染异常 ([7539d67](https://github.com/Tencent/tdesign-vue-next/commit/7539d675ee2075d878693367a97945c2fe5d5ea7)), ([#36](https://github.com/Tencent/tdesign-vue-next/issues/36))
* Breadcrumb: 修复点击后触发两次 ([abe1c1b](https://github.com/Tencent/tdesign-vue-next/commit/abe1c1bf4e1c1f549029e2c5c1dc3f57aa41b15d))
* Calendar: 修复月份与年份组件参数对象使用错误 ([a3284d5](https://github.com/Tencent/tdesign-vue-next/commit/a3284d5efd1c619ac90799d301071415d7628955)), ([#69](https://github.com/Tencent/tdesign-vue-next/issues/69)), ([@Dreamcreative](https://github.com/Dreamcreative))
* Pagination: 使用`InputNumber` 组件替代 `input`, 并内置跳转页码控制 ([86a2d09](https://github.com/Tencent/tdesign-vue-next/commit/86a2d09d0649b655b8ce9b8611f84bfc60a64b4a))
* Select: 修复点击清空后的触发下拉菜单展开 ([7340f8d](https://github.com/Tencent/tdesign-vue-next/commit/7340f8df87ef20ce44a34ee9c9e102192abd4262)) 
* Steps: 修复 `slot` 无法渲染 ([e841050](https://github.com/Tencent/tdesign-vue-next/commit/e84105013267ea4292c6b42c74d287f062294bfd)), ([@vnues](https://github.com/vnues))
* Tabs: 修复循环创建下的结点渲染错误 ([07d79b6](https://github.com/Tencent/tdesign-vue-next/commit/07d79b6db603e16f63870cae15b2721b7d3ffc29))
* Upload: 修复上传文件后出现两个删除按钮 ([4296ebd](https://github.com/Tencent/tdesign-vue-next/commit/4296ebd908b6a615c8d9307d849c471906a205f9)), ([#120](https://github.com/Tencent/tdesign-vue-next/issues/120))

### 🚀  Features

* Cascader:
  * 增加 `value-type` ([f7aaba2](https://github.com/Tencent/tdesign-vue-next/commit/f7aaba26804610fb9c9daec69e7b58003bf311b6))
  * 选择器宽度调整为继承外部宽度 ([41d4434](https://github.com/Tencent/tdesign-vue-next/commit/41d4434ef9cc1a75453b2fc477c11f363b2d55f2))
* Input:
  * 增加左侧、右侧文本 ([db155b3](https://github.com/Tencent/tdesign-vue-next/commit/db155b30fb009374308b2376d4a7dd7bf64338e8)), ([@mokywu](https://github.com/mokywu))
  * 增加 `placeholder` 全局配置  ([d727836](https://github.com/Tencent/tdesign-vue-next/commit/d72783641f4724cd16823ff5afe6de8f27933a9a))
* Steps: 增加 `readonly` 配置 ([d1ba7aa](https://github.com/Tencent/tdesign-vue-next/commit/d1ba7aa0aeb26fb69f57a1e2d41535249a3cad8b))
* Radio: 支持 `allowUnCheck` ([fa3acbf](https://github.com/Tencent/tdesign-vue-next/commit/fa3acbf199d818fe95d9b4493e641da47ebe2de5))
* Slider: 优化 `popup` 显示行为 ([076afde](https://github.com/Tencent/tdesign-vue-next/commit/076afded5e81ab6c09600dc2e0eb97ee05a68860)), ([#117](https://github.com/Tencent/tdesign-vue-next/issues/117)), ([@vnues](https://github.com/vnues))

## 🌈 0.6.0 `2021-12-22`

### ❗ Breaking Changes

* `0.5.0` 升级至 `0.6.0` 版本 CSS BEM 规范改动列表 ([#32](https://github.com/Tencent/tdesign-vue-next/issues/32))

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
  * 修复在 `collapsedItems` 模式下的选项数量渲染错误 ([#36](https://github.com/Tencent/tdesign-vue-next/issues/36))([86a2d09](https://github.com/Tencent/tdesign-vue-next/pull/42/commits/86a2d09d0649b655b8ce9b8611f84bfc60a64b4a))
  * 修复点击关闭触发了下拉框 ([3324aae](https://github.com/Tencent/tdesign-vue-next/commit/3324aaeb232eb31a7c41b1bf6adb4feb93c51442))
* Pagination: 可跳转的分页组件中使用 `input-number` 组件替换 `input`([86a2d09](https://github.com/Tencent/tdesign-vue-next/pull/42/commits/86a2d09d0649b655b8ce9b8611f84bfc60a64b4a))
* Textarea: 修复 `v-model` 无效, 处理滚动条样式 ([3c3c915](https://github.com/Tencent/tdesign-vue-next/pull/14/commits/3c3c9153f02cd60788c40802b6b35799012b417a))
* Drawer: 修复事件点击无效无效 ([#39](https://github.com/Tencent/tdesign-vue-next/issues/39)) ([3c3c915](https://github.com/Tencent/tdesign-vue-next/pull/14/commits/3c3c9153f02cd60788c40802b6b35799012b417a))
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

### ❗ Breaking Changes

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

### ❗ Breaking Changes

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

### ❗ Breaking Changes

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

### ❗ Breaking Changes

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
