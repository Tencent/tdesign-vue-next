import { computed, defineComponent, provide, reactive, ref, toRefs } from 'vue';
import { isEmpty, isArray, isBoolean, isFunction } from 'lodash-es';

import { requestSubmit } from '@tdesign/shared-utils';
import { FormItemValidateResult, getFormItemClassName } from './form-item';
import {
  Data,
  FormResetParams,
  FormValidateMessage,
  FormValidateParams,
  FormValidateResult,
  TdFormProps,
  ValidateResultList,
} from './type';
import props from './props';
import { FormInjectionKey, FormItemContext, useCLASSNAMES } from './consts';
import { FormResetEvent, FormSubmitEvent } from '../common';

import { FormDisabledProvider, FormReadonlyProvider } from './hooks';
import { usePrefixClass, useTNodeJSX } from '@tdesign/hooks';

type Result = FormValidateResult<TdFormProps['data']>;

export default defineComponent({
  name: 'TForm',
  props,
  setup(props, { expose }) {
    const renderContent = useTNodeJSX();
    const { disabled, readonly } = toRefs(props);
    provide<FormDisabledProvider>('formDisabled', {
      disabled,
    });
    provide<FormReadonlyProvider>('formReadonly', {
      readonly,
    });

    const formRef = ref<HTMLFormElement>(null);
    const children = ref<FormItemContext[]>([]);

    const {
      showErrorMessage,
      labelWidth,
      labelAlign,
      data,
      colon,
      requiredMark,
      requiredMarkPosition,
      rules,
      errorMessage,
      resetType,
    } = toRefs(props);
    provide(
      FormInjectionKey,
      reactive({
        showErrorMessage,
        labelWidth,
        labelAlign,
        data,
        colon,
        requiredMark,
        requiredMarkPosition,
        rules,
        errorMessage,
        resetType,
        children,
        renderContent,
      }),
    );

    const COMPONENT_NAME = usePrefixClass('form');
    const CLASS_NAMES = useCLASSNAMES();
    const formClass = computed(() => [
      CLASS_NAMES.value.form,
      { [`${COMPONENT_NAME.value}-inline`]: props.layout === 'inline' },
    ]);

    const FORM_ITEM_CLASS_PREFIX = usePrefixClass('form-item');

    const getFirstError = (result: Result) => {
      if (isBoolean(result)) return '';
      const [firstKey] = Object.keys(result);
      if (props.scrollToFirstError) {
        const tmpClassName = getFormItemClassName(FORM_ITEM_CLASS_PREFIX.value, firstKey);
        scrollTo(tmpClassName);
      }
      const resArr = result[firstKey] as ValidateResultList;
      if (!isArray(resArr)) return '';
      return resArr.filter((item) => !item.result)[0].message;
    };
    // 校验不通过时，滚动到第一个错误表单
    const scrollTo = (selector: string) => {
      const [dom] = formRef.value.getElementsByClassName(selector);
      const behavior = props.scrollToFirstError;
      if (behavior) {
        dom && dom.scrollIntoView({ behavior });
      }
    };

    const needValidate = (name: string | number, fields: string[] | undefined) => {
      if (!fields || !isArray(fields)) return true;
      return fields.indexOf(`${name}`) !== -1;
    };
    const formatValidateResult = <T extends Data>(validateResultList: FormItemValidateResult<T>[]) => {
      const result: Record<string, any> = validateResultList.reduce((r, err) => Object.assign(r || {}, err), {});
      Object.keys(result).forEach((key) => {
        if (result[key] === true) {
          delete result[key];
        }
      });
      return isEmpty(result) ? true : result;
    };
    const validate = async (param?: FormValidateParams): Promise<Result> => {
      const { fields, trigger = 'all', showErrorMessage } = param || {};
      const list = children.value
        .filter((child) => isFunction(child.validate) && needValidate(String(child.name), fields))
        .map((child) => child.validate(trigger, showErrorMessage));
      const arr = await Promise.all(list);
      const result = formatValidateResult(arr);
      const firstError = getFirstError(result);
      props.onValidate?.({
        validateResult: result,
        firstError,
      });
      return result;
    };
    const validateOnly = async (params?: Omit<FormValidateParams, 'showErrorMessage'>) => {
      const { fields, trigger = 'all' } = params || {};
      const list = children.value
        .filter((child) => isFunction(child.validateOnly) && needValidate(String(child.name), fields))
        .map((child) => child.validateOnly(trigger));
      const arr = await Promise.all(list);
      return formatValidateResult(arr);
    };
    const submitParams = ref<Pick<FormValidateParams, 'showErrorMessage'>>();
    const onSubmit = (e?: FormSubmitEvent) => {
      if (props.preventSubmitDefault && e) {
        e.preventDefault();
        e.stopPropagation();
      }
      validate(submitParams.value).then((r) => {
        props.onSubmit?.({ validateResult: r, firstError: getFirstError(r), e });
      });
      submitParams.value = undefined;
    };
    const submit = async (params?: Pick<FormValidateParams, 'showErrorMessage'>) => {
      submitParams.value = params;
      requestSubmit(formRef.value);
    };

    const resetParams = ref<FormResetParams<Data>>();
    const onReset = (e?: FormResetEvent) => {
      if (props.preventSubmitDefault && e) {
        e.preventDefault();
        e.stopPropagation();
      }
      children.value
        .filter(
          (child) =>
            isFunction(child.resetField) && needValidate(String(child.name), resetParams.value?.fields as string[]),
        )
        .forEach((child) => child.resetField(resetParams.value?.type));
      resetParams.value = undefined;
      props.onReset?.({ e });
    };
    const reset = <FormData extends Data>(params?: FormResetParams<FormData>) => {
      (resetParams.value as any) = params;
      formRef.value.reset();
    };

    const clearValidate = (fields?: Array<string>) => {
      children.value.forEach((child) => {
        if (isFunction(child.resetHandler) && needValidate(String(child.name), fields)) {
          child.resetHandler();
        }
      });
    };
    const setValidateMessage = (validateMessage: FormValidateMessage<FormData>) => {
      const keys = Object.keys(validateMessage);
      if (!keys.length) return;
      const list = children.value
        .filter((child) => isFunction(child.setValidateMessage) && keys.includes(`${child.name}`))
        .map((child) => child.setValidateMessage(validateMessage[child.name as keyof FormData]));
      Promise.all(list);
    };

    expose({ validate, submit, reset, clearValidate, setValidateMessage, validateOnly });

    return () => (
      <form ref={formRef} class={formClass.value} onSubmit={(e) => onSubmit(e)} onReset={(e) => onReset(e)}>
        {renderContent('default')}
      </form>
    );
  },
});
