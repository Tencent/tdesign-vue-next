import Vue, { PropType, VNode } from 'vue';
import { prefix } from '../config';
import { validate } from './formModel';
import { ErrorList, ValidateResult, ValidateRule, ValidateRules } from './type';
import { FORM_ITEM_CLASS_PREFIX } from './const';

const name = `${prefix}-form-item`;

export default Vue.extend({
  name,

  props: {
    name: String,
    label: [String, Function],
    for: String,
    rules: Array as PropType<Array<ValidateRule>>,
    tooltip: String,
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
      // @ts-ignore
      const labelAlign = this.$parent && this.$parent.labelAlign;
      return [
        {
          't-col': true,
          't-col-1': labelAlign !== 'top',
          't-col-12': labelAlign === 'top',
          't-form__label': true,
          't-form__label--required': this.needRequiredMark,
          't-form__label--colon': this.hasColon,
          't-form__label--left': labelAlign === 'left',
          't-form__label--right': labelAlign === 'right',
        },
      ];
    },
    contentClasses(): ClassName {
      const getErrorClass: Array<any> = this.getErrorClasses;
      return ['t-form__controls', 't-col', 't-input__extra', ...getErrorClass];
    },
    labelProps(): any {
      const labelProps: any = {};
      // @ts-ignore
      const labelWidth = this.$parent && this.$parent.labelWidth;
      if (labelWidth) {
        labelProps.style = `min-width: ${labelWidth}px;`;
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
    // 错误信息取第一个错误进行展示
    getErrorClasses(): Array<any> {
      // @ts-ignore
      if (!this.$parent.showErrorMessage) return [];
      const list = this.errorList;
      if (list && list[0]) {
        const type = list[0].type || 'error';
        return [
          {
            't-is-error': type === 'error',
            't-is-warning': type === 'warning',
          },
        ];
      }
      return [];
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
    renderTipsInfo(): VNode {
      if (this.tooltip) {
        return <span>{this.tooltip}</span>;
      }
      const list = this.errorList;
      if (list && list[0]) {
        return <span>{list[0].message}</span>;
      }
    },
    resetField(): void {
      this.errorList = [];
    },
  },

  render(): VNode {
    return (
      <div class={this.classes}>
        <div class={this.labelClasses} { ...this.labelProps }>
          <label for={this.for}>
            {this.getLabel()}
          </label>
        </div>
        <div class={this.contentClasses}>
          <div class='t-form__controls--content'>
            {this.$slots.default}
          </div>
          {this.renderTipsInfo()}
        </div>
      </div>
    );
  },
});
