import type { Ref } from '@td/adapter-vue';
import { getCurrentInstance, ref } from '@td/adapter-vue';

type ChangeHandler<T, P extends any[]> = (value: T, ...args: P) => void;

export function useDefaultValue<T, P extends any[]>(
  value: Ref<T>,
  defaultValue: T,
  onChange: ChangeHandler<T, P>,
  // emit 和 propsName 用于支持 .sync 语法糖。而 eventName 用于支持 @change 类型的事件
  propsName: string,
  eventName: string,
): [Ref<T>, ChangeHandler<T, P>] {
  const instance = getCurrentInstance();

  const internalValue = ref();
  internalValue.value = defaultValue;

  // 受控模式
  if (Object.prototype.hasOwnProperty.call(instance?.vnode?.componentOptions?.propsData, propsName)) {
    return [
      value,
      (newValue, ...args) => {
        instance?.emit(`update:${propsName}`, newValue, ...args);
        onChange?.(newValue, ...args);
        instance?.emit(eventName, newValue, ...args);
      },
    ];
  }

  // 非受控模式
  return [
    internalValue,
    (newValue, ...args) => {
      internalValue.value = newValue;
      instance?.emit(eventName, newValue, ...args);
      onChange?.(newValue, ...args);
    },
  ];
}
