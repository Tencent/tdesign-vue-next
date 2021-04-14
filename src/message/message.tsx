import { defineComponent, h } from 'vue';
import { prefix } from '../config';
import TIconInfoCircleFilled from '../icon/info-circle-filled';
import TIconCheckCircleFilled from '../icon/check-circle-filled';
import TIconErrorCircleFilled from '../icon/error-circle-filled';
import TIconHelpFill from '../icon/help-circle-filled';
import TIconLoadingFill from '../icon/loading';
import TIconClose from '../icon/close';
import { THEME_LIST } from './const';
import props from '@TdTypes/message/props';

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
    classes(): ClassName {
      const status = {};
      THEME_LIST.forEach((t) => {
        status[`t-is-${t}`] = this.theme === t;
      });
      return [
        't-message',
        status,
        {
          't-is-closable': this.closeBtn || this.$slots.closeBtn,
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
    // this.closeBtn 优先级大于 this.$scopedSlots.closeBtn
    renderClose() {
      const { closeBtn } = this;
      if (typeof closeBtn === 'boolean') {
        return closeBtn && <t-icon-close onClick={this.close} class='t-message-close' />;
      }
      let close: TNodeReturnValue = null;
      if (typeof closeBtn === 'function') {
        close = closeBtn(h);
      } else if (typeof closeBtn === 'string') {
        close = closeBtn;
      } else if (typeof this.$slots.closeBtn === 'function') {
        close = this.$slots.closeBtn(null);
      }
      if (close) {
        return (<span class='t-message-close' onClick={this.close}> { close } </span>);
      }
    },
    renderIcon() {
      if (this.icon === false) return;
      if (typeof this.icon === 'function') return this.icon(h);
      if (this.$slots.icon) {
        return this.$slots.icon(null);
      }
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
    renderContent() {
      if (typeof this.content === 'string') return this.content;
      if (typeof this.content === 'function') return this.content(h);
      if (this.$slots.default) return this.$slots.default(null);
      if (this.$slots.content) return this.$slots.content(null);
      return this.content;
    },
  },

  render() {
    return (
      <div class={ this.classes } onMouseenter={ this.clearTimer } onMouseleave={ this.setTimer }>
        { this.renderIcon() }
        { this.renderContent() }
        { this.renderClose() }
      </div>
    );
  },

});
