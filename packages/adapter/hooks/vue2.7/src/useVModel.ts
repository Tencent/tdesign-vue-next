import type { Ref } from '@td/adapter-vue';
import { getCurrentInstance, ref } from '@td/adapter-vue';
import { kebabCase } from 'lodash-es';

export type ChangeHandler<T, P extends any[]> = (value: T, ...args: P) => void;

export interface UseVModelParams<T> {
  value: Ref<T>;
  eventName?: string;
  propName?: string;
}

/**
 * 统一处理 value, v-model, xxx.sync
 * @doc https://v2.vuejs.org/v2/guide/components-custom-events.html#Customizing-Component-v-model
 * @param value 绑定值 v-model
 * @param defaultValue 默认值
 * @param onChange 值变化时触发的回调
 * @param propName v-model
 * @param eventName
 * @param alias
 * @returns
 */
export function useVModelVue27<T, P extends any[]>(
  value: Ref<T | undefined>,
  defaultValue: T | undefined,
  onChange: ChangeHandler<T, P> | undefined,
  propName = 'value',
  eventName = 'change',
  // 除了 value + onChange，还支持其他同含义字段和事件
  alias: UseVModelParams<T>[] = [],
): [Ref<T | undefined>, ChangeHandler<T, P>] {
  const instance = getCurrentInstance();
  const internalValue = ref<T>();
  internalValue.value = defaultValue;

  const isControlled = Object.prototype.hasOwnProperty.call(instance?.vnode?.componentOptions?.propsData, propName)
    || Object.prototype.hasOwnProperty.call(instance?.vnode?.componentOptions?.propsData, kebabCase(propName));

  // 受控模式
  if (isControlled) {
    return [
      value,
      (newValue, ...args) => {
        // input 事件为 v-model 语法糖
        instance?.emit?.('input', newValue, ...args);
        // support .sync
        instance?.emit(`update:${propName}`, newValue, ...args);
        onChange?.(newValue, ...args);
        if (eventName && eventName !== 'input') {
          instance?.emit?.(eventName, newValue, ...args);
        }
      },
    ];
  }

  // controlled, other fields, upload.files.etc.
  for (let i = 0, len = alias.length; i < len; i++) {
    const item = alias[i];
    if (
      item.propName !== undefined
      && Object.prototype.hasOwnProperty.call(instance?.vnode?.componentOptions?.propsData, item.propName)
    ) {
      return [
        item.value,
        (newValue, ...args) => {
          // .sync support
          instance?.emit?.(`update:${item.propName}`, newValue, ...args);
          onChange?.(newValue, ...args);
          if (item.eventName && item.eventName !== 'input') {
            instance?.emit?.(item.eventName, newValue, ...args);
          }
        },
      ];
    }
  }

  // 非受控模式
  return [
    internalValue,
    (newValue, ...args) => {
      internalValue.value = newValue;
      onChange?.(newValue, ...args);
      if (eventName && eventName !== 'input') {
        instance?.emit?.(eventName, newValue, ...args);
      }
    },
  ];
}

export function useVModel<T, P extends any[]>(
  value: Ref<T | undefined>,
  modelValue: Ref<T | undefined>,
  defaultValue: T | undefined,
  onChange: ChangeHandler<T, P> | undefined,
  propName = 'value',
  eventName = 'change',
  alias: UseVModelParams<T>[] = [],
): [Ref<T | undefined>, ChangeHandler<T, P>] {
  return useVModelVue27<T, P>(value, defaultValue, onChange, propName, eventName, alias);
}
