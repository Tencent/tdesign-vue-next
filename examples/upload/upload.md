:: BASE_DOC ::

### 输入框文件上传

::: demo demos/single-input
:::

## API

### Upload Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
accept | String | - | 接受上传的文件类型，[查看 W3C示例](https://www.w3schools.com/tags/att_input_accept.asp)，[查看 MDN 示例](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/file) | N
action | String | - | 上传接口 | N
autoUpload | Boolean | true | 是否选取文件后自动上传 | N
beforeUpload | Function | - | 上传文件之前的钩子，参数为上传的文件，返回值决定是否上传。TS 类型：`(file: File | UploadFile) => boolean | Promise<boolean>` | N
data | Object | - | 上传文件时所需的额外数据。TS 类型：`Record<string, any> | ((file: File) => Record<string, any>)` | N
default | String / Slot / Function | - | 触发上传的内容，同 trigger。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
disabled | Boolean | false | 是否禁用 | N
draggable | Boolean | false | 是否启用拖拽上传 | N
files | Array | - | 已上传文件列表。支持语法糖。TS 类型：`Array<UploadFile>` | N
defaultFiles | Array | - | 已上传文件列表。非受控属性。TS 类型：`Array<UploadFile>` | N
format | Function | - | 文件上传前转换文件数据。TS 类型：`(file: File) => UploadFile` | N
formatResponse | Function | - | 用于格式化文件上传后的响应数据。error 用于显示错误提示，如果 error 值为真，组件会判定为上传失败；url 用于上传文件/图片地址。。TS 类型：`(response: any, context: FormatResponseContext) => ResponseType `。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/upload/type.ts) | N
headers | Object | - | 设置上传的请求头部。TS 类型：`{[key: string]: string}` | N
max | Number | 0 | 用于控制文件上传数量，值为 0 则不限制 | N
method | String | POST | HTTP 请求类型。可选项：POST/GET/PUT/OPTION | N
multiple | Boolean | false | 是否支持多选文件 | N
name | String | 'file' | 文件上传时的名称 | N
placeholder | String | - | 占位符 | N
requestMethod | Function | - | 自定义上传方法。返回值 status 表示上传成功或失败，error 表示上传失败的原因，response 表示请求上传成功后的返回数据，response.url 表示上传成功后的图片地址。示例一：`{ status: 'fail', error: '上传失败', response }`。示例二：`{ status: 'success', response: { url: 'https://tdesign.gtimg.com/site/avatar.jpg' } }`。TS 类型：`(files: UploadFile) => Promise<RequestMethodResponse>`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/upload/type.ts) | N
showUploadProgress | Boolean | true | 是否显示上传进度 | N
sizeLimit | Number / Object | - | 图片文件大小限制，单位 KB。可选单位有：`'B' | 'KB' | 'MB' | 'GB'`。示例一：`1000`。示例二：`{ size: 2, unit: 'MB', message: '图片大小不超过 {sizeLimit} MB' }`。TS 类型：`number | SizeLimitObj`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/upload/type.ts) | N
theme | String | file | 组件风格。custom 表示完全自定义风格；file 表示默认文件上传风格；file-input 表示输入框形式的文件上传；file-flow 表示文件批量上传；image 表示默认图片上传风格；image-flow 表示图片批量上传。可选项：custom/file/file-input/file-flow/image/image-flow | N
tips | String | - | 小文本提示 | N
trigger | String / Slot / Function | - | 触发上传的内容。TS 类型：`string | TNode<TriggerContext>`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/upload/type.ts) | N
useMockProgress | Boolean | true | 是否显示为模拟进度。上传进度有模拟进度和真实进度两种。一般大小的文件上传，真实的上传进度只有 0 和 100，不利于交互呈现，因此组件内置模拟上传进度。真实上传进度一般用于大文件上传 | N
withCredentials | Boolean | false | 上传请求时是否携带 cookie | N
onCancelUpload | Function |  | 点击「取消上传」时触发。`() => {}` | N
onChange | Function |  | 已上传文件列表发生变化时触发。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/upload/type.ts)。`(value: Array<UploadFile>, context: UploadChangeContext) => {}` | N
onDragenter | Function |  | 进入拖拽区域时触发。`(context: { e: DragEvent }) => {}` | N
onDragleave | Function |  | 拖拽结束时触发。`(context: { e: DragEvent }) => {}` | N
onFail | Function |  | 上传失败后触发。`(options: { e: ProgressEvent; file: UploadFile }) => {}` | N
onPreview | Function |  | 点击预览时触发。`(options: { file: UploadFile; e: MouseEvent }) => {}` | N
onProgress | Function |  | 上传进度变化时触发，真实进度和模拟进度都会触发。type 值为 real 表示真实上传进度，type 值为 mock 表示模拟上传进度。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/upload/type.ts)。`(options: ProgressContext) => {}` | N
onRemove | Function |  | 移除文件时触发。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/upload/type.ts)。`(context: UploadRemoveContext) => {}` | N
onSuccess | Function |  | 上传成功后触发。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/upload/type.ts)。`(context: SuccessContext) => {}` | N

### Upload Events

名称 | 参数 | 描述
-- | -- | --
cancel-upload | - | 点击「取消上传」时触发
change | `(value: Array<UploadFile>, context: UploadChangeContext)` | 已上传文件列表发生变化时触发。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/upload/type.ts)
dragenter | `(context: { e: DragEvent })` | 进入拖拽区域时触发
dragleave | `(context: { e: DragEvent })` | 拖拽结束时触发
fail | `(options: { e: ProgressEvent; file: UploadFile })` | 上传失败后触发
preview | `(options: { file: UploadFile; e: MouseEvent })` | 点击预览时触发
progress | `(options: ProgressContext)` | 上传进度变化时触发，真实进度和模拟进度都会触发。type 值为 real 表示真实上传进度，type 值为 mock 表示模拟上传进度。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/upload/type.ts)
remove | `(context: UploadRemoveContext)` | 移除文件时触发。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/upload/type.ts)
success | `(context: SuccessContext)` | 上传成功后触发。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/upload/type.ts)

### UploadFile

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
lastModified | Number | - | 必需。上一次变更的时间 | Y
name | String | - | 必需。文件名称 | Y
percent | Number | - | 下载进度 | N
raw | Object | - | 原始文件对象。TS 类型：`File` | N
response | Object | - | 上传接口返回的数据 | N
size | Number | - | 必需。文件大小 | Y
status | String | - | 文件上传状态：上传成功，上传失败，上传中，等待上传。TS 类型：` 'success' | 'fail' | 'progress' | 'waiting'` | N
type | String | - | 必需。文件类型 | Y
url | String | - | 文件上传成功后的下载/访问地址 | N
File | - | - | 继承 `File` 中的全部 API | N
