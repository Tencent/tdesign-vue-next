import Vue, { CreateElement } from 'vue';
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
      if (!this.duration) {
        return;
      }
      this.timer = Number(setTimeout(() => {
        this.clearTimer();
        this.$emit('duration-end');
        if (this.onDurationEnd) {
          this.onDurationEnd();
        };
      }, this.duration));
    },
    clearTimer() {
      this.duration && clearTimeout(this.timer);
    },
    close(e?: MouseEvent) {
      this.$emit('click-close-btn', e);
      if (this.onClickCloseBtn) {
        this.onClickCloseBtn(e);
      };
    },
    // this.closeBtn 优先级大于 this.$scopedSlots.closeBtn
    renderClose(h: CreateElement) {
      const { closeBtn } = this;
      if (typeof closeBtn === 'boolean') {
        return closeBtn && <t-icon-close nativeOnClick={this.close} class='t-message-close' />;
      }
      let close: TNodeReturnValue = null;
      if (typeof closeBtn === 'function') {
        close = closeBtn(h);
      } else if (typeof closeBtn === 'string') {
        close = closeBtn;
      } else if (typeof this.$scopedSlots.closeBtn === 'function') {
        close = this.$scopedSlots.closeBtn(null);
      }
      if (close) {
        return (<span class='t-message-close' onClick={this.close}> { close } </span>);
      }
    },
    renderIcon(h: CreateElement) {
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
      if (this.$scopedSlots.default) return this.$scopedSlots.default(null);
      if (this.$scopedSlots.content) return this.$scopedSlots.content(null);
      return this.content;
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
