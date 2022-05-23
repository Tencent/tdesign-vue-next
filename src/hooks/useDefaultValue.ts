import { ref, Ref, getCurrentInstance, watch } from 'vue';
import { ChangeHandler } from './useVModel';

// 用于实现 v-model:propsName
export default function useDefaultValue<T, P extends (...args: any) => void>(
  value: Ref<T>,
  defaultValue: T,
  onChange: P,
  propsName: string,
): [Ref<T>, ChangeHandler<T>] {
  const { emit, attrs } = getCurrentInstance();
  const internalValue = ref();
  internalValue.value = defaultValue;

  if (typeof value.value !== 'undefined') {
    // 受控模式 v-model:propName
    internalValue.value = value.value;
  }

  // 监听value变化
  watch(value, (newVal) => {
    internalValue.value = newVal;
  });

  // 非受控模式
  return [
    internalValue,
    (newValue, ...args) => {
      if (attrs[`onUpdate:${propsName}`]) {
        // 受控模式 v-model:propName
        emit?.(`update:${propsName}`, newValue, ...args);
      }

      if (typeof value.value === 'undefined') {
        internalValue.value = newValue;
      }

      onChange?.(newValue, ...args);
    },
  ];
}
