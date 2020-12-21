import Vue, { PropType, VNode, CreateElement } from 'vue';
import { prefix } from '../config';
import { validate } from './formModel';
import { ErrorList, ValidateResult, FormItemProps } from './type';
import { FORM_ITEM_CLASS_PREFIX, CLASS_NAMES } from './const';

const name = `${prefix}-form-item`;

export default Vue.extend({
  name,

  props: {
    name: String,
    label: [String, Function] as PropType<string | ((h: CreateElement) => VNode)>,
    for: String,
    rules: Array as PropType<ErrorList>,
    help: String,
    statusIcon: {
      type: [Boolean, Function] as PropType<boolean | ((h: CreateElement, props: FormItemProps) => TNodeReturnValue)>,
      default: null,
    },
  },

  data() {
    return {
      errorList: [] as ErrorList,
      // 当前校验状态 未校验、校验通过、校验不通过
      verifiyStatus: 'no' as 'no' | 'success' | 'fail',
    };
  },

  computed: {
    classes(): ClassName {
      return [CLASS_NAMES.formItem, CLASS_NAMES.row, FORM_ITEM_CLASS_PREFIX + this.name];
    },
    labelClasses(): ClassName {
      // @ts-ignore
      const labelAlign = this.$parent && this.$parent.labelAlign;
      // @ts-ignore
      const layout = this.$parent && this.$parent.layout;
      let otherClasses = [];
      if (layout === 'inline') {
        otherClasses = [CLASS_NAMES.labelTop];
      } else {
        otherClasses = [`t-form__label--${labelAlign}`, labelAlign === 'top' ? CLASS_NAMES.col12 : CLASS_NAMES.col1];
      }
      return [
        CLASS_NAMES.col,
        CLASS_NAMES.label,
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
      return [CLASS_NAMES.controls, CLASS_NAMES.col, getErrorClass];
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
    innerRules(): ErrorList {
      // @ts-ignore
      const rules: ErrorList = this.$parent && this.$parent.rules;
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
            this.verifiyStatus = this.errorList.length ? 'fail' : 'success';
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
        return <span class={CLASS_NAMES.extra}>{this.help}</span>;
      }
      // @ts-ignore
      if (!this.$parent.showErrorMessage) return;
      const list = this.errorList;
      if (list && list[0]) {
        return <span class={CLASS_NAMES.extra}>{list[0].message}</span>;
      }
    },
    getSuffixIcon(): string | VNode | VNode[] {
      const list = this.errorList;
      const resultIcon = (otherContent?: VNode | VNode[], iconName?: string, style?: string) => (
        <span class={CLASS_NAMES.status}>
          {otherContent ? otherContent : <t-icon name={iconName} size="25px" style={style || ''}/>}
        </span>
      );
      if (typeof this.statusIcon === 'boolean' && !this.statusIcon) return;
      // @ts-ignore
      if (typeof this.$parent.statusIcon === 'boolean' && !this.$parent.statusIcon) return;
      if (typeof this.statusIcon === 'function') {
        return resultIcon(this.statusIcon(this.$createElement, this.$props) as VNode);
      }
      // @ts-ignore
      if (typeof this.$parent.statusIcon === 'function') {
        // @ts-ignore
        return resultIcon(this.$parent.statusIcon(this.$createElement, this.$props));
      }
      if (typeof this.$scopedSlots.statusIcon === 'function') {
        return resultIcon(this.$scopedSlots.statusIcon(null));
      }
      if (typeof this.$parent.$scopedSlots.statusIcon === 'function') {
        return resultIcon(this.$parent.$scopedSlots.statusIcon(null));
      }
      if (this.verifiyStatus === 'success') {
        return resultIcon(null, 'check-circle-filled', 'color: #00A870');
      }
      if (list && list[0]) {
        // eslint-disable-next-line prefer-destructuring
        const { type = 'error' } = this.errorList[0];
        let iconName = 'check-circle-filled';
        if (type === 'error') {
          iconName = 'clear-circle-filled';
        }
        if (type === 'warning') {
          iconName = 'error-circle-filled';
        }
        return resultIcon(null, iconName);
      }
    },
    resetField(): void {
      this.errorList = [];
      this.verifiyStatus = 'no';
    },
  },

  render(): VNode {
    return (
      <div class={this.classes}>
        <div class={this.labelClasses} {...this.labelProps}>
          <label for={this.for}>
            {this.getLabel()}
          </label>
        </div>
        <div class={this.contentClasses}>
          <div class={CLASS_NAMES.controlsContent}>
            {this.$slots.default}
            {this.getSuffixIcon()}
          </div>
          {this.renderTipsInfo()}
        </div>
      </div>
    );
  },
});
