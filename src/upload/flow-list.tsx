import { defineComponent, VNode, PropType } from 'vue';
import { UploadFile } from './type';
import TButton from '../button';
import { returnFileSize, abridgeName } from './util';
import { FlowRemoveContext } from './interface';
import TIconLoading from '../icon/loading';
import TIconTimeFilled from '../icon/time-filled';
import TIconCheckCircleFilled from '../icon/check-circle-filled';
import TIconErrorCircleFilled from '../icon/error-circle-filled';
import TIconDelete from '../icon/delete';
import TIconBrowse from '../icon/browse';

export default defineComponent({
  name: 'TUploadFlowList',

  components: {
    TButton, TIconLoading, TIconCheckCircleFilled, TIconTimeFilled, TIconErrorCircleFilled, TIconBrowse, TIconDelete,
  },

  props: {
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

  data() {
    return {
      dragActive: false,
      target: null,
    };
  },
  emits: ['dragleave', 'change', 'dragenter', 'imgPreview'],
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
          status = <div class='t-upload__flow-status'><TIconCheckCircleFilled /><span>上传成功</span></div>;
          break;
        case 'fail':
          status = <div class='t-upload__flow-status'><TIconErrorCircleFilled /><span>上传失败</span></div>;
          break;
        case 'progress':
          status = <div class='t-upload__flow-status'><TIconLoading /><span>上传中 {Math.min(file.percent, 99)}%</span></div>;
          break;
        case 'waiting':
          status = <div class='t-upload__flow-status'><TIconTimeFilled /><span>待上传</span></div>;
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
          class='t-upload__flow-empty'
          onDrop={this.handleDrop}
          onDragenter={this.handleDragenter}
          onDragover={this.handleDragover}
          onDragleave={this.handleDragleave}
        >{this.dragActive ? '释放鼠标' : '点击上方“选择文件”或将文件拖拽到此区域'}</div>
      );
    },

    renderFileList() {
      return (
        <table class='t-upload__flow-table'>
          <tr><th>文件名</th><th>大小</th><th>状态</th><th>操作</th></tr>
          {this.showInitial && (
            <tr><td colspan={4}>{this.renderDrager()}</td></tr>
          )}
          {this.listFiles.map((file, index) => (
            <tr>
              <td>{abridgeName(file.name, 7, 10)}</td>
              <td>{returnFileSize(file.size)}</td>
              <td>{this.renderStatus(file)}</td>
              <td><span class='t-upload__flow-button' onClick={(e: MouseEvent) => this.remove({ e, index, file })}>删除</span></td>
            </tr>
          ))}
        </table>
      );
    },

    renderImgList() {
      return (
        <div class='t-upload__flow-card-area'>
          {this.showInitial && this.renderDrager()}
          {!!this.listFiles.length && (
            <ul class='t-upload-card clearfix'>
              {this.listFiles.map((file, index) => (
                <li class='t-upload-card__item'>
                  <div class={['t-upload-card__content', { 't-upload-card__content-border': file.status !== 'waiting' }]}>
                    {file.status === 'fail' && (
                      <div class='t-upload-card__status-wrap'><TIconErrorCircleFilled size='20px'/><p>上传失败</p></div>
                    )}
                    {file.status === 'progress' && (
                      <div class='t-upload-card__status-wrap'><TIconLoading size='20px'/><p>上传中 {Math.min(file.percent, 99)}</p></div>
                    )}
                    {(['waiting', 'success'].includes(file.status) || (!file.status && file.url)) && (
                      <img class="t-upload-card__image" src={file.url || '//tdesign.gtimg.com/tdesign-default-img.png'} />
                    )}
                    <div class="t-upload-card__mask">
                      {file.url && <span class="t-upload-card__mask__item">
                        <TIconBrowse onClick={(e: MouseEvent) => this.onViewClick(e, file)}/>
                        <span class="t-upload-card__mask__item-divider"></span>
                      </span>}
                      <span class="t-upload-card__mask__item" onClick={(e: MouseEvent) => this.remove({ e, index, file })}>
                        <TIconDelete/>
                      </span>
                    </div>
                  </div>
                  <p class="t-upload-card__name">{abridgeName(file.name)}</p>
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
      <div class={['t-upload__flow', `t-upload__flow-${this.display}`]}>
        <div class='t-upload__flow-op'>
          {this.$slots.default && this.$slots.default(null)}
          <small class='t-upload__small t-upload__flow-placeholder'>{this.placeholder}</small>
        </div>
        {this.display === 'file-flow' && this.renderFileList()}
        {this.display === 'image-flow' && this.renderImgList()}
        <div class='t-upload__flow-bottom'>
          <t-button theme='default' onClick={this.cancel}>取消</t-button>
          <t-button disabled={!this.allowUpload} theme='primary' onClick={(e: MouseEvent) => this.upload(this.waitingUploadFiles, e)}>
            {this.uploadText}
          </t-button>
        </div>
      </div>
    );
  },
});
