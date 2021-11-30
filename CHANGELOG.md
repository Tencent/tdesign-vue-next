# CHANGELOG

## 0.4.4 (2021-11-29)

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

* Steps: 组件部分逻辑重构，`direction` 即将在下个版本废弃，请改用 `layout` API，可选项类型不变。
* Tree: 支持 disableCheck 方法。
* Menu: 支持子菜单 `disabled` 配置
* Cascader: `checkStrictly=true` 时，点击选项，级联选择器不会收起；`collapsedItems` 支持 `function/slot` 自定义配置用法，
* Upload:
  * 补充上传失败判定条件，`formatResponse` 返回值 `error` 为真，则表示上传失败
  * progress 事件参数新增 `type: 'real' | 'mock'`，分别表示真实进度和模拟进度
  * 如果接口和 `formatResponse` 都没有返回 url，组件会默认填充一个图片预览地址
  * progress 事件返回的进度不会超过 100
  * 上传成功后执行 `formatResponse`

## 0.4.3 (2021-11-22)

### Bug Fixes

* Input：修复小键盘无法触发 `enter` 事件问题。
* List: 修复 `API` 变动但 `props` 未变动的问题。
* Loading：修复在 `safari` 的表现异常问题。
* Select: 修复 `value` 参数校验问题。
* Menu:
  * 部导航下拉菜单与双层导航激活样式效果丢失。
  * 收起侧边导航，展开收起子菜单，`expanded` 不同步。
  * 动态获取的菜单内容选中后，父级菜单没有 `t-is-active`。
* Grid: 优化 `gutter` 逻辑，传入 `number` 类型不指定纵向间隔。
* Table:
  * 修复 `rowClassName` 支持 `string`。
  * 修复 `selected-row-keys` 外部传值无效问题。
* TimePicker:
  * 调整 `step` 的逻辑 改为首位都为 `0`, 处理。
  * `clear` 事件处理冒泡。

### Features

* Avatar: 新增 avatar 组件。
* Calendar：新增属性 `fillWithZero`，`ConfigProvider` 新增配置项 `fillWithZero`。

## 0.4.2 (2021-11-15)

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
* Table: 新增 `tree` 属性，支持在表格中展示树形结构。
  * `tree.indent` 控制树结点缩进距离，单位：`px`，默认为 `24px`。
  * `tree.treeNodeColumnIndex` 控制树结点在第几列渲染，默认为 `0` ，第一列。
  * `tree.childrenKey` 控制树形结构子节点字段，默认为 `children`。
  * `tree.checkStrictly` 控制树形结构的行选中（多选），父子行选中是否独立，默认独立，值为 `true`
  * `selectChange` 事件回调参数新增 `type`，用以区分操作类型
* TreeSelect: 新增 `collapsedItems API` 的参数。
* Select: 新增 `collapsedItems API` 的参数。

## 0.4.1 (2021-11-06)

### Bug Fixes

* DatePicker:
  * 修复 `v-model` 使用场景下 `value` 未同步的问题。
  * 修复 `placeholder` 属性传入数组类型报错的问题。
* Table:
  * 修复 `size=small` 时展开按钮被隐藏的问题;内容超maxHeight时固定表头。
  * 修复固定列样式。
  * 修复expandIcon关闭后无法展开。
* Tag:修复 `icon api` 无法使用 `slot` 的问题。
* Tabs:修复生产环境和测试环境表现不一致。
* Popup:修复组件更新时定位的问题。
* TS: 修复 `TNode` `类型定义，MessagePlugin` 类型定义。

### Features

* Table:
  * 增加 `expandIcon` 插槽。
  * 增加表格过滤自定义。
* 全局配置: 增加 `drawer` 和 `dialog` 的全局配置。

## 0.4.0 (2021-10-29)

### BREAKING CHANGES

* Button: `shape` 默认值由 `square` 调整为 rectangle，支持正方形按钮展示，手动设置 shape = square 的小伙伴请删除设置，没有设置过 shape 属性的可以忽略。

### Bug Fixes

