import { computed, defineComponent, nextTick, onBeforeUnmount, onMounted, ref, Transition, watch } from 'vue';
import { CloseIcon, InfoCircleFilledIcon, CheckCircleFilledIcon, ErrorCircleFilledIcon } from 'tdesign-icons-vue-next';
import { useEmitEvent } from '../hooks/event';
import { prefix } from '../config';
import TButton from '../button';
import { DialogCloseContext, TdDialogProps } from './type';
import props from './props';
import TransferDom from '../utils/transfer-dom';
import { addClass, removeClass } from '../utils/dom';
import { DialogConfig } from '../config-provider/config-receiver';
import { useReceiver } from '../config-provider';
import useAction from '../hooks/action';
import { useTNodeJSX, useContent } from '../hooks/tnode';

const name = `${prefix}-dialog`;
const lockClass = `${prefix}-dialog--lock`;

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

// 注册元素的拖拽事件
function InitDragEvent(dragBox: HTMLElement) {
  const target = dragBox;
  target.addEventListener('mousedown', (targetEvent: MouseEvent) => {
    // 算出鼠标相对元素的位置
    const disX = targetEvent.clientX - target.offsetLeft;
    const disY = targetEvent.clientY - target.offsetTop;
    function mouseMoverHandler(documentEvent: MouseEvent) {
      // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
      const left = documentEvent.clientX - disX;
      const top = documentEvent.clientY - disY;
      // 移动当前元素
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

  // 注册v-draggable指令,传入ture时候初始化拖拽事件
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

  emits: [
    'esc-keydown',
    'update:visible',
    'overlay-click',
    'close-btn-click',
    'cancel',
    'confirm',
    'opened',
    'closed',
    'close',
  ],
  setup(props) {
    const emitEvent = useEmitEvent();
    const renderContent = useContent();
    const renderTNodeJSX = useTNodeJSX();
    const dialogEle = ref<HTMLElement | null>(null);
    const { global } = useReceiver<DialogConfig>('dialog');
    const confirmBtnAction = (e: MouseEvent) => {
      emitEvent<Parameters<TdDialogProps['onConfirm']>>('confirm', { e });
    };
    const cancelBtnAction = (e: MouseEvent) => {
      emitEvent<Parameters<TdDialogProps['onCancel']>>('cancel', { e });
      emitCloseEvent({
        trigger: 'cancel',
        e,
      });
    };
    const { getConfirmBtn, getCancelBtn } = useAction({ confirmBtnAction, cancelBtnAction });
    const scrollWidth = ref(0);
    // 是否模态形式的对话框
    const isModal = computed(() => props.mode === 'modal');
    // 是否非模态对话框
    const isModeless = computed(() => props.mode === 'modeless');
    const maskClass = computed(() => [`${name}__mask`, !props.showOverlay && `${prefix}-is-hidden`]);
    const dialogClass = computed(() => {
      const dialogClass = [
        `${name}`,
        `${name}--default`,
        `${name}--${props.placement}`,
        `${name}__modal-${props.theme}`,
      ];
      if (['modeless', 'modal'].includes(props.mode)) {
        dialogClass.push(`${name}--fixed`);
      }
      return dialogClass;
    });
    const dialogStyle = computed(() => {
      const { top, placement } = props;
      let topStyle = {};

      // 设置了top属性
      if (top) {
        const topValue = GetCSSValue(top);
        topStyle = {
          top: topValue,
          transform: 'translate(-50%, 0)',
          maxHeight: `calc(100% - ${topValue})`,
        };
      } else if (placement === 'top') {
        topStyle = {
          maxHeight: 'calc(100% - 20%)',
        };
      }
      return { width: GetCSSValue(props.width), ...topStyle };
    });
    watch(
      () => props.visible,
      (value) => {
        if (value) {
          if (scrollWidth.value > 0) {
            const bodyCssText = `position: relative;width: calc(100% - ${scrollWidth.value}px);`;
            document.body.style.cssText = bodyCssText;
          }
          !isModeless.value && addClass(document.body, lockClass);
          nextTick(() => {
            if (mousePosition && dialogEle.value) {
              dialogEle.value.style.transformOrigin = `${mousePosition.x - dialogEle.value.offsetLeft}px ${
                mousePosition.y - dialogEle.value.offsetTop
              }px`;
            }
          });
        } else {
          document.body.style.cssText = '';
          removeClass(document.body, lockClass);
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
        emitEvent<Parameters<TdDialogProps['onEscKeydown']>>('esc-keydown', { e });
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
      emitEvent<Parameters<TdDialogProps['onOverlayClick']>>('overlay-click', { e });
      // 根据closeOnClickOverlay判断点击蒙层时是否触发close事件
      if (props.closeOnOverlayClick) {
        emitCloseEvent({
          trigger: 'overlay',
          e,
        });
      }
    };
    const closeBtnAcion = (e: MouseEvent) => {
      emitEvent<Parameters<TdDialogProps['onCloseBtnClick']>>('close-btn-click', { e });
      emitCloseEvent({
        trigger: 'close-btn',
        e,
      });
    };

    // 打开弹窗动画结束时事件
    const afterEnter = () => {
      emitEvent<Parameters<TdDialogProps['onOpened']>>('opened');
    };
    // 关闭弹窗动画结束时事件
    const afterLeave = () => {
      emitEvent<Parameters<TdDialogProps['onClosed']>>('closed');
    };

    const emitCloseEvent = (context: DialogCloseContext) => {
      emitEvent<Parameters<TdDialogProps['onClose']>>('close', context);
      // 默认关闭弹窗
      emitEvent('update:visible', false);
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
            className: `${prefix}-dialog__cancel`,
          })}
          {getConfirmBtn({
            theme: props.theme,
            confirmBtn: props.confirmBtn,
            globalConfirm: global.value.confirm,
            globalConfirmBtnTheme: global.value.confirmBtnTheme,
            className: `${prefix}-dialog__confirm`,
          })}
        </div>
      );
      const bodyClassName = props.theme === 'default' ? `${name}__body` : `${name}__body__icon`;
      return (
        // /* 非模态形态下draggable为true才允许拖拽 */
        <div
          key="dialog"
          class={dialogClass.value}
          style={dialogStyle.value}
          v-draggable={isModeless.value && props.draggable}
          ref="dialogEle"
        >
          <div class={`${name}__header`}>
            {getIcon()}
            {renderTNodeJSX('header', defaultHeader)}
          </div>
          <span class={`${name}__close`} onClick={closeBtnAcion}>
            {renderTNodeJSX('closeBtn', defaultCloseBtn)}
          </span>
          <div class={bodyClassName}>{body}</div>
          <div class={`${name}__footer`}>{renderTNodeJSX('footer', defaultFooter)}</div>
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
      scrollWidth,
      isModal,
      isModeless,
      maskClass,
      dialogClass,
      dialogStyle,
      dialogEle,
      afterEnter,
      afterLeave,
      hasEventOn,
      renderDialog,
      overlayAction,
    };
  },
  render() {
    const maskView = this.isModal && <div key="mask" class={this.maskClass} onClick={this.overlayAction}></div>;
    const dialogView = this.renderDialog();
    const view = [maskView, dialogView];
    const ctxStyle = { zIndex: this.zIndex };
    const ctxClass = [`${name}__ctx`, { 't-dialog__ctx--fixed': this.mode === 'modal' }];
    return (
      <transition
        duration={300}
        name={`${name}-zoom__vue`}
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
