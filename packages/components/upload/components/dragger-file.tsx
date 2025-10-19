import { defineComponent, toRefs, PropType, ref, computed, h } from 'vue';
import {
  CheckCircleFilledIcon as TdCheckCircleFilledIcon,
  ErrorCircleFilledIcon as TdErrorCircleFilledIcon,
} from 'tdesign-icons-vue-next';
import { abridgeName, getFileSizeText } from '@tdesign/common-js/upload/utils';
import { TdUploadProps, UploadFile } from '../type';
import Button from '../../button';
import { CommonDisplayFileProps } from '../types';
import { commonProps } from '../consts';
import { useTNodeJSX, useGlobalIcon, useCommonClassName } from '@tdesign/shared-hooks';
import TLoading from '../../loading';
import useDrag, { UploadDragEvents } from '../hooks/useDrag';

import ImageViewer, { ImageViewerProps } from '../../image-viewer';

import { UploadConfig } from '../../config-provider';
import Image from '../../image';

export interface DraggerProps extends CommonDisplayFileProps {
  trigger?: TdUploadProps['trigger'];
  triggerUpload?: (e: MouseEvent) => void;
  uploadFiles?: (toFiles?: UploadFile[]) => void;
  cancelUpload?: (context: { e: MouseEvent; file: UploadFile }) => void;
  dragEvents: UploadDragEvents;
}

