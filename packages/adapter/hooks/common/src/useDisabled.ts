import { computed, getCurrentInstance, inject } from '@td/adapter-vue';
import type { Ref } from '@td/adapter-vue';
import { isBoolean } from 'lodash-es';
// import type { TdFormProps } from '@td/intel/form/type';

export interface FormDisabledProvider {
  // disabled: Ref<TdFormProps['disabled']>;
  disabled: Ref<any>;
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
  const componentDisabled = computed(() => currentInstance?.props?.disabled as boolean);

  const formDisabled = inject<FormDisabledProvider>('formDisabled', Object.create(null));

  return computed(() => {
    if (isBoolean(context?.beforeDisabled?.value)) {
      return context.beforeDisabled.value;
    }
    // Component
    if (isBoolean(componentDisabled.value)) {
      return componentDisabled.value;
    }
    // ComponentGroup
    if (isBoolean(context?.afterDisabled?.value)) {
      return context.afterDisabled.value;
    }
    // Form
    if (isBoolean(formDisabled.disabled?.value)) {
      return formDisabled.disabled.value;
    }

    return false;
  });
}
