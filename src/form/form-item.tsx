import Vue, { VNode } from 'vue';
import { prefix } from '../config';
// import { ValidateRule } from './formModel';

const name = `${prefix}-form-item`;

export default Vue.extend({
  name,

  props: {
    name: String,
    tooltip: [String, Function],
    label: [String, Function],
    for: String,
    // rules: Array as PropType<Array<ValidateRule>>,
  },

  computed: {
    hasColon(): boolean {
      // @ts-ignore
      return this.$parent && this.$parent.colon;
    },
    needRequiredMark(): boolean {
      // @ts-ignore
      return this.$parent && this.$parent.requiredMark;
    },
    // innerRules(): Array<ValidateRule> {
    //   // @ts-ignore
    //   if (this.$parent && this.$parent.rules) {
    //     // @ts-ignore
    //     return this.$parent.rules[this.name] || this.rules;
    //   }
    //   return this.rules;
    // },
  },

  methods: {
    getLabel() {
      if (typeof this.label === 'function') {
        return this.label(this.$createElement);
      } if (typeof this.$scopedSlots.label === 'function') {
        return this.$scopedSlots.label(null);
      }
      return this.label;
    },
  },

  render(): VNode {
    return (
      <div class='t-form-item'>
        <label for={this.for}>
          { this.needRequiredMark && <span>*</span> }
          {this.getLabel()} {this.hasColon && '：'}
        </label>
        <div>{this.$slots.default}</div>
      </div>
    );
  },
});
