import type { ComponentPublicInstance, Ref } from '@td/adapter-vue';
import { unref, watch, getCurrentScope, onScopeDispose } from '@td/adapter-vue';

export const defaultWindow = typeof window !== 'undefined' ? window : undefined;
export interface ConfigurableWindow {
  window?: Window;
}
// eslint-disable-next-line no-undef
export interface MutationObserverOptions extends MutationObserverInit, ConfigurableWindow {}
export type MaybeRef<T> = T | Ref<T>;
export type VueInstance = ComponentPublicInstance;
export type MaybeElementRef<T extends MaybeElement = MaybeElement> = MaybeRef<T>;
export type MaybeElement = HTMLElement | SVGElement | VueInstance | undefined | null;
export type UnRefElementReturn<T extends MaybeElement = MaybeElement> = T extends VueInstance
  ? Exclude<MaybeElement, VueInstance>
  : T | undefined;

export type Fn = () => void;

export function unrefElement<T extends MaybeElement>(elRef: MaybeElementRef<T>): UnRefElementReturn<T> {
  const plain = unref(elRef);
  return (plain as VueInstance)?.$el ?? plain;
}
export function tryOnScopeDispose(fn: Fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}

export function useMutationObserver(
  target: MaybeElementRef,
  // eslint-disable-next-line no-undef
  callback: MutationCallback,
  options: MutationObserverOptions = {},
) {
  const { window = defaultWindow, ...mutationOptions } = options;
  let observer: MutationObserver | undefined;
  const isSupported = window && 'MutationObserver' in window;

  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = undefined;
    }
  };

  const stopWatch = watch(
    () => unrefElement(target),
    (el) => {
      cleanup();

      if (isSupported && window && el) {
        observer = new MutationObserver(callback);
        observer.observe(el, mutationOptions);
      }
    },
    { immediate: true },
  );

  const stop = () => {
    cleanup();
    stopWatch();
  };

  tryOnScopeDispose(stop);

  return {
    isSupported,
    stop,
  };
}

export type UseMutationObserverReturn = ReturnType<typeof useMutationObserver>;
