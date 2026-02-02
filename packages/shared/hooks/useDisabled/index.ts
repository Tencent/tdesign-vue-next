import { Ref, inject, computed, getCurrentInstance } from 'vue';
import { isArray, isBoolean } from 'lodash-es';
// TODO: need refator
import { TdFormProps } from '../../../components/form/type';

export interface FormDisabledProvider {
  disabled: Ref<TdFormProps['disabled']>;
}

export interface DisabledContext {
  beforeDisabled?: Ref<boolean>;
  afterDisabled?: Ref<boolean>;
}

/**
 * 用于实现组件全局禁用状态的hook
 * 优先级:(beforeDisabled) > Component.disabled > ComponentGroup.disabled(afterDisabled) > Form.disabled
 * @returns
 */
export function useDisabled(context?: DisabledContext) {
  const currentInstance = getCurrentInstance();
  const componentDisabled = computed(() => currentInstance.props.disabled as boolean | [boolean, boolean]);

  const formDisabled = inject<FormDisabledProvider>('formDisabled', Object.create(null));

  return computed(() => {
    if (isArray(componentDisabled.value) && componentDisabled.value.length === 2) return componentDisabled.value;

    if (isBoolean(context?.beforeDisabled?.value)) return context.beforeDisabled.value;
    // Component
    if (isBoolean(componentDisabled.value)) return componentDisabled.value;
    // ComponentGroup
    if (isBoolean(context?.afterDisabled?.value)) return context.afterDisabled.value;
    // Form
    if (isBoolean(formDisabled.disabled?.value)) return formDisabled.disabled.value;

    return false;
  });
}