* Dropdown: 修复 `item` 为函数时的渲染错误。
* Cascader：修复 `defaultValue` 监听变化的问题，只消费一次。
* Tag: 修复 `icon svg` 引用错误, 后续 `icon` 会迁移到独立包。
* Calender：修复组件事件抛出问题。
* Pagination：修复无法隐藏分页大小控制器。
* DatePicker: 修复时间日期区间选择时选择时间问题。
* InputNumber：修复 `descrease` 样式问题。
* Upload: 修复图片预览 `icon` 无法点击。

### Features

* Form: 优化 `FormItem` 提示文案展示效果。
* Textarea: 透传外层属性。

## 0.3.5 (2021-10-25)

### Bug Fixes

* Breadcrumb: 修复 `Router` 注册后，`to` 属性无法跳转到正确页面。
* Tab: 修复点击删除 `tab` 按钮报错。
* ToolTip: 修复显示异常。

### Features

* 新增 `Comment` 组件。
* Select: 增加 `collapsedItems` 和 `minCollapsedNum`。
* Cascader: 增加 `collapsedItems` 和 `minCollapsedNum` API。
* TreeSelect: 增加 `collapsedItems` 和 `minCollapsedNum` API。

## 0.3.4 (2021-10-14)

### Bug Fixes

* Steps 修复:
  * 带 `icon` 步骤条未显示 `icon`。
  * 修复组件中的 `current` 属性值。
* Pagination: 修复 `change` 事件边界触发问题。
* Form: `0.3.3` 版本 `rules` 校验规则失效。
* Transfer: 处理 `disable` 选项可选的问题 && 处理重复 `key` 的 `warning`。

### Features

* 增加 `cascader` 组件的 `load` 属性，`filterable` 属性。

## 0.3.3 (2021-09-29)

### Bug Fixes

* Upload 修复
  * 组件 `method prop` 不生效 && 优化 `dragger` 组件的 `slot` 性能告警。
  * 修复 `format-response` 回掉函数不生效。
* Pagination: 修复组件事件不符合预期的问题 。
* Table: 修复在表头是多级表头的情况下排序不生效。
* Tree: 修复删除节点报错。
* Tooltip: 修复 `slot` 用法下，`class` 属性未能正常响应变化的问题。
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
  * 新增 `showUploadProgress` 属性，用于表示「是否显示上传进度」。
  * 新增 `sizeLimit` 属性，表示文件大小限制，支持 `1000` 和 `{ size: 3, unit: 'MB', message: '文件过大' }` 等方式，支持单位有 'B' | 'KB' | 'MB' | 'GB'。
* `FormItem` 支持 `labelWidth、labelAlign` & 调整 `labelWidth` 默认值为 `100px`。

## 0.3.2 (2021-09-22)

### Bug Fixes

* DatePicker: 组件增加日期范围的起始结束判断，修复相关样式。
* Table: 修复组件事件触发逻辑。
* Pagination: 修复组件分页组件在页数小于等于 `1` 的时候不展示问题。
* 修复 `Affix` 与 `Anchor` 结合无法定位到对应 `tab` 。

### Features

* Anchor: 增加自定义游标。

## 0.3.1 (2021-09-17)

### BREAKING CHANGES

* Transfer: 组件重构，API,修改了 `keysType` 的定义。
* List: 组件 `asyncLoading` 缺陷修复 & `avatar` 重命名为 `image`。

### Bug Fixes

* Select: 修复关闭按钮失效。
* List: 修复 `asyncLoading`逻辑缺陷。
* Pagination: 修复受控属性问题。
* Table: 修复加载状态，修复异步加载，修复分页数据绑定问题，修复组件告警。

### Features

* Upload: 新增 `Upload` 组件。
* DatePicker:新增 `DatePicker` 组件。
* Tree: 重构 `Tree` 组件，同步特性与 `API`。
* Transfer: 重构 `Transfer` 组件，同步特性与 `API`。
* Input: 实现 `autofocus` 属性。
* Tooltip: 添加 `visible-change` 事件。
* Dialog: 插槽支持透传 `style` 和 `className` 。
* Table: 增加拖拽排序，增加固定列动态变化。

