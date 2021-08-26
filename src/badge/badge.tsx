import { defineComponent, ComponentPublicInstance } from 'vue';
import { prefix } from '../config';
import props from './props';
import { renderTNodeJSX } from '../utils/render-tnode';

const name = `${prefix}-badge`;

export default defineComponent({
  name,

  props: { ...props },

  methods: {
    getContent() {
      if (this.dot) return '';
      if (typeof this.count === 'function') {
        return renderTNodeJSX(this as ComponentPublicInstance, 'count');
      }
      if (isNaN(Number(this.count))) {
        return this.count;
      }
      const count = Number(this.count);
      return count > this.maxCount ? `${this.maxCount}+` : count;
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
      if (!this.offset) return {};
      let [xOffset, yOffset]: Array<string | number> = this.offset;
      xOffset = isNaN(Number(xOffset)) ? xOffset : `${xOffset}px`;
      yOffset = isNaN(Number(yOffset)) ? yOffset : `${yOffset}px`;
      return { xOffset, yOffset };
    },
  },

  render() {
    const { dot, shape, color } = this.$props;

    const content = this.getContent();
    const isHidden = this.isHidden();
    const children = this.$slots.default ? this.$slots.default(null) : '';
    const { xOffset, yOffset } = this.getOffset();
    const badgeClassNames = [
      {
        [`${name}--dot`]: !!dot,
        [`${name}--circle`]: !dot && shape === 'circle',
        [`${name}--round`]: shape === 'round',
        ['t-size-s']: this.isSmall(),
      },
    ];
    const inlineStyle = {
      background: `${color}`,
      right: xOffset,
      top: yOffset,
    };

    return (
      <div class={name}>
        {children ? children : null}
        {isHidden ? null : (
          <sup class={badgeClassNames} style={inlineStyle}>
            {content}
          </sup>
        )}
      </div>
    );
  },
});
