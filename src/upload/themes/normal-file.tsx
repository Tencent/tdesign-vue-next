import { defineComponent, toRefs, h } from 'vue';
import {
  CloseIcon as TdCloseIcon,
  TimeFilledIcon as TdTimeFilledIcon,
  CheckCircleFilledIcon as TdCheckCircleFilledIcon,
  ErrorCircleFilledIcon as TdErrorCircleFilledIcon,
  CloseCircleFilledIcon as TdCloseCircleFilledIcon,
} from 'tdesign-icons-vue-next';
import TLoading from '../../loading';
import Link from '../../link';
import { useTNodeJSX } from '../../hooks/tnode';
import { UploadFile } from '../type';
import { abridgeName } from '../../_common/js/upload/utils';
import { useGlobalIcon } from '../../hooks/useGlobalIcon';
import { CommonDisplayFileProps, commonProps } from '../interface';

export interface NormalFileProps extends CommonDisplayFileProps {
  multiple: boolean;
}

const NormalFile = defineComponent({
  name: 'UploadNormalFile',

  props: {
    multiple: Boolean,
    ...commonProps,
  },

  setup(props: NormalFileProps, { slots }) {
    const { theme, disabled, classPrefix, locale } = toRefs(props);

    const { CloseIcon, TimeFilledIcon, CheckCircleFilledIcon, ErrorCircleFilledIcon, CloseCircleFilledIcon } =
      useGlobalIcon({
        CloseIcon: TdCloseIcon,
        TimeFilledIcon: TdTimeFilledIcon,
        CheckCircleFilledIcon: TdCheckCircleFilledIcon,
        ErrorCircleFilledIcon: TdErrorCircleFilledIcon,
        CloseCircleFilledIcon: TdCloseCircleFilledIcon,
      });

    const renderTNodeJSX = useTNodeJSX();

    const uploadPrefix = `${classPrefix.value}-upload`;

    const renderProgress = (percent: number) => (
      <div class={`${uploadPrefix}__single-progress`}>
        <TLoading />
        <span class={`${uploadPrefix}__single-percent`}>{percent || 0}%</span>
      </div>
    );

    // 文本型预览
    const renderFilePreviewAsText = (files: UploadFile[]) => {
      if (theme.value !== 'file') return null;
      if (!props.multiple && files[0]?.status === 'fail') {
        return null;
      }
      return files.map((file, index) => (
        <div
          class={`${uploadPrefix}__single-display-text ${uploadPrefix}__display-text--margin`}
          key={file.name + index}
        >
          {file.url ? (
            <Link href={file.url} target="_blank" hover="color" size="small" class={`${uploadPrefix}__single-name`}>
              {file.name}
            </Link>
          ) : (
            <span class={`${uploadPrefix}__single-name`}>{file.name}</span>
          )}
          {file.status === 'fail' && (
            <div class={`${uploadPrefix}__flow-status`}>
              <ErrorCircleFilledIcon />
            </div>
          )}
          {file.status === 'waiting' && (
            <div class={`${uploadPrefix}__flow-status`}>
              <TimeFilledIcon />
            </div>
          )}
          {file.status === 'progress' && renderProgress(file.percent)}
          {!disabled.value && file.status !== 'progress' && (
            <CloseIcon class={`${uploadPrefix}__icon-delete`} onClick={(e) => props.onRemove({ e, file, index })} />
          )}
        </div>
      ));
    };

    // 输入框型预览
    const renderFilePreviewAsInput = () => {
      if (theme.value !== 'file-input') return;
      const file = props.displayFiles[0];
      const inputTextClass = [
        `${classPrefix.value}-input__inner`,
        { [`${uploadPrefix}__placeholder`]: !props.displayFiles[0] },
      ];
      const disabledClass = disabled.value ? `${classPrefix.value}-is-disabled` : '';
      return (
        <div class={`${uploadPrefix}__single-input-preview ${classPrefix.value}-input ${disabledClass}`}>
          <div class={inputTextClass}>
            <span class={`${uploadPrefix}__single-input-text`}>
              {file?.name ? abridgeName(file.name, 4, 6) : props.placeholder}
            </span>
            {file?.status === 'progress' && renderProgress(file.percent)}
            {file?.status === 'waiting' && <TimeFilledIcon class={`${uploadPrefix}__status-icon`} />}
            {file?.url && file.status === 'success' && <CheckCircleFilledIcon class={`${uploadPrefix}__status-icon`} />}
            {file?.name && file.status === 'fail' && <ErrorCircleFilledIcon class={`${uploadPrefix}__status-icon`} />}
            {!disabled.value && (
              <CloseCircleFilledIcon
                class={`${uploadPrefix}__single-input-clear`}
                onClick={({ e }: { e: MouseEvent }) => props.onRemove({ e, file, index: 0 })}
              />
            )}
          </div>
        </div>
      );
    };

    return () => {
      const classes = [`${uploadPrefix}__single`, `${uploadPrefix}__single-${theme}`];
      const fileListDisplay = renderTNodeJSX('fileListDisplay', { params: { files: props.displayFiles } });
      const { displayFiles } = props;
      return (
        <div class={classes}>
          {theme.value === 'file-input' && renderFilePreviewAsInput()}

          {slots.default?.()}

          {props.tips && (
            <small class={[props.tipsClasses, { [`${classPrefix.value}-upload__tips-${props.status}`]: props.status }]}>
              {props.tips}
            </small>
          )}

          {theme.value === 'file' && props.placeholder && !displayFiles[0] && (
            <small class={props.tipsClasses}>{props.placeholder}</small>
          )}

          {fileListDisplay || renderFilePreviewAsText(displayFiles)}

          {props.sizeOverLimitMessage && <small class={props.errorClasses}>{props.sizeOverLimitMessage}</small>}

          {/* 单文件上传失败要显示失败的原因 */}
          {!props.multiple && displayFiles[0]?.status === 'fail' ? (
            <small class={props.errorClasses}>
              {displayFiles[0].response?.error || locale.value.progress.failText}
            </small>
          ) : null}
        </div>
      );
    };
  },
});

export default NormalFile;
