import { ref, Ref, getCurrentInstance, unref } from 'vue';
import { kebabCase } from 'lodash-es';

export type ChangeHandler<T, P extends any[]> = (value: T, ...args: P) => void;
export type ChangeHandlerSource<T, P extends any[]> =
  | ChangeHandler<T, P>
  | Readonly<Ref<ChangeHandler<T, P> | undefined>>
  | undefined;

export function useVModel<T, P extends any[]>(
  value: Ref<T>,
  modelValue: Ref<T>,
  defaultValue: T,
  onChange: ChangeHandlerSource<T, P>,
  propName = 'value',
): [Ref<T>, ChangeHandler<T, P>] {
  const { emit, vnode } = getCurrentInstance();
  const internalValue: Ref<T> = ref();
  const triggerChange: ChangeHandler<T, P> = (newValue, ...args) => {
    unref(onChange)?.(newValue, ...args);
  };

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
        triggerChange(newValue, ...args);
      },
    ];
  }

  if (isVMP) {
    return [
      value,
      (newValue, ...args) => {
        emit(`update:${propName}`, newValue);
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
