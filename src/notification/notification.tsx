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
    visible: {
      type: Boolean,
      default: false,
    },
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
          ].indexOf(v) > -1
        );
      },
    },
    duration: {
      type: Number,
      default: 3000,
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
    offset: Object,
    icon: Function,
    footer: Function,
    opened: Function,
    closed: Function,
    _top: {
      type: Number,
      default: 0,
    },
    _bottom: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      myVisible: false,
    };
  },
  watch: {
    visible: {
      handler(newVal) {
        this.visibleChange(newVal);
      },
      immediate: true,
    },
  },
  methods: {
    visibleChange(visible: boolean) {
      this.myVisible = visible;
      this.$forceUpdate();
      if (visible) {
        if (this.duration > 0) {
          setTimeout(() => {
            this.handleClose();
          }, this.duration);
        }
        if (this.opened) this.opened();
      }
    },
    handleClose() {
      this.visibleChange(false);
      if (this.closed) this.closed();
      const evt = document.createEvent('HTMLEvents');
      evt.initEvent('transitionEnd', false, false);
      this.$el.dispatchEvent(evt);
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
    if (!this.myVisible) return;

    const icon = this.renderIcon(h);
    const close = this.renderCloseIcon(h);
    const content = this.renderContent(h);
    const footer = this.renderFooter(h);

    // display
    let top = 0;
    let bottom = 0;
    let left = 0;
    let right = 0;
    if (this.placement.indexOf('top') !== -1) {
      const offsetTop = this.offset && this.offset.top ? this.offset.top : 0;
      top += this._top + offsetTop;
    }
    if (this.placement.indexOf('bottom') !== -1) {
      const offsetBottom = this.offset && this.offset.bottom ? this.offset.bottom : 0;
      bottom += this._bottom + offsetBottom;
    }
    if (this.placement.indexOf('left') !== -1 && this.offset && this.offset.left) {
      left = this.offset.left + 16;
    }
    if (this.placement.indexOf('right') !== -1 && this.offset && this.offset.right) {
      right = this.offset.right + 16;
    }

    const style = `${top ? `top: ${top}px;` : ''}` +
      `${bottom ? `bottom: ${bottom}px;` : ''}` +
      `${left ? `left: ${left}px;` : ''}` +
      `${right ? `right: ${right}px;` : ''}` +
      `${this.zIndex ? `z-index: ${this.zIndex};` : ''}`;

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
