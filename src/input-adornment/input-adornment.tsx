import { defineComponent, h, VNodeChild } from 'vue';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import { usePrefixClass } from '../hooks/useConfig';
import { useTNodeJSX } from '../hooks/tnode';
import props from './props';
import isFunction from 'lodash/isFunction';

export default defineComponent({
  name: 'TInputAdornment',
  inheritAttrs: false,
  props,
  setup(props, { slots }) {
    const COMPONENT_NAME = usePrefixClass('input-adornment');
    const renderTNodeJSX = useTNodeJSX();

    const renderAddon = (h: any, type: string, addon: string | Function | undefined): VNodeChild => {
      let addonNode: VNodeChild;
      const isContentNode = isString(addon) || isNumber(addon);

      if (slots[type]) {
        addonNode = slots[type](null);
      } else if (isFunction(addon)) {
        addonNode = addon(h);
      } else {
        addonNode = isContentNode ? <span class={`${COMPONENT_NAME.value}__text`}>{addon}</span> : addon;
      }
      return addonNode ? <span class={`${COMPONENT_NAME.value}__${type}`}>{addonNode}</span> : addonNode;
    };
    return () => {
      const prepend = renderAddon(h, 'prepend', props.prepend);
      const append = renderAddon(h, 'append', props.append);
      const defaultSlot: VNodeChild[] = renderTNodeJSX('default') || [null];
      const className = [
        COMPONENT_NAME.value,
        {
          [`${COMPONENT_NAME.value}--prepend`]: prepend,
          [`${COMPONENT_NAME.value}--append`]: append,
        },
      ];

      if (!prepend && !append) {
        return defaultSlot[0];
      }

      return (
        <div class={className}>
          {prepend}
          {defaultSlot[0]}
          {append}
        </div>
      );
    };
  },
});
