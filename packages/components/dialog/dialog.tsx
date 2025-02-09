import { computed, defineComponent, nextTick, onBeforeUnmount, onMounted, ref, Transition, watch, Teleport } from 'vue';
import { DialogCloseContext } from './type';
import props from './props';
import { useConfig, usePrefixClass } from '../hooks/useConfig';
import { useSameTarget } from './hooks';
import { useTNodeJSX, useContent } from '../hooks/tnode';
import useDestroyOnClose from '../hooks/useDestroyOnClose';
import { getScrollbarWidth } from '../../common/js/utils/getScrollbarWidth';
import useTeleport from '../hooks/useTeleport';
import usePopupManager from '../hooks/usePopupManager';

import TDialogCard from './dialogCard';

function GetCSSValue(v: string | number) {
  return Number.isNaN(Number(v)) ? v : `${Number(v)}px`;
}

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

let key = 1;

export default defineComponent({
  name: 'TDialog',
  // 注册v-draggable指令,传入true时候初始化拖拽事件
  directives: {
    draggable(el, binding) {
      // el 指令绑定的元素
      if (el && binding && binding.value) {
        InitDragEvent(el);
      }
    },
  },
  inheritAttrs: false,
  props,
  emits: ['update:visible'],
  setup(props, context) {
    const COMPONENT_NAME = usePrefixClass('dialog');
    const classPrefix = usePrefixClass();
    const renderContent = useContent();
    const renderTNodeJSX = useTNodeJSX();
    const dialogEle = ref<HTMLElement | null>(null);
    const dialogCardRef = ref<HTMLElement | null>(null);
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

      return [
        `${COMPONENT_NAME.value}__position`,
        !!props.top && `${COMPONENT_NAME.value}--top`,
        `${props.placement && !props.top ? `${COMPONENT_NAME.value}--${props.placement}` : ''}`,
      ];
    });
    const wrapClass = computed(() => [`${COMPONENT_NAME.value}__wrap`]);
    const positionStyle = computed(() => {
      if (isFullScreen.value) return {}; // 全屏模式，top属性不生效

      // 此处获取定位方式 top 优先级较高 存在时 默认使用top定位
      const { top } = props;
      let topStyle = {};
      if (top !== undefined) {
        const topValue = GetCSSValue(top);
        topStyle = { paddingTop: topValue };
      }
      return topStyle;
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
    const { isLastDialog } = usePopupManager('dialog', {
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
              if (mousePosition && dialogEle.value) {
                dialogEle.value.style.transformOrigin = `${mousePosition.x - dialogEle.value.offsetLeft}px ${
                  mousePosition.y - dialogEle.value.offsetTop
                }px`;
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
      if ((code === 'Enter' || code === 'NumpadEnter') && isLastDialog()) {
        props.onConfirm?.({ e });
      }
    };
    const keyboardEvent = (e: KeyboardEvent) => {
      if (e.code === 'Escape' && isLastDialog()) {
        props.onEscKeydown?.({ e });
        // 根据closeOnEscKeydown判断按下ESC时是否触发close事件
        if (props.closeOnEscKeydown ?? globalConfig.value.closeOnEscKeydown) {
          emitCloseEvent({ e, trigger: 'esc' });
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
      if (isModeLess.value && props.draggable && dialogEle.value) {
        // 关闭弹窗 清空拖拽设置的相关css
        dialogEle.value.style.position = 'relative';
        dialogEle.value.style.left = 'unset';
        dialogEle.value.style.top = 'unset';
      }
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
    const hasEventOn = (name: string) => {
      // _events 因没有被暴露在vue实例接口中，只能把这个规则注释掉
      // eslint-disable-next-line dot-notation
      // @ts-ignore
      const eventFuncs = this['_events']?.[name];
      return !!eventFuncs?.length;
    };
    const renderDialog = () => {
      // header 值为 true 显示空白头部
      const header = renderTNodeJSX('header', <h5 class="title"></h5>);
      const body = renderContent('default', 'body');
      const { dialogClassName, theme, ...otherProps } = props;
      return (
        // /* 非模态形态下draggable为true才允许拖拽 */
        <div class={wrapClass.value}>
          <div
            class={positionClass.value}
            style={positionStyle.value}
            onClick={onClick}
            onMousedown={onMousedown}
            onMouseup={onMouseup}
          >
            <div
              key="dialog"
              class={dialogClass.value}
              style={dialogStyle.value}
              v-draggable={isModeLess.value && props.draggable}
              ref={dialogEle}
            >
              <TDialogCard
                ref={dialogCardRef}
                theme={theme}
                {...otherProps}
                header={header}
                body={body}
                class={dialogClassName}
                onConfirm={confirmBtnAction}
                onCancel={cancelBtnAction}
                onCloseBtnClick={closeBtnAction}
              />
            </div>
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

    return {
      COMPONENT_NAME,
      isModal,
      isModeLess,
      isFullScreen,
      maskClass,
      dialogClass,
      dialogStyle,
      dialogEle,
      beforeEnter,
      afterEnter,
      beforeLeave,
      afterLeave,
      hasEventOn,
      renderDialog,
      teleportElement,
    };
  },
  render() {
    const { COMPONENT_NAME } = this;
    const maskView = (this.isModal || this.isFullScreen) && <div key="mask" class={this.maskClass}></div>;
    const dialogView = this.renderDialog();
    const view = [maskView, dialogView];
    const ctxStyle = { zIndex: this.zIndex };
    // dialog__ctx--fixed 绝对定位
    // dialog__ctx--absolute 挂载在attach元素上 相对定位
    // __ctx--modeless modeless 点击穿透
    const ctxClass = [
      `${COMPONENT_NAME}__ctx`,
      {
        [`${COMPONENT_NAME}__ctx--fixed`]: this.isModal || this.isFullScreen,
        [`${COMPONENT_NAME}__ctx--absolute`]: this.isModal && this.showInAttachedElement,
        [`${COMPONENT_NAME}__ctx--modeless`]: this.isModeLess,
      },
    ];
    return (
      <Teleport disabled={!this.attach || !this.teleportElement} to={this.teleportElement}>
        <Transition
          duration={300}
          name={`${COMPONENT_NAME}-zoom__vue`}
          onBeforeEnter={this.beforeEnter}
          onAfterEnter={this.afterEnter}
          onBeforeLeave={this.beforeLeave}
          onAfterLeave={this.afterLeave}
        >
          {(!this.destroyOnClose || this.visible) && (
            <div v-show={this.visible} class={ctxClass} style={ctxStyle} {...this.$attrs}>
              {view}
            </div>
          )}
        </Transition>
      </Teleport>
    );
  },
});
