import type { Directive, DirectiveBinding } from '@td/adapter-vue';
import { isEqual, isObject, mapKeys } from 'lodash-es';
import type { TdLoadingProps } from '@td/intel/loading/type';
import produceLoading from './plugin';

const INSTANCE_KEY = Symbol('TdLoading');

function createInstance(el: HTMLElement, binding: DirectiveBinding) {
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
}

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
