import Vue, { CreateElement, VNode } from 'vue';
import { prefix } from '../config';
import TIconPromptFill from '../icon/prompt-fill';
import TIconSuccessFill from '../icon/success-fill';
import TIconClose from '../icon/close';

const name = `${prefix}-notification`;

export default Vue.extend({
  name,
  components: {
    TIconPromptFill,
    TIconSuccessFill,
    TIconClose,
  },
  props: {
    theme: {
      type: String,
      default: '',
      validator(v: string): boolean {
        return (
          [
            '',
            'info',
            'success',
            'warning',
            'error',
          ].indexOf(v) > -1
        );
      },
    },
    placement: {
      type: String,
      default: 'top-right',
      validator(v: string): boolean {
        return (
          [
            'top-left',
            'top-right',
            'bottom-left',
            'bottom-right',
            'none',
          ].indexOf(v) > -1
        );
      },
    },
    duration: {
      type: Number,
      default: 0,
    },
    close: {
      type: [Boolean, String, Function],
      default: true,
    },
    zIndex: {
      type: Number,
      default: 6000,
    },
    title: String,
    default: [String, Function],
    icon: Function,
    footer: Function,
    opened: Function,
    closed: Function,
    verticalOffset: {
      type: Number,
      default: 0,
    },
    horizontalOffset: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      visible: true,
    };
  },
  mounted() {
    if (this.duration > 0) {
      setTimeout(() => {
        this.handleClose();
      }, this.duration);
    }
    if (this.opened) this.opened();
  },
  methods: {
    visibleChange(visible: boolean) {
      this.visible = visible;
      this.$forceUpdate();
    },
    handleClose() {
      this.visibleChange(false);
      if (this.closed) this.closed();
    },
    renderIcon(h: CreateElement) {
      let icon: VNode[] | VNode | string = '';

      if (this.theme) {
        const iconType = this.theme === 'success' ? 'success' : 'prompt';
        icon = (<div class='t-notification__icon'>
          <t-icon name={`${iconType}-fill`} class={`t-is-${this.theme}`} />
        </div>);
      } else if (this.icon || this.$scopedSlots.icon) {
        if (this.icon) {
          icon = (<div class={`${name}__icon`}>{this.icon(h)}</div>);
        }
        icon = this.$scopedSlots.icon ? this.$scopedSlots.icon(null) : icon;
      }

      return icon;
    },
    renderCloseIcon(h: CreateElement) {
      let close: VNode[] | VNode | string = '';

      switch (typeof this.close) {
        case 'boolean': {
          if (this.close === true) {
            if (this.$scopedSlots.close) {
              close = this.$scopedSlots.close(null);
            } else {
              close = (<t-icon name="close" />);
            }
          }
          break;
        }
        case 'function': {
          close = this.close(h);
          break;
        }
        case 'string': {
          /* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: true}}] */
          close = this.close;
          break;
        }
      };

      return close;
    },
    renderContent(h: CreateElement) {
      let content: VNode[] | VNode | string = '';

      switch (typeof this.default) {
        case 'function': {
          content = this.default(h);
          break;
        }
        case 'string': {
          content = this.default ? (<div class={`${name}__content`}>{this.default}</div>) : '';
          break;
        }
      };
      content = this.$scopedSlots.default ? this.$scopedSlots.default(null) : content;

      return content;
    },
    renderFooter(h: CreateElement) {
      let footer: VNode[] | VNode | string = '';

      if (this.footer) {
        footer = this.footer(h);
      };
      footer = this.$scopedSlots.footer ? this.$scopedSlots.footer(null) : footer;

      return footer;
    },
  },
  render(h: CreateElement) {
    if (!this.visible) return;

    const icon = this.renderIcon(h);
    const close = this.renderCloseIcon(h);
    const content = this.renderContent(h);
    const footer = this.renderFooter(h);

    // display
    let style = '';
    if (this.placement !== 'none') {
      const verticalDirection = this.placement.indexOf('top') !== -1 ? 'top' : 'bottom';
      const horizontalDirection = this.placement.indexOf('left') !== -1 ? 'left' : 'right';
      style += `${verticalDirection}: ${this.verticalOffset}px;`;
      style += `${horizontalDirection}: ${this.horizontalOffset}px;`;
      style += `${this.zIndex ? `z-index: ${this.zIndex};` : ''}`;
    }

    return (
      <div class={`${name} ${name}__show--${this.placement}`} style={style}>
        {icon}
        <div class={`${name}__main`}>
          <div class={`${name}__title__wrap`}>
            <span class={`${name}__title`}>{this.title}</span>
            <div onclick={this.handleClose}>{close}</div>
          </div>
          {content}
          {footer}
        </div>
      </div>
    );
  },
});
