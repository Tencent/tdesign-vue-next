import { defineComponent, PropType, computed } from 'vue';

import { AddIcon, DeleteIcon, BrowseIcon } from 'tdesign-icons-vue-next';
import TLoading from '../loading';

import { UploadFile } from './type';
import props from './props';
import { UploadRemoveOptions } from './interface';

import { useFormDisabled } from '../form/hooks';
import { useConfig, usePrefixClass, useCommonClassName } from '../hooks/useConfig';

// props
export default defineComponent({
  name: 'TImageUpload',

  props: {
    files: props.files,
    loadingFile: {
      type: Object as PropType<UploadFile>,
      default: () => {
        return null as UploadFile;
      },
    },
    showUploadProgress: props.showUploadProgress,
    placeholder: props.placeholder,
    multiple: props.multiple,
    max: props.max,
    disabled: props.disabled,
    onClick: Function as PropType<(e: MouseEvent) => void>,
    onRemove: Function as PropType<(options: UploadRemoveOptions) => void>,
    onImgPreview: Function as PropType<(options: MouseEvent, file: UploadFile) => void>,
  },

  setup(props) {
    const disabled = useFormDisabled();
    const { classPrefix: prefix, global } = useConfig('upload');
    const UPLOAD_NAME = usePrefixClass('upload');
    const { STATUS } = useCommonClassName();

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
            {!disabled.value && [
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
          { [STATUS.value.disabled]: disabled.value },
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
            <p class={`${prefix.value}-size-s`}>{props.placeholder || global.value.triggerUploadText.image}</p>
          </div>
        )}
      </li>
    );

    return () => (
      <ul class={`${UPLOAD_NAME.value}__card`}>
        {props.files && props.files.map((file, index) => renderCardItem(file, index))}
        {showTrigger.value && renderTrigger()}
      </ul>
    );
  },
});
