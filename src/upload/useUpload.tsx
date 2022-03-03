import { ref } from 'vue';
import findIndex from 'lodash/findIndex';
import isFunction from 'lodash/isFunction';
import { TdUploadProps, UploadFile, RequestMethodResponse, SizeLimitObj } from './type';
import { SuccessContext, InnerProgressContext, UploadCtxType } from './interface';

import { useConfig } from '../config-provider';

import { isOverSizeLimit } from './util';
import xhr from '../_common/js/upload/xhr';
import log from '../_common/js/log/index';

export const useUploadProgress = (props: TdUploadProps, ctx: UploadCtxType) => {
  const handleProgress = ({ event, file, percent, type = 'real' }: InnerProgressContext) => {
    if (!file) throw new Error('Error file');
    file.percent = Math.min(percent, 100);
    ctx.value.loadingFile = file;
    const progressCtx = {
      percent,
      e: event,
      file,
      type,
    };
    props.onProgress?.(progressCtx);
  };

  const onError = (options: { event?: ProgressEvent; file: UploadFile; response?: any; resFormatted?: boolean }) => {
    const { event, file, response, resFormatted } = options;
    file.status = 'fail';
    ctx.value.loadingFile = file;
    let res = response;
    if (!resFormatted && typeof props.formatResponse === 'function') {
      res = props.formatResponse(response, { file });
    }
    ctx.value.errorMsg = res?.error;
    const context = { e: event, file };
    props.onFail?.(context);
  };

  const handleSuccess = ({ event, file, response }: SuccessContext) => {
    if (!file) throw new Error('Error file');
    file.status = 'success';
    let res = response;
    if (typeof props.formatResponse === 'function') {
      res = props.formatResponse(response, { file });
    }
    // 如果返回值存在 error，则认为当前接口上传失败
    if (res?.error) {
      onError({
        event,
        file,
        response: res,
        resFormatted: true,
      });
      ctx.value.loadingFile = null;
      return;
    }
    file.url = res?.url || file.url;
    // 从待上传文件队列中移除上传成功的文件
    const index = findIndex(ctx.value.toUploadFiles, (o: any) => o.name === file.name);
    ctx.value.toUploadFiles.splice(index, 1);
    // 上传成功的文件发送到 files
    const newFile: UploadFile = { ...file, response: res };
    const files = props.multiple ? props.files.concat(newFile) : [newFile];
    const context = { e: event, response: res, trigger: 'upload-success' };
    props.onChange?.(files, context);
    const sContext = {
      file,
      fileList: files,
      e: event,
      response: res,
    };
    props.onSuccess?.(sContext);
    ctx.value.loadingFile = null;
  };

  const handleMockProgress = (file: UploadFile) => {
    const timer = setInterval(() => {
      if (file.status === 'success' || file.percent >= 99) {
        clearInterval(timer);
        return;
      }
      file.percent += 1;
      handleProgress({
        file,
        percent: file.percent,
        type: 'mock',
      });
    }, 10);
  };

  return {
    handleProgress,
    handleMockProgress,
    handleSuccess,
    onError,
  };
};

