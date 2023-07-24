import { Ref, inject, computed, getCurrentInstance } from 'vue';
import isBoolean from 'lodash/isBoolean';
import { TdFormProps } from '../form/type';

export interface FormDisabledProvider {
  disabled: Ref<TdFormProps['disabled']>;
}

export interface DisabledContext {
  //ComponentGroup
  groupDisabled?: Ref<boolean>;
}

/**
 * 用于实现组件的全局禁用状态hook
 * @returns
 */
export function useDisabled(context?: DisabledContext) {
  const currentInstance = getCurrentInstance();
  const componentDisabled = computed(() => currentInstance.props.disabled as boolean);

  const { disabled } = inject<FormDisabledProvider>('formDisabled', Object.create(null));
  //Priority: Component.disabled > ComponentGroup.disabled > Form.disabled
  return computed(() => {
    // Component
    if (isBoolean(componentDisabled.value)) return componentDisabled.value;
    // ComponentGroup
    if (isBoolean(context?.groupDisabled?.value)) return context.groupDisabled.value;
    // Form
    if (isBoolean(disabled?.value)) return disabled.value;

    return false;
  });
}
