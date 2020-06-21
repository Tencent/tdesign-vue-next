import Vue from 'vue';
import { prefix } from '../config';
import TIconPromptFill from '../icon/prompt-fill';
import TIconSuccessFill from '../icon/success-fill';
import TIconWarningFill from '../icon/warning-fill';
import TIconHelpFill from '../icon/help-fill';
import TIconLoadingFill from '../icon/loading';
import TIconClose from '../icon/close';
import { THEME_LIST, PLACEMENT_LIST, PLACEMENT_OFFSET } from './const';

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
    theme: {
      type: String,
      default: THEME_LIST[0],
      validator(val: string): boolean {
        return THEME_LIST.includes(val);
      },
    },
    placement: {
      type: String,
      default: PLACEMENT_LIST[0],
      validator(val: string): boolean {
        return PLACEMENT_LIST.includes(val);
      },
    },
    offest: Object,
    duration: {
      type: Number,
    },
    close: [Boolean, String, Function],
    icon: {
      type: [Boolean, Function],
      default: true,
    },
    default: [String, Function],
    attach: Function,
    // fixed 为 true 时，有效
    zIndex: {
      type: Number,
      default: 6000,
    },
    fixed: Boolean,
  },

  data() {
    return {
      removed: false,
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
          't-is-closable': this.close,
        },
      ];
    },
    styles(): object {
      let _s = {};
      if (this.fixed) {
        _s = Object.assign(
          {
            position: 'fixed',
            zIndex: this.zIndex,
          },
          PLACEMENT_OFFSET[this.placement],
        );
      }
      return _s;
    },
  },

  created() {
    if (this.duration)  {
      const timer = setTimeout(() => {
        this.remove();
        clearTimeout(timer);
      }, this.duration);
    }
  },

  methods: {
    remove() {
      this.removed = true;
      this.$emit('remove', this);
    },
    renderClose() {
      if (this.close === false) return;
      if (typeof this.close === 'function') return this.close(this.remove);
      return <t-icon-close nativeOnClick={this.remove}/>;
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
      return this.$scopedSlots.default && this.$scopedSlots.default({
        props: this.$props,
      });
    },
  },

  render() {
    if (this.removed) return null;
    return (
      <div class={this.classes} style={this.styles}>
        { this.renderIcon() }
        { this.renderContent() }
        { this.renderClose() }
      </div>
    );
  },

});
