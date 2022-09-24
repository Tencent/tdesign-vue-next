import { computed, defineComponent } from 'vue';
import { UploadIcon } from 'tdesign-icons-vue-next';
import props from './props';
import NormalFile from './themes/normal-file';
import DraggerFile from './themes/dragger-file';
import ImageCard from './themes/image-card';
import MultipleFlowList from './themes/multiple-flow-list';
import useUpload from './hooks/useUpload';
import Button from '../button';
import { CommonDisplayFileProps, UploadProps } from './interface';
import { UploadDragEvents } from './hooks/useDrag';
import CustomFile from './themes/custom-file';
import { useContent } from '../hooks/tnode';

export default defineComponent({
  name: 'TUpload',

  props,

  setup(props: UploadProps, { slots, expose }) {
    const renderContent = useContent();
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
      inputRef,
      disabled,
      onInnerRemove,
      uploadFiles,
      onNormalFileChange,
      onDragFileChange,
      triggerUpload,
      cancelUpload,
    } = useUpload(props);

    expose({
      upload: inputRef.value,
      uploading,
      triggerUpload,
      uploadFiles,
      cancelUpload,
    });

    const renderTrigger = () => {
      const getDefaultTrigger = () => {
        if (props.theme === 'file-input') {
          return (
            <Button disabled={disabled.value} variant="outline" {...props.triggerButtonProps}>
              {triggerUploadText.value}
            </Button>
          );
        }
        return (
          <Button disabled={disabled.value} variant="outline" icon={() => <UploadIcon />} {...props.triggerButtonProps}>
            {triggerUploadText.value}
          </Button>
        );
      };
      return renderContent('default', 'trigger') || getDefaultTrigger();
    };

    const commonDisplayFileProps = computed<CommonDisplayFileProps>(() => ({
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
      locale: locale.value,
      autoUpload: props.autoUpload,
      abridgeName: props.abridgeName,
      fileListDisplay: props.fileListDisplay,
      onRemove: onInnerRemove,
    }));

    const dragProps: UploadDragEvents = {
      onDragFileChange,
      onDragenter: props.onDragenter,
      onDragleave: props.onDragleave,
      onDrop: props.onDrop,
    };

    const getNormalFileNode = () => (
      <NormalFile
        {...commonDisplayFileProps.value}
        multiple={props.multiple}
        v-slots={{ fileListDisplay: slots.fileListDisplay }}
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
      >
        <div class={`${classPrefix.value}-upload__trigger`} onClick={triggerUpload}>
          {renderTrigger()}
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
          dragContent: slots.dragContent,
          trigger: slots.trigger,
        }}
      >
        {renderTrigger()}
      </CustomFile>
    );

    return () => (
      <div class={`${classPrefix.value}-upload`}>
        <input
          ref={inputRef}
          type="file"
          disabled={disabled.value}
          onChange={onNormalFileChange}
          multiple={props.multiple}
          accept={props.accept}
          hidden
        />
        {['file', 'file-input'].includes(props.theme) && !props.draggable && getNormalFileNode()}
        {['file', 'image'].includes(props.theme) && props.draggable && getSingleFileDraggerUploadNode()}
        {props.theme === 'image' && !props.draggable && getImageCardUploadNode()}
        {['image-flow', 'file-flow'].includes(props.theme) && getFlowListNode()}
        {props.theme === 'custom' && getCustomFile()}

        {props.tips && (
          <small class={[tipsClasses, { [`${classPrefix.value}-upload__tips-${props.status}`]: props.status }]}>
            {props.tips}
          </small>
        )}
      </div>
    );
  },
});
