import { ComponentPublicInstance } from 'vue';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';

import { getPropsApiByEvent } from './helper';
export type EmitEventName = { event: string; method: string } | string;

/**
 * 组件对外传递事件
 * @param vm 组件实例
 * @param eventName 事件名(注意使用中划线)
 * @param args 事件参数
 * @example emitEvent<[SearchEvent]>(this, 'search', {query: ''});
 * @example emitEvent<[TransferValue[], TargetParams]>(this, 'change', newTargetValue, params);
 * @example emitEvent<[SearchEvent[], TargetParams]>(this, { event: 'search', method: 'onChange' }, {query: ''});
 */
export function emitEvent<T extends any[]>(vm: ComponentPublicInstance, eventName: string, ...args: T) {
  let emitEventMethodName: string;
  if (isString(eventName)) {
    emitEventMethodName = getPropsApiByEvent(eventName);
  }
  if (isFunction(vm.$props[emitEventMethodName])) {
    vm.$props[emitEventMethodName](...args);
  } else {
    vm.$emit(eventName, ...args);
  }
}
