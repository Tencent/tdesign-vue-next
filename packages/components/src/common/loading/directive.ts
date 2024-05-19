import type { Directive, DirectiveBinding } from '@td/adapter-vue';
import type { TdLoadingProps } from '@td/intel/components/loading/type';
import produceLoading from './plugin';

const INSTANCE_KEY = Symbol('TdLoading');

const createInstance = (el: any, binding: DirectiveBinding) => {
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

export const vLoading: Directive = {
  mounted(el, binding) {
    if (binding.value) {
      createInstance(el, binding);
    }
  },
  updated(el, binding) {
    const instance = el[INSTANCE_KEY];
    const { value, oldValue } = binding;
    if (!!oldValue !== !!value) {
      if (value) {
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
