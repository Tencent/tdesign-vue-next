import { defineComponent, PropType } from 'vue';
import { AddIcon, DeleteIcon, UploadIcon, BrowseIcon } from 'tdesign-icons-vue-next';
import { UploadFile } from './type';
import TLoading from '../loading';
import { UploadRemoveOptions } from './interface';
import { UPLOAD_NAME } from './util';
import props from './props';
import CLASSNAMES from '../utils/classnames';
import { prefix } from '../config';

export default defineComponent({
  name: 'TImageUpload',

  components: {
    AddIcon,
    DeleteIcon,
    UploadIcon,
    BrowseIcon,
    TLoading,
  },
  props: {
    showUploadProgress: props.showUploadProgress,
    files: {
      type: Array as PropType<Array<UploadFile>>,
    },
    loadingFile: {
      type: Object as PropType<UploadFile>,
    },
    trigger: {
      type: Function as PropType<(e: MouseEvent) => void>,
    },
    remove: {
      type: Function as PropType<(options: UploadRemoveOptions) => void>,
    },
    multiple: Boolean,
    max: Number,
    disabled: Boolean,
  },

  emits: ['img-preview'],

  computed: {
    showTrigger(): boolean {
      if (this.multiple) {
        return !this.max || (this.files && this.files.length < this.max);
      }
      return !(this.files && this.files[0]);
    },
  },

  methods: {
    onMaskClick(e: MouseEvent) {
      !this.showTrigger && this.trigger(e);
    },
    onViewClick(e: MouseEvent, file: UploadFile) {
      this.$emit('img-preview', e, file);
    },
  },

  render() {
    return (
      <ul class={`${UPLOAD_NAME}__card`}>
        {this.files &&
          this.files.map((file, index) => (
            <li class={`${UPLOAD_NAME}__card-item ${prefix}-is--background`}>
              <div class={`${UPLOAD_NAME}__card-content ${UPLOAD_NAME}__card-box`}>
                <img class={`${UPLOAD_NAME}__card-image`} src={file.url} />
                <div class={`${UPLOAD_NAME}__card-mask`} onClick={this.onMaskClick}>
                  <span class={`${UPLOAD_NAME}__card-mask-item`} onClick={(e: MouseEvent) => e.stopPropagation()}>
                    <BrowseIcon onClick={({ e }: { e: MouseEvent }) => this.onViewClick(e, file)} />
                  </span>
                  <span class={`${UPLOAD_NAME}__card-mask-item-divider`}></span>

                  <span class={`${UPLOAD_NAME}__card-mask-item`} onClick={(e: MouseEvent) => e.stopPropagation()}>
                    <DeleteIcon onClick={({ e }: { e: MouseEvent }) => this.remove({ e, file, index })} />
                  </span>
                </div>
              </div>
            </li>
          ))}
        {this.showTrigger && (
          <li
            class={[
              `${UPLOAD_NAME}__card-item ${prefix}-is--background`,
              {
                [CLASSNAMES.STATUS.disabled]: this.disabled,
              },
            ]}
            onClick={this.trigger}
          >
            {this.showUploadProgress && this.loadingFile && this.loadingFile.status === 'progress' ? (
              <div class={`${UPLOAD_NAME}__card-container ${UPLOAD_NAME}__card-box`}>
                <TLoading />
                <p>上传中 {Math.min(this.loadingFile.percent, 99)}%</p>
              </div>
            ) : (
              <div class={`${UPLOAD_NAME}__card-container ${UPLOAD_NAME}__card-box`}>
                <AddIcon></AddIcon>
                <p class={`${prefix}-size-s`}>点击上传图片</p>
              </div>
            )}
          </li>
        )}
      </ul>
    );
  },
});
