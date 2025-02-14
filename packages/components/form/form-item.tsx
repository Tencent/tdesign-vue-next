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
import {
  CheckCircleFilledIcon as TdCheckCircleFilledIcon,
  CloseCircleFilledIcon as TdCloseCircleFilledIcon,
  ErrorCircleFilledIcon as TdErrorCircleFilledIcon,
  GlobalIconType,
} from 'tdesign-icons-vue-next';
import { isArray } from 'lodash-es';
import { isNumber } from 'lodash-es';
import { isString } from 'lodash-es';
import { isBoolean } from 'lodash-es';
import { cloneDeep } from 'lodash-es';
import { get as lodashGet } from 'lodash-es';
import { set as lodashSet } from 'lodash-es';
import { isNil } from 'lodash-es';

import { validate } from './form-model';
import {
  AllValidateResult,
  Data,
  FormErrorMessage,
  FormItemValidateMessage,
  FormRule,
  ValidateTriggerType,
  ValueType,
} from './type';
import props from './form-item-props';
import {
  AnalysisValidateResult,
  ErrorListType,
  FormInjectionKey,
  FormItemContext,
  FormItemInjectionKey,
  SuccessListType,
  useCLASSNAMES,
  ValidateStatus,
} from './const';

import { useConfig, usePrefixClass, useTNodeJSX } from '../hooks';
import { useGlobalIcon } from '../hooks/useGlobalIcon';
import { template } from '@tdesign/common-js/utils/stringTemplate';

export type FormItemValidateResult<T extends Data = Data> = { [key in keyof T]: boolean | AllValidateResult[] };

export function getFormItemClassName(componentName: string, name?: string) {
  if (!name) return '';
  return `${componentName}__${name}`.replace(/(\[|\]\.)/g, '_');
}

