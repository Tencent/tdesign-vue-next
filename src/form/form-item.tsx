import Vue, { VNode } from 'vue';
import { prefix } from '../config';
import { ValidateRule, ValidateRules } from './type';

const name = `${prefix}-form-item`;

export default Vue.extend({
  name,

  props: {
    name: String,
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
      const allowMark = this.$parent && this.$parent.requiredMark;
      // console.log('innerRules:', this.innerRules);
      const isRequired = this.innerRules.filter(rule => rule.required).length > 1;
      // const isRequired = true;
      return Boolean(allowMark && isRequired);
    },
    innerRules(): Array<ValidateRule> {
      const defaultRule: Array<ValidateRule> = [];
      // @ts-ignore
      const rules: ValidateRules = this.$parent && this.$parent.rules;
      if (rules) {
        return rules[this.name] || defaultRule;
      }
      return defaultRule;
    },
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
