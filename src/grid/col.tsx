import { defineComponent } from 'vue';
import { prefix } from '../config';
import RenderComponent from '../utils/render-component';
import props from '../../types/col/props';

const name = `${prefix}-col`;

export default defineComponent({
  name,

  components: {
    RenderComponent,
  },

  inject: ['rowContext'],

  props: { ...props },

  data() {
    return {};
  },

  computed: {},

  watch: {},

  methods: {
    parseFlex(flex: any) {
      if (typeof flex === 'number') {
        return `${flex} ${flex} auto`;
      }
      if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) {
        return `0 0 ${flex}`;
      }
      return flex;
    },
    renderContent() {
      return this.$slots.default ? this.$slots.default(null) : '';
    },
  },

  render() {
    const {
      span,
      order,
      offset,
      push,
      pull,
      flex,
      tag,
    } = this;
    const component = tag;
    let sizeClassObj: any = {};
    ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].forEach((size) => {
      let sizeProps: any = {};
      const propSize = this[size];
      if (typeof propSize === 'number') {
        sizeProps.span = propSize;
      } else if (typeof propSize === 'object') {
        sizeProps = propSize || {};
      }

      sizeClassObj = {
        ...sizeClassObj,
        [`${name}-${size}-${sizeProps.span}`]: sizeProps.span !== undefined,
        [`${name}-${size}-order-${sizeProps.order}`]: sizeProps.order || sizeProps.order === 0,
        [`${name}-${size}-offset-${sizeProps.offset}`]:
          sizeProps.offset || sizeProps.offset === 0,
        [`${name}-${size}-push-${sizeProps.push}`]: sizeProps.push || sizeProps.push === 0,
        [`${name}-${size}-pull-${sizeProps.pull}`]: sizeProps.pull || sizeProps.pull === 0,
      };
    });
    const classes: any = {
      [`${name}`]: true,
      [`${name}-${span}`]: span !== undefined,
      [`${name}-order-${order}`]: order,
      [`${name}-offset-${offset}`]: offset,
      [`${name}-push-${push}`]: push,
      [`${name}-pull-${pull}`]: pull,
      ...sizeClassObj,
    };
    let styles: any = {};
    if (flex) {
      styles.flex = this.parseFlex(flex);
    }
    const { rowContext }: any = this as any;
    if (rowContext) {
      const gutter = rowContext.getGutter();
      const padding: any = {};
      if (gutter) {
        if (gutter[0] > 0) {
          padding.paddingLeft = `${gutter[0] / 2}px`;
          padding.paddingRight = `${gutter[0] / 2}px`;
        }
        if (gutter[1] > 0) {
          padding.paddingTop = `${gutter[1] / 2}px`;
          padding.paddingBottom = `${gutter[1] / 2}px`;
        }
      }
      styles = {
        ...styles,
        ...padding,
      };
    }
    return (
      <component class={classes} style={styles}>
        {this.renderContent()}
      </component>
    );
  },
});
