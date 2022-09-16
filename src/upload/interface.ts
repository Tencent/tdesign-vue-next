import { PropType } from 'vue';
import { TdUploadProps, UploadRemoveContext } from './type';
import { GlobalConfigProvider } from '../config-provider/type';
import { TNode } from '../common';

export interface CommonDisplayFileProps {
  files: TdUploadProps['files'];
  toUploadFiles: TdUploadProps['files'];
  displayFiles: TdUploadProps['files'];
  theme: TdUploadProps['theme'];
  placeholder: TdUploadProps['placeholder'];
  classPrefix: string;
  tips?: TdUploadProps['tips'];
  locale?: GlobalConfigProvider['upload'];
  sizeOverLimitMessage?: string;
  autoUpload?: boolean;
  disabled?: boolean;
  uploading?: boolean;
  tipsClasses?: string;
  errorClasses?: string[];
  xhrReq?: XMLHttpRequest;
  default?: TNode;
  fileListDisplay?: TdUploadProps['fileListDisplay'];
  onRemove?: (p: UploadRemoveContext) => void;
}

export type UploadProps = TdUploadProps;

export const commonProps = {
  files: Array as PropType<CommonDisplayFileProps['files']>,
  toUploadFiles: Array as PropType<CommonDisplayFileProps['toUploadFiles']>,
  displayFiles: Array as PropType<CommonDisplayFileProps['displayFiles']>,
  theme: String as PropType<CommonDisplayFileProps['theme']>,
  placeholder: String,
  classPrefix: String,
  tips: String,
  locale: Object as PropType<CommonDisplayFileProps['locale']>,
  sizeOverLimitMessage: String,
  autoUpload: Boolean,
  disabled: Boolean,
  uploading: Boolean,
  tipsClasses: [String, Array, Object] as PropType<CommonDisplayFileProps['tipsClasses']>,
  errorClasses: [String, Array, Object] as PropType<CommonDisplayFileProps['errorClasses']>,
  default: Function as PropType<CommonDisplayFileProps['default']>,
  fileListDisplay: Function as PropType<CommonDisplayFileProps['fileListDisplay']>,
  onRemove: Function as PropType<CommonDisplayFileProps['onRemove']>,
};
