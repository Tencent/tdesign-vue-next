import { computed, defineComponent, provide, reactive, ref, shallowRef, toRefs } from 'vue';
import { isEmpty, isArray, isBoolean, isFunction } from 'lodash-es';

import { requestSubmit } from '@tdesign/shared-utils';
import { FormItemValidateResult } from './form-item';
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
import { FormInjectionKey, FormItemContext, useCLASSNAMES } from './constants';
import { FormResetEvent, FormSubmitEvent } from '../common';
import { getFormItemClassName } from './utils';
import { FormDisabledProvider, FormReadonlyProvider } from './hooks';
import { usePrefixClass, useTNodeJSX } from '@tdesign/shared-hooks';

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

    const COMPONENT_NAME = usePrefixClass('form');
    // 仅在 refreshLastFormItem 内读取，故无需响应式
    const formItemElements: HTMLElement[] = [];
    const lastFormItemElements = shallowRef<Set<HTMLElement>>(new Set());

    // 标记每个父容器内文档顺序最靠后的表单项，样式层据此去掉末项的 margin
    const refreshLastFormItem = () => {
      const formItemSelector = `.${COMPONENT_NAME.value}__item`;
      const next = new Set<HTMLElement>();

      if (props.layout !== 'inline') {
        const groups = new Map<HTMLElement, HTMLElement[]>();
        formItemElements.forEach((el) => {
          const { parentElement } = el;
          if (!parentElement) return;
          // 嵌套在其它表单项内部的子项不参与末位判定
          if (parentElement.closest(formItemSelector)) return;

          const siblings = groups.get(parentElement);
          if (siblings) siblings.push(el);
          else groups.set(parentElement, [el]);
        });
        groups.forEach((siblings) => {
          siblings.sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
          next.add(siblings[siblings.length - 1]);
        });
      }

      lastFormItemElements.value = next;
    };

    const registerFormItem = (node: HTMLElement) => {
      formItemElements.push(node);
      refreshLastFormItem();

      return () => {
        const index = formItemElements.indexOf(node);
        if (index > -1) formItemElements.splice(index, 1);
        refreshLastFormItem();
      };
    };

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
        lastFormItemElements,
        registerFormItem,
      }),
    );

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
      // @ts-ignore TODO
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
      <form
        id={props.id}
        ref={formRef}
        class={formClass.value}
        onSubmit={(e) => onSubmit(e)}
        onReset={(e) => onReset(e)}
      >
        {renderContent('default')}
      </form>
    );
  },
});
