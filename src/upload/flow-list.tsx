import { defineComponent, VNode, PropType } from 'vue';
import {
  LoadingIcon,
  TimeFilledIcon,
  CheckCircleFilledIcon,
  ErrorCircleFilledIcon,
  DeleteIcon,
  BrowseIcon,
} from 'tdesign-icons-vue-next';
import { UploadFile } from './type';
import TButton from '../button';
import { returnFileSize, abridgeName, UPLOAD_NAME } from './util';
import { FlowRemoveContext } from './interface';
import props from './props';

export default defineComponent({
  name: 'TUploadFlowList',

  components: {
    TButton,
    LoadingIcon,
    TimeFilledIcon,
    CheckCircleFilledIcon,
    ErrorCircleFilledIcon,
    DeleteIcon,
    BrowseIcon,
  },

  props: {
    showUploadProgress: props.showUploadProgress,
    // 已上传完成的文件
    files: Array as PropType<Array<UploadFile>>,
    // 上传队列中的文件（可能存在已经上传过的文件）
    toUploadFiles: Array as PropType<Array<UploadFile>>,
    placeholder: String,
    autoUpload: Boolean,
    remove: Function as PropType<(ctx: FlowRemoveContext) => void>,
    upload: Function as PropType<(files: Array<UploadFile>, e: MouseEvent) => void>,
    cancel: Function as PropType<(e: MouseEvent) => void>,
    display: {
      type: String as PropType<'file-flow' | 'image-flow'>,
      validator(val: string) {
        return ['file-flow', 'image-flow'].includes(val);
      },
    },
  },
  emits: ['dragleave', 'change', 'dragenter', 'imgPreview'],

  data() {
    return {
      dragActive: false,
      target: null,
    };
  },
  computed: {
    showInitial(): boolean {
      const isWatingEmpty = !this.waitingUploadFiles || !this.waitingUploadFiles.length;
      return (!this.files || !this.files.length) && isWatingEmpty;
    },
    // 上传队列中的文件（不包含已经上传过的文件）
    waitingUploadFiles(): Array<UploadFile> {
      const list: Array<UploadFile> = [];
      this.toUploadFiles.forEach((item: UploadFile) => {
        const r = this.files.filter((t: UploadFile) => t.name === item.name);
        if (!r.length) {
          list.push(item);
        }
      });
      return list;
    },
    listFiles(): Array<UploadFile> {
      if (!this.files || !this.files.length) return this.toUploadFiles;
      return this.files.concat(this.waitingUploadFiles);
    },
    failedList(): Array<UploadFile> {
      return this.toUploadFiles.filter((file: UploadFile) => file.status === 'fail');
    },
    processList(): Array<UploadFile> {
      return this.toUploadFiles.filter((file: UploadFile) => file.status === 'progress');
    },
    isUploading(): boolean {
      return !!this.processList.length;
    },
    allowUpload(): boolean {
      return Boolean(this.waitingUploadFiles && this.waitingUploadFiles.length) && !this.isUploading;
    },
    uploadText(): string {
      if (this.isUploading) return '上传中...';
      return this.failedList && this.failedList.length ? '重新上传' : '开始上传';
    },
  },
  methods: {
    renderStatus(file: UploadFile) {
      let status = null;
      switch (file.status) {
        case 'success':
          status = (
            <div class={`${UPLOAD_NAME}__flow-status`}>
              <CheckCircleFilledIcon />
              <span>上传成功</span>
            </div>
          );
          break;
        case 'fail':
          status = (
            <div class={`${UPLOAD_NAME}__flow-status`}>
              <ErrorCircleFilledIcon />
              <span>上传失败</span>
            </div>
          );
          break;
        case 'progress':
          this.showUploadProgress &&
            (status = (
              <div class={`${UPLOAD_NAME}__flow-status`}>
                <LoadingIcon />
                <span>上传中 {Math.min(file.percent, 99)}%</span>
              </div>
            ));
          break;
        case 'waiting':
          status = (
            <div class={`${UPLOAD_NAME}__flow-status`}>
              <TimeFilledIcon />
              <span>待上传</span>
            </div>
          );
          break;
        default:
          break;
      }
      return status;
    },
    handleDrop(event: DragEvent) {
      event.preventDefault();
      this.$emit('change', event.dataTransfer.files);
      this.$emit('dragleave', event);
      this.dragActive = false;
    },

    handleDragenter(event: DragEvent) {
      this.target = event.target;
      event.preventDefault();
      this.$emit('dragenter', event);
      this.dragActive = true;
    },

    handleDragleave(event: DragEvent) {
      if (this.target !== event.target) return;
      event.preventDefault();
      this.$emit('dragleave', event);
      this.dragActive = false;
    },

    handleDragover(event: DragEvent) {
      event.preventDefault();
    },

    onViewClick(event: MouseEvent, file: UploadFile) {
      this.$emit('imgPreview', event, file);
    },

    renderDrager() {
      return (
        <div
          class={`${UPLOAD_NAME}__flow-empty`}
          onDrop={this.handleDrop}
          onDragenter={this.handleDragenter}
          onDragover={this.handleDragover}
          onDragleave={this.handleDragleave}
        >
          {this.dragActive ? '释放鼠标' : '点击上方“选择文件”或将文件拖拽到此区域'}
        </div>
      );
    },

    renderFileList() {
      return (
        <table class={`${UPLOAD_NAME}__flow-table`}>
          <tr>
            <th>文件名</th>
            <th>大小</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
          {this.showInitial && (
            <tr>
              <td colspan={4}>{this.renderDrager()}</td>
            </tr>
          )}
          {this.listFiles.map((file, index) => (
            <tr>
              <td>{abridgeName(file.name, 7, 10)}</td>
              <td>{returnFileSize(file.size)}</td>
              <td>{this.renderStatus(file)}</td>
              <td>
                <span
                  class={`${UPLOAD_NAME}__flow-button`}
                  onClick={(e: MouseEvent) => this.remove({ e, index, file })}
                >
                  删除
                </span>
              </td>
            </tr>
          ))}
        </table>
      );
    },

    renderImgList() {
      return (
        <div class={`${UPLOAD_NAME}__flow-card-area`}>
          {this.showInitial && this.renderDrager()}
          {!!this.listFiles.length && (
            <ul class={`${UPLOAD_NAME}-card clearfix`}>
              {this.listFiles.map((file, index) => (
                <li class={`${UPLOAD_NAME}-card__item`}>
                  <div
                    class={[
                      `${UPLOAD_NAME}-card__content`,
                      { [`${UPLOAD_NAME}-card__content-border`]: file.status !== 'waiting' },
                    ]}
                  >
                    {file.status === 'fail' && (
                      <div class={`${UPLOAD_NAME}-card__status-wrap`}>
                        <ErrorCircleFilledIcon size="20px" />
                        <p>上传失败</p>
                      </div>
                    )}
                    {file.status === 'progress' && (
                      <div class={`${UPLOAD_NAME}-card__status-wrap`}>
                        <LoadingIcon size="20px" />
                        <p>上传中 {Math.min(file.percent, 99)}</p>
                      </div>
                    )}
                    {(['waiting', 'success'].includes(file.status) || (!file.status && file.url)) && (
                      <img
                        class={`${UPLOAD_NAME}-card__image`}
                        src={file.url || '//tdesign.gtimg.com/tdesign-default-img.png'}
                      />
                    )}
                    <div class={`${UPLOAD_NAME}-card__mask`}>
                      {file.url && (
                        <span class={`${UPLOAD_NAME}-card__mask__item`}>
                          <BrowseIcon onClick={({ e }: { e: MouseEvent }) => this.onViewClick(e, file)} />
                          <span class={`${UPLOAD_NAME}-card__mask__item-divider`}></span>
                        </span>
                      )}
                      <span
                        class={`${UPLOAD_NAME}-card__mask__item`}
                        onClick={(e: MouseEvent) => this.remove({ e, index, file })}
                      >
                        <DeleteIcon />
                      </span>
                    </div>
                  </div>
                  <p class={`${UPLOAD_NAME}-card__name`}>{abridgeName(file.name)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    },
  },

  render(): VNode {
    return (
      <div class={[`${UPLOAD_NAME}__flow`, `${UPLOAD_NAME}__flow-${this.display}`]}>
        <div class={`${UPLOAD_NAME}__flow-op`}>
          {this.$slots.default && this.$slots.default(null)}
          <small class={`${UPLOAD_NAME}__small ${UPLOAD_NAME}__flow-placeholder`}>{this.placeholder}</small>
        </div>
        {this.display === 'file-flow' && this.renderFileList()}
        {this.display === 'image-flow' && this.renderImgList()}
        <div class={`${UPLOAD_NAME}__flow-bottom`}>
          <TButton theme="default" onClick={this.cancel}>
            取消
          </TButton>
          <TButton
            disabled={!this.allowUpload}
            theme="primary"
            onClick={(e: MouseEvent) => this.upload(this.waitingUploadFiles, e)}
          >
            {this.uploadText}
          </TButton>
        </div>
      </div>
    );
  },
});
