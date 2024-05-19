import { computed, defineComponent, toRefs } from '@td/adapter-vue';
import {
  CheckCircleFilledIcon as TdCheckCircleFilledIcon,
  CloseCircleFilledIcon as TdCloseCircleFilledIcon,
  CloseIcon as TdCloseIcon,
  ErrorCircleFilledIcon as TdErrorCircleFilledIcon,
  TimeFilledIcon as TdTimeFilledIcon,
} from 'tdesign-icons-vue-next';
import TLoading from '../../loading';
import Link from '../../link';
import { useTNodeJSX } from '../../hooks/tnode';
import type { UploadFile } from '../type';
import { abridgeName } from '../../_common/js/upload/utils';
import { useGlobalIcon } from '../../hooks/useGlobalIcon';
import type { CommonDisplayFileProps } from '../interface';
import { commonProps } from '../constants';
import type { UploadConfig } from '../../config-provider';

export interface NormalFileProps extends CommonDisplayFileProps {
  multiple: boolean;
}

const NormalFile = defineComponent({
  name: 'UploadNormalFile',

  props: {
    multiple: Boolean,
    ...commonProps,
  },

  setup(props, { slots }) {
    const { theme, disabled, classPrefix } = toRefs(props);

    const locale = computed(() => props.locale as UploadConfig);

    const { CloseIcon, TimeFilledIcon, CheckCircleFilledIcon, ErrorCircleFilledIcon, CloseCircleFilledIcon }
      = useGlobalIcon({
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
        {props.showUploadProgress && (
          <span class={`${uploadPrefix}__single-percent`}>
            {percent || 0}
            %
          </span>
        )}
      </div>
    );

    // 文本型预览
    const renderFilePreviewAsText = (files: UploadFile[]) => {
      if (theme.value !== 'file') {
        return null;
      }
      if (!props.multiple && files[0]?.status === 'fail' && props.autoUpload) {
        return null;
      }
      return files.map((file, index) => {
        const fileName = props.abridgeName && file.name ? abridgeName(file.name, ...props.abridgeName) : file.name;
        return (
          <div
            class={`${uploadPrefix}__single-display-text ${uploadPrefix}__display-text--margin`}
            key={file.name + index + file.percent + file.status}
          >
            {file.url
              ? (
                <Link href={file.url} target="_blank" hover="color" size="small" class={`${uploadPrefix}__single-name`}>
                  {fileName}
                </Link>
                )
              : (
                <span class={`${uploadPrefix}__single-name`}>{fileName}</span>
                )}
            {file.status === 'fail' && (
              <div class={`${uploadPrefix}__flow-status ${uploadPrefix}__file-fail`}>
                <ErrorCircleFilledIcon />
              </div>
            )}
            {file.status === 'waiting' && (
              <div class={`${uploadPrefix}__flow-status ${uploadPrefix}__file-waiting`}>
                <TimeFilledIcon />
              </div>
            )}
            {file.status === 'progress' && renderProgress(file.percent)}
            {!disabled.value && file.status !== 'progress' && (
              <CloseIcon
                class={`${uploadPrefix}__icon-delete`}
                onClick={({ e }: { e: MouseEvent }) => props.onRemove({ e, file, index })}
              />
            )}
          </div>
        );
      });
    };

    // 输入框型预览
    const renderFilePreviewAsInput = () => {
      if (theme.value !== 'file-input') {
        return;
      }
      const file: UploadFile = props.displayFiles[0] || [];
      const inputTextClass = [
        `${classPrefix.value}-input__inner`,
        { [`${uploadPrefix}__placeholder`]: !props.displayFiles[0] },
      ];
      const disabledClass = disabled.value ? `${classPrefix.value}-is-disabled` : '';
      const fileName
        = props.abridgeName?.length && file?.name ? abridgeName(file.name, ...props.abridgeName) : file?.name;
      return (
        <div class={`${uploadPrefix}__single-input-preview ${classPrefix.value}-input ${disabledClass}`}>
          <div class={inputTextClass}>
            <span
              class={[
                `${uploadPrefix}__single-input-text`,
                { [props.placeholderClass]: props.placeholder && !file?.name },
              ]}
            >
              {file?.name ? fileName : props.placeholder}
            </span>
            {file?.status === 'progress' && renderProgress(file.percent)}
            {file?.status === 'waiting' && (
              <TimeFilledIcon class={`${uploadPrefix}__status-icon ${uploadPrefix}__file-waiting`} />
            )}
            {file.status === 'success' && <CheckCircleFilledIcon class={`${uploadPrefix}__status-icon`} />}
            {file?.name && file.status === 'fail' && (
              <ErrorCircleFilledIcon class={`${uploadPrefix}__status-icon ${uploadPrefix}__file-fail`} />
            )}
            {Boolean(!disabled.value && file.name) && (
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
      const classes = [`${uploadPrefix}__single`, `${uploadPrefix}__single-${theme.value}`];
      let fileListDisplay = renderTNodeJSX('fileListDisplay', {
        params: {
          onRemove: props.onRemove,
          toUploadFiles: props.toUploadFiles,
          sizeOverLimitMessage: props.sizeOverLimitMessage,
          locale: props.locale,
          files: props.displayFiles,
        },
      });
      if (props.fileListDisplay === null || fileListDisplay === null) {
        fileListDisplay = null;
      }

      const { displayFiles } = props;

      return (
        <div class={classes}>
          {theme.value === 'file-input' && renderFilePreviewAsInput()}

          {slots.default?.()}

          {theme.value === 'file' && props.placeholder && !displayFiles[0] && (
            <small class={[props.tipsClasses, props.placeholderClass]}>{props.placeholder}</small>
          )}

          {fileListDisplay === null ? null : fileListDisplay || renderFilePreviewAsText(displayFiles)}

          {/* 单文件上传失败要显示失败的原因 */}
          {!props.multiple && displayFiles[0]?.status === 'fail' && theme.value === 'file'
            ? (
              <small class={[props.errorClasses, props.placeholderClass]}>
                {displayFiles[0].response?.error || locale.value.progress.failText}
              </small>
              )
            : null}
        </div>
      );
    };
  },
});

export default NormalFile;
