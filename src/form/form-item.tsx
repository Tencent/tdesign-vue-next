import {
  computed,
  defineComponent,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  reactive,
  ref,
  toRefs,
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
  ValidateTriggerType,
  ValueType,
} from './type';
import props from './form-item-props';
import {
  ErrorListType,
  FormInjectionKey,
  FormItemContext,
  FormItemInjectionKey,
  SuccessListType,
  useCLASSNAMES,
} from './const';
import { ClassName, TNodeReturnValue } from '../common';

import { useConfig, usePrefixClass, useTNodeJSX } from '../hooks';

type IconConstructor = typeof ErrorCircleFilledIcon;

export type FormItemValidateResult<T extends Data = Data> = { [key in keyof T]: boolean | AllValidateResult[] };

export const enum ValidateStatus {
  TO_BE_VALIDATED = 'not',
  SUCCESS = 'success',
  FAIL = 'fail',
}

export default defineComponent({
  name: 'TFormItem',

  props: { ...props },
  setup(props) {
    const renderContent = useTNodeJSX();
    const CLASS_NAMES = useCLASSNAMES();
    const { global } = useConfig('form');
    const form = inject(FormInjectionKey, undefined);

    const FORM_ITEM_CLASS_PREFIX = usePrefixClass('form-item__');

    const needRequiredMark = computed(() => {
      const { requiredMark } = props;
      if (typeof requiredMark === 'boolean') return requiredMark;
      const parentRequiredMark = form?.requiredMark === undefined ? global.value.requiredMark : form?.requiredMark;
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
    const renderSuffixIcon = (): TNodeReturnValue => {
      const { statusIcon } = props;
      if (statusIcon === false) return;

      let resultIcon: TNodeReturnValue = renderContent('statusIcon', {
        defaultNode: getDefaultIcon(),
      });
      if (resultIcon) return <span className={CLASS_NAMES.value.status}>{resultIcon}</span>;
      if (resultIcon === false) return;

      resultIcon = form?.renderContent('statusIcon', { defaultNode: getDefaultIcon() });
      if (resultIcon) return resultIcon;
    };
    /** Suffix Icon END */

    /** Content Style */
    const errorClasses = computed(() => {
      if (!showErrorMessage.value) return '';
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
    const resetField = async (resetType?: 'initial' | 'empty') => {
      if (!props.name) return;
      if (resetType !== undefined) {
        resetType === 'empty' && lodashSet(form?.data, props.name, getEmptyValue());
        resetType === 'initial' && lodashSet(form?.data, props.name, initialValue.value);
      } else {
        form?.resetType === 'empty' && lodashSet(form?.data, props.name, getEmptyValue());
        form?.resetType === 'initial' && lodashSet(form?.data, props.name, initialValue.value);
      }
      await nextTick();
      if (resetValidating.value) {
        needResetField.value = true;
      } else {
        resetHandler();
      }
    };

    const errorMessages = computed<FormErrorMessage>(() => form?.errorMessage ?? global.value.errorMessage);
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
      if (!rules?.length) {
        resetValidating.value = false;
        return;
      }
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

    const setValidateMessage = (validateMessage: FormItemValidateMessage[]) => {
      if (!validateMessage && !Array.isArray(validateMessage)) return;
      if (validateMessage.length === 0) {
        errorList.value = [];
        verifyStatus.value = ValidateStatus.SUCCESS;
      }
      errorList.value = validateMessage.map((item) => ({ ...item, result: false }));
      verifyStatus.value = ValidateStatus.FAIL;
    };

    const value = computed<ValueType>(() => form?.data && lodashGet(form?.data, props.name));
    const initialValue = ref<ValueType>(undefined);
    const { name } = toRefs(props);
    const context: FormItemContext = reactive({
      name,
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
      if (form) form.children = form?.children.filter((ctx) => ctx !== context);
    });
    watch(
      value,
      async () => {
        await validateHandler('change');
      },
      { deep: true },
    );

    const showErrorMessage = computed(() => {
      if (typeof props.showErrorMessage === 'boolean') return props.showErrorMessage;
      return form?.showErrorMessage;
    });

    const classes = computed<ClassName>(() => [
      CLASS_NAMES.value.formItem,
      FORM_ITEM_CLASS_PREFIX.value + props.name,
      {
        [CLASS_NAMES.value.formItemWithHelp]: helpNode.value,
        [CLASS_NAMES.value.formItemWithExtra]: extraNode.value,
      },
    ]);
    const helpNode = computed<VNode>(() => {
      if (props.help) {
        return <div class={CLASS_NAMES.value.help}>{props.help}</div>;
      }
      return null;
    });
    const extraNode = computed<VNode>(() => {
      const getExtraNode = (content: string) => <div class={CLASS_NAMES.value.extra}>{content}</div>;
      const list = errorList.value;
      if (showErrorMessage.value && list?.[0]?.message) {
        return getExtraNode(list[0].message);
      }
      if (successList.value.length) {
        return getExtraNode(successList.value[0].message);
      }
      return null;
    });

    const handleBlur = async () => {
      await validateHandler('blur');
    };
    provide(FormItemInjectionKey, {
      handleBlur,
    });

    return () => (
      <div class={classes.value}>
        {renderLabel()}
        <div class={contentClasses.value} style={contentStyle.value}>
          <div class={CLASS_NAMES.value.controlsContent}>
            {renderContent('default')}
            {renderSuffixIcon()}
          </div>
          {[helpNode.value, extraNode.value]}
        </div>
      </div>
    );
  },
});
