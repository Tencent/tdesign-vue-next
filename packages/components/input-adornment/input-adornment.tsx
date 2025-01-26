import { defineComponent, h, VNodeChild } from 'vue';
import { isString } from 'lodash-es';
import { isNumber } from 'lodash-es';
import { usePrefixClass } from '../hooks/useConfig';
import { useTNodeJSX } from '../hooks/tnode';
import props from './props';
import { isFunction } from 'lodash-es';

export default defineComponent({
  name: 'TInputAdornment',
  inheritAttrs: false,
  props,
  setup(props, { slots }) {
    const COMPONENT_NAME = usePrefixClass('input-adornment');
    const renderTNodeJSX = useTNodeJSX();

    const renderAddon = (h: any, type: string, addon: string | Function | VNodeChild | undefined): VNodeChild => {
      let addonNode: VNodeChild;
      const isContentNode = isString(addon) || isNumber(addon);
      if (!slots[type] && isString(addon) && !addon) return null;
      if (slots[type]) {
        if (slots[type](null).length === 1 && typeof slots[type](null)[0].children === 'string') {
          addonNode = <span class={`${COMPONENT_NAME.value}__text`}>{slots[type](null)}</span>;
        } else {
          addonNode = slots[type](null);
        }
      } else if (isFunction(addon)) {
        addonNode = addon(h);
      } else {
        addonNode = isContentNode ? (
          <span class={`${COMPONENT_NAME.value}__text`}>{addon}</span>
        ) : (
          (addon as VNodeChild)
        );
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
