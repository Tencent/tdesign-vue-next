:: BASE_DOC ::

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