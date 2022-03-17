/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode } from '../common';

export interface TdUploadProps {
  /**
   * 接受上传的文件类型，[查看 W3C示例](https://www.w3schools.com/tags/att_input_accept.asp)，[查看 MDN 示例](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/file)
   * @default ''
   */
  accept?: string;
  /**
   * 上传接口
   * @default ''
   */
  action?: string;
  /**
   * 是否选取文件后自动上传
   * @default true
   */
  autoUpload?: boolean;
  /**
   * 上传文件之前的钩子，参数为上传的文件，返回值决定是否上传
   */
  beforeUpload?: (file: File | UploadFile) => boolean | Promise<boolean>;
  /**
   * 上传文件时所需的额外数据
   */
  data?: Record<string, any> | ((file: File) => Record<string, any>);
  /**
   * 触发上传的内容，同 trigger
   */
  default?: string | TNode;
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 是否启用拖拽上传
   * @default false
   */
  draggable?: boolean;
  /**
   * 【开发中】用于完全自定义文件列表内容
   */
  fileListDisplay?: TNode;
  /**
   * 已上传文件列表
   */
  files?: Array<UploadFile>;
  /**
   * 已上传文件列表，非受控属性
   */
  defaultFiles?: Array<UploadFile>;
  /**
   * 已上传文件列表
   */
  modelValue?: Array<UploadFile>;
  /**
   * 文件上传前转换文件数据
   */
  format?: (file: File) => UploadFile;
  /**
   * 用于格式化文件上传后的响应数据。error 用于显示错误提示，如果 error 值为真，组件会判定为上传失败；url 用于上传文件/图片地址。
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
   * 用于控制文件上传数量，值为 0 则不限制
   * @default 0
   */
  max?: number;
  /**
   * HTTP 请求类型
   * @default POST
   */
  method?: 'POST' | 'GET' | 'PUT' | 'OPTION';
  /**
   * 是否支持多选文件
   * @default false
   */
  multiple?: boolean;
  /**
   * 文件上传时的名称
   * @default 'file'
   */
  name?: string;
  /**
   * 占位符
   * @default ''
   */
  placeholder?: string;
  /**
   * 自定义上传方法。返回值 status 表示上传成功或失败，error 表示上传失败的原因，response 表示请求上传成功后的返回数据，response.url 表示上传成功后的图片地址。示例一：`{ status: 'fail', error: '上传失败', response }`。示例二：`{ status: 'success', response: { url: 'https://tdesign.gtimg.com/site/avatar.jpg' } }`
   */
  requestMethod?: (files: UploadFile | UploadFile[]) => Promise<RequestMethodResponse>;
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
   * 组件风格。custom 表示完全自定义风格；file 表示默认文件上传风格；file-input 表示输入框形式的文件上传；file-flow 表示文件批量上传；image 表示默认图片上传风格；image-flow 表示图片批量上传
   * @default file
   */
  theme?: 'custom' | 'file' | 'file-input' | 'file-flow' | 'image' | 'image-flow';
  /**
   * 小文本提示
   * @default ''
   */
  tips?: string;
  /**
   * 触发上传的内容
   */
  trigger?: string | TNode<TriggerContext>;
  /**
   * 是否在同一个请求中上传全部文件，默认一个请求上传一个文件
   * @default false
   */
  uploadAllFilesInOneRequest?: boolean;
  /**
   * 是否显示为模拟进度。上传进度有模拟进度和真实进度两种。一般大小的文件上传，真实的上传进度只有 0 和 100，不利于交互呈现，因此组件内置模拟上传进度。真实上传进度一般用于大文件上传
   * @default true
   */
  useMockProgress?: boolean;
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
   * 已上传文件列表发生变化时触发
   */
  onChange?: (value: Array<UploadFile>, context: UploadChangeContext) => void;
  /**
   * 进入拖拽区域时触发
   */
  onDragenter?: (context: { e: DragEvent }) => void;
  /**
   * 拖拽结束时触发
   */
  onDragleave?: (context: { e: DragEvent }) => void;
  /**
   * 上传失败后触发
   */
  onFail?: (options: { e: ProgressEvent; file: UploadFile }) => void;
  /**
   * 点击预览时触发
   */
  onPreview?: (options: { file: UploadFile; e: MouseEvent }) => void;
  /**
   * 上传进度变化时触发，真实进度和模拟进度都会触发。type 值为 real 表示真实上传进度，type 值为 mock 表示模拟上传进度
   */
  onProgress?: (options: ProgressContext) => void;
  /**
   * 移除文件时触发
   */
  onRemove?: (context: UploadRemoveContext) => void;
  /**
   * 文件选择后，上传开始前，触发
   */
  onSelectChange?: (files: Array<UploadFile>) => void;
  /**
   * 上传成功后触发，`context.currentFiles` 表示当次请求上传的文件，`context.fileList` 表示上传成功后的文件，`context.response` 表示上传请求的返回数据。<br />⚠️ `context.file` 请勿使用
   */
  onSuccess?: (context: SuccessContext) => void;
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
   * 上传接口返回的数据
   */
  response?: object;
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
   * 文件上传成功后的下载/访问地址
   * @default ''
   */
  url?: string;
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
  uploadingFile?: UploadFile | Array<UploadFile>;
}

export interface UploadChangeContext {
  e?: MouseEvent | ProgressEvent;
  response?: any;
  trigger: string;
  index?: number;
  file?: UploadFile;
}

export interface ProgressContext {
  e?: ProgressEvent;
  file: UploadFile;
  percent: number;
  type: UploadProgressType;
}

export type UploadProgressType = 'real' | 'mock';

export interface UploadRemoveContext {
  index?: number;
  file?: UploadFile;
  e: MouseEvent;
}

export interface SuccessContext {
  e?: ProgressEvent;
  file?: UploadFile;
  fileList?: UploadFile[];
  response: any;
}
