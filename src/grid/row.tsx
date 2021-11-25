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
      const rowStyle = {};
      if (typeof gutter === 'number' && gutter > 0) {
        Object.assign(rowStyle, {
          marginLeft: `${gutter / -2}px`,
          marginRight: `${gutter / -2}px`,
        });
      } else if (Array.isArray(gutter) && gutter.length) {
        if (typeof gutter[0] === 'number') {
          Object.assign(rowStyle, {
            marginLeft: `${gutter[0] / -2}px`,
            marginRight: `${gutter[0] / -2}px`,
          });
        }
        if (typeof gutter[1] === 'number') {
          Object.assign(rowStyle, { rowGap: `${gutter[1]}px` });
        }

        if (isObject(gutter[0]) && gutter[0][currentSize] !== undefined) {
          Object.assign(rowStyle, {
            marginLeft: `${gutter[0][currentSize] / -2}px`,
            marginRight: `${gutter[0][currentSize] / -2}px`,
          });
        }
        if (isObject(gutter[1]) && gutter[1][currentSize] !== undefined) {
          Object.assign(rowStyle, { rowGap: `${gutter[1][currentSize]}px` });
        }
      } else if (isObject(gutter) && gutter[currentSize]) {
        if (Array.isArray(gutter[currentSize]) && gutter[currentSize].length) {
          Object.assign(rowStyle, {
            marginLeft: `${gutter[currentSize][0] / -2}px`,
            marginRight: `${gutter[currentSize][0] / -2}px`,
          });
          Object.assign(rowStyle, { rowGap: `${gutter[currentSize][1]}px` });
        } else {
          Object.assign(rowStyle, {
            marginLeft: `${gutter[currentSize] / -2}px`,
            marginRight: `${gutter[currentSize] / -2}px`,
          });
        }
      }
      return rowStyle;
    },
  },

  render(): VNode {
    const { tag: TAG, classes } = this;

    const rowStyle = this.calcRowMargin(this.gutter, this.size);

    return (
      <TAG class={classes} style={rowStyle}>
        {this.$slots.default && this.$slots.default()}
      </TAG>
    );
  },
});
