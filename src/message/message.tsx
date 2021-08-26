import { defineComponent, h, ComponentPublicInstance } from 'vue';
import { prefix } from '../config';
import TIconInfoCircleFilled from '../icon/info-circle-filled';
import TIconCheckCircleFilled from '../icon/check-circle-filled';
import TIconErrorCircleFilled from '../icon/error-circle-filled';
import TIconHelpFill from '../icon/help-circle-filled';
import TIconLoadingFill from '../icon/loading';
import TIconClose from '../icon/close';
import { THEME_LIST } from './const';
import { renderTNodeJSX, renderContent } from '../utils/render-tnode';
import props from './props';

const name = `${prefix}-message`;

export default defineComponent({
  name,

  components: {
    TIconInfoCircleFilled,
    TIconCheckCircleFilled,
    TIconErrorCircleFilled,
    TIconHelpFill,
    TIconLoadingFill,
    TIconClose,
  },

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
      this.timer = Number(setTimeout(() => {
        this.clearTimer();
        this.$emit('duration-end');
      }, this.duration));
    },
    clearTimer() {
      this.duration && clearTimeout(this.timer);
    },
    close(e?: MouseEvent) {
      this.$emit('click-close-btn', e);
    },
    renderClose() {
      const defaultClose = <t-icon-close />;
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
      // eslint-disable-next-line no-unused-vars
      const component = {
        info: TIconInfoCircleFilled,
        success: TIconCheckCircleFilled,
        warning: TIconErrorCircleFilled,
        error: TIconErrorCircleFilled,
        question: TIconHelpFill,
        loading: TIconLoadingFill,
      }[this.theme];
      return <component></component>;
    },
  },

  render() {
    return (
      <div class={ this.classes } onMouseenter={ this.clearTimer } onMouseleave={ this.setTimer }>
        { this.renderIcon() }
        { renderContent(this as ComponentPublicInstance, 'default', 'content') }
        { this.renderClose() }
      </div>
    );
  },

});
