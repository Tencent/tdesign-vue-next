/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { ImageViewerProps } from '../image-viewer';
import { UploadConfig } from '../config-provider/type';
import { ButtonProps } from '../button';
import { PlainObject, TNode, UploadDisplayDragEvents } from '../common';

export interface TdUploadProps<T extends UploadFile = UploadFile> {
  /**
   * 文件名过长时，需要省略中间的文本，保留首尾文本。示例：[10, 7]，表示首尾分别保留的文本长度
   */
  abridgeName?: Array<number>;
  /**
   * 接受上传的文件类型，[查看 W3C示例](https://www.w3schools.com/tags/att_input_accept.asp)，[查看 MDN 示例](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/file)
   * @default ''
   */
  accept?: string;
  /**
   * 上传接口。设接口响应数据为字段 `response`，那么 `response.error` 存在时会判断此次上传失败，并显示错误文本信息；`response.url` 会作为文件上传成功后的地址，并使用该地址显示图片或文件
   * @default ''
   */
  action?: string;
  /**
   * 是否允许重复上传相同文件名的文件
   * @default false
   */
  allowUploadDuplicateFile?: boolean;
  /**
   * 是否在选择文件后自动发起请求上传文件
   * @default true
   */
  autoUpload?: boolean;
  /**
   * 如果是自动上传模式 `autoUpload=true`，表示全部文件上传之前的钩子函数，函数参数为上传的文件，函数返回值决定是否继续上传，若返回值为 `false` 则终止上传。<br/>如果是非自动上传模式 `autoUpload=false`，则函数返回值为 `false` 时表示本次选中的文件不会加入到文件列表中，即不触发 `onChange` 事件
   */
  beforeAllFilesUpload?: (file: UploadFile[]) => boolean | Promise<boolean>;
  /**
   * 如果是自动上传模式 `autoUpload=true`，表示单个文件上传之前的钩子函数，若函数返回值为 `false` 则表示不上传当前文件。<br/>如果是非自动上传模式 `autoUpload=false`，函数返回值为 `false` 时表示从上传文件中剔除当前文件
   */
  beforeUpload?: (file: UploadFile) => boolean | Promise<boolean>;
  /**
   * 批量文件/图片上传，`autoUpload=false` 场景下，透传“取消上传”按钮属性
   */
  cancelUploadButton?:
    | null
    | ButtonProps
    | TNode<{ disabled: boolean; cancelUploadText: string; cancelUpload: (ctx: { e: MouseEvent }) => void }>;
  /**
   * 上传请求所需的额外字段，默认字段有 `file`，表示文件信息。可以添加额外的文件名字段，如：`{file_name: "custom-file-name.txt"}`。`autoUpload=true` 时有效。也可以使用 `formatRequest` 完全自定义上传请求的字段
   */
  data?: Record<string, any> | ((files: UploadFile[]) => Record<string, any>);
  /**
   * 非拖拽场景，指触发上传的元素，如：“选择文件”。如果是拖拽场景，则是指拖拽区域
   */
  default?: string | TNode;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 用于自定义拖拽区域，`theme=custom` 且 `draggable=true` 时有效
   */
  dragContent?: TNode | TNode<TriggerContext>;
  /**
   * 是否启用拖拽上传，不同的组件风格默认值不同。`theme=file` 或 `theme=image` 时有效
   */
  draggable?: boolean;
  /**
   * 用于完全自定义文件列表界面内容(UI)，单文件和多文件均有效
   */
  fileListDisplay?: TNode<{ files: UploadFile[]; dragEvents?: UploadDisplayDragEvents }>;
  /**
   * 已上传文件列表，同 `value`。TS 类型：`UploadFile`
   * @default []
   */
  files?: Array<T>;
  /**
   * 已上传文件列表，同 `value`。TS 类型：`UploadFile`，非受控属性
   * @default []
   */
  defaultFiles?: Array<T>;
  /**
   * 转换文件 `UploadFile` 的数据结构，可新增或修改 `UploadFile` 的属性，注意不能删除 `UploadFile` 属性。`action` 存在时有效
   */
  format?: (file: File) => UploadFile;
  /**
   * 用于新增或修改文件上传请求 参数。`action` 存在时有效。一个请求上传一个文件时，默认请求字段有 `file`。<br/>一个请求上传多个文件时，默认字段有 `file[0]/file[1]/file[2]/.../length`，其中 `length` 表示本次上传的文件数量。<br/>⚠️非常注意，此处的 `file[0]/file[1]` 仅仅是一个字段名，并非表示 `file` 是一个数组，接口获取字段时注意区分。<br/>可以使用 `name` 定义 `file` 字段的别名。<br/>也可以使用 `formatRequest` 自定义任意字段，如添加一个字段 `fileList` ，存储文件数组
   */
  formatRequest?: (requestData: { [key: string]: any }) => { [key: string]: any };
  /**
   * 用于格式化文件上传后的接口响应数据，`response` 便是接口响应的原始数据。`action` 存在时有效。<br/> 示例返回值：`{ error, url, status, files }` <br/> 此函数的返回值 `error` 会作为错误文本提醒，表示上传失败的原因，如果存在会判定为本次上传失败。<br/> 此函数的返回值 `url` 会作为单个文件上传成功后的链接。<br/> `files` 表示一个请求同时上传多个文件后的文件列表
   */
  formatResponse?: (response: any, context: FormatResponseContext) => ResponseType;
  /**
   * 设置上传的请求头部，`action` 存在时有效
   */
  headers?: { [key: string]: string };
  /**
   * 透传图片预览组件全部属性
   */
  imageViewerProps?: ImageViewerProps;
  /**
   * 用于添加属性到 HTML 元素 `input`
   */
  inputAttributes?: object;
  /**
   * 多个文件是否作为一个独立文件包，整体替换，整体删除。不允许追加文件，只允许替换文件。`theme=file-flow` 时有效
   * @default false
   */
  isBatchUpload?: boolean;
  /**
   * 上传组件文本语言配置，支持自定义配置组件中的全部文本。优先级高于全局配置中语言
   */
  locale?: UploadConfig;
  /**
   * 用于控制文件上传数量，值为 0 则不限制。注意，单文件上传场景，请勿设置 `max` 属性
   * @default 0
   */
  max?: number;
  /**
   * HTTP 请求类型
   * @default POST
   */
  method?: 'POST' | 'GET' | 'PUT' | 'OPTIONS' | 'PATCH' | 'post' | 'get' | 'put' | 'options' | 'patch';
  /**
   * 模拟进度间隔时间，单位：毫秒，默认：300。由于原始的上传请求，小文件上传进度只有 0 和 100，故而新增模拟进度，每间隔 `mockProgressDuration` 毫秒刷新一次模拟进度。小文件设置小一点，大文件设置大一点。注意：当 `useMockProgress` 为真时，当前设置有效
   */
  mockProgressDuration?: number;
  /**
   * 支持多文件上传
   * @default false
   */
  multiple?: boolean;
  /**
   * 文件上传时的名称
   * @default file
   */
  name?: string;
  /**
   * 占位符
   * @default ''
   */
  placeholder?: string;
  /**
   * 自定义上传方法。返回值 `status` 表示上传成功或失败；`error` 或 `response.error` 表示上传失败的原因；<br/>`response` 表示请求上传成功后的返回数据，`response.url` 表示上传成功后的图片/文件地址，`response.files` 表示一个请求上传多个文件/图片后的返回值。<br/>示例一：`{ status: 'fail', error: '上传失败', response }`。<br/>示例二：`{ status: 'success', response: { url: 'https://tdesign.gtimg.com/site/avatar.jpg' } }`。<br/> 示例三：`{ status: 'success', files: [{ url: 'https://xxx.png', name: 'xxx.png' }]}`
   */
  requestMethod?: (files: UploadFile | UploadFile[]) => Promise<RequestMethodResponse>;
  /**
   * 是否显示图片的文件名称
   * @default true
   */
  showImageFileName?: boolean;
  /**
   * 是否在文件列表中显示缩略图，`theme=file-flow` 时有效
   * @default false
   */
  showThumbnail?: boolean;
  /**
   * 是否显示上传进度
   * @default true
   */
  showUploadProgress?: boolean;
  /**
   * 图片文件大小限制，默认单位 KB。可选单位有：`'B' | 'KB' | 'MB' | 'GB'`。示例一：`1000`。示例二：`{ size: 2, unit: 'MB', message: '图片大小不超过 {sizeLimit} MB' }`
   */
  sizeLimit?: number | SizeLimitObj;
  /**
   * 文件上传提示文本状态
   */
  status?: 'default' | 'success' | 'warning' | 'error';
  /**
   * 组件风格。custom 表示完全自定义风格；file 表示默认文件上传风格；file-input 表示输入框形式的文件上传；file-flow 表示文件批量上传；image 表示默认图片上传风格；image-flow 表示图片批量上传
   * @default file
   */
  theme?: 'custom' | 'file' | 'file-input' | 'file-flow' | 'image' | 'image-flow';
  /**
   * 组件下方文本提示，可以使用 `status` 定义文本
   */
  tips?: string | TNode;
  /**
   * 触发上传的元素，`files` 指本次显示的全部文件
   */
  trigger?: TNode<TriggerContext>;
  /**
   * 透传选择按钮全部属性
   */
  triggerButtonProps?: ButtonProps;
  /**
   * 是否在同一个请求中上传全部文件，默认一个请求上传一个文件。多文件上传时有效
   * @default false
   */
  uploadAllFilesInOneRequest?: boolean;
  /**
   * 批量文件/图片上传，`autoUpload=false` 场景下，透传“点击上传”按钮属性
   */
  uploadButton?:
    | null
    | ButtonProps
    | TNode<{ disabled: boolean; uploading: boolean; uploadFiles: () => void; uploadText: string }>;
  /**
   * 是否允许粘贴上传剪贴板中的文件
   * @default true
   */
  uploadPastedFiles?: boolean;
  /**
   * 是否在请求时间超过 300ms 后显示模拟进度。上传进度有模拟进度和真实进度两种。一般大小的文件上传，真实的上传进度只有 0 和 100，不利于交互呈现，因此组件内置模拟上传进度。真实上传进度一般用于大文件上传。
   * @default true
   */
  useMockProgress?: boolean;
  /**
   * 已上传文件列表，同 `files`。TS 类型：`UploadFile`
   * @default []
   */
  value?: Array<T>;
  /**
   * 已上传文件列表，同 `files`。TS 类型：`UploadFile`，非受控属性
   * @default []
   */
  defaultValue?: Array<T>;
  /**
   * 已上传文件列表，同 `files`。TS 类型：`UploadFile`
   * @default []
   */
  modelValue?: Array<T>;
  /**
   * 上传请求时是否携带 cookie
   * @default false
   */
  withCredentials?: boolean;
  /**
   * 点击「取消上传」时触发
   */
  onCancelUpload?: () => void;
  /**
   * 已上传文件列表发生变化时触发，`trigger` 表示触发本次的来源
   */
  onChange?: (value: Array<T>, context: UploadChangeContext) => void;
  /**
   * 进入拖拽区域时触发
   */
  onDragenter?: (context: { e: DragEvent }) => void;
  /**
   * 离开拖拽区域时触发
   */
  onDragleave?: (context: { e: DragEvent }) => void;
  /**
   * 拖拽结束时触发
   */
  onDrop?: (context: { e: DragEvent }) => void;
  /**
   * 上传失败后触发。`response` 指接口响应结果，`response.error` 会作为错误文本提醒。如果希望判定为上传失败，但接口响应数据不包含 `error` 字段，可以使用 `formatResponse` 格式化 `response` 数据结构。如果是多文件多请求上传场景，请到事件 `onOneFileFail` 中查看 `response`
   */
  onFail?: (options: UploadFailContext) => void;
  /**
   * 多文件/图片场景下，单个文件上传失败后触发，如果一个请求上传一个文件，则会触发多次。单文件/图片不会触发
   */
  onOneFileFail?: (options: UploadFailContext) => void;
  /**
   * 单个文件上传成功后触发，在多文件场景下会触发多次。`context.file` 表示当前上传成功的单个文件，`context.response` 表示上传请求的返回数据
   */
  onOneFileSuccess?: (context: Pick<SuccessContext, 'e' | 'file' | 'response' | 'XMLHttpRequest'>) => void;
  /**
   * 点击图片预览时触发，文件没有预览
   */
  onPreview?: (options: { file: UploadFile; index: number; e: MouseEvent }) => void;
  /**
   * 上传进度变化时触发，真实进度和模拟进度都会触发。<br/>⚠️ 原始上传请求，小文件的上传进度只有 0 和 100，故而不会触发 `progress` 事件；只有大文件才有真实的中间进度。如果你希望很小的文件也显示上传进度，保证 `useMockProgress=true` 的情况下，设置 `mockProgressDuration` 为更小的值。<br/>参数 `options.type=real` 表示真实上传进度，`options.type=mock` 表示模拟上传进度
   */
  onProgress?: (options: ProgressContext) => void;
  /**
   * 移除文件时触发
   */
  onRemove?: (context: UploadRemoveContext) => void;
  /**
   * 选择文件或图片之后，上传之前，触发该事件
   */
  onSelectChange?: (files: File[], context: UploadSelectChangeContext) => void;
  /**
   * 上传成功后触发。<br/>`context.currentFiles` 表示当次请求上传的文件（无论成功或失败），`context.fileList` 表示上传成功后的文件，`context.response` 表示上传请求的返回数据。<br/>`context.results` 表示单次选择全部文件上传成功后的响应结果，可以在这个字段存在时提醒用户上传成功或失败。<br />
   */
  onSuccess?: (context: SuccessContext) => void;
  /**
   * 文件上传校验结束事件，文件数量超出、文件大小超出限制、文件同名、`beforeAllFilesUpload` 返回值为假、`beforeUpload` 返回值为假等场景会触发。<br/>注意：如果设置允许上传同名文件，即 `allowUploadDuplicateFile=true`，则不会因为文件重名触发该事件。<br/>结合 `status` 和 `tips` 可以在组件中呈现不同类型的错误（或告警）提示
   */
  onValidate?: (context: { type: UploadValidateType; files: UploadFile[] }) => void;
  /**
   * 待上传文件列表发生变化时触发。`context.files` 表示事件参数为待上传文件，`context.trigger` 引起此次变化的触发来源
   */
  onWaitingUploadFilesChange?: (context: {
    files: Array<UploadFile>;
    trigger: 'validate' | 'remove' | 'uploaded';
  }) => void;
}

