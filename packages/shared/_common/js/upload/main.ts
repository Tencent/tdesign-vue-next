import isFunction from 'lodash/isFunction';
import isNumber from 'lodash/isNumber';
/* eslint-disable no-param-reassign */
import { getCurrentDate, isOverSizeLimit } from './utils';
import xhr from './xhr';
import log from '../log/log';
import {
  UploadFile,
  SizeLimitObj,
  FileChangeParams,
  FileChangeReturn,
  RequestMethodResponse,
  HandleUploadParams,
  SuccessContext,
  handleSuccessParams,
  UploadTriggerUploadText,
  ErrorContext,
  ResponseType,
} from './types';

export interface BeforeUploadExtra {
  /** 图片文件大小限制 */
  sizeLimit?: number | SizeLimitObj;
  /** 上传文件之前的钩子，参数为上传的文件，返回值决定是否上传 */
  beforeUpload?: (file: UploadFile) => boolean | Promise<boolean>;
}

export type BeforeUploadPromiseList = [Promise<SizeLimitObj>, undefined | Promise<boolean>]

export function handleBeforeUpload(
  file: UploadFile, params: BeforeUploadExtra,
): Promise<[SizeLimitObj, boolean]> {
  const { sizeLimit, beforeUpload } = params;
  // 文件大小校验
  const sizePromise = new Promise<SizeLimitObj>((resolve) => {
    let result: SizeLimitObj = null;
    if (sizeLimit) {
      const sizeLimitObj: SizeLimitObj = isNumber(sizeLimit)
        ? { size: sizeLimit, unit: 'KB' }
        : sizeLimit;
      const limit = isOverSizeLimit(file.size, sizeLimitObj.size, sizeLimitObj.unit);
      if (limit) {
        result = sizeLimitObj;
      }
    }
    resolve(result);
  });

  // 自定义校验
  const promiseList: BeforeUploadPromiseList = [sizePromise, undefined];
  if (isFunction(beforeUpload)) {
    const r = beforeUpload(file);
    const p = r instanceof Promise ? r : (new Promise<boolean>((resolve) => resolve(r)));
    promiseList[1] = p;
  }

  // 同时进行文件大小校验和自定义校验函数
  return new Promise((resolve) => {
    Promise.all(promiseList).then((r) => {
      resolve(r);
    });
  });
}

export interface OnErrorParams extends ErrorContext {
  formatResponse?: HandleUploadParams['formatResponse'];
}

export function handleError(options: OnErrorParams) {
  const { event, files, response, XMLHttpRequest, formatResponse } = options;
  let res = response;
  if (isFunction(formatResponse)) {
    res = formatResponse(response, { file: files[0], currentFiles: files });
  }
  files.forEach((file) => {
    file.status = 'fail';
    file.response = res;
  });
  return { response: res, event, files, XMLHttpRequest };
}

export function handleSuccess(params: handleSuccessParams) {
  const { event, files, response, XMLHttpRequest } = params;
  if (files?.length <= 0) {
    log.error('Upload', 'Empty File in Success Callback');
  }
  files.forEach((file) => {
    file.percent = 100;
    file.status = 'success';
    delete file.response?.error;
  });
  const res = response;
  files[0].url = res.url || files[0].url;
  return { response: res, event, files, XMLHttpRequest };
}

export type UploadRequestReturn = {
  status?: 'fail' | 'success';
  /** 上传失败的文件，需等待继续上传 */
  failedFiles?: UploadFile[];
  data?: SuccessContext;
  /** 批量文件上传，一个文件一个请求的场景下，响应结果的列表 */
  list?: UploadRequestReturn[];
}

export function handleRequestMethodResponse(res: RequestMethodResponse) {
  if (!res) {
    log.error('Upload', '`requestMethodResponse` is required.');
    return false;
  }
  if (!res.status) {
    log.error('Upload', '`requestMethodResponse.status` is missing, which value only can be `success` or `fail`');
    return false;
  }
  if (!['success', 'fail'].includes(res.status)) {
    log.error('Upload', '`requestMethodResponse.status` must be `success` or `fail`, examples `{ status: \'success\', response: { url: \'\' } }`');
    return false;
  }
  if (res.status === 'success' && (!res.response || (!res.response.url && !res.response.files))) {
    log.warn('Upload', '`requestMethodResponse.response.url` or `requestMethodResponse.response.files` is required if `status` is `success`');
  }
  return true;
}

