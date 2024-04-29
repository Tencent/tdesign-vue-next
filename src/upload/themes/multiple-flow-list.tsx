import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import {
  BrowseIcon as TdBrowseIcon,
  DeleteIcon as TdDeleteIcon,
  CheckCircleFilledIcon as TdCheckCircleFilledIcon,
  ErrorCircleFilledIcon as TdErrorCircleFilledIcon,
  TimeFilledIcon as TdTimeFilledIcon,
  FileExcelIcon,
  FilePdfIcon,
  FileWordIcon,
  FilePowerpointIcon,
  FileIcon,
  VideoIcon,
} from 'tdesign-icons-vue-next';
import { computed, defineComponent, toRefs, PropType, ref } from 'vue';

import {
  abridgeName,
  returnFileSize,
  IMAGE_REGEXP,
  FILE_PDF_REGEXP,
  FILE_EXCEL_REGEXP,
  FILE_WORD_REGEXP,
  FILE_PPT_REGEXP,
  VIDEO_REGEXP,
} from '../../_common/js/upload/utils';
import TButton from '../../button';
import { UploadConfig } from '../../config-provider';
import { useTNodeJSX } from '../../hooks';
import useGlobalIcon from '../../hooks/useGlobalIcon';
import Image from '../../image';
import ImageViewer, { ImageViewerProps } from '../../image-viewer';
import Link from '../../link';
import TLoading from '../../loading';
import { commonProps } from '../constants';
import useDrag, { UploadDragEvents } from '../hooks/useDrag';
import { CommonDisplayFileProps } from '../interface';
import { UploadFile, TdUploadProps } from '../type';

export interface ImageFlowListProps extends CommonDisplayFileProps {
  uploadFiles?: (toFiles?: UploadFile[]) => void;
  cancelUpload?: (context: { e: MouseEvent; file?: UploadFile }) => void;
  dragEvents: UploadDragEvents;
  disabled?: boolean;
  isBatchUpload?: boolean;
  draggable?: boolean;
  onPreview?: TdUploadProps['onPreview'];
  uploadButton?: TdUploadProps['uploadButton'];
  cancelUploadButton?: TdUploadProps['cancelUploadButton'];
}

