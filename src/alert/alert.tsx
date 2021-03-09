import Vue, { VNode } from 'vue';
import { prefix } from '../config';
import { on, off, addClass } from '../utils/dom';
import IconPromptFill from '../icon/info-circle-filled';
import IconSuccessFill from '../icon/check-circle-filled';
import IconWarningFill from '../icon/error-circle-filled';
import IconClose from '../icon/close';
import props from '@TdTypes/alert/props';
import { ScopedSlotReturnValue } from 'vue/types/vnode';
import { renderTNodeJSX } from '../utils/render-tnode';

const name = `${prefix}-alert`;

export default Vue.extend({
  name,
  data() {
    return {
      // 是否可见，关闭后置为false
      visible: true,
      // 是否已收起，使用折叠功能时有效，用于表示是否已折叠；默认折叠
      collapsed: true,
    };
  },
  props: { ...props },
  render(): VNode {
    const _class = [
      `${name}`,
      `${name}--${this.theme}`,
      {
        [`${prefix}-is-hidden`]: !this.visible,
      },
    ];
    return (
      <div class={_class}>
        { this.renderIcon()}
        { this.renderContent()}
        { this.renderClose()}
      </div>
    );
  },
  mounted() {
    on(this.$el, 'transitionend', this.handleCloseEnd);
  },
  beforeDestroy() {
    off(this.$el, 'transitionend', this.handleCloseEnd);
  },
  methods: {
    renderIcon(): VNode {
      let iconContent: VNode;
      if (typeof this.icon === 'function') {
        iconContent = this.icon(this.$createElement);
      } else if (this.$scopedSlots.icon) {
        iconContent = this.$scopedSlots.icon && this.$scopedSlots.icon(null)[0];
      } else {
        const component = ({
          info: IconPromptFill,
          success: IconSuccessFill,
          warning: IconWarningFill,
          error: IconWarningFill,
        })[this.theme];
        iconContent = <component></component>;
      }
      return iconContent ? <div class={`${name}__icon`}>{iconContent}</div> : null;
    },

    renderClose(): VNode {
      let closeContent: ScopedSlotReturnValue = null;
      if (typeof this.close === 'string') {
        closeContent = this.close;
      } else if (typeof this.close === 'function') {
        closeContent = this.close(this.$createElement);
      } else if (this.close === true) {
        closeContent = <IconClose></IconClose>;
      } else {
        closeContent = this.$scopedSlots.close && this.$scopedSlots.close(null)[0];
      }
      return closeContent ? <div class={`${name}__close`} onClick={this.handleClose}>{closeContent}</div> : null;
    },

    renderContent(): VNode {
      return (
        <div class={`${name}__content`}>
          { this.renderTitle()}
          { this.renderMessage()}
        </div>
      );
    },

    renderTitle(): VNode  {
      const titleContent: ScopedSlotReturnValue = renderTNodeJSX(this, 'title');
      return titleContent ? <div class={`${name}__title`}> {titleContent}</div> : null;
    },

    renderMessage(): VNode {
      const operationContent: ScopedSlotReturnValue = renderTNodeJSX(this, 'operation');
      return (
        <div class={`${name}__message`}>
          { this.renderDescription()}
          { operationContent ? (
            <div class={`${name}__operation`}>
              { operationContent }
            </div>
          ) : null}
        </div>
      );
    },

    renderDescription(): VNode {
      let messageContent: ScopedSlotReturnValue;

      messageContent = renderTNodeJSX(this, 'default');
      if (!messageContent) {
        messageContent = renderTNodeJSX(this, 'message');
      }

      const contentLength = Object.prototype.toString.call(messageContent) === '[object Array]' ? (messageContent as Array<ScopedSlotReturnValue>).length : 1;
      const hasCollapse = this.maxLine > 0 && this.maxLine < contentLength;
      if (hasCollapse && this.collapsed) {
        messageContent = (messageContent as Array<ScopedSlotReturnValue>).slice(0, this.maxLine);
      }

      // 如果需要折叠，则元素之间补<br/>；否则不补
      return (
        <div class={`${name}__description`}>
          { hasCollapse ? (messageContent as Array<string | VNode>).map(content => (
            <div>
              { content}
            </div>
          )) : messageContent}
          { hasCollapse ? (
            <div class="t-alert__collapse" onClick={() => {
              this.collapsed = !this.collapsed;
            }} >
              { this.collapsed ? '展开全部' : '收起'}
            </div>
          ) : null}
        </div>
      );
    },

    handleClose(e: MouseEvent) {
      this.$emit('close', { e });
      if (this.onClose) {
        this.onClose({ e });
      }
      addClass(this.$el, `${name}--closing`);
    },

    handleCloseEnd(e: TransitionEvent) {
      if (e.propertyName === 'opacity') {
        this.visible = false;
        this.$emit('closed', { e });
        if (this.onClosed) {
          this.onClosed({ e });
        }
      }
    },
  },
});
