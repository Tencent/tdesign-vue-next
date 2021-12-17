:: BASE_DOC ::

## API

### Radio Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
allowUncheck | Boolean | false | 【开发中】是否允许取消选中 | N
checked | Boolean | - | 是否选中。支持语法糖 | N
defaultChecked | Boolean | - | 是否选中。非受控属性 | N
default | String / Slot / Function | - | 单选按钮内容，同 label。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
disabled | Boolean | undefined | 是否为禁用态 | N
label | String / Slot / Function | - | 主文案。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
name | String | - | HTM 元素原生属性 | N
value | String / Number / Boolean | undefined | 单选按钮的值。TS 类型：`RadioValue`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/radio/type.ts) | N
onChange | Function |  | 选中状态变化时触发。`(checked: boolean, context: { e: Event }) => {}` | N

### Radio Events

名称 | 参数 | 描述
-- | -- | --
change | `(checked: boolean, context: { e: Event })` | 选中状态变化时触发

### RadioGroup Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
buttonStyle | String | outline | 已废弃。单选组件按钮形式（请使用 variant 代替）。可选项：outline/solid | N
disabled | Boolean | undefined | 是否禁用全部子单选框 | N
name | String | - | HTML 元素原生属性 | N
options | Array | - | 单选组件按钮形式。RadioOption 数据类型为 string 或 number 时，表示 label 和 value 值相同。TS 类型：`Array<RadioOption>`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/radio/type.ts) | N
size | String | medium | 组件尺寸。可选项：small/medium/large。TS 类型：`SizeEnum`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
value | String / Number / Boolean | undefined | 选中的值。支持语法糖。TS 类型：`RadioValue` | N
defaultValue | String / Number / Boolean | undefined | 选中的值。非受控属性。TS 类型：`RadioValue` | N
variant | String | outline | 单选组件按钮形式。可选项：outline/primary-filled/default-filled | N
onChange | Function |  | 选中值发生变化时触发。`(value: RadioValue, context: { e: Event }) => {}` | N

### RadioGroup Events

名称 | 参数 | 描述
-- | -- | --
change | `(value: RadioValue, context: { e: Event })` | 选中值发生变化时触发
