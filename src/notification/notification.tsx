import Vue, { CreateElement, VNode } from 'vue';
import { prefix } from '../config';
import TIconPromptFill from '../icon/prompt_fill';
import TIconSuccessFill from '../icon/success_fill';
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
    duration: {
      type: Number,
      default: 0,
    },
    closeBtn: {
      type: [Boolean, String, Function],
      default: true,
    },
    title: String,
    default: [String, Function],
    icon: Function,
    footer: Function,
  },
  mounted() {
    if (this.duration > 0) {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        this.$emit('duration-end', this);
      }, this.duration);
    }
  },
  methods: {
    close(e: Event) {
      this.$emit('click-close-btn', e, this);
    },
    renderIcon(h: CreateElement) {
      let icon: VNode[] | VNode | string = '';

      if (this.theme) {
        const iconType = this.theme === 'success'
          ? (<t-icon-success-fill class={`t-is-${this.theme}`} />)
          : (<t-icon-prompt-fill class={`t-is-${this.theme}`} />);
        icon = (<div class='t-notification__icon'>
          {iconType}
        </div>);
      } else if (this.icon || this.$scopedSlots.icon) {
        if (this.icon) {
          icon = this.icon(h);
        }
        icon = this.$scopedSlots.icon ? this.$scopedSlots.icon(null) : icon;
      }

      return icon;
    },
    renderCloseIcon(h: CreateElement) {
      let close: VNode[] | VNode | string = '';

      switch (typeof this.closeBtn) {
        case 'boolean': {
          if (this.closeBtn === true) {
            if (this.$scopedSlots.closeBtn) {
              close = this.$scopedSlots.closeBtn(null);
            } else {
              close = (<t-icon-close nativeOnClick={this.close} />);
            }
          }
          break;
        }
        case 'function': {
          close = this.closeBtn(h);
          break;
        }
        case 'string': {
          close = <div onclick={this.close}>{this.closeBtn}</div>;
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
    const icon = this.renderIcon(h);
    const close = this.renderCloseIcon(h);
    const content = this.renderContent(h);
    const footer = this.renderFooter(h);

    return (
      <div class={`${name}`}>
        {icon}
        <div class={`${name}__main`}>
          <div class={`${name}__title__wrap`}>
            <span class={`${name}__title`}>{this.title}</span>
            {close}
          </div>
          {content}
          {footer}
        </div>
      </div>
    );
  },
});
