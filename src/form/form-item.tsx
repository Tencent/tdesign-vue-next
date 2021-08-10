import { defineComponent, VNode, nextTick, h, inject, VNodeChild } from 'vue';
import { prefix } from '../config';
import { validate } from './form-model';
import { ErrorList, TdFormItemProps, TdFormProps, ValidateResult, ValueType } from '../../types/form/TdFormProps';
import props from '../../types/form-item/props';
import { CLASS_NAMES, FORM_ITEM_CLASS_PREFIX, TdForm } from './const';
import Form from './form';
import cloneDeep from 'lodash/cloneDeep';
import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import { ClassName, ScopedSlot, TNodeReturnValue } from '../common';

type Result = ValidateResult<TdFormProps['data']>;

type FormInstance = InstanceType<typeof Form>;

const enum ValidateStatus {
  TO_BE_VALIDATED = 'not',
  SUCCESS = 'success',
  FAIL = 'fail',
}

const name = `${prefix}-form-item`;

export default defineComponent({
  name,

  props: { ...props },

  setup() {
    const tdForm: TdForm = inject('td-form');
    return {
      tdForm,
    };
  },

  data() {
    return {
      errorList: [] as ErrorList,
      // 当前校验状态 未校验、校验通过、校验不通过
      verifyStatus: ValidateStatus.TO_BE_VALIDATED as ValidateStatus,
      resetValidating: false as boolean,
      needResetField: false as boolean,
      initialValue: undefined as ValueType,
    };
  },

  computed: {
    classes(): ClassName {
      return [CLASS_NAMES.formItem, CLASS_NAMES.row, FORM_ITEM_CLASS_PREFIX + this.name];
    },
    labelClasses() {
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
      if (this.verifyStatus === ValidateStatus.SUCCESS) return CLASS_NAMES.success;
      if (!this.errorList.length) return;
      const type = this.errorList[0].type || 'error';
      return type === 'error' ? CLASS_NAMES.error : CLASS_NAMES.warning;
    },
    contentClasses() {
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
      const rules = parent && parent.rules;
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
    if (this.tdForm) {
      const { validate, resetField } = this;
      this.tdForm.addField({
        validate,
        resetField,
      });
    }
  },

  methods: {
    validate(): Promise<Result> {
      this.resetValidating = true;
      return new Promise((resolve) => {
        validate(this.value, this.innerRules)
          .then((r) => {
            this.errorList = r;
            this.verifyStatus = this.errorList.length ? ValidateStatus.FAIL : ValidateStatus.SUCCESS;
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
    getLabel(): VNodeChild {
      if (typeof this.label === 'function') {
        // @ts-ignore: TODO
        return this.label(h);
      }
      if (typeof this.$slots.label === 'function') {
        return this.$slots.label(null);
      }
      return this.label;
    },
    renderTipsInfo(): VNode {
      const parent = this.$parent as FormInstance;
      let helpVNode: VNode;
      if (this.help) {
        helpVNode = <div class={CLASS_NAMES.help}>{this.help}</div>;
      }
      const list = this.errorList;
      if (parent.showErrorMessage && list && list[0] && list[0].message) {
        return (
          <div>
            <span class={CLASS_NAMES.extra}>{list[0].message}</span>
            {helpVNode}
          </div>
        );
      }
      return helpVNode;
    },
    getDefaultIcon(): TNodeReturnValue {
      const resultIcon = (iconName: string) => (
        <span class={CLASS_NAMES.status}>
          <t-icon name={iconName} size="25px"/>
        </span>
      );
      const list = this.errorList;
      if (this.verifyStatus === ValidateStatus.SUCCESS) {
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
      slotStatusIcon: ScopedSlot,
      props?: TdFormItemProps,
    ): VNodeChild {
      const resultIcon = (otherContent?: VNodeChild) => (
        <span class={CLASS_NAMES.status}>{otherContent}</span>
      );
      if (statusIcon === true) {
        return this.getDefaultIcon();
      }
      if (statusIcon === false) {
        return false;
      }
      if (typeof statusIcon === 'function') {
        return resultIcon(statusIcon(h, props));
      }
      if (typeof slotStatusIcon === 'function') {
        return resultIcon(slotStatusIcon(null));
      }
      return null;
    },
    getSuffixIcon(): VNodeChild {
      const parent = this.$parent as FormInstance;
      const { statusIcon } = this;
      const slotStatusIcon = this.$slots.statusIcon;
      const parentStatusIcon = parent.statusIcon;
      const parentSlotStatusIcon = parent.$slots.statusIcon;
      let resultIcon: VNodeChild = this.getIcon(statusIcon, slotStatusIcon);
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
      nextTick(() => {
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
      this.verifyStatus = ValidateStatus.TO_BE_VALIDATED;
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
            {this.$slots.default ? this.$slots.default() : null}
            {this.getSuffixIcon()}
          </div>
          {this.renderTipsInfo()}
        </div>
      </div>
    );
  },
});
