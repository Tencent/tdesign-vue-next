:: BASE_DOC ::

## API
### Timeline Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
labelAlign | String | left | 标签信息放在时间轴的位置，`mode='alternate'` 时生效。纵向时间轴信息位置：左侧、右侧或两侧，默认信息在时间轴右侧。横向时间轴信息位置：上方、下方、两侧。可选项：left/right/alternate/top/bottom | N
layout | String | vertical | 时间轴方向：水平方向、垂直方向。可选项：horizontal/vertical | N
mode | String | alternate | 标签与内容文本的位置关系，`alternate` 为展示在轴两侧，`same` 为展示在同一侧。可选项：alternate/same | N
reverse | Boolean | false | 时间轴是否表现为倒序 | N
theme | String | default | 步骤条风格。可选项：default/dot | N

### TimelineItem Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
content | String / Slot / Function | - | 描述内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
dot | Slot / Function | - | 用于自定义时间轴节点元素。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
dotColor | String | primary | 时间轴颜色，内置 `primary/warning/error/default` 四种色值，可传入 16 进制颜色码或 RGB 颜色值.。TS 类型：`string` | N
label | String / Slot / Function | - | 标签文本内容，可完全自定义。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
labelAlign | String | - | 标签信息相对于时间轴的位置，在 `mode='alternate'` 时生效，优先级高于 `Timeline.labelAlign`。可选项：left/right/top/bottom | N
loading | Boolean | - | 是否处在加载状态 | N
onClick | Function |  | TS 类型：`(context: { e: MouseEvent; item: TdTimelineItemProps }) => void`<br/>点击时触发 | N

### TimelineItem Events

名称 | 参数 | 描述
-- | -- | --
click | `(context: { e: MouseEvent; item: TdTimelineItemProps })` | 点击时触发
