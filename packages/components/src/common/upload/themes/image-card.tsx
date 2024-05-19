import type { PropType } from '@td/adapter-vue';
import { computed, defineComponent, toRefs } from '@td/adapter-vue';
import {
  AddIcon as TdAddIcon,
  BrowseIcon as TdBrowseIcon,
  DeleteIcon as TdDeleteIcon,
  ErrorCircleFilledIcon as TdErrorCircleFilledIcon,
} from 'tdesign-icons-vue-next';
import useGlobalIcon from '@td/adapter-hooks';
import { abridgeName } from '@td/shared/_common/js/upload/utils';
import { Loading } from '@td/component';
import type { ImageViewerProps } from '../../image-viewer';
import ImageViewer from '../../image-viewer';
import type { CommonDisplayFileProps } from '../interface';
import { commonProps } from '../constants';
import type { TdUploadProps, UploadFile } from '../type';
import type { UploadConfig } from '../../config-provider';
import { useTNodeJSX } from '@td/adapter-hooks';
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
          <Image class={`${classPrefix.value}-upload__card-image`} src={file.url || file.raw} error="" />
          <div class={`${classPrefix.value}-upload__card-mask`}>
            <span class={`${classPrefix.value}-upload__card-mask-item`} onClick={e => e.stopPropagation()}>
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
              >
              </ImageViewer>
            </span>
            {!props.disabled && (
              <>
                <span class={`${classPrefix.value}-upload__card-mask-item-divider`} />
                <span class={`${classPrefix.value}-upload__card-mask-item`} onClick={e => e.stopPropagation()}>
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
            <span class={`${classPrefix.value}-upload__card-mask-item`} onClick={e => e.stopPropagation()}>
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
      if (customList) {
        return customList;
      }

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
                  {Boolean(fileName && props.showImageFileName)
                  && (file.url
                    ? (
                      <Link href={file.url} class={fileNameClassName} target="_blank" hover="color" size="small">
                        {fileName}
                      </Link>
                      )
                    : (
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
