export type UploadProgressType = 'real' | 'mock';

export type SizeUnit = 'B' | 'KB' | 'MB' | 'GB'
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
   */
  uploadTime?: string;
  /**
   * 文件上传成功后的下载/访问地址
   * @default ''
   */
  url?: string;
}

export interface RequestMethodResponse {
  status: 'success' | 'fail';
  error?: string;
  /**
   * response.XMLHttpRequest is going to be deprecated
   */
  response: { url?: string; [key: string]: any }
}

export interface ProgressContext {
  e?: ProgressEvent;
  file?: UploadFile;
  percent: number;
  type: UploadProgressType
}

export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

export interface InnerProgressContext {
  event?: ProgressEvent;
  file?: UploadFile;
  files?: UploadFile[];
  percent: number;
  type: ProgressContext['type'];
  XMLHttpRequest?: XMLHttpRequest;
}

export interface ErrorContext {
  event?: ProgressEvent;
  file?: UploadFile;
  files?: UploadFile[];
  response?: any;
  XMLHttpRequest?: XMLHttpRequest;
}

export interface SuccessContext {
  event?: ProgressEvent;
  file?: UploadFile;
  files?: UploadFile[];
  XMLHttpRequest?: XMLHttpRequest;
  response?: RequestMethodResponse['response'];
}

export interface UploadRemoveOptions {
  e: MouseEvent;
  file?: UploadFile;
  files?: UploadFile[];
  index: number
}

export interface FlowRemoveContext {
  e: MouseEvent;
  index: number;
  file?: UploadFile;
}

export interface XhrOptions {
  method?: string;
  action: string;
  withCredentials: boolean;
  headers: { [key: string]: string };
  data: { [key: string]: any } | Function;
  file?: UploadFile;
  files?: UploadFile[];
  useMockProgress?: boolean;
  // 模拟进度间隔时间，默认：300
  mockProgressDuration?: number;
  name: string;
  /** 可与 data 共存 */
  formatRequest?: (requestData: { [key: string]: any }) => { [key: string]: any };
  onError: (context: ErrorContext) => void;
  onSuccess: (context: SuccessContext) => void;
  onProgress: (context: InnerProgressContext) => void;
}

export interface TdUploadFile extends UploadFile {
  uid?: string;
  xhr?: XMLHttpRequest;
}

export interface FormatResponseContext { file: UploadFile; currentFiles?: UploadFile[] }

export interface SizeLimitObj {
  size: number;
  unit: SizeUnit;
  message?: string;
}

export interface FileChangeParams {
  /** 当次选择的文件 */
  files: File[];
  /** 已经上传的文件列表 */
  uploadValue: UploadFile[];
  /** 是否允许重复上传相同文件名的文件 */
  allowUploadDuplicateFile?: boolean
  /** 文件上传的数量不超过 max */
  max?: number;
  /** 图片文件大小限制 */
  sizeLimit?: number | SizeLimitObj;
  isBatchUpload?: boolean;
  autoUpload?: boolean;
  /** 格式化上传参数 */
  format?: (file: File) => UploadFile;
  /** 上传文件之前的钩子，参数为上传的文件，返回值决定是否上传 */
  beforeUpload?: (file: UploadFile) => boolean | Promise<boolean>;
  beforeAllFilesUpload?: (file: UploadFile[]) => boolean | Promise<boolean>;
}

export interface FileChangeReturn {
  file?: UploadFile;
  files?: UploadFile[];
  fileValidateList?: FileChangeReturn[];
  /** 上传文件数量超出提醒 */
  lengthOverLimit?: boolean;
  /** 是否存在相同文件名的文件 */
  hasSameNameFile?: boolean;
  /** 校验不通过数据 */
  validateResult?: {
    type: 'BEFORE_ALL_FILES_UPLOAD' | 'FILE_OVER_SIZE_LIMIT' | 'CUSTOM_BEFORE_UPLOAD' | 'FILTER_FILE_SAME_NAME';
    extra?: {
      [key: string]: any;
    };
  }
}

export interface OnResponseErrorContext {
  response: any;
  error?: string;
  event?: ProgressEvent<EventTarget>;
  files: UploadFile[];
}

export type ResponseType = { error?: string; url?: string; status?: 'fail' | 'success'; files?: UploadFile[] } & Record<string, any>

export interface HandleUploadParams {
  /** 已经上传过的文件 */
  uploadedFiles: UploadFile[];
  /** 待上传的文件 */
  toUploadFiles: UploadFile[];
  /** 上传文件时所需的额外数据 */
  data?: Record<string, any> | ((file: File) => Record<string, any>);
  /** 文件是否作为一个独立文件包，整体替换，整体删除。不允许追加文件，只允许替换文件 */
  isBatchUpload?: boolean;
  autoUpload?: boolean;
  /** 是否在同一个请求中上传多个文件 */
  uploadAllFilesInOneRequest?: boolean;
  /** 上传接口地址 */
  action?: string;
  /** 文件上传时的名称 */
  name?: string;
  /** 是否需要真实进度之前的模拟进度 */
  useMockProgress?: boolean;
  // 模拟进度间隔时间
  mockProgressDuration?: number;
  multiple?: boolean;
  headers?: {[key: string]: string};
  withCredentials?: boolean;
  /** HTTP 请求类型。可选项：POST/GET/PUT/OPTION/PATCH/post/get/put/option/patch */
  method?: 'POST' | 'GET' | 'PUT' | 'OPTION' | 'PATCH' | 'post' | 'get' | 'put' | 'option' | 'patch';
  formatRequest?: (requestData: { [key: string]: any }) => { [key: string]: any };
  formatResponse?: (response: any, context: FormatResponseContext) => ResponseType;
  /** 自定义上传方法 */
  requestMethod?: (files: UploadFile | UploadFile[]) => Promise<RequestMethodResponse>;
  setXhrObject?: (context: { files: UploadFile[], xhrReq: XMLHttpRequest }) => void;
  onResponseError?: (context: OnResponseErrorContext) => void;
  onResponseProgress?: (context: InnerProgressContext) => void;
  onResponseSuccess?: (context: SuccessContext) => void;
}

export type handleSuccessParams = SuccessContext & {
  formatResponse?: HandleUploadParams['formatResponse']
  // uploadInOneRequest?: boolean;
}

/** 语言配置，上传功能触发文案 */
export interface UploadTriggerUploadText {
  image?: string;
  normal?: string;
  fileInput?: string;
  reupload?: string;
  continueUpload: string;
  delete?: string;
  uploading?: string;
}

export interface UploadRemoveContext {
  index?: number;
  file?: UploadFile;
}
