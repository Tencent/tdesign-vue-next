import {
  defineComponent, h, VNode, ComponentPublicInstance,
} from 'vue';
import { prefix } from '../config';
import { on, off, addClass } from '../utils/dom';
import IconPromptFill from '../icon/info-circle-filled';
import IconSuccessFill from '../icon/check-circle-filled';
import IconWarningFill from '../icon/error-circle-filled';
import IconClose from '../icon/close';
import props from './props';
import { renderTNodeJSX } from '../utils/render-tnode';
import { SlotReturnValue } from '../common';

const name = `${prefix}-alert`;

export default defineComponent({
  name,
  props: { ...props },
  emits: ['close', 'closed'],
  data() {
    return {
      // 是否可见，关闭后置为false
      visible: true,
      // 是否已收起，使用折叠功能时有效，用于表示是否已折叠；默认折叠
      collapsed: true,
    };
  },
  mounted() {
    on(this.$el, 'transitionend', this.handleCloseEnd);
  },
  beforeUnmount() {
    off(this.$el, 'transitionend', this.handleCloseEnd);
  },
  methods: {
    renderIcon() {
      let iconContent;
      if (typeof this.icon === 'function') {
        iconContent = this.icon(h);
      } else if (this.$slots.icon) {
        iconContent = this.$slots.icon && this.$slots.icon(null)[0];
      } else {
        const component = ({
          info: IconPromptFill,
          success: IconSuccessFill,
          warning: IconWarningFill,
          error: IconWarningFill,
        })[this.theme as string];
        iconContent = <component></component>;
      }
      return iconContent ? <div class={`${name}__icon`}>{iconContent}</div> : null;
    },

    renderClose() {
      let closeContent = null;
      if (typeof this.close === 'string') {
        closeContent = this.close;
      } else if (typeof this.close === 'function') {
        // @ts-ignore: TODO
        closeContent = this.close(h);
      } else if (this.close === true) {
        closeContent = <IconClose></IconClose>;
      } else {
        closeContent = this.$slots.close && this.$slots.close(null)[0];
      }
      return closeContent ? <div class={`${name}__close`} onClick={this.handleClose}>{closeContent}</div> : null;
    },

    renderContent() {
      return (
        <div class={`${name}__content`}>
          { this.renderTitle()}
          { this.renderMessage()}
        </div>
      );
    },

    renderTitle() {
      const titleContent = renderTNodeJSX(this as ComponentPublicInstance, 'title');
      return titleContent ? <div class={`${name}__title`}> {titleContent}</div> : null;
    },

    renderMessage() {
      const operationContent = renderTNodeJSX(this as ComponentPublicInstance, 'operation');
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

    renderDescription() {
      let messageContent;

      messageContent = renderTNodeJSX(this as ComponentPublicInstance, 'default');
      if (!messageContent) {
        messageContent = renderTNodeJSX(this as ComponentPublicInstance, 'message');
      }

      const contentLength = Array.isArray(messageContent) ? (messageContent as Array<SlotReturnValue>).length : 1;
      const hasCollapse = this.maxLine > 0 && this.maxLine < contentLength;
      if (hasCollapse && this.collapsed) {
        messageContent = (messageContent as Array<SlotReturnValue>).slice(0, this.maxLine as number);
      }

      // 如果需要折叠，则元素之间补<br/>；否则不补
      return (
        <div class={`${name}__description`}>
          { hasCollapse ? (messageContent as Array<string | VNode>).map((content) => (
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
      addClass(this.$el, `${name}--closing`);
    },

    handleCloseEnd(e: TransitionEvent) {
      if (e.propertyName === 'opacity') {
        this.visible = false;
        this.$emit('closed', { e });
      }
    },
  },
  render() {
    const CLASS = [
      `${name}`,
      `${name}--${this.theme}`,
      {
        [`${prefix}-is-hidden`]: !this.visible,
      },
    ];
    return (
      <div class={CLASS}>
        { this.renderIcon()}
        { this.renderContent()}
        { this.renderClose()}
      </div>
    );
  },
});
