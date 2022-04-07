import { defineComponent, h } from 'vue';
import {
  InfoCircleFilledIcon,
  CheckCircleFilledIcon,
  ErrorCircleFilledIcon,
  HelpCircleFilledIcon,
  CloseIcon,
} from 'tdesign-icons-vue-next';
import TLoading from '../loading';

import { THEME_LIST } from './const';
import { renderTNodeJSX, renderContent } from '../utils/render-tnode';
import props from './props';
import { emitEvent } from '../utils/event';
import { usePrefixClass } from '../hooks';
import { fadeIn, fadeOut } from './animation';

export default defineComponent({
  name: 'TMessage',

  props: {
    ...props,
    placement: String, // just for animation
  },

  emits: ['duration-end', 'click-close-btn'],

  setup() {
    const COMPONENT_NAME = usePrefixClass('message');
    const classPrefix = usePrefixClass();
    return {
      classPrefix,
      COMPONENT_NAME,
    };
  },

  data() {
    return {
      timer: null,
    };
  },
  computed: {
    classes(): Array<any> {
      const status = {};
      THEME_LIST.forEach((t) => {
        status[`${this.classPrefix}-is-${t}`] = this.theme === t;
      });
      return [
        this.COMPONENT_NAME,
        status,
        {
          [`${this.classPrefix}-is-closable`]: this.closeBtn || this.$slots.closeBtn,
        },
      ];
    },
  },

  created() {
    this.duration && this.setTimer();
  },

  mounted() {
    const msgDom = this.$refs.msg as HTMLElement;
    fadeIn(msgDom, this.$props.placement);
  },

  methods: {
    setTimer() {
      if (!this.duration) {
        return;
      }
      this.timer = Number(
        setTimeout(() => {
          this.clearTimer();
          const msgDom = this.$refs.msg as HTMLElement;
          fadeOut(msgDom, this.$props.placement, () => {
            this.$emit('duration-end');
          });
        }, this.duration),
      );
    },
    clearTimer() {
      this.duration && clearTimeout(this.timer);
    },
    close(e?: MouseEvent) {
      emitEvent(this, 'click-close-btn', e);
    },
    renderClose() {
      const defaultClose = <CloseIcon />;
      return (
        <span class={`${this.COMPONENT_NAME}__close`} onClick={this.close}>
          {renderTNodeJSX(this, 'closeBtn', defaultClose)}
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
      <div ref="msg" class={this.classes} onMouseenter={this.clearTimer} onMouseleave={this.setTimer}>
        {this.renderIcon()}
        {renderContent(this, 'content', 'default')}
        {this.renderClose()}
      </div>
    );
  },
});
