import { defineComponent, h, VNodeChild } from 'vue';
import { InfoCircleFilledIcon, CheckCircleFilledIcon, CloseIcon } from 'tdesign-icons-vue-next';
import isFunction from 'lodash/isFunction';
import { prefix } from '../config';
import { renderTNodeJSX, renderContent } from '../utils/render-tnode';
import props from './props';
import { emitEvent } from '../utils/event';

const name = `${prefix}-notification`;

export default defineComponent({
  name: 'TNotification',
  props: { ...props },
  emits: ['duration-end', 'click-close-btn'],
  mounted() {
    if (this.duration > 0) {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        emitEvent(this, 'duration-end', this);
      }, this.duration);
    }
  },
  methods: {
    close(e?: MouseEvent) {
      emitEvent(this, 'click-close-btn', e, this);
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
            <CheckCircleFilledIcon class={`t-is-${this.theme}`} />
          ) : (
            <InfoCircleFilledIcon class={`t-is-${this.theme}`} />
          );
        icon = <div class="t-notification__icon">{iconType}</div>;
      }
      return icon;
    },
    renderClose() {
      const defaultClose = <CloseIcon />;
      return (
        <span class={`${prefix}-message__close`} onClick={this.close}>
          {renderTNodeJSX(this, 'closeBtn', defaultClose)}
        </span>
      );
    },
    renderContent() {
      return <div class={`${name}__content`}>{renderContent(this, 'default', 'content')}</div>;
    },
  },
  render() {
    const icon = this.renderIcon();
    const close = this.renderClose();
    const content = this.renderContent();
    const footer = renderTNodeJSX(this, 'footer');
    const title = renderTNodeJSX(this, 'title');

    return (
      <div class={`${name}`}>
        {icon}
        <div class={`${name}__main`}>
          <div class={`${name}__title__wrap`}>
            <span class={`${name}__title`}>{title}</span>
            {close}
          </div>
          {content}
          {footer}
        </div>
      </div>
    );
  },
});
