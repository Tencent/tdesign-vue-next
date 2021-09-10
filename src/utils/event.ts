import { ComponentPublicInstance } from 'vue';
import { getPropsApiByEvent } from './helper';

export type EmitEventName = {
  event: string;
  method: string;
} | string;

/**
 * 组件对外传递事件
 * @param vm 组件实例
 * @param eventName 事件名(注意使用中划线)
 * @param args 事件参数
 * @example emitEvent<[SearchEvent]>(this, 'search', {query: ''});
 * @example emitEvent<[TransferValue[], TargetParams]>(this, 'change', newTargetValue, params);
 * @example emitEvent<[SearchEvent[], TargetParams]>(this, { event: 'search', method: 'onChange' }, {query: ''});
 */
export function emitEvent<T extends any[]>(vm: ComponentPublicInstance, eventName: EmitEventName, ...args: T) {
  let emitEventName: string;
  let emitEventMethodName: string;
  if (typeof eventName === 'string') {
    emitEventName = eventName;
    emitEventMethodName = getPropsApiByEvent(eventName);
  } else {
    emitEventName = eventName.event;
    emitEventMethodName = eventName.method;
  }
  vm.$emit(emitEventName, ...args);
  if (typeof vm.$props[emitEventMethodName] === 'function') {
    vm.$props[emitEventMethodName](...args);
  }
}
