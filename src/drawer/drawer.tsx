import { computed, defineComponent, nextTick, onUpdated, ref, watch } from 'vue';
import { CloseIcon } from 'tdesign-icons-vue-next';
import { useConfig, usePrefixClass } from '../hooks/useConfig';
import { isServer, addClass, removeClass } from '../utils/dom';
import props from './props';
import { DrawerCloseContext } from './type';
import TransferDom from '../utils/transfer-dom';
import { useAction } from '../dialog/hooks';
import { useTNodeJSX, useContent } from '../hooks/tnode';
import { useDrag } from './hooks';

export default defineComponent({
  name: 'TDrawer',
  directives: {
    TransferDom,
  },
  props,
  emits: ['update:visible'],
  setup(props, context) {
    const destroyOnCloseVisible = ref(false);
    const isVisible = ref(false);
    const { global } = useConfig('drawer');
    const renderTNodeJSX = useTNodeJSX();
    const renderContent = useContent();
    const COMPONENT_NAME = usePrefixClass('drawer');
    const LOCK_CLASS = usePrefixClass('drawer--lock');
    const { draggedSizeValue, enableDrag, draggableLineStyles } = useDrag(props);

    const confirmBtnAction = (e: MouseEvent) => {
      props.onConfirm?.({ e });
    };
    const cancelBtnAction = (e: MouseEvent) => {
      props.onCancel?.({ e });
      closeDrawer({ trigger: 'cancel', e });
    };
    const { getConfirmBtn, getCancelBtn } = useAction({ confirmBtnAction, cancelBtnAction });
    const drawerEle = ref<HTMLElement | null>(null);
    const drawerClasses = computed(() => {
      return [
        COMPONENT_NAME.value,
        `${COMPONENT_NAME.value}--${props.placement}`,
        {
          [`${COMPONENT_NAME.value}--open`]: isVisible.value,
          [`${COMPONENT_NAME.value}--attach`]: props.showInAttachedElement,
          [`${COMPONENT_NAME.value}--without-mask`]: !props.showOverlay,
        },
      ];
    });

    const sizeValue = computed(() => {
      if (draggedSizeValue.value) return draggedSizeValue.value;

      const size = props.size ?? global.value.size;
      const defaultSize = isNaN(Number(size)) ? size : `${size}px`;
      return (
        {
          small: '300px',
          medium: '500px',
          large: '760px',
        }[size] || defaultSize
      );
    });
    const wrapperStyles = computed(() => {
      return {
        // 用于抵消动画效果：transform: translateX(100%); 等
        transform: isVisible.value ? 'translateX(0)' : undefined,
        width: ['left', 'right'].includes(props.placement) ? sizeValue.value : '',
        height: ['top', 'bottom'].includes(props.placement) ? sizeValue.value : '',
      };
    });

    const wrapperClasses = computed(() => {
      return [
        `${COMPONENT_NAME.value}__content-wrapper`,
        `${COMPONENT_NAME.value}__content-wrapper--${props.placement}`,
      ];
    });

    const parentNode = computed<HTMLElement>(() => {
      return drawerEle.value && (drawerEle.value.parentNode as HTMLElement);
    });

    const modeAndPlacement = computed<string>(() => {
      return [props.mode, props.placement].join();
    });

    const footerStyle = computed(() => {
      return {
        display: 'flex',
        justifyContent: props.placement === 'right' ? 'flex-start' : 'flex-end',
      };
    });
    const handlePushMode = () => {
      if (props.mode !== 'push') return;
      nextTick(() => {
        if (!parentNode.value) return;
        parentNode.value.style.cssText = 'transition: margin 300ms cubic-bezier(0.7, 0.3, 0.1, 1) 0s;';
      });
    };
    // push 动画效果处理
    const updatePushMode = () => {
      if (!parentNode.value) return;
      if (props.mode !== 'push' || !parentNode.value) return;
      const marginStr = {
        left: `margin: 0 0 0 ${sizeValue.value}`,
        right: `margin: 0 0 0 -${sizeValue.value}`,
        top: `margin: ${sizeValue.value} 0 0 0`,
        bottom: `margin: -${sizeValue.value} 0 0 0`,
      }[props.placement];
      if (isVisible.value) {
        parentNode.value.style.cssText += marginStr;
      } else {
        parentNode.value.style.cssText = parentNode.value.style.cssText.replace(/margin:.+;/, '');
      }
    };

    // locale 全局配置，插槽，props，默认值，决定了按钮最终呈现
    const getDefaultFooter = () => {
      // this.getConfirmBtn is a function of useAction
      const confirmBtn = getConfirmBtn({
        confirmBtn: props.confirmBtn,
        globalConfirm: global.value.confirm,
        className: `${COMPONENT_NAME.value}__confirm`,
      });
      // this.getCancelBtn is a function of useAction
      const cancelBtn = getCancelBtn({
        cancelBtn: props.cancelBtn,
        globalCancel: global.value.cancel,
        className: `${COMPONENT_NAME.value}__cancel`,
      });
      return (
        <div style={footerStyle.value}>
          {props.placement === 'right' ? confirmBtn : null}
          {cancelBtn}
          {props.placement !== 'right' ? confirmBtn : null}
        </div>
      );
    };
    watch(
      modeAndPlacement,
      () => {
        handlePushMode();
      },
      { immediate: true },
    );
    watch(
      () => props.visible,
      (value) => {
        if (isServer) return;
        if (value && !props.showInAttachedElement) {
          props.preventScrollThrough && addClass(document.body, LOCK_CLASS.value);
        } else {
          props.preventScrollThrough && removeClass(document.body, LOCK_CLASS.value);
        }

        // 处理显示逻辑
        if (props.destroyOnClose) {
          if (value) {
            destroyOnCloseVisible.value = false;
            setTimeout(() => {
              isVisible.value = true;
            });
          } else {
            isVisible.value = false;
            setTimeout(() => {
              destroyOnCloseVisible.value = true;
            }, 200);
          }
        } else if (destroyOnCloseVisible.value === true && value) {
          destroyOnCloseVisible.value = false;
          setTimeout(() => {
            isVisible.value = true;
          });
        } else {
          isVisible.value = value;
        }
      },
      { immediate: true },
    );
    const handleCloseBtnClick = (e: MouseEvent) => {
      props.onCloseBtnClick?.({ e });
      closeDrawer({ trigger: 'close-btn', e });
    };
    const handleWrapperClick = (e: MouseEvent) => {
      props.onOverlayClick?.({ e });
      if (props.closeOnOverlayClick ?? global.value.closeOnOverlayClick) {
        closeDrawer({ trigger: 'overlay', e });
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      // 根据closeOnEscKeydown判断按下ESC时是否触发close事件
      if ((props.closeOnEscKeydown ?? global.value.closeOnEscKeydown) && e.key === 'Escape') {
        props.onEscKeydown?.({ e });
        closeDrawer({ trigger: 'esc', e });
      }
    };
    const closeDrawer = (params: DrawerCloseContext) => {
      props.onClose?.(params);
      context.emit('update:visible', false);
    };

    onUpdated(() => {
      updatePushMode();
    });

    return () => {
      if (destroyOnCloseVisible.value) return;
      const body = renderContent('body', 'default');
      const headerContent = renderTNodeJSX('header');
      const defaultFooter = getDefaultFooter();
      return (
        <div
          ref={drawerEle}
          class={drawerClasses.value}
          style={{ zIndex: props.zIndex }}
          onKeydown={onKeyDown}
          v-transfer-dom={props.attach}
          tabindex={0}
        >
          {props.showOverlay && <div class={`${COMPONENT_NAME.value}__mask`} onClick={handleWrapperClick} />}
          <div class={wrapperClasses.value} style={wrapperStyles.value}>
            {headerContent && <div class={`${COMPONENT_NAME.value}__header`}>{headerContent}</div>}
            {props.closeBtn && (
              <div class={`${COMPONENT_NAME.value}__close-btn`} onClick={handleCloseBtnClick}>
                {renderTNodeJSX('closeBtn', <CloseIcon />)}
              </div>
            )}
            <div class={[`${COMPONENT_NAME.value}__body`, 'narrow-scrollbar']}>{body}</div>
            {props.footer && (
              <div class={`${COMPONENT_NAME.value}__footer`}>{renderTNodeJSX('footer', defaultFooter)}</div>
            )}
            {props.sizeDraggable && <div style={draggableLineStyles.value} onMousedown={enableDrag}></div>}
          </div>
        </div>
      );
    };
  },
});
