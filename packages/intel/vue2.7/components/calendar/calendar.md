:: BASE_DOC ::

## API### Calendar Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
cell | String / Slot / Function | - | 单元格插槽。TS 类型：`string \| TNode<CalendarCell>`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
cellAppend | String / Slot / Function | - | 单元格插槽，在原来的内容之后追加。TS 类型：`string \| TNode<CalendarCell>`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
controllerConfig | Boolean / Object | undefined | 右上角控制器配置。支持全局配置。值为 false 则表示不显示控制器，值为 true 则显示控制器默认配置，值类型为 CalendarController 则显示为自定义控制器配置。TS 类型：`boolean \| CalendarController` | N
fillWithZero | Boolean | true | 小于 10 的日期，是否使用 '0' 填充。支持全局配置。默认表现为 `01` `02`，值为 false 表现为 `1` `2` `9` | N
firstDayOfWeek | Number | 1 | 第一天从星期几开始，仅在日历展示维度为月份时（mode = month）有效。默认为 1。可选项：1/2/3/4/5/6/7 | N
format | String | 'YYYY-MM-DD' | 用于格式化日期，决定事件参数 formattedFilterDate 的输出值。[详细文档](https://day.js.org/docs/en/display/format) | N
head | String / Slot / Function | - | 头部插槽（左上角处，默认不显示任何内容）。TS 类型：`string \| TNode<ControllerOptions>`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
isShowWeekendDefault | Boolean | true | 默认是否显示周末 | N
mode | String | month | 日历展示维度。可选项：month/year | N
month | String / Number | - | 控制当前面板展示月份，优先级高于 `controllerConfig.month` | N
multiple | Boolean | - | 是否高亮多个日期单元格 | N
preventCellContextmenu | Boolean | false | 是否禁用单元格右键默认系统菜单 | N
range | Array | - | 用于设置日历的年月份显示范围，[范围开始，范围结束]。TS 类型：`Array<CalendarValue>` | N
theme | String | full | 日历风格。可选项：full/card | N
value | String / Array / Date | - | 当前高亮的日期。TS 类型：`CalendarValue \| CalendarValue[]` `type CalendarValue = string \| Date`。[详细类型定义](https://github.com/Tencent/tdesign-vue/tree/develop/src/calendar/type.ts) | N
week | Array / Slot / Function | - | 用于自定义日历星期呈现方式。CalendarWeek.day 表示当前是星期几。示例一：['周一', '周二', '周三', '周四', '周五', '星期六', '星期天']。示例二：`({ day }) => '周' + day`。TS 类型：`Array<string> \| TNode<CalendarWeek>` `interface CalendarWeek { day: WeekDay }` `type WeekDay = 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-vue/tree/develop/src/calendar/type.ts) | N
year | String / Number | - | 控制当前面板展示年份，优先级高于 `controllerConfig.year` | N
onCellClick | Function |  | TS 类型：`(options: { cell: CalendarCell; e: MouseEvent }) => void`<br/>日历单元格点击时触发 | N
onCellDoubleClick | Function |  | TS 类型：`(options: { cell: CalendarCell; e: MouseEvent }) => void`<br/>日历单元格双击时触发 | N
onCellRightClick | Function |  | TS 类型：`(options: { cell: CalendarCell; e: MouseEvent }) => void`<br/>日历单元格右击时触发 | N
onControllerChange | Function |  | TS 类型：`(options: ControllerOptions) => void`<br/>右上角控件组选中值有变化的时候触发。[详细类型定义](https://github.com/Tencent/tdesign-vue/tree/develop/src/calendar/type.ts)。<br/>`interface ControllerOptions { filterDate: Date; formattedFilterDate: string; mode: string; isShowWeekend: boolean }`<br/> | N
onMonthChange | Function |  | TS 类型：`(options: { month: string; year: string }) => void`<br/>月份切换时触发 | N

### Calendar Events

名称 | 参数 | 描述
-- | -- | --
cell-click | `(options: { cell: CalendarCell; e: MouseEvent })` | 日历单元格点击时触发
cell-double-click | `(options: { cell: CalendarCell; e: MouseEvent })` | 日历单元格双击时触发
cell-right-click | `(options: { cell: CalendarCell; e: MouseEvent })` | 日历单元格右击时触发
controller-change | `(options: ControllerOptions)` | 右上角控件组选中值有变化的时候触发。[详细类型定义](https://github.com/Tencent/tdesign-vue/tree/develop/src/calendar/type.ts)。<br/>`interface ControllerOptions { filterDate: Date; formattedFilterDate: string; mode: string; isShowWeekend: boolean }`<br/>
month-change | `(options: { month: string; year: string })` | 月份切换时触发

### CalendarController

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
current | Object | - | “今天(本月)”按钮控制器。TS 类型：`{ visible?: boolean; currentDayButtonProps?: ButtonProps; currentMonthButtonProps?: ButtonProps }`，[Button API Documents](./button?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue/tree/develop/src/calendar/type.ts) | N
disabled | Boolean | false | 是否禁用右上角控制器 | N
mode | Object | - | 日历展示维度控制器。TS 类型：`{ visible?: boolean; radioGroupProps?: RadioGroupProps }`，[Radio API Documents](./radio?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue/tree/develop/src/calendar/type.ts) | N
month | Object | - | 日历月份控制器。TS 类型：`{ visible?: boolean; selectProps?: SelectProps }` | N
weekend | Object | - | 隐藏/显示周末控制器。TS 类型：`{ visible?: boolean; showWeekendButtonProps?: CheckTagProps; hideWeekendButtonProps?: CheckTagProps }`，[Tag API Documents](./tag?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue/tree/develop/src/calendar/type.ts) | N
year | Object | - | 日历年份控制器。TS 类型：`{ visible?: boolean; selectProps?: SelectProps }`，[Select API Documents](./select?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue/tree/develop/src/calendar/type.ts) | N

### CalendarCell

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
belongTo | Number | - | 用于表示日期单元格属于哪一个月份。值为 0 表示是当前日历显示的月份中的日期，值为 -1 表示是上个月的，值为 1 表示是下个月的（日历展示维度是“月”时有值） | N
date | Object | - | 日历单元格日期。TS 类型：`Date` | N
day | Number | - | 日期单元格对应的星期，值为 1~7，表示周一到周日。（日历展示维度是“月”时有值） | N
formattedDate | String | - | 日历单元格日期字符串（输出日期的格式和 format 有关） | N
isCurrent | Boolean | - | 日期单元格是否为当前高亮日期或高亮月份 | N
weekOrder | Number | - | 日期在本月的第几周（日历展示维度是“月”时有值） | N
`ControllerOptions` | \- | - | 继承 `ControllerOptions` 中的全部 API | N
