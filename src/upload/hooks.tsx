import { computed, ref, ComputedRef, Ref } from 'vue';
import findIndex from 'lodash/findIndex';

import {
  TdUploadProps,
  UploadFile,
  UploadRemoveOptions,
  FlowRemoveContext,
  HTMLInputEvent,
  UploadCtxType,
} from './interface';

import { useUpload } from './useUpload';

export const useComponentsStatus = (props: TdUploadProps, uploadCtx: UploadCtxType) => {
  const showUploadList = computed(() => {
    return props.multiple && ['file-flow', 'image-flow'].includes(props.theme);
  });

  // 默认文件上传风格：文件进行上传和上传成功后不显示 tips
  const showTips = computed(() => {
    if (props.theme === 'file') {
      const hasNoFile = (!uploadCtx.uploadValue || !uploadCtx.uploadValue.length) && !uploadCtx.loadingFile;
      return props.tips && hasNoFile;
    }
    return Boolean(props.tips);
  });

  const showErrorMsg = computed(() => {
    return !showUploadList.value && !!uploadCtx.errorMsg;
  });

  // 拖拽类单文件或图片上传
  const singleDraggable = computed(
    () => !props.multiple && props.draggable && ['file', 'file-input', 'image'].includes(props.theme),
  );

  return {
    showUploadList,
    showTips,
    showErrorMsg,
    singleDraggable,
  };
};

// 图片预览相关逻辑
export const useImgPreview = (props: TdUploadProps) => {
  const showImageViewUrl = ref('');
  const showImageViewDialog = ref(false);

  const handlePreviewImg = (event: MouseEvent, file?: UploadFile) => {
    if (!file || !file.url) throw new Error('Error file');
    showImageViewUrl.value = file.url;
    showImageViewDialog.value = true;
    const previewCtx = { file, e: event };
    props.onPreview?.(previewCtx);
  };

  // close image view dialog
  const cancelPreviewImgDialog = () => {
    showImageViewDialog.value = false;
    // Dialog 动画结束后，再清理图片
    let timer = setTimeout(() => {
      showImageViewUrl.value = null;
      clearTimeout(timer);
      timer = null;
    }, 500);
  };

  return {
    showImageViewUrl,
    showImageViewDialog,
    handlePreviewImg,
    cancelPreviewImgDialog,
  };
};

// 拖拽相关
export const useDragger = (props: TdUploadProps, disabled: ComputedRef<boolean>) => {
  const dragActive = ref(false);
  const handleDragenter = (e: DragEvent) => {
    if (disabled.value) return;
    dragActive.value = true;
    props.onDragenter?.({ e });
  };

  const handleDragleave = (e: DragEvent) => {
    if (disabled.value) return;
    dragActive.value = false;
    props.onDragleave?.({ e });
  };

  return {
    handleDragenter,
    handleDragleave,
    dragActive,
  };
};

// 删除相关
export const useRemove = (props: TdUploadProps, uploadCtx: UploadCtxType) => {
  const handleSingleRemove = (e: MouseEvent) => {
    const changeCtx = { trigger: 'remove' };
    if (uploadCtx.loadingFile) uploadCtx.loadingFile = null;
    uploadCtx.errorMsg = '';
    uploadCtx.setUploadValue([], changeCtx);
    props.onRemove?.({ e });
  };

  const handleFileInputRemove = (e: MouseEvent) => {
    // prevent trigger upload
    e?.stopPropagation();
    handleSingleRemove(e);
  };

  const handleMultipleRemove = (options: UploadRemoveOptions) => {
    const changeCtx = { trigger: 'remove', ...options };
    const files = uploadCtx.uploadValue.concat();
    files.splice(options.index, 1);
    uploadCtx.setUploadValue(files, changeCtx);
    props.onRemove?.(options);
  };

  const handleListRemove = (context: FlowRemoveContext) => {
    const { file } = context;
    const index = findIndex(uploadCtx.toUploadFiles, (o: any) => o.name === file.name);
    if (index >= 0) {
      uploadCtx.toUploadFiles.splice(index, 1);
    } else {
      const index = findIndex(uploadCtx.uploadValue, (o: any) => o.name === file.name);
      handleMultipleRemove({ e: context.e, index });
    }
  };

  return {
    handleFileInputRemove,
    handleSingleRemove,
    handleMultipleRemove,
    handleListRemove,
  };
};

// 组件动作
export const useActions = (props: TdUploadProps, uploadCtx: UploadCtxType, disabled: ComputedRef<boolean>) => {
  const { uploadFiles, upload, xhrReq } = useUpload(props, uploadCtx);
  const inputRef = ref(null);
  const handleChange = (event: HTMLInputEvent) => {
    const { files } = event.target;
    if (disabled.value) return;
    uploadFiles(files);

    (inputRef.value as HTMLInputElement).value = '';
  };

  const multipleUpload = (files: Array<UploadFile>) => {
    files.forEach((file) => {
      upload(file);
    });
  };

  const triggerUpload = () => {
    if (disabled.value) return;
    (inputRef.value as HTMLInputElement).click();
  };

  const cancelUpload = () => {
    if (uploadCtx.loadingFile) {
      // 如果存在自定义上传方法，则只需要抛出事件，而后由父组件处理取消上传
      if (props.requestMethod) {
        props.onCancelUpload?.();
      } else {
        xhrReq.value && xhrReq.value.abort();
        uploadCtx.toUploadFiles = [];
      }
      uploadCtx.loadingFile = null;
    }
    (inputRef.value as HTMLInputElement).value = '';
  };

  const handleDragChange = (files: FileList) => {
    if (disabled.value) return;
    uploadFiles(files);
  };
  return { handleChange, multipleUpload, triggerUpload, cancelUpload, handleDragChange, upload, inputRef };
};

export const useBatchUpload = (props: TdUploadProps, uploadCtx: UploadCtxType) => {
  const uploadInOneRequest = computed(() => {
    return props.multiple && props.uploadAllFilesInOneRequest;
  });
  const canBatchUpload = computed(() => {
    return uploadInOneRequest.value && props.isBatchUpload;
  });
};