/**
 * 一次上传请求的返回结果
 */
export function uploadOneRequest(params: HandleUploadParams): Promise<UploadRequestReturn> {
  const { action, toUploadFiles, requestMethod } = params;
  return new Promise<UploadRequestReturn>((resolve) => {
    if (!action && !requestMethod) {
      log.error('Upload', 'one of action and requestMethod must be exist.');
      resolve({});
      return;
    }
    if (!toUploadFiles || !toUploadFiles.length) {
      log.warn('Upload', 'No files need to be uploaded');
      resolve({});
      return;
    }
    toUploadFiles.forEach((file) => {
      file.status = 'progress';
    });
    // 自定义上传方法
    if (requestMethod) {
      requestMethod(params.multiple ? toUploadFiles : toUploadFiles[0]).then((res) => {
        if (!handleRequestMethodResponse(res)) {
          resolve({});
          return;
        }
        let response = (res.response || {}) as ResponseType;
        if (isFunction(params.formatResponse)) {
          response = params.formatResponse(response, { file: toUploadFiles[0], currentFiles: toUploadFiles });
        }
        if (res.status === 'fail') {
          response.error = res.error || response.error;
        }
        let resultFiles: UploadFile[] = [];
        if (res.status === 'success' && response.files) {
          // 一个请求上传并返回多个文件
          resultFiles = response.files.map((file: UploadFile) => {
            const fileInfo = toUploadFiles.find((toFile) => (
              (file.name && toFile.name === file.name) || (file.raw && toFile.raw === file.raw)
            ));
            return {
              ...fileInfo,
              ...file,
              status: res.status,
              response,
            };
          });
        } else {
          // 一个请求上传并返回一个文件
          toUploadFiles.forEach((file) => {
            file.status = res.status;
            file.response = response;
            file.url = response.url;
            file.percent = res.status === 'success' ? 100 : 0;
            // 如果上传请求返回结果没有上传日期，则使用电脑当前日期显示
            file.uploadTime = response?.uploadTime || getCurrentDate();
          });
          resultFiles = toUploadFiles;
        }
        const result = {
          response,
          file: resultFiles[0],
          files: resultFiles,
        };
        if (res.status === 'success') {
          params.onResponseSuccess?.(result);
        } else if (res.status === 'fail') {
          params.onResponseError?.(result);
        }
        resolve({
          status: res.status,
          data: result,
        });
      });
    } else {
      const xhrReq = xhr({
        action: params.action,
        files: params.toUploadFiles,
        useMockProgress: params.useMockProgress,
        mockProgressDuration: params.mockProgressDuration,
        onError: (p: ErrorContext) => {
          const r = handleError({ ...p, formatResponse: params.formatResponse });
          params.onResponseError?.(r);
          resolve({ status: 'fail', data: r });
        },
        onProgress: params.onResponseProgress,
        onSuccess: (p: SuccessContext) => {
          const { formatResponse } = params;
          let res = p.response;
          if (isFunction(formatResponse)) {
            res = formatResponse(p.response, {
              file: p.file,
              currentFiles: p.files,
            });
          }
          if (res.error) {
            const r = handleError({ ...p, response: res });
            params.onResponseError?.(r);
            resolve({ status: 'fail', data: r });
          } else {
            p.file.response = res;
            p.files[0].response = res;
            const r = handleSuccess({ ...p, response: res });
            params.onResponseSuccess?.(r);
            resolve({ status: 'success', data: r });
          }
        },
        formatRequest: params.formatRequest,
        data: params.data,
        name: params.name,
        headers: params.headers,
        withCredentials: params.withCredentials,
        method: params.method,
      });
      params.setXhrObject?.({
        files: params.toUploadFiles,
        xhrReq,
      });
    }
  });
}

