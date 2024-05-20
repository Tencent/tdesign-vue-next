:: BASE_DOC ::

## API### Calendar Props

name | type | default | description | required
-- | -- | -- | -- | --
cell | String / Slot / Function | - | Typescript：`string \| TNode<CalendarCell>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
cellAppend | String / Slot / Function | - | Typescript：`string \| TNode<CalendarCell>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
controllerConfig | Boolean / Object | - | Typescript：`boolean \| CalendarController` | N
fillWithZero | Boolean | true | \- | N
firstDayOfWeek | Number | 1 | options：1/2/3/4/5/6/7 | N
format | String | 'YYYY-MM-DD' | \- | N
head | String / Slot / Function | - | Typescript：`string \| TNode<ControllerOptions>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
isShowWeekendDefault | Boolean | true | \- | N
mode | String | month | options：month/year | N
month | String / Number | - | \- | N
multiple | Boolean | - | \- | N
preventCellContextmenu | Boolean | false | \- | N
range | Array | - | Typescript：`Array<CalendarValue>` | N
theme | String | full | options：full/card | N
value | String / Date | - | Typescript：`CalendarValue \| CalendarValue[]` `type CalendarValue = string \| Date`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/calendar/type.ts) | N
week | Array / Slot / Function | - | Typescript：`Array<string> \| TNode<CalendarWeek>` `interface CalendarWeek { day: WeekDay }` `type WeekDay = 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/calendar/type.ts) | N
year | String / Number | - | \- | N
onCellClick | Function |  | Typescript：`(options: { cell: CalendarCell; e: MouseEvent }) => void`<br/> | N
onCellDoubleClick | Function |  | Typescript：`(options: { cell: CalendarCell; e: MouseEvent }) => void`<br/> | N
onCellRightClick | Function |  | Typescript：`(options: { cell: CalendarCell; e: MouseEvent }) => void`<br/> | N
onControllerChange | Function |  | Typescript：`(options: ControllerOptions) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/calendar/type.ts)。<br/>`interface ControllerOptions { filterDate: Date; formattedFilterDate: string; mode: string; isShowWeekend: boolean }`<br/> | N
onMonthChange | Function |  | Typescript：`(options: { month: string; year: string }) => void`<br/> | N

### Calendar Events

name | params | description
-- | -- | --
cell-click | `(options: { cell: CalendarCell; e: MouseEvent })` | \-
cell-double-click | `(options: { cell: CalendarCell; e: MouseEvent })` | \-
cell-right-click | `(options: { cell: CalendarCell; e: MouseEvent })` | \-
controller-change | `(options: ControllerOptions)` | [see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/calendar/type.ts)。<br/>`interface ControllerOptions { filterDate: Date; formattedFilterDate: string; mode: string; isShowWeekend: boolean }`<br/>
month-change | `(options: { month: string; year: string })` | \-

### CalendarController

name | type | default | description | required
-- | -- | -- | -- | --
current | Object | - | Typescript：`{ visible?: boolean; currentDayButtonProps?: ButtonProps; currentMonthButtonProps?: ButtonProps }` | N
disabled | Boolean | false | \- | N
mode | Object | - | Typescript：`{ visible?: boolean; radioGroupProps?: RadioGroupProps }`，[Radio API Documents](./radio?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/calendar/type.ts) | N
month | Object | - | Typescript：`{ visible?: boolean; selectProps?: SelectProps }` | N
weekend | Object | - | Typescript：`{ visible?: boolean; showWeekendButtonProps?: CheckTagProps; hideWeekendButtonProps?: CheckTagProps }`，[Tag API Documents](./tag?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/calendar/type.ts) | N
year | Object | - | Typescript：`{ visible?: boolean; selectProps?: SelectProps }`，[Select API Documents](./select?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/calendar/type.ts) | N

### CalendarCell

name | type | default | description | required
-- | -- | -- | -- | --
belongTo | Number | - | \- | N
date | Object | - | Typescript：`Date` | N
day | Number | - | \- | N
formattedDate | String | - | \- | N
isCurrent | Boolean | - | \- | N
weekOrder | Number | - | \- | N
`ControllerOptions` | \- | - | \- | N

## API

### Calendar Props

name | type | default | description | required
-- | -- | -- | -- | --
cell | String / Slot / Function | - | Typescript：`string \| TNode<CalendarCell>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
cellAppend | String / Slot / Function | - | Typescript：`string \| TNode<CalendarCell>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
controllerConfig | Boolean / Object | undefined | Typescript：`boolean \| CalendarController` | N
fillWithZero | Boolean | true | \- | N
firstDayOfWeek | Number | 1 | options：1/2/3/4/5/6/7 | N
format | String | 'YYYY-MM-DD' | \- | N
head | String / Slot / Function | - | Typescript：`string \| TNode<ControllerOptions>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
isShowWeekendDefault | Boolean | true | \- | N
mode | String | month | options：month/year | N
month | String / Number | - | \- | N
multiple | Boolean | - | \- | N
preventCellContextmenu | Boolean | false | \- | N
range | Array | - | Typescript：`Array<CalendarValue>` | N
theme | String | full | options：full/card | N
value | String / Array / Date | - | Typescript：`CalendarValue \| CalendarValue[]` `type CalendarValue = string \| Date`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/calendar/type.ts) | N
week | Array / Slot / Function | - | Typescript：`Array<string> \| TNode<CalendarWeek>` `interface CalendarWeek { day: WeekDay }` `type WeekDay = 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/calendar/type.ts) | N
year | String / Number | - | \- | N
onCellClick | Function |  | Typescript：`(options: { cell: CalendarCell; e: MouseEvent }) => void`<br/> | N
onCellDoubleClick | Function |  | Typescript：`(options: { cell: CalendarCell; e: MouseEvent }) => void`<br/> | N
onCellRightClick | Function |  | Typescript：`(options: { cell: CalendarCell; e: MouseEvent }) => void`<br/> | N
onControllerChange | Function |  | Typescript：`(options: ControllerOptions) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/calendar/type.ts)。<br/>`interface ControllerOptions { filterDate: Date; formattedFilterDate: string; mode: string; isShowWeekend: boolean }`<br/> | N
onMonthChange | Function |  | Typescript：`(options: { month: string; year: string }) => void`<br/> | N