export default defineComponent({
  name: 'UploadDraggerFile',
  props: {
    ...commonProps,
    trigger: Function as PropType<DraggerProps['trigger']>,
    triggerUpload: Function as PropType<DraggerProps['triggerUpload']>,
    uploadFiles: Function as PropType<DraggerProps['uploadFiles']>,
    cancelUpload: Function as PropType<DraggerProps['cancelUpload']>,
    dragEvents: Object as PropType<DraggerProps['dragEvents']>,
  },
  setup(props, { slots }) {
    const { displayFiles, disabled, accept } = toRefs(props);
    const locale = computed(() => props.locale as UploadConfig);

    const renderTNodeJSX = useTNodeJSX();

    const { SIZE } = useCommonClassName();
    const uploadPrefix = `${props.classPrefix}-upload`;

    const drag = useDrag(props.dragEvents, accept);
    const { dragActive } = drag;

    const draggerFileRef = ref();

    const classes = computed(() => [
      `${uploadPrefix}__dragger`,
      { [`${uploadPrefix}__dragger-center`]: !displayFiles.value[0] },
      { [`${uploadPrefix}__dragger-error`]: displayFiles.value[0]?.status === 'fail' },
    ]);

    const { CheckCircleFilledIcon, ErrorCircleFilledIcon } = useGlobalIcon({
      CheckCircleFilledIcon: TdCheckCircleFilledIcon,
      ErrorCircleFilledIcon: TdErrorCircleFilledIcon,
    });

    const renderImage = () => {
      if (!props.displayFiles.length) return;
      const file = displayFiles.value[0];
      if (!file) return null;
      const url = file?.url || file?.response?.url;
      return (
        <div class={`${uploadPrefix}__dragger-img-wrap`}>
          <ImageViewer
            images={[url]}
            trigger={(h, { open }: any) => <Image src={url || file.raw} onClick={open} error="" loading="" />}
            {...(props.imageViewerProps as ImageViewerProps)}
          ></ImageViewer>
        </div>
      );
    };

    const renderUploading = () => {
      if (!props.displayFiles.length) return;
      const file = displayFiles.value[0];
      if (!file) return null;
      if (file?.status === 'progress') {
        return (
          <div class={`${uploadPrefix}__single-progress`}>
            <TLoading />
            {props.showUploadProgress && <span class={`${uploadPrefix}__single-percent`}>{file.percent}%</span>}
          </div>
        );
      }
    };

    const renderMainPreview = () => {
      const file = displayFiles.value[0];
      const fileName = props.abridgeName ? abridgeName(file.name, ...props.abridgeName) : file.name;

      const fileInfo = [
        <div class={`${uploadPrefix}__dragger-text`} key="info">
          <span class={`${uploadPrefix}__single-name`}>{fileName}</span>
          {file.status === 'progress' && renderUploading()}
          {file.status === 'success' && <CheckCircleFilledIcon />}
          {file.status === 'fail' && <ErrorCircleFilledIcon />}
        </div>,
        <small class={`${SIZE.value.small}`} key="size">
          {locale.value.file.fileSizeText}：{getFileSizeText(file.size)}
        </small>,
        <small class={`${SIZE.value.small}`} key="time">
          {locale.value.file.fileOperationDateText}：{file.uploadTime || '-'}
        </small>,
      ];
      return (
        <div class={`${uploadPrefix}__dragger-progress`}>
          {props.theme === 'image' && renderImage()}
          <div class={`${uploadPrefix}__dragger-progress-info`}>
            {renderTNodeJSX('fileListDisplay', { params: { files: props.displayFiles } }) || fileInfo}

            <div class={`${uploadPrefix}__dragger-btns`}>
              {['progress', 'waiting'].includes(file.status) && !disabled.value && (
                <Button
                  theme="primary"
                  variant="text"
                  class={`${uploadPrefix}__dragger-progress-cancel`}
                  onClick={(e: MouseEvent) =>
                    props.cancelUpload?.({
                      e,
                      file: props.toUploadFiles[0] || props.files[0],
                    })
                  }
                >
                  {locale.value?.cancelUploadText}
                </Button>
              )}
              {!props.autoUpload && file.status === 'waiting' && (
                <Button
                  theme="primary"
                  variant="text"
                  disabled={disabled.value}
                  onClick={() => props.uploadFiles?.()}
                  class={`${uploadPrefix}__dragger-upload-btn`}
                >
                  {locale.value.triggerUploadText.normal}
                </Button>
              )}
            </div>
            {['fail', 'success'].includes(file?.status) && !disabled.value && (
              <div class={`${uploadPrefix}__dragger-btns`}>
                <Button
                  theme="primary"
                  variant="text"
                  disabled={disabled.value}
                  class={`${uploadPrefix}__dragger-progress-cancel`}
                  onClick={props.triggerUpload}
                >
                  {locale.value.triggerUploadText.reupload}
                </Button>
                <Button
                  theme="danger"
                  variant="text"
                  disabled={disabled.value}
                  class={`${uploadPrefix}__dragger-delete-btn`}
                  onClick={(e: MouseEvent) => props.onRemove({ e, index: 0, file })}
                >
                  {locale.value.triggerUploadText.delete}
                </Button>
              </div>
            )}
          </div>
        </div>
      );
    };

    const renderDefaultDragElement = () => {
      const unActiveElement = (
        <div>
          <span class={`${uploadPrefix}--highlight`}>{locale.value.triggerUploadText?.normal}</span>
          <span>&nbsp;&nbsp;/&nbsp;&nbsp;{locale.value.dragger.draggingText}</span>
        </div>
      );
      const activeElement = <div>{locale.value.dragger.dragDropText}</div>;
      return dragActive.value ? activeElement : unActiveElement;
    };

    const hasActiveFile = computed(() => {
      const file = displayFiles.value[0];
      return !file || !(['progress', 'success', 'fail', 'waiting'].includes(file.status) || !file.status);
    });

    const getContent = () => {
      if (!hasActiveFile.value) {
        return renderMainPreview();
      }

      return <div class={`${uploadPrefix}__trigger`}>{slots.default?.() || renderDefaultDragElement()}</div>;
    };

    const handleDraggerClick = (e: MouseEvent) => {
      if (!hasActiveFile.value) {
        props.triggerUpload?.(e);
      }
    };

    return () => (
      <div
        ref={draggerFileRef}
        class={classes.value}
        onDrop={drag.handleDrop}
        onDragenter={drag.handleDragenter}
        onDragover={drag.handleDragover}
        onDragleave={drag.handleDragleave}
        onClick={handleDraggerClick}
      >
        {props.trigger?.(h, { files: displayFiles.value, dragActive: dragActive.value }) || getContent()}
      </div>
    );
  },
});
