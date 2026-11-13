import { ref, Ref, getCurrentInstance, unref, watch, isRef } from 'vue';
import { kebabCase } from 'lodash-es';

export type ChangeHandler<T, P extends any[]> = (value: T, ...args: P) => void;
export type ChangeHandlerSource<T, P extends any[]> =
  | ChangeHandler<T, P>
  | Readonly<Ref<ChangeHandler<T, P> | undefined>>
  | undefined;

export function useVModel<T, P extends any[]>(
  value: Ref<T>,
  modelValue: Ref<T>,
  defaultValue: T | Ref<T>,
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

  internalValue.value = unref(defaultValue);
  // 非受控模式下 defaultValue 仍可能变化（例如异步数据回填），
  // 此时内部值需要跟随，否则组件会一直停留在首次渲染的默认值上。
  if (isRef(defaultValue)) {
    watch(defaultValue, (next) => {
      internalValue.value = next;
    });
  }
  return [
    internalValue,
    (newValue, ...args) => {
      internalValue.value = newValue;
      triggerChange(newValue, ...args);
    },
  ];
}
