import { defineComponent, nextTick, ref, onUpdated, watch, toRefs, computed } from 'vue';
import { prefix } from '../config';
import TIconClose from '../icon/close';
import { Button as TButton } from '../button';
import props from '@TdTypes/drawer/props';
import { FooterButton, CloseContext } from '@TdTypes/drawer/TdDrawerProps';
import { renderTNodeJSX, renderContent } from '../utils/render-tnode';

const name = `${prefix}-drawer`;

export default defineComponent({
  name,

  components: {
    TIconClose,
    TButton,
  },

  props: { ...props },

  emits: ['open', 'close', 'opened', 'closed', 'update:visible', 'click-overlay', 'click-close-btn', 'keydown-esc', 'click-confirm', 'click-cancel'],

  // vue3 part
  setup(props, { emit }) {
    const { mode, placement } = toRefs(props);
    const modeAndPlacement = computed(() => [mode.value, placement.value].join());
    const el = ref(null);
    const parentNode = computed(() => el.value && el.value.parentNode as HTMLElement);
    const handlePushMode = () => {
      if (mode.value !== 'push') return;
      nextTick(() => {
        if (!parentNode.value) return;
        parentNode.value.style.cssText = 'transition: margin 300ms cubic-bezier(0.7, 0.3, 0.1, 1) 0s;';
      });
    };

    const { visible, size } = toRefs(props);
    const sizeValue = computed(() => {
      const defaultSize = isNaN(Number(size.value)) ? size.value : `${size.value}px`;
      return {
        small: '300px',
        medium: '500px',
        large: '760px',
      }[size.value] || defaultSize;
    });
    const updatePushMode = () => {
      if (!parentNode.value) return;
      if (mode.value !== 'push' || !parentNode.value) return;
      const marginStr = {
        left: `margin: 0 0 0 ${sizeValue.value}`,
        right: `margin: 0 0 0 -${sizeValue.value}`,
        top: `margin: ${sizeValue.value} 0 0 0`,
        bottom: `margin: -${sizeValue.value} 0 0 0`,
      }[placement.value];
      if (visible.value) {
        parentNode.value.style.cssText += marginStr;
      } else {
        parentNode.value.style.cssText = parentNode.value.style.cssText.replace(/margin:.+;/, '');
      }
    };
    onUpdated(() => {
      updatePushMode();
    });
    watch(modeAndPlacement, handlePushMode, { immediate: true });

    const { showInAttachedElement, showOverlay } = toRefs(props);
    const drawerClasses = computed(() => [
      name,
      `${name}-${placement.value}`,
      {
        [`${name}-open`]: visible.value,
        [`${name}-attach`]: showInAttachedElement.value,
        [`${name}-no-mask`]: !showOverlay.value,
      },
    ]);
    const wraperStyles = computed(() => ({
      // 用于抵消动画效果：transform: translateX(100%); 等
      transform: visible.value ? 'translateX(0)' : undefined,
      width: ['left', 'right'].includes(placement.value) ? sizeValue.value : '',
      height: ['top', 'bottom'].includes(placement.value) ? sizeValue.value : '',
    }));
    const wraperClasses = computed(() => [`${name}__content-wrapper`, `${name}__content-wrapper-${placement.value}`]);
    const footerStyle = computed(() => ({
      display: 'flex',
      justifyContent: placement.value === 'right' ? 'flex-start' : 'flex-end',
    }));

    const getBtnText = ((api: FooterButton) => typeof api === 'object' ? api.content : api);
    const getBtnProps = ((api: FooterButton) => typeof api === 'object' ? api : {});

    const { cancelBtn, confirmBtn } = toRefs(props);
    const confirmBtnAction = ((e: MouseEvent) => {
      emit('click-confirm', e);
    });
    const cancelBtnAction = ((e: MouseEvent) => {
      emit('click-cancel', e);
      closeDrawer({ trigger: 'clickCancel', e });
    });
    const closeDrawer = ((params: CloseContext) => {
      emit('close', params);
      emit('update:visible', false);
    });
    const getDefaultFooter = (() => (
        <div>
          <t-button variant="outline" onClick={cancelBtnAction} {...getBtnProps(cancelBtn.value)}>
            {getBtnText(cancelBtn.value)}
          </t-button>
          <t-button onClick={confirmBtnAction} {...getBtnProps(confirmBtn.value)}>
            {getBtnText(confirmBtn.value)}
          </t-button>
        </div>
    ));

    const handleCloseBtnClick = ((e: MouseEvent) => {
      emit('click-close-btn', e);
      closeDrawer({ trigger: 'clickCloseBtn', e });
    });
    const { closeOnClickOverlay } = toRefs(props);
    const handleWrapperClick = ((e: MouseEvent) => {
      emit('click-overlay', e);
      if (closeOnClickOverlay.value) {
        closeDrawer({ trigger: 'clickOverlay', e });
      }
    });
    const { closeOnKeydownEsc } = toRefs(props);
    const onKeyDown = ((e: KeyboardEvent) => {
      if (closeOnKeydownEsc && e.key === 'Escape') {
        emit('keydown-esc', e);
        closeDrawer({ trigger: 'keydownEsc', e });
      }
    });
    return {
      el,
      sizeValue,
      drawerClasses,
      wraperClasses,
      wraperStyles,
      footerStyle,
      parentNode,
      modeAndPlacement,
      getBtnText,
      getBtnProps,
      confirmBtnAction,
      cancelBtnAction,
      closeDrawer,
      getDefaultFooter,
      handleCloseBtnClick,
      handleWrapperClick,
      onKeyDown,
    };
  },

  render() {
    if (this.destroyOnClose && !this.visible) return;
    const defaultCloseBtn = <t-icon-close class="t-submenu-icon"></t-icon-close>;
    const body = renderContent(this, 'default', 'body');
    const defaultFooter = this.getDefaultFooter();
    return (
      <div
        class={this.drawerClasses}
        style={{ zIndex: this.zIndex }}
        onkeydown={this.onKeyDown}
        v-transfer-dom={this.attach}
        ref={'el'}
      >
        {this.showOverlay && <div class={`${name}__mask`} onClick={this.handleWrapperClick} />}
        <div class={this.wraperClasses} style={this.wraperStyles}>
          <div class={`${name}__header`}>{renderTNodeJSX(this, 'header')}</div>
          <div class={`${name}__close-btn`} onClick={this.handleCloseBtnClick}>{renderTNodeJSX(this, 'closeBtn', defaultCloseBtn)}</div>
          <div class={`${name}__body`}>{body}</div>
          {this.footer ? <div class={`${name}__footer`}>{renderTNodeJSX(this, 'footer', defaultFooter)}</div> : null}
        </div>
      </div>
    );
  },
});
