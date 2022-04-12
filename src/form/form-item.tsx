import { defineComponent, VNode, nextTick, h, Slot } from 'vue';
import { CheckCircleFilledIcon, ErrorCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import cloneDeep from 'lodash/cloneDeep';
import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import isNil from 'lodash/isNil';
import lodashTemplate from 'lodash/template';
import { validate } from './form-model';
import {
  Data,
  FormRule,
  TdFormItemProps,
  TdFormProps,
  ValueType,
  ValidateTriggerType,
  AllValidateResult,
  FormErrorMessage,
} from './type';
import props from './form-item-props';
import { useCLASSNAMES } from './const';
import Form, { FormItemInstance } from './form';
import { ClassName, TNodeReturnValue, Styles } from '../common';

import { useConfig, usePrefixClass } from '../hooks/useConfig';

type IconConstructor = typeof ErrorCircleFilledIcon;

type FormInstance = InstanceType<typeof Form>;
export type FormItemValidateResult<T extends Data = Data> = { [key in keyof T]: boolean | AllValidateResult[] };

export const enum ValidateStatus {
  TO_BE_VALIDATED = 'not',
  SUCCESS = 'success',
  FAIL = 'fail',
}

export default defineComponent({
  name: 'TFormItem',

  inject: {
    form: { default: undefined },
  },

  props: { ...props },
  setup() {
    const FROM_LABEL = usePrefixClass('form__label');
    const CLASS_NAMES = useCLASSNAMES();
    const FORM_ITEM_CLASS_PREFIX = usePrefixClass('form-item__');
    const { global } = useConfig('form');
    return {
      global,
      CLASS_NAMES,
      FROM_LABEL,
      FORM_ITEM_CLASS_PREFIX,
    };
  },

  data() {
    return {
      // 校验不通过信息列表
      errorList: [],
      // 校验通过显示的内容
      successList: [],
      // 当前校验状态 未校验、校验通过、校验不通过
      verifyStatus: ValidateStatus.TO_BE_VALIDATED,
      resetValidating: false as boolean,
      needResetField: false as boolean,
      initialValue: undefined as ValueType,
    };
  },

  computed: {
    classes(): ClassName {
      return [
        this.CLASS_NAMES.formItem,
        this.FORM_ITEM_CLASS_PREFIX + this.name,
        {
          [this.CLASS_NAMES.formItemWithHelp]: this.help,
          [this.CLASS_NAMES.formItemWithExtra]: this.renderTipsInfo(),
        },
      ];
    },
    labelClasses() {
      const { FROM_LABEL } = this;
      const parent = this.form;
      const labelAlign = isNil(this.labelAlign) ? parent?.labelAlign : this.labelAlign;
      const labelWidth = isNil(this.labelWidth) ? parent?.labelWidth : this.labelWidth;

      return [
        this.CLASS_NAMES.label,
        {
          [`${FROM_LABEL}--required`]: this.needRequiredMark,
          [`${FROM_LABEL}--colon`]: this.hasColon,
          [`${FROM_LABEL}--top`]: labelAlign === 'top' || !labelWidth,
          [`${FROM_LABEL}--left`]: labelAlign === 'left' && labelWidth,
          [`${FROM_LABEL}--right`]: labelAlign === 'right' && labelWidth,
        },
      ];
    },
    errorClasses(): string {
      const parent = this.form as FormInstance;
      if (!parent.showErrorMessage) return '';
      if (this.verifyStatus === ValidateStatus.SUCCESS) {
        return this.successBorder
          ? [this.CLASS_NAMES.success, this.CLASS_NAMES.successBorder].join(' ')
          : this.CLASS_NAMES.success;
      }
      if (!this.errorList.length) return;
      const type = this.errorList[0].type || 'error';
      return type === 'error' ? this.CLASS_NAMES.error : this.CLASS_NAMES.warning;
    },

    disabled(): boolean {
      return this.form.disabled;
    },

    contentClasses() {
      const getErrorClass: string = this.errorClasses;
      return [this.CLASS_NAMES.controls, getErrorClass];
    },
    contentStyle(): Styles {
      const parent = this.form;
      const labelAlign = isNil(this.labelAlign) ? parent?.labelAlign : this.labelAlign;
      const labelWidth = isNil(this.labelWidth) ? parent?.labelWidth : this.labelWidth;
      let contentStyle = {};
      if (labelWidth && labelAlign !== 'top') {
        if (typeof labelWidth === 'number') {
          contentStyle = { marginLeft: `${labelWidth}px` };
        } else {
          contentStyle = { marginLeft: labelWidth };
        }
      }

      return contentStyle;
    },
    value(): ValueType {
      const parent = this.form;
      return parent && parent.data && lodashGet(parent.data, this.name);
    },
    hasColon(): boolean {
      const parent = this.form;
      return !!(parent && parent.colon && this.getLabelContent());
    },
    needRequiredMark(): boolean {
      const { requiredMark } = this.$props;
      if (typeof requiredMark === 'boolean') return requiredMark;
      const parent = this.form;
      const parentRequiredMark = parent?.requiredMark === undefined ? this.global.requiredMark : parent.requiredMark;
      const isRequired = this.innerRules.filter((rule) => rule.required).length > 0;
      return Boolean(parentRequiredMark && isRequired);
    },
    innerRules(): FormRule[] {
      const parent = this.form;
      if (this.rules?.length) return this.rules || [];
      if (!this.name) return [];
      const index = this.name.lastIndexOf('.') || -1;
      const pRuleName = this.name.slice(index + 1);
      return lodashGet(parent?.rules, this.name) || lodashGet(parent?.rules, pRuleName) || [];
    },
    errorMessages(): FormErrorMessage {
      return this.form.errorMessage ?? this.global.errorMessage;
    },
  },

  watch: {
    value() {
      this.validate('change');
    },
  },

  mounted() {
    this.initialValue = cloneDeep(this.value);
    this.form.children.push(this);
  },

  beforeUnmount() {
    const index = this.form.children.findIndex((item: FormItemInstance) => item === this);
    this.form.children.splice(index, 1);
  },

  methods: {
    async validate<T>(trigger: ValidateTriggerType): Promise<FormItemValidateResult<T>> {
      this.resetValidating = true;
      const rules =
        trigger === 'all' ? this.innerRules : this.innerRules.filter((item) => (item.trigger || 'change') === trigger);
      const r = await validate(this.value, rules);
      const errorList = r
        .filter((item) => item.result !== true)
        .map((item) => {
          Object.keys(item).forEach((key) => {
            if (!item.message && this.errorMessages[key]) {
              const compiled = lodashTemplate(this.errorMessages[key]);
              // eslint-disable-next-line no-param-reassign
              item.message = compiled({
                name: this.label,
                validate: item[key],
              });
            }
          });
          return item;
        });
      this.errorList = errorList;
      // 仅有自定义校验方法才会存在 successList
      this.successList = r.filter((item) => item.result === true && item.message && item.type === 'success');
      // 根据校验结果设置校验状态
      if (rules.length) {
        this.verifyStatus = errorList.length ? ValidateStatus.FAIL : ValidateStatus.SUCCESS;
      } else {
        this.verifyStatus = ValidateStatus.TO_BE_VALIDATED;
      }
      // 重置处理
      if (this.needResetField) {
        this.resetHandler();
      }
      this.resetValidating = false;
      return {
        [this.name]: errorList.length === 0 ? true : r,
      } as FormItemValidateResult<T>;
    },
    getLabelContent(): TNodeReturnValue {
      if (typeof this.label === 'function') {
        // @ts-ignore: TODO
        return this.label(h);
      }
      if (typeof this.$slots.label === 'function') {
        return this.$slots.label(null);
      }
      return this.label;
    },
    getLabel(): TNodeReturnValue {
      const parent = this.form;
      const labelWidth = isNil(this.labelWidth) ? parent?.labelWidth : this.labelWidth;
      const labelAlign = isNil(this.labelAlign) ? parent?.labelAlign : this.labelAlign;
      if (Number(labelWidth) === 0) return;

      let labelStyle = {};
      if (labelWidth && labelAlign !== 'top') {
        if (typeof labelWidth === 'number') {
          labelStyle = { width: `${labelWidth}px` };
        } else {
          labelStyle = { width: labelWidth };
        }
      }

      return (
        <div class={this.labelClasses} style={labelStyle}>
          <label for={this.for}>{this.getLabelContent()}</label>
        </div>
      );
    },
    renderTipsInfo(): VNode {
      const parent = this.form;
      let helpVNode: VNode = <div class={this.CLASS_NAMES.extra}></div>;
      if (this.help) {
        helpVNode = <div class={this.CLASS_NAMES.extra}>{this.help}</div>;
      }
      const list = this.errorList;
      if (parent.showErrorMessage && list && list[0] && list[0].message) {
        return <div class={this.CLASS_NAMES.extra}>{list[0].message}</div>;
      }
      if (this.successList.length) {
        return <div class={this.CLASS_NAMES.extra}>{this.successList[0].message}</div>;
      }
      return helpVNode;
    },
    getDefaultIcon(): TNodeReturnValue {
      const resultIcon = (Icon: IconConstructor) => (
        <span class={this.CLASS_NAMES.status}>
          <Icon />
        </span>
      );
      const list = this.errorList;
      if (this.verifyStatus === ValidateStatus.SUCCESS) {
        return resultIcon(CheckCircleFilledIcon);
      }
      if (list && list[0]) {
        const type = this.errorList[0].type || 'error';
        const icon =
          {
            error: CloseCircleFilledIcon,
            warning: ErrorCircleFilledIcon,
          }[type] || CheckCircleFilledIcon;
        return resultIcon(icon as IconConstructor);
      }
      return null;
    },
    getIcon(
      statusIcon: TdFormProps['statusIcon'] | TdFormItemProps['statusIcon'],
      slotStatusIcon: Slot,
      props?: TdFormItemProps,
    ): TNodeReturnValue {
      const resultIcon = (otherContent?: TNodeReturnValue) => (
        <span class={this.CLASS_NAMES.status}>{otherContent}</span>
      );
      if (statusIcon === true) {
        return this.getDefaultIcon();
      }
      if (typeof statusIcon === 'function') {
        return resultIcon(statusIcon(h, props) as TNodeReturnValue);
      }
      if (typeof slotStatusIcon === 'function') {
        return resultIcon(slotStatusIcon());
      }
      return null;
    },
    getSuffixIcon(): TNodeReturnValue {
      const parent = this.form;
      const { statusIcon } = this;
      const slotStatusIcon = this.$slots.statusIcon;
      const parentStatusIcon = parent.statusIcon;
      const parentSlotStatusIcon = parent.$slots.statusIcon;
      if (statusIcon === false) return;
      let resultIcon: TNodeReturnValue = this.getIcon(statusIcon, slotStatusIcon);
      if (resultIcon) return resultIcon;
      if (resultIcon === false) return;
      resultIcon = this.getIcon(parentStatusIcon, parentSlotStatusIcon);
      if (resultIcon) return resultIcon;
    },
    getEmptyValue(): ValueType {
      const parent = this.form;
      const type = Object.prototype.toString.call(lodashGet(parent.data, this.name));
      let emptyValue: ValueType;
      if (type === '[object Array]') {
        emptyValue = [];
      }
      if (type === '[object Object]') {
        emptyValue = {};
      }
      return emptyValue;
    },
    resetField(): void {
      const parent = this.form;
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
      this.successList = [];
      this.verifyStatus = ValidateStatus.TO_BE_VALIDATED;
    },
  },

  render(): VNode {
    return (
      <div class={this.classes}>
        {this.getLabel()}
        <div class={this.contentClasses} style={this.contentStyle}>
          <div class={this.CLASS_NAMES.controlsContent}>
            {this.$slots.default ? this.$slots.default() : null}
            {this.getSuffixIcon()}
          </div>
          {this.renderTipsInfo()}
        </div>
      </div>
    );
  },
});
