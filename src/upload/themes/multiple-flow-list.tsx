import { computed, defineComponent, toRefs, PropType } from 'vue';
import {
  BrowseIcon as TdBrowseIcon,
  DeleteIcon as TdDeleteIcon,
  CheckCircleFilledIcon as TdCheckCircleFilledIcon,
  ErrorCircleFilledIcon as TdErrorCircleFilledIcon,
  TimeFilledIcon as TdTimeFilledIcon,
} from 'tdesign-icons-vue-next';
import useGlobalIcon from '../../hooks/useGlobalIcon';
import ImageViewer from '../../image-viewer';
import { CommonDisplayFileProps } from '../interface';
import { commonProps } from '../constants';
import TButton from '../../button';
import { UploadFile, TdUploadProps } from '../type';
import useDrag, { UploadDragEvents } from '../hooks/useDrag';
import { abridgeName, returnFileSize } from '../../_common/js/upload/utils';
import TLoading from '../../loading';
import Link from '../../link';
import { useTNodeJSX } from '../../hooks';

export interface ImageFlowListProps extends CommonDisplayFileProps {
  uploadFiles?: (toFiles?: UploadFile[]) => void;
  cancelUpload?: (context: { e: MouseEvent; file?: UploadFile }) => void;
  dragEvents: UploadDragEvents;
  disabled?: boolean;
  isBatchUpload?: boolean;
  draggable?: boolean;
  onPreview?: TdUploadProps['onPreview'];
}

