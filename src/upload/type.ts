/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { UploadConfig } from '../config-provider/type';
import { ButtonProps } from '../button';
import { TNode } from '../common';

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
   * 上传接口。设接口响应数据为字段 `response`，那么 `response.error` 存在时会判断此次上传失败，并显示错误文本信息；`response.url` 会作为文件上传成功后的地址，并使用该地址显示图片
   * @default ''
   */
  action?: string;
  /**
   * 是否允许重复上传相同文件名的文件
   * @default false
   */
  allowUploadDuplicateFile?: boolean;
  /**
   * 是否选取文件后自动上传
   * @default true
   */
  autoUpload?: boolean;
  /**
   * 全部文件上传之前的钩子，参数为上传的文件，返回值决定是否继续上传，若返回值为 `false` 则终止上传
   */
  beforeAllFilesUpload?: (file: UploadFile[]) => boolean | Promise<boolean>;
  /**
   * 单文件上传之前的钩子，参数为上传的文件，返回值决定是否继续上传，若返回值为 `false` 则终止上传
   */
  beforeUpload?: (file: UploadFile) => boolean | Promise<boolean>;
  /**
   * 上传文件时所需的额外数据
   */
  data?: Record<string, any> | ((file: File) => Record<string, any>);
  /**
   * 非拖拽场景，指触发上传的元素，如：“选择文件”。如果是拖拽场景，则是指拖拽区域
   */
  default?: string | TNode;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 用于自定义拖拽区域
   */
  dragContent?: TNode | TNode<TriggerContext>;
  /**
   * 是否启用拖拽上传，不同的组件风格默认值不同
   */
  draggable?: boolean;
  /**
   * 用于完全自定义文件列表内容
   */
  fileListDisplay?: TNode<{ files: UploadFile[]; dragEvents?: UploadDisplayDragEvents }>;
  /**
   * 已上传文件列表，同 `value`
   * @default []
   */
  files?: Array<T>;
  /**
   * 已上传文件列表，同 `value`，非受控属性
   * @default []
   */
  defaultFiles?: Array<T>;
  /**
   * 文件上传前转换文件的数据结构，可新增或修改文件对象的属性
   */
  format?: (file: File) => UploadFile;
  /**
   * 用于新增或修改文件上传请求参数
   */
  formatRequest?: (requestData: { [key: string]: any }) => { [key: string]: any };
  /**
   * 用于格式化文件上传后的接口响应数据，`response` 便是接口响应的原始数据。<br/> 此函数的返回值 `error` 或 `response.error` 会作为错误文本提醒，如果存在会判定为本次上传失败。<br/> 此函数的返回值 `url` 或 `response.url` 会作为上传成功后的链接
   */
  formatResponse?: (response: any, context: FormatResponseContext) => ResponseType;
  /**
   * 设置上传的请求头部
   */
  headers?: { [key: string]: string };
  /**
   * 文件是否作为一个独立文件包，整体替换，整体删除。不允许追加文件，只允许替换文件
   * @default false
   */
  isBatchUpload?: boolean;
  /**
   * 上传组件文本语言配置，支持自定义配置组件中的全部文本
   */
  locale?: UploadConfig;
  /**
   * 用于控制文件上传数量，值为 0 则不限制
   * @default 0
   */
  max?: number;
  /**
   * HTTP 请求类型
   * @default POST
   */
  method?: 'POST' | 'GET' | 'PUT' | 'OPTION' | 'PATCH' | 'post' | 'get' | 'put' | 'option' | 'patch';
  /**
   * 是否支持多选文件
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
   * 自定义上传方法。返回值 `status` 表示上传成功或失败，`error` 或 `response.error` 表示上传失败的原因，`response` 表示请求上传成功后的返回数据，`response.url` 表示上传成功后的图片地址。示例一：`{ status: 'fail', error: '上传失败', response }`。示例二：`{ status: 'success', response: { url: 'https://tdesign.gtimg.com/site/avatar.jpg' } }`
   */
  requestMethod?: (
    files: UploadFile,
  ) => Promise<RequestMethodResponse> | ((files: UploadFile[]) => Promise<RequestMethodResponse>);
  /**
   * 是否显示上传进度
   * @default true
   */
  showUploadProgress?: boolean;
  /**
   * 图片文件大小限制，单位 KB。可选单位有：`'B' | 'KB' | 'MB' | 'GB'`。示例一：`1000`。示例二：`{ size: 2, unit: 'MB', message: '图片大小不超过 {sizeLimit} MB' }`
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
   * @default ''
   */
  tips?: string;
  /**
   * 触发上传的元素，`files` 指本次显示的全部文件
   */
  trigger?: TNode<TriggerContext>;
  /**
   * 透传选择按钮全部属性
   */
  triggerButtonProps?: ButtonProps;
  /**
   * 是否在同一个请求中上传全部文件，默认一个请求上传一个文件
   * @default false
   */
  uploadAllFilesInOneRequest?: boolean;
  /**
   * 是否在请求时间超过 300ms 后显示模拟进度。上传进度有模拟进度和真实进度两种。一般大小的文件上传，真实的上传进度只有 0 和 100，不利于交互呈现，因此组件内置模拟上传进度。真实上传进度一般用于大文件上传。
   * @default true
   */
  useMockProgress?: boolean;
  /**
   * 已上传文件列表，同 `files`
   * @default []
   */
  value?: Array<T>;
  /**
   * 已上传文件列表，同 `files`，非受控属性
   * @default []
   */
  defaultValue?: Array<T>;
  /**
   * 已上传文件列表，同 `files`
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
  onOneFileSuccess?: (context: Pick<SuccessContext, 'e' | 'file' | 'response'>) => void;
  /**
   * 点击图片预览时触发，文件没有预览
   */
  onPreview?: (options: { file: UploadFile; index: number; e: MouseEvent }) => void;
  /**
   * 上传进度变化时触发，真实进度和模拟进度都会触发。`type=real` 表示真实上传进度，`type=mock` 表示模拟上传进度
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
   * 上传成功后触发。<br/>`context.currentFiles` 表示当次请求上传的文件，`context.fileList` 表示上传成功后的文件，`context.response` 表示上传请求的返回数据。<br/>`context.results` 表示单次选择全部文件上传成功后的响应结果，可以在这个字段存在时提醒用户上传成功或失败。<br />
   */
  onSuccess?: (context: SuccessContext) => void;
  /**
   * 文件上传校验结束事件，有文件数量超出时会触发，文件大小超出限制、文件同名时会触发等场景。注意如果设置允许上传同名文件，则此事件不会触发
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
   * 组件实例方法，执行后默认上传未成功上传过的所有文件，也可以上传指定文件
   */
  uploadFiles: (files?: UploadFile[]) => void;
}

export interface UploadFile {
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

export interface UploadDisplayDragEvents {
  onDrop?: (event: DragEvent) => void;
  onDragenter?: (event: DragEvent) => void;
  onDragover?: (event: DragEvent) => void;
  onDragleave?: (event: DragEvent) => void;
}

export type ResponseType = { error?: string; url?: string } & Record<string, any>;

export interface FormatResponseContext {
  file: UploadFile;
  currentFiles?: UploadFile[];
}

export interface RequestMethodResponse {
  status: 'success' | 'fail';
  error?: string;
  response: { url?: string; [key: string]: any };
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
}

export type UploadChangeTrigger = 'add' | 'remove' | 'abort' | 'progress-success' | 'progress' | 'progress-fail';

export interface UploadFailContext {
  e: ProgressEvent;
  failedFiles: UploadFile[];
  currentFiles: UploadFile[];
  response?: any;
  file: UploadFile;
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
}

export type UploadValidateType = 'FILE_OVER_SIZE_LIMIT' | 'FILES_OVER_LENGTH_LIMIT' | 'FILTER_FILE_SAME_NAME';
