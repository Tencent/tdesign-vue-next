import zhCN from '@tdesign/common-js/global-config/locale/zh_CN';
import type { GlobalConfigProvider } from '@tdesign/components/config-provider/type';
import type { CommonDisplayFileProps } from '@tdesign/components/upload/types';
import type { UploadFile } from '@tdesign/components/upload/type';

type UploadDisplayProps = CommonDisplayFileProps & {
  accept: string;
};

export const uploadLocale = zhCN.upload as unknown as GlobalConfigProvider['upload'];

export const createUploadFile = (overrides: UploadFile = {}): UploadFile => ({
  name: 'example.txt',
  size: 1024,
  status: 'success',
  ...overrides,
});

export const createCommonProps = (overrides: Partial<UploadDisplayProps> = {}): UploadDisplayProps => ({
  accept: '',
  files: [],
  toUploadFiles: [],
  displayFiles: [],
  theme: 'file',
  abridgeName: undefined,
  placeholder: '',
  classPrefix: 't',
  locale: uploadLocale,
  sizeOverLimitMessage: '',
  autoUpload: true,
  disabled: false,
  uploading: false,
  tipsClasses: 't-upload__tips t-size-s',
  errorClasses: ['t-upload__tips', 't-upload__tips-error'],
  placeholderClass: 't-upload__placeholder',
  showUploadProgress: true,
  onRemove: () => undefined,
  ...overrides,
});
