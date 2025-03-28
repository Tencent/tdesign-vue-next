import { defineComponent, PropType, toRefs, computed } from 'vue';
import {
  BrowseIcon as TdBrowseIcon,
  DeleteIcon as TdDeleteIcon,
  AddIcon as TdAddIcon,
  ErrorCircleFilledIcon as TdErrorCircleFilledIcon,
} from 'tdesign-icons-vue-next';
import Loading from '../../loading';
import useGlobalIcon from '../../hooks/useGlobalIcon';
import ImageViewer, { ImageViewerProps } from '../../image-viewer';
import { CommonDisplayFileProps } from '../types';
import { commonProps } from '../consts';
import { TdUploadProps, UploadFile } from '../type';
import { abridgeName } from '@tdesign/common-js/upload/utils';
import { UploadConfig } from '../../config-provider';
import { useTNodeJSX } from '../../hooks';
import Link from '../../link';
import Image from '../../image';

export interface ImageCardUploadProps extends CommonDisplayFileProps {
  multiple: TdUploadProps['multiple'];
  max: TdUploadProps['max'];
  disabled?: TdUploadProps['disabled'];
  showUploadProgress: TdUploadProps['showUploadProgress'];
  triggerUpload?: (e: MouseEvent) => void;
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
    showImageFileName: Boolean,
  },
  setup(props) {
    const { displayFiles, classPrefix, multiple, max } = toRefs(props);
    const locale = computed(() => props.locale as UploadConfig);
    const { BrowseIcon, DeleteIcon, AddIcon, ErrorCircleFilledIcon } = useGlobalIcon({
      AddIcon: TdAddIcon,
      BrowseIcon: TdBrowseIcon,
      DeleteIcon: TdDeleteIcon,
      ErrorCircleFilledIcon: TdErrorCircleFilledIcon,
    });

    const renderTNodeJSX = useTNodeJSX();

    const showTrigger = computed(() => {
      if (multiple.value) {
        return !max.value || displayFiles.value.length < max.value;
      }
      return !displayFiles.value?.[0];
    });

    const renderMainContent = (file: UploadFile, index: number) => {
      return (
        <div class={`${classPrefix.value}-upload__card-content ${classPrefix.value}-upload__card-box`}>
          <Image class={`${classPrefix.value}-upload__card-image`} src={file.url || file.raw} error="" fit="contain" />
          <div class={`${classPrefix.value}-upload__card-mask`}>
            <span class={`${classPrefix.value}-upload__card-mask-item`} onClick={(e) => e.stopPropagation()}>
              <ImageViewer
                images={displayFiles.value.map((t: UploadFile) => t.url || t.raw)}
                defaultIndex={index}
                trigger={(h, { open }) => {
                  return (
                    <BrowseIcon
                      onClick={({ e }: { e: MouseEvent }) => {
                        props.onPreview?.({ file, index, e });
                        open();
                      }}
                    />
                  );
                }}
                {...(props.imageViewerProps as ImageViewerProps)}
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

    const renderProgressFile = (file: UploadFile, loadCard: string) => {
      return (
        <div class={[loadCard, `${classPrefix.value}-upload__${props.theme}-${file.status}`]}>
          <Loading loading={true} size="medium" />
          <p>
            {locale.value?.progress?.uploadingText}
            {props.showUploadProgress ? ` ${file.percent}%` : ''}
          </p>
        </div>
      );
    };

    const renderFailFile = (file: UploadFile, index: number, loadCard: string) => {
      return (
        <div class={loadCard}>
          <ErrorCircleFilledIcon />
          <p>{file.response?.error || locale.value?.progress?.failText}</p>
          <div class={`${classPrefix.value}-upload__card-mask`}>
            <span class={`${classPrefix.value}-upload__card-mask-item`} onClick={(e) => e.stopPropagation()}>
              <DeleteIcon onClick={({ e }: { e: MouseEvent }) => props?.onRemove?.({ e, file, index })} />
            </span>
          </div>
        </div>
      );
    };

    return () => {
      // render custom UI with fileListDisplay
      const customList = renderTNodeJSX('fileListDisplay', {
        params: {
          triggerUpload: props.triggerUpload,
          uploadFiles: props.uploadFiles,
          cancelUpload: props.cancelUpload,
          onPreview: props.onPreview,
          onRemove: props.onRemove,
          toUploadFiles: props.toUploadFiles,
          sizeOverLimitMessage: props.sizeOverLimitMessage,
          locale: props.locale,
          files: displayFiles.value,
        },
      });
      if (customList) return customList;

      const cardItemClasses = `${classPrefix.value}-upload__card-item ${classPrefix.value}-is-background`;
      return (
        <div>
          <ul class={`${classPrefix.value}-upload__card`}>
            {displayFiles.value?.map((file: UploadFile, index: number) => {
              const fileNameClassName = `${classPrefix.value}-upload__card-name`;

              const loadCard = `${classPrefix.value}-upload__card-container ${classPrefix.value}-upload__card-box`;
              const fileName = props.abridgeName ? abridgeName(file.name, ...props.abridgeName) : file.name;
              return (
                <li class={cardItemClasses} key={index}>
                  {file.status === 'progress' && renderProgressFile(file, loadCard)}
                  {file.status === 'fail' && renderFailFile(file, index, loadCard)}
                  {!['progress', 'fail'].includes(file.status) && renderMainContent(file, index)}
                  {Boolean(fileName && props.showImageFileName) &&
                    (file.url ? (
                      <Link
                        href={file.url}
                        class={fileNameClassName}
                        target="_blank"
                        hover="color"
                        size="small"
                        disabled={false}
                      >
                        {fileName}
                      </Link>
                    ) : (
                      <span class={fileNameClassName}>{fileName}</span>
                    ))}
                </li>
              );
            })}

            {showTrigger.value && (
              <li class={cardItemClasses} onClick={props.triggerUpload}>
                <div
                  class={[
                    `${classPrefix.value}-upload__image-add`,
                    `${classPrefix.value}-upload__card-container`,
                    `${classPrefix.value}-upload__card-box`,
                    {
                      [`${classPrefix.value}-is-disabled`]: props.disabled,
                    },
                  ]}
                >
                  <AddIcon />
                  <p class={[`${classPrefix.value}-size-s`, `${classPrefix.value}-upload__add-text`]}>
                    {locale.value?.triggerUploadText?.image}
                  </p>
                </div>
              </li>
            )}
          </ul>
        </div>
      );
    };
  },
});
