import { defineComponent, computed } from 'vue';
import { prefix } from '../config';
import props from './props';
import { useTNodeJSX } from '../hooks/tnode';

const name = `${prefix}-badge`;

export default defineComponent({
  name: 'TBadge',

  props: { ...props },

  setup(props) {
    const renderTNodeJSX = useTNodeJSX();

    /** 内容计算相关逻辑 start */
    const content = computed(() => {
      if (props.dot) return '';
      if (typeof props.count === 'function') {
        return renderTNodeJSX('count');
      }
      if (Number.isNaN(Number(props.count))) {
        return props.count;
      }
      const count = Number(props.count);
      return count > props.maxCount ? `${props.maxCount}+` : count;
    });

    const getOffset = () => {
      if (!props.offset) return {};
      let [xOffset, yOffset]: Array<string | number> = props.offset;
      xOffset = Number.isNaN(Number(xOffset)) ? xOffset : `${xOffset}px`;
      yOffset = Number.isNaN(Number(yOffset)) ? yOffset : `${yOffset}px`;
      return { xOffset, yOffset };
    };
    /** 内容计算相关逻辑 end */

    /** 样式计算相关逻辑 start */
    const isHidden = computed(() => {
      return !props.showZero && (content.value === 0 || content.value === '0');
    });

    const badgeClassNames = computed(() => {
      return [
        {
          [`${name}--dot`]: !!props.dot,
          [`${name}--circle`]: !props.dot && props.shape === 'circle',
          [`${name}--round`]: props.shape === 'round',
          't-size-s': props.size === 'small',
        },
      ];
    });

    const inlineStyle = computed(() => {
      const { xOffset, yOffset } = getOffset();
      return {
        background: `${props.color}`,
        right: xOffset,
        top: yOffset,
      };
    });
    /** 样式计算相关逻辑 end */
    return {
      content,
      inlineStyle,
      badgeClassNames,
      isHidden,
    };
  },

  render() {
    const children = this.$slots.default ? this.$slots.default(null) : '';

    return (
      <div class={name} {...this.$attrs}>
        {children || null}
        {this.isHidden ? null : (
          <sup class={this.badgeClassNames} style={this.inlineStyle}>
            {this.content}
          </sup>
        )}
      </div>
    );
  },
});
