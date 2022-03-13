import { ref, Ref, getCurrentInstance } from 'vue';

export type ChangeHandler<T, P extends any[]> = (value: T, ...args: P) => void;

// 用于实现 v-model
export default function useVModel<T, P extends any[]>(
  value: Ref<T>,
  modelValue: Ref<T>,
  defaultValue: T,
  onChange: ChangeHandler<T, P>,
  // emit 和 eventName 用于支持 v-model 和 xxx.sync 语法糖
): [Ref<T>, ChangeHandler<T, P>] {
  const instance = getCurrentInstance();
  const { emit, props } = instance;
  const internalValue = ref<T>();
  internalValue.value = defaultValue;

  // 受控模式
  if (typeof value.value !== 'undefined') {
    return [value, onChange || (() => {})];
  }

  // 受控模式:modelValue
  if (typeof modelValue.value !== 'undefined') {
    return [
      modelValue,
      (newValue, ...args) => {
        emit?.(`update:modelValue`, newValue, ...args);
        onChange?.(newValue, ...args);
      },
    ];
  }

  // 非受控模式
  return [
    internalValue,
    (newValue, ...args) => {
      internalValue.value = newValue;
      onChange?.(newValue, ...args);
    },
  ];
}

// emits name
export const UPDATE_MODEL = 'update:modelValue';
