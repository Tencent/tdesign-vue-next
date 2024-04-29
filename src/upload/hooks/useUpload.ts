import merge from 'lodash/merge';
import { ref, computed, toRefs } from 'vue';

import {
  getFilesAndErrors,
  validateFile,
  upload,
  getTriggerTextField,
  getDisplayFiles,
  formatToUploadFile,
} from '../../_common/js/upload/main';
import { InnerProgressContext, OnResponseErrorContext, SuccessContext } from '../../_common/js/upload/types';
import { getFileList } from '../../_common/js/upload/utils';
import { useConfig } from '../../hooks/useConfig';
import useVModel from '../../hooks/useVModel';
import { SizeLimitObj, TdUploadProps, UploadChangeContext, UploadFile, UploadRemoveContext } from '../type';

export type ValidateParams = Parameters<TdUploadProps['onValidate']>[0];

/**
 * 上传组件全部逻辑，方便脱离 UI，自定义 UI 组件
 */
export default function useUpload(props: TdUploadProps) {
  const inputRef = ref<HTMLInputElement>();
  // TODO: Form 表单控制上传组件是否禁用
  const { disabled, autoUpload, isBatchUpload, multiple, files, modelValue, defaultFiles } = toRefs(props);
  const { globalConfig, t, classPrefix } = useConfig('upload');
  const [uploadValue, setUploadValue] = useVModel(files, modelValue, defaultFiles.value, props.onChange, 'files');
  const xhrReq = ref<{ files: UploadFile[]; xhrReq: XMLHttpRequest }[]>([]);
  const toUploadFiles = ref<UploadFile[]>([]);
  const sizeOverLimitMessage = ref('');

  const locale = computed(() => merge({}, globalConfig.value, props.locale));

  const tipsClasses = `${classPrefix.value}-upload__tips ${classPrefix.value}-size-s`;
  const errorClasses = [tipsClasses].concat(`${classPrefix.value}-upload__tips-error`);
  const placeholderClass = `${classPrefix.value}-upload__placeholder`;

  // 单文件场景：触发元素文本
  const triggerUploadText = computed(() => {
    const field = getTriggerTextField({
      isBatchUpload: isBatchUpload.value,
      multiple: multiple.value,
      status: uploadValue.value?.[0]?.status,
      autoUpload: autoUpload.value,
    });
    return locale.value.triggerUploadText[field];
  });

  const uploading = ref(false);

  // 文件列表显示的内容（自动上传和非自动上传有所不同）
  const displayFiles = computed(() => {
    return getDisplayFiles({
      multiple: props.multiple,
      toUploadFiles: toUploadFiles.value,
      uploadValue: uploadValue.value,
      autoUpload: autoUpload.value,
      isBatchUpload: isBatchUpload.value,
    });
  });

  const uploadFilePercent = (params: { file: UploadFile; percent: number }) => {
    const { file, percent } = params;
    const operationUploadFiles = autoUpload.value ? toUploadFiles : uploadValue;
    const index = operationUploadFiles.value.findIndex((item) => file.raw === item.raw);
    operationUploadFiles.value[index] = { ...operationUploadFiles.value[index], percent };
  };

  const updateFilesProgress = () => {
    if (props.autoUpload) {
      toUploadFiles.value = [...toUploadFiles.value];
    }
  };

  const onResponseError = (p: OnResponseErrorContext) => {
    if (!p || !p.files || !p.files[0]) return;
    const { response, event, files } = p;
    updateFilesProgress();
    props.onOneFileFail?.({
      e: event,
      file: files?.[0],
      currentFiles: files,
      failedFiles: files,
      response,
    });
    // 单选或多文件替换，需要清空上一次上传成功的文件
    if (!props.multiple || props.isBatchUpload) {
      setUploadValue([], {
        trigger: 'progress-fail',
        e: p.event,
        file: p.files[0],
      });
    }
  };

  // 多文件上传场景，单个文件进度
  const onResponseProgress = (p: InnerProgressContext) => {
    updateFilesProgress();
    props.onProgress?.({
      e: p.event,
      file: p.file,
      currentFiles: p.files,
      percent: p.percent,
      type: p.type,
      XMLHttpRequest: p.XMLHttpRequest,
    });
  };

  // 多文件上传场景，单个文件上传成功后
  const onResponseSuccess = (p: SuccessContext) => {
    // 只有多个上传请求同时触发时才需 onOneFileSuccess
    if (props.multiple && !props.uploadAllFilesInOneRequest) {
      updateFilesProgress();
      props.onOneFileSuccess?.({
        e: p.event,
        file: p.files[0],
        response: p.response,
      });
    }
  };

  function getSizeLimitError(sizeLimitObj: SizeLimitObj) {
    const limit = sizeLimitObj;
    return limit.message
      ? t(limit.message, { sizeLimit: limit.size })
      : `${t(locale.value.sizeLimitMessage, { sizeLimit: limit.size })} ${limit.unit}`;
  }

  const handleNotAutoUpload = (toFiles: UploadFile[]) => {
    const tmpFiles = props.multiple && !isBatchUpload.value ? uploadValue.value.concat(toFiles) : toFiles;
    if (!tmpFiles.length) return;
    setUploadValue(tmpFiles, {
      trigger: 'add',
      index: uploadValue.value.length,
      file: toFiles[0],
      files: toFiles,
    });
    toUploadFiles.value = [];
  };

  const onFileChange = (files: File[]) => {
    if (disabled.value) return;
    const params = { currentSelectedFiles: formatToUploadFile([...files], props.format) };
    props.onSelectChange?.([...files], params);
    validateFile({
      uploadValue: uploadValue.value,
      // @ts-ignore
      files: [...files],
      allowUploadDuplicateFile: props.allowUploadDuplicateFile,
      max: props.multiple ? props.max : 0,
      sizeLimit: props.sizeLimit,
      isBatchUpload: isBatchUpload.value,
      autoUpload: autoUpload.value,
      format: props.format,
      beforeUpload: props.beforeUpload,
      beforeAllFilesUpload: props.beforeAllFilesUpload,
    }).then((args) => {
      // 自定义全文件校验不通过
      if (args.validateResult?.type === 'BEFORE_ALL_FILES_UPLOAD') {
        const params: ValidateParams = { type: 'BEFORE_ALL_FILES_UPLOAD', files: args.files };
        props.onValidate?.(params);
        return;
      }
      // 文件数量校验不通过
      if (args.lengthOverLimit) {
        const params: ValidateParams = { type: 'FILES_OVER_LENGTH_LIMIT', files: args.files };
        props.onValidate?.(params);
        if (!args.files.length) return;
      }
      // 过滤相同的文件名
      if (args.hasSameNameFile) {
        const params: ValidateParams = { type: 'FILTER_FILE_SAME_NAME', files: args.files };
        props.onValidate?.(params);
      }
      // 文件大小校验结果处理（已过滤超出限制的文件）
      if (args.fileValidateList instanceof Array) {
        const { sizeLimitErrors, beforeUploadErrorFiles, toFiles } = getFilesAndErrors(
          args.fileValidateList,
          getSizeLimitError,
        );
        const tmpWaitingFiles = autoUpload.value ? toFiles : toUploadFiles.value.concat(toFiles);
        toUploadFiles.value = tmpWaitingFiles;
        props.onWaitingUploadFilesChange?.({ files: tmpWaitingFiles, trigger: 'validate' });
        // 文件大小处理
        if (sizeLimitErrors[0]) {
          sizeOverLimitMessage.value = sizeLimitErrors[0].file.response.error;
          props.onValidate?.({ type: 'FILE_OVER_SIZE_LIMIT', files: sizeLimitErrors.map((t) => t.file) });
        } else {
          sizeOverLimitMessage.value = '';
          // 自定义方法 beforeUpload 拦截的文件
          if (beforeUploadErrorFiles.length) {
            const params: ValidateParams = { type: 'CUSTOM_BEFORE_UPLOAD', files: beforeUploadErrorFiles };
            props.onValidate?.(params);
          }
        }
        // 如果是自动上传
        if (autoUpload.value) {
          uploadFiles(tmpWaitingFiles);
        } else {
          handleNotAutoUpload(tmpWaitingFiles);
        }
      }
    });

    // 清空 <input type="file"> 元素的文件，避免出现重复文件无法选择的情况
    inputRef.value.value = null;
  };

  const onNormalFileChange = (e: InputEvent) => {
    const fileList = getFileList((e.target as HTMLInputElement).files);
    onFileChange?.(fileList);
  };

  function onDragFileChange(files: File[]) {
    onFileChange?.(files);
  }

  function onPasteFileChange(e: ClipboardEvent) {
    onFileChange?.([...e.clipboardData.files]);
  }

  /**
   * 上传文件。对外暴露方法，修改时需谨慎
   * @param toFiles 本地上传的文件列表
   */
  function uploadFiles(toFiles?: UploadFile[]) {
    const notUploadedFiles = uploadValue.value.filter((t) => t.status !== 'success');
    const files = autoUpload.value ? toFiles || toUploadFiles.value : notUploadedFiles;
    if (!files || !files.length) return;
    uploading.value = true;
    xhrReq.value = [];
    upload({
      action: props.action,
      headers: props.headers,
      method: props.method,
      name: props.name,
      withCredentials: props.withCredentials,
      uploadedFiles: uploadValue.value,
      toUploadFiles: files,
      multiple: props.multiple,
      isBatchUpload: isBatchUpload.value,
      autoUpload: props.autoUpload,
      uploadAllFilesInOneRequest: props.uploadAllFilesInOneRequest,
      useMockProgress: props.useMockProgress,
      data: props.data,
      mockProgressDuration: props.mockProgressDuration,
      requestMethod: props.requestMethod,
      formatRequest: props.formatRequest,
      formatResponse: props.formatResponse,
      onResponseProgress,
      onResponseSuccess,
      onResponseError,
      setXhrObject: (xhr) => {
        if (xhr.files[0]?.raw && xhrReq.value.find((item) => item.files[0]?.raw === xhr.files[0].raw)) return;
        xhrReq.value = xhrReq.value.concat(xhr);
      },
    }).then(
      // 多文件场景时，全量文件完成后
      ({ status, data, list, failedFiles }) => {
        uploading.value = false;
        if (status === 'success') {
          setUploadValue([...data.files], {
            trigger: 'add',
            file: data.files[0],
          });
          xhrReq.value = [];
          props.onSuccess?.({
            fileList: data.files,
            currentFiles: files,
            file: files[0],
            // 只有全部请求完成后，才会存在该字段
            results: list?.map((t) => t.data),
            // 单文件单请求有一个 response，多文件多请求有多个 response
            response: data.response || list.map((t) => t.data.response),
            XMLHttpRequest: data.XMLHttpRequest,
          });
        } else if (failedFiles?.[0]) {
          props.onFail?.({
            e: data.event,
            file: failedFiles[0],
            failedFiles,
            currentFiles: files,
            response: data.response,
            XMLHttpRequest: data.XMLHttpRequest,
          });
        }

        // 非自动上传，文件都在 uploadValue，不涉及 toUploadFiles
        if (autoUpload.value) {
          toUploadFiles.value = failedFiles;
          props.onWaitingUploadFilesChange?.({ files: failedFiles, trigger: 'uploaded' });
        }
      },
    );
  }

  function onInnerRemove(p: UploadRemoveContext) {
    sizeOverLimitMessage.value = '';
    p.e.stopPropagation?.();
    const changePrams: UploadChangeContext = {
      e: p.e,
      trigger: 'remove',
      index: p.index,
      file: p.file,
    };
    // remove all files for batchUpload
    if (props.isBatchUpload || !props.multiple) {
      toUploadFiles.value = [];
      props.onWaitingUploadFilesChange?.({ files: [], trigger: 'remove' });
      setUploadValue([], changePrams);
    } else if (!props.autoUpload) {
      uploadValue.value.splice(p.index, 1);
      setUploadValue([...uploadValue.value], changePrams);
    } else {
      // autoUpload 场景下， p.index < uploadValue.length 表示移除已经上传成功的文件；反之表示移除待上传列表文件
      // eslint-disable-next-line
      if (p.index < uploadValue.value.length) {
        uploadValue.value.splice(p.index, 1);
        setUploadValue([...uploadValue.value], changePrams);
      } else {
        toUploadFiles.value.splice(p.index - uploadValue.value.length, 1);
        toUploadFiles.value = [...toUploadFiles.value];
        props.onWaitingUploadFilesChange?.({ files: [...toUploadFiles.value], trigger: 'remove' });
      }
    }
    props.onRemove?.(p);
  }

  const triggerUpload = (e?: MouseEvent) => {
    if (disabled.value || !inputRef.value) return;
    e?.stopPropagation?.();
    (inputRef.value as HTMLInputElement).click();
  };

  const cancelUpload = (context?: { file?: UploadFile; e?: MouseEvent }) => {
    xhrReq.value?.forEach((item) => {
      item.xhrReq?.abort();
    });
    uploading.value = false;

    // autoUpload do not need to reset to waiting state
    if (autoUpload.value) {
      toUploadFiles.value = [];
    } else {
      setUploadValue(
        uploadValue.value.map((item) => {
          if (item.status !== 'success') {
            return { ...item, status: 'waiting' };
          }
          return item;
        }),
        { trigger: 'abort' },
      );
    }

    if (context?.file && !autoUpload.value) {
      onInnerRemove?.({ file: context.file, e: context.e, index: 0 });
    }

    props.onCancelUpload?.();
  };

  return {
    t,
    locale,
    classPrefix,
    triggerUploadText,
    toUploadFiles,
    uploadValue,
    displayFiles,
    sizeOverLimitMessage,
    uploading,
    tipsClasses,
    errorClasses,
    placeholderClass,
    inputRef,
    disabled,
    xhrReq,
    uploadFilePercent,
    uploadFiles,
    onFileChange,
    onNormalFileChange,
    onDragFileChange,
    onPasteFileChange,
    onInnerRemove,
    triggerUpload,
    cancelUpload,
  };
}
