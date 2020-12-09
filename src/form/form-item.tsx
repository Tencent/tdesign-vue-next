import Vue, { PropType, VNode } from 'vue';
import { prefix } from '../config';
import { validate } from './formModel';
import { ValidateRule, ValidateRules, ValidateResult } from './type';
import { FORM_ITEM_CLASS_PREFIX } from './const';

const name = `${prefix}-form-item`;

export default Vue.extend({
  name,

  props: {
    name: String,
    label: [String, Function],
    for: String,
    rules: Array as PropType<Array<ValidateRule>>,
  },

  data() {
    return {
      errorList: [],
    };
  },

  computed: {
    classes(): ClassName {
      return ['t-form-item', FORM_ITEM_CLASS_PREFIX + this.name];
    },
    value(): any {
      // @ts-ignore
      return this.$parent && this.$parent.data && this.$parent.data[this.name];
    },
    hasColon(): boolean {
      // @ts-ignore
      return this.$parent && this.$parent.colon;
    },
    needRequiredMark(): boolean {
      // @ts-ignore
      const allowMark = this.$parent && this.$parent.requiredMark;
      const isRequired = this.innerRules.filter(rule => rule.required).length > 0;
      return Boolean(allowMark && isRequired);
    },
    innerRules(): Array<ValidateRule> {
      // @ts-ignore
      const rules: ValidateRules = this.$parent && this.$parent.rules;
      return (rules && rules[this.name]) || (this.rules || []);
    },
  },

  watch: {
    value() {
      this.validate();
    },
  },

  methods: {
    validate(): Promise<ValidateResult> {
      const result = validate([{
        field: this.name,
        value: this.value,
        rules: this.innerRules,
      }]);
      return new Promise((resolve) => {
        if (result instanceof Promise) {
          result.then((r) => {
            this.errorList = r[this.name];
            resolve(r);
          });
        } else {
          this.errorList = result[this.name];
          resolve(result);
        }
      });
    },
    getLabel(): string | VNode | VNode[] {
      if (typeof this.label === 'function') {
        return this.label(this.$createElement);
      } if (typeof this.$scopedSlots.label === 'function') {
        return this.$scopedSlots.label(null);
      }
      return this.label;
    },
    // 错误信息取第一个错误进行展示
    renderErrorInfo(): VNode {
      // @ts-ignore
      if (!this.$parent.showErrorMessage) return;
      const list = this.errorList;
      if (list && list[0]) {
        const type = list[0].type || 'error';
        const classes = [
          {
            't-is-error': type === 'error',
            't-is-warning': type === 'warning',
          },
        ];
        return <p class={classes}>{list[0].message}</p>;
      }
    },
  },

  render(): VNode {
    return (
      <div class={this.classes}>
        <label for={this.for}>
          { this.needRequiredMark && <span>*</span> }
          {this.getLabel()} {this.hasColon && '：'}
        </label>
        <div>{this.$slots.default}</div>
        {this.renderErrorInfo()}
      </div>
    );
  },
});
