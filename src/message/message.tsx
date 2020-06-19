import Vue from 'vue';
import { prefix } from '../config';
import TIconPromptFill from '../icon/prompt-fill';
import TIconSuccessFill from '../icon/success-fill';
import TIconWarningFill from '../icon/warning-fill';
import TIconHelpFill from '../icon/help-fill';
import TIconLoadingFill from '../icon/loading';
import TIconClose from '../icon/close';

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
    visible: Boolean,
    content: [String, Function],
    theme: {
      type: String,
      default: 'info',
      validator(val: string): boolean {
        return ['info', 'success', 'warning', 'error', 'question', 'loading'].includes(val);
      },
    },
    placement: {
      type: String,
      validator(val: string): boolean {
        return ['left', 'left-top', 'top', 'right-top', 'right', 'right-bottom', 'bottom', 'left-bottom'].includes(val);
      },
    },
    offest: Object,
    duration: {
      type: Number,
      default: 3000,
    },
    close: [Boolean, String, Function],
    icon: {
      type: [Boolean, Function],
      default: true,
    },
    default: [String, Function],
    attach: Function,
    zIndex: {
      type: Number,
      default: 6000,
    },
  },

  data() {
    return {};
  },

  computed: {
    classes(): ClassName {
      return [
        't-message',
        {
          't-is-closable': this.close,
          't-is-success': this.theme === 'success',
          't-is-warning': this.theme === 'warning',
          't-is-error': this.theme === 'error',
          't-message--info': this.theme === 'info',
          't-message--question': this.theme === 'question',
          't-is-loading': this.theme === 'loading',
        },
      ];
    },
  },

  watch: {},

  methods: {
    renderClose() {
      if (this.close === false) return;
      if (typeof this.close === 'function') return this.close();
      return <t-icon-close />;
    },
    renderIcon() {
      if (this.icon === false) return;
      if (typeof this.icon === 'function') return this.icon();
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
      if (typeof this.default === 'string') return this.default;
      if (typeof this.default === 'function') return this.default();
      return this.$scopedSlots.default({
        props: this.$props,
      });
    },
  },

  render() {
    return (
      <div class={this.classes}>
        { this.renderIcon() }
        { this.renderContent() }
        { this.renderClose() }
      </div>
    );
  },

});
