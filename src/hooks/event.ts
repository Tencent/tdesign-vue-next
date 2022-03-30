import { getCurrentInstance, onBeforeUnmount, onMounted } from 'vue';
import { getPropsApiByEvent } from '../utils/helper';

export type EmitEventName = { event: string; method: string } | string;

/**
 * 组件对外传递事件
 * @param args 事件参数
 * @returns {emitEvent}
 * @example const emitEvent = useEmitEvent();
 */
export function useEmitEvent() {
  const instance = getCurrentInstance();
  return function emitEvent<T extends any[] = any[]>(eventName: string, ...args: T) {
    let emitEventMethodName: string;
    if (typeof eventName === 'string') {
      emitEventMethodName = getPropsApiByEvent(eventName);
    }

    if (typeof instance.props[emitEventMethodName] === 'function') {
      (instance.props[emitEventMethodName] as Function)(...args);
    } else {
      instance.emit(eventName, ...args);
    }
  };
}

/**
 * 用于订阅Listener事件
 * @param updateSize
 */
export function useListener(type: string, listener: () => void): void {
  onMounted(() => {
    window.addEventListener(type, listener);
  });

  onBeforeUnmount(() => {
    window.removeEventListener(type, listener);
  });
}

export function useResize(listener: () => void, observer?: HTMLElement) {
  useListener('resize', listener);

  if (!window.ResizeObserver || !observer) return;
  const resizeObserver = new window.ResizeObserver(listener);
  resizeObserver.observe(observer);

  onBeforeUnmount(() => {
    resizeObserver.disconnect();
  });
}
