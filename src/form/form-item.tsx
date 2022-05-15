import {
  computed,
  defineComponent,
  getCurrentInstance,
  h,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  Slot,
  VNode,
  watch,
} from 'vue';
import { CheckCircleFilledIcon, CloseCircleFilledIcon, ErrorCircleFilledIcon } from 'tdesign-icons-vue-next';
import cloneDeep from 'lodash/cloneDeep';
import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import isNil from 'lodash/isNil';
import lodashTemplate from 'lodash/template';
import { validate } from './form-model';
import {
  AllValidateResult,
  Data,
  FormErrorMessage,
  FormItemValidateMessage,
  FormRule,
  TdFormItemProps,
  TdFormProps,
  ValidateTriggerType,
  ValueType,
} from './type';
import props from './form-item-props';
import { ErrorListType, FormInjectionKey, SuccessListType, useCLASSNAMES } from './const';
import Form, { FormItemInstance } from './form';
import { ClassName, Styles, TNodeReturnValue } from '../common';

import { useConfig, usePrefixClass } from '../hooks/useConfig';
import { useTNodeJSX } from '../hooks/tnode';

type IconConstructor = typeof ErrorCircleFilledIcon;

export type FormItemValidateResult<T extends Data = Data> = { [key in keyof T]: boolean | AllValidateResult[] };

export const enum ValidateStatus {
  TO_BE_VALIDATED = 'not',
  SUCCESS = 'success',
  FAIL = 'fail',
}

