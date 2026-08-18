import { ref, Ref, getCurrentInstance, unref } from 'vue';
import { kebabCase } from 'lodash-es';
import { ChangeHandler, ChangeHandlerSource } from '../useVModel';

export function useDefaultValue<T, P extends any[]>(
  value: Ref<T>,
  defaultValue: T,
  onChange: ChangeHandlerSource<T, P>,
  propsName: string,
): [Ref<T>, ChangeHandler<T, P>] {
  const { emit, vnode } = getCurrentInstance();
  const internalValue: Ref<T> = ref();
  const triggerChange: ChangeHandler<T, P> = (newValue, ...args) => {
    unref(onChange)?.(newValue, ...args);
  };

  const vProps = vnode.props || {};
  const isVMP =
    Object.prototype.hasOwnProperty.call(vProps, propsName) ||
    Object.prototype.hasOwnProperty.call(vProps, kebabCase(propsName));

  if (isVMP) {
    return [
      value,
      (newValue, ...args) => {
        emit(`update:${propsName}`, newValue);
        triggerChange(newValue, ...args);
      },
    ];
  }

  internalValue.value = defaultValue;
  return [
    internalValue,
    (newValue, ...args) => {
      internalValue.value = newValue;
      triggerChange(newValue, ...args);
    },
  ];
}
