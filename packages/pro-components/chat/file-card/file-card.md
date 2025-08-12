:: BASE_DOC ::

## API

### FileCard Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
class | String | - | 类名 | N
item | Attachment | false | 附件，同 Upload UploadFile | Y
disabled | Boolean | false | 禁用状态 | N
onRemove | (item: Attachment) => void | - | 附件移除时的回调函数 | N


### FileCard Events

名称 | 参数 | 描述
-- | -- | --
remove | `(item: Attachment) => void` | 附件移除时的回调函数