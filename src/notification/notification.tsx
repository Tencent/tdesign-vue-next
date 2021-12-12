import { defineComponent, h, VNodeChild } from 'vue';
import { InfoCircleFilledIcon, CheckCircleFilledIcon, CloseIcon } from 'tdesign-icons-vue-next';
import isFunction from 'lodash/isFunction';
import { prefix } from '../config';
import props from './props';

const name = `${prefix}-notification`;

export default defineComponent({
  name,
  components: {
    InfoCircleFilledIcon,
    CheckCircleFilledIcon,
    CloseIcon,
  },
  props: { ...props },
  emits: ['duration-end', 'click-close-btn'],
  mounted() {
    if (this.duration > 0) {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        this.$emit('duration-end', this);
      }, this.duration);
    }
  },
  methods: {
    close(e?: MouseEvent) {
      this.$emit('click-close-btn', e, this);
    },
    renderIcon() {
      let icon;
      if (this.icon === false) return null;
      if (isFunction(this.icon)) {
        icon = this.icon(h);
      } else if (this.$slots.icon) {
        icon = this.$slots.icon(null);
      } else if (this.theme) {
        const iconType =
          this.theme === 'success' ? (
            <check-circle-filled-icon class={`t-is-${this.theme}`} />
          ) : (
            <info-circle-filled-icon class={`t-is-${this.theme}`} />
          );
        icon = <div class="t-notification__icon">{iconType}</div>;
      }
      return icon;
    },
    renderClose() {
      const { closeBtn } = this;
      if (typeof closeBtn === 'boolean') {
        return closeBtn && <close-icon onClick={this.close} class="t-message-close" />;
      }
      let close: VNodeChild = null;
      if (typeof closeBtn === 'function') {
        close = closeBtn(h);
      } else if (typeof closeBtn === 'string') {
        close = closeBtn;
      } else if (typeof this.$slots.closeBtn === 'function') {
        close = this.$slots.closeBtn(null);
      }
      if (close) {
        return (
          <div class="t-icon-close" onClick={this.close}>
            {' '}
            {close}{' '}
          </div>
        );
      }
    },
    renderContent() {
      let content;

      switch (typeof this.content) {
        case 'function': {
          content = <div class={`${name}__content`}>{this.content(h)}</div>;
          break;
        }
        case 'string': {
          content = this.content ? <div class={`${name}__content`}>{this.content}</div> : '';
          break;
        }
      }
      content = this.$slots.default ? <div class={`${name}__content`}>{this.$slots.default(null)}</div> : content;

      return content;
    },
    renderFooter() {
      let footer: VNodeChild;

      if (typeof this.footer === 'function') {
        footer = this.footer(h);
      }
      footer = this.$slots.footer ? this.$slots.footer(null) : footer;

      return footer;
    },
  },
  render() {
    const icon = this.renderIcon();
    const close = this.renderClose();
    const content = this.renderContent();
    const footer = this.renderFooter();

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
