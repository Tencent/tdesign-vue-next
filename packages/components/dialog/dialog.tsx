import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  Transition,
  watch,
  Teleport,
  ComponentPublicInstance,
} from 'vue';
import { DialogCloseContext } from './type';
import props from './props';
import { useConfig, usePrefixClass } from '../hooks/useConfig';
import { useSameTarget } from './hooks';
import useDestroyOnClose from '../hooks/useDestroyOnClose';
import { getScrollbarWidth } from '@tdesign/common-js/utils/getScrollbarWidth';
import useTeleport from '../hooks/useTeleport';
import usePopupManager from '../hooks/usePopupManager';
import { getCSSValue } from './utils';
import TDialogCard from './dialog-card';

let mousePosition: { x: number; y: number } | null;
const getClickPosition = (e: MouseEvent) => {
  mousePosition = {
    x: e.clientX,
    y: e.clientY,
  };
  setTimeout(() => {
    mousePosition = null;
  }, 100);
};

if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
  document.documentElement.addEventListener('click', getClickPosition, true);
}

let key = 1;

export default defineComponent({
  name: 'TDialog',
  inheritAttrs: false,
  props,
  emits: ['update:visible'],
  setup(props, context) {
    const COMPONENT_NAME = usePrefixClass('dialog');
    const classPrefix = usePrefixClass();
    const dialogCardRef = ref<ComponentPublicInstance<{ resetPosition: () => void }>>(null);
    const { globalConfig } = useConfig('dialog');
    const confirmBtnAction = (context: { e: MouseEvent }) => {
      props.onConfirm?.(context);
    };
    const cancelBtnAction = (context: { e: MouseEvent }) => {
      props.onCancel?.(context);
      emitCloseEvent({ e: context.e, trigger: 'cancel' });
    };
    // teleport容器
    const teleportElement = useTeleport(() => props.attach);
    useDestroyOnClose();
    const timer = ref();
    const styleEl = ref();
    // 是否模态形式的对话框
    const isModal = computed(() => props.mode === 'modal');
    // 是否非模态对话框
    const isModeLess = computed(() => props.mode === 'modeless');
    // 是否全屏对话框
    const isFullScreen = computed(() => props.mode === 'full-screen');
    const computedVisible = computed(() => props.visible);
    const maskClass = computed(() => [
      `${COMPONENT_NAME.value}__mask`,
      !props.showOverlay && `${classPrefix.value}-is-hidden`,
    ]);
    const positionClass = computed(() => {
      if (isFullScreen.value) return [`${COMPONENT_NAME.value}__position_fullscreen`];
      if (isModal.value || isModeLess.value) {
        return [
          `${COMPONENT_NAME.value}__position`,
          !!props.top && `${COMPONENT_NAME.value}--top`,
          `${props.placement && !props.top ? `${COMPONENT_NAME.value}--${props.placement}` : ''}`,
        ];
      }
      return [];
    });
    const wrapClass = computed(() =>
      isFullScreen.value || isModal.value || isModeLess.value ? [`${COMPONENT_NAME.value}__wrap`] : null,
    );
    const positionStyle = computed(() => {
      if (isFullScreen.value) return {}; // 全屏模式，top属性不生效

      // 此处获取定位方式 top 优先级较高 存在时 默认使用top定位
      const { top } = props;
      let topStyle = {};
      if (top !== undefined) {
        const topValue = getCSSValue(top);
        topStyle = { paddingTop: topValue };
      }
      return topStyle;
    });

    const { isTopInteractivePopup } = usePopupManager('dialog', {
      visible: computedVisible,
    });

    watch(
      () => props.visible,
      (value) => {
        if (value) {
          if ((isModal.value && !props.showInAttachedElement) || isFullScreen.value) {
            if (props.preventScrollThrough) {
              document.body.appendChild(styleEl.value);
            }

            nextTick(() => {
              if (mousePosition && dialogCardRef.value?.$el) {
                const el = dialogCardRef.value.$el as HTMLElement;
                el.style.transformOrigin = `${mousePosition.x - el.offsetLeft}px ${mousePosition.y - el.offsetTop}px`;
              }
            });
          }
          // 清除鼠标焦点 避免entry事件多次触发（按钮弹出弹窗 不移除焦点 立即按Entry按键 会造成弹窗关闭再弹出）
          (document.activeElement as HTMLElement)?.blur();
        } else {
          clearStyleFunc();
        }
        addKeyboardEvent(value);
      },
    );

    function destroySelf() {
      styleEl.value.parentNode?.removeChild?.(styleEl.value);
    }

    function clearStyleFunc() {
      clearTimeout(timer.value);
      timer.value = setTimeout(() => {
        destroySelf();
      }, 150);
    }

    const addKeyboardEvent = (status: boolean) => {
      if (status) {
        document.addEventListener('keydown', keyboardEvent);
        props.confirmOnEnter && document.addEventListener('keydown', keyboardEnterEvent);
      } else {
        document.removeEventListener('keydown', keyboardEvent);
        props.confirmOnEnter && document.removeEventListener('keydown', keyboardEnterEvent);
      }
    };
    // 回车触发确认事件
    const keyboardEnterEvent = (e: KeyboardEvent) => {
      const eventSrc = e.target as HTMLElement;
      if (eventSrc.tagName.toLowerCase() === 'input') return; // 若是input触发 则不执行
      const { code } = e;
      if ((code === 'Enter' || code === 'NumpadEnter') && isTopInteractivePopup()) {
        props.onConfirm?.({ e });
      }
    };
    const keyboardEvent = (e: KeyboardEvent) => {
      if (e.code === 'Escape' && isTopInteractivePopup()) {
        props.onEscKeydown?.({ e });
        // 根据closeOnEscKeydown判断按下ESC时是否触发close事件
        if (props.closeOnEscKeydown ?? globalConfig.value.closeOnEscKeydown) {
          emitCloseEvent({ e, trigger: 'esc' });
          // 阻止事件冒泡
          e.stopImmediatePropagation();
        }
      }
    };
    const overlayAction = (e: MouseEvent) => {
      if (props.showOverlay && (props.closeOnOverlayClick ?? globalConfig.value.closeOnOverlayClick)) {
        props.onOverlayClick?.({ e });
        emitCloseEvent({ e, trigger: 'overlay' });
      }
    };
    const { onClick, onMousedown, onMouseup } = useSameTarget(overlayAction);
    const closeBtnAction = (context: { e: MouseEvent }) => {
      props.onCloseBtnClick?.(context);
      emitCloseEvent({
        trigger: 'close-btn',
        e: context.e,
      });
    };

    // 打开弹窗动画开始时事件
    const beforeEnter = () => {
      props.onBeforeOpen?.();
    };

    // 打开弹窗动画结束时事件
    const afterEnter = () => {
      props.onOpened?.();
    };

    // 关闭弹窗动画开始时事件
    const beforeLeave = () => {
      props.onBeforeClose?.();
    };

    // 关闭弹窗动画结束时事件
    const afterLeave = () => {
      dialogCardRef.value?.resetPosition?.();
      props.onClosed?.();
    };

    const emitCloseEvent = (ctx: DialogCloseContext) => {
      props.onClose?.(ctx);
      // 默认关闭弹窗
      context.emit('update:visible', false);
    };

    // Vue在引入阶段对事件的处理还做了哪些初始化操作。Vue在实例上用一个_events属性存贮管理事件的派发和更新，
    // 暴露出$on, $once, $off, $emit方法给外部管理事件和派发执行事件
    // 所以通过判断_events某个事件下监听函数数组是否超过一个，可以判断出组件是否监听了当前事件
    // const hasEventOn = (name: string) => {
    //   // _events 因没有被暴露在vue实例接口中，只能把这个规则注释掉
    //   // eslint-disable-next-line dot-notation
    //   // @ts-ignore
    //   const eventFuncs = this['_events']?.[name];
    //   return !!eventFuncs?.length;
    // };

    const renderDialog = () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { theme, onConfirm, onCancel, onCloseBtnClick, ...otherProps } = props;
      return (
        /** 非模态形态下draggable为true才允许拖拽 */
        <div class={wrapClass.value}>
          <div
            class={positionClass.value}
            style={positionStyle.value}
            onClick={onClick}
            onMousedown={onMousedown}
            onMouseup={onMouseup}
          >
            <TDialogCard
              ref={dialogCardRef}
              theme={theme}
              {...otherProps}
              v-slots={context.slots}
              onConfirm={confirmBtnAction}
              onCancel={cancelBtnAction}
              onCloseBtnClick={closeBtnAction}
            />
          </div>
        </div>
      );
    };

    onMounted(() => {
      const hasScrollBar = document.documentElement.scrollHeight > document.documentElement.clientHeight;
      const scrollWidth = hasScrollBar ? getScrollbarWidth() : 0;
      styleEl.value = document.createElement('style');
      styleEl.value.dataset.id = `td_dialog_${+new Date()}_${(key += 1)}`;
      styleEl.value.innerHTML = `
        html body {
          overflow-y: hidden;
          width: calc(100% - ${scrollWidth}px);
        }
      `;
    });

    onBeforeUnmount(() => {
      addKeyboardEvent(false);
      destroySelf();
    });

    return () => {
      const maskView = (isModal.value || isFullScreen.value) && <div key="mask" class={maskClass.value}></div>;
      const dialogView = renderDialog();
      const view = [maskView, dialogView];
      const ctxStyle = { zIndex: props.zIndex };
      // dialog__ctx--fixed 绝对定位
      // dialog__ctx--absolute 挂载在attach元素上 相对定位
      // __ctx--modeless modeless 点击穿透
      const ctxClass = [
        `${COMPONENT_NAME.value}__ctx`,
        {
          [`${COMPONENT_NAME.value}__ctx--fixed`]: isModal.value || isFullScreen.value,
          [`${COMPONENT_NAME.value}__ctx--absolute`]: isModal.value && props.showInAttachedElement,
          [`${COMPONENT_NAME.value}__ctx--modeless`]: isModeLess.value,
        },
      ];
      return (
        <Teleport disabled={!props.attach || !teleportElement.value} to={teleportElement.value}>
          <Transition
            duration={300}
            name={`${COMPONENT_NAME.value}-zoom__vue`}
            onBeforeEnter={beforeEnter}
            onAfterEnter={afterEnter}
            onBeforeLeave={beforeLeave}
            onAfterLeave={afterLeave}
          >
            {(!props.destroyOnClose || props.visible) && (
              <div v-show={props.visible} class={ctxClass} style={ctxStyle} {...context.attrs}>
                {view}
              </div>
            )}
          </Transition>
        </Teleport>
      );
    };
  },
});
