:: BASE_DOC ::

## API

### Attachments Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
class | String | - | 类名 | N
onRemove | (item: Attachment) => void / undefined | - | 附件移除时的回调函数 | N
items | Attachment[] | false | 附件列表，同 Upload UploadFile | Y
overflow | 'wrap'/'scrollX'/'scrollY' | 'wrap' | 文件列表超出时样式 | N

### ChatAction Events

名称 | 参数 | 描述
-- | -- | --
remove | `(item: Attachment) => void` | 附件移除时的回调函数