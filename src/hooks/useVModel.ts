import { ref, Ref, getCurrentInstance, watch } from 'vue';

export type ChangeHandler<T, P extends any[]> = (value: T, ...args: P) => void;

export default function useVModel<T, P extends any[]>(
  value: Ref<T>,
  modelValue: Ref<T>,
  defaultValue: T,
  onChange: ChangeHandler<T, P>,
  propName = 'value',
  // emit 和 eventName 用于支持 v-model 和 xxx.sync 语法糖
): [Ref<T>, ChangeHandler<T, P>] {
  const { emit } = getCurrentInstance();
  const internalValue: Ref<T> = ref();

  // 非受控模式,defaultValue 只消费一次
  internalValue.value = defaultValue;

  if (typeof value.value !== 'undefined') {
    // 受控模式 v-model:propName
    internalValue.value = value.value;
  } else if (typeof modelValue.value !== 'undefined') {
    // 受控模式:modelValue v-model
    internalValue.value = modelValue.value;
  }

  // 监听value与modelValue的变化
  watch(
    () => value.value,
    (newVal) => {
      internalValue.value = newVal;
    },
  );
  watch(
    () => modelValue.value,
    (newVal) => {
      internalValue.value = newVal;
    },
  );

  return [
    internalValue,
    (newValue, ...args) => {
      // 受控模式 v-model:propName
      if (typeof value.value !== 'undefined') {
        emit?.(`update:${propName}`, newValue, ...args);
        onChange?.(newValue, ...args);
      } else if (typeof modelValue.value !== 'undefined') {
        // 受控模式:modelValue v-model
        emit?.(`update:modelValue`, newValue, ...args);
        onChange?.(newValue, ...args);
      } else {
        internalValue.value = newValue;
        onChange?.(newValue, ...args);
      }
    },
  ];
}
