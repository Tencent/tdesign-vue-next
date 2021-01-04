import Vue from 'vue';
import { prefix } from '../config';
import TIconInfoCircleFilled from '../icon/info-circle-filled';
import TIconCheckCircleFilled from '../icon/check-circle-filled';
import TIconErrorCircleFilled from '../icon/error-circle-filled';
import TIconHelpFill from '../icon/help-circle-filled';
import TIconLoadingFill from '../icon/loading';
import TIconClose from '../icon/close';
import { THEME_LIST } from './const';
import props from '@TdTypes/message/props'; // 引入自动生成的 props 文件

const name = `${prefix}-message`;

export default Vue.extend({
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
          't-is-closable': this.closeBtn || this.$scopedSlots.closeBtn,
        },
      ];
    },
  },

  created() {
    this.duration && this.setTimer();
  },

  methods: {
    setTimer() {
      this.timer = Number(setTimeout(() => {
        this.clearTimer();
        this.$emit('duration-end', this);
        if (this.onDurationEnd) {
          this.onDurationEnd();
        };
      }, this.duration));
    },
    clearTimer() {
      clearTimeout(this.timer);
    },
    close(e?: MouseEvent) {
      this.$emit('click-close-btn', e, this);
      if (this.onClickCloseBtn) {
        this.onClickCloseBtn(e);
      };
    },
    renderClose(h: Vue.CreateElement) {
      if (typeof this.closeBtn === 'string') {
        return <span class='t-message-close' onClick={this.close}>{this.closeBtn}</span>;
      }
      if (typeof this.closeBtn === 'function') return <span class='t-message-close' onClick={this.close}>{this.closeBtn(h)}</span>;
      if (typeof this.$scopedSlots.closeBtn === 'function') {
        return <span class='t-message-close' onClick={this.close}>{this.$scopedSlots.closeBtn(null)}</span>;
      }
      if (this.closeBtn === false) return;
      return <t-icon-close nativeOnClick={this.close} class='t-message-close' />;
    },
    renderIcon(h: Vue.CreateElement) {
      if (this.icon === false) return;
      if (typeof this.icon === 'function') return this.icon(h);
      if (this.$scopedSlots.icon) {
        return this.$scopedSlots.icon(null);
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
    renderContent(h: Vue.CreateElement) {
      if (typeof this.content === 'string') return this.content;
      if (typeof this.content === 'function') return this.content(h);
      return this.$scopedSlots.default && this.$scopedSlots.default(null);
    },
  },

  render(h) {
    return (
      <div class={ this.classes } onMouseenter={ this.clearTimer } onMouseleave={ this.setTimer }>
        { this.renderIcon(h) }
        { this.renderContent(h) }
        { this.renderClose(h) }
      </div>
    );
  },

});
