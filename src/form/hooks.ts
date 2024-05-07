import { Ref, inject, computed, getCurrentInstance } from 'vue';
import { TdFormProps } from './type';

export interface FormDisabledProvider {
  disabled: Ref<TdFormProps['disabled']>;
}

export interface FormReadonlyProvider {
  readonly: Ref<TdFormProps['readonly']>;
}

/**
 * 用于实现 form 的全局禁用状态hook
 * @returns
 */
export function useFormDisabled(extend?: Ref<boolean>) {
  const ctx = getCurrentInstance();
  const propsDisabled = computed(() => ctx.props.disabled as boolean);
  const { disabled } = inject<FormDisabledProvider>('formDisabled', Object.create(null));
  return computed(() => propsDisabled.value || disabled?.value || extend?.value || false);
}

export function useFormReadonly(extend?: Ref<boolean>) {
  const ctx = getCurrentInstance();
  const propsReadonly = computed(() => ctx.props.readonly as boolean);
  const { readonly } = inject<FormReadonlyProvider>('formReadonly', Object.create(null));
  return computed(() => propsReadonly.value || readonly?.value || extend?.value || false);
}
