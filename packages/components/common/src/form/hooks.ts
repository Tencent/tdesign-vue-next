import type { Ref } from '@td/adapter-vue';
import { computed, getCurrentInstance, inject } from '@td/adapter-vue';
import type { TdFormProps } from '@td/intel/form/type';

export interface FormDisabledProvider {
  disabled: Ref<TdFormProps['disabled']>;
}

/**
 * @deprecated use src/hooks/useDisabled instead
 */
export function useFormDisabled(extend?: Ref<boolean>) {
  const ctx = getCurrentInstance();
  const propsDisabled = computed(() => ctx.props.disabled as boolean);
  const { disabled } = inject<FormDisabledProvider>('formDisabled', Object.create(null));
  return computed(() => propsDisabled.value || disabled?.value || extend?.value || false);
}
