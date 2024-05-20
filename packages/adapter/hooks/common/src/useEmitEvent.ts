import { getCurrentInstance } from '@td/adapter-vue';
import { camelCase, isFunction } from 'lodash-es';

// import { getPropsApiByEvent } from './helper';
export type EmitEventName = { event: string; method: string } | string; // ! 这种是什么意思呢？

// keyboard-event => onKeyboardEvent
export function getPropsApiByEvent(eventName: string) {
  return camelCase(`on-${eventName}`);
}

/**
 * 组件对外传递事件
 * @returns
 */
export function useEmitEvent() {
  const instance = getCurrentInstance();

  const emitEvent = <T extends any[]>(eventName: string, ...args: T) => {
    const emitEventMethodName = getPropsApiByEvent(eventName);

    const fn = instance?.props[emitEventMethodName];
    if (isFunction(fn)) {
      fn(...args);
    } else {
      instance?.emit(eventName, ...args);
    }
  };

  return emitEvent;
}