export default defineComponent({
  name: 'TFormItem',

  props: { ...props },
  setup(props, { slots }) {
    const renderContent = useTNodeJSX();
    const CLASS_NAMES = useCLASSNAMES();
    const { globalConfig } = useConfig('form');
    const { CheckCircleFilledIcon, CloseCircleFilledIcon, ErrorCircleFilledIcon } = useGlobalIcon({
      CheckCircleFilledIcon: TdCheckCircleFilledIcon,
      CloseCircleFilledIcon: TdCloseCircleFilledIcon,
      ErrorCircleFilledIcon: TdErrorCircleFilledIcon,
    });
    const form = inject(FormInjectionKey, undefined);

    const classPrefix = usePrefixClass();
    const formItemClassPrefix = usePrefixClass('form-item');

    const needRequiredMark = computed(() => {
      const requiredMark = props.requiredMark ?? form?.requiredMark ?? globalConfig.value.requiredMark;
      const isRequired = innerRules.value.filter((rule) => rule.required).length > 0;
      return requiredMark ?? isRequired;
    });

    const hasLabel = computed(() => slots.label || props.label);
    const hasColon = computed(() => !!(form?.colon && hasLabel.value));
    const FROM_LABEL = usePrefixClass('form__label');
    const labelAlign = computed(() => (isNil(props.labelAlign) ? form?.labelAlign : props.labelAlign));
    const labelWidth = computed(() => (isNil(props.labelWidth) ? form?.labelWidth : props.labelWidth));

    const labelClasses = computed(() => [
      CLASS_NAMES.value.label,
      {
        [`${FROM_LABEL.value}--required`]: needRequiredMark.value,
        [`${FROM_LABEL.value}--top`]: hasLabel.value && (labelAlign.value === 'top' || !labelWidth.value),
        [`${FROM_LABEL.value}--left`]: labelAlign.value === 'left' && labelWidth.value,
        [`${FROM_LABEL.value}--right`]: labelAlign.value === 'right' && labelWidth.value,
      },
    ]);

    const statusClass = computed(
      () =>
        `${classPrefix.value}-is-${props.status || 'default'} ${
          props.status === 'success' ? CLASS_NAMES.value.successBorder : ''
        }`,
    );

    const renderLabel = () => {
      if (Number(labelWidth.value) === 0) return;

      let labelStyle = {};
      if (labelWidth.value && labelAlign.value !== 'top') {
        if (isNumber(labelWidth.value)) {
          labelStyle = { width: `${labelWidth.value}px` };
        } else {
          labelStyle = { width: labelWidth.value };
        }
      }

      return (
        <div class={labelClasses.value} style={labelStyle}>
          <label for={props.for || null}>{renderContent('label')}</label>
          {hasColon.value && globalConfig.value.colonText}
        </div>
      );
    };

    /** Suffix Icon */
    const getDefaultIcon = (): VNode => {
      const resultIcon = (Icon: GlobalIconType) => (
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
        return resultIcon(icon);
      }
      return null;
    };
    const renderSuffixIcon = () => {
      const { statusIcon } = props;
      if (statusIcon === false) return;

      let resultIcon = renderContent('statusIcon', { defaultNode: getDefaultIcon() });
      if (resultIcon) return <span class={CLASS_NAMES.value.status}>{resultIcon}</span>;
      if (resultIcon === false) return;

      resultIcon = form?.renderContent('statusIcon', { defaultNode: getDefaultIcon(), params: props });
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
      if (props.status) return statusClass.value;
      return type === 'error' ? CLASS_NAMES.value.error : CLASS_NAMES.value.warning;
    });
    const contentClasses = computed(() => [CLASS_NAMES.value.controls, errorClasses.value]);
    const contentStyle = computed(() => {
      let contentStyle = {};
      if (labelWidth.value && labelAlign.value !== 'top') {
        if (isNumber(labelWidth.value)) {
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
    const resetField = async (resetType: 'initial' | 'empty' | undefined = form?.resetType) => {
      if (!props.name) return;

      if (resetType === 'empty') lodashSet(form?.data, props.name, getEmptyValue());
      else if (resetType === 'initial') lodashSet(form?.data, props.name, initialValue.value);

      await nextTick();
      if (resetValidating.value) {
        needResetField.value = true;
      } else {
        resetHandler();
      }
    };

    const errorMessages = computed<FormErrorMessage>(() => form?.errorMessage ?? globalConfig.value.errorMessage);
    const innerRules = computed<FormRule[]>(() => {
      if (props.rules?.length) return props.rules;
      if (!props.name) return [];
      const index = `${props.name}`.lastIndexOf('.') || -1;
      const pRuleName = `${props.name}`.slice(index + 1);
      return lodashGet(form?.rules, props.name) || lodashGet(form?.rules, pRuleName) || [];
    });

    const analysisValidateResult = async (trigger: ValidateTriggerType): Promise<AnalysisValidateResult> => {
      const result: AnalysisValidateResult = {
        successList: [],
        errorList: [],
        rules: [],
        resultList: [],
        allowSetValue: false,
      };
      result.rules =
        trigger === 'all'
          ? innerRules.value
          : innerRules.value.filter((item) => (item.trigger || 'change') === trigger);
      if (innerRules.value.length && !result.rules?.length) {
        return result;
      }
      result.allowSetValue = true;
      result.resultList = await validate(value.value, result.rules);
      result.errorList = result.resultList
        .filter((item) => item.result !== true)
        .map((item: ErrorListType) => {
          Object.keys(item).forEach((key) => {
            // @ts-ignore
            if (!item.message && errorMessages.value[key]) {
              const name = isString(props.label) ? props.label : props.name;
              // @ts-ignore
              item.message = template(errorMessages.value[key], {
                name,
                // @ts-ignore
                validate: item[key],
              });
            }
          });
          return item;
        });
      // 仅有自定义校验方法才会存在 successList
      result.successList = result.resultList.filter(
        (item) => item.result === true && item.message && item.type === 'success',
      ) as SuccessListType[];

      return result;
    };
    const validateHandler = async <T extends Data = Data>(
      trigger: ValidateTriggerType,
      showErrorMessage?: boolean,
    ): Promise<FormItemValidateResult<T>> => {
      resetValidating.value = true;
      // undefined | boolean
      freeShowErrorMessage.value = showErrorMessage;
      const {
        successList: innerSuccessList,
        errorList: innerErrorList,
        rules,
        resultList,
        allowSetValue,
      } = await analysisValidateResult(trigger);

      if (allowSetValue) {
        successList.value = innerSuccessList;
        errorList.value = innerErrorList;
      }
      // 根据校验结果设置校验状态
      if (rules.length) {
        verifyStatus.value = innerErrorList.length ? ValidateStatus.FAIL : ValidateStatus.SUCCESS;
      }
      // 重置处理
      if (needResetField.value) {
        resetHandler();
      }
      resetValidating.value = false;

      return {
        [props.name]: innerErrorList.length === 0 ? true : resultList,
      } as FormItemValidateResult<T>;
    };
    const validateOnly = async <T extends Data>(trigger: ValidateTriggerType): Promise<FormItemValidateResult<T>> => {
      const { errorList: innerErrorList, resultList } = await analysisValidateResult(trigger);

      return {
        [props.name]: innerErrorList.length === 0 ? true : resultList,
      } as FormItemValidateResult<T>;
    };

    const setValidateMessage = (validateMessage: FormItemValidateMessage[]) => {
      if (!validateMessage && !isArray(validateMessage)) return;
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
      validateOnly,
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

    watch(
      () => [props.name, JSON.stringify(props.rules)].join(','),
      () => {
        validateHandler('change');
      },
    );

    const freeShowErrorMessage = ref<boolean>(undefined);
    const showErrorMessage = computed(() => {
      if (isBoolean(freeShowErrorMessage.value)) return freeShowErrorMessage.value;
      if (isBoolean(props.showErrorMessage)) return props.showErrorMessage;
      return form?.showErrorMessage;
    });

    const classes = computed(() => [
      CLASS_NAMES.value.formItem,
      getFormItemClassName(formItemClassPrefix.value, props.name),
      {
        [CLASS_NAMES.value.formItemWithHelp]: helpNode.value,
        [CLASS_NAMES.value.formItemWithExtra]: extraNode.value,
      },
    ]);
    const helpNode = computed<VNode>(() => {
      const help = renderContent('help');
      if (help) return <div class={CLASS_NAMES.value.help}>{help}</div>;
      return null;
    });
    const extraNode = computed<VNode>(() => {
      const getExtraNode = (content: string) => (
        <div class={CLASS_NAMES.value.extra} title={content}>
          {content}
        </div>
      );
      const list = errorList.value;
      if (showErrorMessage.value && list?.[0]?.message) {
        return getExtraNode(list[0].message);
      }
      if (successList.value.length) {
        return getExtraNode(successList.value[0].message);
      }
      return null;
    });

    const tipsNode = computed<VNode>(() => {
      const tmpTips = renderContent('tips');
      if (!tmpTips) return null;
      const tmpClasses = [`${formItemClassPrefix.value}-tips`, `${classPrefix.value}-tips`, statusClass.value];
      return <div class={tmpClasses}>{tmpTips}</div>;
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
          {helpNode.value}
          {tipsNode.value}
          {extraNode.value}
        </div>
      </div>
    );
  },
});
