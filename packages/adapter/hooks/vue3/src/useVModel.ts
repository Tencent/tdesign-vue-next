import { getCurrentInstance, ref } from '@td/adapter-vue';
import type { Ref } from '@td/adapter-vue';
import { kebabCase } from 'lodash-es';

export type ChangeHandler<T, P extends any[]> = (value: T, ...args: P) => void;

export interface UseVModelParams<T> {
  value: Ref<T>;
  eventName?: string;
  propName?: string;
}

/**
 * 统一处理 v-model, v-model:xxx,
 * @doc https://cn.vuejs.org/guide/components/v-model.html
 * @param value 绑定值 value 或 v-model:value
 * @param modelValue 绑定值 v-model
 * @param defaultValue 默认值
 * @param onChange 值变化时触发的回调
 * @param propName 属性名 value 或 v-model:value
 * @returns
 */
function useVModelVue3<T = undefined, P extends any[] = []>(
  value: Ref<T | undefined>,
  modelValue: Ref<T | undefined>,
  defaultValue: T | undefined,
  onChange: ChangeHandler<T, P> | undefined,
  propName = 'value',
): [Ref<T | undefined>, ChangeHandler<T, P>] {
  const instance = getCurrentInstance();
  const internalValue = ref<T>();

  const vProps = instance?.vnode.props || {};
  const isVM
    = Object.prototype.hasOwnProperty.call(vProps, 'modelValue')
    || Object.prototype.hasOwnProperty.call(vProps, 'model-value');
  const isVMP
    = Object.prototype.hasOwnProperty.call(vProps, propName)
    || Object.prototype.hasOwnProperty.call(vProps, kebabCase(propName));

  if (isVM) {
    return [
      modelValue,
      (newValue, ...args) => {
        instance?.emit('update:modelValue', newValue);
        onChange?.(newValue, ...args);
      },
    ];
  }

  if (isVMP) {
    return [
      value,
      (newValue, ...args) => {
        instance?.emit(`update:${propName}`, newValue);
        onChange?.(newValue, ...args);
      },
    ];
  }

  internalValue.value = defaultValue;
  return [
    internalValue,
    (newValue, ...args) => {
      internalValue.value = newValue;
      onChange?.(newValue, ...args);
    },
  ];
}

export function useVModel<T, P extends any[] = []>(
  value: Ref<T | undefined>,
  modelValue: Ref<T | undefined>,
  defaultValue: T | undefined,
  onChange: ChangeHandler<T, P> | undefined,
  propName = 'value',
  eventName = 'change',
  alias: UseVModelParams<T>[] = [],
): [Ref<T | undefined>, ChangeHandler<T, P>] {
  return useVModelVue3<T, P>(value, modelValue, defaultValue, onChange, propName);
}
