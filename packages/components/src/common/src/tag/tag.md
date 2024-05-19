:: BASE_DOC ::

## API
### Tag Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
closable | Boolean | false | 标签是否可关闭 | N
color | String | '' | 自定义颜色 | N
content | String / Slot / Function | - | 组件子元素。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | 组件子元素，同 `content`。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
disabled | Boolean | false | 标签禁用态，失效标签不能触发事件。默认风格（theme=default）才有禁用态 | N
icon | Slot / Function | undefined | 标签中的图标，可自定义图标呈现。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
maxWidth | String / Number | - | 标签最大宽度，宽度超出后会出现省略号。示例：'50px' / 80 | N
shape | String | square | 标签类型，有三种：方形、圆角方形、标记型。可选项：square/round/mark | N
size | String | medium | 标签尺寸。可选项：small/medium/large。TS 类型：`SizeEnum`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
theme | String | default | 组件风格，用于描述组件不同的应用场景。可选项：default/primary/warning/danger/success | N
variant | String | dark | 标签风格变体。可选项：dark/light/outline/light-outline | N
onClick | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>点击时触发 | N
onClose | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>如果关闭按钮存在，点击关闭按钮时触发 | N

### Tag Events

名称 | 参数 | 描述
-- | -- | --
click | `(context: { e: MouseEvent })` | 点击时触发
close | `(context: { e: MouseEvent })` | 如果关闭按钮存在，点击关闭按钮时触发

### CheckTag Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
checked | Boolean | - | 标签选中的状态，默认风格（theme=default）才有选中态。支持语法糖 `v-model` 或 `v-model:checked` | N
defaultChecked | Boolean | - | 标签选中的状态，默认风格（theme=default）才有选中态。非受控属性 | N
checkedProps | Object | - | 透传标签选中态属性。TS 类型：`TdTagProps` | N
content | String / Number / Array / Slot / Function | - | 组件子元素；传入数组时：[选中内容，非选中内容]。TS 类型：`string \| number \| string[] \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | 组件子元素，默认插槽。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
disabled | Boolean | false | 标签禁用态，失效标签不能触发事件。默认风格（theme=default）才有禁用态 | N
size | String | medium | 标签尺寸。可选项：small/medium/large。TS 类型：`SizeEnum`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
uncheckedProps | Object | - | 透传标签未选态属性。TS 类型：`TdTagProps` | N
value | String / Number | - | 标签唯一标识，一般用于标签组场景，单个可选择标签无需设置 | N
onChange | Function |  | TS 类型：`(checked: boolean, context: CheckTagChangeContext) => void`<br/>状态切换时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tag/type.ts)。<br/>`interface CheckTagChangeContext { e: MouseEvent \| KeyboardEvent; value: string \| number }`<br/> | N
onClick | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>点击标签时触发 | N

### CheckTag Events

名称 | 参数 | 描述
-- | -- | --
change | `(checked: boolean, context: CheckTagChangeContext)` | 状态切换时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tag/type.ts)。<br/>`interface CheckTagChangeContext { e: MouseEvent \| KeyboardEvent; value: string \| number }`<br/>
click | `(context: { e: MouseEvent })` | 点击标签时触发

### CheckTagGroup Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
checkedProps | Object | - | 透传标签选中态属性。TS 类型：`TdTagProps` | N
multiple | Boolean | false | 是否支持选中多个标签 | N
options | Array | - | 标签选项列表。TS 类型：`CheckTagGroupOption[]` `interface CheckTagGroupOption extends TdCheckTagProps { label: string \| TNode; value: string \| number }`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tag/type.ts) | N
uncheckedProps | Object | - | 透传标签未选态属性。TS 类型：`TdTagProps` | N
value | Array | [] | 选中标签值。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`CheckTagGroupValue` `type CheckTagGroupValue = Array<string \| number>`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tag/type.ts) | N
defaultValue | Array | [] | 选中标签值。非受控属性。TS 类型：`CheckTagGroupValue` `type CheckTagGroupValue = Array<string \| number>`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tag/type.ts) | N
onChange | Function |  | TS 类型：`(value: CheckTagGroupValue, context: CheckTagGroupChangeContext) => void`<br/>[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tag/type.ts)。<br/>`interface CheckTagGroupChangeContext { type: 'check' \| 'uncheck'; e: MouseEvent \| KeyboardEvent; value: string \| number }`<br/> | N

### CheckTagGroup Events

名称 | 参数 | 描述
-- | -- | --
change | `(value: CheckTagGroupValue, context: CheckTagGroupChangeContext)` | [详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tag/type.ts)。<br/>`interface CheckTagGroupChangeContext { type: 'check' \| 'uncheck'; e: MouseEvent \| KeyboardEvent; value: string \| number }`<br/>
