import { TdUploadProps, UploadRemoveContext } from './type';
import { GlobalConfigProvider } from '../config-provider/type';
import { TNode } from '../common';

export interface CommonDisplayFileProps {
  files: TdUploadProps['files'];
  toUploadFiles: TdUploadProps['files'];
  displayFiles: TdUploadProps['files'];
  theme: TdUploadProps['theme'];
  abridgeName: TdUploadProps['abridgeName'];
  placeholder: TdUploadProps['placeholder'];
  classPrefix: string;
  tips?: TdUploadProps['tips'];
  status?: TdUploadProps['status'];
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