/** 组件实例方法 */
export interface UploadInstanceFunctions<T extends UploadFile = UploadFile> {
  /**
   * 组件实例方法，打开文件选择器
   */
  triggerUpload: () => void;
  /**
   * 设置上传中文件的上传进度
   */
  uploadFilePercent: (params: { file: UploadFile; percent: number }) => void;
  /**
   * 组件实例方法，默认上传未成功上传过的所有文件。带参数时，表示上传指定文件
   */
  uploadFiles: (files?: UploadFile[]) => void;
}

export interface UploadFile extends PlainObject {
  /**
   * 上一次变更的时间
   */
  lastModified?: number;
  /**
   * 文件名称
   * @default ''
   */
  name?: string;
  /**
   * 下载进度
   */
  percent?: number;
  /**
   * 原始文件对象
   */
  raw?: File;
  /**
   * 上传接口返回的数据。`response.error` 存在时会判断此次上传失败，并显示错误文本信息；`response.url` 会作为文件上传成功后的地址，并使用该地址显示图片
   */
  response?: { [key: string]: any };
  /**
   * 文件大小
   */
  size?: number;
  /**
   * 文件上传状态：上传成功，上传失败，上传中，等待上传
   * @default ''
   */
  status?: 'success' | 'fail' | 'progress' | 'waiting';
  /**
   * 文件类型
   * @default ''
   */
  type?: string;
  /**
   * 上传时间
   * @default ''
   */
  uploadTime?: string;
  /**
   * 文件上传成功后的下载/访问地址
   * @default ''
   */
  url?: string;
}

