import Vue, { PropType, VNode, CreateElement } from 'vue';
import { prefix } from '../config';
import { validate } from './formModel';
import { ErrorList, ValidateResult, ValidateRule, ValidateRules } from './type';
import { FORM_ITEM_CLASS_PREFIX } from './const';

const name = `${prefix}-form-item`;

export default Vue.extend({
  name,

  props: {
    name: String,
    label: [String, Function] as PropType<string | ((createElement: CreateElement) => VNode)>,
    for: String,
    rules: Array as PropType<Array<ValidateRule>>,
    help: String,
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
      // @ts-ignore
      const layout = this.$parent && this.$parent.layout;
      let otherClasses = [];
      if (layout === 'inline') {
        otherClasses = ['t-form__label--top'];
      } else {
        otherClasses = [`t-form__label--${labelAlign}`, labelAlign === 'top' ? 't-col-12' : 't-col-1'];
      }
      return [
        't-col',
        't-form__label',
        ...otherClasses,
        {
          't-form__label--required': this.needRequiredMark,
          't-form__label--colon': this.hasColon,
        },
      ];
    },
    errorClasses(): string {
      // @ts-ignore
      if (!this.$parent.showErrorMessage) return [];
      if (!this.errorList.length) return;
      // eslint-disable-next-line prefer-destructuring
      const { type = 'error' } = this.errorList[0];
      return `t-is-${type}`;
    },
    contentClasses(): ClassName {
      const getErrorClass: string = this.errorClasses;
      return ['t-form__controls', 't-col', 't-input__extra', getErrorClass];
    },
    labelProps(): Record<string, any> {
      const labelProps: Record<string, any> = {};
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
      return !!(this.$parent && this.$parent.colon && this.getLabel());
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
      }
      if (typeof this.$scopedSlots.label === 'function') {
        return this.$scopedSlots.label(null);
      }
      return this.label;
    },
    renderTipsInfo(): VNode {
      if (this.help) {
        return <span>{this.help}</span>;
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
