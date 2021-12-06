import { defineComponent } from 'vue';
import isObject from 'lodash/isObject';
import { calcSize } from '../utils/responsive';
import { prefix } from '../config';
import props from './col-props';
import { ClassName } from '../common';
import { TdColProps, TdRowProps } from './type';
import { renderTNodeJSX } from '../utils/render-tnode';

const name = `${prefix}-col`;

export default defineComponent({
  name,

  inject: ['rowContext'],

  props: { ...props },

  data() {
    return {
      size: calcSize(window.innerWidth),
    };
  },

  computed: {
    classes(): ClassName {
      const { span, order, offset, push, pull } = this;

      const allSizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
      const sizeClasses = allSizes.reduce((acc, currSize) => {
        const sizeProp = this[currSize];
        let sizeObject: any = {};
        if (typeof sizeProp === 'number') {
          sizeObject.span = sizeProp;
        } else if (isObject(sizeProp)) {
          sizeObject = sizeProp || {};
        }

        return {
          ...acc,
          [`${name}-${currSize}-${sizeObject.span}`]: sizeObject.span !== undefined,
          [`${name}-${currSize}-order-${sizeObject.order}`]: parseInt(sizeObject.order, 10) >= 0,
          [`${name}-${currSize}-offset-${sizeObject.offset}`]: parseInt(sizeObject.offset, 10) >= 0,
          [`${name}-${currSize}-push-${sizeObject.push}`]: parseInt(sizeObject.push, 10) >= 0,
          [`${name}-${currSize}-pull-${sizeObject.pull}`]: parseInt(sizeObject.pull, 10) >= 0,
        };
      }, {});

      return {
        [`${name}`]: true,
        [`${name}-${span}`]: span !== undefined,
        [`${name}-order-${order}`]: order,
        [`${name}-offset-${offset}`]: offset,
        [`${name}-push-${push}`]: push,
        [`${name}-pull-${pull}`]: pull,
        ...sizeClasses,
      };
    },
  },

  mounted() {
    window.addEventListener('resize', this.updateSize);
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.updateSize);
  },

  methods: {
    updateSize() {
      this.size = calcSize(window.innerWidth);
    },

    parseFlex(flex: TdColProps['flex']): string {
      if (typeof flex === 'number') {
        return `${flex} ${flex} 0`;
      }
      if (/^\d+(\.\d+)?(px|r?em|%)$/.test(flex)) {
        return `0 0 ${flex}`;
      }
      return flex;
    },
    calcColPadding(gutter: TdRowProps['gutter'], currentSize: string) {
      const paddingObj = {};
      if (typeof gutter === 'number') {
        Object.assign(paddingObj, {
          paddingLeft: `${gutter / 2}px`,
          paddingRight: `${gutter / 2}px`,
        });
      } else if (Array.isArray(gutter) && gutter.length) {
        if (typeof gutter[0] === 'number') {
          Object.assign(paddingObj, {
            paddingLeft: `${gutter[0] / 2}px`,
            paddingRight: `${gutter[0] / 2}px`,
          });
        }

        if (isObject(gutter[0]) && gutter[0][currentSize]) {
          Object.assign(paddingObj, {
            paddingLeft: `${gutter[0][currentSize] / 2}px`,
            paddingRight: `${gutter[0][currentSize] / 2}px`,
          });
        }
      } else if (isObject(gutter) && gutter[currentSize]) {
        Object.assign(paddingObj, {
          paddingLeft: `${gutter[currentSize] / 2}px`,
          paddingRight: `${gutter[currentSize] / 2}px`,
        });
      }
      return paddingObj;
    },
  },

  render() {
    const { flex, tag: TAG, classes } = this;

    const colStyle: any = {};
    flex && (colStyle.flex = this.parseFlex(flex));

    const { rowContext }: any = this;
    if (rowContext) {
      const { gutter: rowGutter } = rowContext;
      Object.assign(colStyle, this.calcColPadding(rowGutter, this.size));
    }

    return (
      <TAG class={classes} style={colStyle}>
        {renderTNodeJSX(this, 'default')}
      </TAG>
    );
  },
});
