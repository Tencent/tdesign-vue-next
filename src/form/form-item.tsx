import {
  defineComponent, VNode, nextTick, h,
} from 'vue';
import cloneDeep from 'lodash/cloneDeep';
import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import isNil from 'lodash/isNil';
import { prefix } from '../config';
import { validate } from './form-model';
import {
  Data, FormRule, TdFormItemProps, TdFormProps, ValueType, ValidateTriggerType, AllValidateResult,
} from './type';
import props from './form-item-props';
import { CLASS_NAMES, FORM_ITEM_CLASS_PREFIX } from './const';
import Form, { FormItemInstance } from './form';
import {
  ClassName, ScopedSlot, TNodeReturnValue, Styles,
} from '../common';
import TIconCheckCircleFilled from '../icon/check-circle-filled';
import TIconErrorCircleFilled from '../icon/error-circle-filled';
import TIconCloseCircleFilled from '../icon/close-circle-filled';

type IconConstructor = typeof TIconErrorCircleFilled;

type FormInstance = InstanceType<typeof Form>;
export type FormItemValidateResult<T extends Data = Data> = { [key in keyof T]: boolean | AllValidateResult[] };

export const enum ValidateStatus {
  TO_BE_VALIDATED = 'not',
  SUCCESS = 'success',
  FAIL = 'fail',
}

const name = `${prefix}-form-item`;

export default defineComponent({
  name,

  inject: {
    form: { default: undefined },
  },

  props: { ...props },

  data() {
    return {
      errorList: [],
      // 当前校验状态 未校验、校验通过、校验不通过
      verifyStatus: ValidateStatus.TO_BE_VALIDATED,
      resetValidating: false as boolean,
      needResetField: false as boolean,
      initialValue: undefined as ValueType,
    };
  },

  computed: {
    classes(): ClassName {
      return [CLASS_NAMES.formItem, FORM_ITEM_CLASS_PREFIX + this.name, {
        [CLASS_NAMES.formItemWithHelp]: this.help,
        [CLASS_NAMES.formItemWithExtra]: this.renderTipsInfo(),
      }];
    },
    labelClasses() {
      const parent = this.form;
      const labelAlign = isNil(this.labelAlign) ? parent?.labelAlign : this.labelAlign;
      const labelWidth = isNil(this.labelWidth) ? parent?.labelWidth : this.labelWidth;

      return [
        CLASS_NAMES.label,
        {
          [`${prefix}-form__label--required`]: this.needRequiredMark,
          [`${prefix}-form__label--colon`]: this.hasColon,
          [`${prefix}-form__label--top`]: labelAlign === 'top' || !labelWidth,
          [`${prefix}-form__label--left`]: labelAlign === 'left' && labelWidth,
          [`${prefix}-form__label--right`]: labelAlign === 'right' && labelWidth,
        },
      ];
    },
    errorClasses(): string {
      const parent = this.form as FormInstance;
      if (!parent.showErrorMessage) return '';
      if (this.verifyStatus === ValidateStatus.SUCCESS) return CLASS_NAMES.success;
      if (!this.errorList.length) return;
      const type = this.errorList[0].type || 'error';
      return type === 'error' ? CLASS_NAMES.error : CLASS_NAMES.warning;
    },
    contentClasses() {
      const getErrorClass: string = this.errorClasses;
      return [CLASS_NAMES.controls, getErrorClass];
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
      const parent = this.form;
      const allowMark = parent && parent.requiredMark;
      const isRequired = this.innerRules.filter((rule) => rule.required).length > 0;
      return Boolean(allowMark && isRequired);
    },
    innerRules(): FormRule[] {
      const parent = this.form;
      const rules = parent && parent.rules;
      return (rules && rules[this.name]) || (this.rules || []);
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
    this.form.$emit('form-item-destroyed', this);
    const index = this.form.children.findIndex((item: FormItemInstance) => item === this);
    this.form.children.splice(index, 1);
  },

  methods: {
    async validate<T>(trigger: ValidateTriggerType): Promise<FormItemValidateResult<T>> {
      this.resetValidating = true;
      const rules = trigger === 'all' ? this.innerRules : this.innerRules.filter((item) => (item.trigger || 'change') === trigger);
      const r = await validate(this.value, rules);
      const errorList = r.filter((item) => item.result !== true);
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
      return ({
        [this.name]: errorList.length === 0 ? true : r,
      } as FormItemValidateResult<T>);
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
          <label for={this.for}>
            {this.getLabelContent()}
          </label>
        </div>
      );
    },
    renderTipsInfo(): VNode {
      const parent = this.form;
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
      const resultIcon = (Icon: IconConstructor) => (
        <span class={CLASS_NAMES.status}>
          <Icon size='25px'></Icon>
        </span>
      );
      const list = this.errorList;
      if (this.verifyStatus === ValidateStatus.SUCCESS) {
        return resultIcon(TIconCheckCircleFilled);
      }
      if (list && list[0]) {
        const type = this.errorList[0].type || 'error';
        const icon = {
          error: TIconCloseCircleFilled,
          warning: TIconErrorCircleFilled,
        }[type] || TIconCheckCircleFilled;
        return resultIcon(icon as IconConstructor);
      }
      return null;
    },
    getIcon(
      statusIcon: TdFormProps['statusIcon'] | TdFormItemProps['statusIcon'],
      slotStatusIcon: ScopedSlot,
    ): TNodeReturnValue {
      const resultIcon = (otherContent?: TNodeReturnValue) => (
        <span class={CLASS_NAMES.status}>{otherContent}</span>
      );
      const withoutIcon = () => (
        <span class={[CLASS_NAMES.status, `${CLASS_NAMES.status}-without-icon`]}>
        </span>
      );
      if (statusIcon === true) {
        return this.getDefaultIcon();
      }
      if (statusIcon === false) {
        return withoutIcon();
      }
      if (typeof statusIcon === 'function') {
        return resultIcon(slotStatusIcon());
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
