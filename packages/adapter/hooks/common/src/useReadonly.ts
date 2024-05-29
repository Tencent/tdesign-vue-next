import type { Ref } from '@td/adapter-vue';
import { computed, getCurrentInstance, inject } from '@td/adapter-vue';
import { isBoolean } from 'lodash-es';

// vue23:!!!!!!! 这个会使用 tdesign 的
import type { TdFormProps } from '@td/components/form/type';

export interface FormReadonlyProvider {
  readonly: Ref<TdFormProps['readonly']>;
}

export interface ReadonlyContext {
  beforeReadonly?: Ref<boolean>;
  afterReadonly?: Ref<boolean>;
}

/**
 * 用于实现组件全局只读状态的hook
 * 优先级:(beforeReadonly) > Component.readonly > ComponentGroup.readonly(afterReadonly) > Form.readonly
 * @returns
 */
export function useReadonly(context?: ReadonlyContext) {
  const currentInstance = getCurrentInstance();
  const componentReadonly = computed(() => currentInstance.props.readonly as boolean);

  const formReadonly = inject<FormReadonlyProvider>('formReadonly', Object.create(null));

  return computed(() => {
    if (isBoolean(context?.beforeReadonly?.value)) {
      return context.beforeReadonly.value;
    }
    // Component
    if (isBoolean(componentReadonly?.value)) {
      return componentReadonly.value;
    }
    // ComponentGroup
    if (isBoolean(context?.afterReadonly?.value)) {
      return context.afterReadonly.value;
    }
    // Form
    if (isBoolean(formReadonly.readonly?.value)) {
      return formReadonly.readonly.value;
    }

    return false;
  });
}
