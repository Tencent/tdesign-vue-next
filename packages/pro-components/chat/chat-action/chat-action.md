:: BASE_DOC ::

## API

### ChatAction Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
content | String | - | 被复制的内容 | N
disabled | Boolean | false | 操作按钮是否可点击 | N
comment | String | - | 评价类型， 可选值： `'good(点赞)'/'bad(点踩)`， 默认为空| N
actionBar | Array | ["replay", "copy", "good", "bad", "share"] | 操作按钮配置项，可配置操作按钮选项和顺序。TS 类型：`Array<'replay'\|'copy'\|'good'\|'bad'\|'share'>` | N
onActions | Function |  | TS 类型：`(value:string, context: { e: MouseEvent }) => void`<br/>点击点赞，点踩，复制，重新生成按钮时触发 | N

### ChatAction Events

名称 | 参数 | 描述
-- | -- | --
actions | `(value:string, context: { e: MouseEvent })` | 点击点赞，点踩，复制，重新生成，分享按钮时触发