function updateUploadedFiles(uploadFiles: UploadFile[], resultFiles: UploadFile[]) {
  const existFiles = uploadFiles.filter((t) => t.url);
  const newFiles = existFiles;
  for (let i = 0, len = resultFiles.length; i < len; i++) {
    const file = resultFiles[i];
    const index = uploadFiles.findIndex((item) => (
      (item.raw && item.raw === file.raw) || (item.name && item.name === file.name)
    ));
    const tmpFile = index >= 0 ? { ...uploadFiles[index], ...file } : file;
    newFiles.push(tmpFile);
  }
  return newFiles;
}

/**
 * 可能单个文件上传，也可能批量文件一次性上传
 * 返回上传成功或上传失败的文件列表
 */
export function upload(params: HandleUploadParams):
Promise<UploadRequestReturn> {
  const { uploadAllFilesInOneRequest, toUploadFiles, uploadedFiles, isBatchUpload } = params;
  // 一批文件上传，部分文件失败，重新上传失败的文件
  const thisUploadFiles = toUploadFiles.filter((t) => (
    !t.response || (t.response && !t.response.error)
  ));
  return new Promise((resolve) => {
    // 所有文件一次性上传
    if (uploadAllFilesInOneRequest || !params.multiple) {
      uploadOneRequest(params).then((r) => {
        if (r.status === 'success') {
          r.data.files = isBatchUpload || !params.multiple
            ? r.data.files
            : updateUploadedFiles(uploadedFiles, r.data.files);
        }
        const failedFiles = r.status === 'fail' ? r.data.files : [];
        resolve({ ...r, failedFiles });
      });
      return;
    }
    // 一个文件一个文件上传
    const list = thisUploadFiles.map((file) => (
      uploadOneRequest({ ...params, toUploadFiles: [file] })
    ));
    Promise.all(list).then((arr) => {
      const files: UploadFile[] = [];
      const failedFiles: UploadFile[] = [];
      arr.forEach((one) => {
        if (one.status === 'success') {
          files.push(one.data.files[0]);
        } else if (one.status === 'fail') {
          failedFiles.push(one.data.files[0]);
        }
      });
      const tFiles = params.autoUpload
        ? uploadedFiles.concat(files)
        : uploadedFiles;
      const newFiles = isBatchUpload || !params.multiple ? files : tFiles;
      resolve({
        status: files.length ? 'success' : 'fail',
        data: {
          files: newFiles,
        },
        // 上传失败的文件，需等待继续上传
        failedFiles,
        list: arr,
      });
    });
  });
}

export function formatToUploadFile(
  files: File[],
  format: FileChangeParams['format'],
  status: UploadFile['status'] = undefined,
  percent = 0,
) {
  return files.map((fileRaw: File) => {
    let file: UploadFile = fileRaw;
    if (isFunction(format)) {
      file = format(fileRaw);
    }
    const uploadFile: UploadFile = {
      raw: fileRaw,
      lastModified: fileRaw.lastModified,
      name: fileRaw.name,
      size: fileRaw.size,
      type: fileRaw.type,
      percent,
      status,
      ...file,
    };
    return uploadFile;
  });
}

