import { ref, Ref, getCurrentInstance } from 'vue';
import kebabCase from 'lodash/kebabCase';

export type ChangeHandler<T> = (value: T, ...args: any) => void;

export default function useVModel<T, P extends (...args: any) => void>(
  value: Ref<T>,
  modelValue: Ref<T>,
  defaultValue: T,
  onChange: P,
  propName = 'value',
): [Ref<T>, ChangeHandler<T>] {
  const { emit, vnode } = getCurrentInstance();
  const internalValue: Ref<T> = ref();

  const vProps = vnode.props || {};
  const isVM = Object.prototype.hasOwnProperty.call(vProps, 'modelValue');
  const isVMP =
    Object.prototype.hasOwnProperty.call(vProps, propName) ||
    Object.prototype.hasOwnProperty.call(vProps, kebabCase(propName));

  if (isVM) {
    return [
      modelValue,
      (newValue, ...args) => {
        vProps['onUpdate:modelValue'] && emit('update:modelValue', newValue, ...args);
        onChange?.(newValue, ...args);
      },
    ];
  }

  if (isVMP) {
    return [
      value,
      (newValue, ...args) => {
        vProps[`onUpdate:${propName}`] && emit(`update:${propName}`, newValue, ...args);
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
