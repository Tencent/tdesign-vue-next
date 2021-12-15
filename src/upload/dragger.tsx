import { defineComponent, PropType, VNode } from 'vue';
import { CheckCircleFilledIcon, ErrorCircleFilledIcon } from 'tdesign-icons-vue-next';
import { prefix } from '../config';
import { UploadFile } from './type';
import TLoading from '../loading';
import TButton from '../button';
import { returnFileSize, getCurrentDate, abridgeName, UPLOAD_NAME } from './util';
import { ClassName } from '../common';

const name = `${prefix}-upload-dragger`;

export default defineComponent({
  name,

  components: {
    TButton,
    TLoading,
    CheckCircleFilledIcon,
    ErrorCircleFilledIcon,
  },

  props: {
    file: {
      type: Object as PropType<UploadFile>,
    },
    loadingFile: {
      type: Object as PropType<UploadFile>,
    },
    display: {
      type: String as PropType<'file' | 'file-input' | 'image' | 'custom'>,
      validator(val: string) {
        return ['file', 'file-input', 'image', 'custom'].includes(val);
      },
    },
    cancel: Function as PropType<(e: MouseEvent) => void>,
    trigger: Function as PropType<(e: MouseEvent) => void>,
    remove: Function as PropType<(e: MouseEvent) => void>,
    upload: Function as PropType<(file: UploadFile, e: MouseEvent) => void>,
    autoUpload: Boolean,
  },
  emits: ['change', 'dragleave', 'dragenter'],

  data() {
    return {
      target: null,
      dragActive: false,
    };
  },
  computed: {
    isImage(): boolean {
      return this.display === 'image';
    },
    imageUrl(): string {
      return (this.loadingFile && this.loadingFile.url) || (this.file && this.file.url);
    },
    percent(): number {
      return this.loadingFile && this.loadingFile.percent;
    },
    inputName(): string {
      return (this.loadingFile && this.loadingFile.name) || (this.file && this.file.name);
    },
    classes(): ClassName {
      return [
        `${UPLOAD_NAME}__dragger`,
        { [`${UPLOAD_NAME}__dragger-center`]: !this.loadingFile && !this.file },
        { [`${UPLOAD_NAME}__dragger-error`]: this.loadingFile && this.loadingFile.status === 'fail' },
      ];
    },
    size(): number {
      return (this.loadingFile && this.loadingFile.size) || (this.file && this.file.size);
    },
    // 上传失败或者上传成功会显示
    showResultOperate(): boolean {
      return Boolean(!this.loadingFile && this.file?.name) || ['success', 'fail'].includes(this.loadingFile?.status);
    },
  },

  methods: {
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

    renderDefaultDragElement(): VNode {
      const unActiveElement = (
        <div>
          <span class={`${prefix}-upload--highlight`}>点击上传</span>
          <span>&nbsp;&nbsp;/&nbsp;&nbsp;拖拽到此区域</span>
        </div>
      );
      const activeElement = <div>释放鼠标</div>;
      return this.dragActive ? activeElement : unActiveElement;
    },

    renderImage() {
      return <div class={`${UPLOAD_NAME}__dragger-img-wrap`}>{this.imageUrl && <img src={this.imageUrl}></img>}</div>;
    },

    renderUploading() {
      if (this.loadingFile.status === 'fail') {
        return <ErrorCircleFilledIcon />;
      }
      if (this.loadingFile.status === 'progress') {
        return (
          <div class={`${UPLOAD_NAME}__single-progress`}>
            <TLoading />
            <span class={`${UPLOAD_NAME}__single-percent`}>{Math.min(this.loadingFile.percent, 99)}%</span>
          </div>
        );
      }
    },

    reupload(e: MouseEvent) {
      this.remove(e);
      this.trigger(e);
    },

    renderProgress() {
      return (
        <div class={`${UPLOAD_NAME}__dragger-progress`}>
          {this.isImage && this.renderImage()}
          <div class={`${UPLOAD_NAME}__dragger-progress-info`}>
            <div class={`${UPLOAD_NAME}__dragger-text`}>
              <span class={`${UPLOAD_NAME}__single-name`}>{abridgeName(this.inputName)}</span>
              {this.loadingFile && this.renderUploading()}
              {!this.loadingFile && !!this.file && <CheckCircleFilledIcon />}
            </div>
            <small class={`${prefix}-size-s`}>文件大小：{returnFileSize(this.size)}</small>
            <small class={`${prefix}-size-s`}>上传日期：{getCurrentDate()}</small>
            <div class={`${UPLOAD_NAME}__dragger-btns`}>
              {['progress', 'waiting'].includes(this.loadingFile?.status) && (
                <TButton
                  theme="primary"
                  variant="text"
                  class={`${UPLOAD_NAME}__dragger-progress-cancel`}
                  onClick={this.cancel}
                >
                  取消上传
                </TButton>
              )}
              {!this.autoUpload && this.loadingFile?.status === 'waiting' && (
                <TButton
                  theme="primary"
                  variant="text"
                  onClick={(e: MouseEvent) => this.upload({ ...this.loadingFile }, e)}
                >
                  开始上传
                </TButton>
              )}
            </div>
            {this.showResultOperate && (
              <div class={`${UPLOAD_NAME}__dragger-btns`}>
                <t-button
                  theme="primary"
                  variant="text"
                  class={`${UPLOAD_NAME}__dragger-progress-cancel`}
                  onClick={this.reupload}
                >
                  重新上传
                </t-button>
                <t-button theme="primary" variant="text" onClick={this.remove}>
                  删除
                </t-button>
              </div>
            )}
          </div>
        </div>
      );
    },
  },

  render(): VNode {
    let content = null;
    if ((this.loadingFile || this.file) && this.display !== 'custom') {
      content = this.renderProgress();
    } else {
      content = (
        <div class={`${UPLOAD_NAME}__trigger`} onClick={this.trigger}>
          {(this.$slots.default && this.$slots.default(null)) || this.renderDefaultDragElement()}
        </div>
      );
    }
    return (
      <div
        class={this.classes}
        onDrop={this.handleDrop}
        onDragenter={this.handleDragenter}
        onDragover={this.handleDragover}
        onDragleave={this.handleDragleave}
      >
        {content}
      </div>
    );
  },
});
