import { ref, Ref, getCurrentInstance } from 'vue';

export type ChangeHandler<T, P extends any[]> = (value: T, ...args: P) => void;

// 用于实现 v-model:propName
export default function useVModel<T, P extends any[]>(
  value: Ref<T>,
  defaultValue: T,
  onChange: ChangeHandler<T, P> | undefined,
  propName: string,
): [Ref<T>, ChangeHandler<T, P>];
// 用于实现 v-model 和 v-model:value
export default function useVModel<T, P extends any[]>(
  value: Ref<T>,
  modelValue: Ref<T>,
  defaultValue: T,
  onChange: ChangeHandler<T, P> | undefined,
): [Ref<T>, ChangeHandler<T, P>];
// 用于实现 v-model 和 v-model:propName
export default function useVModel<T, P extends any[]>(
  value: Ref<T>,
  modelValue: Ref<T>,
  defaultValue: T,
  onChange: ChangeHandler<T, P> | undefined,
  propName: string,
): [Ref<T>, ChangeHandler<T, P>];
// implement
export default function useVModel<T, P extends any[]>(
  value: Ref<T>,
  modelValueOrDefaultValue: Ref<T> | T,
  defaultValueOrOnChange: T | ChangeHandler<T, P>,
  onChangeOrPropName: ChangeHandler<T, P> | string,
  propNameArgs?: string,
  // emit 和 eventName 用于支持 v-model 和 xxx.sync 语法糖
): [Ref<T>, ChangeHandler<T, P>] {
  let modelValue: Ref<T> | undefined;
  let defaultValue: T;
  let onChange: ChangeHandler<T, P>;
  let propName: string;

  if (typeof onChangeOrPropName === 'string') {
    defaultValue = modelValueOrDefaultValue as T;
    onChange = defaultValueOrOnChange as ChangeHandler<T, P>;
    propName = onChangeOrPropName;
  } else {
    modelValue = modelValueOrDefaultValue as Ref<T>;
    defaultValue = defaultValueOrOnChange as T;
    onChange = onChangeOrPropName as ChangeHandler<T, P>;
    propName = propNameArgs;
  }

  const { emit } = getCurrentInstance();
  const internalValue = ref<T>();
  internalValue.value = defaultValue;

  // 受控模式 v-model:propName
  if (typeof value.value !== 'undefined') {
    return [
      value,
      (newValue, ...args) => {
        emit?.(`update:${propName || 'value'}`, newValue, ...args);
        onChange?.(newValue, ...args);
      },
    ];
  }

  // 受控模式:modelValue v-model
  if (typeof modelValue?.value !== 'undefined') {
    return [
      modelValue,
      (newValue, ...args) => {
        emit?.(`update:modelValue`, newValue, ...args);
        onChange?.(newValue, ...args);
      },
    ];
  }

  // 非受控模式
  return [
    internalValue,
    (newValue, ...args) => {
      internalValue.value = newValue;
      onChange?.(newValue, ...args);
    },
  ];
}

// emits name
export const UPDATE_MODEL = 'update:modelValue';
export const UPDATE_VALUE = 'update:value';
