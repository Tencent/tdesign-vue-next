import { UploadFile, ProgressContext, TdUploadProps, RequestMethodResponse } from './type';

export type UploadProps = TdUploadProps;
export * from './type';

export interface InnerProgressContext {
  event?: ProgressEvent;
  file: UploadFile;
  percent: number;
  type?: ProgressContext['type'];
}
export interface SuccessContext {
  event?: ProgressEvent;
  file: UploadFile;
  response: RequestMethodResponse['response'];
}
export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

export interface XhrOptions {
  action: string;
  withCredentials: boolean;
  headers: { [key: string]: string };
  data: { [key: string]: any } | Function;
  method: TdUploadProps['method'];
  file: UploadFile;
  name: string;
  onError: ({ event, file, response }: { event?: ProgressEvent; file?: UploadFile; response?: any }) => void;
  onSuccess: (context: SuccessContext) => void;
  onProgress: (context: InnerProgressContext) => void;
}

export interface UploadRemoveOptions {
  e: MouseEvent;
  file?: UploadFile;
  index: number;
}

export interface FlowRemoveContext {
  e: MouseEvent;
  index: number;
  file: UploadFile;
}

export interface URL {
  createObjectURL(object: any, options?: any): string;
  revokeObjectURL(url: string): void;
}
