---
title: 更新日志
spline: explain
toc: false
docClass: timeline
---

## 0.10.0 `2022-03-11`

### BREAKING CHANGES

* Input: `DOM` 结构调整，最外层调整为 `t-input__wrap`([pr #409](https://github.com/Tencent/tdesign-vue-next/pull/409)), ([@pengYYYYY](https://github.com/pengYYYYY))

### Bug Fixes

* Select:
  * 修复单选下斜八度动画覆盖文字的错误 ([pr #421](https://github.com/Tencent/tdesign-vue-next/pull/421)), ([@uyarn](https://github.com/uyarn))
  * 修复 `filterable` 属性导致高度变化 ([pr #430](https://github.com/Tencent/tdesign-vue-next/pull/430)), ([issue #423](https://github.com/Tencent/tdesign-vue-next/issues/423)), ([@pengYYYYY](https://github.com/pengYYYYY))
  * 修复事件与双向绑定数据更新时机不一致问题 ([pr #421](https://github.com/Tencent/tdesign-vue-next/pull/421)), ([@uyarn](https://github.com/uyarn))
* cascader: ([pr #422](https://github.com/Tencent/tdesign-vue-next/pull/422)), ([@pengYYYYY](https://github.com/pengYYYYY))
  * 修复 `filterable` 属性导致 `hover` 样式异常的问题
  * 修复可选任意一级缺少高亮状  ([issue #114](https://github.com/Tencent/tdesign-vue-next/issue/114))
* DatePicker: 修复按需引入时，按钮展示问题 ([pr #425](https://github.com/Tencent/tdesign-vue-next/pull/425)), ([issue #419](https://github.com/Tencent/tdesign-vue-next/issues/419)), ([@BuptStEve](https://github.com/BuptStEve))
* Tree: 修复数据无法更新问题 ([pr #406](https://github.com/Tencent/tdesign-vue-next/pull/406)), ([@pengYYYYY](https://github.com/pengYYYYY))

### Features

* Badge: 使用 `compositionAPI` 重构组件 ([pr #402](https://github.com/Tencent/tdesign-vue-next/pull/402)), ([issue #58](https://github.com/Tencent/tdesign-vue-next/pull/58)), ([@ChrisLee0211](https://github.com/ChrisLee0211 ))


## 0.9.4 `2022-03-04`

### Bug Fixes

* 修复在 `typescript` 严格模式下打包出错  ([issue #384](https://github.com/Tencent/tdesign-vue-next/issues/384))


## 0.9.3 `2022-03-04`


### Bug Fixes

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

### Features

* SelectInput:  新增 `SelectInput` 筛选器组件, 请参照[官网](https://tdesign.tencent.com/vue-next/components/select-input)使用,  ([pr #330](https://github.com/Tencent/tdesign-vue-next/issues/330)), ([@chaishi](https://github.com/chaishi))
* Input: 增加 `format` 属性  ([pr #387](https://github.com/Tencent/tdesign-vue-next/issues/387))
* 全局配置: 支持关闭斜八度波纹动画  ([pr #389](https://github.com/Tencent/tdesign-vue-next/issues/389)), ([issue 204](https://github.com/Tencent/tdesign-vue-next/issues/204)), ([@uyarn](https://github.com/uyarn))

## 0.9.2 `2022-02-26`

### Bug Fixes

* SelectInput: 修复 `src/select-input/interface.d.ts` 文件被 `tsc` 编译忽略导致的组件 `import interface` 错误


## 0.9.1 `2022-02-25`

### Bug Fixes

* 修复构建产物 `typescript` 声明文件路径错误

## 0.9.0 `2022-02-25`


### BREAKING CHANGES

* Input: `input` 元素 `ref` 名称由 `refInputElem` 更为 `inputRef` ([pr #330](https://github.com/Tencent/tdesign-vue-next/pull/330)), ([@chaishi](https://github.com/chaishi))

### Bug Fixes

* Slider: ([@pengYYYYY](https://github.com/pengYYYYY))
  * 修复游标定位错乱 ([pr #248](https://github.com/Tencent/tdesign-common/pull/248))
  * 修复 `marks` 属性不支持 `array` 数据结构([pr #355](https://github.com/Tencent/tdesign-vue-next/pull/355))
* Input: 去除 `autocomplete` 默认值，保持浏览器默认值 ([pr #330](https://github.com/Tencent/tdesign-vue-next/pull/330)), ([@chaishi](https://github.com/chaishi))
* Upload: 修复文件数大于等于 `max` 时，上传按钮依然可以点击 ([pr #351](https://github.com/Tencent/tdesign-vue-next/issues/349)), ([issue #349](https://github.com/Tencent/tdesign-vue-next/issues/349)), ([@pengYYYYY](https://github.com/pengYYYYY))
* Notification: 修复 `offset` 参数无效 ([pr #351](https://github.com/Tencent/tdesign-vue-next/pull/349)), ([issue #342](https://github.com/Tencent/tdesign-vue-next/issues/342)), ([@pengYYYYY](https://github.com/pengYYYYY))
* Table: 修复固定表头错位 ([pr #352](https://github.com/Tencent/tdesign-vue-next/pull/352)), ([issue #299](https://github.com/Tencent/tdesign-vue-next/issues/299)), ([issue #325](https://github.com/Tencent/tdesign-vue-next/issues/325)), ([issue #316](https://github.com/Tencent/tdesign-vue-next/issues/316)), ([@pengYYYYY](https://github.com/pengYYYYY))
* Button: 修复 `primary outline` 模式下边框展示异常的问题 ([pr #238](https://github.com/Tencent/tdesign-common/pull/238)), ([@pengYYYYY](https://github.com/pengYYYYY))

### Features

* TagInput: ([pr #330](https://github.com/Tencent/tdesign-vue-next/pull/330)), ([@chaishi](https://github.com/chaishi))
  * `valueDisplay` 新增参数 `onClose`
  * 新增特性 `autoWidth`, 宽度自适应
* Input: 新增特性 `autoWidth`, 宽度自适应 ([pr #330](https://github.com/Tencent/tdesign-vue-next/pull/330)), ([@chaishi](https://github.com/chaishi))
* Checkbox: `change` 事件新增参数，`context.current` 表示当前变化的数据项；`context.type` 表示引起选中数据变化的是选中或是取消选中 ([pr #330](https://github.com/Tencent/tdesign-vue-next/pull/330)), ([@chaishi](https://github.com/chaishi))
* 通用方法 `renderTNodeJSX` 同时支持驼峰命名的插槽，和中划线命名的插槽 ([pr #330](https://github.com/Tencent/tdesign-vue-next/pull/330)), ([@chaishi](https://github.com/chaishi))
* 使用 `compositionAPi` 重构国际化 `mixin` ([pr #356](https://github.com/Tencent/tdesign-vue-next/pull/356)), ([@yc910920](https://github.com/yc910920))

## 0.8.1 `2022-02-18`


### Bug Fixes

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


### Features

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

## 0.8.0 `2022-01-28`

### BREAKING CHANGES

* Tag: `variant` 可选值修改为 `dark/light/outline/light-outline`, `plain` 已废弃 ([pr #274](https://github.com/Tencent/tdesign-vue-next/pull/274)), ([@pengYYYYY](https://github.com/pengYYYYY))

### Bug Fixes

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

### Features

* InputNumber: 增加 `align` 属性 ([961a8a5](https://github.com/Tencent/tdesign-vue-next/commit/961a8a540276c42e14b066c2413183f93cdd068f))
* Button: 统一各类型按钮边框宽度 ([pr #176](https://github.com/Tencent/tdesign-common/pull/176)), ([@BigLiao](https://github.com/BigLiao))

## 0.7.0 `2022-01-21`

### BREAKING CHANGES

* FormRule 的 `min` 和 `len` 根据一个中文等于两个字符的计算规则进行, 和 `max` 保持一致；`min` 和 `len` 在值为 Number 时, 进行数字大小的校验而非数字长度校验 ([pr #220](https://github.com/Tencent/tdesign-vue/pull/220)), ([@pengYYYYY](https://github.com/pengYYYYY))

### Bug Fixes

* Select: 修复下拉面板在远程搜索时的渲染出错 ([issue #235](https://github.com/Tencent/tdesign-vue-next/issues/235)), ([pr #237](https://github.com/Tencent/tdesign-vue-next/pull/237)), ([@pengYYYYY](https://github.com/pengYYYYY))
* Icon: 修复 ssr 渲染问题 ([pr #228](https://github.com/Tencent/tdesign-vue/pull/228)), ([@uyarn](https://github.com/uyarn))
* 修复 `umd` 产物中未包括 `reset` 及 `css variables` 声明的问题 ([pr #236](https://github.com/Tencent/tdesign-vue-next/pull/236)), ([@xiaosansiji](https://github.com/xiaosansiji))

### Features

* Skeleton: 新增 `Skeleton` 骨架屏组件, 请参照[官网](https://tdesign.tencent.com/vue-next/components/skeleton)使用, ([pr #214](https://github.com/Tencent/tdesign-vue/pull/214)), ([@pengYYYYY](https://github.com/pengYYYYY))
* TagInput: 新增 `TagInput` 组件, 请参照[官网](https://tdesign.tencent.com/vue-next/components/skeleton)使用, ([pr #131](https://github.com/Tencent/tdesign-vue-next/pull/131)), ([@chaishi](https://github.com/chaishi))
* Select: 新增 `panelTopContent`, `panelBottomContent` 插槽 ([pr #221](https://github.com/Tencent/tdesign-vue-next/pull/221)), ([@pengYYYYY](https://github.com/pengYYYYY)), 
* Textarea: 新增属性 `status` 用于控制状态, `tips` 用于控制信息提示 ([pr 246](https://github.com/Tencent/tdesign-vue-next/pull/246)), ([@chaishi](https://github.com/chaishi))
* Table:
  * 新增懒加载、虚拟滚动特性 ([pr #155](https://github.com/Tencent/tdesign-vue-next/pull/155)), ([@Louiszhai](https://github.com/Louiszhai))
  * 新增 `onCellClick` 事件 ([pr #247](https://github.com/Tencent/tdesign-vue-next/pull/247)), ([@pengYYYYY](https://github.com/pengYYYYY))

## 0.6.4 `2022-01-16`


### Bug Fixes

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

### Features

* Calendar: 增加 `monthChange` 事件 ([fde826e](https://github.com/Tencent/tdesign-vue-next/commit/fde826ed62e17fd3e275824c8fa3c10a7e75afff)), ([@PsTiu](https://github.com/PsTiu))
* Avatar: 使用 `compositionApi` 重构组件逻辑 ([1547cb9](https://github.com/Tencent/tdesign-vue-next/pull/160/commits/1547cb90b6103841280f7ead98f0ae69763c9eb6)), ([@vnues](https://github.com/vnues))
* Alert: ([@simpleAndElegant](https://github.com/simpleAndElegant))
  * 增加展开动画 ([76ee15f](https://github.com/Tencent/tdesign-vue-next/pull/159/commits/76ee15f338dfce59e3ad31fab2b332c256c5484d))
  * 使用 `compositionApi` 重构组件逻辑 ([4aec957](https://github.com/Tencent/tdesign-vue-next/pull/159/commits/76ee15f338dfce59e3ad31fab2b332c256c5484d))

## 0.6.3 `2022-01-06`

### Bug Fixes

* Menu:
  * 修复 `menu-item` 在不使用 `icon` 插槽的时候, 在左侧收回的时候多了一个数字 ([f801349](https://github.com/Tencent/tdesign-vue-next/commit/f80134917b20ce6400b013743628299c40db2f65)),  ([#124](https://github.com/Tencent/tdesign-vue-next/issues/124)), ([@LeeJim](https://github.com/LeeJim))
  * 修复三级菜单无缩进效果([f6e6142](https://github.com/Tencent/tdesign-vue-next/commit/f6e6142ccf6eea353926c5743138cd7992aa5fff)), ([#118](https://github.com/Tencent/tdesign-vue-next/issues/118)), ([@simpleAndElegant](https://github.com/simpleAndElegant))
  * 修复禁用菜单未禁用点击 ([45db957](https://github.com/Tencent/tdesign-vue-next/commit/45db9574dc76590a1ce27e3aafdd3a040a844a7f)), ([#119](https://github.com/Tencent/tdesign-vue-next/issues/119)), ([@simpleAndElegant](https://github.com/simpleAndElegant))
  * 修复双层导航显示错误 ([99749ed](https://github.com/Tencent/tdesign-vue-next/commit/99749ed4b0eaa57ccfef05a9fa920f36ba313f03)), ([#75](https://github.com/Tencent/tdesign-vue-next/issues/75))
  * 修复 `change` 事件两次触发 ([0b65c7a](https://github.com/Tencent/tdesign-vue-next/commit/0b65c7a1852a3e03084a86226d82c7f8d5a70925))
* Popup:
  * 修复 `mousedown` 事件无效 ([a1d3303](https://github.com/Tencent/tdesign-vue-next/commit/a1d330327b27288c362bfb5d6cb4953c764426a6))
  * 修复 `destory on close` 事件无效 ([fde46e7](https://github.com/Tencent/tdesign-vue-next/commit/fde46e73c7c439101663c2c5591ed08ab9aca854))
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

### Features

* Cascader:
  * 增加 `value-type` ([f7aaba2](https://github.com/Tencent/tdesign-vue-next/commit/f7aaba26804610fb9c9daec69e7b58003bf311b6))
  * 选择器宽度调整为继承外部宽度 ([41d4434](https://github.com/Tencent/tdesign-vue-next/commit/41d4434ef9cc1a75453b2fc477c11f363b2d55f2))
* Input:
  * 增加左侧、右侧文本 ([db155b3](https://github.com/Tencent/tdesign-vue-next/commit/db155b30fb009374308b2376d4a7dd7bf64338e8)), ([@mokywu](https://github.com/mokywu))
  * 增加 `placeholder` 全局配置  ([d727836](https://github.com/Tencent/tdesign-vue-next/commit/d72783641f4724cd16823ff5afe6de8f27933a9a))
* Steps: 增加 `readonly` 配置 ([d1ba7aa](https://github.com/Tencent/tdesign-vue-next/commit/d1ba7aa0aeb26fb69f57a1e2d41535249a3cad8b))
* Radio: 支持 `allowUnCheck` ([fa3acbf](https://github.com/Tencent/tdesign-vue-next/commit/fa3acbf199d818fe95d9b4493e641da47ebe2de5))
* Slider: 优化 `popup` 显示行为 ([076afde](https://github.com/Tencent/tdesign-vue-next/commit/076afded5e81ab6c09600dc2e0eb97ee05a68860)), ([#117](https://github.com/Tencent/tdesign-vue-next/issues/117)), ([@vnues](https://github.com/vnues))

## 0.6.0 `2021-12-22`

### BREAKING CHANGES

* `0.5.0` 升级至 `0.6.0` 版本 CSS BEM 规范改动列表 ([#32](https://github.com/Tencent/tdesign-vue-next/issues/32))

### Bug Fixes

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

### Features

* Checkbox: 新增 `checkbox` 插槽使用 ([fe3171b](https://github.com/Tencent/tdesign-vue-next/commit/fe3171b306a66c43ab25c3c7b38c8ad124571c10))
* Table: 新增 `expandedRow` 插槽使用  ([fe3171b](https://github.com/Tencent/tdesign-vue-next/commit/fe3171b306a66c43ab25c3c7b38c8ad124571c10))
* Select: 增加键盘事件([#39](https://github.com/Tencent/tdesign-vue-next/pull/12/commits/18bb03240d6d7556c4e5d8e568f9d7fbf9a0cdc8))([18bb032](https://github.com/Tencent/tdesign-vue-next/pull/12/commits/18bb03240d6d7556c4e5d8e568f9d7fbf9a0cdc8))
* Upload: 提取公共 `XHR` ([#82d1b0b](https://github.com/Tencent/tdesign-vue-next/pull/12/commits/82d1b0bd757d55d6723ae04b8649610cfa60b66b))
* DatePicker: 支持 `prefixIcon` 和 `suffixIcon` 插槽 ([#1d534c6](https://github.com/Tencent/tdesign-vue-next/pull/11/commits/1d534c6f29cdb8fc565858909e02b239a0f4887e))

## 0.5.0 `2021-12-08`

### BREAKING CHANGES

* 从 0.5.0 版本开始, 将只在外网 `npm registry` 上发布, 请安装外网包 [tdesign-vue-next](https://www.npmjs.com/package/tdesign-vue-next)
* LocalProvider 配置多语言方案已废弃, 请升级为 ConfigProvider。
* Icon:
  * 独立为 `npm` 包 `tdesign-icons-vue-next`, 项目中有直接使用 `Icon` 请升级后安装此npm包。
  * 新增 `CaretLeftSmallIcon` 等23个Icon, 移除 `ResourceListIcon`。 [@uyarn](https://github.com/uyarn)

### Bug Fixes

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

### Features

* Upload:
  * 自动上传模式删除非必要上传按钮。
  * 输入框模式新增删除按钮。
* Textarea: 支持 `maxcharacter` 用于字符文本长度控制。
* Checkbox: 全选功能支持插槽写法。
* Cascader: 支持 `loading` 状态。
* DatePicker: 支持 `firstDayOfWeek` API。

## 0.4.4 `2021-11-29`

### Bug Fixes

* Select: 修复直传 `options` 时 `filterable` 模式下有问题。
* Steps: 修复 `layout` 问题。
* Radio: 修复 `radio-group value` 不存在渲染问题。
* Popup: 修复在嵌套使用时问题。
* DialogPlugin:
  * 修复 `DialogPlugin` 为不可执行方法问题
  * 修复插件方式使用时 `ClassName` 透传覆盖。
* MessagePlugin: 修复 `MessagePlugin` 为不可执行方法问题。
* NotificationPlugin: 修复 `NotificationPlugin` 为不可执行方法问题。

### Features

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

## 0.4.3 `2021-11-22`

### Bug Fixes

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

### Features

* Avatar: 新增 `avatar` 组件。
* Calendar：新增属性 `fillWithZero`, `ConfigProvider` 新增配置项 `fillWithZero`。

## 0.4.2 `2021-11-15`

### Bug Fixes

* DatePicker: 修复 `footer` 样式。
* Tabs: `destroyOnHide` 逻辑修复。
* Popconfirm: 修复在 `0.4.1` 版本无法使用的问题。
* Upload:
  * 模拟进度触发进度条更新事件。
  * 修复不可用状态下的样式问题。
* TreeSelect: 修复 `v-model` 绑定的 `bug`。
* Popup: 修复 `popup arrow` 定位不跟随 `content` 内容问题。

### Features

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

## 0.4.1 `2021-11-06`

### Bug Fixes

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

### Features

* Table:
  * 增加 `expandIcon` 插槽。
  * 增加表格过滤自定义。
* 全局配置: 增加 `drawer` 和 `dialog` 的全局配置。

## 0.4.0 `2021-10-29`

### BREAKING CHANGES

* Button: `shape` 默认值由 `square` 调整为 `rectangle`, 支持正方形按钮展示, 手动设置 `shape = square` 的小伙伴请删除设置, 没有设置过 `shape` 属性的可以忽略。

### Bug Fixes

* Dropdown: 修复 `item` 为函数时的渲染错误。
* Cascader：修复 `defaultValue` 监听变化的问题, 只消费一次。
* Tag: 修复 `icon svg` 引用错误, 后续 `icon` 会迁移到独立包。
* Calender：修复组件事件抛出问题。
* Pagination：修复无法隐藏分页大小控制器。
* DatePicker: 修复时间日期区间选择时选择时间问题。
* InputNumber：修复 `descrease` 样式问题。
* Upload: 修复图片预览 `icon` 无法点击。

### Features

* Form: 优化 `FormItem` 提示文案展示效果。
* Textarea: 透传外层属性。

## 0.3.5 `2021-10-25`

### Bug Fixes

* Breadcrumb: 修复 `Router` 注册后, `to` 属性无法跳转到正确页面。
* Tab: 修复点击删除 `tab` 按钮报错。
* ToolTip: 修复显示异常。

### Features

* 新增 `Comment` 组件。
* Select: 增加 `collapsedItems` && `minCollapsedNum` `API`。
* Cascader: 增加 `collapsedItems` && `minCollapsedNum` `API`。
* TreeSelect: 增加 `collapsedItems` && `minCollapsedNum` `API`。

## 0.3.4 `2021-10-14`

### Bug Fixes

* Steps 修复:
  * 带 `icon` 步骤条未显示 `icon`。
  * 修复组件中的 `current` 属性值。
* Pagination: 修复 `change` 事件边界触发问题。
* Form: `0.3.3` 版本 `rules` 校验规则失效。
* Transfer: 处理 `disable` 选项可选的问题 && 处理重复 `key` 的 `warning`。

### Features

* 增加 `cascader` 组件的 `load` 属性, `filterable` 属性。

## 0.3.3 `2021-09-29`

### Bug Fixes

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

### Features

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

## 0.3.2 `2021-09-22`

### Bug Fixes

* DatePicker: 组件增加日期范围的起始结束判断, 修复相关样式。
* Table: 修复组件事件触发逻辑。
* Pagination: 修复组件分页组件在页数小于等于 `1` 的时候不展示问题。
* 修复 `Affix` 与 `Anchor` 结合无法定位到对应 `tab` 。

### Features

* Anchor: 增加自定义游标。

## 0.3.1 `2021-09-17`

### BREAKING CHANGES

* Transfer: 组件重构, API,修改了 `keysType` 的定义。
* List: 组件 `asyncLoading` 缺陷修复 & `avatar` 重命名为 `image`。

### Bug Fixes

* Select: 修复关闭按钮失效。
* List: 修复 `asyncLoading`逻辑缺陷。
* Pagination: 修复受控属性问题。
* Table: 修复加载状态, 修复异步加载, 修复分页数据绑定问题, 修复组件告警。

### Features

* Upload: 新增 `Upload` 组件。
* DatePicker:新增 `DatePicker` 组件。
* Tree: 重构 `Tree` 组件, 同步特性与 `API`。
* Transfer: 重构 `Transfer` 组件, 同步特性与 `API`。
* Input: 实现 `autofocus` 属性。
* Tooltip: 添加 `visible-change` 事件。
* Dialog: 插槽支持透传 `style` 和 `className` 。
* Table: 增加拖拽排序, 增加固定列动态变化。

## 0.2.0 `2021-09-10`

### BREAKING CHANGES

* Radio Button: 调整组件样式 & 支持 `variant api` & `buttonStyle api` 已废弃。
* Form: 同步组件特性, 回调函数从 `result` 修改至 `validateResult`。

### Bug Fixes

* Checkbox: 修复`class` 不透传问题。
* Drawer: 修复组件 `header=false` 和 `closeBtn=false` 不生效问题。

### Features

* Dropdown: 新增 `Dropdown` 组件。

## 0.1.18 `2021-09-08`

### Bug Fixes

* Select: 修复组件无边框场景下尺寸异常。
* 修复 `cascader common` 引用路径问题。
* Popup: 修复展开动画向上延展问题。

### Features

* Swiper: 新增 `Swiper` 组件。

## 0.1.16 `2021-09-03`

### Bug Fixes

* 修复 `package.json` 中 `typings` 文件路径

### Features

* TimePicker: 新增 `TimePicker` 组件。
* TreeSelect: 新增 `TreeSelect` 组件。
* Cascader: 新增 `Cascader` 组件。
* 切换 `eslint` 规则集到 `eslint-config-airbnb-base`。

### Performance Improvements

* Select: 改进 `show` 规则, 提高多 `options` 下的 `dom` 性能。

## 0.1.14 `2021-09-01`

### Bug Fixes

* `TypeScript` 修复引用路径问题。

## 0.1.13 `2021-08-31`

### Bug Fixes

* MenuItem:  修复组件 `to` 属性无法跳转问题。
* Select:  修复 `close icon` 点击后冒泡问题。

### Features

* Popup: 增加下拉动效特性。
* ToolTip: 重构组件, `UI` 与 `API` 特性同步。
* Gride:  重构组件, `UI` 与 `API` 特性同步。
* Pagination:  重构组件, `UI` 与 `API` 特性同步。
* InputNumber:  重构组件, `UI` 与 `API` 特性同步。

## 0.1.12 `2021-08-27`

### Bug Fixes

* Select: 重构组件, `UI` 与 `API` 特性同步。
* Dialog: 重构组件, `UI` 与 `API` 特性同步。
* CheckBox: 修复 `Checked` 参数校验问题。
* Tag：`UI` 样式修复。

### Features

* Affix: 新增 `Affix` 组件。
* Anchor: 新增 `Anchor` 组件。
* Button: 新增斜八度点击动画。
* Tree: 新增斜八度点击动画。
* Select: 新增斜八度点击动画。
* 子仓库 `common` 迁移到 `_common`。

## 0.1.11 `2021-08-20`

### Bug Fixes

* 修复导致vite无法热更新的问题

### Features

* 仓库开发环境及站点从 `webpack` 迁移至 `vite`。
* Loading: 重构组件, `UI` 与 `API` 特性同步。
* Tabs: 重构组件, `UI` 与 `API` 特性同步。
* Steps: 重构组件, `UI` 与 `API` 特性同步。
* Breadcrumb: 重构组件, `UI` 与 `API` 特性同步。
* Menu: 重构组件, `UI` 与 `API` 特性同步。

## 0.1.10 `2021-08-13`

### Bug Fixes

* 修复 `TypeScript` 引用路径问题, 迁移 `props` 至 `src` 下。

## 0.1.9 `2021-08-09`

### Bug Fixes

* Tabs: 修复 `panel` 无法实时更新的问题。
* PopConfirm: 重构组件, `UI` 与 `API` 特性同步。
* Popup: 重构组件, `UI` 与 `API` 特性同步。

### Features

* Calendar: 新增 `Calendar` 组件。
* Table: 新增 `Table`组件。。

## 0.1.8 `2021-07-01`

### Features

* Menu: 新增 `Menu` 组件。

## 0.1.3 `2021-06-08`

### Features

* Transfer: 新增 `Transfer` 组件。

## 0.1.2 `2021-05-20`

### Features

* Pagination: 新增 `Pagination`组件。

## 0.1.0 `2021-05-19`

### Features

* 首个测试版发布。`Upload`、`Calendar`、`Menu`、`DatePicker`、`TimePicker`、`TextArea`、`Pagination`、`Transfer` 组件除外。
