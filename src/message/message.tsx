import { defineComponent, h, ComponentPublicInstance } from 'vue';
import {
  InfoCircleFilledIcon,
  CheckCircleFilledIcon,
  ErrorCircleFilledIcon,
  HelpCircleFilledIcon,
  CloseIcon,
} from 'tdesign-icons-vue-next';
import TLoading from '../loading';

import { prefix } from '../config';
import { THEME_LIST } from './const';
import { renderTNodeJSX, renderContent } from '../utils/render-tnode';
import props from './props';

const name = `${prefix}-message`;

export default defineComponent({
  name,

  props: { ...props },

  emits: ['duration-end', 'click-close-btn'],

  data() {
    return {
      timer: null,
    };
  },

  computed: {
    classes(): Array<any> {
      const status = {};
      THEME_LIST.forEach((t) => {
        status[`${prefix}-is-${t}`] = this.theme === t;
      });
      return [
        name,
        status,
        {
          [`${prefix}-is-closable`]: this.closeBtn || this.$slots.closeBtn,
        },
      ];
    },
  },

  created() {
    this.duration && this.setTimer();
  },

  methods: {
    setTimer() {
      if (!this.duration) {
        return;
      }
      this.timer = Number(
        setTimeout(() => {
          this.clearTimer();
          this.$emit('duration-end');
        }, this.duration),
      );
    },
    clearTimer() {
      this.duration && clearTimeout(this.timer);
    },
    close(e?: MouseEvent) {
      this.$emit('click-close-btn', e);
    },
    renderClose() {
      const defaultClose = <CloseIcon />;
      return (
        <span class={`${name}-close`} onClick={this.close}>
          {renderTNodeJSX(this as ComponentPublicInstance, 'closeBtn', defaultClose)}
        </span>
      );
    },
    renderIcon() {
      if (this.icon === false) return;
      if (typeof this.icon === 'function') return this.icon(h);
      if (this.$slots.icon) {
        return this.$slots.icon(null);
      }
      const Icon = {
        info: InfoCircleFilledIcon,
        success: CheckCircleFilledIcon,
        warning: ErrorCircleFilledIcon,
        error: ErrorCircleFilledIcon,
        question: HelpCircleFilledIcon,
        loading: TLoading,
      }[this.theme];
      return <Icon />;
    },
  },

  render() {
    return (
      <div class={this.classes} onMouseenter={this.clearTimer} onMouseleave={this.setTimer}>
        {this.renderIcon()}
        {renderContent(this as ComponentPublicInstance, 'default', 'content')}
        {this.renderClose()}
      </div>
    );
  },
});
