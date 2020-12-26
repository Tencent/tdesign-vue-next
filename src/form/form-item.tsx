import Vue, { VNode } from 'vue';
import { prefix } from '../config';
import { validate } from './formModel';
import { ErrorList, ValidateResult, ValueType, TdFormProps, TdFormItemProps } from '../../types/form/TdFormProps';
import props from '../../types/form-item/props';
import { FORM_ITEM_CLASS_PREFIX, CLASS_NAMES } from './const';
import Form from './form';

type NormalizedScopedSlot = import('vue/types/vnode').NormalizedScopedSlot;
type FormInstance = InstanceType<typeof Form>;

const name = `${prefix}-form-item`;

export default Vue.extend({
  name,

  props: { ...props },

  data() {
    return {
      errorList: [] as ErrorList,
      // 当前校验状态 未校验、校验通过、校验不通过
      verifyStatus: 'no' as 'no' | 'success' | 'fail',
    };
  },

  computed: {
    classes(): ClassName {
      return [CLASS_NAMES.formItem, CLASS_NAMES.row, FORM_ITEM_CLASS_PREFIX + this.name];
    },
    labelClasses(): ClassName {
      const parent = this.$parent as FormInstance;
      const labelAlign = parent && parent.labelAlign;
      const layout = parent && parent.layout;
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
      const parent = this.$parent as FormInstance;
      if (!parent.showErrorMessage) return '';
      if (this.verifyStatus === 'success') return CLASS_NAMES.success;
      if (!this.errorList.length) return;
      const type = this.errorList[0].type || 'error';
      return type === 'error' ? CLASS_NAMES.error : CLASS_NAMES.warning;
    },
    contentClasses(): ClassName {
      const getErrorClass: string = this.errorClasses;
      return [CLASS_NAMES.controls, CLASS_NAMES.col, getErrorClass];
    },
    labelProps(): Record<string, any> {
      const parent = this.$parent as FormInstance;
      const labelProps: Record<string, any> = {};
      const labelWidth = parent && parent.labelWidth;
      if (labelWidth) {
        labelProps.style = `min-width: ${labelWidth}px;`;
      }
      return labelProps;
    },
    value(): ValueType {
      const parent = this.$parent as FormInstance;
      return parent && parent.data && parent.data[this.name];
    },
    hasColon(): boolean {
      const parent = this.$parent as FormInstance;
      return !!(parent && parent.colon && this.getLabel());
    },
    needRequiredMark(): boolean {
      const parent = this.$parent as FormInstance;
      const allowMark = parent && parent.requiredMark;
      const isRequired = this.innerRules.filter(rule => rule.required).length > 0;
      return Boolean(allowMark && isRequired);
    },
    innerRules(): ErrorList {
      const parent = this.$parent as FormInstance;
      const rules: ErrorList = parent && parent.rules;
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
            this.verifyStatus = this.errorList.length ? 'fail' : 'success';
            resolve({
              [this.name]: r.length === 0 ? true : r,
            });
          });
      });
    },
    getLabel(): TNodeReturnValue {
      if (typeof this.label === 'function') {
        return this.label(this.$createElement);
      }
      if (typeof this.$scopedSlots.label === 'function') {
        return this.$scopedSlots.label(null);
      }
      return this.label;
    },
    renderTipsInfo(): VNode {
      const parent = this.$parent as FormInstance;
      if (this.help) {
        return <span class={CLASS_NAMES.extra}>{this.help}</span>;
      }
      if (!parent.showErrorMessage) return;
      const list = this.errorList;
      if (list && list[0]) {
        return <span class={CLASS_NAMES.extra}>{list[0].message}</span>;
      }
    },
    getIcon(statusIcon: TdFormProps['statusIcon'] | TdFormItemProps['statusIcon'], slotStatusIcon: NormalizedScopedSlot, props?: TdFormItemProps): TNodeReturnValue {
      const resultIcon = (otherContent: TNodeReturnValue) => (
        <span class={CLASS_NAMES.status}>{otherContent}</span>
      );
      if (statusIcon === false) return null;
      if (typeof statusIcon === 'function') {
        // @ts-ignore
        return resultIcon(statusIcon(this.$createElement, props));
      }
      if (typeof slotStatusIcon === 'function') {
        return resultIcon(slotStatusIcon(null));
      }
      return null;
    },
    getDefaultIcon(): TNodeReturnValue {
      const resultIcon = (iconName: string) => (
        <span class={CLASS_NAMES.status}>
          <t-icon name={iconName} size="25px"/>
        </span>
      );
      const list = this.errorList;
      if (this.verifyStatus === 'success') {
        return resultIcon('check-circle-filled');
      }
      if (list && list[0]) {
        const type = this.errorList[0].type || 'error';
        let iconName = 'check-circle-filled';
        if (type === 'error') {
          iconName = 'clear-circle-filled';
        }
        if (type === 'warning') {
          iconName = 'error-circle-filled';
        }
        return resultIcon(iconName);
      }
      return null;
    },
    getSuffixIcon(): TNodeReturnValue {
      const parent = this.$parent as FormInstance;
      const { statusIcon } = this;
      const slotStatusIcon = this.$scopedSlots.statusIcon;
      const parentStatusIcon = parent.statusIcon;
      const parentSlotStatusIcon = parent.$scopedSlots.statusIcon;
      let getIcon: TNodeReturnValue = this.getIcon(statusIcon, slotStatusIcon);
      if (getIcon) return getIcon;
      getIcon = this.getIcon(parentStatusIcon, parentSlotStatusIcon, this.$props);
      if (getIcon) return getIcon;
      if (statusIcon === true || (statusIcon === undefined && parentStatusIcon === true)) return this.getDefaultIcon();
    },
    resetField(): void {
      this.errorList = [];
      this.verifyStatus = 'no';
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
