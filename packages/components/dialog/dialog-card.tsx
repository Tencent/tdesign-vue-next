import { computed, defineComponent, toRefs } from 'vue';
import {
  CloseIcon as TdCloseIcon,
  InfoCircleFilledIcon as TdInfoCircleFilledIcon,
  CheckCircleFilledIcon as TdCheckCircleFilledIcon,
  ErrorCircleFilledIcon as TdErrorCircleFilledIcon,
} from 'tdesign-icons-vue-next';
import dialogCardProps from './dialog-card-props';
import { useGlobalIcon } from '../hooks/useGlobalIcon';
import { useConfig, usePrefixClass } from '../hooks/useConfig';
import { useAction } from './hooks';
import { useContent, useTNodeJSX } from '../hooks/tnode';
import type { TdDialogProps } from './type';
import dialogProps from './props';

export default defineComponent({
  name: 'TDialogCard',
  props: {
    ...dialogProps,
    ...dialogCardProps,
  },
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('dialog');
    const classPrefix = usePrefixClass();
    const renderTNodeJSX = useTNodeJSX();
    const renderContent = useContent();
    const { globalConfig } = useConfig('dialog');
    const { CloseIcon, InfoCircleFilledIcon, CheckCircleFilledIcon, ErrorCircleFilledIcon } = useGlobalIcon({
      CloseIcon: TdCloseIcon,
      InfoCircleFilledIcon: TdInfoCircleFilledIcon,
      CheckCircleFilledIcon: TdCheckCircleFilledIcon,
      ErrorCircleFilledIcon: TdErrorCircleFilledIcon,
    });
    const { cancelBtn, confirmBtn, confirmLoading } = toRefs(props);

    const confirmBtnAction = (e: MouseEvent) => props.onConfirm?.({ e });
    const cancelBtnAction = (e: MouseEvent) => props.onCancel?.({ e });
    const { getConfirmBtn, getCancelBtn } = useAction({ confirmBtnAction, cancelBtnAction });
    // 是否非模态对话框
    const isModeLess = computed(() => props.mode === 'modeless');
    // 是否全屏对话框
    const isFullScreen = computed(() => props.mode === 'full-screen');

    const defaultFooter = (
      <div>
        {getCancelBtn({
          cancelBtn: cancelBtn.value as TdDialogProps['cancelBtn'],
          globalCancel: globalConfig.value.cancel,
          className: `${COMPONENT_NAME.value}__cancel`,
        })}
        {getConfirmBtn({
          theme: props?.theme,
          confirmBtn: confirmBtn.value as TdDialogProps['confirmBtn'],
          globalConfirm: globalConfig.value.confirm,
          globalConfirmBtnTheme: globalConfig.value.confirmBtnTheme,
          className: `${COMPONENT_NAME.value}__confirm`,
          confirmLoading: confirmLoading.value,
        })}
      </div>
    );

    const footerContent = renderTNodeJSX('footer', defaultFooter);

    const footerClassName = isFullScreen.value
      ? [`${COMPONENT_NAME.value}__footer`, `${COMPONENT_NAME.value}__footer--fullscreen`]
      : `${COMPONENT_NAME.value}__footer`;

    const closeBtnAction = (e: MouseEvent) => props?.onCloseBtnClick?.({ e });

    const onStopDown = (e: MouseEvent) => {
      if (isModeLess.value && props?.draggable) e.stopPropagation();
    };

    const renderHeader = () => {
      // header 值为 true 显示空白头部
      const header = renderTNodeJSX('header', <h5 class="title"></h5>) ?? false;
      const headerClassName = isFullScreen.value
        ? [`${COMPONENT_NAME.value}__header`, `${COMPONENT_NAME.value}__header--fullscreen`]
        : `${COMPONENT_NAME.value}__header`;

      const closeClassName = isFullScreen.value
        ? [`${COMPONENT_NAME.value}__close`, `${COMPONENT_NAME.value}__close--fullscreen`]
        : `${COMPONENT_NAME.value}__close`;
      const getIcon = () => {
        const icon = {
          info: <InfoCircleFilledIcon class={`${classPrefix.value}-is-info`} />,
          warning: <ErrorCircleFilledIcon class={`${classPrefix.value}-is-warning`} />,
          danger: <ErrorCircleFilledIcon class={`${classPrefix.value}-is-error`} />,
          success: <CheckCircleFilledIcon class={`${classPrefix.value}-is-success`} />,
        };
        return icon[props?.theme as keyof typeof icon];
      };
      return (
        (header || props?.closeBtn) && (
          <div class={headerClassName} onMousedown={onStopDown}>
            <div class={`${COMPONENT_NAME.value}__header-content`}>
              {getIcon()}
              {header}
            </div>

            {props?.closeBtn ? (
              <span class={closeClassName} onClick={closeBtnAction}>
                {renderTNodeJSX('closeBtn', <CloseIcon />)}
              </span>
            ) : null}
          </div>
        )
      );
    };

    const renderBody = () => {
      const body = renderContent('default', 'body');
      const bodyClassName =
        props?.theme === 'default' ? [`${COMPONENT_NAME.value}__body`] : [`${COMPONENT_NAME.value}__body__icon`];
      if (isFullScreen.value && footerContent) {
        bodyClassName.push(`${COMPONENT_NAME.value}__body--fullscreen`);
      } else if (isFullScreen.value) {
        bodyClassName.push(`${COMPONENT_NAME.value}__body--fullscreen--without-footer`);
      }
      return (
        <div class={bodyClassName} onMousedown={onStopDown}>
          {body}
        </div>
      );
    };

    const renderFooter = () => {
      return (
        footerContent && (
          <div class={footerClassName} onMousedown={onStopDown}>
            {footerContent}
          </div>
        )
      );
    };

    return () => (
      <>
        {renderHeader()}
        {renderBody()}
        {!!props.footer && renderFooter()}
      </>
    );
  },
});