export const useUpload = (props: TdUploadProps, store: any) => {
  const xhrReq = ref<XMLHttpRequest>(null);
  const { global, t } = useConfig('upload');
  // 上传状态
  const { handleProgress, handleMockProgress, handleSuccess, onError } = useUploadProgress(props, store);

  const handleSizeLimit = (fileSize: number) => {
    const sizeLimit: SizeLimitObj =
      typeof props.sizeLimit === 'number' ? { size: props.sizeLimit, unit: 'KB' } : props.sizeLimit;

    const rSize = isOverSizeLimit(fileSize, sizeLimit.size, sizeLimit.unit);
    if (!rSize) {
      // 有参数 message 则使用，没有就使用全局 locale 配置
      store.value.errorMsg = sizeLimit.message
        ? t(sizeLimit.message, { sizeLimit: sizeLimit.size })
        : `${t(global.value.sizeLimitMessage, { sizeLimit: sizeLimit.size })} ${sizeLimit.unit}`;
    }
    return rSize;
  };

  const handleBeforeUpload = (file: File | UploadFile): Promise<boolean> => {
    if (typeof props.beforeUpload === 'function') {
      const r = props.beforeUpload(file);
      if (r instanceof Promise) return r;
      // eslint-disable-next-line no-promise-executor-return
      return new Promise((resolve) => resolve(r));
    }
    return new Promise((resolve) => {
      if (props.sizeLimit) {
        resolve(handleSizeLimit(file.size));
      }
      resolve(true);
    });
  };

  const handleRequestMethodResponse = (res: RequestMethodResponse) => {
    if (!res) {
      log.error('Upload', '`requestMethodResponse` is required.');
      return false;
    }
    if (!res.status) {
      log.error('Upload', '`requestMethodResponse.status` is missing, which value is `success` or `fail`');
      return false;
    }
    if (!['success', 'fail'].includes(res.status)) {
      log.error('Upload', '`requestMethodResponse.status` must be `success` or `fail`');
      return false;
    }
    if (res.status === 'success' && (!res.response || !res.response.url)) {
      log.warn('Upload', '`requestMethodResponse.response.url` is required, when `status` is `success`');
    }
    return true;
  };

  const handleRequestMethod = (file: UploadFile) => {
    if (!isFunction(props.requestMethod)) {
      log.warn('Upload', '`requestMethod` must be a function.');
      return;
    }
    props.requestMethod(file).then((res: RequestMethodResponse) => {
      if (!handleRequestMethodResponse(res)) return;
      if (res.status === 'success') {
        handleSuccess({ file, response: res.response });
      } else if (res.status === 'fail') {
        const r = res.response || {};
        onError({ event: null, file, response: { ...r, error: res.error } });
      }
    });
  };

  const upload = async (file: UploadFile): Promise<void> => {
    if (!props.action && !props.requestMethod) {
      log.error('Upload', 'one of action and requestMethod must be exist.');
      return;
    }
    store.value.errorMsg = '';
    file.status = 'progress';
    store.value.loadingFile = file;
    // requestMethod 为父组件定义的自定义上传方法
    if (props.requestMethod) {
      handleRequestMethod(file);
    } else {
      // 模拟进度条
      if (props.useMockProgress) {
        handleMockProgress(file);
      }
      const request = xhr;
      xhrReq.value = request({
        action: props.action,
        data: props.data,
        file,
        name: props.name,
        headers: props.headers,
        withCredentials: props.withCredentials,
        onError,
        onProgress: handleProgress,
        onSuccess: handleSuccess,
      });
    }
  };

  const uploadFiles = (files: FileList) => {
    let tmpFiles = [...files];
    if (props.max) {
      tmpFiles = tmpFiles.slice(0, props.max - props.files.length);
      if (tmpFiles.length !== files.length) {
        console.warn(`TDesign Upload Warn: you can only upload ${props.max} files`);
      }
    }

    tmpFiles.forEach((fileRaw: File) => {
      let file: UploadFile | File = fileRaw;
      if (typeof props.format === 'function') {
        file = props.format(fileRaw);
      }
      const uploadFile: UploadFile = {
        raw: fileRaw,
        lastModified: fileRaw.lastModified,
        name: fileRaw.name,
        size: fileRaw.size,
        type: fileRaw.type,
        percent: 0,
        status: 'waiting',
        ...file,
      };
      // uploadFile.url = this.getLocalFileURL(fileRaw);
      const reader = new FileReader();
      reader.readAsDataURL(fileRaw);
      reader.onload = (event: ProgressEvent<FileReader>) => {
        uploadFile.url = event.target.result as string;
      };
      handleBeforeUpload(file).then((canUpload) => {
        if (!canUpload) return;
        const newFiles = store.value.toUploadFiles.concat();
        newFiles.push(uploadFile);
        store.value.toUploadFiles = [...new Set(newFiles)];
        store.value.loadingFile = uploadFile;
        if (props.autoUpload) {
          upload(uploadFile);
        }
      });
    });
  };

  return {
    uploadFiles,
    upload,
    xhrReq,
  };
};
