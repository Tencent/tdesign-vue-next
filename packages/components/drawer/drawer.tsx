import { onBeforeUnmount, onMounted, computed, defineComponent, nextTick, onUpdated, ref, watch, Teleport } from 'vue';
import { CloseIcon as TdCloseIcon } from 'tdesign-icons-vue-next';
import {
  useConfig,
  useContent,
  useTNodeJSX,
  useTeleport,
  useGlobalIcon,
  usePrefixClass,
  usePopupManager,
} from '@tdesign/shared-hooks';

import { isServer } from '@tdesign/shared-utils';
import { getScrollbarWidth } from '@tdesign/common-js/utils/getScrollbarWidth';
import props from './props';
import { DrawerCloseContext } from './type';
import { useAction } from '../dialog/hooks';

import { useDrag } from './hooks';
import type { TdDrawerProps } from './type';

let key = 1;

export default defineComponent({
  name: 'TDrawer',
  inheritAttrs: false,
  props,
  emits: ['update:visible'],
  setup(props, context) {
    const destroyOnCloseVisible = ref(false);
    const isVisible = ref(false);
    const styleEl = ref();
    const styleTimer = ref();
    const { globalConfig } = useConfig('drawer');
    const { CloseIcon } = useGlobalIcon({ CloseIcon: TdCloseIcon });
    const renderTNodeJSX = useTNodeJSX();
    const renderContent = useContent();
    const COMPONENT_NAME = usePrefixClass('drawer');
    const { draggedSizeValue, enableDrag, draggableLineStyles, draggingStyles } = useDrag(props as TdDrawerProps);
    const computedVisible = computed(() => props.visible);
    const isMounted = ref(false);

    // teleport容器
    const teleportElement = useTeleport(() => props.attach);

    const confirmBtnAction = (e: MouseEvent) => {
      props.onConfirm?.({ e });
    };
    const cancelBtnAction = (e: MouseEvent) => {
      props.onCancel?.({ e });
      closeDrawer({ trigger: 'cancel', e });
    };
    const { getConfirmBtn, getCancelBtn } = useAction({ confirmBtnAction, cancelBtnAction });
    const drawerEle = ref<HTMLElement | null>(null);
    const drawerClasses = computed(() => [
      COMPONENT_NAME.value,
      `${COMPONENT_NAME.value}--${props.placement}`,
      {
        [`${COMPONENT_NAME.value}--open`]: isVisible.value,
        [`${COMPONENT_NAME.value}--attach`]: props.showInAttachedElement,
        [`${COMPONENT_NAME.value}--without-mask`]: !props.showOverlay,
      },
      props.drawerClassName,
    ]);

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
    const wrapperStyles = computed(() => ({
      transform: isVisible.value ? 'translateX(0)' : undefined,
      width: ['left', 'right'].includes(props.placement) ? sizeValue.value : '',
      height: ['top', 'bottom'].includes(props.placement) ? sizeValue.value : '',
    }));

    const wrapperClasses = computed(() => [
      `${COMPONENT_NAME.value}__content-wrapper`,
      `${COMPONENT_NAME.value}__content-wrapper--${props.placement}`,
    ]);

    const parentNode = computed<HTMLElement>(() => drawerEle.value?.parentNode as HTMLElement);

    const modeAndPlacement = computed<string>(() => [props.mode, props.placement].join());
    const footerStyle = computed(() => ({
      display: 'flex',
      justifyContent: props.placement === 'right' ? 'flex-start' : 'flex-end',
    }));

    const handleEscKeydown = (e: KeyboardEvent) => {
      if (
        (props.closeOnEscKeydown ?? globalConfig.value.closeOnEscKeydown) &&
        e.key === 'Escape' &&
        isVisible.value &&
        isTopInteractivePopup()
      ) {
        props.onEscKeydown?.({ e });
        closeDrawer({ trigger: 'esc', e });
        // 阻止事件冒泡
        e.stopImmediatePropagation();
      }
    };

    const clearStyleEl = () => {
      clearTimeout(styleTimer.value);
      styleTimer.value = setTimeout(() => {
        styleEl.value?.parentNode?.removeChild?.(styleEl.value);
        styleEl.value = null;
      }, 150);
      nextTick(() => {
        drawerEle.value?.focus?.();
      });
    };

    const createStyleEl = () => {
      if (!styleEl.value) return;
      const hasScrollBar = window.innerWidth > document.documentElement.clientWidth;
      const scrollWidth = hasScrollBar ? getScrollbarWidth() : 0;
      styleEl.value = document.createElement('style');
      styleEl.value.dataset.id = `td_drawer_${+new Date()}_${(key += 1)}`;
      styleEl.value.innerHTML = `
        html body {
          overflow-y: hidden;
          transition: margin 300ms cubic-bezier(0.7, 0.3, 0.1, 1) 0s;
          ${props.mode === 'push' ? '' : `width: calc(100% - ${scrollWidth}px);`}
        }
      `;
    };

    const handlePushMode = () => {
      if (props.mode !== 'push') return;
      nextTick(() => {
        if (!parentNode.value) return;
        parentNode.value.style.cssText = 'transition: margin 300ms cubic-bezier(0.7, 0.3, 0.1, 1) 0s;';
      });
    };

    // push 动画效果处理
    const updatePushMode = () => {
      if (!parentNode.value || props.mode !== 'push') return;
      const marginValueData = {
        left: { name: 'margin-left', value: sizeValue.value },
        right: { name: 'margin-right', value: `-${sizeValue.value}` },
        top: { name: 'margin-top', value: sizeValue.value },
        bottom: { name: 'margin-bottom', value: `-${sizeValue.value}` },
      }[props.placement];
      if (isVisible.value) {
        parentNode.value.style.setProperty(marginValueData.name, marginValueData.value);
      } else {
        parentNode.value.style.removeProperty(marginValueData.name);
      }
    };

    // locale 全局配置，插槽，props，默认值，决定了按钮最终呈现
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

    const { isTopInteractivePopup } = usePopupManager('drawer', {
      visible: computedVisible,
    });

    watch(modeAndPlacement, handlePushMode, { immediate: true });

    const updateVisibleState = (value: boolean) => {
      if (value) {
        isMounted.value = true;
      }

      if (props.destroyOnClose) {
        if (value) {
          destroyOnCloseVisible.value = false;
          setTimeout(() => (isVisible.value = true));
          props.onOpened?.();
        } else {
          isVisible.value = false;
          props.onClosed?.();
          // immediate 的 watch 的第一次触发，会将设置为 true 的行为延后
          // 插件场景下，watch -> create 方法 的立刻调用，导致 destroyOnCloseVisible 被 watch 的第一次触发覆盖
          // 所以关闭时候，默认先置为 false
          // 后续考虑移除 immediate 的 watch ?
          if (destroyOnCloseVisible.value) {
            destroyOnCloseVisible.value = false;
          }
          setTimeout(() => (destroyOnCloseVisible.value = true), 300);
        }
        return;
      }

      if (destroyOnCloseVisible.value && value) {
        destroyOnCloseVisible.value = false;
        setTimeout(() => (isVisible.value = true));
        props.onOpened?.();
        return;
      }

      setTimeout(() => {
        isVisible.value = value;
        if (value) {
          props.onOpened?.();
        } else {
          props.onClosed?.();
        }
      });
    };

    const addStyleElToHead = () => {
      if (
        !props.showInAttachedElement &&
        props.preventScrollThrough &&
        isVisible.value &&
        (isMounted.value || !props.lazy)
      ) {
        if (!styleEl.value) {
          createStyleEl();
        }
        if (styleEl.value && !document.head.contains(styleEl.value)) {
          document.head.appendChild(styleEl.value);
        }
      }
    };

    watch(
      () => props.visible,
      (value) => {
        if (isServer) return;
        if (value === isVisible.value) return;
        if (value) {
          addStyleElToHead();
          props.onBeforeOpen?.();
        } else {
          clearStyleEl();
          props.onBeforeClose?.();
        }

        updateVisibleState(value);
      },
      { immediate: true },
    );

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

    const closeDrawer = (params: DrawerCloseContext) => {
      props.onClose?.(params);
      context.emit('update:visible', false);
    };

    onUpdated(updatePushMode);

    onMounted(() => {
      addStyleElToHead();
      window.addEventListener('keydown', handleEscKeydown);
    });

    onBeforeUnmount(() => {
      clearStyleEl();
      window.removeEventListener('keydown', handleEscKeydown);
    });

    const shouldRender = computed(() => {
      if (!isMounted.value) {
        return !props.lazy;
      } else {
        return isVisible.value || !destroyOnCloseVisible.value;
      }
    });

    return () => {
      if (!shouldRender.value) return;

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
