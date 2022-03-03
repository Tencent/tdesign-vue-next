import { defineComponent, PropType, computed } from 'vue';

// components
import { AddIcon, DeleteIcon, BrowseIcon } from 'tdesign-icons-vue-next';
import TLoading from '../loading';

// utils
import CLASSNAMES from '../utils/classnames';
import { UploadFile } from './type';
import props from './props';
import { UploadRemoveOptions } from './interface';

// hooks
import { useFormDisabled } from '../form/hooks';
import { useConfig } from '../config-provider';

// props
const ImageProps = {
  files: props.files,
  loadingFile: {
    type: Object as PropType<UploadFile>,
    default: () => {
      return null as UploadFile;
    },
  },
  showUploadProgress: props.showUploadProgress,
  multiple: props.multiple,
  max: props.max,
  disabled: props.disabled,
  onClick: Function as PropType<(e: MouseEvent) => void>,
  onRemove: Function as PropType<(options: UploadRemoveOptions) => void>,
  onImgPreview: Function as PropType<(options: MouseEvent, file: UploadFile) => void>,
};

// props
export default defineComponent({
  name: 'TImageUpload',

  props: ImageProps,

  setup(props) {
    const disabled = useFormDisabled();
    const { classPrefix: prefix, global } = useConfig('upload');
    const UPLOAD_NAME = computed(() => {
      return `${prefix.value}-upload`;
    });

    const showTrigger = computed(() => {
      const { multiple, max, files } = props;
      if (multiple) {
        return !max || (files && files.length < max);
      }
      return !(files && files[0]);
    });

    const onMaskClick = (e: MouseEvent) => {
      !showTrigger.value && props.onClick(e);
    };

    const renderCardItem = (file: UploadFile, index: number) => (
      <li class={`${UPLOAD_NAME.value}__card-item ${prefix.value}-is--background`}>
        <div class={`${UPLOAD_NAME.value}__card-content ${UPLOAD_NAME.value}__card-box`}>
          <img class={`${UPLOAD_NAME.value}__card-image`} src={file.url} />
          <div class={`${UPLOAD_NAME.value}__card-mask`} onClick={onMaskClick}>
            <span class={`${UPLOAD_NAME.value}__card-mask-item`}>
              <BrowseIcon
                onClick={({ e }: { e: MouseEvent }) => {
                  e.stopPropagation();
                  props.onImgPreview(e, file);
                }}
              />
            </span>
            {!props.disabled && [
              <span class={`${UPLOAD_NAME.value}__card-mask-item-divider`} key="divider"></span>,
              <span class={`${UPLOAD_NAME.value}__card-mask-item`} key="delete-icon">
                <DeleteIcon
                  onClick={({ e }: { e: MouseEvent }) => {
                    e.stopPropagation();
                    props.onRemove({ e, file, index });
                  }}
                />
              </span>,
            ]}
          </div>
        </div>
      </li>
    );

    const renderTrigger = () => (
      <li
        class={[
          `${UPLOAD_NAME.value}__card-item ${prefix.value}-is--background`,
          { [CLASSNAMES.STATUS.disabled]: props.disabled },
        ]}
        onClick={props.onClick}
      >
        {props.showUploadProgress && props.loadingFile && props.loadingFile.status === 'progress' ? (
          <div class={`${UPLOAD_NAME.value}__card-container ${UPLOAD_NAME.value}__card-box`}>
            <TLoading />
            <p>
              {global.value.progress.uploadingText} {Math.min(props.loadingFile.percent, 99)}%
            </p>
          </div>
        ) : (
          <div class={`${UPLOAD_NAME.value}__card-container ${UPLOAD_NAME.value}__card-box`}>
            <AddIcon />
            <p class={`${prefix.value}-size-s`}>{global.value.triggerUploadText.image}</p>
          </div>
        )}
      </li>
    );

    return {
      prefix,
      UPLOAD_NAME,
      onMaskClick,
      showTrigger,
      disabled,
      renderCardItem,
      renderTrigger,
    };
  },

  render() {
    const { UPLOAD_NAME, renderTrigger, renderCardItem } = this;
    return (
      <ul class={`${UPLOAD_NAME}__card`}>
        {this.files && this.files.map((file, index) => renderCardItem(file, index))}
        {this.showTrigger && renderTrigger()}
      </ul>
    );
  },
});
