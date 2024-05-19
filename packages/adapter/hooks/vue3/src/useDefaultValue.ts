import { getCurrentInstance, ref } from '@td/adapter-vue';
import type { Ref } from '@td/adapter-vue';
import { kebabCase } from 'lodash-es';
import type { ChangeHandler } from './useVModel';

function useDefaultValueVue3<T, P extends any[]>(
  value: Ref<T>,
  defaultValue: T,
  onChange: ChangeHandler<T, P>,
  propsName: string,
): [Ref<T>, ChangeHandler<T, P>] {
  const instance = getCurrentInstance();
  const internalValue = ref();

  const vProps = instance?.vnode.props || {};
  const isVMP
    = Object.prototype.hasOwnProperty.call(vProps, propsName)
    || Object.prototype.hasOwnProperty.call(vProps, kebabCase(propsName));

  if (isVMP) {
    return [
      value,
      (newValue, ...args) => {
        instance?.emit(`update:${propsName}`, newValue);
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

export function useDefaultValue<T, P extends any[]>(
  value: Ref<T>,
  defaultValue: T,
  onChange: ChangeHandler<T, P>,
  propsName: string,
  eventName: string = 'change',
): [Ref<T>, ChangeHandler<T, P>] {
  return useDefaultValueVue3<T, P>(value, defaultValue, onChange, propsName);
}
