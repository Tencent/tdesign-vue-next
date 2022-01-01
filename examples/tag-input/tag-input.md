:: BASE_DOC ::

## API
### TagInput Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
inputProps | Object | - | 透传 Input 组件全部属性。TS 类型：`InputProps`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tag-input/type.ts) | N
placeholder | String | undefined | 占位符 | N
readonly | Boolean | false | 是否只读，值为真会隐藏标签移除按钮和输入框 | N
value | Array | - | 值。支持语法糖。TS 类型：`TagInputValue`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tag-input/type.ts) | N
defaultValue | Array | - | 值。非受控属性。TS 类型：`TagInputValue`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tag-input/type.ts) | N
onChange | Function |  | 值变化时触发，参数 `trigger` 表示数据变化的触发来源。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tag-input/type.ts)。`(value: TagInputValue, context: { trigger: TriggerSource }) => {}` | N
onEnter | Function |  | 按键按下 Enter 时触发。`(value: TagInputValue, context: { e: KeyboardEvent; inputValue: InputValue }) => {}` | N

### TagInput Events

名称 | 参数 | 描述
-- | -- | --
change | `(value: TagInputValue, context: { trigger: TriggerSource })` | 值变化时触发，参数 `trigger` 表示数据变化的触发来源。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tag-input/type.ts)
enter | `(value: TagInputValue, context: { e: KeyboardEvent; inputValue: InputValue })` | 按键按下 Enter 时触发