export function validateFile(
  params: FileChangeParams
): Promise<FileChangeReturn> {
  const { files, uploadValue, max, allowUploadDuplicateFile } = params;
  return new Promise((resolve) => {
    // 是否允许相同的文件名存在
    let tmpFiles = files.filter((file) => {
      const sameNameFile = uploadValue.find((t) => t.name === file.name);
      return allowUploadDuplicateFile || !sameNameFile;
    });

    let hasSameNameFile = false;
    if (tmpFiles.length < files.length) {
      hasSameNameFile = true;
    }
    if (!tmpFiles.length) {
      const tFiles = formatToUploadFile(files, params.format, params.autoUpload ? 'progress' : 'waiting');
      resolve({ hasSameNameFile, file: tFiles?.[0], files: tFiles, validateResult: { type: 'FILTER_FILE_SAME_NAME' } });
      return;
    }
    // 上传文件数量限制
    let lengthOverLimit = false;
    if (max && tmpFiles.length && !params.isBatchUpload) {
      const tmpFilesLenToBeAdded = tmpFiles.length;
      tmpFiles = tmpFiles.slice(0, max - uploadValue.length);
      if (tmpFilesLenToBeAdded + uploadValue.length > max) {
        lengthOverLimit = true;
      }
    }

    // 格式化文件对象
    const formattedFiles = formatToUploadFile(tmpFiles, params.format, params.autoUpload ? 'progress' : 'waiting');

    // 全量文件，一波校验，整体上传 或 终止上传
    let allFileValidatePromise;
    if (params.beforeAllFilesUpload) {
      const r = params.beforeAllFilesUpload?.(formattedFiles);
      allFileValidatePromise = r instanceof Promise ? r : new Promise((resolve) => resolve(r));
    }

    // 单文件合法性校验，一个文件校验不通过其他文件可继续上传
    const promiseList = formattedFiles.map((file: UploadFile) => new Promise((resolve) => {
      handleBeforeUpload(
        file,
        { beforeUpload: params.beforeUpload, sizeLimit: params.sizeLimit },
      ).then(([sizeResult, customResult]) => {
        if (sizeResult) {
          resolve({ file, validateResult: { type: 'FILE_OVER_SIZE_LIMIT', extra: sizeResult } });
        } else if (customResult === false) {
          resolve({ file, validateResult: { type: 'CUSTOM_BEFORE_UPLOAD' } });
        }
        resolve({ file });
      });
    }));
    Promise.all([allFileValidatePromise].concat(promiseList)).then((results) => {
      const [allFilesResult, ...others] = results;
      // 如果 beforeAllFilesUpload 校验未通过
      if (allFilesResult === false) {
        resolve({
          lengthOverLimit,
          hasSameNameFile,
          validateResult: { type: 'BEFORE_ALL_FILES_UPLOAD' },
          files: formattedFiles,
        });
      } else {
        resolve({
          lengthOverLimit,
          hasSameNameFile,
          fileValidateList: others,
          files: formattedFiles,
        });
      }
    });
  });
}

export function getFilesAndErrors(fileValidateList: FileChangeReturn[], getError: (p: {[key: string]: any }) => string) {
  const sizeLimitErrors: FileChangeReturn[] = [];
  const beforeUploadErrorFiles: UploadFile[] = [];
  const toFiles: UploadFile[] = [];
  fileValidateList.forEach((oneFile) => {
    if (oneFile.validateResult?.type === 'CUSTOM_BEFORE_UPLOAD') {
      beforeUploadErrorFiles.push(oneFile.file);
      return;
    }
    if (oneFile.validateResult?.type === 'FILE_OVER_SIZE_LIMIT') {
      if (!oneFile.file.response) {
        oneFile.file.response = {};
      }
      oneFile.file.response.error = oneFile.file.response.error
      || getError(oneFile.validateResult.extra);
      sizeLimitErrors.push(oneFile);
      return;
    }
    toFiles.push(oneFile.file);
  });

  return { sizeLimitErrors, beforeUploadErrorFiles, toFiles };
}

/**
 * 获取文件上传触发元素文本 在全局配置中的字段
 */
export function getTriggerTextField(p: {
  status: 'success' | 'fail' | 'progress' | 'waiting',
  multiple: boolean,
  autoUpload: boolean;
  isBatchUpload: boolean;
}): keyof UploadTriggerUploadText {
  if (p.isBatchUpload && p.status) return 'reupload';
  if (p.status === 'fail') return 'reupload';
  if (p.status === 'progress') return 'uploading';
  if (p.status === 'success' || (!p.autoUpload && p.status === 'waiting')) {
    return p.multiple ? 'continueUpload' : 'reupload';
  }
  return 'fileInput';
}

export interface GetDisplayFilesParams {
  multiple: boolean;
  autoUpload: boolean;
  isBatchUpload: boolean;
  uploadValue: UploadFile[];
  toUploadFiles: UploadFile[];
}

/**
 * 获取文件列表显示
 */
export function getDisplayFiles(params: GetDisplayFilesParams) {
  const { multiple, uploadValue, toUploadFiles, autoUpload } = params;
  const waitingUploadFiles = autoUpload
    ? toUploadFiles
    : toUploadFiles.filter((file) => file.status !== 'success');
  if (multiple && !params.isBatchUpload) {
    if (!autoUpload) return uploadValue;
    return (waitingUploadFiles.length ? uploadValue.concat(waitingUploadFiles) : uploadValue) || [];
  }
  return (waitingUploadFiles.length ? waitingUploadFiles : uploadValue) || [];
}
