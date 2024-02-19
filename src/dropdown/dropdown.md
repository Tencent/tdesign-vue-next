:: BASE_DOC ::

### 绑定点击事件的下拉菜单

下拉菜单的操作项绑定 click 事件，常用于需要对每个操作项绑定不同的 click 事件的场景。

{{ event }}

### 通过插槽方式使用下拉菜单

下拉菜单操作项支持通过插槽的方式传递操作项。

{{ slot }}

## API
### Dropdown Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
direction | String | right | 多层级操作时，子层级展开方向。可选项：left/right | N
disabled | Boolean | false | 是否禁用组件 | N
hideAfterItemClick | Boolean | true | 点击选项后是否自动隐藏弹窗 | N
maxColumnWidth | String / Number | 100 | 选项最大宽度，内容超出时，显示为省略号。值为字符串时，值就是最大宽度；值为数字时，单位：px | N
maxHeight | Number | 300 | 弹窗最大高度，单位：px 。统一控制每一列的高度 | N
minColumnWidth | String / Number | 10 | 选项最小宽度。值为字符串时，值就是最小宽度；值为数字时，单位：px | N
options | Array | [] | 下拉操作项。TS 类型：`Array<DropdownOption>` `type DropdownOption = { children?: DropdownOption[] } & TdDropdownItemProps & Record<string, any>`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/dropdown/type.ts) | N
panelBottomContent | String / Slot / Function | - | 面板内的底部内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
panelTopContent | String / Slot / Function | - | 面板内的顶部内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
placement | String | bottom-left | 弹窗定位方式，可选值同 Popup 组件。可选项：top/left/right/bottom/top-left/top-right/bottom-left/bottom-right/left-top/left-bottom/right-top/right-bottom | N
popupProps | Object | - | 透传  Popup 组件属性，方便更加自由地控制。比如使用 popupProps.overlayStyle 设置浮层样式。TS 类型：`PopupProps`，[Popup API Documents](./popup?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/dropdown/type.ts) | N
trigger | String | hover | 触发下拉显示的方式。可选项：hover/click/focus/context-menu | N
onClick | Function |  | TS 类型：`(dropdownItem: DropdownOption, context: { e: MouseEvent }) => void`<br/>下拉操作项点击时触发 | N

### Dropdown Events

名称 | 参数 | 描述
-- | -- | --
click | `(dropdownItem: DropdownOption, context: { e: MouseEvent })` | 下拉操作项点击时触发

### DropdownItem Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
active | Boolean | false | 是否高亮当前操作项 | N
content | String / Slot / Function | '' | 下拉操作项内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
disabled | Boolean | false | 是否禁用操作项 | N
divider | Boolean | false | 是否显示操作项之间的分隔线（分隔线默认在下方） | N
prefixIcon | Slot / Function | - | 组件前置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
theme | String | default | 下拉菜单选项主题。可选项：default/success/warning/error。TS 类型：`DropdownItemTheme` `type DropdownItemTheme = 'default' \| 'success' \| 'warning' \| 'error'`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/dropdown-menu/type.ts) | N
value | String / Number / Object | - | 下拉操作项唯一标识。TS 类型：`string \| number \| { [key: string]: any }` | N
onClick | Function |  | TS 类型：`(dropdownItem: DropdownOption, context: { e: MouseEvent }) => void`<br/>点击时触发 | N

### DropdownItem Events

名称 | 参数 | 描述
-- | -- | --
click | `(dropdownItem: DropdownOption, context: { e: MouseEvent })` | 点击时触发
