import { defineComponent, provide, toRefs, computed, ref, reactive } from 'vue';
import isEmpty from 'lodash/isEmpty';
import isBoolean from 'lodash/isBoolean';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';
import {
  FormValidateResult,
  TdFormProps,
  FormValidateParams,
  ValidateResultList,
  FormValidateMessage,
  FormResetParams,
} from './type';
import props from './props';
import { useCLASSNAMES, FormInjectionKey, FormItemContext } from './const';
import { FormResetEvent, FormSubmitEvent } from '../common';

import { FormDisabledProvider } from './hooks';
import { useTNodeJSX, usePrefixClass } from '../hooks';

type Result = FormValidateResult<TdFormProps['data']>;

export default defineComponent({
  name: 'TForm',

  props: { ...props },

  setup(props, { expose }) {
    const renderContent = useTNodeJSX();
    const { disabled } = toRefs(props);
    provide<FormDisabledProvider>('formDisabled', {
      disabled,
    });

    const formRef = ref<HTMLFormElement>(null);
    const children = ref<FormItemContext[]>([]);

    const { showErrorMessage, labelWidth, labelAlign, data, colon, requiredMark, rules, errorMessage, resetType } =
      toRefs(props);
    provide(
      FormInjectionKey,
      reactive({
        showErrorMessage,
        labelWidth,
        labelAlign,
        data,
        colon,
        requiredMark,
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

    const FORM_ITEM_CLASS_PREFIX = usePrefixClass('form-item__');

    const getFirstError = (result: Result) => {
      if (isBoolean(result)) return '';
      const [firstKey] = Object.keys(result);
      if (props.scrollToFirstError) {
        scrollTo(`.${FORM_ITEM_CLASS_PREFIX.value + firstKey}`);
      }
      const resArr = result[firstKey] as ValidateResultList;
      if (!isArray(resArr)) return '';
      return resArr.filter((item) => !item.result)[0].message;
    };
    // 校验不通过时，滚动到第一个错误表单
    const scrollTo = (selector: string) => {
      const dom = formRef.value?.querySelector(selector);
      const behavior = props.scrollToFirstError;
      if (behavior) {
        dom && dom.scrollIntoView({ behavior });
      }
    };

    const needValidate = (name: string, fields: string[] | undefined) => {
      if (!fields || !Array.isArray(fields)) return true;
      return fields.indexOf(name) !== -1;
    };
    const validate = async (param?: FormValidateParams): Promise<Result> => {
      const { fields, trigger = 'all' } = param || {};
      const list = children.value
        .filter((child) => isFunction(child.validate) && needValidate(child.name, fields))
        .map((child) => child.validate(trigger));
      const arr = await Promise.all(list);
      const r = arr.reduce((r, err) => Object.assign(r || {}, err), {});
      Object.keys(r).forEach((key) => {
        if (r[key] === true) {
          delete r[key];
        }
      });
      const result = isEmpty(r) ? true : r;
      props.onValidate?.({
        validateResult: result,
        firstError: getFirstError(result),
      });
      return result;
    };
    const submit = (e?: FormSubmitEvent) => {
      if (props.preventSubmitDefault && e) {
        e?.preventDefault();
        e?.stopPropagation();
      }
      validate().then((r) => {
        props.onSubmit?.({ validateResult: r, firstError: getFirstError(r), e });
      });
    };
    const reset = (e?: FormResetEvent) => {
      if (props.preventSubmitDefault) {
        e?.preventDefault();
        e?.stopPropagation();
      }
      children.value.filter((child: any) => isFunction(child.resetField)).forEach((child: any) => child.resetField());
      props.onReset({ e });
    };
    const clearValidate = (fields?: Array<string>) => {
      children.value.forEach((child) => {
        if (isFunction(child.resetHandler) && needValidate(child.name, fields)) {
          child.resetHandler();
        }
      });
    };
    const setValidateMessage = (validateMessage: FormValidateMessage<FormData>) => {
      const keys = Object.keys(validateMessage);
      if (!keys.length) return;
      const list = children.value
        .filter((child) => isFunction(child.setValidateMessage) && keys.includes(child.name))
        .map((child) => child.setValidateMessage(validateMessage[child.name]));
      Promise.all(list);
    };

    expose({ validate, submit, reset, clearValidate, setValidateMessage });

    return () => (
      <form ref={formRef} class={formClass.value} onSubmit={(e) => submit(e)} onReset={(e) => reset(e)}>
        {renderContent('default')}
      </form>
    );
  },
});
