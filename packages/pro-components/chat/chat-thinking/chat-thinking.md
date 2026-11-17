:: BASE_DOC ::

## 自定义图标

使用 `icon` 插槽自定义标题图标。未提供插槽时保留当前状态的默认图标；停止状态默认不显示图标，标题仍为“思考已终止”。

{{ icon }}

## API
### ChatThinking Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
content | Object | - | 思考内容对象。TS类型：`{ text?: string; title?: string }` | N
layout | String | block | 布局方式。可选项： block/border | N
status | ChatMessageStatus/Function | - | 思考状态。可选项：complete/stop/error/pending | N
maxHeight | Number | - | 内容区域最大高度，超出会自动滚动 | N
animation | String | circle | 加载动画类型。可选项： circle/moving/gradient | N
collapsed | Boolean | false | 是否折叠（受控） | N

### ChatThinking Slots

名称 | 说明
-- | --
icon | 自定义标题图标，不替换标题或折叠操作
content | 自定义思考内容，优先于默认插槽
default | 自定义思考内容
