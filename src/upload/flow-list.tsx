import { defineComponent, ref, PropType, computed } from 'vue';

// components
import {
  TimeFilledIcon,
  CheckCircleFilledIcon,
  ErrorCircleFilledIcon,
  DeleteIcon,
  BrowseIcon,
} from 'tdesign-icons-vue-next';
import TButton from '../button';
import TLoading from '../loading';

// utils
import { UploadFile } from './type';
import { FlowRemoveContext } from './interface';
import props from './props';
import { returnFileSize, abridgeName } from './util';
import { renderTNodeJSX } from '../utils/render-tnode';

// hooks
import { useFormDisabled } from '../form/hooks';
import { useConfig } from '../config-provider';

const flowListProps = {
  showUploadProgress: props.showUploadProgress,
  placeholder: props.placeholder,
  autoUpload: props.autoUpload,
  disabled: props.disabled,
  theme: props.theme,
  batchUpload: props.isBatchUpload,
  // 已上传完成的文件
  files: props.files,
  // 上传队列中的文件（可能存在已经上传过的文件）
  toUploadFiles: Array as PropType<Array<UploadFile>>,
  onRemove: Function as PropType<(ctx: FlowRemoveContext) => void>,
  onUpload: Function as PropType<(files: Array<UploadFile>, e: MouseEvent) => void>,
  onCancel: Function as PropType<(e: MouseEvent) => void>,
  onChange: Function as PropType<(files: FileList) => void>,
  onDragleave: Function as PropType<(e: DragEvent) => void>,
  onDragenter: Function as PropType<(e: DragEvent) => void>,
  onImgPreview: Function as PropType<(options: MouseEvent, file: UploadFile) => void>,
};