export default defineComponent({
  name: 'UploadMultipleFlowList',

  props: {
    ...commonProps,
    showThumbnail: Boolean,
    uploadFiles: Function as PropType<ImageFlowListProps['uploadFiles']>,
    cancelUpload: Function as PropType<ImageFlowListProps['cancelUpload']>,
    dragEvents: Object as PropType<ImageFlowListProps['dragEvents']>,
    disabled: Boolean,
    isBatchUpload: Boolean,
    draggable: Boolean,
    showImageFileName: Boolean,
    uploadButton: Object as PropType<ImageFlowListProps['uploadButton']>,
    cancelUploadButton: Object as PropType<ImageFlowListProps['cancelUploadButton']>,
    onPreview: Function as PropType<ImageFlowListProps['onPreview']>,
  },

  setup(props, { slots }) {
    // locale 已经在 useUpload 中统一处理优先级
    const { uploading, disabled, displayFiles, classPrefix, accept } = toRefs(props);
    const uploadPrefix = computed(() => `${classPrefix.value}-upload`);

    const locale = computed(() => props.locale as UploadConfig);

    const renderTNodeJSX = useTNodeJSX();

    const { BrowseIcon, DeleteIcon, CheckCircleFilledIcon, ErrorCircleFilledIcon, TimeFilledIcon } = useGlobalIcon({
      BrowseIcon: TdBrowseIcon,
      DeleteIcon: TdDeleteIcon,
      CheckCircleFilledIcon: TdCheckCircleFilledIcon,
      ErrorCircleFilledIcon: TdErrorCircleFilledIcon,
      TimeFilledIcon: TdTimeFilledIcon,
    });

    const drag = useDrag(props.dragEvents, accept);

    const currentPreviewFile = ref<UploadFile[]>([]);
    const previewIndex = ref(0);

    const uploadText = computed(() => {
      if (uploading.value) return `${locale.value.progress.uploadingText}`;
      return locale.value.triggerUploadText.normal;
    });

    const innerDragEvents = computed(() => {
      const draggable = props.draggable === undefined ? true : props.draggable;
      return draggable
        ? {
            onDrop: drag.handleDrop,
            onDragenter: drag.handleDragenter,
            onDragover: drag.handleDragover,
            onDragleave: drag.handleDragleave,
          }
        : {};
    });

    const getStatusMap = () => {
      const iconMap = {
        success: <CheckCircleFilledIcon />,
        fail: <ErrorCircleFilledIcon />,
        progress: <TLoading />,
        waiting: <TimeFilledIcon />,
      };
      const { progress } = locale.value;
      const textMap = {
        success: progress?.successText,
        fail: progress?.failText,
        progress: progress?.uploadingText,
        waiting: progress?.waitingText,
      };
      return {
        iconMap,
        textMap,
      };
    };

    const renderEmpty = () => (
      <div class={`${uploadPrefix.value}__flow-empty`}>
        {drag.dragActive.value ? locale.value.dragger.dragDropText : locale.value.dragger.clickAndDragText}
      </div>
    );

    const renderImgItem = (file: UploadFile, index: number) => {
      const { iconMap, textMap } = getStatusMap();
      const fileName = props.abridgeName && file.name ? abridgeName(file.name, ...props.abridgeName) : file.name;
      return (
        <li class={`${uploadPrefix.value}__card-item`} key={file.name + index + file.percent + file.status || '0'}>
          <div
            class={[
              `${uploadPrefix.value}__card-content`,
              { [`${classPrefix.value}-is-bordered`]: file.status !== 'waiting' },
            ]}
          >
            {['fail', 'progress'].includes(file.status) && (
              <div
                class={`${uploadPrefix.value}__card-status-wrap ${uploadPrefix.value}__${props.theme}-${file.status}`}
              >
                {iconMap[file.status as 'fail' | 'progress']}
                <p>
                  {textMap[file.status as 'fail' | 'progress']}
                  {props.showUploadProgress && file.status === 'progress' ? ` ${file.percent}%` : ''}
                </p>
              </div>
            )}
            {(['waiting', 'success'].includes(file.status) || (!file.status && file.url)) && (
              <Image class={`${uploadPrefix.value}__card-image`} src={file.url || file.raw} error="" loading="" />
            )}
            <div class={`${uploadPrefix.value}__card-mask`}>
              {(file.url || file.raw) && !['progress', 'fail'].includes(file.status) && (
                <span class={`${uploadPrefix.value}__card-mask-item`}>
                  <BrowseIcon
                    onClick={({ e }: { e: MouseEvent }) => {
                      previewIndex.value = index;
                      currentPreviewFile.value = displayFiles.value;
                      props.onPreview?.({ file, index, e });
                    }}
                  />
                  <span class={`${uploadPrefix.value}__card-mask-item-divider`}></span>
                </span>
              )}
              {!disabled.value && (
                <span
                  class={`${uploadPrefix.value}__card-mask-item ${uploadPrefix.value}__delete`}
                  onClick={(e: MouseEvent) => props.onRemove({ e, index, file })}
                >
                  <DeleteIcon />
                </span>
              )}
            </div>
          </div>
          {props.showImageFileName && (
            <p class={[`${uploadPrefix.value}__card-name`, `${uploadPrefix.value}__flow-status`]}>
              {['success', 'waiting'].includes(file.status) && iconMap[file.status]}
              {fileName}
            </p>
          )}
        </li>
      );
    };

    const renderStatus = (file: UploadFile) => {
      const { iconMap, textMap } = getStatusMap();
      return (
        <div class={`${uploadPrefix.value}__flow-status`}>
          {iconMap[file.status]}
          <span class={`${uploadPrefix.value}__${props.theme}-${file.status}`}>
            {file.response?.error ? file.response?.error || textMap[file.status] : textMap[file.status]}
            {props.showUploadProgress && file.status === 'progress' ? ` ${file.percent || 0}%` : ''}
          </span>
        </div>
      );
    };

    const renderNormalActionCol = (file: UploadFile, index: number) => (
      <td>
        <TButton
          theme="primary"
          variant="text"
          content={locale.value?.triggerUploadText?.delete}
          class={`${uploadPrefix.value}__delete`}
          onClick={(e: MouseEvent) => props.onRemove({ e, index, file })}
        ></TButton>
      </td>
    );

    // batchUpload action col
    const renderBatchActionCol = (index: number) =>
      // 第一行数据才需要合并单元格
      index === 0 ? (
        <td rowSpan={displayFiles.value.length} class={`${uploadPrefix.value}__flow-table__batch-row`}>
          <TButton
            theme="primary"
            variant="text"
            content={locale.value?.triggerUploadText?.delete}
            class={`${uploadPrefix.value}__delete`}
            onClick={(e: MouseEvent) => props.onRemove({ e, index: -1, file: undefined })}
          ></TButton>
        </td>
      ) : null;

    const getFileThumbnailIcon = (fileType: string) => {
      if (FILE_PDF_REGEXP.test(fileType)) {
        return <FilePdfIcon />;
      }
      if (FILE_EXCEL_REGEXP.test(fileType)) {
        return <FileExcelIcon />;
      }
      if (FILE_WORD_REGEXP.test(fileType)) {
        return <FileWordIcon />;
      }
      if (FILE_PPT_REGEXP.test(fileType)) {
        return <FilePowerpointIcon />;
      }
      if (VIDEO_REGEXP.test(fileType)) {
        return <VideoIcon />;
      }
      return <FileIcon />;
    };

    const renderFileThumbnail = (file: UploadFile) => {
      if (!file || (!file.raw && file.url)) return null;
      const fileType = file.raw.type;
      const className = `${uploadPrefix.value}__file-thumbnail`;
      if (IMAGE_REGEXP.test(fileType)) {
        return (
          <Image
            class={className}
            src={file.url || file.raw}
            fit="scale-down"
            error=""
            loading=""
            onClick={(e: MouseEvent) => {
              e.preventDefault();
              currentPreviewFile.value = [file];
              previewIndex.value = 0;
              props.onPreview?.({ file, index: 0, e });
            }}
          />
        );
      }
      return <div class={className}>{getFileThumbnailIcon(fileType)}</div>;
    };

    const renderFileList = () => {
      const customList = renderTNodeJSX('fileListDisplay', {
        params: {
          cancelUpload: props.cancelUpload,
          uploadFiles: props.uploadFiles,
          onPreview: props.onPreview,
          onRemove: props.onRemove,
          toUploadFiles: props.toUploadFiles,
          sizeOverLimitMessage: props.sizeOverLimitMessage,
          locale: props.locale,
          files: props.displayFiles,
          dragEvents: innerDragEvents.value,
        },
      });
      if (customList || props.fileListDisplay) return customList;
      return (
        <table class={`${uploadPrefix.value}__flow-table`} {...innerDragEvents.value}>
          <thead>
            <tr>
              <th>{locale.value.file?.fileNameText}</th>
              <th style={{ minWidth: '120px' }}>{locale.value.file?.fileSizeText}</th>
              <th style={{ minWidth: '120px' }}>{locale.value.file?.fileStatusText}</th>
              {disabled.value ? null : <th>{locale.value.file?.fileOperationText}</th>}
            </tr>
          </thead>
          <tbody>
            {!displayFiles.value.length && (
              <tr>
                <td colSpan={4}>{renderEmpty()}</td>
              </tr>
            )}
            {displayFiles.value.map((file, index) => {
              // 合并操作出现条件为：当前为合并上传模式且列表内没有待上传文件
              const showBatchUploadAction = props.isBatchUpload;
              const deleteNode =
                showBatchUploadAction && displayFiles.value.every((item) => item.status === 'success' || !item.status)
                  ? renderBatchActionCol(index)
                  : renderNormalActionCol(file, index);
              const fileName = props.abridgeName?.length ? abridgeName(file.name, ...props.abridgeName) : file.name;
              const thumbnailNode = props.showThumbnail ? (
                <div class={`${uploadPrefix.value}__file-info`}>
                  {renderFileThumbnail(file)}
                  {fileName}
                </div>
              ) : (
                fileName
              );
              const fileNameNode = file.url ? (
                <Link href={file.url} target="_blank" hover="color">
                  {thumbnailNode}
                </Link>
              ) : (
                thumbnailNode
              );
              return (
                <tr key={file.name + index + file.size}>
                  <td class={`${uploadPrefix.value}__file-name`} key={file.name + file.url}>
                    {fileNameNode}
                  </td>
                  <td>{returnFileSize(file.size)}</td>
                  <td>{renderStatus(file)}</td>
                  {disabled.value ? null : deleteNode}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    };

    const renderImageList = () => {
      const customList = renderTNodeJSX('fileListDisplay', {
        params: {
          cancelUpload: props.cancelUpload,
          uploadFiles: props.uploadFiles,
          onRemove: props.onRemove,
          onPreview: props.onPreview,
          toUploadFiles: props.toUploadFiles,
          sizeOverLimitMessage: props.sizeOverLimitMessage,
          locale: props.locale,
          files: props.displayFiles,
          dragEvents: innerDragEvents.value,
        },
      });
      if (customList || props.fileListDisplay) return customList;
      return (
        <ul class={`${uploadPrefix.value}__card clearfix`}>
          {props.displayFiles.map((file, index) => renderImgItem(file, index))}
        </ul>
      );
    };

    return () => {
      const cardClassName = `${uploadPrefix.value}__flow-card-area`;
      const cancelUploadDisabled = disabled.value || !uploading.value;
      const hasCancelUploadTNode = slots.uploadButton || isFunction(props.uploadButton);
      const uploadButtonDisabled = Boolean(disabled.value || uploading.value || !displayFiles.value.length);
      const hasUploadButtonTNode = slots.cancelUploadButton || isFunction(props.cancelUploadButton);
      return (
        <div class={`${uploadPrefix.value}__flow ${uploadPrefix.value}__flow-${props.theme}`}>
          <div class={`${uploadPrefix.value}__flow-op`}>
            {slots.default?.()}
            {props.placeholder && (
              <small class={`${uploadPrefix.value}__flow-placeholder ${uploadPrefix.value}__placeholder`}>
                {props.placeholder}
              </small>
            )}
          </div>

          {props.theme === 'image-flow' && (
            <div class={cardClassName} {...innerDragEvents.value}>
              {displayFiles.value.length ? renderImageList() : renderEmpty()}
            </div>
          )}

          {props.theme === 'file-flow' &&
            (displayFiles.value.length ? (
              renderFileList()
            ) : (
              <div class={cardClassName} {...innerDragEvents.value}>
                {renderEmpty()}
              </div>
            ))}

          {!props.autoUpload && (props.uploadButton !== null || props.cancelUploadButton !== null) && (
            <div class={`${uploadPrefix.value}__flow-bottom`}>
              {props.cancelUploadButton !== null &&
                (hasCancelUploadTNode ? (
                  renderTNodeJSX('cancelUploadButton', {
                    params: {
                      disabled: cancelUploadDisabled,
                      cancelUploadText: locale.value?.cancelUploadText,
                      cancelUpload: props.cancelUpload,
                    },
                  })
                ) : (
                  <TButton
                    theme="default"
                    disabled={cancelUploadDisabled}
                    content={locale.value?.cancelUploadText}
                    class={`${uploadPrefix.value}__cancel`}
                    onClick={(e) => props.cancelUpload?.({ e })}
                    {...(isObject(props.cancelUploadButton) ? props.cancelUploadButton : {})}
                  ></TButton>
                ))}
              {props.uploadButton !== null &&
                (hasUploadButtonTNode ? (
                  renderTNodeJSX('uploadButton', {
                    params: {
                      disabled: uploadButtonDisabled,
                      uploading: uploading.value,
                      uploadText: uploadText.value,
                      uploadFiles: props.uploadFiles,
                    },
                  })
                ) : (
                  <TButton
                    disabled={uploadButtonDisabled}
                    theme="primary"
                    loading={uploading.value}
                    class={`${uploadPrefix.value}__continue`}
                    content={uploadText.value}
                    onClick={() => props.uploadFiles?.()}
                    {...(isObject(props.uploadButton) ? props.uploadButton : {})}
                  ></TButton>
                ))}
            </div>
          )}

          <ImageViewer
            images={currentPreviewFile.value.map((t) => t.url || t.raw)}
            visible={!!currentPreviewFile.value.length}
            onClose={() => {
              currentPreviewFile.value = [];
            }}
            index={previewIndex.value}
            onIndexChange={(val) => (previewIndex.value = val)}
            {...(props.imageViewerProps as ImageViewerProps)}
          ></ImageViewer>
        </div>
      );
    };
  },
});
