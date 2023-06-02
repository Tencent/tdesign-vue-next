import { ref, Ref, getCurrentInstance } from 'vue';
import kebabCase from 'lodash/kebabCase';

export type ChangeHandler<T, P extends any[]> = (value: T, ...args: P) => void;

export default function useVModel<T, P extends any[]>(
  value: Ref<T>,
  modelValue: Ref<T>,
  defaultValue: T,
  onChange: ChangeHandler<T, P>,
  propName = 'value',
): [Ref<T>, ChangeHandler<T, P>] {
  const { emit, vnode } = getCurrentInstance();
  const internalValue: Ref<T> = ref();

  const vProps = vnode.props || {};
  const isVM =
    Object.prototype.hasOwnProperty.call(vProps, 'modelValue') ||
    Object.prototype.hasOwnProperty.call(vProps, 'model-value');
  const isVMP =
    Object.prototype.hasOwnProperty.call(vProps, propName) ||
    Object.prototype.hasOwnProperty.call(vProps, kebabCase(propName));

  if (isVM) {
    return [
      modelValue,
      (newValue, ...args) => {
        emit('update:modelValue', newValue);
        onChange?.(newValue, ...args);
      },
    ];
  }

  if (isVMP) {
    return [
      value,
      (newValue, ...args) => {
        emit(`update:${propName}`, newValue);
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
