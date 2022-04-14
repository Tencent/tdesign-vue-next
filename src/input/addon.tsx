import { defineComponent, h, VNodeChild } from 'vue';
import { usePrefixClass } from '../hooks/useConfig';

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
    return {
      COMPONENT_NAME,
      renderAddon,
    };
  },
  render() {
    const { COMPONENT_NAME } = this;
    const prepend = this.renderAddon(h, 'prepend', this.prepend);
    const append = this.renderAddon(h, 'append', this.append);
    const defaultSlot: VNodeChild[] = this.$slots.default ? this.$slots.default(null) : [null];
    const className = [
      COMPONENT_NAME,
      {
        [`${COMPONENT_NAME}--prepend`]: prepend,
        [`${COMPONENT_NAME}--append`]: append,
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
  },
});
