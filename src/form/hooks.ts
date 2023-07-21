import { Ref, inject, computed, getCurrentInstance, ref } from 'vue';
import isBoolean from 'lodash/isBoolean';
import { TdFormProps } from './type';

export interface FormDisabledProvider {
  disabled: Ref<TdFormProps['disabled']>;
}

/**
 * 用于实现 form 的全局禁用状态hook
 * @returns
 */
export function useFormDisabled(extend?: Ref<boolean>) {
  const ctx = getCurrentInstance();
  const propsDisabled = computed(() => ctx.props.disabled as boolean);
  const { disabled } = inject<FormDisabledProvider>('formDisabled', Object.create(null));
  return computed(() => {
    if (isBoolean(extend?.value)) return extend.value;

    if (isBoolean(propsDisabled.value)) return propsDisabled.value;

    if (isBoolean(disabled?.value)) return disabled.value;

    return false;
  });
}
