import Vue, { VNode } from 'vue';
import { prefix } from '../config';
import { on, off, addClass } from '../utils/dom';
import RenderComponent from '../utils/render-component';
import IconPromptFill from '../icon/prompt_fill';
import IconSuccessFill from '../icon/success_fill';
import IconWarningFill from '../icon/warning_fill';
import IconClose from '../icon/close';

const name = `${prefix}-alert`;

export default Vue.extend({
  name,
  components: {
    RenderComponent,
  },
  props: {
    title: [String, Object, Function],
    message: [String, Object, Array, Function],
    operation: [Object, Function],
    theme: {
      type: String,
      default: 'info',
      validator(v: string): boolean {
        return ['success', 'info', 'warning', 'error'].includes(v);
      },
    },
    icon: {
      type: [Boolean, Function],
      default: false,
    },
    close: {
      type: [Boolean, String, Function],
      default: false,
    },
    maxLine: {
      type: Number,
      default: 0,
    },
    collapseText: {
      type: Array,
      default: (): string[] => ['展开全部', '收起'],
    },
    beforeClose: {
      type: Function,
      default: (): Function => ((): boolean | Promise<boolean> => true),
    },
  },
  data() {
    return {
      // 是否可见，关闭后置为false
      visible: true,
      // 是否已收起，使用折叠功能时有效，用于表示是否已折叠；默认折叠
      collapsed: true,
    };
  },
  render(): VNode {
    const _class = [
      `${name}`,
      `${name}--${this.theme}`,
      {
        [`${prefix}-is-hidden`]: !this.visible,
      },
    ];
    return (
      <div class={ _class }>
        { this.renderIcon() }
        { this.renderContent() }
        { this.renderClose() }
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
        iconContent = this.icon();
      } else if (this.icon === true) {
        const component = ({
          info: IconPromptFill,
          success: IconSuccessFill,
          warning: IconWarningFill,
          error: IconWarningFill,
        })[this.theme];
        iconContent = <component></component>;
      } else {
        iconContent = this.$scopedSlots.icon && this.$scopedSlots.icon(null)[0];
      }
      return iconContent ? <div class={`${name}__icon`}>{ iconContent }</div> : null;
    },

    renderClose(): VNode {
      let closeContent: VNode | string;
      if (typeof this.close === 'string') {
        closeContent = this.close;
      } else if (typeof this.close === 'function') {
        closeContent = this.close();
      } else if (this.close === true) {
        closeContent = <IconClose></IconClose>;
      } else {
        closeContent = this.$scopedSlots.close && this.$scopedSlots.close(null)[0];
      }
      return closeContent ? <div class={`${name}__close`} onClick={this.handleClose}> { closeContent }</div> : null;
    },

    renderContent(): VNode {
      return (
        <div class={`${name}__content`}>
          { this.renderTitle() }
          { this.renderMessage() }
        </div>
      );
    },

    renderTitle(): VNode {
      let titleContent: VNode | string;
      if (typeof this.title === 'string') {
        titleContent = this.title;
      } else if (typeof this.title === 'function') {
        titleContent = this.title();
      } else {
        titleContent = this.$scopedSlots.title && this.$scopedSlots.title(null)[0];
      }
      return titleContent ? <div class={`${name}__title`}> { titleContent }</div> : null;
    },

    renderMessage(): VNode {
      let operationContent: VNode;
      if (typeof this.operation === 'function') {
        operationContent = this.operation();
      } else {
        operationContent = this.$scopedSlots.operation && this.$scopedSlots.operation(null)[0];
      }
      return (
        <div class={`${name}__message`}>
          { this.renderDescription() }
          { operationContent ? (
            <div class={`${name}__operation`}>
              { operationContent }
            </div>
          ) : null }
        </div>
      );
    },

    renderDescription(): VNode {
      let messageContent: VNode | string | Array<VNode | string>;
      if (typeof this.message === 'string') {
        messageContent = this.message;
      } else if (typeof this.message === 'function') {
        messageContent = this.message();
      } else {
        messageContent = (this.$scopedSlots.message && this.$scopedSlots.message(null))
          || (this.$scopedSlots.default && this.$scopedSlots.default(null));
      }

      const contentLength = Object.prototype.toString.call(messageContent) === '[object Array]' ? (messageContent as Array<VNode | string>).length : 1;
      const hasCollapse = this.maxLine > 0 && this.maxLine < contentLength;
      if (hasCollapse && this.collapsed) {
        messageContent = (messageContent as Array<VNode | string>).slice(0, this.maxLine);
      }

      // 如果需要折叠，则元素之间补<br/>；否则不补
      return (
        <div class={`${name}__description`}>
          { hasCollapse ? (messageContent as Array<string|VNode>).map(content => (
            <div>
              { content }
            </div>
          )) : messageContent }
          { hasCollapse ? (
            <div class="t-alert__collapse" onClick={() => {
              this.collapsed = !this.collapsed;
            }} >
              { this.collapsed ? this.collapseText[0] : this.collapseText[1] }
            </div>
          ) : null}
        </div>
      );
    },

    handleClose(e: Event) {
      Promise.resolve(this.beforeClose(e))
        .then((close) => {
          if (close === false) return;
          addClass(this.$el, `${name}--closing`);
        });
    },

    handleCloseEnd(e: TransitionEvent) {
      if (e.propertyName === 'opacity') {
        this.visible = false;
        this.$emit('closed', e);
      }
    },
  },
});
