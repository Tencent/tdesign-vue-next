/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdUploadProps } from './type';
import { PropType } from 'vue';

export default {
  /** 文件名过长时，需要省略中间的文本，保留首尾文本。示例：[10, 7]，表示首尾分别保留的文本长度 */
  abridgeName: {
    type: Array as PropType<TdUploadProps['abridgeName']>,
  },
  /** 接受上传的文件类型，[查看 W3C示例](https://www.w3schools.com/tags/att_input_accept.asp)，[查看 MDN 示例](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/file) */
  accept: {
    type: String,
    default: '',
  },
  /** 上传接口。设接口响应数据为字段 `response`，那么 `response.error` 存在时会判断此次上传失败，并显示错误文本信息；`response.url` 会作为文件上传成功后的地址，并使用该地址显示图片 */
  action: {
    type: String,
    default: '',
  },
  /** 是否允许重复上传相同文件名的文件 */
  allowUploadDuplicateFile: Boolean,
  /** 是否选取文件后自动上传 */
  autoUpload: {
    type: Boolean,
    default: true,
  },
  /** 全部文件上传之前的钩子，参数为上传的文件，返回值决定是否继续上传，若返回值为 `false` 则终止上传 */
  beforeAllFilesUpload: {
    type: Function as PropType<TdUploadProps['beforeAllFilesUpload']>,
  },
  /** 单文件上传之前的钩子，参数为上传的文件，返回值决定是否继续上传，若返回值为 `false` 则终止上传 */
  beforeUpload: {
    type: Function as PropType<TdUploadProps['beforeUpload']>,
  },
  /** 上传文件时所需的额外数据 */
  data: {
    type: Object as PropType<TdUploadProps['data']>,
  },
  /** 非拖拽场景，指触发上传的元素，如：“选择文件”。如果是拖拽场景，则是指拖拽区域 */
  default: {
    type: [String, Function] as PropType<TdUploadProps['default']>,
  },
  /** 是否禁用 */
  disabled: Boolean,
  /** 用于自定义拖拽区域 */
  dragContent: {
    type: [String, Function] as PropType<TdUploadProps['dragContent']>,
  },
  /** 是否启用拖拽上传，不同的组件风格默认值不同 */
  draggable: {
    type: Boolean,
    default: undefined,
  },
  /** 用于完全自定义文件列表内容 */
  fileListDisplay: {
    type: Function as PropType<TdUploadProps['fileListDisplay']>,
  },
  /** 已上传文件列表，同 `value` */
  files: {
    type: Array as PropType<TdUploadProps['files']>,
    default: undefined,
  },
  /** 已上传文件列表，同 `value`，非受控属性 */
  defaultFiles: {
    type: Array as PropType<TdUploadProps['defaultFiles']>,
    default: (): TdUploadProps['defaultFiles'] => [],
  },
  /** 文件上传前转换文件的数据结构，可新增或修改文件对象的属性 */
  format: {
    type: Function as PropType<TdUploadProps['format']>,
  },
  /** 用于新增或修改文件上传请求参数 */
  formatRequest: {
    type: Function as PropType<TdUploadProps['formatRequest']>,
  },
  /** 用于格式化文件上传后的接口响应数据，`response` 便是接口响应的原始数据。<br/> 此函数的返回值 `error` 或 `response.error` 会作为错误文本提醒，如果存在会判定为本次上传失败。<br/> 此函数的返回值 `url` 或 `response.url` 会作为上传成功后的链接 */
  formatResponse: {
    type: Function as PropType<TdUploadProps['formatResponse']>,
  },
  /** 设置上传的请求头部 */
  headers: {
    type: Object as PropType<TdUploadProps['headers']>,
  },
  /** 文件是否作为一个独立文件包，整体替换，整体删除。不允许追加文件，只允许替换文件 */
  isBatchUpload: Boolean,
  /** 上传组件文本语言配置，支持自定义配置组件中的全部文本 */
  locale: {
    type: Object as PropType<TdUploadProps['locale']>,
  },
  /** 用于控制文件上传数量，值为 0 则不限制 */
  max: {
    type: Number,
    default: 0,
  },
  /** HTTP 请求类型 */
  method: {
    type: String as PropType<TdUploadProps['method']>,
    default: 'POST' as TdUploadProps['method'],
    validator(val: TdUploadProps['method']): boolean {
      if (!val) return true;
      return ['POST', 'GET', 'PUT', 'OPTION', 'PATCH', 'post', 'get', 'put', 'option', 'patch'].includes(val);
    },
  },
  /** 是否支持多选文件 */
  multiple: Boolean,
  /** 文件上传时的名称 */
  name: {
    type: String,
    default: 'file',
  },
  /** 占位符 */
  placeholder: {
    type: String,
    default: '',
  },
  /** 自定义上传方法。返回值 `status` 表示上传成功或失败，`error` 或 `response.error` 表示上传失败的原因，`response` 表示请求上传成功后的返回数据，`response.url` 表示上传成功后的图片地址。示例一：`{ status: 'fail', error: '上传失败', response }`。示例二：`{ status: 'success', response: { url: 'https://tdesign.gtimg.com/site/avatar.jpg' } }` */
  requestMethod: {
    type: Function as PropType<TdUploadProps['requestMethod']>,
  },
  /** 是否显示上传进度 */
  showUploadProgress: {
    type: Boolean,
    default: true,
  },
  /** 图片文件大小限制，单位 KB。可选单位有：`'B' | 'KB' | 'MB' | 'GB'`。示例一：`1000`。示例二：`{ size: 2, unit: 'MB', message: '图片大小不超过 {sizeLimit} MB' }` */
  sizeLimit: {
    type: [Number, Object] as PropType<TdUploadProps['sizeLimit']>,
  },
  /** 文件上传提示文本状态 */
  status: {
    type: String as PropType<TdUploadProps['status']>,
    validator(val: TdUploadProps['status']): boolean {
      if (!val) return true;
      return ['default', 'success', 'warning', 'error'].includes(val);
    },
  },
  /** 组件风格。custom 表示完全自定义风格；file 表示默认文件上传风格；file-input 表示输入框形式的文件上传；file-flow 表示文件批量上传；image 表示默认图片上传风格；image-flow 表示图片批量上传 */
  theme: {
    type: String as PropType<TdUploadProps['theme']>,
    default: 'file' as TdUploadProps['theme'],
    validator(val: TdUploadProps['theme']): boolean {
      if (!val) return true;
      return ['custom', 'file', 'file-input', 'file-flow', 'image', 'image-flow'].includes(val);
    },
  },
  /** 组件下方文本提示，可以使用 `status` 定义文本 */
  tips: {
    type: String,
    default: '',
  },
  /** 触发上传的元素，`files` 指本次显示的全部文件 */
  trigger: {
    type: Function as PropType<TdUploadProps['trigger']>,
  },
  /** 透传选择按钮全部属性 */
  triggerButtonProps: {
    type: Object as PropType<TdUploadProps['triggerButtonProps']>,
  },
  /** 是否在同一个请求中上传全部文件，默认一个请求上传一个文件 */
  uploadAllFilesInOneRequest: Boolean,
  /** 是否在请求时间超过 300ms 后显示模拟进度。上传进度有模拟进度和真实进度两种。一般大小的文件上传，真实的上传进度只有 0 和 100，不利于交互呈现，因此组件内置模拟上传进度。真实上传进度一般用于大文件上传。 */
  useMockProgress: {
    type: Boolean,
    default: true,
  },
  /** 已上传文件列表，同 `files` */
  value: {
    type: Array as PropType<TdUploadProps['value']>,
    default: undefined,
  },
  modelValue: {
    type: Array as PropType<TdUploadProps['value']>,
    default: undefined,
  },
  /** 已上传文件列表，同 `files`，非受控属性 */
  defaultValue: {
    type: Array as PropType<TdUploadProps['defaultValue']>,
    default: (): TdUploadProps['defaultValue'] => [],
  },
  /** 上传请求时是否携带 cookie */
  withCredentials: Boolean,
  /** 点击「取消上传」时触发 */
  onCancelUpload: Function as PropType<TdUploadProps['onCancelUpload']>,
  /** 已上传文件列表发生变化时触发，`trigger` 表示触发本次的来源 */
  onChange: Function as PropType<TdUploadProps['onChange']>,
  /** 进入拖拽区域时触发 */
  onDragenter: Function as PropType<TdUploadProps['onDragenter']>,
  /** 离开拖拽区域时触发 */
  onDragleave: Function as PropType<TdUploadProps['onDragleave']>,
  /** 拖拽结束时触发 */
  onDrop: Function as PropType<TdUploadProps['onDrop']>,
  /** 上传失败后触发。`response` 指接口响应结果，`response.error` 会作为错误文本提醒。如果希望判定为上传失败，但接口响应数据不包含 `error` 字段，可以使用 `formatResponse` 格式化 `response` 数据结构。如果是多文件多请求上传场景，请到事件 `onOneFileFail` 中查看 `response` */
  onFail: Function as PropType<TdUploadProps['onFail']>,
  /** 多文件/图片场景下，单个文件上传失败后触发，如果一个请求上传一个文件，则会触发多次。单文件/图片不会触发 */
  onOneFileFail: Function as PropType<TdUploadProps['onOneFileFail']>,
  /** 单个文件上传成功后触发，在多文件场景下会触发多次。`context.file` 表示当前上传成功的单个文件，`context.response` 表示上传请求的返回数据 */
  onOneFileSuccess: Function as PropType<TdUploadProps['onOneFileSuccess']>,
  /** 点击图片预览时触发，文件没有预览 */
  onPreview: Function as PropType<TdUploadProps['onPreview']>,
  /** 上传进度变化时触发，真实进度和模拟进度都会触发。`type=real` 表示真实上传进度，`type=mock` 表示模拟上传进度 */
  onProgress: Function as PropType<TdUploadProps['onProgress']>,
  /** 移除文件时触发 */
  onRemove: Function as PropType<TdUploadProps['onRemove']>,
  /** 选择文件或图片之后，上传之前，触发该事件 */
  onSelectChange: Function as PropType<TdUploadProps['onSelectChange']>,
  /** 上传成功后触发。<br/>`context.currentFiles` 表示当次请求上传的文件，`context.fileList` 表示上传成功后的文件，`context.response` 表示上传请求的返回数据。<br/>`context.results` 表示单次选择全部文件上传成功后的响应结果，可以在这个字段存在时提醒用户上传成功或失败。<br /> */
  onSuccess: Function as PropType<TdUploadProps['onSuccess']>,
  /** 文件上传校验结束事件，有文件数量超出时会触发，文件大小超出限制、文件同名时会触发等场景。注意如果设置允许上传同名文件，则此事件不会触发 */
  onValidate: Function as PropType<TdUploadProps['onValidate']>,
  /** 待上传文件列表发生变化时触发。`context.files` 表示事件参数为待上传文件，`context.trigger` 引起此次变化的触发来源 */
  onWaitingUploadFilesChange: Function as PropType<TdUploadProps['onWaitingUploadFilesChange']>,
};
