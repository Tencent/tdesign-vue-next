import Vue from 'vue';
import { prefix } from '../config';
import Dragger from './dragger';
import UploadList from './uploadList';
import xhr from './xhr';
import { UploadFile, UploadProgressEvent, HTMLInputEvent } from './interface';
import { VNode } from 'vue/types/umd';

const name = `${prefix}-upload`;

export default Vue.extend({
  name,

  components: {
    Dragger,
  },

  props: {
    accept: String,
    action: {
      type: [String],
    },
    method: {
      type: String,
      default: 'POST',
    },
    beforeUpload: {
      type: Function,
      default() {
        return () => true;
      },
    },
    data: [Object, Function],
    headers: {
      type: Object,
      default() {
        return {};
      },
    },
    disabled: Boolean,
    multiple: Boolean,
    name: {
      type: String,
      default: 'file',
    },
    withCredentials: Boolean,
    customRequest: Function,
    transformFile: {
      type: Function,
      default: (file: any) => file,
    },
    autoUpload: Boolean,
    submit: Function,
    abort: Function,
    drag: Boolean,
    showFileList: {
      type: Boolean,
      default: true,
    },
    fileList: {
      type: Array,
      default: (): any => ([]),
    },
    defaultFileList: {
      type: Array,
      default: (): any => ([]),
    },
    listType: {
      type: String,
      default: '',
      validator(v: string): boolean {
        return ['', 'default', 'picture'].includes(v);
      },
    },
    limit: Number,
    beforeRemove: {
      type: Function,
      default: (): boolean => true,
    },
  },

  data: () => ({
    dragActive: false,
  }),

  methods: {
    handleChange(event: HTMLInputEvent): void {
      const { files } = event.target;
      this.uploadFiles({ files });
      (this.$refs.input as Vue & { value: any }).value = null;
    },

    handleDragChange(files: FileList): void {
      if (this.disabled) return;
      this.uploadFiles({ files });
    },

    uploadFiles({ files }: { files: FileList }): void {
      const arrayFiles = [...files];
      const postedFiles = this.multiple ? arrayFiles : [arrayFiles[0]];
      postedFiles.forEach(async (file: File): Promise<void> => {
        file = this.transformFile(file); // eslint-disable-line
        const isUpload = this.beforeUpload(file);
        const uploadFile: UploadFile = {
          ...file,
          uid: Date.now() + file.name,
          lastModified: file.lastModified,
          name: file.name,
          size: file.size,
          type: file.type,
          originFileObj: file,
          percent: 0,
          status: 'progress',
        };
        if (isUpload) {
          this.upload(uploadFile);
        }
      });
    },

    async upload(file: UploadFile): Promise<void> {
      const request = this.customRequest || xhr;
      request({
        action: this.action,
        data: this.data,
        file,
        name: this.name,
        headers: this.headers,
        withCredentials: this.withCredentials,
        onError: this.onError,
        onProgress: this.onProgress,
        onSuccess: this.onSuccess,
      });
      this.fileList.push(file);
    },

    onError({ event, file }: { event: ProgressEvent; file: UploadFile }): void {
      const fileList = [].concat(this.fileList);
      const [targetFile] = fileList.filter((item: UploadFile) => item.uid === file.uid);
      if (!targetFile) {
        return;
      }
      targetFile.status = 'fail';
      const params = { event, file: targetFile, fileList };
      this.$emit('fail', params);
    },

    onProgress({ event, file }: { event: any; file: UploadFile }): void {
      const [targetFile] = this.fileList.filter((item: UploadFile) => item.uid === file.uid);
      if (!targetFile) {
        return;
      }
      targetFile.status = 'progress';
      targetFile.percent = event.percent;
      this.$emit('progress', {
        event,
        file: targetFile,
        fileList: this.fileList,
      });
    },

    onSuccess({ event, file, response }: { event: UploadProgressEvent; file: UploadFile; response: any }): void {
      const [targetFile] = this.fileList.filter((item: UploadFile) => item.uid === file.uid);
      if (!targetFile) {
        return;
      }
      targetFile.status = 'success';
      targetFile.percent = 100;
      this.$emit('success', {
        event,
        file: targetFile,
        fileList: this.fileList,
        response,
      });
    },

    handleRemove(file: UploadFile): void {
      const canBeRemoved = (this.beforeRemove as (file: UploadFile) => boolean)(file);
      if (!canBeRemoved) return;
      const findIndex = this.fileList.findIndex((item: UploadFile) => item.uid === file.uid);
      this.fileList.splice(findIndex, 1);
    },

    handlePreview(file: UploadFile) {
      this.$emit('preview', file);
    },

    handleClick(): void {
      if (this.disabled) return;
      (this.$refs.input as HTMLInputElement).click();
    },

    handleDragenter(): void {
      if (this.disabled) return;
      this.$emit('dragenter');
      this.dragActive = true;
    },

    handleDragleave(): void {
      if (this.disabled) return;
      this.$emit('dragleave');
      this.dragActive = false;
    },
  },

  render(): VNode {
    const triggerSlot = this.$scopedSlots.trigger || this.$scopedSlots.default;
    const triggerElement = triggerSlot && triggerSlot({ dragActive: this.dragActive });
    return (
      <section>
        <div onClick={this.handleClick}>
          {
            this.drag
              ? <Dragger
                  onChange={this.handleDragChange}
                  onDragenter={this.handleDragenter}
                  onDragleave={this.handleDragleave}>
                    {triggerElement}
                </Dragger>
              : triggerElement
          }
          <input type="file" hidden ref="input" onChange={this.handleChange} multiple={this.multiple} accept={this.accept} />
        </div>

        {
          this.showFileList
            ? <UploadList
                fileList={this.fileList}
                listType={this.listType}
                handleRemove={this.handleRemove}
                preview={this.handlePreview}
                limit={this.limit}
                handleUpload={this.handleClick}>
              </UploadList>
            : ''
        }
      </section>
    );
  },
});
