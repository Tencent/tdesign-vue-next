import { Ref, inject, computed, getCurrentInstance } from 'vue';
import { TdFormProps } from '../type';

export interface FormDisabledProvider {
  disabled: Ref<TdFormProps['disabled']>;
}

export interface FormReadonlyProvider {
  readonly: Ref<TdFormProps['readonly']>;
}

/**
 * @deprecated use @tdesign/shared-hooks useDisabled instead
 */
export function useFormDisabled(extend?: Ref<boolean>) {
  const ctx = getCurrentInstance();
  const propsDisabled = computed(() => ctx.props.disabled as boolean);
  const { disabled } = inject<FormDisabledProvider>('formDisabled', Object.create(null));
  return computed(() => propsDisabled.value || disabled?.value || extend?.value || false);
}
