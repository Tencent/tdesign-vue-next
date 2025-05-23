import { computed, defineComponent, ref, toRefs } from 'vue';
import {
  CloseIcon as TdCloseIcon,
  InfoCircleFilledIcon as TdInfoCircleFilledIcon,
  CheckCircleFilledIcon as TdCheckCircleFilledIcon,
  ErrorCircleFilledIcon as TdErrorCircleFilledIcon,
} from 'tdesign-icons-vue-next';
import dialogCardProps from './dialog-card-props';
import { useGlobalIcon } from '@tdesign/hooks';
import { useConfig, usePrefixClass } from '@tdesign/hooks';
import { useAction } from './hooks';
import { useContent, useTNodeJSX } from '@tdesign/hooks';
import type { TdDialogProps } from './type';
import dialogProps from './props';
import { getCSSValue, initDragEvent } from './utils';

export default defineComponent({
  name: 'TDialogCard',
  // 注册v-draggable指令,传入true时候初始化拖拽事件
  directives: {
    draggable(el, binding) {
      // el 指令绑定的元素
      if (el && binding && binding.value) {
        initDragEvent(el);
      }
    },
  },
  props: {
    ...dialogProps,
    ...dialogCardProps,
  },
  setup(props, { expose }) {
    const rootRef = ref<HTMLElement | null>(null);
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
    const closeBtnAction = (e: MouseEvent) => props?.onCloseBtnClick?.({ e });
    const onStopDown = (e: MouseEvent) => {
      if (isModeLess.value && props?.draggable) e.stopPropagation();
    };

    const resetPosition = () => {
      if (!rootRef.value && isModeLess.value && props.draggable) return;
      rootRef.value.style.position = 'relative';
      rootRef.value.style.left = 'unset';
      rootRef.value.style.top = 'unset';
    };

    // 暴露给父组件的接口
    expose({
      $el: rootRef,
      resetPosition,
    });

    const dialogClass = computed(() => {
      const dialogClass = [
        `${COMPONENT_NAME.value}`,
        `${COMPONENT_NAME.value}__modal-${props.theme}`,
        isModeLess.value && props.draggable && `${COMPONENT_NAME.value}--draggable`,
        props.dialogClassName,
      ];

      if (isFullScreen.value) {
        dialogClass.push(`${COMPONENT_NAME.value}__fullscreen`);
      } else {
        dialogClass.push(...[`${COMPONENT_NAME.value}--default`, `${COMPONENT_NAME.value}--${props.placement}`]);
      }
      return dialogClass;
    });
    const dialogStyle = computed(() => {
      return !isFullScreen.value ? { width: getCSSValue(props.width), ...props.dialogStyle } : { ...props.dialogStyle }; // width全屏模式不生效
    });

    const renderCard = () => {
      const confirmBtnLoading = computed(() => {
        // @ts-ignore
        return confirmBtn.value?.loading || confirmLoading.value;
      });
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
            confirmLoading: confirmBtnLoading.value,
          })}
        </div>
      );

      const footerContent = renderTNodeJSX('footer', defaultFooter);

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
        const footerClassName = isFullScreen.value
          ? [`${COMPONENT_NAME.value}__footer`, `${COMPONENT_NAME.value}__footer--fullscreen`]
          : `${COMPONENT_NAME.value}__footer`;

        return (
          footerContent && (
            <div class={footerClassName} onMousedown={onStopDown}>
              {footerContent}
            </div>
          )
        );
      };

      return (
        <>
          {renderHeader()}
          {renderBody()}
          {!!props.footer && renderFooter()}
        </>
      );
    };

    return () => (
      <div
        key="dialog"
        ref={rootRef}
        class={dialogClass.value}
        style={dialogStyle.value}
        v-draggable={isModeLess.value && props.draggable}
      >
        {renderCard()}
      </div>
    );
  },
});
