import { TNode } from '../common';
import { GlobalConfigProvider } from '../config-provider/type';
import { ImageViewerProps } from '../image-viewer';

import { TdUploadProps, UploadRemoveContext } from './type';

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
  placeholderClass?: string;
  showUploadProgress?: boolean;
  xhrReq?: XMLHttpRequest;
  default?: TNode;
  fileListDisplay?: TdUploadProps['fileListDisplay'];
  onRemove?: (p: UploadRemoveContext) => void;
  onPasteFileChange?: (payload: ClipboardEvent) => void;
  imageViewerProps?: ImageViewerProps;
}

export type UploadProps = TdUploadProps;

export * from './type';