export default defineComponent({
  name: 'TFormItem',

  // inject: {
  //   form: { default: undefined },
  // },

  props: { ...props },
  setup(props, { slots, expose }) {
    const renderContent = useTNodeJSX();
    const CLASS_NAMES = useCLASSNAMES();
    const { global } = useConfig('form');

    // return {
    //   global,
    //   CLASS_NAMES,
    //   FROM_LABEL,
    //   FORM_ITEM_CLASS_PREFIX,
    // };

    const form = inject(FormInjectionKey, undefined);

    const FORM_ITEM_CLASS_PREFIX = usePrefixClass('form-item__');
    const classes = computed<ClassName>(() => [
      CLASS_NAMES.value.formItem,
      FORM_ITEM_CLASS_PREFIX.value + props.name,
      {
        [CLASS_NAMES.value.formItemWithHelp]: props.help,
        [CLASS_NAMES.value.formItemWithExtra]: renderTipsInfo(),
      },
    ]);

    const needRequiredMark = computed(() => {
      const { requiredMark } = props;
      if (typeof requiredMark === 'boolean') return requiredMark;
      const parentRequiredMark = form?.requiredMark === undefined ? global.value.requiredMark : form.requiredMark;
      const isRequired = innerRules.value.filter((rule) => rule.required).length > 0;
      return Boolean(parentRequiredMark && isRequired);
    });

    const hasColon = computed(() => !!(form?.colon && renderContent('label')));
    const FROM_LABEL = usePrefixClass('form__label');
    const labelAlign = computed(() => (isNil(props.labelAlign) ? form?.labelAlign : props.labelAlign));
    const labelWidth = computed(() => (isNil(props.labelWidth) ? form?.labelWidth : props.labelWidth));

    const labelClasses = computed(() => [
      CLASS_NAMES.value.label,
      {
        [`${FROM_LABEL.value}--required`]: needRequiredMark.value,
        [`${FROM_LABEL.value}--colon`]: hasColon.value,
        [`${FROM_LABEL.value}--top`]: labelAlign.value === 'top' || !labelWidth.value,
        [`${FROM_LABEL.value}--left`]: labelAlign.value === 'left' && labelWidth.value,
        [`${FROM_LABEL.value}--right`]: labelAlign.value === 'right' && labelWidth.value,
      },
    ]);

    const renderLabel = (): TNodeReturnValue => {
      if (Number(labelWidth.value) === 0) return;

      let labelStyle = {};
      if (labelWidth.value && labelAlign.value !== 'top') {
        if (typeof labelWidth.value === 'number') {
          labelStyle = { width: `${labelWidth.value}px` };
        } else {
          labelStyle = { width: labelWidth.value };
        }
      }

      return (
        <div class={labelClasses.value} style={labelStyle}>
          <label for={props.for}>{renderContent('label')}</label>
        </div>
      );
    };

    /** Suffix Icon */
    const getDefaultIcon = (): VNode => {
      const resultIcon = (Icon: IconConstructor) => (
        <span class={CLASS_NAMES.value.status}>
          <Icon />
        </span>
      );
      const list = errorList.value;
      if (verifyStatus.value === ValidateStatus.SUCCESS) {
        return resultIcon(CheckCircleFilledIcon);
      }
      if (list?.[0]) {
        const type = list[0].type || 'error';
        const icon =
          {
            error: CloseCircleFilledIcon,
            warning: ErrorCircleFilledIcon,
          }[type] || CheckCircleFilledIcon;
        return resultIcon(icon as IconConstructor);
      }
      return null;
    };
    const getIcon = (
      statusIcon: TdFormProps['statusIcon'] | TdFormItemProps['statusIcon'],
      slotStatusIcon: Slot,
      props?: TdFormItemProps,
    ): TNodeReturnValue => {
      const resultIcon = (otherContent?: TNodeReturnValue) => (
        <span class={CLASS_NAMES.value.status}>{otherContent}</span>
      );
      if (statusIcon === true) {
        return getDefaultIcon();
      }
      if (typeof statusIcon === 'function') {
        return resultIcon(statusIcon(h, props) as TNodeReturnValue);
      }
      if (typeof slotStatusIcon === 'function') {
        return resultIcon(slotStatusIcon());
      }
      return null;
    };
    const renderSuffixIcon = (): TNodeReturnValue => {
      const { statusIcon } = props;
      if (statusIcon === false) return;

      // const slotStatusIcon = slots.statusIcon;
      const parentStatusIcon = form?.statusIcon;
      const parentSlotStatusIcon = form?.slots.statusIcon;

      let resultIcon: TNodeReturnValue = renderContent('statusIcon', {
        defaultNode: getDefaultIcon(),
      });
      // let resultIcon: TNodeReturnValue = getIcon(statusIcon, slotStatusIcon);
      if (resultIcon) return <span className={CLASS_NAMES.value.status}>{resultIcon}</span>;
      if (resultIcon === false) return;

      // TODO use renderContent   remove getIcon func
      resultIcon = getIcon(parentStatusIcon, parentSlotStatusIcon);
      if (resultIcon) return resultIcon;
    };
    /** Suffix Icon END */

    /** Content Style */
    const errorClasses = computed(() => {
      if (!form.showErrorMessage) return '';
      if (verifyStatus.value === ValidateStatus.SUCCESS) {
        return props.successBorder
          ? [CLASS_NAMES.value.success, CLASS_NAMES.value.successBorder].join(' ')
          : CLASS_NAMES.value.success;
      }
      if (!errorList.value.length) return;
      const type = errorList.value[0].type || 'error';
      return type === 'error' ? CLASS_NAMES.value.error : CLASS_NAMES.value.warning;
    });
    const contentClasses = computed(() => [CLASS_NAMES.value.controls, errorClasses.value]);
    const contentStyle = computed(() => {
      let contentStyle = {};
      if (labelWidth.value && labelAlign.value !== 'top') {
        if (typeof labelWidth.value === 'number') {
          contentStyle = { marginLeft: `${labelWidth.value}px` };
        } else {
          contentStyle = { marginLeft: labelWidth.value };
        }
      }

      return contentStyle;
    });
    /** Content Style END */

    const errorList = ref<ErrorListType[]>([]);
    const successList = ref<SuccessListType[]>([]);
    const verifyStatus = ref(ValidateStatus.TO_BE_VALIDATED);
    const resetValidating = ref(false);
    const needResetField = ref(false);

    const resetHandler = () => {
      needResetField.value = false;
      errorList.value = [];
      successList.value = [];
      verifyStatus.value = ValidateStatus.TO_BE_VALIDATED;
    };
    const getEmptyValue = (): ValueType => {
      const type = Object.prototype.toString.call(lodashGet(form?.data, props.name));
      let emptyValue: ValueType;
      if (type === '[object String]') {
        emptyValue = '';
      }
      if (type === '[object Array]') {
        emptyValue = [];
      }
      if (type === '[object Object]') {
        emptyValue = {};
      }
      return emptyValue;
    };
    const resetField = async () => {
      if (!props.name) return;
      if (form?.resetType === 'empty') {
        lodashSet(form?.data, props.name, getEmptyValue());
      }
      if (form?.resetType === 'initial') {
        lodashSet(form?.data, props.name, initialValue.value);
      }
      await nextTick();
      if (resetValidating.value) {
        needResetField.value = true;
      } else {
        resetHandler();
      }
    };

    const errorMessages = computed<FormErrorMessage>(() => form.errorMessage ?? global.value.errorMessage);
    const innerRules = computed(() => {
      if (props.rules?.length) return props.rules;
      if (!props.name) return [];
      const index = props.name.lastIndexOf('.') || -1;
      const pRuleName = props.name.slice(index + 1);
      return lodashGet(form?.rules, props.name) || lodashGet(form?.rules, pRuleName) || [];
    });

    async function validateHandler<T>(trigger: ValidateTriggerType): Promise<FormItemValidateResult<T>> {
      resetValidating.value = true;
      const rules =
        trigger === 'all'
          ? innerRules.value
          : innerRules.value.filter((item) => (item.trigger || 'change') === trigger);
      const res = await validate(value.value, rules);
      errorList.value = res
        .filter((item) => item.result !== true)
        .map((item: ErrorListType) => {
          Object.keys(item).forEach((key) => {
            if (!item.message && errorMessages.value[key]) {
              const compiled = lodashTemplate(errorMessages.value[key]);
              item.message = compiled({
                name: props.label,
                validate: item[key],
              });
            }
          });
          return item;
        });
      // 仅有自定义校验方法才会存在 successList
      successList.value = res.filter(
        (item) => item.result === true && item.message && item.type === 'success',
      ) as SuccessListType[];
      // 根据校验结果设置校验状态
      if (rules.length) {
        verifyStatus.value = errorList.value.length ? ValidateStatus.FAIL : ValidateStatus.SUCCESS;
      } else {
        verifyStatus.value = ValidateStatus.TO_BE_VALIDATED;
      }
      // 重置处理
      if (needResetField.value) {
        resetHandler();
      }
      resetValidating.value = false;
      return {
        [props.name]: errorList.value.length === 0 ? true : res,
      } as FormItemValidateResult<T>;
    }

    // TODO
    const setValidateMessage = (validateMessage: FormItemValidateMessage) => {
      errorList.value = [{ ...validateMessage, result: false }];
      verifyStatus.value = ValidateStatus.FAIL;
    };

    const value = computed<ValueType>(() => form?.data && lodashGet(form?.data, props.name));
    const initialValue = ref<ValueType>(undefined);
    const context = reactive({
      name: props.name,
      resetHandler,
      resetField,
      validate: validateHandler,
      setValidateMessage,
    });

    onMounted(() => {
      initialValue.value = cloneDeep(value.value);
      form?.children.push(context);
    });
    onBeforeUnmount(() => {
      const index = form?.children.indexOf((ctx) => ctx === context);
      form?.children.splice(index, 1);
    });
    watch(
      value,
      async () => {
        await validateHandler('change');
      },
      { deep: true },
    );

    const renderTipsInfo = (): VNode => {
      let helpVNode: VNode = <div class={CLASS_NAMES.value.help}></div>;
      if (props.help) {
        helpVNode = <div class={CLASS_NAMES.value.help}>{props.help}</div>;
      }
      const list = errorList.value;
      if (form.showErrorMessage && list?.[0]?.message) {
        return <div class={CLASS_NAMES.value.extra}>{list[0].message}</div>;
      }
      if (successList.value.length) {
        return <div class={CLASS_NAMES.value.extra}>{successList.value[0].message}</div>;
      }
      return helpVNode;
    };

    return () => (
      <div class={classes.value}>
        {renderLabel()}
        <div class={contentClasses.value} style={contentStyle.value}>
          <div class={CLASS_NAMES.value.controlsContent}>
            {renderContent('default')}
            {renderSuffixIcon()}
          </div>
          {renderTipsInfo()}
        </div>
      </div>
    );
  },
  //
  // data() {
  //   return {
  //     // 校验不通过信息列表
  //     errorList: [],
  //     // 校验通过显示的内容
  //     successList: [],
  //     // 当前校验状态 未校验、校验通过、校验不通过
  //     verifyStatus: ValidateStatus.TO_BE_VALIDATED,
  //     resetValidating: false as boolean,
  //     needResetField: false as boolean,
  //     initialValue: undefined as ValueType,
  //   };
  // },
  //
  // computed: {
  //   classes(): ClassName {
  //     return [
  //       this.CLASS_NAMES.formItem,
  //       this.FORM_ITEM_CLASS_PREFIX + this.name,
  //       {
  //         [this.CLASS_NAMES.formItemWithHelp]: this.help,
  //         [this.CLASS_NAMES.formItemWithExtra]: this.renderTipsInfo(),
  //       },
  //     ];
  //   },
  //   labelClasses() {
  //     const { FROM_LABEL } = this;
  //     const parent = this.form;
  //     const labelAlign = isNil(this.labelAlign) ? parent?.labelAlign : this.labelAlign;
  //     const labelWidth = isNil(this.labelWidth) ? parent?.labelWidth : this.labelWidth;
  //
  //     return [
  //       this.CLASS_NAMES.label,
  //       {
  //         [`${FROM_LABEL}--required`]: this.needRequiredMark,
  //         [`${FROM_LABEL}--colon`]: this.hasColon,
  //         [`${FROM_LABEL}--top`]: labelAlign === 'top' || !labelWidth,
  //         [`${FROM_LABEL}--left`]: labelAlign === 'left' && labelWidth,
  //         [`${FROM_LABEL}--right`]: labelAlign === 'right' && labelWidth,
  //       },
  //     ];
  //   },
  //   errorClasses(): string {
  //     const parent = this.form as FormInstance;
  //     if (!parent.showErrorMessage) return '';
  //     if (this.verifyStatus === ValidateStatus.SUCCESS) {
  //       return this.successBorder
  //         ? [this.CLASS_NAMES.success, this.CLASS_NAMES.successBorder].join(' ')
  //         : this.CLASS_NAMES.success;
  //     }
  //     if (!this.errorList.length) return;
  //     const type = this.errorList[0].type || 'error';
  //     return type === 'error' ? this.CLASS_NAMES.error : this.CLASS_NAMES.warning;
  //   },
  //
  //   disabled(): boolean {
  //     return this.form.disabled;
  //   },
  //
  //   contentClasses() {
  //     const getErrorClass: string = this.errorClasses;
  //     return [this.CLASS_NAMES.controls, getErrorClass];
  //   },
  //   contentStyle(): Styles {
  //     const parent = this.form;
  //     const labelAlign = isNil(this.labelAlign) ? parent?.labelAlign : this.labelAlign;
  //     const labelWidth = isNil(this.labelWidth) ? parent?.labelWidth : this.labelWidth;
  //     let contentStyle = {};
  //     if (labelWidth && labelAlign !== 'top') {
  //       if (typeof labelWidth === 'number') {
  //         contentStyle = { marginLeft: `${labelWidth}px` };
  //       } else {
  //         contentStyle = { marginLeft: labelWidth };
  //       }
  //     }
  //
  //     return contentStyle;
  //   },
  //   value(): ValueType {
  //     const parent = this.form;
  //     return parent && parent.data && lodashGet(parent.data, this.name);
  //   },
  //   hasColon(): boolean {
  //     const parent = this.form;
  //     return !!(parent && parent.colon && this.getLabelContent());
  //   },
  //   needRequiredMark(): boolean {
  //     const { requiredMark } = this.$props;
  //     if (typeof requiredMark === 'boolean') return requiredMark;
  //     const parent = this.form;
  //     const parentRequiredMark = parent?.requiredMark === undefined ? this.global.requiredMark : parent.requiredMark;
  //     const isRequired = this.innerRules.filter((rule) => rule.required).length > 0;
  //     return Boolean(parentRequiredMark && isRequired);
  //   },
  //   innerRules(): FormRule[] {
  //     const parent = this.form;
  //     if (this.rules?.length) return this.rules || [];
  //     if (!this.name) return [];
  //     const index = this.name.lastIndexOf('.') || -1;
  //     const pRuleName = this.name.slice(index + 1);
  //     return lodashGet(parent?.rules, this.name) || lodashGet(parent?.rules, pRuleName) || [];
  //   },
  //   errorMessages(): FormErrorMessage {
  //     return this.form.errorMessage ?? this.global.errorMessage;
  //   },
  // },
  //
  // watch: {
  //   // TODO deep watch
  //   value() {
  //     this.validate('change');
  //   },
  // },
  //
  // mounted() {
  //   this.initialValue = cloneDeep(this.value);
  //   this.form.children.push(this);
  // },
  //
  // beforeUnmount() {
  //   const index = this.form.children.findIndex((item: FormItemInstance) => item === this);
  //   this.form.children.splice(index, 1);
  // },
  //
  // methods: {
  //   async validate<T>(trigger: ValidateTriggerType): Promise<FormItemValidateResult<T>> {
  //     this.resetValidating = true;
  //     const rules =
  //       trigger === 'all' ? this.innerRules : this.innerRules.filter((item) => (item.trigger || 'change') === trigger);
  //     const r = await validate(this.value, rules);
  //     const errorList = r
  //       .filter((item) => item.result !== true)
  //       .map((item) => {
  //         Object.keys(item).forEach((key) => {
  //           if (!item.message && this.errorMessages[key]) {
  //             const compiled = lodashTemplate(this.errorMessages[key]);
  //             // eslint-disable-next-line no-param-reassign
  //             item.message = compiled({
  //               name: this.label,
  //               validate: item[key],
  //             });
  //           }
  //         });
  //         return item;
  //       });
  //     this.errorList = errorList;
  //     // 仅有自定义校验方法才会存在 successList
  //     this.successList = r.filter((item) => item.result === true && item.message && item.type === 'success');
  //     // 根据校验结果设置校验状态
  //     if (rules.length) {
  //       this.verifyStatus = errorList.length ? ValidateStatus.FAIL : ValidateStatus.SUCCESS;
  //     } else {
  //       this.verifyStatus = ValidateStatus.TO_BE_VALIDATED;
  //     }
  //     // 重置处理
  //     if (this.needResetField) {
  //       this.resetHandler();
  //     }
  //     this.resetValidating = false;
  //     return {
  //       [this.name]: errorList.length === 0 ? true : r,
  //     } as FormItemValidateResult<T>;
  //   },
  //   getLabelContent(): TNodeReturnValue {
  //     if (typeof this.label === 'function') {
  //       // @ts-ignore: TODO
  //       return this.label(h);
  //     }
  //     if (typeof this.$slots.label === 'function') {
  //       return this.$slots.label(null);
  //     }
  //     return this.label;
  //   },
  //   getLabel(): TNodeReturnValue {
  //     const parent = this.form;
  //     const labelWidth = isNil(this.labelWidth) ? parent?.labelWidth : this.labelWidth;
  //     const labelAlign = isNil(this.labelAlign) ? parent?.labelAlign : this.labelAlign;
  //     if (Number(labelWidth) === 0) return;
  //
  //     let labelStyle = {};
  //     if (labelWidth && labelAlign !== 'top') {
  //       if (typeof labelWidth === 'number') {
  //         labelStyle = { width: `${labelWidth}px` };
  //       } else {
  //         labelStyle = { width: labelWidth };
  //       }
  //     }
  //
  //     return (
  //       <div class={this.labelClasses} style={labelStyle}>
  //         <label for={this.for}>{this.getLabelContent()}</label>
  //       </div>
  //     );
  //   },
  //   renderTipsInfo(): VNode {
  //     const parent = this.form;
  //     let helpVNode: VNode = <div class={this.CLASS_NAMES.help}></div>;
  //     if (this.help) {
  //       helpVNode = <div class={this.CLASS_NAMES.help}>{this.help}</div>;
  //     }
  //     const list = this.errorList;
  //     if (parent.showErrorMessage && list && list[0] && list[0].message) {
  //       return <div class={this.CLASS_NAMES.extra}>{list[0].message}</div>;
  //     }
  //     if (this.successList.length) {
  //       return <div class={this.CLASS_NAMES.extra}>{this.successList[0].message}</div>;
  //     }
  //     return helpVNode;
  //   },
  //   getDefaultIcon(): TNodeReturnValue {
  //     const resultIcon = (Icon: IconConstructor) => (
  //       <span class={this.CLASS_NAMES.status}>
  //         <Icon />
  //       </span>
  //     );
  //     const list = this.errorList;
  //     if (this.verifyStatus === ValidateStatus.SUCCESS) {
  //       return resultIcon(CheckCircleFilledIcon);
  //     }
  //     if (list && list[0]) {
  //       const type = this.errorList[0].type || 'error';
  //       const icon =
  //         {
  //           error: CloseCircleFilledIcon,
  //           warning: ErrorCircleFilledIcon,
  //         }[type] || CheckCircleFilledIcon;
  //       return resultIcon(icon as IconConstructor);
  //     }
  //     return null;
  //   },
  //   getIcon(
  //     statusIcon: TdFormProps['statusIcon'] | TdFormItemProps['statusIcon'],
  //     slotStatusIcon: Slot,
  //     props?: TdFormItemProps,
  //   ): TNodeReturnValue {
  //     const resultIcon = (otherContent?: TNodeReturnValue) => (
  //       <span class={this.CLASS_NAMES.status}>{otherContent}</span>
  //     );
  //     if (statusIcon === true) {
  //       return this.getDefaultIcon();
  //     }
  //     if (typeof statusIcon === 'function') {
  //       return resultIcon(statusIcon(h, props) as TNodeReturnValue);
  //     }
  //     if (typeof slotStatusIcon === 'function') {
  //       return resultIcon(slotStatusIcon());
  //     }
  //     return null;
  //   },
  //   getSuffixIcon(): TNodeReturnValue {
  //     const parent = this.form;
  //     const { statusIcon } = this;
  //     const slotStatusIcon = this.$slots.statusIcon;
  //     const parentStatusIcon = parent.statusIcon;
  //     const parentSlotStatusIcon = parent.$slots.statusIcon;
  //     if (statusIcon === false) return;
  //     let resultIcon: TNodeReturnValue = this.getIcon(statusIcon, slotStatusIcon);
  //     if (resultIcon) return resultIcon;
  //     if (resultIcon === false) return;
  //     resultIcon = this.getIcon(parentStatusIcon, parentSlotStatusIcon);
  //     if (resultIcon) return resultIcon;
  //   },
  //   getEmptyValue(): ValueType {
  //     const parent = this.form;
  //     const type = Object.prototype.toString.call(lodashGet(parent.data, this.name));
  //     let emptyValue: ValueType;
  //     if (type === '[object Array]') {
  //       emptyValue = [];
  //     }
  //     if (type === '[object Object]') {
  //       emptyValue = {};
  //     }
  //     return emptyValue;
  //   },
  //   resetField(): void {
  //     const parent = this.form;
  //     if (!this.name) {
  //       return;
  //     }
  //     if (parent.resetType === 'empty') {
  //       lodashSet(parent.data, this.name, this.getEmptyValue());
  //     }
  //     if (parent.resetType === 'initial') {
  //       lodashSet(parent.data, this.name, this.initialValue);
  //     }
  //     nextTick(() => {
  //       if (this.resetValidating) {
  //         this.needResetField = true;
  //       } else {
  //         this.resetHandler();
  //       }
  //     });
  //   },
  //   resetHandler(): void {
  //     this.needResetField = false;
  //     this.errorList = [];
  //     this.successList = [];
  //     this.verifyStatus = ValidateStatus.TO_BE_VALIDATED;
  //   },
  // },
  //
  // render(): VNode {
  //   return (
  //     <div class={this.classes}>
  //       {this.getLabel()}
  //       <div class={this.contentClasses} style={this.contentStyle}>
  //         <div class={this.CLASS_NAMES.controlsContent}>
  //           {this.$slots.default ? this.$slots.default() : null}
  //           {this.getSuffixIcon()}
  //         </div>
  //         {this.renderTipsInfo()}
  //       </div>
  //     </div>
  //   );
  // },
});
