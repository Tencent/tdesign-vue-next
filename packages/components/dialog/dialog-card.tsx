import { computed, defineComponent, ref, toRefs } from 'vue';
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
import { GetCSSValue } from './hooks';

function InitDragEvent(dragBox: HTMLElement) {
  const target = dragBox;
  const windowInnerWidth = window.innerWidth || document.documentElement.clientWidth;
  const windowInnerHeight = window.innerHeight || document.documentElement.clientHeight;
  target.addEventListener('mousedown', (targetEvent: MouseEvent) => {
    // 算出鼠标相对元素的位置
    const disX = targetEvent.clientX - target.offsetLeft;
    const disY = targetEvent.clientY - target.offsetTop;
    const dialogW = target.offsetWidth;
    const dialogH = target.offsetHeight;
    // 如果弹出框超出屏幕范围 不能进行拖拽
    if (dialogW > windowInnerWidth || dialogH > windowInnerHeight) return;
    function mouseMoverHandler(documentEvent: MouseEvent) {
      // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
      let left = documentEvent.clientX - disX;
      let top = documentEvent.clientY - disY;
      // 临界判断
      // 拖拽上左边界限制
      if (left < 0) left = 0;
      if (top < 0) top = 0;
      if (windowInnerWidth - target.offsetWidth - left < 0) left = windowInnerWidth - target.offsetWidth;
      if (windowInnerHeight - target.offsetHeight - top < 0) top = windowInnerHeight - target.offsetHeight;
      target.style.position = 'absolute';
      target.style.left = `${left}px`;
      target.style.top = `${top}px`;
    }
    function mouseUpHandler() {
      // 鼠标弹起来的时候不再移动
      document.removeEventListener('mousemove', mouseMoverHandler);
      // 预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
      document.removeEventListener('mouseup', mouseUpHandler);
    }
    // 元素按下时注册document鼠标监听事件
    document.addEventListener('mousemove', mouseMoverHandler);
    // 鼠标弹起来移除document鼠标监听事件
    document.addEventListener('mouseup', mouseUpHandler);
    // 拖拽结束移除鼠标监听事件，解决文字拖拽结束事件未解绑问题
    document.addEventListener('dragend', mouseUpHandler);
  });
}

export default defineComponent({
  name: 'TDialogCard',
  // 注册v-draggable指令,传入true时候初始化拖拽事件
  directives: {
    draggable(el, binding) {
      // el 指令绑定的元素
      if (el && binding && binding.value) {
        InitDragEvent(el);
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
      return !isFullScreen.value ? { width: GetCSSValue(props.width), ...props.dialogStyle } : { ...props.dialogStyle }; // width全屏模式不生效
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
        <div>
          {renderHeader()}
          {renderBody()}
          {!!props.footer && renderFooter()}
        </div>
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