export type ResponseType = { error?: string; url?: string; status?: 'fail' | 'success'; files?: UploadFile[] } & Record<
  string,
  any
>;

export interface FormatResponseContext {
  file: UploadFile;
  currentFiles?: UploadFile[];
}

export interface RequestMethodResponse {
  status: 'success' | 'fail';
  error?: string;
  response: { url?: string; files?: UploadFile[]; [key: string]: any };
}

export interface SizeLimitObj {
  size: number;
  unit: SizeUnit;
  message?: string;
}

export type SizeUnitArray = ['B', 'KB', 'MB', 'GB'];

export type SizeUnit = SizeUnitArray[number];

export interface TriggerContext {
  dragActive?: boolean;
  files: UploadFile[];
}

export interface UploadChangeContext {
  e?: MouseEvent | ProgressEvent;
  response?: any;
  trigger: UploadChangeTrigger;
  index?: number;
  file?: UploadFile;
  files?: UploadFile[];
}

export type UploadChangeTrigger = 'add' | 'remove' | 'abort' | 'progress-success' | 'progress' | 'progress-fail';

export interface UploadFailContext {
  e?: ProgressEvent;
  failedFiles: UploadFile[];
  currentFiles: UploadFile[];
  response?: any;
  file: UploadFile;
  XMLHttpRequest?: XMLHttpRequest;
}

export interface ProgressContext {
  e?: ProgressEvent;
  file?: UploadFile;
  currentFiles: UploadFile[];
  percent: number;
  type: UploadProgressType;
  XMLHttpRequest?: XMLHttpRequest;
}

export type UploadProgressType = 'real' | 'mock';

export interface UploadRemoveContext {
  index?: number;
  file?: UploadFile;
  e: MouseEvent;
}

export interface UploadSelectChangeContext {
  currentSelectedFiles: UploadFile[];
}

export interface SuccessContext {
  e?: ProgressEvent;
  file?: UploadFile;
  fileList?: UploadFile[];
  currentFiles?: UploadFile[];
  response?: any;
  results?: SuccessContext[];
  XMLHttpRequest?: XMLHttpRequest;
}

export type UploadValidateType =
  | 'FILE_OVER_SIZE_LIMIT'
  | 'FILES_OVER_LENGTH_LIMIT'
  | 'FILTER_FILE_SAME_NAME'
  | 'BEFORE_ALL_FILES_UPLOAD'
  | 'CUSTOM_BEFORE_UPLOAD';
