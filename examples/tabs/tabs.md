:: BASE_DOC ::

## API

### Tabs Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
addable | Boolean | false | 选项卡是否可增加 | N
disabled | Boolean | false | 是否禁用选项卡 | N
list | Array | - | 选项卡列表。TS 类型：`Array<TdTabPanelProps>` | N
placement | String | top | 选项卡位置。可选项：left/top/bottom/right | N
size | String | medium | 组件尺寸。可选项：medium/large | N
theme | String | normal | 选项卡风格，包含 默认风格 和 卡片风格两种。可选项：normal/card | N
value | String / Number | - | 激活的选项卡值。支持语法糖。TS 类型：`TabValue`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/tabs/type.ts) | N
defaultValue | String / Number | - | 激活的选项卡值。非受控属性。TS 类型：`TabValue`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/tabs/type.ts) | N
onAdd | Function |  | 添加选项卡时触发。`(context: { e: MouseEvent }) => {}` | N
onChange | Function |  | 激活的选项卡发生变化时触发。`(value: TabValue) => {}` | N
onRemove | Function |  | 删除选项卡时触发。`(options: { value: TabValue; index: number; e: MouseEvent }) => {}` | N

### Tabs Events

名称 | 参数 | 描述
-- | -- | --
add | `(context: { e: MouseEvent })` | 添加选项卡时触发
change | `(value: TabValue)` | 激活的选项卡发生变化时触发
remove | `(options: { value: TabValue; index: number; e: MouseEvent })` | 删除选项卡时触发

### TabPanel Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
default | Slot / Function | - | 用于自定义选项卡导航，同 panel。TS 类型：`TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
destroyOnHide | Boolean | true | 选项卡内容隐藏时是否销毁 | N
disabled | Boolean | false | 是否禁用当前选项卡 | N
label | String / Slot / Function | - | 选项卡名称，可自定义选项卡导航内容。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
panel | String / Slot / Function | - | 用于自定义选项卡面板内容。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
removable | Boolean | false | 当前选项卡是否允许移除 | N
value | String / Number | - | 选项卡的值，唯一标识。TS 类型：`TabValue` | N
onRemove | Function |  | 点击删除按钮时触发。`(options: { value: TabValue; e: MouseEvent }) => {}` | N

### TabPanel Events

名称 | 参数 | 描述
-- | -- | --
remove | `(options: { value: TabValue; e: MouseEvent })` | 点击删除按钮时触发
