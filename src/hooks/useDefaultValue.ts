import { ref, Ref, getCurrentInstance, watch } from 'vue';
import { ChangeHandler } from './useVModel';

// 用于实现 v-model:propsName
export default function useDefaultValue<T, P extends any[]>(
  value: Ref<T>,
  defaultValue: T,
  onChange: ChangeHandler<T, P>,
  propsName: string,
): [Ref<T>, ChangeHandler<T, P>] {
  const { emit } = getCurrentInstance();
  const internalValue = ref();
  internalValue.value = defaultValue;

  if (typeof value.value !== 'undefined') {
    // 受控模式 v-model:propName
    internalValue.value = value.value;
  }

  // 监听value与modelValue的变化
  watch(
    () => value.value,
    (newVal) => {
      internalValue.value = newVal;
    },
  );

  // 非受控模式
  return [
    internalValue,
    (newValue, ...args) => {
      if (typeof value.value !== 'undefined') {
        emit?.(`update:${propsName}`, newValue, ...args);
        onChange?.(newValue, ...args);
      } else {
        internalValue.value = newValue;
        onChange?.(newValue, ...args);
      }
    },
  ];
}
