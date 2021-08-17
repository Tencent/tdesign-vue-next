import { defineComponent, nextTick } from 'vue';
import { prefix } from '../config';
import TIconClose from '../icon/close';
import { Button as TButton } from '../button';
import props from './props';
import { FooterButton, DrawerCloseContext } from './type';
import { renderTNodeJSX, renderContent } from '../utils/render-tnode';
import TransferDom from '../utils/transfer-dom';

const name = `${prefix}-drawer`;

export default defineComponent({
  name,

  components: {
    TIconClose,
    TButton,
  },

  directives: {
    TransferDom,
  },

  props: { ...props },

  emits: ['open', 'close', 'opened', 'closed', 'update:visible', 'click-overlay', 'click-close-btn', 'keydown-esc', 'click-confirm', 'click-cancel'],

  computed: {
    drawerClasses(): ClassName {
      return [
        't-drawer',
        `t-drawer-${this.placement}`,
        {
          't-drawer-open': this.visible,
          't-drawer-attach': this.showInAttachedElement,
          't-drawer-no-mask': !this.showOverlay,
        },
      ];
    },
    sizeValue(): string {
      const defaultSize = isNaN(Number(this.size)) ? this.size : `${this.size}px`;
      return {
        small: '300px',
        medium: '500px',
        large: '760px',
      }[this.size] || defaultSize;
    },
    wraperStyles(): Styles {
      return {
        // 用于抵消动画效果：transform: translateX(100%); 等
        transform: this.visible ? 'translateX(0)' : undefined,
        width: ['left', 'right'].includes(this.placement) ? this.sizeValue : '',
        height: ['top', 'bottom'].includes(this.placement) ? this.sizeValue : '',
      };
    },
    wraperClasses(): ClassName {
      return ['t-drawer__content-wrapper', `t-drawer__content-wrapper-${this.placement}`];
    },
    parentNode(): HTMLElement {
      return this.$el && this.$el.parentNode as HTMLElement;
    },
    modeAndPlacement(): string {
      return [this.mode, this.placement].join();
    },
  },

  watch: {
    modeAndPlacement: {
      handler() {
        this.handlePushMode();
      },
      immediate: true,
    },
  },

  updated() {
    this.updatePushMode();
  },

  methods: {
    handlePushMode() {
      if (this.mode !== 'push') return;
      nextTick(() => {
        if (!this.parentNode) return;
        this.parentNode.style.cssText = 'transition: margin 300ms cubic-bezier(0.7, 0.3, 0.1, 1) 0s;';
      });
    },
    // push 动画效果处理
    updatePushMode() {
      if (!this.parentNode) return;
      if (this.mode !== 'push' || !this.parentNode) return;
      const marginStr = {
        left: `margin: 0 0 0 ${this.sizeValue}`,
        right: `margin: 0 0 0 -${this.sizeValue}`,
        top: `margin: ${this.sizeValue} 0 0 0`,
        bottom: `margin: -${this.sizeValue} 0 0 0`,
      }[this.placement];
      if (this.visible) {
        this.parentNode.style.cssText += marginStr;
      } else {
        this.parentNode.style.cssText = this.parentNode.style.cssText.replace(/margin:.+;/, '');
      }
    },
    getBtnText(api: FooterButton) {
      return typeof api === 'object' ? api.content : api;
    },
    getBtnProps(api: FooterButton) {
      return typeof api === 'object' ? api : {};
    },
    getDefaultFooter() {
      return (
        <div>
          <t-button onClick={this.confirmBtnAction} {...this.getBtnProps(this.confirmBtn)}>
            { this.getBtnText(this.confirmBtn) || '确认' }
          </t-button>
          <t-button variant="outline" onClick={this.cancelBtnAction} {...this.getBtnProps(this.cancelBtn)}>
            { this.getBtnText(this.cancelBtn) || '取消' }
          </t-button>
        </div>
      );
    },
    handleCloseBtnClick(e: MouseEvent) {
      this.$emit('click-close-btn', e);
      this.closeDrawer({ trigger: 'close-btn', e });
    },
    handleWrapperClick(e: MouseEvent) {
      this.$emit('click-overlay', e);
      if (this.closeOnOverlayClick) {
        this.closeDrawer({ trigger: 'overlay', e });
      }
    },
    onKeyDown(e: KeyboardEvent) {
      if (this.closeOnKeydownEsc && e.key === 'Escape') {
        this.$emit('keydown-esc', e);
        this.closeDrawer({ trigger: 'esc', e });
      }
    },
    confirmBtnAction(e: MouseEvent) {
      this.$emit('click-confirm', e);
    },
    cancelBtnAction(e: MouseEvent) {
      this.$emit('click-cancel', e);
      this.closeDrawer({ trigger: 'cancel', e });
    },
    closeDrawer(params: DrawerCloseContext) {
      this.$emit('close', params);
      this.$emit('update:visible', false);
    },
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
        onKeydown={this.onKeyDown}
        v-transfer-dom={this.attach}
      >
        {this.showOverlay && <div class={`${name}__mask`} onClick={this.handleWrapperClick}/>}
        <div class={this.wraperClasses} style={this.wraperStyles}>
          <div class={`${name}__header`}>{renderTNodeJSX(this, 'header')}</div>
          <div class={`${name}__close-btn`} onClick={this.handleCloseBtnClick}>{renderTNodeJSX(this, 'closeBtn', defaultCloseBtn)}</div>
          <div class={`${name}__body`}>{body}</div>
          {this.footer ? <div class={`${name}__footer`}>{renderTNodeJSX(this, 'footer', defaultFooter)}</div> : null }
        </div>
      </div>
    );
  },
});
