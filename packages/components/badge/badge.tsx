import { defineComponent, computed } from 'vue';
import props from './props';
import { useContent, useTNodeJSX, usePrefixClass } from '@tdesign/shared-hooks';

export default defineComponent({
  name: 'TBadge',
  inheritAttrs: false,
  props,
  setup(props, { attrs }) {
    const renderContent = useContent();
    const renderTNodeJSX = useTNodeJSX();

    /** 内容计算相关逻辑 start */
    const displayCount = computed(() => {
      let count = renderTNodeJSX('count');

      if (Number.isNaN(Number(count))) {
        return count;
      }
      count = Number(props.count);
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
    const classPrefix = usePrefixClass();
    const COMPONENT_NAME = usePrefixClass('badge');
    const isHidden = computed(() => {
      return !props.showZero && (displayCount.value === 0 || displayCount.value === '0');
    });

    const badgeClassNames = computed(() => {
      return [
        {
          [`${COMPONENT_NAME.value}--dot`]: !!props.dot,
          [`${COMPONENT_NAME.value}--circle`]: !props.dot && props.shape === 'circle',
          [`${COMPONENT_NAME.value}--round`]: !props.dot && props.shape === 'round',
          [`${classPrefix.value}-size-s`]: props.size === 'small',
        },
      ];
    });

    const inlineStyle = computed(() => {
      const { xOffset, yOffset } = getOffset();
      return {
        background: props.color,
        right: xOffset,
        top: yOffset,
      };
    });
    /** 样式计算相关逻辑 end */

    return () => (
      <div class={COMPONENT_NAME.value} {...attrs}>
        {renderContent('default', 'content')}
        {isHidden.value ? null : (
          <sup class={badgeClassNames.value} style={inlineStyle.value}>
            {props.dot ? null : displayCount.value}
          </sup>
        )}
      </div>
    );
  },
});
