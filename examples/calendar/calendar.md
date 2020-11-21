## calendar 日历

### 功能实例

::: demo demos/base 通用日历面板（默认）
:::

::: demo demos/defaultValue 初始化的时候指定高亮日期
:::

::: demo demos/firstDayOfWeek 指定第一列为周几
:::

::: demo demos/card 卡片模式日历
:::

::: demo demos/mode 年历
:::

::: demo demos/isShowWeekend 隐藏\显示周末
:::

::: demo demos/events 各种事件
:::

### 插槽示例

::: demo demos/head 头部插槽（组件左上角）
:::

::: demo demos/cell 单元格插槽-自定义内容
:::

::: demo demos/cellAppend 单元格插槽-追加内容
:::


### Calendar Props
| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|firstDayOfWeek|number|1|N|周起始日（可以设置第一列显示周几，其他列就顺延下去），mode为“month”的时候有效；传入的值得必须是整数1到7其中之一|
|defaultValue|Date|new Date()|N|初始化的时候指定高亮日期|
|theme|string|"full"|N|风格，传入值必须是"full"或"card"|
|mode|string|"month"|N|模式，传入值必须是"month"或"year"|
|preventCellContextmenu|boolen|false|N|是否禁用单元格右键默认系统菜单|
|isShowWeekendDefault|boolen|true|N|默认是否显示周末|


### Calendar Events
| 事件名 | 说明 | 说明 |
|-----|-----|-----|
|onCellClick|日历单元格点击事件（左键点击）|({ date: Date, mode: String }) => {}|
|onCellDoubleClick|日历单元格双击事件|({ date: Date, mode: String }) => {}|
|onCellRightClick|日历单元格点击事件（右键点击）|({ date: Date, mode: String }) => {}|

### Calendar Slots
| 插槽名称 | 类型 | 必传 | 说明 |
|-----|-----|-----|-----|
|cell|String/Function|N|单元格插槽（替换默认内容）|
|cellAppend|String/Function|N|单元格插槽（在原来的内容之后追加）|