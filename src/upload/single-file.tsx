import { defineComponent, PropType, computed } from 'vue';

import { CloseCircleFilledIcon, ErrorCircleFilledIcon, CheckCircleFilledIcon } from 'tdesign-icons-vue-next';
import TLoading from '../loading';

import props from './props';
import { UploadFile } from './type';
import { abridgeName } from './util';
import { renderTNodeJSX } from '../utils/render-tnode';

import { useConfig } from '../config-provider';

const SingleFileProps = {
  file: {
    type: Object as PropType<UploadFile>,
    default: () => {
      return null as UploadFile;
    },
  },
  loadingFile: {
    type: Object as PropType<UploadFile>,
    default: () => {
      return null as UploadFile;
    },
  },
  showUploadProgress: props.showUploadProgress,
  theme: props.theme,
  placeholder: props.placeholder,
  onRemove: Function as PropType<(e: MouseEvent) => void>,
};

export default defineComponent({
  name: 'TUploadSingleFile',

  props: SingleFileProps,

  setup(props) {
    const { classPrefix: prefix } = useConfig('upload');
    const UPLOAD_NAME = computed(() => {
      return `${prefix.value}-upload`;
    });

    const showProgress = computed(() => {
      return !!(props.loadingFile && props.loadingFile.status === 'progress');
    });

    const inputName = computed(() => {
      const fileName = props.file && props.file.name;
      const loadingName = props.loadingFile && props.loadingFile.name;
      return showProgress.value ? loadingName : fileName;
    });

    const inputText = computed(() => {
      return inputName.value || props.placeholder;
    });

    const inputTextClass = computed(() => {
      return [`${prefix.value}-input__inner`, { [`${UPLOAD_NAME.value}__placeholder`]: !inputName.value }];
    });

    const classes = computed(() => {
      return [`${UPLOAD_NAME.value}__single`, `${UPLOAD_NAME.value}__single-${props.theme}`];
    });

    const renderProgress = () => {
      if (props.loadingFile.status === 'fail') {
        return <ErrorCircleFilledIcon />;
      }

      if (props.showUploadProgress) {
        return (
          <div class={`${UPLOAD_NAME.value}__single-progress`}>
            <TLoading />
            <span class={`${UPLOAD_NAME.value}__single-percent`}>{Math.min(props.loadingFile.percent, 99)}%</span>
          </div>
        );
      }
    };

    // 文本型预览
    const renderFilePreviewAsText = () => {
      if (!inputName.value || props.theme !== 'file') return;
      return (
        <div class={`${UPLOAD_NAME.value}__single-display-text ${UPLOAD_NAME.value}__display-text--margin`}>
          <span class={`${UPLOAD_NAME.value}__single-name`}>{inputName.value}</span>
          {showProgress.value ? (
            renderProgress()
          ) : (
            <CloseCircleFilledIcon
              class={`${UPLOAD_NAME.value}__icon-delete`}
              onClick={({ e }: { e: MouseEvent }) => props.onRemove(e)}
            />
          )}
        </div>
      );
    };

    // 输入框型预览
    const renderFilePreviewAsInput = () => {
      if (props.theme !== 'file-input') return;
      const renderResult = () => {
        if (!!props.loadingFile && props.loadingFile.status === 'fail') {
          return <ErrorCircleFilledIcon />;
        }
        if (props.file && props.file.name && !props.loadingFile) {
          return <CheckCircleFilledIcon />;
        }
        return '';
      };

      return (
        <div class={`${UPLOAD_NAME.value}__single-input-preview ${prefix.value}-input`}>
          <div class={inputTextClass.value}>
            {<span class={`${UPLOAD_NAME.value}__single-input-text`}>{abridgeName(inputText.value, 4, 6)}</span>}
            {showProgress.value && renderProgress()}
            {renderResult()}
          </div>
        </div>
      );
    };

    return {
      classes,
      renderFilePreviewAsInput,
      renderFilePreviewAsText,
    };
  },

  render() {
    return (
      <div class={this.classes}>
        {this.renderFilePreviewAsInput()}
        {renderTNodeJSX(this, 'default')}
        {this.renderFilePreviewAsText()}
      </div>
    );
  },
});
