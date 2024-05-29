import type { Ref } from '@td/adapter-vue';
import { computed, getCurrentInstance, inject } from '@td/adapter-vue';
import type { TdFormProps } from '@td/intel/form/type';

export interface FormDisabledProvider {
  disabled: Ref<TdFormProps['disabled']>;
}

export interface FormReadonlyProvider {
  readonly: Ref<TdFormProps['readonly']>;
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

/**
 * 创建一个计算属性，用于判断表单是否应为只读状态。
 * 此函数考虑了多个来源来决定表单的只读状态：
 * 1. 组件的 `readonly` 属性；
 * 2. 通过 `formReadonly` 命名空间注入的只读状态；
 * 3. 可选的 `extend` 参数，用于进一步扩展只读状态的判断逻辑。
 *
 * @param extend - 一个可选的 Ref<boolean>，用于扩展判断表单是否只读的逻辑。如果提供，它的值将被考虑在内。
 * @returns 返回一个计算属性，该属性根据上述条件决定其值，最终确定表单是否应处于只读状态。
 */
export function useFormReadonly(extend?: Ref<boolean>) {
  // 获取当前实例
  const ctx = getCurrentInstance();
  // 计算属性，用于获取组件的 `readonly` 属性值
  const propsReadonly = computed(() => ctx.props.readonly as boolean);
  // 从 `formReadonly` 命名空间注入的只读状态
  const { readonly } = inject<FormReadonlyProvider>('formReadonly', Object.create(null));
  // 计算最终的只读状态，优先级从高到低为：组件的 `readonly` 属性、注入的 `readonly` 状态、`extend` 参数的值，最后是默认的 `false`
  return computed(() => propsReadonly.value || readonly?.value || extend?.value || false);
}
