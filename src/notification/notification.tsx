import Vue, { CreateElement, VNode } from 'vue';
import { prefix } from '../config';
import TIconInfoCircleFilled from '../icon/info-circle-filled';
import TIconCheckCircleFilled from '../icon/check-circle-filled';
import TIconClose from '../icon/close';
import props from '@TdTypes/notification/props';

const name = `${prefix}-notification`;

export default Vue.extend({
  name,
  components: {
    TIconInfoCircleFilled,
    TIconCheckCircleFilled,
    TIconClose,
  },
  props: { ...props },
  mounted() {
    if (this.duration > 0) {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        this.$emit('duration-end', this);
        if (this.onDurationEnd) {
          this.onDurationEnd();
        };
      }, this.duration);
    }
  },
  methods: {
    close(e?: MouseEvent) {
      this.$emit('click-close-btn', e, this);
      if (this.onClickCloseBtn) {
        this.onClickCloseBtn(e);
      };
    },
    renderIcon(h: CreateElement) {
      let icon: VNode[] | VNode | string = '';

      if (this.theme) {
        const iconType = this.theme === 'success'
          ? (<t-icon-check-circle-filled class={`t-is-${this.theme}`} />)
          : (<t-icon-info-circle-filled class={`t-is-${this.theme}`} />);
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
              close = <div class='t-icon-close'>{this.$scopedSlots.closeBtn(null)}</div>;
            } else {
              close = (<t-icon-close nativeOnClick={this.close} />);
            }
          }
          break;
        }
        case 'function': {
          close = <div class='t-icon-close'>{this.closeBtn(h)}</div>;
          break;
        }
        case 'string': {
          close = <div class='t-icon-close' onclick={this.close}>{this.closeBtn}</div>;
          break;
        }
      };

      return close;
    },
    renderContent(h: CreateElement) {
      let content: VNode[] | VNode | string = '';

      switch (typeof this.content) {
        case 'function': {
          content = <div class={`${name}__content`}>{this.content(h)}</div>;
          break;
        }
        case 'string': {
          content = this.content ? (<div class={`${name}__content`}>{this.content}</div>) : '';
          break;
        }
      };
      content = this.$scopedSlots.default ? <div class={`${name}__content`}>{this.$scopedSlots.default(null)}</div> : content;

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
