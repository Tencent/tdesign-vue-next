import { isRef, ref } from 'vue';
import { hyphenate, isObject, isString } from '@vue/shared';
import type { Directive, DirectiveBinding, UnwrapRef } from 'vue';
import { TdLoadingProps, LoadingInstance, LoadingMethod } from './type';

import produceLoading from './plugin';

const INSTANCE_KEY = Symbol('TdLoading');

const createInstance = (el: HTMLElement, binding: DirectiveBinding) => {
  const { fullscreen, inheritColor } = binding.modifiers;
  const options: TdLoadingProps = {
    attach: () => el,
    fullscreen: fullscreen ?? false,
    inheritColor: inheritColor ?? false,
    loading: binding.value,
  };

  el[INSTANCE_KEY] = {
    options,
    instance: produceLoading(options),
  };
};

const updateOptions = (newOptions: TdLoadingProps, originalOptions: TdLoadingProps) => {
  for (const key of Object.keys(originalOptions)) {
    if (isRef(originalOptions[key])) originalOptions[key].value = newOptions[key];
  }
};

export const vLoading: Directive = {
  mounted(el, binding) {
    if (binding.value) {
      createInstance(el, binding);
    }
  },
  updated(el, binding) {
    const instance = el[INSTANCE_KEY];
    if (binding.oldValue !== binding.value) {
      if (binding.value && !binding.oldValue) {
        createInstance(el, binding);
      } else if (binding.value && binding.oldValue) {
        if (isObject(binding.value)) updateOptions(binding.value, instance!.options);
      } else {
        instance?.instance.close();
      }
    }
  },
  unmounted(el) {
    el[INSTANCE_KEY]?.instance.close();
  },
};
