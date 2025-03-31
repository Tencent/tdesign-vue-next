:: BASE_DOC ::

## API

### ChatAction Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
content | String | - | 被复制的内容 | N
disabled | Boolean | false | 操作按钮是否可点击 | N
isBad | Boolean | false | 是否点踩 | N
isGood | Boolean | false | 是否点赞 | N
operationBtn | Array | ["replay", "copy", "good", "bad"] | 操作按钮配置项，可配置操作按钮选项和顺序 | N
onOperation | Function |  | TS 类型：`(value:string, context: { e: MouseEvent }) => void`<br/>点击点赞，点踩，复制，重新生成按钮时触发 | N

### ChatAction Events

名称 | 参数 | 描述
-- | -- | --
operation | `(value:string, context: { e: MouseEvent })` | 点击点赞，点踩，复制，重新生成按钮时触发
