import { defineComponent, VNode } from 'vue';
import debounce from 'lodash/debounce';
import isObject from 'lodash/isObject';
import { prefix } from '../config';
import props from './row-props';
import { ClassName } from '../common';
import { calcSize } from '../utils/responsive';
import { TdRowProps } from './type';

const name = `${prefix}-row`;

export default defineComponent({
  name,

  provide(): { rowContext: any } {
    return {
      rowContext: {
        gutter: this.gutter,
        size: this.size,
      },
    };
  },

  props: { ...props },

  data() {
    return {
      size: calcSize(window.innerWidth),
    };
  },

  computed: {
    classes(): ClassName {
      const { justify, align } = this;
      return [
        name,
        {
          [`${name}-${justify}`]: justify,
          [`${name}-${align}`]: align,
        },
      ];
    },
  },

  mounted() {
    window.addEventListener('resize', this.updateSize);
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.updateSize);
  },

  methods: {
    updateSize: debounce(function (this: any) {
      this.size = calcSize(window.innerWidth);
    }, 50),

    calcRowMargin(gutter: TdRowProps['gutter'], currentSize: string): object {
      const marginObj = {};
      if (typeof gutter === 'number' && gutter > 0) {
        Object.assign(marginObj, {
          marginLeft: `${gutter / -2}px`,
          marginRight: `${gutter / -2}px`,
          marginTop: `${gutter / -2}px`,
          marginBottom: `${gutter / -2}px`,
        });
      } else if (Array.isArray(gutter) && gutter.length) {
        if (gutter[0] as any > 0) Object.assign(marginObj, { marginLeft: `${gutter[0] as any / -2}px`, marginRight: `${gutter[0] as any / -2}px` });
        if (gutter[1] as any > 0) Object.assign(marginObj, { marginTop: `${gutter[1] as any / -2}px`, marginBottom: `${gutter[1] as any / -2}px` });
      } else if (isObject(gutter) && gutter[currentSize]) {
        if (Array.isArray(gutter[currentSize])) {
          if (gutter[currentSize][0] > 0) Object.assign(marginObj, { marginLeft: `${gutter[currentSize][0] / -2}px`, marginRight: `${gutter[currentSize][0] / -2}px` });
          if (gutter[currentSize][1] > 0) Object.assign(marginObj, { marginTop: `${gutter[currentSize][1] / -2}px`, marginBottom: `${gutter[currentSize][1] / -2}px` });
        } else if (gutter[currentSize] > 0) {
          Object.assign(marginObj, {
            marginLeft: `${gutter[currentSize] / -2}px`,
            marginRight: `${gutter[currentSize] / -2}px`,
            marginTop: `${gutter[currentSize] / -2}px`,
            marginBottom: `${gutter[currentSize] / -2}px`,
          });
        }
      }
      return marginObj;
    },
  },

  render(): VNode {
    const { tag, classes } = this;

    const rowStyle = this.calcRowMargin(this.gutter, this.size);

    return <tag class={classes} style={rowStyle}>{this.$slots.default && this.$slots.default()}</tag>;
  },
});
