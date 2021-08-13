import { defineComponent, h, VNodeChild } from 'vue';
import { prefix } from '../config';
const name = `${prefix}-addon`;


export default defineComponent({
  name,
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
      return addonNode ? (
        <span class={`${name}__${type}`}>
          { addonNode }
        </span>
      ) : addonNode;
    },
  },
  render() {
    const prepend = this.renderAddon(h, 'prepend', this.prepend);
    const append = this.renderAddon(h, 'append', this.append);
    const defaultSlot: VNodeChild[] =  this.$slots.default ? this.$slots.default(null) : [null];
    const className = [
      name,
      {
        [`${name}--prepend`]: prepend,
        [`${name}--append`]: append,
      },
    ];

    if (!prepend && !append) {
      return defaultSlot[0];
    }

    return (
      <div class={className}>
        { prepend }
        { defaultSlot[0] }
        { append }
      </div>
    );
  },
});
