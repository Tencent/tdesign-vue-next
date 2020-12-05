import Vue, { VNode } from 'vue';
import { prefix } from '../config';

const name = `${prefix}-form-item`;

export default Vue.extend({
  name,

  props: {
    name: String,
    tooltip: [String, Function],
    label: [String, Function],
    for: String,
  },

  computed: {
    hasColon(): boolean {
      // @ts-ignore
      return this.$parent && this.$parent.colon;
    },
    // 允许显示，且校验规则包含必填
    needRequired(): boolean {
      // @ts-ignore
      return this.$parent && this.$parent.requiredMark;
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
          { this.needRequired && <span>*</span> }
          {this.getLabel()} {this.hasColon && '：'}
        </label>
        <div>{this.$slots.default}</div>
      </div>
    );
  },
});
