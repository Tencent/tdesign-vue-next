import { ref, Ref, getCurrentInstance, watch } from 'vue';

export type ChangeHandler<T> = (value: T, ...args: any) => void;

export default function useVModel<T, P extends (...args: any) => void>(
  value: Ref<T>,
  modelValue: Ref<T>,
  defaultValue: T,
  onChange: P,
  propName = 'value',
  // emit 和 eventName 用于支持 v-model 和 xxx.sync 语法糖
): [Ref<T>, ChangeHandler<T>] {
  const { emit, attrs } = getCurrentInstance();
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
  watch(value, (newVal) => {
    internalValue.value = newVal;
  });
  watch(modelValue, (newVal) => {
    internalValue.value = newVal;
  });

  return [
    internalValue,
    (newValue, ...args) => {
      if (attrs[`onUpdate:${propName}`]) {
        // 受控模式 v-model:propName
        emit?.(`update:${propName}`, newValue, ...args);
      } else if (attrs['onUpdate:modelValue']) {
        // 受控模式:modelValue v-model
        emit?.(`update:modelValue`, newValue, ...args);
      }

      if (typeof value.value === 'undefined' && typeof modelValue.value === 'undefined') {
        internalValue.value = newValue;
      }

      onChange?.(newValue, ...args);
    },
  ];
}
