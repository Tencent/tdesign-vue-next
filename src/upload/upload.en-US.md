:: BASE_DOC ::

## API
### Upload Props

name | type | default | description | required
-- | -- | -- | -- | --
abridgeName | Array | - | ellipsis text of medium file name。Typescript：`Array<number>` | N
accept | String | - | \- | N
action | String | - | upload action url | N
allowUploadDuplicateFile | Boolean | false | \- | N
autoUpload | Boolean | true | \- | N
beforeAllFilesUpload | Function | - | before all files upload, return false can stop uploading file。Typescript：`(file: UploadFile[]) => boolean \| Promise<boolean>` | N
beforeUpload | Function | - | Typescript：`(file: UploadFile) => boolean \| Promise<boolean>` | N
data | Object | - | Typescript：`Record<string, any> \| ((files: UploadFile[]) => Record<string, any>)` | N
default | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
disabled | Boolean | - | \- | N
dragContent | String / Slot / Function | - | define drag content nodes, it works on `theme=custom`。Typescript：`TNode \| TNode<TriggerContext>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
draggable | Boolean | undefined | if drag uploading allowed, works on `theme=file` or `theme=image` | N
fileListDisplay | Slot / Function | - | Typescript：`TNode<{ files: UploadFile[]; dragEvents?: UploadDisplayDragEvents }>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
files | Array | [] | `v-model:files` is supported。Typescript：`Array<T>` | N
defaultFiles | Array | [] | uncontrolled property。Typescript：`Array<T>` | N
format | Function | - | Typescript：`(file: File) => UploadFile` | N
formatRequest | Function | - | Typescript：`(requestData: { [key: string]: any }) => { [key: string]: any }` | N
formatResponse | Function | - | Typescript：`(response: any, context: FormatResponseContext) => ResponseType ` `type ResponseType = { error?: string; url?: string } & Record<string, any>` `interface FormatResponseContext { file: UploadFile; currentFiles?: UploadFile[] }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/upload/type.ts) | N
headers | Object | - | Typescript：`{[key: string]: string}` | N
inputAttributes | Object | - | add attributes to HTML element `input`。Typescript：`CSSProperties` | N
isBatchUpload | Boolean | false | \- | N
locale | Object | - | upload language config, priority of `locale` is higher than global language config。Typescript：`UploadConfig` `import { UploadConfig } from '../config-provider/type'`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/upload/type.ts) | N
max | Number | 0 | \- | N
method | String | POST | options：POST/GET/PUT/OPTION/PATCH/post/get/put/option/patch | N
mockProgressDuration | Number | - | \- | N
multiple | Boolean | false | \- | N
name | String | file | \- | N
placeholder | String | - | \- | N
requestMethod | Function | - | Typescript：`(files: UploadFile \| UploadFile[]) => Promise<RequestMethodResponse>` `interface RequestMethodResponse { status: 'success' \| 'fail'; error?: string; response: { url?: string; files?: UploadFile[]; [key: string]: any } }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/upload/type.ts) | N
showUploadProgress | Boolean | true | \- | N
sizeLimit | Number / Object | - | Typescript：`number \| SizeLimitObj` `interface SizeLimitObj { size: number; unit: SizeUnit ; message?: string }` `type SizeUnitArray = ['B', 'KB', 'MB', 'GB']` `type SizeUnit = SizeUnitArray[number]`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/upload/type.ts) | N
status | String | - | tips status。options：default/success/warning/error | N
theme | String | file | options：custom/file/file-input/file-flow/image/image-flow | N
tips | String / Slot / Function | - | tips text below upload component, define it's color with `status`。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
trigger | Slot / Function | - | Typescript：`TNode<TriggerContext>` `interface TriggerContext { dragActive?: boolean;  files: UploadFile[] }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/upload/type.ts) | N
triggerButtonProps | Object | - | Typescript：`ButtonProps`，[Button API Documents](./button?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/upload/type.ts) | N
uploadAllFilesInOneRequest | Boolean | false | \- | N
uploadPastedFiles | Boolean | false | allow to upload files in clipboard after pasting | N
useMockProgress | Boolean | true | \- | N
value | Array | [] | file list, `UploadFile`。`v-model` and `v-model:value` is supported。Typescript：`Array<T>` | N
defaultValue | Array | [] | file list, `UploadFile`。uncontrolled property。Typescript：`Array<T>` | N
withCredentials | Boolean | false | \- | N
onCancelUpload | Function |  | Typescript：`() => void`<br/> | N
onChange | Function |  | Typescript：`(value: Array<T>, context: UploadChangeContext) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/upload/type.ts)。<br/>`interface UploadChangeContext { e?: MouseEvent \| ProgressEvent; response?: any; trigger: UploadChangeTrigger; index?: number; file?: UploadFile; files?: UploadFile[] }`<br/><br/>`type UploadChangeTrigger = 'add' \| 'remove' \| 'abort' \| 'progress-success' \| 'progress' \| 'progress-fail'`<br/> | N
onDragenter | Function |  | Typescript：`(context: { e: DragEvent }) => void`<br/> | N
onDragleave | Function |  | Typescript：`(context: { e: DragEvent }) => void`<br/> | N
onDrop | Function |  | Typescript：`(context: { e: DragEvent }) => void`<br/> | N
onFail | Function |  | Typescript：`(options: UploadFailContext) => void`<br/>`response.error` used for error tips, `formatResponse` can format `response`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/upload/type.ts)。<br/>`interface UploadFailContext { e?: ProgressEvent; failedFiles: UploadFile[]; currentFiles: UploadFile[]; response?: any; file: UploadFile; XMLHttpRequest?: XMLHttpRequest}`<br/> | N
onOneFileFail | Function |  | Typescript：`(options: UploadFailContext) => void`<br/>trigger on one file upload failed | N
onOneFileSuccess | Function |  | Typescript：`(context: Pick<SuccessContext, 'e' \| 'file' \| 'response' \| 'XMLHttpRequest'>) => void`<br/> | N
onPreview | Function |  | Typescript：`(options: { file: UploadFile; index: number; e: MouseEvent }) => void`<br/> | N
onProgress | Function |  | Typescript：`(options: ProgressContext) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/upload/type.ts)。<br/>`interface ProgressContext { e?: ProgressEvent; file?: UploadFile; currentFiles: UploadFile[]; percent: number; type: UploadProgressType; XMLHttpRequest?: XMLHttpRequest }`<br/><br/>`type UploadProgressType = 'real' \| 'mock'`<br/> | N
onRemove | Function |  | Typescript：`(context: UploadRemoveContext) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/upload/type.ts)。<br/>`interface UploadRemoveContext { index?: number; file?: UploadFile; e: MouseEvent }`<br/> | N
onSelectChange | Function |  | Typescript：`(files: File[], context: UploadSelectChangeContext) => void`<br/>trigger after file choose and before upload。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/upload/type.ts)。<br/>`interface UploadSelectChangeContext { currentSelectedFiles: UploadFile[] }`<br/> | N
onSuccess | Function |  | Typescript：`(context: SuccessContext) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/upload/type.ts)。<br/>`interface SuccessContext { e?: ProgressEvent; file?: UploadFile; fileList?: UploadFile[]; currentFiles?: UploadFile[]; response?: any; results?: SuccessContext[]; XMLHttpRequest?: XMLHttpRequest }`<br/> | N
onValidate | Function |  | Typescript：`(context: { type: UploadValidateType, files: UploadFile[] }) => void`<br/>trigger on length over limit, or trigger on file size over limit。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/upload/type.ts)。<br/>`type UploadValidateType = 'FILE_OVER_SIZE_LIMIT' \| 'FILES_OVER_LENGTH_LIMIT' \| 'FILTER_FILE_SAME_NAME' \| 'BEFORE_ALL_FILES_UPLOAD' \| 'CUSTOM_BEFORE_UPLOAD'`<br/> | N
onWaitingUploadFilesChange | Function |  | Typescript：`(context: { files: Array<UploadFile>, trigger: 'validate' \| 'remove' \| 'uploaded' }) => void`<br/>trigger on waiting upload files changed | N

### Upload Events

name | params | description
-- | -- | --
cancel-upload | \- | \-
change | `(value: Array<T>, context: UploadChangeContext)` | [see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/upload/type.ts)。<br/>`interface UploadChangeContext { e?: MouseEvent \| ProgressEvent; response?: any; trigger: UploadChangeTrigger; index?: number; file?: UploadFile; files?: UploadFile[] }`<br/><br/>`type UploadChangeTrigger = 'add' \| 'remove' \| 'abort' \| 'progress-success' \| 'progress' \| 'progress-fail'`<br/>
dragenter | `(context: { e: DragEvent })` | \-
dragleave | `(context: { e: DragEvent })` | \-
drop | `(context: { e: DragEvent })` | \-
fail | `(options: UploadFailContext)` | `response.error` used for error tips, `formatResponse` can format `response`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/upload/type.ts)。<br/>`interface UploadFailContext { e?: ProgressEvent; failedFiles: UploadFile[]; currentFiles: UploadFile[]; response?: any; file: UploadFile; XMLHttpRequest?: XMLHttpRequest}`<br/>
one-file-fail | `(options: UploadFailContext)` | trigger on one file upload failed
one-file-success | `(context: Pick<SuccessContext, 'e' \| 'file' \| 'response' \| 'XMLHttpRequest'>)` | \-
preview | `(options: { file: UploadFile; index: number; e: MouseEvent })` | \-
progress | `(options: ProgressContext)` | [see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/upload/type.ts)。<br/>`interface ProgressContext { e?: ProgressEvent; file?: UploadFile; currentFiles: UploadFile[]; percent: number; type: UploadProgressType; XMLHttpRequest?: XMLHttpRequest }`<br/><br/>`type UploadProgressType = 'real' \| 'mock'`<br/>
remove | `(context: UploadRemoveContext)` | [see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/upload/type.ts)。<br/>`interface UploadRemoveContext { index?: number; file?: UploadFile; e: MouseEvent }`<br/>
select-change | `(files: File[], context: UploadSelectChangeContext)` | trigger after file choose and before upload。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/upload/type.ts)。<br/>`interface UploadSelectChangeContext { currentSelectedFiles: UploadFile[] }`<br/>
success | `(context: SuccessContext)` | [see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/upload/type.ts)。<br/>`interface SuccessContext { e?: ProgressEvent; file?: UploadFile; fileList?: UploadFile[]; currentFiles?: UploadFile[]; response?: any; results?: SuccessContext[]; XMLHttpRequest?: XMLHttpRequest }`<br/>
validate | `(context: { type: UploadValidateType, files: UploadFile[] })` | trigger on length over limit, or trigger on file size over limit。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/upload/type.ts)。<br/>`type UploadValidateType = 'FILE_OVER_SIZE_LIMIT' \| 'FILES_OVER_LENGTH_LIMIT' \| 'FILTER_FILE_SAME_NAME' \| 'BEFORE_ALL_FILES_UPLOAD' \| 'CUSTOM_BEFORE_UPLOAD'`<br/>
waiting-upload-files-change | `(context: { files: Array<UploadFile>, trigger: 'validate' \| 'remove' \| 'uploaded' })` | trigger on waiting upload files changed

### UploadInstanceFunctions 组件实例方法

name | params | return | description
-- | -- | -- | --
triggerUpload | \- | \- | required。trigger system file select
uploadFiles | `(files?: UploadFile[])` | \- | required。upload all files which status are not success

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
