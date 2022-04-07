import { ref } from 'vue';
import findIndex from 'lodash/findIndex';
import isFunction from 'lodash/isFunction';
import without from 'lodash/without';
import { TdUploadProps, UploadFile, RequestMethodResponse, SizeLimitObj } from './type';
import { SuccessContext, InnerProgressContext, UploadCtxType } from './interface';

import { useConfig } from '../hooks/useConfig';

import { isOverSizeLimit } from './util';
import xhr from '../_common/js/upload/xhr';
import log from '../_common/js/log/index';

export const useUploadProgress = (props: TdUploadProps, uploadCtx: UploadCtxType) => {
  const handleProgress = ({ event, file, files: currentFiles, percent, type = 'real' }: InnerProgressContext) => {
    const innerFiles = Array.isArray(currentFiles) ? currentFiles : [file];
    if (innerFiles?.length <= 0) return log.error('Uploader', 'Progress Error files');

    innerFiles.forEach((file) => {
      file.percent = Math.min(percent, 100);
      uploadCtx.loadingFile = file;
    });

    const progressCtx = {
      percent,
      e: event,
      file,
      type,
      currentFiles: innerFiles,
    };
    props.onProgress?.(progressCtx);
  };

  const onError = (options: {
    event?: ProgressEvent;
    file: UploadFile;
    files: UploadFile[];
    response?: any;
    resFormatted?: boolean;
  }) => {
    const { event, file, files, response, resFormatted } = options;
    const innerFiles = Array.isArray(files) ? files : [file];

    innerFiles.forEach((file) => {
      file.status = 'fail';
      uploadCtx.loadingFile = file;
    });

    let res = response;
    if (!resFormatted && typeof props.formatResponse === 'function') {
      res = props.formatResponse(response, { file, currentFiles: files });
    }
    uploadCtx.errorMsg = res?.error;
    const context = { e: event, file: uploadCtx.uploadInOneRequest ? null : innerFiles[0], currentFiles: innerFiles };
    props.onFail?.(context);
  };

  const handleSuccess = ({ event, file, files: currentFiles, response }: SuccessContext) => {
    const innerFiles = Array.isArray(currentFiles) ? currentFiles : [file];
    if (innerFiles?.length <= 0) return log.error('Uploader', 'success no files');

    innerFiles.forEach((file) => {
      file.status = 'success';
    });

    let res = response;
    if (typeof props.formatResponse === 'function') {
      res = props.formatResponse(response, {
        file: uploadCtx.uploadInOneRequest ? null : innerFiles[0],
        currentFiles: innerFiles,
      });
    }
    // 如果返回值存在 error，则认为当前接口上传失败
    if (res?.error) {
      onError({
        event,
        file: uploadCtx.uploadInOneRequest ? null : innerFiles[0],
        files: innerFiles,
        response: res,
        resFormatted: true,
      });
      uploadCtx.loadingFile = null;
      return;
    }
    if (!uploadCtx.uploadInOneRequest) {
      innerFiles[0].url = res.url || innerFiles[0].url;
    }

    uploadCtx.toUploadFiles = without(uploadCtx.toUploadFiles, ...innerFiles);

    // 上传成功的文件发送到 files
    const newFiles = innerFiles.map((file) => ({ ...file, response: res }));
    const uploadedFiles = props.multiple ? uploadCtx.uploadValue.concat(newFiles) : newFiles;
    const context = { e: event, response: res, trigger: 'upload-success' };
    // 更新数据
    uploadCtx.setUploadValue(uploadedFiles, context);

    const sContext = {
      file: uploadCtx.uploadInOneRequest ? null : newFiles[0],
      fileList: uploadedFiles,
      currentFiles: newFiles,
      e: event,
      response: res,
    };
    props.onSuccess?.(sContext);
    uploadCtx.loadingFile = null;
  };

  const handleMockProgress = (files: UploadFile[]) => {
    const timer = setInterval(() => {
      files.forEach((file) => {
        if (file.status === 'success' || file.percent >= 99) {
          clearInterval(timer);
          return;
        }
        file.percent += 1;
      });
      const { percent } = files[0];
      handleProgress({
        files,
        percent,
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

export const useUpload = (props: TdUploadProps, uploadCtx: UploadCtxType) => {
  const xhrReq = ref<XMLHttpRequest>(null);
  const { global, t } = useConfig('upload');
  // 上传状态
  const { handleProgress, handleMockProgress, handleSuccess, onError } = useUploadProgress(props, uploadCtx);

  const handleSizeLimit = (fileSize: number) => {
    const sizeLimit: SizeLimitObj =
      typeof props.sizeLimit === 'number' ? { size: props.sizeLimit, unit: 'KB' } : props.sizeLimit;

    const rSize = isOverSizeLimit(fileSize, sizeLimit.size, sizeLimit.unit);
    if (!rSize) {
      // 有参数 message 则使用，没有就使用全局 locale 配置
      uploadCtx.errorMsg = sizeLimit.message
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

  const handleRequestMethod = (files: UploadFile[]) => {
    if (!isFunction(props.requestMethod)) {
      log.warn('Upload', '`requestMethod` must be a function.');
      return;
    }
    // requestMethod first argument can be file or currentFiles
    const requestMethodParam = uploadCtx.uploadInOneRequest ? files : files[0];

    props.requestMethod(requestMethodParam).then((res: RequestMethodResponse) => {
      if (!handleRequestMethodResponse(res)) return;
      if (res.status === 'success') {
        handleSuccess({ files, response: res.response });
      } else if (res.status === 'fail') {
        const r = res.response || {};
        onError({
          event: null,
          file: uploadCtx.uploadInOneRequest ? null : files[0],
          files,
          response: { ...r, error: res.error },
        });
      }
    });
  };

  const upload = async (currentFiles: UploadFile | UploadFile[]): Promise<void> => {
    const innerFiles = Array.isArray(currentFiles) ? currentFiles : [currentFiles];

    if (!props.action && !props.requestMethod) {
      log.error('Upload', 'one of action and requestMethod must be exist.');
      return;
    }
    innerFiles.forEach((file) => {
      file.status = 'progress';
      uploadCtx.loadingFile = file;
    });

    // requestMethod 为父组件定义的自定义上传方法
    if (props.requestMethod) {
      handleRequestMethod(innerFiles);
    } else {
      // 模拟进度条
      if (props.useMockProgress) {
        handleMockProgress(innerFiles);
      }
      const request = xhr;
      xhrReq.value = request({
        action: props.action,
        data: props.data,
        files: innerFiles,
        name: props.name,
        headers: props.headers,
        withCredentials: props.withCredentials,
        onError,
        onProgress: handleProgress,
        onSuccess: handleSuccess,
        method: props.method,
      });
    }
  };

  const uploadFiles = (files: FileList) => {
    // 合并上传前则需要清空已上传列表
    if (uploadCtx.canBatchUpload && uploadCtx.uploadValue?.length > 0) {
      const context = { trigger: 'batch-clear' };
      uploadCtx.setUploadValue([], context);
    }

    let tmpFiles = [...files];
    if (props.max) {
      tmpFiles = tmpFiles.slice(0, props.max - uploadCtx.uploadValue.length);
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

      const reader = new FileReader();
      reader.readAsDataURL(fileRaw);
      reader.onload = (event: ProgressEvent<FileReader>) => {
        uploadFile.url = event.target.result as string;
      };
      handleBeforeUpload(file).then((canUpload) => {
        if (!canUpload) return;
        const newFiles = uploadCtx.toUploadFiles.concat();
        newFiles.push(uploadFile);
        uploadCtx.toUploadFiles = [...new Set(newFiles)];
        uploadCtx.loadingFile = uploadFile;
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
