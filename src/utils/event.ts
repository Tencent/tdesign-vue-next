import { ComponentPublicInstance } from 'vue';
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
  if (typeof eventName === 'string') {
    emitEventMethodName = getPropsApiByEvent(eventName);
  }
  if (typeof vm.$props[emitEventMethodName] === 'function') {
    vm.$props[emitEventMethodName](...args);
  } else {
    vm.$emit(eventName, ...args);
  }
}