export default defineComponent({
  name: 'TUploadFlowList',

  props: flowListProps,

  setup(props) {
    const target = ref(null);
    const dragActive = ref(false);

    const disabled = useFormDisabled();
    const { classPrefix: prefix, global } = useConfig('upload');

    const UPLOAD_NAME = computed(() => {
      return `${prefix.value}-upload`;
    });

    const waitingUploadFiles = computed(() => {
      const list: Array<UploadFile> = [];
      props.toUploadFiles.forEach((item: UploadFile) => {
        const r = props.files.filter((t: UploadFile) => t.name === item.name);
        if (!r.length) {
          list.push(item);
        }
      });
      return list;
    });

    const showInitial = computed(() => {
      const isWaitingEmpty = !waitingUploadFiles.value || !waitingUploadFiles.value.length;
      return (!props.files || !props.files.length) && isWaitingEmpty;
    });

    const listFiles = computed(() => {
      if (!props.files || !props.files.length) return props.toUploadFiles;
      return props.files.concat(waitingUploadFiles.value);
    });

    const failedList = computed(() => {
      return props.toUploadFiles.filter((file: UploadFile) => file.status === 'fail');
    });

    const processList = computed(() => props.toUploadFiles.filter((file: UploadFile) => file.status === 'progress'));

    const isUploading = computed(() => !!processList.value.length);

    const allowUpload = computed(
      () => Boolean(waitingUploadFiles.value && waitingUploadFiles.value.length) && !isUploading.value,
    );

    const uploadText = computed(() => {
      if (isUploading.value) return '上传中...';
      return failedList.value && failedList.value.length ? '重新上传' : '开始上传';
    });

    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      props.onChange(event.dataTransfer.files);
      props.onDragleave(event);
      dragActive.value = false;
    };

    const handleDragenter = (event: DragEvent) => {
      target.value = event.target;
      event.preventDefault();
      props.onDragenter(event);
      dragActive.value = true;
    };

    const handleDragleave = (event: DragEvent) => {
      if (target.value !== event.target) return;
      event.preventDefault();
      props.onDragleave(event);
      dragActive.value = false;
    };

    const handleDragover = (event: DragEvent) => {
      event.preventDefault();
    };

    const renderDragger = () => {
      return (
        <div
          class={`${UPLOAD_NAME.value}__flow-empty`}
          onDrop={handleDrop}
          onDragenter={handleDragenter}
          onDragover={handleDragover}
          onDragleave={handleDragleave}
        >
          {dragActive.value ? global.value.dragger.dragDropText : global.value.dragger.clickAndDragText}
        </div>
      );
    };

    const getStatusMap = (file: UploadFile) => {
      const iconMap = {
        success: <CheckCircleFilledIcon />,
        fail: <ErrorCircleFilledIcon />,
        progress: <TLoading />,
        waiting: <TimeFilledIcon />,
      };
      const textMap = {
        success: global.value.progress.successText,
        fail: global.value.progress.failText,
        progress: `${global.value.progress.uploadingText}${Math.min(file.percent, 99)}%`,
        waiting: global.value.progress.waitingText,
      };
      return {
        iconMap,
        textMap,
      };
    };

    const renderStatus = (file: UploadFile) => {
      if (!props.showUploadProgress) return;
      const { iconMap, textMap } = getStatusMap(file);
      return (
        <div class={`${UPLOAD_NAME.value}__flow-status`}>
          {iconMap[file.status]}
          <span>{textMap[file.status]}</span>
        </div>
      );
    };

    const renderNormalActionCol = (file: UploadFile, index: number) => {
      return (
        <td>
          <span
            class={`${UPLOAD_NAME.value}__flow-button`}
            onClick={(e: MouseEvent) => props.onRemove({ e, index, file })}
          >
            {global.value.triggerUploadText.delete}
          </span>
        </td>
      );
    };

    // batchUpload action col
    const renderBatchActionCol = (index: number) => {
      // 第一行数据才需要合并单元格
      return index === 0 ? (
        <td rowspan={listFiles.value.length} class={`${UPLOAD_NAME.value}__flow-table__batch-row`}>
          <span
            class={`${UPLOAD_NAME.value}__flow-button`}
            onClick={(e: MouseEvent) => props.onRemove({ e, index: -1, file: null })}
          >
            {global.value.triggerUploadText.delete}
          </span>
        </td>
      ) : (
        ''
      );
    };

    const renderFileList = () =>
      props.theme === 'file-flow' && (
        <table class={`${UPLOAD_NAME.value}__flow-table`}>
          <tr>
            <th>{global.value.file.fileNameText}</th>
            <th>{global.value.file.fileSizeText}</th>
            <th>{global.value.file.fileStatusText}</th>
            <th>{global.value.file.fileOperationText}</th>
          </tr>
          {showInitial.value && (
            <tr>
              <td colspan={4}>{renderDragger()}</td>
            </tr>
          )}
          {listFiles.value.map((file, index) => (
            <tr>
              <td>{abridgeName(file.name, 7, 10)}</td>
              <td>{returnFileSize(file.size)}</td>
              <td>{renderStatus(file)}</td>
              <td>
                <span
                  class={`${UPLOAD_NAME.value}__flow-button`}
                  onClick={(e: MouseEvent) => props.onRemove({ e, index, file })}
                >
                  {/* 合并操作出现条件为：当前为合并上传模式且列表内没有待上传文件 */}
                  {props.batchUpload && props.toUploadFiles.length === 0
                    ? renderBatchActionCol(index)
                    : renderNormalActionCol(file, index)}
                </span>
              </td>
            </tr>
          ))}
        </table>
      );

    const renderImgItem = (file: UploadFile, index: number) => {
      const { iconMap, textMap } = getStatusMap(file);
      return (
        <li class={`${UPLOAD_NAME.value}__card-item`}>
          <div
            class={[
              `${UPLOAD_NAME.value}__card-content`,
              { [`${prefix.value}-is-bordered`]: file.status !== 'waiting' },
            ]}
          >
            {['fail', 'progress'].includes(file.status) && (
              <div class={`${UPLOAD_NAME.value}__card-status-wrap`}>
                {iconMap[file.status as 'fail' | 'progress']}
                <p>{textMap[file.status as 'fail' | 'progress']}</p>
              </div>
            )}
            {(['waiting', 'success'].includes(file.status) || (!file.status && file.url)) && (
              <img
                class={`${UPLOAD_NAME.value}__card-image`}
                src={file.url || '//tdesign.gtimg.com/tdesign-default-img.png'}
              />
            )}
            <div class={`${UPLOAD_NAME.value}__card-mask`}>
              {file.url && (
                <span class={`${UPLOAD_NAME.value}__card-mask-item`}>
                  <BrowseIcon onClick={({ e }: { e: MouseEvent }) => props.onImgPreview(e, file)} />
                  <span class={`${UPLOAD_NAME.value}__card-mask-item-divider`}></span>
                </span>
              )}
              {!props.disabled && (
                <span
                  class={`${UPLOAD_NAME.value}__card-mask-item`}
                  onClick={(e: MouseEvent) => props.onRemove({ e, index, file })}
                >
                  <DeleteIcon />
                </span>
              )}
            </div>
          </div>
          <p class={`${UPLOAD_NAME.value}__card-name`}>{abridgeName(file.name)}</p>
        </li>
      );
    };

    const renderImgList = () =>
      props.theme === 'image-flow' && (
        <div class={`${UPLOAD_NAME.value}__flow-card-area`}>
          {showInitial.value && renderDragger()}
          {!!listFiles.value.length && (
            <ul class={`${UPLOAD_NAME.value}__card clearfix`}>
              {listFiles.value.map((file, index) => renderImgItem(file, index))}
            </ul>
          )}
        </div>
      );

    const renderFooter = () =>
      !props.autoUpload && (
        <div class={`${UPLOAD_NAME.value}__flow-bottom`}>
          <TButton theme="default" onClick={props.onCancel} disabled={!allowUpload.value}>
            {global.value.cancelUploadText}
          </TButton>
          <TButton
            disabled={!allowUpload.value}
            theme="primary"
            onClick={(e: MouseEvent) => props.onUpload(waitingUploadFiles.value, e)}
          >
            {uploadText.value}
          </TButton>
        </div>
      );

    return {
      UPLOAD_NAME,
      prefix,
      allowUpload,
      uploadText,
      disabled,
      renderImgList,
      renderFileList,
      renderFooter,
    };
  },

  render() {
    return (
      <div class={[`${this.UPLOAD_NAME}__flow`, `${this.UPLOAD_NAME}__flow-${this.theme}`]}>
        <div class={`${this.UPLOAD_NAME}__flow-op`}>
          {renderTNodeJSX(this, 'default')}
          <small class={`${this.prefix}-size-s ${this.UPLOAD_NAME}__flow-placeholder`}>{this.placeholder}</small>
        </div>
        {this.renderFileList()}
        {this.renderImgList()}
        {this.renderFooter()}
      </div>
    );
  },
});
