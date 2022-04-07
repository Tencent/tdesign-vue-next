import { defineComponent, PropType, computed, ref } from 'vue';
import { CheckCircleFilledIcon, ErrorCircleFilledIcon } from 'tdesign-icons-vue-next';
import TButton from '../button';
import TLoading from '../loading';

import { UploadFile } from './type';
import props from './props';
import { returnFileSize, getCurrentDate, abridgeName } from './util';

import { useTNodeJSX } from '../hooks/tnode';
import { useConfig, usePrefixClass, useCommonClassName } from '../hooks/useConfig';

export default defineComponent({
  name: 'TUploadDragger',

  props: {
    file: {
      type: Object as PropType<UploadFile>,
      default: () => {
        return null as UploadFile;
      },
    },
    loadingFile: {
      type: Object as PropType<UploadFile>,
      default: () => {
        return null as UploadFile;
      },
    },
    autoUpload: props.autoUpload,
    theme: props.theme,
    onCancel: Function as PropType<(e: MouseEvent) => void>,
    onClick: Function as PropType<(e: MouseEvent) => void>,
    onRemove: Function as PropType<(e: MouseEvent) => void>,
    onUpload: Function as PropType<(file: UploadFile, e: MouseEvent) => void>,
    onChange: Function as PropType<(files: FileList) => void>,
    onDragleave: Function as PropType<(e: DragEvent) => void>,
    onDragenter: Function as PropType<(e: DragEvent) => void>,
  },

  setup(props) {
    const renderTNodeJSX = useTNodeJSX();
    const target = ref(null);
    const dragActive = ref(false);
    const { global } = useConfig('upload');
    const UPLOAD_NAME = usePrefixClass('upload');
    const { SIZE } = useCommonClassName();

    // status
    const imageUrl = computed(() => {
      return (props.loadingFile && props.loadingFile.url) || (props.file && props.file.url);
    });
    const inputName = computed(() => {
      return (props.loadingFile && props.loadingFile.name) || (props.file && props.file.name) || '';
    });
    const classes = computed(() => [
      `${UPLOAD_NAME.value}__dragger`,
      { [`${UPLOAD_NAME.value}__dragger-center`]: !props.loadingFile && !props.file },
      { [`${UPLOAD_NAME.value}__dragger-error`]: props.loadingFile && props.loadingFile.status === 'fail' },
    ]);
    const size = computed(() => (props.loadingFile && props.loadingFile.size) || (props.file && props.file.size));
    const showResultOperate = computed(
      () => Boolean(!props.loadingFile && props.file?.name) || ['success', 'fail'].includes(props.loadingFile?.status),
    );

    // methods
    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      props.onChange?.(event.dataTransfer.files);
      props.onDragleave?.(event);
      dragActive.value = false;
    };
    const handleDragenter = (event: DragEvent) => {
      event.preventDefault();
      target.value = event.target;
      props.onDragenter?.(event);
      dragActive.value = true;
    };
    const handleDragleave = (event: DragEvent) => {
      if (target.value !== event.target) return;
      event.preventDefault();
      props.onDragleave?.(event);
      dragActive.value = false;
    };

    // render functions
    const renderImage = () => (
      <div class={`${UPLOAD_NAME.value}__dragger-img-wrap`}>{imageUrl.value && <img src={imageUrl.value} />}</div>
    );
    const renderUploading = () => {
      if (props.loadingFile.status === 'fail') return <ErrorCircleFilledIcon />;
      if (props.loadingFile.status === 'progress') {
        return (
          <div class={`${UPLOAD_NAME.value}__single-progress`}>
            <TLoading />
            <span class={`${UPLOAD_NAME.value}__single-percent`}>{Math.min(props.loadingFile.percent, 99)}%</span>
          </div>
        );
      }
    };
    const renderProgress = () => (
      <div class={`${UPLOAD_NAME.value}__dragger-progress`}>
        {props.theme === 'image' && renderImage()}
        <div class={`${UPLOAD_NAME.value}__dragger-progress-info`}>
          <div class={`${UPLOAD_NAME.value}__dragger-text`}>
            <span class={`${UPLOAD_NAME.value}__single-name`}>{abridgeName(inputName.value)}</span>
            {props.loadingFile && renderUploading()}
            {!props.loadingFile && !!props.file && <CheckCircleFilledIcon />}
          </div>
          <small class={`${SIZE.value.small}`}>
            {global.value.file.fileSizeText}：{returnFileSize(size.value)}
          </small>
          <small class={`${SIZE.value.small}`}>
            {global.value.file.fileOperationDateText}：{getCurrentDate()}
          </small>
          <div class={`${UPLOAD_NAME.value}__dragger-btns`}>
            {['progress', 'waiting'].includes(props.loadingFile?.status) && (
              <TButton
                theme="primary"
                variant="text"
                class={`${UPLOAD_NAME.value}__dragger-progress-cancel`}
                onClick={props.onCancel}
              >
                {global.value.cancelUploadText}
              </TButton>
            )}
            {!props.autoUpload && props.loadingFile?.status === 'waiting' && (
              <TButton
                variant="text"
                theme="primary"
                onClick={(e: MouseEvent) => props.onUpload({ ...props.loadingFile }, e)}
              >
                {global.value.triggerUploadText.normal}
              </TButton>
            )}
          </div>
          {showResultOperate.value && (
            <div class={`${UPLOAD_NAME.value}__dragger-btns`}>
              <TButton
                theme="primary"
                variant="text"
                class={`${UPLOAD_NAME.value}__dragger-progress-cancel`}
                onClick={(e: MouseEvent) => {
                  props.onRemove(e);
                  props.onClick(e);
                }}
              >
                {global.value.triggerUploadText.reupload}
              </TButton>
              <TButton theme="danger" variant="text" onClick={props.onRemove}>
                {global.value.triggerUploadText.delete}
              </TButton>
            </div>
          )}
        </div>
      </div>
    );

    const renderDefaultDragElement = () => {
      const unActiveElement = (
        <div>
          <span class={`${UPLOAD_NAME.value}--highlight`}>{global.value.triggerUploadText.normal}</span>
          <span>&nbsp;&nbsp;/&nbsp;&nbsp;{global.value.dragger.draggingText}</span>
        </div>
      );
      const activeElement = <div>{global.value.dragger.dragDropText}</div>;
      return dragActive.value ? activeElement : unActiveElement;
    };

    return () => {
      let content = null;
      if ((props.loadingFile || props.file) && props.theme !== 'custom') {
        content = renderProgress();
      } else {
        content = (
          <div class={`${UPLOAD_NAME.value}__trigger`} onClick={props.onClick}>
            {renderTNodeJSX('default') || renderDefaultDragElement()}
          </div>
        );
      }
      return (
        <div
          class={classes.value}
          onDrop={handleDrop}
          onDragenter={handleDragenter}
          onDragleave={handleDragleave}
          onDragover={(event: DragEvent) => {
            event.preventDefault();
          }}
        >
          {content}
        </div>
      );
    };
  },
});
