import { defineComponent, PropType } from 'vue';
import { UploadFile } from './type';
import { UploadRemoveOptions } from './interface';
import TIconAdd from '../icon/add';
import IIconDelete from '../icon/delete';
import IIconUpload from '../icon/upload';
import TIconBrowse from '../icon/browse';
import TIconLoading from '../icon/loading';
import { UPLOAD_NAME } from './util';
import props from './props';
import CLASSNAMES from '../utils/classnames';
import { prefix } from '../config';

export default defineComponent({
  name: 'TImageUpload',

  components: {
    TIconAdd,
    IIconDelete,
    IIconUpload,
    TIconBrowse,
    TIconLoading,
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
      <ul class={`${UPLOAD_NAME}-card`}>
        {this.files &&
          this.files.map((file, index) => (
            <li class={`${UPLOAD_NAME}-card__item ${prefix}-is--background`}>
              <div class={`${UPLOAD_NAME}-card__content ${UPLOAD_NAME}-card__box`}>
                <img class={`${UPLOAD_NAME}-card__image`} src={file.url} />
                <div class={`${UPLOAD_NAME}-card__mask`} onClick={this.onMaskClick}>
                  <span class={`${UPLOAD_NAME}-card__mask__item`} onClick={(e: MouseEvent) => e.stopPropagation()}>
                    <TIconBrowse onClick={(e: MouseEvent) => this.onViewClick(e, file)} />
                  </span>
                  <span class={`${UPLOAD_NAME}-card__mask__item-divider`}></span>

                  <span class={`${UPLOAD_NAME}-card__mask__item`} onClick={(e: MouseEvent) => e.stopPropagation()}>
                    <IIconDelete onClick={(e: MouseEvent) => this.remove({ e, file, index })} />
                  </span>
                </div>
              </div>
            </li>
          ))}
        {this.showTrigger && (
          <li
            class={[
              `${UPLOAD_NAME}-card__item ${prefix}-is--background`,
              {
                [CLASSNAMES.STATUS.disabled]: this.disabled,
              },
            ]}
            onClick={this.trigger}
          >
            {this.showUploadProgress && this.loadingFile && this.loadingFile.status === 'progress' ? (
              <div class={`${UPLOAD_NAME}-card-container ${UPLOAD_NAME}-card__box`}>
                <TIconLoading></TIconLoading>
                <p>上传中 {Math.min(this.loadingFile.percent, 99)}%</p>
              </div>
            ) : (
              <div class={`${UPLOAD_NAME}-card-container ${UPLOAD_NAME}-card__box`}>
                <TIconAdd></TIconAdd>
                <p class={`${UPLOAD_NAME}__small`}>点击上传图片</p>
              </div>
            )}
          </li>
        )}
      </ul>
    );
  },
});
