import { Ref } from 'vue';
import { TdUploadProps, UploadFile } from './type';

import {
  XhrOptions,
  InnerProgressContext,
  HTMLInputEvent,
  FlowRemoveContext,
  UploadRemoveOptions,
  SuccessContext,
} from '../_common/js/upload/types';

export type {
  XhrOptions,
  HTMLInputEvent,
  InnerProgressContext,
  SuccessContext,
  UploadRemoveOptions,
  FlowRemoveContext,
};

export type UploadCtxType = {
  uploadValue: TdUploadProps['files'];
  setUploadValue: TdUploadProps['onChange'];
  loadingFile: UploadFile;
  toUploadFiles: UploadFile[];
  errorMsg: string;
};

export type UploadProps = TdUploadProps;
export * from './type';