## 0.2.0 (2021-09-10)

### BREAKING CHANGES

* Radio Button: 调整组件样式 & 支持 `variant api` & `buttonStyle api` 已废弃。
* Form: 同步组件特性，回调函数从 `result` 修改至 `validateResult`。

### Bug Fixes

* Checkbox: 修复`class` 不透传问题。
* Drawer: 修复组件 `header=false` 和 `closeBtn=false` 不生效问题。

### Features

* Dropdown: 新增 `Dropdown` 组件。

## 0.1.18 (2021-09-08)

### Bug Fixes

* Select: 修复组件无边框场景下尺寸异常。
* 修复 `cascader common` 引用路径问题。
* Popup: 修复展开动画向上延展问题。

### Features

* Swiper: 新增 `Swiper` 组件。

## 0.1.16 (2021-09-03)

### Bug Fixes

* 修复 `package.json` 中 `typings` 文件路径

### Features

* TimePicker: 新增 `TimePicker` 组件。
* TreeSelect: 新增 `TreeSelect` 组件。
* Cascader: 新增 `Cascader` 组件。
* 切换 `eslint` 规则集到 `eslint-config-airbnb-base`。

### Performance Improvements

* Select: 改进 `show` 规则，提高多 `options` 下的 `dom` 性能。

## 0.1.14 (2021-09-01)

### Bug Fixes

* `TypeScript` 修复引用路径问题。

## 0.1.13 (2021-08-31)

### Bug Fixes

* MenuItem:  修复组件 `to` 属性无法跳转问题。
* Select:  修复 `close icon` 点击后冒泡问题。

### Features

* Popup: 增加下拉动效特性。
* ToolTip: 重构组件，`UI` 与 `API` 特性同步。
* Gride:  重构组件，`UI` 与 `API` 特性同步。
* Pagination:  重构组件，`UI` 与 `API` 特性同步。
* InputNumber:  重构组件，`UI` 与 `API` 特性同步。

## 0.1.12 (2021-08-27)

### Bug Fixes

* Select: 重构组件，`UI` 与 `API` 特性同步。
* Dialog: 重构组件，`UI` 与 `API` 特性同步。
* CheckBox: 修复 `Checked` 参数校验问题。
* Tag：`UI` 样式修复。

### Features

* Affix: 新增 `Affix` 组件。
* Anchor: 新增 `Anchor` 组件。
* Button: 新增斜八度点击动画。
* Tree: 新增斜八度点击动画。
* Select: 新增斜八度点击动画。
* 子仓库 `common` 迁移到 `_common`。

## 0.1.11 (2021-08-20)

### Bug Fixes

* 同步 `Loading`，`Tabs`，`Steps`，`Breadcrumb`，`Menu` 组件，同步组件demo, 修复导致vite无法热更新的问题

### Features

* `vue` 仓库开发及站点从 `webpack` 迁移至 `vite`。

## 0.1.10 (2021-08-13)

### Bug Fixes

* 修复 `TypeScript` 引用路径问题，迁移 `props` 至 `src` 下。

## 0.1.9 (2021-08-09)

### Bug Fixes

* Tabs: 修复 `panel` 无法实时更新的问题。
* PopConfirm: 重构组件，`UI` 与 `API` 特性同步。
* Popup: 重构组件，`UI` 与 `API` 特性同步。

### Features

* Calendar: 新增 `Calendar` 组件。
* Table: 新增 `Table`组件。。

## 0.1.8 (2021-07-01)

### Features

* Menu: 新增 `Menu` 组件。

## 0.1.3 (2021-06-08)

### Features

* Transfer: 新增 `Transfer` 组件。

## 0.1.2 (2021-05-20)

### Features

* Pagination: 新增 `Pagination`组件。

## 0.1.0 (2021-05-19)

### Features

* 首个测试版发布，`Upload`、`Calendar`、`Menu`、`DatePicker`、`TimePicker`、`TextArea`、`Pagination`、`Transfer` 组件除外。