### Calendar Events

name | params | description
-- | -- | --
cell-click | `(options: { cell: CalendarCell; e: MouseEvent })` | \-
cell-double-click | `(options: { cell: CalendarCell; e: MouseEvent })` | \-
cell-right-click | `(options: { cell: CalendarCell; e: MouseEvent })` | \-
controller-change | `(options: ControllerOptions)` | [see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/calendar/type.ts)。<br/>`interface ControllerOptions { filterDate: Date; formattedFilterDate: string; mode: string; isShowWeekend: boolean }`<br/>
month-change | `(options: { month: string; year: string })` | \-

### CalendarController

name | type | default | description | required
-- | -- | -- | -- | --
current | Object | - | Typescript：`{ visible?: boolean; currentDayButtonProps?: ButtonProps; currentMonthButtonProps?: ButtonProps }`，[Button API Documents](./button?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/calendar/type.ts) | N
disabled | Boolean | false | \- | N
mode | Object | - | Typescript：`{ visible?: boolean; radioGroupProps?: RadioGroupProps }`，[Radio API Documents](./radio?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/calendar/type.ts) | N
month | Object | - | Typescript：`{ visible?: boolean; selectProps?: SelectProps }` | N
weekend | Object | - | Typescript：`{ visible?: boolean; showWeekendButtonProps?: CheckTagProps; hideWeekendButtonProps?: CheckTagProps }`，[Tag API Documents](./tag?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/calendar/type.ts) | N
year | Object | - | Typescript：`{ visible?: boolean; selectProps?: SelectProps }`，[Select API Documents](./select?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/calendar/type.ts) | N

### CalendarCell

name | type | default | description | required
-- | -- | -- | -- | --
belongTo | Number | - | \- | N
date | Object | - | Typescript：`Date` | N
day | Number | - | \- | N
formattedDate | String | - | \- | N
isCurrent | Boolean | - | \- | N
weekOrder | Number | - | \- | N
`ControllerOptions` | \- | - | \- | N
