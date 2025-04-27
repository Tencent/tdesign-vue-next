import { onBeforeUnmount, onMounted, computed, defineComponent, nextTick, onUpdated, ref, watch, Teleport } from 'vue';
import { CloseIcon as TdCloseIcon } from 'tdesign-icons-vue-next';
import { useConfig, usePrefixClass } from '../hooks/useConfig';
import { useGlobalIcon } from '../hooks/useGlobalIcon';
import { isServer } from '../utils/dom';
import { getScrollbarWidth } from '@tdesign/common-js/utils/getScrollbarWidth';
import props from './props';
import { DrawerCloseContext } from './type';
import { useAction } from '../dialog/hooks';
import { useTNodeJSX, useContent } from '../hooks/tnode';
import { useDrag } from './hooks';
import type { TdDrawerProps } from './type';
import useTeleport from '../hooks/useTeleport';

let key = 1;

export default defineComponent({
  name: 'TDrawer',
  inheritAttrs: false,
  props,
  emits: ['update:visible'],
  setup(props, context) {
    const destroyOnCloseVisible = ref(false);
    const firstAlreadyRender = ref(false);
    const isVisible = ref(false);
    const drawerEle = ref<HTMLElement | null>(null);
    const styleEl = ref<HTMLStyleElement | null>(null);
    const styleTimer = ref<ReturnType<typeof setTimeout>>();
    const { globalConfig } = useConfig('drawer');
    const COMPONENT_NAME = usePrefixClass('drawer');
    const { CloseIcon } = useGlobalIcon({ CloseIcon: TdCloseIcon });
    const renderTNodeJSX = useTNodeJSX();
    const renderContent = useContent();
    const { draggedSizeValue, enableDrag, draggableLineStyles, draggingStyles } = useDrag(props as TdDrawerProps);
    const teleportElement = useTeleport(() => props.attach);
    const { getConfirmBtn, getCancelBtn } = useAction({
      confirmBtnAction: (e: MouseEvent) => props.onConfirm?.({ e }),
      cancelBtnAction: (e: MouseEvent) => {
        props.onCancel?.({ e });
        closeDrawer({ trigger: 'cancel', e });
      },
    });

    // 计算属性
    const sizeValue = computed(() => {
      if (draggedSizeValue.value) return draggedSizeValue.value;
      const size = props.size ?? globalConfig.value.size;
      const defaultSize = isNaN(Number(size)) ? size : `${size}px`;
      return (
        {
          small: '300px',
          medium: '500px',
          large: '760px',
        }[size] || defaultSize
      );
    });
    const drawerClasses = computed(() => [
      COMPONENT_NAME.value,
      `${COMPONENT_NAME.value}--${props.placement}`,
      {
        [`${COMPONENT_NAME.value}--open`]: isVisible.value,
        [`${COMPONENT_NAME.value}--attach`]: props.showInAttachedElement,
        [`${COMPONENT_NAME.value}--without-mask`]: !props.showOverlay,
      },
      props?.drawerClassName,
    ]);
    const wrapperStyles = computed(() => ({
      transform: isVisible.value ? 'translateX(0)' : undefined,
      width: ['left', 'right'].includes(props.placement) ? sizeValue.value : '',
      height: ['top', 'bottom'].includes(props.placement) ? sizeValue.value : '',
    }));
    const wrapperClasses = computed(() => [
      `${COMPONENT_NAME.value}__content-wrapper`,
      `${COMPONENT_NAME.value}__content-wrapper--${props.placement}`,
    ]);
    const parentNode = computed<HTMLElement | null>(() => drawerEle.value?.parentNode as HTMLElement);
    const modeAndPlacement = computed<string>(() => [props.mode, props.placement].join());
    const footerStyle = computed(() => ({
      display: 'flex',
      justifyContent: props.placement === 'right' ? 'flex-start' : 'flex-end',
    }));

    // 事件处理函数
    const handleEscKeydown = (e: KeyboardEvent) => {
      if ((props.closeOnEscKeydown ?? globalConfig.value.closeOnEscKeydown) && e.key === 'Escape' && isVisible.value) {
        props.onEscKeydown?.({ e });
        closeDrawer({ trigger: 'esc', e });
      }
    };
    const handleCloseBtnClick = (e: MouseEvent) => {
      props.onCloseBtnClick?.({ e });
      closeDrawer({ trigger: 'close-btn', e });
    };
    const handleWrapperClick = (e: MouseEvent) => {
      props.onOverlayClick?.({ e });
      if (props.closeOnOverlayClick ?? globalConfig.value.closeOnOverlayClick) {
        closeDrawer({ trigger: 'overlay', e });
      }
    };

    // 抽屉显示/隐藏逻辑
    const showDrawer = () => {
      destroyOnCloseVisible.value = false;
      setTimeout(() => {
        isVisible.value = true;
      });
    };
    const hideDrawer = () => {
      isVisible.value = false;
      setTimeout(() => {
        destroyOnCloseVisible.value = true;
      }, 200);
    };
    const closeDrawer = (params: DrawerCloseContext) => {
      props.onClose?.(params);
      context.emit('update:visible', false);
    };

    // push 模式相关处理
    const handlePushMode = () => {
      if (props.mode !== 'push') return;
      nextTick(() => {
        parentNode.value &&
          (parentNode.value.style.cssText = 'transition: margin 300ms cubic-bezier(0.7, 0.3, 0.1, 1) 0s;');
      });
    };
    const updatePushMode = () => {
      if (!parentNode.value || props.mode !== 'push') return;
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

    // footer 内容生成
    const getDefaultFooter = () => {
      const confirmBtn = getConfirmBtn({
        confirmBtn: props.confirmBtn as TdDrawerProps['confirmBtn'],
        globalConfirm: globalConfig.value.confirm,
        className: `${COMPONENT_NAME.value}__confirm`,
      });
      const cancelBtn = getCancelBtn({
        cancelBtn: props.cancelBtn as TdDrawerProps['cancelBtn'],
        globalCancel: globalConfig.value.cancel,
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

    // style 标签创建与清理
    const createStyleEl = () => {
      styleEl.value = document.createElement('style');
      styleEl.value.dataset.id = `td_drawer_${+new Date()}_${(key += 1)}`;
      const hasScrollBar = window.innerWidth > document.documentElement.clientWidth;
      const scrollWidth = hasScrollBar ? getScrollbarWidth() : 0;
      styleEl.value.innerHTML = `
        html body {
          overflow-y: hidden;
          transition: margin 300ms cubic-bezier(0.7, 0.3, 0.1, 1) 0s;
          ${props.mode === 'push' ? '' : `width: calc(100% - ${scrollWidth}px);`}
        }
      `;
    };
    const clearStyleFunc = () => {
      if (styleTimer.value) clearTimeout(styleTimer.value);
      styleTimer.value = setTimeout(() => {
        styleEl.value?.parentNode?.removeChild?.(styleEl.value);
      }, 150);
    };

    // watcher
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
        if (value) {
          firstAlreadyRender.value = true;
          if (!props.showInAttachedElement && props.preventScrollThrough) {
            styleEl.value && document.head.appendChild(styleEl.value);
          }
        } else {
          clearStyleFunc();
        }
        value ? props.onBeforeOpen?.() : props.onBeforeClose?.();

        if (props.destroyOnClose) {
          value ? showDrawer() : hideDrawer();
        } else if (destroyOnCloseVisible.value && value) {
          destroyOnCloseVisible.value = false;
          setTimeout(() => {
            isVisible.value = true;
          });
        } else {
          setTimeout(() => {
            isVisible.value = value;
          });
        }
      },
      { immediate: true },
    );

    // 生命周期钩子
    onMounted(() => {
      if (!props.lazy || (isVisible.value && !props.showInAttachedElement && props.preventScrollThrough)) {
        createStyleEl();
        document.head.appendChild(styleEl.value);
        window.addEventListener('keydown', handleEscKeydown);
      }
    });

    onUpdated(() => updatePushMode());

    onBeforeUnmount(() => {
      clearStyleFunc();
      window.removeEventListener('keydown', handleEscKeydown);
    });

    // 渲染函数
    return () => {
      if (destroyOnCloseVisible.value || (!firstAlreadyRender.value && props.lazy)) return;
      const body = renderContent('body', 'default');
      const headerContent = renderTNodeJSX('header');
      const defaultFooter = getDefaultFooter();

      return (
        <Teleport disabled={!props.attach || !teleportElement.value} to={teleportElement.value}>
          <div
            ref={drawerEle}
            class={drawerClasses.value}
            style={{ zIndex: props.zIndex }}
            onKeydown={handleEscKeydown}
            tabindex={0}
            {...context.attrs}
          >
            {props.showOverlay && <div class={`${COMPONENT_NAME.value}__mask`} onClick={handleWrapperClick} />}
            <div class={wrapperClasses.value} style={{ ...wrapperStyles.value, ...draggingStyles.value }}>
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
        </Teleport>
      );
    };
  },
});
