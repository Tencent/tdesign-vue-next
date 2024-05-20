import { computed, defineComponent } from '@td/adapter-vue';
import { UploadIcon } from 'tdesign-icons-vue-next';
import props from '@td/intel/upload/props';
import { useContent, useDisabled, useTNodeJSX } from '@td/adapter-hooks';
import Button from '../button';
import NormalFile from './themes/normal-file';
import DraggerFile from './themes/dragger-file';
import ImageCard from './themes/image-card';
import MultipleFlowList from './themes/multiple-flow-list';
import useUpload from './hooks/useUpload';
import type { CommonDisplayFileProps, UploadProps } from './interface';
import type { UploadDragEvents } from './hooks/useDrag';
import CustomFile from './themes/custom-file';

export default defineComponent({
  name: 'TUpload',

  props,

  setup(props: UploadProps, { slots, expose }) {
    const renderContent = useContent();
    const renderTNodeJSX = useTNodeJSX();
    const {
      locale,
      classPrefix,
      triggerUploadText,
      toUploadFiles,
      displayFiles,
      uploadValue,
      sizeOverLimitMessage,
      uploading,
      tipsClasses,
      errorClasses,
      placeholderClass,
      inputRef,
      onInnerRemove,
      uploadFiles,
      onNormalFileChange,
      onDragFileChange,
      onPasteFileChange,
      triggerUpload,
      cancelUpload,
      uploadFilePercent,
    } = useUpload(props);
    const disabled = useDisabled();

    const triggerUploadButtonText = computed(
      () => props.triggerButtonProps?.default || props.triggerButtonProps?.content || triggerUploadText.value,
    );

    expose({
      upload: inputRef.value,
      uploading,
      triggerUpload,
      uploadFiles,
      cancelUpload,
      uploadFilePercent,
    });

    const renderTrigger = () => {
      const getDefaultTrigger = () => {
        if (props.theme === 'file-input') {
          return (
            <Button disabled={disabled.value} variant="outline" {...props.triggerButtonProps}>
              {triggerUploadButtonText.value}
            </Button>
          );
        }
        return (
          <Button disabled={disabled.value} variant="outline" icon={() => <UploadIcon />} {...props.triggerButtonProps}>
            {triggerUploadButtonText.value}
          </Button>
        );
      };
      return (
        renderContent('default', 'trigger', {
          params: { dragActive: false, files: uploadValue.value },
        }) || getDefaultTrigger()
      );
    };

    const commonDisplayFileProps = computed<CommonDisplayFileProps>(() => ({
      accept: props.accept,
      files: uploadValue.value,
      toUploadFiles: toUploadFiles.value,
      displayFiles: displayFiles.value,
      theme: props.theme,
      placeholder: props.placeholder,
      disabled: disabled.value,
      tips: props.tips,
      status: props.status,
      sizeOverLimitMessage: sizeOverLimitMessage.value,
      uploading: uploading.value,
      classPrefix: classPrefix.value,
      tipsClasses,
      errorClasses,
      placeholderClass,
      locale: locale.value,
      autoUpload: props.autoUpload,
      abridgeName: props.abridgeName,
      showUploadProgress: props.showUploadProgress,
      fileListDisplay: props.fileListDisplay,
      onRemove: onInnerRemove,
      uploadPastedFiles: props.uploadPastedFiles,
      onPasteFileChange,
      imageViewerProps: props.imageViewerProps,
    }));

    const dragProps: UploadDragEvents = {
      onDragFileChange,
      onDragenter: props.onDragenter,
      onDragleave: props.onDragleave,
      onDrop: props.onDrop,
    };

    const uploadClasses = computed(() => [
      `${classPrefix.value}-upload`,
      {
        [`${classPrefix.value}-upload--theme-${props.theme}`]: props.theme === 'file-input',
      },
    ]);

    const getNormalFileNode = () => (
      <NormalFile
        {...commonDisplayFileProps.value}
        multiple={props.multiple}
        v-slots={{
          'fileListDisplay': slots.fileListDisplay,
          'file-list-display': slots['file-list-display'],
        }}
      >
        <div class={`${classPrefix.value}-upload__trigger`} onClick={triggerUpload}>
          {renderTrigger()}
        </div>
      </NormalFile>
    );

    const getSingleFileDraggerUploadNode = () => (
      <DraggerFile
        {...commonDisplayFileProps.value}
        dragEvents={dragProps}
        trigger={props.trigger}
        cancelUpload={cancelUpload}
        triggerUpload={triggerUpload}
        uploadFiles={uploadFiles}
        onCancelUpload={props.onCancelUpload}
        v-slots={{
          'fileListDisplay': slots.fileListDisplay,
          'file-list-display': slots['file-list-display'],
        }}
      />
    );

    const getImageCardUploadNode = () => (
      <ImageCard
        {...commonDisplayFileProps.value}
        multiple={props.multiple}
        max={props.max}
        showUploadProgress={props.showUploadProgress}
        triggerUpload={triggerUpload}
        uploadFiles={uploadFiles}
        cancelUpload={cancelUpload}
        onPreview={props.onPreview}
        showImageFileName={props.showImageFileName}
        v-slots={{
          'fileListDisplay': slots.fileListDisplay,
          'file-list-display': slots['file-list-display'],
        }}
      />
    );

    const getFlowListNode = () => (
      <MultipleFlowList
        {...commonDisplayFileProps.value}
        isBatchUpload={props.isBatchUpload}
        draggable={props.draggable}
        dragEvents={dragProps}
        uploadFiles={uploadFiles}
        cancelUpload={cancelUpload}
        onPreview={props.onPreview}
        showImageFileName={props.showImageFileName}
        showThumbnail={props.showThumbnail}
        uploadButton={props.uploadButton}
        cancelUploadButton={props.cancelUploadButton}
        v-slots={{
          'fileListDisplay': slots.fileListDisplay,
          'file-list-display': slots['file-list-display'],
          'uploadButton': slots.uploadButton,
          'upload-button': slots['upload-button'],
          'cancelUploadButton': slots.cancelUploadButton,
          'cancel-upload-button': slots['cancel-upload-button'],
        }}
      >
        <div class={`${classPrefix.value}-upload__trigger`} onClick={triggerUpload}>
          {!props.draggable && renderTrigger()}
        </div>
      </MultipleFlowList>
    );

    const getCustomFile = () => (
      <CustomFile
        {...commonDisplayFileProps.value}
        draggable={props.draggable}
        dragContent={props.dragContent}
        dragEvents={dragProps}
        triggerUpload={triggerUpload}
        trigger={props.trigger}
        childrenNode={slots.default}
        v-slots={{
          'dragContent': slots.dragContent,
          'drag-content': slots['drag-content'],
          'trigger': slots.trigger,
        }}
      >
        {renderTrigger()}
      </CustomFile>
    );

    return () => (
      <div class={uploadClasses.value} onPaste={props.uploadPastedFiles ? onPasteFileChange : undefined}>
        <input
          ref={inputRef}
          type="file"
          disabled={disabled.value}
          onChange={onNormalFileChange}
          multiple={props.multiple}
          accept={props.accept}
          hidden
          {...(props.inputAttributes ? { ...props.inputAttributes } : {})}
        />
        {['file', 'file-input'].includes(props.theme) && !props.draggable && getNormalFileNode()}
        {['file', 'image'].includes(props.theme) && props.draggable && getSingleFileDraggerUploadNode()}
        {props.theme === 'image' && !props.draggable && getImageCardUploadNode()}
        {['image-flow', 'file-flow'].includes(props.theme) && getFlowListNode()}
        {props.theme === 'custom' && getCustomFile()}

        {Boolean(props.tips || slots.tips) && (
          <small class={[tipsClasses, { [`${classPrefix.value}-upload__tips-${props.status}`]: props.status }]}>
            {renderTNodeJSX('tips')}
          </small>
        )}
        {sizeOverLimitMessage.value && <small class={errorClasses}>{sizeOverLimitMessage.value}</small>}
      </div>
    );
  },
});
