import isEqual from 'lodash/isEqual';
import isObject from 'lodash/isObject';
import mapKeys from 'lodash/mapKeys';

import produceLoading from './plugin';
import { TdLoadingProps } from './type';

import type { Directive, DirectiveBinding } from 'vue';

const INSTANCE_KEY = Symbol('TdLoading');

const createInstance = (el: HTMLElement, binding: DirectiveBinding) => {
  const { fullscreen, inheritColor } = binding.modifiers;
  const options: TdLoadingProps = {
    attach: () => el,
    fullscreen: fullscreen ?? false,
    inheritColor: inheritColor ?? false,
    loading: binding.value,
  };

  if (isObject(binding.value)) {
    mapKeys(binding.value, (value, key) => {
      options[key] = value;
    });
  }

  el[INSTANCE_KEY] = {
    options,
    instance: produceLoading(options),
  };
};

export const vLoading: Directive = {
  mounted(el, binding) {
    if (binding.value) {
      createInstance(el, binding);
    }
  },
  updated(el, binding) {
    const instance = el[INSTANCE_KEY];
    const { value, oldValue } = binding;
    if (!isEqual(value, oldValue)) {
      const loading = value?.loading ?? value;
      if (loading) {
        createInstance(el, binding);
      } else {
        instance?.instance.hide();
      }
    }
  },
  unmounted(el) {
    el[INSTANCE_KEY]?.instance.hide();
  },
};

export default vLoading;
