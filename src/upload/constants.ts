import { PropType } from 'vue';
import { CommonDisplayFileProps } from './interface';

export const commonProps = {
  files: Array as PropType<CommonDisplayFileProps['files']>,
  toUploadFiles: Array as PropType<CommonDisplayFileProps['toUploadFiles']>,
  displayFiles: Array as PropType<CommonDisplayFileProps['displayFiles']>,
  theme: String as PropType<CommonDisplayFileProps['theme']>,
  abridgeName: Array as PropType<CommonDisplayFileProps['abridgeName']>,
  placeholder: String,
  classPrefix: String,
  tips: String,
  status: String as PropType<CommonDisplayFileProps['status']>,
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
