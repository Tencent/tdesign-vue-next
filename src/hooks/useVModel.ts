import { ref, Ref, SetupContext } from 'vue';

export type ChangeHandler<T, P extends any[]> = (value: T, ...args: P) => void;

export default function useVModel<T, P extends any[]>(
  value: Ref<T>,
  modelValue: Ref<T>,
  defaultValue: T,
  onChange: ChangeHandler<T, P>,
  // emit 和 eventName 用于支持 v-model 和 xxx.sync 语法糖
  emit?: SetupContext['emit'],
  propsName?: string,
): [Ref<T>, ChangeHandler<T, P>] {
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
      },
    ];
  }

  // 非受控模式
  return [
    internalValue,
    (newValue, ...args) => {
      internalValue.value = newValue;
      onChange?.(newValue, ...args);
      emit?.(`update:${propsName}`, newValue);
      emit?.(`update:modelValue`, newValue);
    },
  ];
}
