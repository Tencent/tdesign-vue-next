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
      const labelClasses: Array<string> = ['t-form__label', 't-col', 't-col-1'];
      if (this.needRequiredMark) {
        labelClasses.push('t-form__label--required');
      }
      if (this.hasColon) {
        labelClasses.push('t-form__label--colon');
      }
      return labelClasses;
    },
    contentClasses(): ClassName {
      const getErrorClass: Array<any> = this.getErrorClasses;
      return ['t-form__controls', 't-col', ...getErrorClass];
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
    // 错误信息取第一个错误进行展示
    getErrorClasses(): Array<any> {
      // @ts-ignore
      if (!this.$parent.showErrorMessage) return [];
      const list = this.errorList;
      if (list && list[0]) {
        const type = list[0].type || 'error';
        const classes = [
          {
            't-is-error': type === 'error',
            't-is-warning': type === 'warning',
            't-input__extra': true,
          },
        ];
        return classes;
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
    renderErrorInfo(): VNode {
      const getErrorClass: Array<any> = this.getErrorClasses;
      if (getErrorClass.length) {
        const list = this.errorList;
        return <span class={getErrorClass}>{list[0].message}</span>;
      }
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
          {this.renderErrorInfo()}
        </div>
      </div>
    );
  },
});
