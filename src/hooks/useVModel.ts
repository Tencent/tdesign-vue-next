import { ref, Ref, getCurrentInstance } from 'vue';

export type ChangeHandler<T, P extends any[]> = (value: T, ...args: P) => void;

export default function useVModel<T, P extends any[]>(
  value: Ref<T>,
  modelValue: Ref<T>,
  defaultValue: T,
  onChange: ChangeHandler<T, P>,
  propName = 'value',
  // emit 和 eventName 用于支持 v-model 和 xxx.sync 语法糖
): [Ref<T>, ChangeHandler<T, P>] {
  const { emit, attrs } = getCurrentInstance();
  const internalValue = ref<T>();
  internalValue.value = defaultValue;

  // 受控模式 v-model:propName
  if (typeof value.value !== 'undefined') {
    return [
      value,
      (newValue, ...args) => {
        emit?.(`update:${propName}`, newValue, ...args);
        onChange?.(newValue, ...args);
      },
    ];
  }

  // 受控模式:modelValue v-model
  if (typeof attrs['onUpdate:modelValue'] !== 'undefined') {
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
export const UPDATE_VALUE = 'update:value';
