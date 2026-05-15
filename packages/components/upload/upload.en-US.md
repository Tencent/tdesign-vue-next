:: BASE_DOC ::

## API
### Upload Props

name | type | default | description | required
-- | -- | -- | -- | --
abridgeName | Array | - | ellipsis text of medium file name。Typescript：`Array<number>` | N
accept | String | - | File types that can be accepted. [W3C](https://www.w3schools.com/tags/att_input_accept.asp)，[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/file) | N
action | String | - | Uploading URL | N
allowUploadDuplicateFile | Boolean | false | allow to upload duplicate name files | N
autoUpload | Boolean | true | post upload request automatically after files being selected | N
beforeAllFilesUpload | Function | - | before all files upload, return false can stop uploading file。Typescript：`(file: UploadFile[]) => boolean \| Promise<boolean>` | N
beforeUpload | Function | - | stop one of files to upload。Typescript：`(file: UploadFile) => boolean \| Promise<boolean>` | N
cancelUploadButton | Object / Slot / Function | - | cancel upload button props, which showed on `autoUpload=false` and multiple files/images upload。Typescript：`null \| ButtonProps \| TNode<{ disabled: boolean; cancelUploadText: string; cancelUpload: (ctx: { e: MouseEvent }) => void }>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
data | Object / Function | - | extra request data of uploading. `formatRequest` can redefine all request data。Typescript：`Record<string, any> \| ((files: UploadFile[]) => Record<string, any>)` | N
default | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
disabled | Boolean | - | make upload to be disabled | N
dragContent | String / Slot / Function | - | define drag content nodes, it works on `theme=custom`。Typescript：`TNode \| TNode<TriggerContext>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
draggable | Boolean | undefined | if drag uploading allowed, works on `theme=file` or `theme=image` | N
fileListDisplay | Slot / Function | - | used to render file list UI。Typescript：`TNode<{ files: UploadFile[]; dragEvents?: UploadDisplayDragEvents }>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
files | Array | [] | `v-model:files` is supported。Typescript：`Array<T>` | N
defaultFiles | Array | [] | uncontrolled property。Typescript：`Array<T>` | N
format | Function | - | to redefine  `UploadFile` data structure。Typescript：`(file: File) => UploadFile` | N
formatRequest | Function | - | redefine request data。Typescript：`(requestData: { [key: string]: any }) => { [key: string]: any }` | N
formatResponse | Function | - | redefine response data structure。Typescript：`(response: any, context: FormatResponseContext) => ResponseType ` `type ResponseType = { error?: string; url?: string; status?: 'fail' \| 'success'; files?: UploadFile[] } & Record<string, any>` `interface FormatResponseContext { file: UploadFile; currentFiles?: UploadFile[] }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/upload/type.ts) | N
headers | Object | - | HTTP Request Header。Typescript：`{[key: string]: string}` | N
imageViewerProps | Object | - | ImageViewer Component Props。Typescript：`ImageViewerProps`，[ImageViewer API Documents](./image-viewer?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/upload/type.ts) | N
inputAttributes | Object | - | add attributes to HTML element `input`。Typescript：`CSSProperties` | N
isBatchUpload | Boolean | false | make all files to be a whole package, files can only be replaced or deleted together, can not add more files | N
locale | Object | - | upload language config, priority of `locale` is higher than global language config。Typescript：`UploadConfig` `import { UploadConfig } from '../config-provider/type'`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/upload/type.ts) | N
max | Number | 0 | max count of files limit | N
method | String | POST | HTTP request method。options: POST/GET/PUT/OPTIONS/PATCH/post/get/put/options/patch | N
mockProgressDuration | Number | - | mock progress duration time. more large files more duration time | N
multiple | Boolean | false | multiple files uploading | N
name | String | file | field name of files in upload request data | N
placeholder | String | - | placeholder | N
requestMethod | Function | - | custom upload request method。Typescript：`(files: UploadFile \| UploadFile[]) => Promise<RequestMethodResponse>` `interface RequestMethodResponse { status: 'success' \| 'fail'; error?: string; response: { url?: string; files?: UploadFile[]; [key: string]: any } }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/upload/type.ts) | N
showImageFileName | Boolean | true | show image's name | N
showThumbnail | Boolean | false | show thumbnail before file name, only works on `theme=file-flow`  | N
showUploadProgress | Boolean | true | show upload progress nodes | N
sizeLimit | Number / Object | - | files size limit。Typescript：`number \| SizeLimitObj` `interface SizeLimitObj { size: number; unit: SizeUnit ; message?: string }` `type SizeUnitArray = ['B', 'KB', 'MB', 'GB']` `type SizeUnit = SizeUnitArray[number]`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/upload/type.ts) | N
status | String | - | tips status。options: default/success/warning/error | N
theme | String | file | different upload UI styles。options: custom/file/file-input/file-flow/image/image-flow | N
tips | String / Slot / Function | - | tips text below upload component, define it's color with `status`。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
trigger | Slot / Function | - | trigger elements UI。Typescript：`TNode<TriggerContext>` `interface TriggerContext { dragActive?: boolean;  files: UploadFile[]; triggerUpload?: (e: MouseEvent) => void }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/upload/type.ts) | N
triggerButtonProps | Object | - | trigger button props, it can be used to change color/size/href/... of the trigger button。Typescript：`ButtonProps`，[Button API Documents](./button?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/upload/type.ts) | N
uploadAllFilesInOneRequest | Boolean | false | uploading all files in one request | N
uploadButton | Object / Slot / Function | - | upload button props, which showed on `autoUpload=false` and multiple files/images upload。Typescript：`null \| ButtonProps \| TNode<{ disabled: boolean; uploading: boolean; uploadFiles: () => void; uploadText: string }>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
uploadPastedFiles | Boolean | true | allow to upload files in clipboard after pasting | N
useMockProgress | Boolean | true | use mock progress, instead of real progress | N
value | Array | [] | file list。`v-model` and `v-model:value` is supported。Typescript：`Array<T>` | N
defaultValue | Array | [] | file list。uncontrolled property。Typescript：`Array<T>` | N
withCredentials | Boolean | false | uploading request with cookie | N
onCancelUpload | Function |  | Typescript：`() => void`<br/>trigger on cancel button click | N
onChange | Function |  | Typescript：`(value: Array<T>, context: UploadChangeContext) => void`<br/>trigger on uploaded files change。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/upload/type.ts)。<br/>`interface UploadChangeContext { e?: MouseEvent \| ProgressEvent; response?: any; trigger: UploadChangeTrigger; index?: number; file?: UploadFile; files?: UploadFile[] }`<br/><br/>`type UploadChangeTrigger = 'add' \| 'remove' \| 'abort' \| 'progress-success' \| 'progress' \| 'progress-fail'`<br/> | N
onDragenter | Function |  | Typescript：`(context: { e: DragEvent }) => void`<br/>trigger on file dragged into drag elements | N
onDragleave | Function |  | Typescript：`(context: { e: DragEvent }) => void`<br/>trigger on file dragged leave drag elements | N
onDrop | Function |  | Typescript：`(context: { e: DragEvent }) => void`<br/>trigger on file dropped | N
onFail | Function |  | Typescript：`(options: UploadFailContext) => void`<br/>`response.error` used for error tips, `formatResponse` can format `response`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/upload/type.ts)。<br/>`interface UploadFailContext { e?: ProgressEvent; failedFiles: UploadFile[]; currentFiles: UploadFile[]; response?: any; file: UploadFile; XMLHttpRequest?: XMLHttpRequest}`<br/> | N
onOneFileFail | Function |  | Typescript：`(options: UploadFailContext) => void`<br/>trigger on one file upload failed | N
onOneFileSuccess | Function |  | Typescript：`(context: Pick<SuccessContext, 'e' \| 'file' \| 'response' \| 'XMLHttpRequest'>) => void`<br/>trigger on file uploaded successfully | N
onPreview | Function |  | Typescript：`(options: { file: UploadFile; index: number; e: MouseEvent }) => void`<br/>trigger on preview elements click | N
onProgress | Function |  | Typescript：`(options: ProgressContext) => void`<br/>uploading request progress event。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/upload/type.ts)。<br/>`interface ProgressContext { e?: ProgressEvent; file?: UploadFile; currentFiles: UploadFile[]; percent: number; type: UploadProgressType; XMLHttpRequest?: XMLHttpRequest }`<br/><br/>`type UploadProgressType = 'real' \| 'mock'`<br/> | N
onRemove | Function |  | Typescript：`(context: UploadRemoveContext) => void`<br/>trigger on file removed。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/upload/type.ts)。<br/>`interface UploadRemoveContext { index?: number; file?: UploadFile; e: MouseEvent }`<br/> | N
onSelectChange | Function |  | Typescript：`(files: File[], context: UploadSelectChangeContext) => void`<br/>trigger after file choose and before upload。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/upload/type.ts)。<br/>`interface UploadSelectChangeContext { currentSelectedFiles: UploadFile[] }`<br/> | N
onSuccess | Function |  | Typescript：`(context: SuccessContext) => void`<br/>trigger on all files uploaded successfully。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/upload/type.ts)。<br/>`interface SuccessContext { e?: ProgressEvent; file?: UploadFile; fileList?: UploadFile[]; currentFiles?: UploadFile[]; response?: any; results?: SuccessContext[]; XMLHttpRequest?: XMLHttpRequest }`<br/> | N
onValidate | Function |  | Typescript：`(context: { type: UploadValidateType, files: UploadFile[] }) => void`<br/>trigger on length over limit, or trigger on file size over limit。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/upload/type.ts)。<br/>`type UploadValidateType = 'FILE_OVER_SIZE_LIMIT' \| 'FILES_OVER_LENGTH_LIMIT' \| 'FILTER_FILE_SAME_NAME' \| 'BEFORE_ALL_FILES_UPLOAD' \| 'CUSTOM_BEFORE_UPLOAD'`<br/> | N
onWaitingUploadFilesChange | Function |  | Typescript：`(context: { files: Array<UploadFile>, trigger: 'validate' \| 'remove' \| 'uploaded' }) => void`<br/>trigger on waiting upload files changed | N

### Upload Events

name | params | description
-- | -- | --
cancel-upload | \- | trigger on cancel button click
change | `(value: Array<T>, context: UploadChangeContext)` | trigger on uploaded files change。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/upload/type.ts)。<br/>`interface UploadChangeContext { e?: MouseEvent \| ProgressEvent; response?: any; trigger: UploadChangeTrigger; index?: number; file?: UploadFile; files?: UploadFile[] }`<br/><br/>`type UploadChangeTrigger = 'add' \| 'remove' \| 'abort' \| 'progress-success' \| 'progress' \| 'progress-fail'`<br/>
dragenter | `(context: { e: DragEvent })` | trigger on file dragged into drag elements
dragleave | `(context: { e: DragEvent })` | trigger on file dragged leave drag elements
drop | `(context: { e: DragEvent })` | trigger on file dropped
fail | `(options: UploadFailContext)` | `response.error` used for error tips, `formatResponse` can format `response`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/upload/type.ts)。<br/>`interface UploadFailContext { e?: ProgressEvent; failedFiles: UploadFile[]; currentFiles: UploadFile[]; response?: any; file: UploadFile; XMLHttpRequest?: XMLHttpRequest}`<br/>
one-file-fail | `(options: UploadFailContext)` | trigger on one file upload failed
one-file-success | `(context: Pick<SuccessContext, 'e' \| 'file' \| 'response' \| 'XMLHttpRequest'>)` | trigger on file uploaded successfully
preview | `(options: { file: UploadFile; index: number; e: MouseEvent })` | trigger on preview elements click
progress | `(options: ProgressContext)` | uploading request progress event。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/upload/type.ts)。<br/>`interface ProgressContext { e?: ProgressEvent; file?: UploadFile; currentFiles: UploadFile[]; percent: number; type: UploadProgressType; XMLHttpRequest?: XMLHttpRequest }`<br/><br/>`type UploadProgressType = 'real' \| 'mock'`<br/>
remove | `(context: UploadRemoveContext)` | trigger on file removed。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/upload/type.ts)。<br/>`interface UploadRemoveContext { index?: number; file?: UploadFile; e: MouseEvent }`<br/>
select-change | `(files: File[], context: UploadSelectChangeContext)` | trigger after file choose and before upload。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/upload/type.ts)。<br/>`interface UploadSelectChangeContext { currentSelectedFiles: UploadFile[] }`<br/>
success | `(context: SuccessContext)` | trigger on all files uploaded successfully。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/upload/type.ts)。<br/>`interface SuccessContext { e?: ProgressEvent; file?: UploadFile; fileList?: UploadFile[]; currentFiles?: UploadFile[]; response?: any; results?: SuccessContext[]; XMLHttpRequest?: XMLHttpRequest }`<br/>
validate | `(context: { type: UploadValidateType, files: UploadFile[] })` | trigger on length over limit, or trigger on file size over limit。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/upload/type.ts)。<br/>`type UploadValidateType = 'FILE_OVER_SIZE_LIMIT' \| 'FILES_OVER_LENGTH_LIMIT' \| 'FILTER_FILE_SAME_NAME' \| 'BEFORE_ALL_FILES_UPLOAD' \| 'CUSTOM_BEFORE_UPLOAD'`<br/>
waiting-upload-files-change | `(context: { files: Array<UploadFile>, trigger: 'validate' \| 'remove' \| 'uploaded' })` | trigger on waiting upload files changed

### UploadInstanceFunctions 组件实例方法

name | params | return | description
-- | -- | -- | --
triggerUpload | \- | \- | required。instance function: trigger system file select
uploadFilePercent | `(params: { file: UploadFile; percent: number })` | \- | required。instance function: set uploading file progress percent
uploadFiles | `(files?: UploadFile[])` | \- | required。instance function: upload all files which status are not success

### UploadFile

name | type | default | description | required
-- | -- | -- | -- | --
lastModified | Number | - | \- | N
name | String | - | \- | N
percent | Number | - | \- | N
raw | Object | - | Typescript：`File` | N
response | Object | - | Typescript：`{ [key: string]: any }` | N
size | Number | - | \- | N
status | String | - | Typescript：` 'success' \| 'fail' \| 'progress' \| 'waiting'` | N
type | String | - | \- | N
uploadTime | String | - | upload time | N
url | String | - | \- | N
`PlainObject` | \- | - | `PlainObject` is not an attribute of UploadFile，it means you can add and attributes to UploadFile, `type PlainObject = {[key: string]: any}`' | N
