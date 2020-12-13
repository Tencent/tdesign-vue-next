import Vue, { PropType, VNode } from 'vue';
import { prefix } from '../config';
import { validate } from './formModel';
import { ValidateRule, ValidateRules, ValidateResult, ErrorList } from './type';
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
      errorList: [] as ErrorList,
    };
  },

  computed: {
    classes(): ClassName {
      return ['t-form__item', 't-row', FORM_ITEM_CLASS_PREFIX + this.name];
    },
    labelClasses(): ClassName {
      return ['t-form__label', 't-col', 't-col-1'];
    },
    contentClasses(): ClassName {
      return ['t-form__controls', 't-col'];
    },
    labelProps(): any {
      const labelProps: any = {};
      // @ts-ignore
      const labelWidth = this.$parent && this.$parent.labelWidth;
      if (labelWidth) {
        labelProps.style = `min-width: ${labelWidth}px;`;
      }
      const label = this.getLabel();
      if (!labelWidth && !label) {
        labelProps.style = `${labelProps.style ? labelProps.style : ''}display: none;`;
      }
      return labelProps;
    },
    value(): any {
      // @ts-ignore
      return this.$parent && this.$parent.data && this.$parent.data[this.name];
    },
    hasColon(): boolean {
      // @ts-ignore
      return this.$parent && this.$parent.colon && this.getLabel();
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
      return new Promise((resolve) => {
        validate(this.value, this.innerRules)
          .then((r) => {
            this.errorList = r;
            resolve({
              [this.name]: r.length === 0 ? true : r,
            });
          });
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
        <div class={this.labelClasses} { ...this.labelProps }>
          <label for={this.for}>
            { this.needRequiredMark && <span>*</span> }
            {this.getLabel()} {this.hasColon && ':'}
          </label>
        </div>
        <div class={this.contentClasses}>{this.$slots.default}</div>
        {this.renderErrorInfo()}
      </div>
    );
  },
});
