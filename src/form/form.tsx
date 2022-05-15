import {
  defineComponent,
  VNode,
  ComponentPublicInstance,
  provide,
  toRefs,
  computed,
  ref,
  reactive,
  onMounted,
} from 'vue';
import isEmpty from 'lodash/isEmpty';
import isBoolean from 'lodash/isBoolean';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';
import { FormValidateResult, TdFormProps, FormValidateParams, ValidateResultList, FormValidateMessage } from './type';
import props from './props';
import { useCLASSNAMES, FORM_CONTROL_COMPONENTS, FormInjectionKey } from './const';
import FormItem from './form-item';
import { FormResetEvent, FormSubmitEvent, ClassName } from '../common';

import { FormDisabledProvider } from './hooks';
import { usePrefixClass } from '../hooks/useConfig';
import { useContent, useTNodeJSX } from '../hooks';

export type FormItemInstance = InstanceType<typeof FormItem>;

type Result = FormValidateResult<TdFormProps['data']>;

export default defineComponent({
  name: 'TForm',

  props: { ...props },

  emits: ['validate', 'submit', 'reset', 'form-item-destroyed'],

  setup(props, { expose, slots }) {
    const { disabled } = toRefs(props);
    provide<FormDisabledProvider>('formDisabled', {
      disabled,
    });

    const formRef = ref<HTMLElement>(null);
    const children = ref<FormItemInstance[]>([]);
    provide(
      FormInjectionKey,
      reactive({
        ...toRefs(props),
        children,
        disabled,
        slots,
      }),
    );

    const COMPONENT_NAME = usePrefixClass('form');
    const CLASS_NAMES = useCLASSNAMES();
    const formClass = computed<ClassName>(() => [
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
      dom && dom.scrollIntoView({ behavior });
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
      if (props.preventSubmitDefault) {
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
    // TODO: setValidateMessage
    const setValidateMessage = (validateMessage: FormValidateMessage<FormData>) => {
      const keys = Object.keys(validateMessage);
      if (!keys.length) return;
      const list = children.value
        .filter((child) => isFunction(child.setValidateMessage) && keys.includes(child.name))
        .map((child) => child.setValidateMessage(validateMessage[child.name]));
      Promise.all(list);
    };

    expose({ validate, submit, reset, clearValidate, setValidateMessage });

    const renderContent = useTNodeJSX();

    return () => (
      <form
        ref={formRef}
        class={formClass.value}
        onSubmit={(e) => submit(e as MouseEvent)}
        onReset={(e) => reset(e as MouseEvent)}
      >
        {renderContent('default')}
      </form>
    );
  },
});
