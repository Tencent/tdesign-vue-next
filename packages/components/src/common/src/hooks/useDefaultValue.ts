import { ref, Ref, getCurrentInstance } from 'vue';
import kebabCase from 'lodash/kebabCase';
import { ChangeHandler } from './useVModel';

export default function useDefaultValue<T, P extends any[]>(
  value: Ref<T>,
  defaultValue: T,
  onChange: ChangeHandler<T, P>,
  propsName: string,
): [Ref<T>, ChangeHandler<T, P>] {
  const { emit, vnode } = getCurrentInstance();
  const internalValue: Ref<T> = ref();

  const vProps = vnode.props || {};
  const isVMP =
    Object.prototype.hasOwnProperty.call(vProps, propsName) ||
    Object.prototype.hasOwnProperty.call(vProps, kebabCase(propsName));

  if (isVMP) {
    return [
      value,
      (newValue, ...args) => {
        emit(`update:${propsName}`, newValue);
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
