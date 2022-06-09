import { computed, defineComponent, nextTick, onBeforeUnmount, onMounted, ref, Transition, watch } from 'vue';
import isNumber from 'lodash/isNumber';
import { CloseIcon, InfoCircleFilledIcon, CheckCircleFilledIcon, ErrorCircleFilledIcon } from 'tdesign-icons-vue-next';
import TButton from '../button';
import { DialogCloseContext, TdDialogProps } from './type';
import props from './props';
import TransferDom from '../utils/transfer-dom';
import { addClass, removeClass } from '../utils/dom';
import { useConfig, usePrefixClass } from '../hooks/useConfig';
import { useAction } from './hooks';
import { useTNodeJSX, useContent } from '../hooks/tnode';
import useDestroyOnClose from '../hooks/useDestroyOnClose';

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
  const windowInnerWidth = (window.innerWidth || document.documentElement.clientWidth);
  const windowInnerHeight = (window.innerHeight || document.documentElement.clientHeight);
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
  name: 'TDialog',
  components: {
    CloseIcon,
    InfoCircleFilledIcon,
    CheckCircleFilledIcon,
    ErrorCircleFilledIcon,
    TButton,
    Transition,
  },

  // 注册v-draggable指令,传入true时候初始化拖拽事件
  directives: {
    TransferDom,
    draggable(el, binding) {
      // el 指令绑定的元素
      if (el && binding && binding.value) {
        InitDragEvent(el);
      }
    },
  },

  props,

  emits: ['update:visible'],
  setup(props: TdDialogProps, context) {
    const COMPONENT_NAME = usePrefixClass('dialog');
    const LOCK_CLASS = usePrefixClass('dialog--lock');
    const classPrefix = usePrefixClass();
    const renderContent = useContent();
    const renderTNodeJSX = useTNodeJSX();
    const dialogEle = ref<HTMLElement | null>(null);
    const { global } = useConfig('dialog');
    const confirmBtnAction = (e: MouseEvent) => {
      props.onConfirm?.({ e });
    };
    const cancelBtnAction = (e: MouseEvent) => {
      props.onCancel?.({ e });
      emitCloseEvent({
        trigger: 'cancel',
        e,
      });
    };
    const { getConfirmBtn, getCancelBtn } = useAction({ confirmBtnAction, cancelBtnAction });

    useDestroyOnClose();

    const scrollWidth = ref(0);
    // 是否模态形式的对话框
    const isModal = computed(() => props.mode === 'modal');
    // 是否非模态对话框
    const isModeLess = computed(() => props.mode === 'modeless');
    const maskClass = computed(() => [
      `${COMPONENT_NAME.value}__mask`,
      !props.showOverlay && `${classPrefix.value}-is-hidden`,
    ]);
    const positionClass = computed(() => [
      `${COMPONENT_NAME.value}__position`,
      !!props.top && `${COMPONENT_NAME.value}--top`, 
      `${props.placement && !props.top ? `${COMPONENT_NAME.value}--${props.placement}` : ''}`
    ]);
    const positionStyle = computed(() => {
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
        `${COMPONENT_NAME.value}--default`,
        `${COMPONENT_NAME.value}--${props.placement}`,
        `${COMPONENT_NAME.value}__modal-${props.theme}`,
      ];
      if (['modeless', 'modal'].includes(props.mode)) {
        if (isModal.value && props.showInAttachedElement) {
          dialogClass.push(`${COMPONENT_NAME.value}--absolute`);
        }
      }
      return dialogClass;
    });
    const dialogStyle = computed(() => {
      return { width: GetCSSValue(props.width) };
    });

    watch(
      () => props.visible,
      (value) => {
        if (value) {
          if (isModal.value && !props.showInAttachedElement) {
            if (scrollWidth.value > 0) {
              const bodyCssText = `position: relative;width: calc(100% - ${scrollWidth.value}px);`;
              document.body.style.cssText = bodyCssText;
            }
            !isModeLess.value && addClass(document.body, LOCK_CLASS.value);
            nextTick(() => {
              if (mousePosition && dialogEle.value) {
                dialogEle.value.style.transformOrigin = `${mousePosition.x - dialogEle.value.offsetLeft}px ${
                  mousePosition.y - dialogEle.value.offsetTop
                }px`;
              }
            });
          }
        } else {
          document.body.style.cssText = '';
          removeClass(document.body, LOCK_CLASS.value);
        }
        addKeyboardEvent(value);
      },
    );

    const addKeyboardEvent = (status: boolean) => {
      if (status) {
        document.addEventListener('keydown', keyboardEvent);
      } else {
        document.removeEventListener('keydown', keyboardEvent);
      }
    };
    const keyboardEvent = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        props.onEscKeydown?.({ e });
        // 根据closeOnEscKeydown判断按下ESC时是否触发close事件
        if (props.closeOnEscKeydown) {
          emitCloseEvent({
            trigger: 'esc',
            e,
          });
        }
      }
    };
    const overlayAction = (e: MouseEvent) => {
      // 如果不是modal模式 默认没有mask 也就没有相关点击事件
      if (props.mode !== 'modal') return;
      props.onOverlayClick?.({ e });
      // 根据closeOnClickOverlay判断点击蒙层时是否触发close事件
      if (props.closeOnOverlayClick) {
        emitCloseEvent({
          trigger: 'overlay',
          e,
        });
      }
    };
    const closeBtnAction = (e: MouseEvent) => {
      props.onCloseBtnClick?.({ e });
      emitCloseEvent({
        trigger: 'close-btn',
        e,
      });
    };

    // 打开弹窗动画结束时事件
    const afterEnter = () => {
      props.onOpened?.();
    };
    // 关闭弹窗动画结束时事件
    const afterLeave = () => {
      if (isModeLess.value && props.draggable) {
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
      const eventFuncs = this['_events']?.[name];
      return !!eventFuncs?.length;
    };
    const getIcon = () => {
      const icon = {
        info: <InfoCircleFilledIcon class="t-is-info" />,
        warning: <ErrorCircleFilledIcon class="t-is-warning" />,
        danger: <ErrorCircleFilledIcon class="t-is-error" />,
        success: <CheckCircleFilledIcon class="t-is-success" />,
      };
      return icon[props.theme];
    };
    const renderDialog = () => {
      // header 值为 true 显示空白头部
      const defaultHeader = <h5 class="title"></h5>;
      const defaultCloseBtn = <CloseIcon />;
      const body = renderContent('default', 'body');
      const defaultFooter = (
        <div>
          {getCancelBtn({
            cancelBtn: props.cancelBtn,
            globalCancel: global.value.cancel,
            className: `${COMPONENT_NAME.value}__cancel`,
          })}
          {getConfirmBtn({
            theme: props.theme,
            confirmBtn: props.confirmBtn,
            globalConfirm: global.value.confirm,
            globalConfirmBtnTheme: global.value.confirmBtnTheme,
            className: `${COMPONENT_NAME.value}__confirm`,
          })}
        </div>
      );
      const bodyClassName =
        props.theme === 'default' ? `${COMPONENT_NAME.value}__body` : `${COMPONENT_NAME.value}__body__icon`;
      return (
        // /* 非模态形态下draggable为true才允许拖拽 */

        <div class={`${COMPONENT_NAME.value}__wrap`} onClick={overlayAction} >
          <div class={positionClass.value} style={positionStyle.value}>
            <div
              key="dialog"
              class={dialogClass.value}
              style={dialogStyle.value}
              v-draggable={isModeLess.value && props.draggable}
              ref="dialogEle"
            >
              <div class={`${COMPONENT_NAME.value}__header`}>
                {getIcon()}
                {renderTNodeJSX('header', defaultHeader)}
              </div>
              {props.closeBtn ? (
                <span class={`${COMPONENT_NAME.value}__close`} onClick={closeBtnAction}>
                  {renderTNodeJSX('closeBtn', defaultCloseBtn)}
                </span>
              ) : null}
              <div class={bodyClassName}>{body}</div>
              <div class={`${COMPONENT_NAME.value}__footer`}>{renderTNodeJSX('footer', defaultFooter)}</div>
            </div>
          </div>
        </div>
      );
    };

    onMounted(() => {
      scrollWidth.value = window.innerWidth - document.body.offsetWidth;
    });
    onBeforeUnmount(() => {
      addKeyboardEvent(false);
    });

    return {
      COMPONENT_NAME,
      scrollWidth,
      isModal,
      isModeLess,
      maskClass,
      dialogClass,
      dialogStyle,
      dialogEle,
      afterEnter,
      afterLeave,
      hasEventOn,
      renderDialog,
    };
  },
  render() {
    const { COMPONENT_NAME } = this;
    const maskView = this.isModal && <div key="mask" class={this.maskClass}></div>;
    const dialogView = this.renderDialog();
    const view = [maskView, dialogView];
    const ctxStyle = { zIndex: this.zIndex };
    const ctxClass = [
      `${COMPONENT_NAME}__ctx`,
      {
        't-dialog__ctx--fixed': this.mode === 'modal',
        [`${COMPONENT_NAME}__ctx--absolute`]: this.isModal && this.showInAttachedElement,
      },
    ];
    return (
      <transition
        duration={300}
        name={`${COMPONENT_NAME}-zoom__vue`}
        onAfterEnter={this.afterEnter}
        onAfterLeave={this.afterLeave}
      >
        {(!this.destroyOnClose || this.visible) && (
          <div v-show={this.visible} class={ctxClass} style={ctxStyle} v-transfer-dom={this.attach}>
            {view}
          </div>
        )}
      </transition>
    );
  },
});
