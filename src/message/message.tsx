import Vue from 'vue';
import { prefix } from '../config';
import TIconPromptFill from '../icon/prompt_fill';
import TIconSuccessFill from '../icon/success_fill';
import TIconWarningFill from '../icon/warning_fill';
import TIconHelpFill from '../icon/help_fill';
import TIconLoadingFill from '../icon/loading';
import TIconClose from '../icon/close';
import { THEME_LIST } from './const';

const name = `${prefix}-message`;

export default Vue.extend({
  name,

  components: {
    TIconPromptFill,
    TIconSuccessFill,
    TIconWarningFill,
    TIconHelpFill,
    TIconLoadingFill,
    TIconClose,
  },

  props: {
    theme: {
      type: String,
      default: THEME_LIST[0],
      validator(val: string): boolean {
        return THEME_LIST.includes(val);
      },
    },
    duration: Number,
    closeBtn: [Boolean, String, Function],
    icon: {
      type: [Boolean, Function],
      default: true,
    },
    content: [String, Function],
  },

  data() {
    return {
      timer: -1,
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
      }, this.duration));
    },
    clearTimer() {
      clearTimeout(this.timer);
    },
    close(e?: Event) {
      this.$emit('click-close-btn', e, this);
    },
    renderClose() {
      if (typeof this.closeBtn === 'string') {
        return <span class='t-message-close' onClick={this.close}>{this.closeBtn}</span>;
      }
      if (typeof this.closeBtn === 'function') return this.closeBtn(this.close);
      if (typeof this.$scopedSlots.closeBtn === 'function') {
        return this.$scopedSlots.closeBtn(null);
      }
      if (this.closeBtn === false) return;
      return <t-icon-close nativeOnClick={this.close} class='t-message-close'/>;
    },
    renderIcon() {
      if (this.icon === false) return;
      if (typeof this.icon === 'function') return this.icon();
      if (this.$scopedSlots.icon) {
        return this.$scopedSlots.icon(null);
      }
      const component = {
        info: TIconPromptFill,
        success: TIconSuccessFill,
        warning: TIconWarningFill,
        error: TIconWarningFill,
        question: TIconHelpFill,
        loading: TIconLoadingFill,
      }[this.theme];
      return <component></component>;
    },
    renderContent() {
      if (typeof this.content === 'string') return this.content;
      if (typeof this.content === 'function') return this.content();
      return this.$scopedSlots.default && this.$scopedSlots.default(null);
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
