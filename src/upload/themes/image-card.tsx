import { defineComponent, PropType, toRefs, computed, reactive } from 'vue';
import { BrowseIcon as TdBrowseIcon, DeleteIcon as TdDeleteIcon, AddIcon as TdAddIcon } from 'tdesign-icons-vue-next';
import classNames from 'classnames';
import Loading from '../../loading';
import useGlobalIcon from '../../hooks/useGlobalIcon';
import ImageViewer from '../../image-viewer';
import { CommonDisplayFileProps, commonProps } from '../interface';
import { TdUploadProps, UploadFile } from '../type';

export interface ImageCardUploadProps extends CommonDisplayFileProps {
  multiple: TdUploadProps['multiple'];
  max: TdUploadProps['max'];
  disabled?: TdUploadProps['disabled'];
  showUploadProgress: TdUploadProps['showUploadProgress'];
  triggerUpload?: () => void;
  uploadFiles?: (toFiles?: UploadFile[]) => void;
  cancelUpload?: (context: { e: MouseEvent; file: UploadFile }) => void;
  onPreview?: TdUploadProps['onPreview'];
}

export default defineComponent({
  name: 'UploadImageCard',

  props: {
    ...commonProps,
    multiple: Boolean,
    max: Number,
    disabled: Boolean,
    showUploadProgress: Boolean,
    triggerUpload: Function as PropType<ImageCardUploadProps['triggerUpload']>,
    uploadFiles: Function as PropType<ImageCardUploadProps['uploadFiles']>,
    cancelUpload: Function as PropType<ImageCardUploadProps['cancelUpload']>,
    onPreview: Function as PropType<ImageCardUploadProps['onPreview']>,
  },

  setup(props: ImageCardUploadProps) {
    const { displayFiles, locale, classPrefix, multiple, max = 0 } = toRefs(props);
    const { BrowseIcon, DeleteIcon, AddIcon } = useGlobalIcon({
      AddIcon: TdAddIcon,
      BrowseIcon: TdBrowseIcon,
      DeleteIcon: TdDeleteIcon,
    });

    const visible = reactive({});

    const showTrigger = computed(() => {
      if (multiple) {
        return !max || displayFiles.value.length < max.value;
      }
      return !displayFiles.value?.[0];
    });

    const renderMainContent = (file: UploadFile, index: number) => {
      return (
        <div class={`${classPrefix.value}-upload__card-content ${classPrefix.value}-upload__card-box`}>
          <img class={`${classPrefix.value}-upload__card-image`} src={file.url} />
          <div class={`${classPrefix.value}-upload__card-mask`}>
            <span class={`${classPrefix.value}-upload__card-mask-item`} onClick={(e) => e.stopPropagation()}>
              <ImageViewer
                visible={visible[file.url] || false}
                onClose={() => (visible[file.url] = false)}
                images={displayFiles.value.map((t: UploadFile) => t.url)}
                defaultIndex={index}
                v-slots={{
                  trigger: () => (
                    <BrowseIcon
                      onClick={({ e }: { e: MouseEvent }) => {
                        props.onPreview?.({ file, index, e });
                        visible[file.url] = true;
                      }}
                    />
                  ),
                }}
              ></ImageViewer>
            </span>
            {!props.disabled && (
              <>
                <span class={`${classPrefix.value}-upload__card-mask-item-divider`} />
                <span class={`${classPrefix.value}-upload__card-mask-item`} onClick={(e) => e.stopPropagation()}>
                  <DeleteIcon onClick={({ e }: { e: MouseEvent }) => props?.onRemove?.({ e, file, index })} />
                </span>
              </>
            )}
          </div>
        </div>
      );
    };

    const cardItemClasses = `${classPrefix.value}-upload__card-item ${classPrefix.value}-is-background`;
    return () => (
      <div>
        <ul class={`${classPrefix.value}-upload__card`}>
          {displayFiles.value?.map((file: UploadFile, index: number) => {
            if (file.status === 'progress') {
              return (
                <li class={cardItemClasses} key={file.name + index}>
                  <div class={`${classPrefix.value}-upload__card-container ${classPrefix.value}-upload__card-box`}>
                    <Loading
                      loading={true}
                      size="medium"
                      text={
                        <p>
                          {locale.value?.progress?.uploadingText}
                          {props.showUploadProgress ? `${file.percent}%` : ''}
                        </p>
                      }
                    />
                  </div>
                </li>
              );
            }
            return (
              <li class={cardItemClasses} key={file.name + index}>
                {renderMainContent(file, index)}
              </li>
            );
          })}
          {showTrigger.value && (
            <li class={cardItemClasses} onClick={props.triggerUpload}>
              <div class={`${classPrefix.value}-upload__card-container ${classPrefix.value}-upload__card-box`}>
                <AddIcon />
                <p class={`${classPrefix.value}-size-s`}>{locale.value?.triggerUploadText?.image}</p>
              </div>
            </li>
          )}
        </ul>

        {props.tips && <small class={classNames(props.tipsClasses)}>{props.tips}</small>}
      </div>
    );
  },
});