export default defineComponent({
  name: 'UploadMultipleFlowList',

  props: {
    ...commonProps,
    uploadFiles: Function as PropType<ImageFlowListProps['uploadFiles']>,
    cancelUpload: Function as PropType<ImageFlowListProps['cancelUpload']>,
    dragEvents: Object as PropType<ImageFlowListProps['dragEvents']>,
    disabled: Boolean,
    isBatchUpload: Boolean,
    draggable: Boolean,
    onPreview: Function as PropType<ImageFlowListProps['onPreview']>,
  },

  setup(props: ImageFlowListProps, { slots }) {
    // locale 已经在 useUpload 中统一处理优先级
    const { locale, uploading, disabled, displayFiles, classPrefix } = toRefs(props);
    const uploadPrefix = `${classPrefix.value}-upload`;

    const renderTNodeJSX = useTNodeJSX();

    const { BrowseIcon, DeleteIcon, CheckCircleFilledIcon, ErrorCircleFilledIcon, TimeFilledIcon } = useGlobalIcon({
      BrowseIcon: TdBrowseIcon,
      DeleteIcon: TdDeleteIcon,
      CheckCircleFilledIcon: TdCheckCircleFilledIcon,
      ErrorCircleFilledIcon: TdErrorCircleFilledIcon,
      TimeFilledIcon: TdTimeFilledIcon,
    });

    const drag = useDrag(props.dragEvents);

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
      <div class={`${uploadPrefix}__flow-empty`}>
        {drag.dragActive.value ? locale.value.dragger.dragDropText : locale.value.dragger.clickAndDragText}
      </div>
    );

    const renderImgItem = (file: UploadFile, index: number) => {
      const { iconMap, textMap } = getStatusMap();
      return (
        <li class={`${uploadPrefix}__card-item`} key={file.name + index + file.percent + file.status}>
          <div
            class={[
              `${uploadPrefix}__card-content`,
              { [`${classPrefix.value}-is-bordered`]: file.status !== 'waiting' },
            ]}
          >
            {['fail', 'progress'].includes(file.status) && (
              <div class={`${uploadPrefix}__card-status-wrap`}>
                {iconMap[file.status as 'fail' | 'progress']}
                <p>
                  {textMap[file.status as 'fail' | 'progress']}
                  {file.status === 'progress' ? ` ${file.percent}%` : ''}
                </p>
              </div>
            )}
            {(['waiting', 'success'].includes(file.status) || (!file.status && file.url)) && (
              <img
                class={`${uploadPrefix}__card-image`}
                src={file.url || '//tdesign.gtimg.com/tdesign-default-img.png'}
              />
            )}
            <div class={`${uploadPrefix}__card-mask`}>
              {file.url && (
                <span class={`${uploadPrefix}__card-mask-item`}>
                  <ImageViewer
                    images={displayFiles.value.map((t) => t.url)}
                    defaultIndex={index}
                    trigger={(h, { open }) => (
                      <BrowseIcon
                        onClick={({ e }: { e: MouseEvent }) => {
                          open();
                          props.onPreview?.({ file, index, e });
                        }}
                      />
                    )}
                  ></ImageViewer>
                  <span class={`${uploadPrefix}__card-mask-item-divider`}></span>
                </span>
              )}
              {!disabled.value && (
                <span
                  class={`${uploadPrefix}__card-mask-item`}
                  onClick={(e: MouseEvent) => props.onRemove({ e, index, file })}
                >
                  <DeleteIcon />
                </span>
              )}
            </div>
          </div>
          <p class={`${uploadPrefix}__card-name`}>{abridgeName(file.name)}</p>
        </li>
      );
    };

    const renderStatus = (file: UploadFile) => {
      const { iconMap, textMap } = getStatusMap();
      return (
        <div class={`${uploadPrefix}__flow-status`}>
          {iconMap[file.status]}
          <span>
            {textMap[file.status]}
            {file.status === 'progress' ? ` ${file.percent}%` : ''}
          </span>
        </div>
      );
    };

    const renderNormalActionCol = (file: UploadFile, index: number) => (
      <td>
        <Link
          theme="primary"
          hover="color"
          content={locale.value?.triggerUploadText?.delete}
          onClick={(e: MouseEvent) => props.onRemove({ e, index, file })}
        ></Link>
      </td>
    );

    // batchUpload action col
    const renderBatchActionCol = (index: number) =>
      // 第一行数据才需要合并单元格
      index === 0 ? (
        <td rowSpan={displayFiles.value.length} class={`${uploadPrefix}__flow-table__batch-row`}>
          <Link
            theme="primary"
            hover="color"
            content={locale.value?.triggerUploadText?.delete}
            onClick={(e: MouseEvent) => props.onRemove({ e, index: -1, file: null })}
          ></Link>
        </td>
      ) : null;

    const renderFileList = () => {
      const customList = renderTNodeJSX('fileListDisplay', {
        params: {
          files: props.displayFiles,
          dragEvents: innerDragEvents.value,
        },
      });
      if (customList) return customList;
      return (
        <table class={`${uploadPrefix}__flow-table`} {...innerDragEvents.value}>
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
                showBatchUploadAction && !displayFiles.value.find((item) => item.status !== 'success')
                  ? renderBatchActionCol(index)
                  : renderNormalActionCol(file, index);
              const fileName = props.abridgeName?.length ? abridgeName(file.name, ...props.abridgeName) : file.name;
              return (
                <tr key={file.name + index}>
                  <td>
                    {file.url ? (
                      <Link href={file.url} target="_blank" hover="color">
                        {fileName}
                      </Link>
                    ) : (
                      fileName
                    )}
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

    return () => {
      const cardClassName = `${uploadPrefix}__flow-card-area`;
      return (
        <div class={`${uploadPrefix}__flow ${uploadPrefix}__flow-${props.theme}`}>
          <div class={`${uploadPrefix}__flow-op`}>
            {slots.default?.()}
            {props.placeholder && (
              <small class={`${uploadPrefix}__flow-placeholder ${uploadPrefix}__placeholder`}>
                {props.placeholder}
              </small>
            )}
          </div>

          {props.theme === 'image-flow' && (
            <div class={cardClassName} {...innerDragEvents.value}>
              {displayFiles.value.length ? (
                <ul class={`${uploadPrefix}__card clearfix`}>
                  {displayFiles.value.map((file, index) => renderImgItem(file, index))}
                </ul>
              ) : (
                renderEmpty()
              )}
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

          {!props.autoUpload && (
            <div class={`${uploadPrefix}__flow-bottom`}>
              <TButton
                theme="default"
                onClick={(e) => props.cancelUpload?.({ e })}
                disabled={disabled.value || !uploading.value}
                content={locale.value?.cancelUploadText}
              ></TButton>
              <TButton
                disabled={disabled.value || uploading.value || !displayFiles.value.length}
                theme="primary"
                loading={uploading.value}
                onClick={() => props.uploadFiles?.()}
                content={uploadText.value}
              ></TButton>
            </div>
          )}
        </div>
      );
    };
  },
});
