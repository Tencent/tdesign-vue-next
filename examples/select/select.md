:: BASE_DOC ::

## API

### Select Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
bordered | Boolean | true | 是否有边框 | N
clearable | Boolean | false | 是否可以清空选项 | N
collapsedItems | Slot / Function | - | 多选情况下，用于设置折叠项内容，默认为 `+N`。如果需要悬浮就显示其他内容，可以使用 collapsedItems 自定义。TS 类型：`TNode<{ value: T[]; collapsedSelectedItems: T[]; count: number }>`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
creatable | Boolean | false | 是否允许用户创建新条目，需配合 filterable 使用 | N
disabled | Boolean | false | 是否禁用组件 | N
empty | String / Slot / Function | '' | 当下拉列表为空时显示的内容。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
filter | Function | - | 自定义过滤方法，用于对现有数据进行搜索过滤，判断是否过滤某一项数据。TS 类型：`(filterWords: string, option: T) => boolean | Promise<boolean>` | N
filterable | Boolean | false | 是否可搜索 | N
keys | Object | - | 用来定义 value / label 在 `options` 中对应的字段别名。TS 类型：`SelectKeysType`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/select/type.ts) | N
loading | Boolean | false | 是否为加载状态 | N
loadingText | String / Slot / Function | '' | 远程加载时显示的文字，支持自定义。如加上超链接。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
max | Number | 0 | 用于控制多选数量，值为 0 则不限制 | N
minCollapsedNum | Number | 0 | 最小折叠数量，用于多选情况下折叠选中项，超出该数值的选中项折叠。值为 0 则表示不折叠 | N
multiple | Boolean | false | 是否允许多选 | N
options | Array | [] | 数据化配置选项内容。TS 类型：`Array<T>` | N
placeholder | String | - | 占位符 | N
popupProps | Object | - | 透传给 popup 组件的参数。TS 类型：`PopupProps`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/select/type.ts) | N
prefixIcon | Slot / Function | - | 组件前置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
reserveKeyword | Boolean | false | 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词 | N
showCheckAlll | Boolean | false | 【讨论中】是否显示全选 | N
size | String | medium | 组件尺寸。可选项：small / medium / large。TS 类型：`SizeEnum`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
value | String / Number / Object / Array | - | 选中值。支持语法糖。TS 类型：`SelectValue`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/select/type.ts) | N
defaultValue | String / Number / Object / Array | - | 选中值。非受控属性。TS 类型：`SelectValue`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/select/type.ts) | N
valueDisplay | Slot / Function | - | 自定义选中项呈现方式。TS 类型：`TNode<{ value: T[]; onClose: () => void }>`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
valueType | String | value | 用于控制选中值的类型。假设数据选项为：`[{ label: '姓名', value: 'name' }]`，value 表示值仅返回数据选项中的 value， object 表示值返回全部数据。。可选项：value/object | N
onBlur | Function |  | 输入框失去焦点时触发。`(context: { value: SelectValue; e: FocusEvent | KeyboardEvent }) => {}` | N
onChange | Function |  | 选中值变化时触发。`(value: SelectValue) => {}` | N
onClear | Function |  | 点击清除按钮时触发。`(context: { e: MouseEvent }) => {}` | N
onCreate | Function |  | 当选择新创建的条目时触发。`(value: string | number) => {}` | N
onEnter | Function |  | 回车键按下时触发。`inputValue` 表示输入框的值，`value` 表示选中值。`(context: { inputValue: string; e: KeyboardEvent; value: SelectValue }) => {}` | N
onFocus | Function |  | 输入框获得焦点时触发。`(context: { value: SelectValue; e: FocusEvent | KeyboardEvent }) => {}` | N
onRemove | Function |  | 多选模式下，选中数据被移除时触发。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/select/type.ts)。`(options: SelectRemoveContext<T>) => {}` | N
onSearch | Function |  | 输入值变化时，触发搜索事件。主要用于远程搜索新数据。`(filterWords: string) => {}` | N
onVisibleChange | Function |  | 下拉框隐藏/显示时触发。`(visible: boolean) => {}` | N

### Select Events

名称 | 参数 | 描述
-- | -- | --
blur | `(context: { value: SelectValue; e: FocusEvent | KeyboardEvent })` | 输入框失去焦点时触发
change | `(value: SelectValue)` | 选中值变化时触发
clear | `(context: { e: MouseEvent })` | 点击清除按钮时触发
create | `(value: string | number)` | 当选择新创建的条目时触发
enter | `(context: { inputValue: string; e: KeyboardEvent; value: SelectValue })` | 回车键按下时触发。`inputValue` 表示输入框的值，`value` 表示选中值
focus | `(context: { value: SelectValue; e: FocusEvent | KeyboardEvent })` | 输入框获得焦点时触发
remove | `(options: SelectRemoveContext<T>)` | 多选模式下，选中数据被移除时触发。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/select/type.ts)
search | `(filterWords: string)` | 输入值变化时，触发搜索事件。主要用于远程搜索新数据
visible-change | `(visible: boolean)` | 下拉框隐藏/显示时触发

### Option Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
content | String / Slot / Function | - | 用于定义复杂的选项内容。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | 用于定义复杂的选项内容。同 content。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
disabled | Boolean | false | 是否禁用该选项 | N
label | String | - | 选项名称 | N
value | String / Number | - | 选项值 | N

### OptionGroup Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
divider | Boolean | true | 是否显示分隔线 | N
label | String | - | 分组别名 | N
