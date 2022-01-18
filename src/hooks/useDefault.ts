import { computed, ref, SetupContext, watchEffect, WritableComputedRef } from 'vue';
import camelCase from 'lodash/camelCase';

function getDefaultName(key: string): string {
  const str = camelCase(key);
  return `default${str[0].toLocaleUpperCase() + str.slice(1)}`;
}

// eventName is keybase, change -> onChange; visible-change -> onVisibleChange
function getEventPropsName(eventName: string): string {
  const str = camelCase(eventName);
  return `on${str[0].toLocaleUpperCase()}${str.slice(1)}`;
}

/**
 * 受控和非受控逻辑处理，包含 value / modelValue / events
 * @param props 属性
 * @param context 上下文
 * @param key 受控属性名称
 * @param eventName 事件名称
 * @example const [value, setValue] = useDefault();
 * @returns [value, setValue]
 */
export default function useDefault<V, T>(props: T, emit: SetupContext['emit'], key: string, eventName: string) {
  const modelValue = 'modelValue';
  const defaultName = getDefaultName(String(key));

  const isUsedModelValue = props[modelValue] !== undefined;
  const isUsedKey = props[key] !== undefined;

  const innerValue = ref<V>();

  if (isUsedKey) {
    innerValue.value = props[key];
  } else if (isUsedModelValue) {
    innerValue.value = props[modelValue];
  } else {
    innerValue.value = props[defaultName];
  }

  watchEffect(() => {
    if (isUsedModelValue) {
      innerValue.value = props[modelValue];
    }
    if (isUsedKey) {
      innerValue.value = props[key];
    }
  });

  function emitEvents<T extends Array<any>>(value: V, ...arg: T) {
    const updateKeys = [`update:${key}`];
    if (isUsedModelValue) {
      updateKeys.push(`update:modelValue`);
    }
    // Props Event exists in Vue3. `props.onChange()` is equal `contex.emit('change')`
    updateKeys.forEach((updateKey) => {
      emit(updateKey, value, ...arg);
    });
    const propsEventName = getEventPropsName(eventName);
    props[propsEventName]?.(value, ...arg);
  }

  function setInnerValue<M extends Array<any>>(value: V, ...arg: M) {
    if (!isUsedKey && !isUsedModelValue) {
      innerValue.value = value;
    }
    emitEvents<M>(value, ...arg);
  }

  const innerValueRef = computed({
    get() {
      return innerValue.value;
    },
    set(value: V) {
      if (!isUsedKey && !isUsedModelValue) {
        innerValue.value = value;
      }
      emitEvents(value);
    },
  });

  return [innerValueRef, setInnerValue] as [WritableComputedRef<V>, typeof setInnerValue];
}
