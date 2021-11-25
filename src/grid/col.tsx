import { defineComponent } from 'vue';
import isObject from 'lodash/isObject';
import { prefix } from '../config';
import props from './col-props';
import { ClassName } from '../common';
import { TdColProps, TdRowProps } from './type';

const name = `${prefix}-col`;

export default defineComponent({
  name,

  inject: ['rowContext'],

  props,

  data() {
    return {};
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

  watch: {},

  methods: {
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
      if (typeof gutter === 'number' && gutter > 0) {
        Object.assign(paddingObj, {
          paddingLeft: `${gutter / 2}px`,
          paddingRight: `${gutter / 2}px`,
          paddingTop: `${gutter / 2}px`,
          paddingBottom: `${gutter / 2}px`,
        });
      } else if (Array.isArray(gutter) && gutter.length) {
        if ((gutter[0] as any) > 0)
          Object.assign(paddingObj, {
            paddingLeft: `${(gutter[0] as any) / 2}px`,
            paddingRight: `${(gutter[0] as any) / 2}px`,
          });
        if ((gutter[1] as any) > 0)
          Object.assign(paddingObj, {
            paddingTop: `${(gutter[1] as any) / 2}px`,
            paddingBottom: `${(gutter[1] as any) / 2}px`,
          });
      } else if (isObject(gutter) && gutter[currentSize]) {
        if (Array.isArray(gutter[currentSize])) {
          if (gutter[currentSize][0] > 0)
            Object.assign(paddingObj, {
              paddingLeft: `${gutter[currentSize][0] / 2}px`,
              paddingRight: `${gutter[currentSize][0] / 2}px`,
            });
          if (gutter[currentSize][1] > 0)
            Object.assign(paddingObj, {
              paddingTop: `${gutter[currentSize][1] / 2}px`,
              paddingBottom: `${gutter[currentSize][1] / 2}px`,
            });
        } else if (gutter[currentSize] > 0) {
          Object.assign(paddingObj, {
            paddingLeft: `${gutter[currentSize] / 2}px`,
            paddingRight: `${gutter[currentSize] / 2}px`,
            paddingTop: `${gutter[currentSize] / 2}px`,
            paddingBottom: `${gutter[currentSize] / 2}px`,
          });
        }
      }
      return paddingObj;
    },
  },

  render() {
    const { flex, tag: TAG, classes } = this;

    const styles: any = {};
    flex && (styles.flex = this.parseFlex(flex));

    const { rowContext }: any = this;
    if (rowContext) {
      const { gutter: rowGutter, size: rowSize } = rowContext;
      Object.assign(styles, this.calcColPadding(rowGutter, rowSize));
    }
    const colStyle = { ...styles };

    return (
      <TAG class={classes} style={colStyle}>
        {this.$slots.default && this.$slots.default()}
      </TAG>
    );
  },
});
