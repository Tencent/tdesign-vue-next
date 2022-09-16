import { ref, computed, toRefs, watch } from 'vue';
import merge from 'lodash/merge';
import { SizeLimitObj, TdUploadProps, UploadChangeContext, UploadFile, UploadRemoveContext } from '../type';
import {
  getFilesAndErrors,
  validateFile,
  upload,
  getTriggerTextField,
  getDisplayFiles,
} from '../../_common/js/upload/main';
import { getFileUrlByFileRaw } from '../../_common/js/upload/utils';
import useVModel from '../../hooks/useVModel';
import { InnerProgressContext, OnResponseErrorContext, SuccessContext } from '../../_common/js/upload/types';
import { useConfig } from '../../hooks/useConfig';

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

  // 单文件场景：触发元素文本
  const triggerUploadText = computed(() => {
    const field = getTriggerTextField({
      isBatchUpload: isBatchUpload.value,
      multiple: props.multiple,
      status: uploadValue?.[0]?.status,
      autoUpload: autoUpload.value,
    });
    return locale.value.triggerUploadText[field];
  });

  const uploading = ref(false);

  // 文件列表显示的内容（自动上传和非自动上传有所不同）
  // const displayFiles = ref<UploadFile[]>([]);
  const displayFiles = computed(() => {
    return getDisplayFiles({
      multiple: props.multiple,
      toUploadFiles: toUploadFiles.value,
      uploadValue: uploadValue.value,
      autoUpload: autoUpload.value,
      isBatchUpload: isBatchUpload.value,
    });
  });

  // watch([multiple, toUploadFiles, uploadValue, autoUpload, isBatchUpload], (
  //   [multiple, toUploadFiles, uploadValue, autoUpload, isBatchUpload]
  // ) => {
  //   displayFiles.value = getDisplayFiles({
  //     multiple,
  //     toUploadFiles,
  //     uploadValue,
  //     autoUpload,
  //     isBatchUpload,
  //   });
  // });

  const onResponseError = (p: OnResponseErrorContext) => {
    if (!p) return;
    const { response, event, files } = p;
    files?.[0] &&
      props.onOneFileFail?.({
        e: event,
        file: files?.[0],
        currentFiles: files,
        failedFiles: files,
        response,
      });
  };

  const onResponseProgress = (p: InnerProgressContext) => {
    props.onProgress?.({
      e: p.event,
      file: p.file,
      currentFiles: p.files,
      percent: p.percent,
      type: p.type,
    });
  };

  // 只有多个上传请求同时触发时才需 onOneFileSuccess
  const onResponseSuccess = (p: SuccessContext) => {
    if (!props.multiple || props.uploadAllFilesInOneRequest) return;
    props.onOneFileSuccess?.({
      e: p.event,
      file: p.files[0],
      response: p.response,
    });
    const index = uploadValue.value.findIndex((file) => file.raw === p.files[0].raw);
    if (index > 0) {
      uploadValue.value.splice(index, 1, p.files[0]);
      setUploadValue([...uploadValue.value], { trigger: 'status-change' });
    }
  };

  function getSizeLimitError(sizeLimitObj: SizeLimitObj) {
    const limit = sizeLimitObj;
    return limit.message
      ? t(limit.message, { sizeLimit: limit.size })
      : `${t(locale.value.sizeLimitMessage, { sizeLimit: limit.size })} ${limit.unit}`;
  }

  const handleNonAutoUpload = (toFiles: UploadFile[]) => {
    const tmpFiles = props.multiple && !isBatchUpload.value ? uploadValue.value.concat(toFiles) : toFiles;
    // 图片需要本地预览
    if (['image', 'image-flow'].includes(props.theme)) {
      const list = tmpFiles.map(
        (file) =>
          new Promise((resolve) => {
            getFileUrlByFileRaw(file.raw).then((url) => {
              resolve({ ...file, url });
            });
          }),
      );
      Promise.all(list).then((files) => {
        setUploadValue(files, {
          trigger: 'add',
          index: uploadValue.value.length,
          file: files[0],
        });
      });
    } else {
      setUploadValue(tmpFiles, {
        trigger: 'add',
        index: uploadValue.value.length,
        file: tmpFiles[0],
      });
    }
    toUploadFiles.value = [];
  };

  const onFileChange = (files: FileList) => {
    if (props.disabled) return;
    // @ts-ignore
    props.onSelectChange?.([...files], { currentSelectedFiles: toUploadFiles });
    validateFile({
      uploadValue: uploadValue.value,
      // @ts-ignore
      files: [...files],
      allowUploadDuplicateFile: props.allowUploadDuplicateFile,
      max: props.max,
      sizeLimit: props.sizeLimit,
      isBatchUpload: isBatchUpload.value,
      autoUpload: autoUpload.value,
      format: props.format,
      beforeUpload: props.beforeUpload,
      beforeAllFilesUpload: props.beforeAllFilesUpload,
    }).then((args) => {
      // 自定义全文件校验不通过
      if (args.validateResult?.type === 'BEFORE_ALL_FILES_UPLOAD') return;
      // 文件数量校验不通过
      if (args.lengthOverLimit) {
        props.onValidate?.({ type: 'FILES_OVER_LENGTH_LIMIT', files: args.files });
      }
      // 过滤相同的文件名
      if (args.hasSameNameFile) {
        props.onValidate?.({ type: 'FILTER_FILE_SAME_NAME', files: args.files });
      }
      // 文件大小校验结果处理
      if (args.fileValidateList instanceof Array) {
        const { sizeLimitErrors, toFiles } = getFilesAndErrors(args.fileValidateList, getSizeLimitError);
        const tmpWaitingFiles = autoUpload.value ? toFiles : toUploadFiles.value.concat(toFiles);
        toUploadFiles.value = tmpWaitingFiles;
        props.onWaitingUploadFilesChange?.({ files: tmpWaitingFiles, trigger: 'validate' });
        // 错误信息处理
        if (sizeLimitErrors[0]) {
          sizeOverLimitMessage.value = sizeLimitErrors[0].file.response.error;
          props.onValidate?.({ type: 'FILE_OVER_SIZE_LIMIT', files: sizeLimitErrors.map((t) => t.file) });
        } else {
          sizeOverLimitMessage.value = '';
        }
        // 如果是自动上传
        if (autoUpload.value) {
          uploadFiles(toFiles);
        } else {
          handleNonAutoUpload(toFiles);
        }
      }
    });

    // 清空 <input type="file"> 元素的文件，避免出现重复文件无法选择的情况
    inputRef.value.value = null;
  };

  const onNormalFileChange = (e: Event) => {
    onFileChange?.((e.target as HTMLInputElement).files);
  };

  function onDragFileChange(e: DragEvent) {
    onFileChange?.(e.dataTransfer.files);
  }

  let xhrReqList: { files: UploadFile[]; xhrReq: XMLHttpRequest }[] = [];
  /**
   * 上传文件
   * 对外暴露方法，修改时需谨慎
   */
  function uploadFiles(toFiles?: UploadFile[]) {
    const notUploadedFiles = uploadValue.value.filter((t) => t.status !== 'success');
    const files = autoUpload.value ? toFiles || toUploadFiles.value : notUploadedFiles;
    if (!files || !files.length) return;
    uploading.value = true;
    upload({
      action: props.action,
      uploadedFiles: uploadValue.value,
      toUploadFiles: files,
      multiple: props.multiple,
      isBatchUpload: isBatchUpload.value,
      uploadAllFilesInOneRequest: props.uploadAllFilesInOneRequest,
      useMockProgress: props.useMockProgress,
      data: props.data,
      requestMethod: props.requestMethod,
      formatRequest: props.formatRequest,
      formatResponse: props.formatResponse,
      onResponseProgress,
      onResponseSuccess,
      onResponseError,
      setXhrObject: (xhr) => {
        if (xhr.files[0]?.raw && xhrReqList.find((item) => item.files[0].raw === xhr.files[0].raw)) return;
        xhrReqList = xhrReqList.concat(xhr);
        const timer = setTimeout(() => {
          xhrReq.value = xhrReqList;
          clearTimeout(timer);
        }, 10);
      },
    }).then(
      ({ status, data, list, failedFiles }) => {
        uploading.value = false;
        if (status === 'success') {
          if (autoUpload.value) {
            setUploadValue(data.files, {
              e: data.event,
              trigger: 'add',
              index: uploadValue.value.length,
              file: data.files[0],
            });
          }
          props.onSuccess?.({
            fileList: data.files,
            currentFiles: files,
            file: files[0],
            // 只有全部请求完成后，才会存在该字段
            results: list?.map((t) => t.data),
          });
          xhrReqList = [];
          xhrReq.value = [];
        } else if (failedFiles?.[0]) {
          props.onFail?.({
            e: data.event,
            file: failedFiles[0],
            failedFiles,
            currentFiles: files,
            response: data.response,
          });
        }

        // 非自动上传，文件都在 uploadValue，不涉及 toUploadFiles
        if (autoUpload.value) {
          toUploadFiles.value = failedFiles;
          props.onWaitingUploadFilesChange?.({ files: failedFiles, trigger: 'uploaded' });
        }
      },
      (p) => {
        onResponseError(p);
        uploading.value = false;
      },
    );
  }

  function onRemove(p: UploadRemoveContext) {
    sizeOverLimitMessage.value = '';
    const changePrams: UploadChangeContext = {
      e: p.e,
      trigger: 'remove',
      index: p.index,
      file: p.file,
    };
    // remove all files for batchUpload
    if (!p.file && p.index === -1) {
      toUploadFiles.value = [];
      props.onWaitingUploadFilesChange?.({ files: [], trigger: 'remove' });
      setUploadValue([], changePrams);
      props.onRemove?.(p);
      return;
    }
    // remove one file
    if (autoUpload.value && p.file.status !== 'success') {
      toUploadFiles.value.splice(p.index, 1);
      // toUploadFiles.value = [...toUploadFiles.value];
      props.onWaitingUploadFilesChange?.({ files: [...toUploadFiles.value], trigger: 'remove' });
      if (p.file.raw || p.file.name) {
        const fileIndex = uploadValue.value.findIndex(
          (file) => (file.raw && file.raw === p.file.raw) || (file.name && file.name === p.file.name),
        );
        if (fileIndex !== -1) {
          uploadValue.value.splice(fileIndex, 1);
          setUploadValue([...uploadValue.value], changePrams);
        }
      }
    } else {
      uploadValue.value.splice(p.index, 1);
      setUploadValue([...uploadValue.value], changePrams);
    }
    props.onRemove?.(p);
  }

  const triggerUpload = () => {
    if (disabled.value) return;
    (inputRef.value as HTMLInputElement).click();
  };

  const cancelUpload = (context?: { file?: UploadFile; e?: MouseEvent }) => {
    xhrReq.value?.forEach((item) => {
      item.xhrReq?.abort();
    });
    uploading.value = false;

    if (autoUpload.value) {
      toUploadFiles.value = toUploadFiles.value.map((item) => ({ ...item, status: 'waiting' }));
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

    if (context?.file) {
      onRemove?.({ file: context.file, e: context.e, index: 0 });
    }
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
    inputRef,
    disabled,
    xhrReq,
    uploadFiles,
    onFileChange,
    onNormalFileChange,
    onDragFileChange,
    onRemove,
    triggerUpload,
    cancelUpload,
  };
}
