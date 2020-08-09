export interface UploadFile extends File {
  uid: string;
  percent?: number;
  originFileObj?: File | Blob;
  status?: 'success' | 'fail' | 'progress';
  response?: any;
  thumbUrl?: string;
};

export interface XhrOptions {
  action: string;
  withCredentials: boolean;
  headers: { [key: string]: string };
  data: { [key: string]: any } | Function;
  file: UploadFile;
  name: string;
  onError: ({ event, file }: { event: UploadProgressEvent; file?: UploadFile }) => any;
  onSuccess: ({ event, file, response }: { event: UploadProgressEvent; file?: UploadFile; response: any }) => any;
  onProgress: ({ event, file }: { event: UploadProgressEvent; file?: UploadFile }) => any;
};

export interface UploadProgressEvent extends ProgressEvent {
  percent?: number;
};

export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
};
