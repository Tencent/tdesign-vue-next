import Vue from 'vue';
import { prefix } from '../config';
import RenderComponent from '../utils/render-component';
import Icon from '../icon';

const name = `${prefix}-badge`;

export default Vue.extend({
  name,

  components: {
    [Icon.name]: Icon,
    RenderComponent,
  },

  props: {
    count: {
      type: Number,
      validator(v: any): boolean {
        return typeof v === 'number';
      },
    },
    maxCount: {
      type: Number,
      default: 99,
      validator(v: any): boolean {
        return  typeof v === 'number';
      },
    },
    content: {
      type: [String, Function],
    },
    dot: {
      type: Boolean,
      default: false,
      validator(v: any): boolean {
        return typeof v === 'boolean';
      },
    },
    color: {
      type: String,
      default: 'red',
    },
    shape: {
      type: String,
      default: 'circle',
      validator(v: string): boolean {
        return ['circle', 'round'].includes(v);
      },
    },
    size: {
      type: String,
      default: 'medium',
      validator(v: string): boolean {
        return ['medium', 'small'].includes(v);
      },
    },
    showZero: {
      type: Boolean,
      default: false,
    },
    offset: {
      type: Array,
      validator(v: number[]): boolean {
        return Array.isArray(v) && v.every(item => typeof item === 'number') && v.length === 2;
      },
    },
  },
  methods: {
    getContent() {
      if (this.dot) return '';
      if (typeof this.content === 'string') {
        return  this.content;
      } if (typeof  this.content === 'function') {
        return  this.content();
      }
      if (typeof this.count === 'number') {
        return this.count > this.maxCount ? `${this.maxCount}+` : this.count;
      }
    },
    isSmall() {
      return this.size === 'small';
    },
    isZero() {
      const content = this.getContent();
      return content === 0 || content === '0';
    },
    isHidden() {
      return !this.showZero && this.isZero();
    },
    getOffset() {
      if (!this.offset) return { xOffset: void 0, yOffset: void 0 };
      const [xOffset, yOffset] = this.offset;
      return { xOffset, yOffset };
    },
  },

  render() {
    const {
      dot,
      shape,
      color,
    } = this.$props;

    const content = this.getContent();
    const isHidden = this.isHidden();
    const children = this.$slots.default;
    const { xOffset, yOffset } = this.getOffset();
    const badgeClassNames = [
      // `${name}`,
      {
        [`${name}--dot`]: !!dot,
        [`${name}--circle`]: !dot && shape === 'circle',
        [`${name}--round`]: shape === 'round',
        [`${name}--ribbon`]: shape === 'ribbon',
        ['t-size-s']: this.isSmall(),
      },
    ];
    const inlineStyle = {
      background: `${color}`,
      right: xOffset ? `${-xOffset}px` : void 0,
      top: yOffset ? `${-yOffset}px` : void 0,
    };

    return (
      <div class={name}>
        {children ?  children  : null}
        {isHidden ? null : <sup class={badgeClassNames} style={inlineStyle }>{content}</sup>}
      </div>
    );
  },

});
