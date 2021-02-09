import Vue, { VNode } from 'vue';
import { prefix } from '../config';
import { validate } from './form-model';
import { ErrorList, TdFormItemProps, TdFormProps, ValidateResult, ValueType } from '@TdTypes/form/TdFormProps';
import props from '@TdTypes/form-item/props';
import { CLASS_NAMES, FORM_ITEM_CLASS_PREFIX } from './const';
import Form from './form';
import { NormalizedScopedSlot } from 'vue/types/vnode';
import cloneDeep from 'lodash/cloneDeep';
import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';

type Result = ValidateResult<TdFormProps['data']>;

type FormInstance = InstanceType<typeof Form>;

const enum VALIDATE_STATUS {
  TO_BE_VALIDATED = 'not',
  SUCCESS = 'success',
  FAIL = 'fail',
}

const name = `${prefix}-form-item`;

export default Vue.extend({
  name,

  props: { ...props },

  data() {
    return {
      errorList: [] as ErrorList,
      // 当前校验状态 未校验、校验通过、校验不通过
      verifyStatus: VALIDATE_STATUS.TO_BE_VALIDATED as VALIDATE_STATUS,
      resetValidating: false as boolean,
      needResetField: false as boolean,
      initialValue: undefined as ValueType,
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
      if (this.verifyStatus === VALIDATE_STATUS.SUCCESS) return CLASS_NAMES.success;
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
      return parent && parent.data && lodashGet(parent.data, this.name);
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

  mounted() {
    this.initialValue = cloneDeep(this.value);
  },

  methods: {
    validate(): Promise<Result> {
      this.resetValidating = true;
      return new Promise((resolve) => {
        validate(this.value, this.innerRules)
          .then((r) => {
            this.errorList = r;
            this.verifyStatus = this.errorList.length ? VALIDATE_STATUS.FAIL : VALIDATE_STATUS.SUCCESS;
            resolve({
              [this.name]: r.length === 0 ? true : r,
            });
            if (this.needResetField) {
              this.resetHandler();
            }
            this.resetValidating = false;
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
      if (list && list[0] && list[0].message) {
        return <span class={CLASS_NAMES.extra}>{list[0].message}</span>;
      }
    },
    getDefaultIcon(): TNodeReturnValue {
      const resultIcon = (iconName: string) => (
        <span class={CLASS_NAMES.status}>
          <t-icon name={iconName} size="25px"/>
        </span>
      );
      const list = this.errorList;
      if (this.verifyStatus === VALIDATE_STATUS.SUCCESS) {
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
    getIcon(
      statusIcon: TdFormProps['statusIcon'] | TdFormItemProps['statusIcon'],
      slotStatusIcon: NormalizedScopedSlot,
      props?: TdFormItemProps
    ): TNodeReturnValue {
      const resultIcon = (otherContent?: TNodeReturnValue) => (
        <span class={CLASS_NAMES.status}>{otherContent}</span>
      );
      if (statusIcon === true) {
        return this.getDefaultIcon();
      }
      if (statusIcon === false) {
        return false;
      }
      if (typeof statusIcon === 'function') {
        return resultIcon(statusIcon(this.$createElement, props));
      }
      if (typeof slotStatusIcon === 'function') {
        return resultIcon(slotStatusIcon(null));
      }
      return null;
    },
    getSuffixIcon(): TNodeReturnValue {
      const parent = this.$parent as FormInstance;
      const { statusIcon } = this;
      const slotStatusIcon = this.$scopedSlots.statusIcon;
      const parentStatusIcon = parent.statusIcon;
      const parentSlotStatusIcon = parent.$scopedSlots.statusIcon;
      let resultIcon: TNodeReturnValue = this.getIcon(statusIcon, slotStatusIcon);
      if (resultIcon) return resultIcon;
      if (resultIcon === false) return;
      resultIcon = this.getIcon(parentStatusIcon, parentSlotStatusIcon, this.$props);
      if (resultIcon) return resultIcon;
    },
    getEmptyValue(): ValueType {
      const parent = this.$parent as FormInstance;
      const type = Object.prototype.toString.call(lodashGet(parent.data, this.name));
      let emptyValue: ValueType = undefined;
      if (type === '[object Array]') {
        emptyValue = [];
      }
      if (type === '[object Object]') {
        emptyValue = {};
      }
      return emptyValue;
    },
    resetField(): void {
      const parent = this.$parent as FormInstance;
      if (!this.name) {
        return;
      }
      if (parent.resetType === 'empty') {
        lodashSet(parent.data, this.name, this.getEmptyValue());
      }
      if (parent.resetType === 'initial') {
        lodashSet(parent.data, this.name, this.initialValue);
      }
      Vue.nextTick(() => {
        if (this.resetValidating) {
          this.needResetField = true;
        } else {
          this.resetHandler();
        }
      });
    },
    resetHandler(): void {
      this.needResetField = false;
      this.errorList = [];
      this.verifyStatus = VALIDATE_STATUS.TO_BE_VALIDATED;
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
