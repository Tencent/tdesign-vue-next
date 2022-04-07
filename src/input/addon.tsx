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
  setup() {
    const COMPONENT_NAME = usePrefixClass('addon');
    return {
      COMPONENT_NAME,
    };
  },
  methods: {
    renderAddon(h: any, type: string, addon: string | Function | undefined): VNodeChild {
      let addonNode: VNodeChild;
      if (this.$slots[type]) {
        addonNode = this.$slots[type](null);
      } else if (typeof addon === 'string') {
        addonNode = addon;
      } else if (typeof addon === 'function') {
        addonNode = addon(h);
      } else {
        addonNode = null;
      }
      return addonNode ? <span class={`${this.COMPONENT_NAME}__${type}`}>{addonNode}</span> : addonNode;
    },
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
