import { computed, defineComponent, nextTick, onUpdated, toRefs, ref, watch } from 'vue';
import { CloseIcon } from 'tdesign-icons-vue-next';
import { useConfig, usePrefixClass } from '../hooks/useConfig';
import { isServer, addClass, removeClass } from '../utils/dom';
import { ClassName, Styles } from '../common';
import { Button as TButton } from '../button';
import props from './props';
import { FooterButton, DrawerCloseContext } from './type';
import { renderTNodeJSX, renderContent } from '../utils/render-tnode';
import TransferDom from '../utils/transfer-dom';
import { useAction } from '../dialog/hooks';

type FooterButtonType = 'confirm' | 'cancel';

export default defineComponent({
  name: 'TDrawer',
  directives: {
    TransferDom,
  },
  props,
  emits: ['update:visible'],
  setup(props, context) {
    const { global } = useConfig('drawer');
    const COMPONENT_NAME = usePrefixClass('drawer');

    const LOCK_CLASS = usePrefixClass('drawer--lock');

    const confirmBtnAction = (e: MouseEvent) => {
      props.onConfirm?.({ e });
    };
    const cancelBtnAction = (e: MouseEvent) => {
      props.onCancel?.({ e });
      closeDrawer({ trigger: 'cancel', e });
    };
    const { getConfirmBtn, getCancelBtn } = useAction({ confirmBtnAction, cancelBtnAction });
    const drawerEle = ref<HTMLElement | null>(null);
    const drawerClasses = computed<ClassName>(() => {
      return [
        't-drawer',
        `t-drawer--${props.placement}`,
        {
          't-drawer--open': props.visible,
          't-drawer--attach': props.showInAttachedElement,
          't-drawer--without-mask': !props.showOverlay,
        },
      ];
    });

    const sizeValue = computed(() => {
      const defaultSize = isNaN(Number(props.size)) ? props.size : `${props.size}px`;
      return (
        {
          small: '300px',
          medium: '500px',
          large: '760px',
        }[props.size] || defaultSize
      );
    });
    const wrapperStyles = computed(() => {
      return {
        // 用于抵消动画效果：transform: translateX(100%); 等
        transform: props.visible ? 'translateX(0)' : undefined,
        width: ['left', 'right'].includes(props.placement) ? sizeValue.value : '',
        height: ['top', 'bottom'].includes(props.placement) ? sizeValue.value : '',
      };
    });

    const wrapperClasses = computed<ClassName>(() => {
      return ['t-drawer__content-wrapper', `t-drawer__content-wrapper--${props.placement}`];
    });

    const parentNode = computed<HTMLElement>(() => {
      return drawerEle.value && (drawerEle.value.parentNode as HTMLElement);
    });

    const modeAndPlacement = computed<string>(() => {
      return [props.mode, props.placement].join();
    });

    const footerStyle = computed<Styles>(() => {
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
      if (props.visible) {
        parentNode.value.style.cssText += marginStr;
      } else {
        parentNode.value.style.cssText = parentNode.value.style.cssText.replace(/margin:.+;/, '');
      }
    };
    const getDefaultBtn = (btnType: FooterButtonType, btnApi: FooterButton) => {
      const isCancel = btnType === 'cancel';
      const clickAction = isCancel ? cancelBtnAction : confirmBtnAction;
      const theme = isCancel ? 'default' : 'primary';
      const isApiObject = typeof btnApi === 'object';
      return (
        <TButton
          theme={theme}
          onClick={clickAction}
          props={isApiObject ? btnApi : {}}
          class={`${COMPONENT_NAME.value}-${btnType}`}
        >
          {btnApi && typeof btnApi === 'object' ? btnApi.content : btnApi}
        </TButton>
      );
    };
    const isUseDefault = (btnApi: FooterButton) => {
      const baseTypes = ['string', 'object'];
      return Boolean(btnApi && baseTypes.includes(typeof btnApi));
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
      (value: boolean) => {
        if (isServer) return;
        if (value && !props.showInAttachedElement) {
          props.preventScrollThrough && addClass(document.body, LOCK_CLASS.value);
        } else {
          props.preventScrollThrough && removeClass(document.body, LOCK_CLASS.value);
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
      if (props.closeOnOverlayClick) {
        closeDrawer({ trigger: 'overlay', e });
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      // 根据closeOnEscKeydown判断按下ESC时是否触发close事件
      if (props.closeOnEscKeydown && e.key === 'Escape') {
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

    return {
      COMPONENT_NAME,
      drawerEle,
      drawerClasses,
      wrapperStyles,
      modeAndPlacement,
      wrapperClasses,
      handlePushMode,
      updatePushMode,
      getDefaultBtn,
      isUseDefault,
      getDefaultFooter,
      handleCloseBtnClick,
      handleWrapperClick,
      onKeyDown,
      confirmBtnAction,
      cancelBtnAction,
      closeDrawer,
    };
  },

  render() {
    const { COMPONENT_NAME } = this;
    if (this.destroyOnClose && !this.visible) return;
    const defaultCloseBtn = <CloseIcon class="t-submenu-icon"></CloseIcon>;
    const body = renderContent(this, 'body', 'default');
    const headerContent = renderTNodeJSX(this, 'header');
    const defaultFooter = this.getDefaultFooter();
    return (
      <div
        ref="drawerEle"
        class={this.drawerClasses}
        style={{ zIndex: this.zIndex }}
        onKeydown={this.onKeyDown}
        v-transfer-dom={this.attach}
        {...this.$attrs}
        tabindex={0}
      >
        {this.showOverlay && <div class={`${COMPONENT_NAME}__mask`} onClick={this.handleWrapperClick} />}
        <div class={this.wrapperClasses} style={this.wrapperStyles}>
          {headerContent && <div class={`${COMPONENT_NAME}__header`}>{headerContent}</div>}
          {this.closeBtn && (
            <div class={`${COMPONENT_NAME}__close-btn`} onClick={this.handleCloseBtnClick}>
              {renderTNodeJSX(this, 'closeBtn', defaultCloseBtn)}
            </div>
          )}
          <div class={[`${COMPONENT_NAME}__body`, 'narrow-scrollbar']}>{body}</div>
          {this.footer && (
            <div class={`${COMPONENT_NAME}__footer`}>{renderTNodeJSX(this, 'footer', defaultFooter)}</div>
          )}
        </div>
      </div>
    );
  },
});
