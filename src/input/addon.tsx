import { defineComponent, h, VNodeChild } from 'vue';
import { usePrefixClass } from '../hooks/useConfig';
import { useTNodeJSX } from '../hooks/tnode';

export default defineComponent({
  name: 'TAddon',
  inheritAttrs: false,
  props: {
    prepend: {
      type: [String, Function],
      default() {
        return '';
      },
    },
    append: {
      type: [String, Function],
      default() {
        return '';
      },
    },
  },
  setup(props, { slots }) {
    const COMPONENT_NAME = usePrefixClass('addon');
    const renderTNodeJSX = useTNodeJSX();

    const renderAddon = (h: any, type: string, addon: string | Function | undefined): VNodeChild => {
      let addonNode: VNodeChild;
      if (slots[type]) {
        addonNode = slots[type](null);
      } else if (typeof addon === 'string') {
        addonNode = addon;
      } else if (typeof addon === 'function') {
        addonNode = addon(h);
      } else {
        addonNode = null;
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
